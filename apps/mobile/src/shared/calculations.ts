import {
  Muscle,
  Exercise,
  WorkoutSession,
  SetLog,
  MuscleExposure,
  CoverageGap,
  ExerciseComparison,
  MuscleRole,
  ModelOutput,
  WeeklyExposureOptions,
  ScientificEvidenceCategory,
  EvidenceConfidence,
  SubstitutionFeasibility,
  MultidimensionalComparisonScores,
  UserMuscleTarget,
} from './domain';

/**
 * Stage 1 & Stage 2: Biomechanical Weekly Muscle Exposure Engine (Mobile Synchronized)
 */
export function calculateWeeklyExposure(
  sessions: WorkoutSession[],
  exercises: Exercise[],
  muscles: Muscle[],
  options?: WeeklyExposureOptions
): ModelOutput<MuscleExposure[]> {
  const exerciseMap = new Map<string, Exercise>();
  exercises.forEach((ex) => exerciseMap.set(ex.id, ex));

  // Build Personalized Targets Map
  const personalizedMap = new Map<string, { min: number; max: number }>();
  if (options?.personalizedTargets) {
    if (Array.isArray(options.personalizedTargets)) {
      options.personalizedTargets.forEach((t) =>
        personalizedMap.set(t.muscleId, { min: t.targetMin, max: t.targetMax })
      );
    } else if (options.personalizedTargets instanceof Map) {
      options.personalizedTargets.forEach((v, k) => personalizedMap.set(k, v));
    } else {
      Object.entries(options.personalizedTargets).forEach(([k, v]) =>
        personalizedMap.set(k, v)
      );
    }
  }

  // Parse Date Interval Boundaries
  let startTimestamp: number | null = null;
  let endTimestamp: number | null = null;
  if (options?.interval) {
    startTimestamp = new Date(options.interval.start).getTime();
    endTimestamp = new Date(options.interval.end).getTime();
    if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
      throw new Error(
        `Invalid date interval provided: start="${options.interval.start}", end="${options.interval.end}"`
      );
    }
    if (startTimestamp > endTimestamp) {
      throw new Error(
        `Interval start (${options.interval.start}) cannot be after end (${options.interval.end})`
      );
    }
  }

  // Accumulation structures
  interface Accumulator {
    directSets: number;
    indirectSets: number;
    stabiliserSets: number;
    mobilityWorkload: number;
    conditioningWorkload: number;
    leftSets: number;
    rightSets: number;
    bilateralSets: number;
    evidenceCategories: Set<ScientificEvidenceCategory>;
    confidenceScores: EvidenceConfidence[];
    contributingExercises: Map<
      string,
      {
        exerciseName: string;
        sets: number;
        role: MuscleRole;
        contribution: number;
        evidenceCategory?: ScientificEvidenceCategory;
        confidence?: EvidenceConfidence;
        workloadType: 'resistance' | 'mobility' | 'conditioning';
      }
    >;
  }

  const exposureMap = new Map<string, Accumulator>();
  muscles.forEach((m) => {
    exposureMap.set(m.id, {
      directSets: 0,
      indirectSets: 0,
      stabiliserSets: 0,
      mobilityWorkload: 0,
      conditioningWorkload: 0,
      leftSets: 0,
      rightSets: 0,
      bilateralSets: 0,
      evidenceCategories: new Set(),
      confidenceScores: [],
      contributingExercises: new Map(),
    });
  });

  let qualifiedSessionsCount = 0;
  let qualifiedSetsCount = 0;
  let excludedSetsCount = 0;
  let totalResistanceSets = 0;
  let totalMobilitySets = 0;
  let totalConditioningSets = 0;

  const requireCompletedSession = options?.qualificationRules?.requireCompletedSession ?? true;
  const excludeDegraded = options?.qualificationRules?.excludeDegradedTechnique ?? false;
  const minRir = options?.qualificationRules?.minRir;
  const maxRir = options?.qualificationRules?.maxRir;
  const minRpe = options?.qualificationRules?.minRpe;
  const customPredicate = options?.qualificationRules?.customSetPredicate;

  for (const session of sessions) {
    // 1. Session Completion Filter
    if (requireCompletedSession && !session.completed) {
      continue;
    }

    // 2. Date Interval Filter
    if (startTimestamp !== null && endTimestamp !== null) {
      const sessionTime = new Date(session.startedAt).getTime();
      if (isNaN(sessionTime) || sessionTime < startTimestamp || sessionTime > endTimestamp) {
        continue;
      }
    }

    qualifiedSessionsCount++;

    for (const set of session.sets) {
      // 3. Set-Level Qualification Rules
      if (excludeDegraded && set.techniqueQuality === 'degraded') {
        excludedSetsCount++;
        continue;
      }

      if (set.rir != null) {
        if (minRir != null && set.rir < minRir) {
          excludedSetsCount++;
          continue;
        }
        if (maxRir != null && set.rir > maxRir) {
          excludedSetsCount++;
          continue;
        }
      }

      if (set.rpe != null && minRpe != null && set.rpe < minRpe) {
        excludedSetsCount++;
        continue;
      }

      const hasEffort =
        (set.reps != null && set.reps > 0) ||
        (set.holdSeconds != null && set.holdSeconds > 0) ||
        (set.distanceMeters != null && set.distanceMeters > 0) ||
        (set.flightsClimbed != null && set.flightsClimbed > 0);

      if (!hasEffort) {
        excludedSetsCount++;
        continue;
      }

      if (customPredicate && !customPredicate(set, session)) {
        excludedSetsCount++;
        continue;
      }

      const exercise = exerciseMap.get(set.exerciseId);
      if (!exercise) {
        excludedSetsCount++;
        continue;
      }

      qualifiedSetsCount++;

      // 4. Workload Categorization
      const workloadType: 'resistance' | 'mobility' | 'conditioning' =
        exercise.category === 'mobility'
          ? 'mobility'
          : exercise.category === 'cardio'
          ? 'conditioning'
          : 'resistance';

      if (workloadType === 'resistance') totalResistanceSets++;
      else if (workloadType === 'mobility') totalMobilitySets++;
      else totalConditioningSets++;

      // 5. Unilateral Accounting Convention
      // Paired limb = 1.0 bilateral equivalent set. Left/Right single = 0.5 set.
      let effectiveSets = 1.0;
      const side = (set.side as string) || 'bilateral';

      if (side === 'left' || side === 'right') {
        effectiveSets = 0.5;
      } else if (side === 'each_side' || side === 'both_sides') {
        effectiveSets = 1.0;
      } else {
        effectiveSets = 1.0;
      }

      // 6. Muscle Mapping Accumulation
      for (const mapping of exercise.muscleMappings) {
        const acc = exposureMap.get(mapping.muscleId);
        if (!acc) continue;

        if (side === 'left') acc.leftSets += 1;
        else if (side === 'right') acc.rightSets += 1;
        else if (side === 'each_side' || side === 'both_sides') {
          acc.leftSets += 1;
          acc.rightSets += 1;
        } else {
          acc.bilateralSets += 1;
        }

        if (mapping.evidenceCategory) {
          acc.evidenceCategories.add(mapping.evidenceCategory);
        }
        if (mapping.confidence) {
          acc.confidenceScores.push(mapping.confidence);
        }

        let coeff = mapping.coefficient;
        if (coeff == null || isNaN(coeff)) {
          if (mapping.role === 'primary') {
            coeff = options?.coefficientRules?.primaryRoleCoefficient ?? 1.0;
          } else if (mapping.role === 'secondary') {
            coeff = options?.coefficientRules?.secondaryRoleCoefficient ?? 0.5;
          } else if (mapping.role === 'synergist') {
            coeff = options?.coefficientRules?.synergistRoleCoefficient ?? 0.5;
          } else if (mapping.role === 'stabiliser') {
            coeff = options?.coefficientRules?.stabiliserRoleCoefficient ?? 0.2;
          } else {
            coeff = options?.coefficientRules?.incidentalRoleCoefficient ?? 0.0;
          }
        }

        if (workloadType === 'resistance') {
          if (mapping.role === 'primary') {
            acc.directSets += effectiveSets * coeff;
          } else if (mapping.role === 'secondary' || mapping.role === 'synergist') {
            acc.indirectSets += effectiveSets * coeff;
          } else if (mapping.role === 'stabiliser') {
            acc.stabiliserSets += effectiveSets * coeff;
          }
        } else if (workloadType === 'mobility') {
          acc.mobilityWorkload += effectiveSets;
        } else if (workloadType === 'conditioning') {
          acc.conditioningWorkload += effectiveSets;
        }

        const contrib = acc.contributingExercises.get(exercise.id) || {
          exerciseName: exercise.name,
          sets: 0,
          role: mapping.role,
          contribution: 0,
          evidenceCategory: mapping.evidenceCategory,
          confidence: mapping.confidence,
          workloadType,
        };
        contrib.sets += effectiveSets;
        contrib.contribution += effectiveSets * coeff;
        acc.contributingExercises.set(exercise.id, contrib);
      }
    }
  }

  const computeAggregateConfidence = (scores: EvidenceConfidence[]): EvidenceConfidence => {
    if (scores.length === 0) return 'unknown';
    if (scores.includes('low')) return 'low';
    if (scores.includes('moderate')) return 'moderate';
    if (scores.every((s) => s === 'high')) return 'high';
    return 'moderate';
  };

  const results: MuscleExposure[] = muscles.map((m) => {
    const acc = exposureMap.get(m.id)!;
    const directSets = Number(acc.directSets.toFixed(2));
    const indirectSets = Number(acc.indirectSets.toFixed(2));
    const stabiliserSets = Number(acc.stabiliserSets.toFixed(2));
    const mobilityWorkload = Number(acc.mobilityWorkload.toFixed(2));
    const conditioningWorkload = Number(acc.conditioningWorkload.toFixed(2));

    const totalResistanceExposure = Number((directSets + indirectSets + stabiliserSets).toFixed(2));
    const totalExposure = totalResistanceExposure;

    const personalized = personalizedMap.get(m.id);
    const targetMin = personalized ? personalized.min : m.defaultWeeklyTargetMin;
    const targetMax = personalized ? personalized.max : m.defaultWeeklyTargetMax;
    const isTargetPersonalized = !!personalized;

    let status: MuscleExposure['status'] = 'below_target';
    if (totalResistanceExposure >= targetMin && totalResistanceExposure <= targetMax) {
      status = 'in_target';
    } else if (totalResistanceExposure > targetMax) {
      status = 'above_target';
    } else if (totalResistanceExposure === 0) {
      status = 'below_target';
    }

    const pairedSets = Math.min(acc.leftSets, acc.rightSets);
    const asymmetryDelta = Math.abs(acc.leftSets - acc.rightSets);
    const confidence = computeAggregateConfidence(acc.confidenceScores);

    return {
      muscleId: m.id,
      muscleName: m.name,
      region: m.region,
      directSets,
      indirectSets,
      stabiliserSets,
      mobilityWorkload,
      conditioningWorkload,
      totalResistanceExposure,
      totalExposure,
      status,
      targetMin,
      targetMax,
      isTargetPersonalized,
      confidence,
      evidenceCategories: Array.from(acc.evidenceCategories),
      unilateralBreakdown: {
        leftSets: acc.leftSets,
        rightSets: acc.rightSets,
        bilateralSets: acc.bilateralSets,
        pairedSets,
        asymmetryDelta,
      },
      contributingExercises: Array.from(acc.contributingExercises.entries()).map(
        ([exerciseId, v]) => ({
          exerciseId,
          exerciseName: v.exerciseName,
          sets: Number(v.sets.toFixed(1)),
          role: v.role,
          contribution: Number(v.contribution.toFixed(2)),
          evidenceCategory: v.evidenceCategory,
          confidence: v.confidence,
          workloadType: v.workloadType,
        })
      ),
    };
  });

  const overallConfidence = computeAggregateConfidence(
    results.map((r) => r.confidence)
  );

  return {
    model: 'weekly_muscle_exposure',
    version: '2.0.0',
    value: results,
    unit: 'fractional_effective_sets',
    confidence: overallConfidence,
    classification: 'modelled',
    assumptions: [
      'Separated resistance hypertrophy exposure from mobility and conditioning workload.',
      'Unilateral paired accounting: 1 left set + 1 right set equates to 1.0 bilateral equivalent set of stimulus per limb.',
      'Primary movers receive default 1.0 coefficient; synergists/secondaries 0.5; stabilisers 0.2; incidentals 0.0.',
      'Excluded non-stimulative, degraded or zero-effort executions.',
      'Explicit date intervals filter sessions to prevent trailing window leakage.',
    ],
    sourceIds: [
      'pelland_2026_dose_response',
      'schoenfeld_2019_muscle_volume',
      'vigotsky_2018_semg_limitations',
    ],
    generatedAt: new Date().toISOString(),
    metadata: {
      interval: options?.interval,
      timezone: options?.timezone || 'UTC',
      qualifiedSessionsCount,
      qualifiedSetsCount,
      excludedSetsCount,
      totalResistanceSets,
      totalMobilitySets,
      totalConditioningSets,
    },
  };
}

/**
 * Coverage Gap Diagnostics with Personalized Target Awareness
 */
export function analyzeCoverageGaps(
  exposures: MuscleExposure[],
  exercises: Exercise[]
): CoverageGap[] {
  const gaps: CoverageGap[] = [];

  for (const exp of exposures) {
    if (exp.totalExposure < exp.targetMin) {
      const candidates = exercises.filter(
        (ex) =>
          ex.category !== 'cardio' &&
          ex.category !== 'mobility' &&
          ex.muscleMappings.some((m) => m.muscleId === exp.muscleId && m.role === 'primary')
      );

      let reason = `Logged weekly exposure of ${exp.totalExposure} sets is below baseline target (${exp.targetMin}-${exp.targetMax} sets).`;
      if (exp.muscleId === 'hamstrings') {
        reason =
          'Knee-flexion hamstring work is underrepresented. Standard squats and lunges do not produce significant active hamstring shortening.';
      } else if (exp.muscleId === 'deltoid_lateral') {
        reason =
          'Lateral shoulder abductors receive minimal direct load in pure vertical and horizontal pushing movements.';
      } else if (exp.muscleId === 'rhomboids' || exp.muscleId === 'trapezius_mid_lower') {
        reason =
          'Horizontal pulling (scapular retraction) is underrepresented compared to vertical pulling and horizontal pressing.';
      } else if (exp.muscleId === 'tibialis_anterior') {
        reason =
          'Anterior shin muscles receive low eccentric loading without dedicated dorsiflexion work.';
      } else if (exp.muscleId === 'rotator_cuff') {
        reason =
          'External rotator and glenohumeral stabilisers need isolated external rotation to balance heavy pressing volume.';
      }

      gaps.push({
        muscleId: exp.muscleId,
        muscleName: exp.muscleName,
        region: exp.region,
        exposure: exp.totalExposure,
        targetMin: exp.targetMin,
        reason,
        suggestedExerciseIds: candidates.slice(0, 3).map((c) => c.id),
        confidence: exp.confidence,
      });
    }
  }

  return gaps;
}

/**
 * Multidimensional Exercise Comparison & Biomechanical Substitution Model
 */
export function compareExercises(exerciseA: Exercise, exerciseB: Exercise): ExerciseComparison {
  const mapA = new Map(exerciseA.muscleMappings.map((m) => [m.muscleId, m]));
  const mapB = new Map(exerciseB.muscleMappings.map((m) => [m.muscleId, m]));

  const sharedMuscles: ExerciseComparison['sharedMuscles'] = [];
  const distinctMusclesA: ExerciseComparison['distinctMusclesA'] = [];
  const distinctMusclesB: ExerciseComparison['distinctMusclesB'] = [];

  let roleAndEvidencePoints = 0;
  let maxPossibleRolePoints = 0;

  for (const [mId, mapEntryA] of mapA.entries()) {
    const mapEntryB = mapB.get(mId);
    maxPossibleRolePoints += 2.0;

    if (mapEntryB) {
      sharedMuscles.push({
        muscleId: mId,
        muscleName: mId.replace(/_/g, ' '),
        roleA: mapEntryA.role,
        roleB: mapEntryB.role,
        evidenceA: mapEntryA.evidenceCategory,
        evidenceB: mapEntryB.evidenceCategory,
      });

      if (mapEntryA.role === mapEntryB.role) {
        roleAndEvidencePoints += 2.0;
      } else if (
        (mapEntryA.role === 'primary' && mapEntryB.role === 'secondary') ||
        (mapEntryA.role === 'secondary' && mapEntryB.role === 'primary')
      ) {
        roleAndEvidencePoints += 1.0;
      } else {
        roleAndEvidencePoints += 0.5;
      }
    } else {
      distinctMusclesA.push({
        muscleId: mId,
        muscleName: mId.replace(/_/g, ' '),
        role: mapEntryA.role,
      });
    }
  }

  for (const [mId, mapEntryB] of mapB.entries()) {
    if (!mapA.has(mId)) {
      maxPossibleRolePoints += 2.0;
      distinctMusclesB.push({
        muscleId: mId,
        muscleName: mId.replace(/_/g, ' '),
        role: mapEntryB.role,
      });
    }
  }

  const muscleRoleAndEvidence =
    maxPossibleRolePoints > 0
      ? Number((roleAndEvidencePoints / maxPossibleRolePoints).toFixed(2))
      : 0.0;

  const patternsA = new Set(exerciseA.movementPatterns);
  const patternsB = new Set(exerciseB.movementPatterns);
  const sharedPatterns = Array.from(patternsA).filter((p) => patternsB.has(p));
  const totalUniquePatterns = new Set([...exerciseA.movementPatterns, ...exerciseB.movementPatterns]).size;
  const patternScore = totalUniquePatterns > 0 ? sharedPatterns.length / totalUniquePatterns : 0;

  const actionsA = new Set(exerciseA.muscleMappings.map((m) => m.jointAction.toLowerCase()));
  const actionsB = new Set(exerciseB.muscleMappings.map((m) => m.jointAction.toLowerCase()));
  const sharedActions = Array.from(actionsA).filter((a) => actionsB.has(a));
  const totalUniqueActions = new Set([...actionsA, ...actionsB]).size;
  const actionScore = totalUniqueActions > 0 ? sharedActions.length / totalUniqueActions : 0;

  const movementPatternAndJointActions = Number(((patternScore * 0.6 + actionScore * 0.4)).toFixed(2));

  let romAndResistanceProfile = 1.0;
  const mechanicalDifferences: string[] = [];

  if (exerciseA.defaultUnit !== exerciseB.defaultUnit) {
    romAndResistanceProfile -= 0.35;
    mechanicalDifferences.push(
      `Contraction modality differs: ${exerciseA.name} is measured in ${exerciseA.defaultUnit} (${exerciseA.defaultUnit === 'seconds' ? 'isometric hold' : 'dynamic repetitions'}), while ${exerciseB.name} is in ${exerciseB.defaultUnit}.`
    );
  }

  if (exerciseA.category !== exerciseB.category) {
    romAndResistanceProfile -= 0.25;
    mechanicalDifferences.push(
      `Exercise classification differs: ${exerciseA.name} belongs to ${exerciseA.category}, whereas ${exerciseB.name} belongs to ${exerciseB.category}.`
    );
  }
  romAndResistanceProfile = Math.max(0.0, Number(romAndResistanceProfile.toFixed(2)));

  let unilateralAndStabilityDemand = 1.0;
  const stabilityDifferences: string[] = [];

  if (exerciseA.unilateral !== exerciseB.unilateral) {
    unilateralAndStabilityDemand -= 0.35;
    stabilityDifferences.push(
      exerciseA.unilateral
        ? `${exerciseA.name} is unilateral (isolated single limb), imposing significant anti-rotation and stabilizer demand.`
        : `${exerciseB.name} is unilateral (isolated single limb), requiring greater stabilizer recruitment than bilateral ${exerciseA.name}.`
    );
  }

  const isSuspendedA = exerciseA.equipment.some((eq) => eq.includes('bar') || eq.includes('ring'));
  const isSuspendedB = exerciseB.equipment.some((eq) => eq.includes('bar') || eq.includes('ring'));
  if (isSuspendedA !== isSuspendedB) {
    unilateralAndStabilityDemand -= 0.20;
    stabilityDifferences.push(
      `Kinetic chain differs: ${isSuspendedA ? exerciseA.name : exerciseB.name} involves suspended/open-support stabilization, whereas the other is ground-supported.`
    );
  }
  unilateralAndStabilityDemand = Math.max(0.0, Number(unilateralAndStabilityDemand.toFixed(2)));

  let hierarchicalRelationship = 0.4;
  const isDirectRegression =
    exerciseA.regressions?.includes(exerciseB.id) ||
    exerciseB.progressions?.includes(exerciseA.id);
  const isDirectProgression =
    exerciseA.progressions?.includes(exerciseB.id) ||
    exerciseB.regressions?.includes(exerciseA.id);
  const isPrerequisite =
    exerciseA.prerequisites?.includes(exerciseB.id) ||
    exerciseB.prerequisites?.includes(exerciseA.id);

  if (isDirectRegression || isDirectProgression || isPrerequisite) {
    hierarchicalRelationship = 1.0;
    mechanicalDifferences.push(
      isDirectRegression
        ? `${exerciseB.name} is a designated canonical regression for ${exerciseA.name}.`
        : isDirectProgression
        ? `${exerciseB.name} is a designated canonical progression for ${exerciseA.name}.`
        : `Direct prerequisite dependency exists between ${exerciseA.name} and ${exerciseB.name}.`
    );
  }

  const compositeScore = Number(
    (
      muscleRoleAndEvidence * 0.35 +
      movementPatternAndJointActions * 0.25 +
      romAndResistanceProfile * 0.15 +
      unilateralAndStabilityDemand * 0.15 +
      hierarchicalRelationship * 0.10
    ).toFixed(2)
  );

  const scores: MultidimensionalComparisonScores = {
    muscleRoleAndEvidence,
    movementPatternAndJointActions,
    romAndResistanceProfile,
    unilateralAndStabilityDemand,
    hierarchicalRelationship,
    compositeScore,
  };

  let substitutionFeasibility: SubstitutionFeasibility = 'partial_complement';
  if (compositeScore >= 0.82 && patternScore >= 0.6) {
    substitutionFeasibility = 'direct_equivalent';
  } else if (isDirectRegression || (compositeScore >= 0.65 && exerciseA.difficulty > exerciseB.difficulty)) {
    substitutionFeasibility = 'regression_suitable';
  } else if (isDirectProgression || (compositeScore >= 0.65 && exerciseA.difficulty < exerciseB.difficulty)) {
    substitutionFeasibility = 'progression_suitable';
  } else if (compositeScore < 0.40 || patternScore === 0) {
    substitutionFeasibility = 'biomechanically_incompatible';
  }

  const jointActionDifferences: string[] = [];
  const onlyInA = Array.from(actionsA).filter((a) => !actionsB.has(a));
  const onlyInB = Array.from(actionsB).filter((a) => !actionsA.has(a));
  if (onlyInA.length > 0) {
    jointActionDifferences.push(`${exerciseA.name} specifically drives: ${onlyInA.join(', ')}.`);
  }
  if (onlyInB.length > 0) {
    jointActionDifferences.push(`${exerciseB.name} specifically drives: ${onlyInB.join(', ')}.`);
  }

  let practicalRecommendation = '';
  switch (substitutionFeasibility) {
    case 'direct_equivalent':
      practicalRecommendation = `${exerciseA.name} and ${exerciseB.name} share near-identical prime mover recruitment, joint actions, and stability profiles. They can substitute seamlessly in training blocks.`;
      break;
    case 'regression_suitable':
      practicalRecommendation = `${exerciseB.name} provides a mechanically sound regression for ${exerciseA.name}, maintaining similar recruitment with reduced leverage or stabilization demands.`;
      break;
    case 'progression_suitable':
      practicalRecommendation = `${exerciseB.name} serves as a challenging progression over ${exerciseA.name}, demanding increased force output or stability.`;
      break;
    case 'partial_complement':
      practicalRecommendation = `${exerciseA.name} and ${exerciseB.name} share secondary muscle overlap but have distinct mechanical profiles. They complement each other rather than acting as direct substitutes.`;
      break;
    case 'biomechanically_incompatible':
      practicalRecommendation = `${exerciseA.name} and ${exerciseB.name} operate across distinct movement planes and joint actions. One cannot serve as a mechanical substitute for the other.`;
      break;
  }

  return {
    exerciseA,
    exerciseB,
    similarityScore: compositeScore,
    scores,
    substitutionFeasibility,
    sharedMuscles,
    distinctMusclesA,
    distinctMusclesB,
    mechanicalDifferences,
    jointActionDifferences,
    stabilityDifferences,
    practicalRecommendation,
    limitations: [
      'Model comparison is derived from kinematic classifications and muscle moment arm literature.',
      'Individual limb length, anthropometry, and active mobility may alter relative mechanical leverage.',
    ],
  };
}

export function calculateJointTorque(
  forceNewtons: number,
  momentArmMeters: number,
  jointAngleDegrees: number = 90
): ModelOutput<number> {
  const thetaRad = (jointAngleDegrees * Math.PI) / 180;
  const torque = forceNewtons * momentArmMeters * Math.sin(thetaRad);

  return {
    model: 'joint_torque',
    version: '1.0.0',
    value: Number(torque.toFixed(2)),
    unit: 'Nm',
    confidence: 'high',
    classification: 'modelled',
    assumptions: [
      'Static 2D rigid-body assumption.',
      'Perpendicular moment arm measured from joint center of rotation to line of action.',
    ],
    sourceIds: ['winter_2009_biomechanics'],
    generatedAt: new Date().toISOString(),
  };
}

export function calculateMechanicalWork(
  forceNewtons: number,
  displacementMeters: number,
  angleDegrees: number = 0
): ModelOutput<number> {
  const thetaRad = (angleDegrees * Math.PI) / 180;
  const work = forceNewtons * displacementMeters * Math.cos(thetaRad);

  return {
    model: 'mechanical_work',
    version: '1.0.0',
    value: Number(work.toFixed(2)),
    unit: 'Joules',
    confidence: 'high',
    classification: 'modelled',
    assumptions: ['Constant force application through displacement vector.'],
    sourceIds: ['hall_2018_basic_biomechanics'],
    generatedAt: new Date().toISOString(),
  };
}

export function calculatePower(
  workJoules: number,
  durationSeconds: number
): ModelOutput<number> {
  if (durationSeconds <= 0) {
    throw new Error('Duration must be greater than zero seconds to compute power.');
  }

  const power = workJoules / durationSeconds;

  return {
    model: 'mechanical_power',
    version: '1.0.0',
    value: Number(power.toFixed(2)),
    unit: 'Watts',
    confidence: 'high',
    classification: 'modelled',
    assumptions: ['Average mechanical power over completed repetition interval.'],
    sourceIds: ['hall_2018_basic_biomechanics'],
    generatedAt: new Date().toISOString(),
  };
}

export function calculateRIR(
  maxSoundReps: number,
  completedReps: number
): ModelOutput<number> {
  if (completedReps > maxSoundReps) {
    throw new Error('Completed repetitions cannot exceed estimated technical maximum repetitions.');
  }

  const rir = maxSoundReps - completedReps;

  return {
    model: 'repetitions_in_reserve',
    version: '1.0.0',
    value: rir,
    unit: 'reps',
    confidence: 'moderate',
    classification: 'user_reported',
    assumptions: [
      'Estimates repetitions remaining before technical form failure, not absolute volitional failure.',
      'Subject to subjective perception error of +/- 1 rep in trained individuals.',
    ],
    sourceIds: ['helms_2016_rir_rpe_scale', 'zourdos_2016_rpe_novel_resistance'],
    generatedAt: new Date().toISOString(),
  };
}
