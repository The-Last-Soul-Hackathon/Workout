import {
  Muscle,
  Exercise,
  WorkoutSession,
  MuscleExposure,
  CoverageGap,
  ExerciseComparison,
  MuscleRole,
  ModelOutput,
} from '../../domain/src';

export function calculateWeeklyExposure(
  sessions: WorkoutSession[],
  exercises: Exercise[],
  muscles: Muscle[]
): ModelOutput<MuscleExposure[]> {
  const exerciseMap = new Map<string, Exercise>();
  exercises.forEach((ex) => exerciseMap.set(ex.id, ex));

  const exposureMap = new Map<
    string,
    {
      directSets: number;
      indirectSets: number;
      contributingExercises: Map<
        string,
        {
          exerciseName: string;
          sets: number;
          role: MuscleRole;
          contribution: number;
        }
      >;
    }
  >();

  muscles.forEach((m) => {
    exposureMap.set(m.id, {
      directSets: 0,
      indirectSets: 0,
      contributingExercises: new Map(),
    });
  });

  for (const session of sessions) {
    for (const set of session.sets) {
      const exercise = exerciseMap.get(set.exerciseId);
      if (!exercise) continue;

      for (const mapping of exercise.muscleMappings) {
        const acc = exposureMap.get(mapping.muscleId);
        if (!acc) continue;

        const effectiveSets = (set.side as string) === 'each_side' ? 2 : 1;

        if (mapping.role === 'primary') {
          acc.directSets += effectiveSets;
        } else if (mapping.role === 'secondary' || mapping.role === 'synergist' || mapping.role === 'stabiliser') {
          acc.indirectSets += effectiveSets * mapping.coefficient;
        }

        const contrib = acc.contributingExercises.get(exercise.id) || {
          exerciseName: exercise.name,
          sets: 0,
          role: mapping.role,
          contribution: 0,
        };
        contrib.sets += effectiveSets;
        contrib.contribution += effectiveSets * mapping.coefficient;
        acc.contributingExercises.set(exercise.id, contrib);
      }
    }
  }

  const results: MuscleExposure[] = muscles.map((m) => {
    const acc = exposureMap.get(m.id)!;
    const totalExposure = Number((acc.directSets + acc.indirectSets).toFixed(1));

    let status: MuscleExposure['status'] = 'below_target';
    if (totalExposure >= m.defaultWeeklyTargetMin && totalExposure <= m.defaultWeeklyTargetMax) {
      status = 'in_target';
    } else if (totalExposure > m.defaultWeeklyTargetMax) {
      status = 'above_target';
    } else if (totalExposure === 0) {
      status = 'below_target';
    }

    return {
      muscleId: m.id,
      muscleName: m.name,
      region: m.region,
      directSets: acc.directSets,
      indirectSets: Number(acc.indirectSets.toFixed(1)),
      totalExposure,
      status,
      targetMin: m.defaultWeeklyTargetMin,
      targetMax: m.defaultWeeklyTargetMax,
      contributingExercises: Array.from(acc.contributingExercises.entries()).map(([exerciseId, v]) => ({
        exerciseId,
        exerciseName: v.exerciseName,
        sets: v.sets,
        role: v.role,
        contribution: Number(v.contribution.toFixed(1)),
      })),
    };
  });

  return {
    model: 'weekly_muscle_exposure',
    version: '1.0.0',
    value: results,
    unit: 'fractional_sets',
    confidence: 'high',
    classification: 'modelled',
    assumptions: [
      'Primary mover sets receive 1.0 direct set value.',
      'Synergists receive 0.5 and stabilisers receive 0.2 indirect coefficient.',
      'Exercise execution assumes full range of motion and good technique.',
    ],
    sourceIds: ['biomechanics_emg_consensus', 'pelland_2026_dose_response'],
    generatedAt: new Date().toISOString(),
  };
}

export function analyzeCoverageGaps(
  exposures: MuscleExposure[],
  exercises: Exercise[]
): CoverageGap[] {
  const gaps: CoverageGap[] = [];

  for (const exp of exposures) {
    if (exp.totalExposure < exp.targetMin) {
      const candidates = exercises.filter((ex) =>
        ex.muscleMappings.some((m) => m.muscleId === exp.muscleId && m.role === 'primary')
      );

      let reason = `Logged weekly exposure of ${exp.totalExposure} sets is below baseline target (${exp.targetMin}-${exp.targetMax} sets).`;
      if (exp.muscleId === 'hamstrings') {
        reason = 'Knee-flexion hamstring work is underrepresented. Standard squats and lunges do not produce significant active hamstring shortening.';
      } else if (exp.muscleId === 'deltoid_lateral') {
        reason = 'Lateral shoulder abductors receive minimal direct load in pure vertical and horizontal pushing movements.';
      } else if (exp.muscleId === 'rhomboids' || exp.muscleId === 'trapezius_mid_lower') {
        reason = 'Horizontal pulling (rows) is underrepresented compared to vertical pulling and horizontal pressing.';
      } else if (exp.muscleId === 'tibialis_anterior') {
        reason = 'Anterior shin muscles receive low eccentric loading without dedicated dorsiflexion work.';
      }

      gaps.push({
        muscleId: exp.muscleId,
        muscleName: exp.muscleName,
        region: exp.region,
        exposure: exp.totalExposure,
        targetMin: exp.targetMin,
        reason,
        suggestedExerciseIds: candidates.slice(0, 3).map((c) => c.id),
        confidence: 'high',
      });
    }
  }

  return gaps;
}

export function compareExercises(exerciseA: Exercise, exerciseB: Exercise): ExerciseComparison {
  const mapA = new Map(exerciseA.muscleMappings.map((m) => [m.muscleId, m]));
  const mapB = new Map(exerciseB.muscleMappings.map((m) => [m.muscleId, m]));

  const sharedMuscles: ExerciseComparison['sharedMuscles'] = [];
  const distinctMusclesA: ExerciseComparison['distinctMusclesA'] = [];
  const distinctMusclesB: ExerciseComparison['distinctMusclesB'] = [];

  for (const [mId, mapEntryA] of mapA.entries()) {
    const mapEntryB = mapB.get(mId);
    if (mapEntryB) {
      sharedMuscles.push({
        muscleId: mId,
        muscleName: mId.replace(/_/g, ' '),
        roleA: mapEntryA.role,
        roleB: mapEntryB.role,
      });
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
      distinctMusclesB.push({
        muscleId: mId,
        muscleName: mId.replace(/_/g, ' '),
        role: mapEntryB.role,
      });
    }
  }

  const mechanicalDifferences: string[] = [];
  if (exerciseA.unilateral !== exerciseB.unilateral) {
    mechanicalDifferences.push(
      exerciseA.unilateral
        ? `${exerciseA.name} is unilateral (side-isolated), increasing stability and core anti-rotation demand.`
        : `${exerciseB.name} is unilateral (side-isolated), demanding higher single-limb coordination.`
    );
  }

  if (exerciseA.difficulty !== exerciseB.difficulty) {
    mechanicalDifferences.push(
      `Difficulty tier differs: ${exerciseA.name} is ${exerciseA.difficulty}, while ${exerciseB.name} is ${exerciseB.difficulty}.`
    );
  }

  const sim = Number(
    (
      (sharedMuscles.length * 2) /
      (exerciseA.muscleMappings.length + exerciseB.muscleMappings.length)
    ).toFixed(2)
  );

  return {
    exerciseA,
    exerciseB,
    similarityScore: Math.min(1.0, Math.max(0.0, sim)),
    sharedMuscles,
    distinctMusclesA,
    distinctMusclesB,
    mechanicalDifferences,
    practicalRecommendation:
      sim > 0.75
        ? `${exerciseA.name} and ${exerciseB.name} share core recruitment patterns and can serve as close regressions/progressions.`
        : `${exerciseA.name} and ${exerciseB.name} have distinct mechanical emphasis and complement each other well in a weekly split.`,
  };
}
