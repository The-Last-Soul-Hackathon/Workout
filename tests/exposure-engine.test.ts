import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateWeeklyExposure,
  analyzeCoverageGaps,
} from '../packages/calculations/src';
import {
  canonicalExercises,
  canonicalMuscles,
} from '../packages/exercise-data/src';
import { WorkoutSession, SetLog } from '../packages/domain/src';

test('Exposure Engine: Mobility vs Resistance Separation', () => {
  // Surya Namaskar (Round 23 mobility flow) targets erector spinae, hamstrings, deltoids
  const mobilitySession: WorkoutSession = {
    id: 'sess-mobility-1',
    name: 'Dynamic Flow Mobility Session',
    startedAt: '2026-11-01T08:00:00Z',
    completed: true,
    sets: [
      {
        id: 'set-mob-1',
        sessionId: 'sess-mobility-1',
        exerciseId: 'surya_namaskar',
        setNumber: 1,
        reps: 5,
        side: 'bilateral',
        techniqueQuality: 'good',
        completedAt: '2026-11-01T08:10:00Z',
      },
      {
        id: 'set-mob-2',
        sessionId: 'sess-mobility-1',
        exerciseId: 'adho_mukha_svanasana',
        setNumber: 1,
        holdSeconds: 45,
        side: 'bilateral',
        techniqueQuality: 'good',
        completedAt: '2026-11-01T08:15:00Z',
      },
    ],
  };

  const output = calculateWeeklyExposure([mobilitySession], canonicalExercises, canonicalMuscles);

  // Mobility exercises MUST NOT inflate resistance hypertrophy sets
  const hamstrings = output.value.find((m) => m.muscleId === 'hamstrings')!;
  const erector = output.value.find((m) => m.muscleId === 'erector_spinae')!;

  assert.equal(hamstrings.directSets, 0, 'Mobility movements must not be counted as direct resistance sets');
  assert.equal(hamstrings.indirectSets, 0, 'Mobility movements must not inflate indirect resistance sets');
  assert.equal(hamstrings.totalResistanceExposure, 0, 'Total resistance hypertrophy volume must remain 0 for mobility');
  assert.ok(hamstrings.mobilityWorkload > 0, 'Mobility workload must be recorded separately');
  assert.ok(erector.mobilityWorkload > 0, 'Erector spinae mobility workload must be recorded separately');
});

test('Exposure Engine: Cardio Conditioning vs Resistance Separation', () => {
  const cardioSession: WorkoutSession = {
    id: 'sess-cardio-1',
    name: 'Sprints & Jumping Conditioning',
    startedAt: '2026-11-01T09:00:00Z',
    completed: true,
    sets: [
      {
        id: 'set-c-1',
        sessionId: 'sess-cardio-1',
        exerciseId: 'jumping_standard',
        setNumber: 1,
        reps: 60,
        side: 'bilateral',
        techniqueQuality: 'good',
        completedAt: '2026-11-01T09:05:00Z',
      },
      {
        id: 'set-c-2',
        sessionId: 'sess-cardio-1',
        exerciseId: 'suicide_runs',
        setNumber: 1,
        distanceMeters: 30,
        side: 'bilateral',
        techniqueQuality: 'good',
        completedAt: '2026-11-01T09:10:00Z',
      },
    ],
  };

  const output = calculateWeeklyExposure([cardioSession], canonicalExercises, canonicalMuscles);
  const quads = output.value.find((m) => m.muscleId === 'quadriceps')!;
  const calves = output.value.find((m) => m.muscleId === 'gastrocnemius')!;

  assert.equal(quads.directSets, 0, 'Cardio sets must not count as direct resistance hypertrophy sets');
  assert.equal(quads.totalResistanceExposure, 0, 'Resistance hypertrophy volume must remain 0');
  assert.ok(calves.conditioningWorkload > 0, 'Conditioning workload must be captured distinctly');
});

test('Exposure Engine: Date Interval & Timezone Windowing', () => {
  const sessionInside: WorkoutSession = {
    id: 'sess-in',
    name: 'Inside Target Week',
    startedAt: '2026-11-05T10:00:00Z',
    completed: true,
    sets: [
      {
        id: 's-in',
        sessionId: 'sess-in',
        exerciseId: 'pushup_standard',
        setNumber: 1,
        reps: 10,
        side: 'bilateral',
        techniqueQuality: 'good',
        completedAt: '2026-11-05T10:05:00Z',
      },
    ],
  };

  const sessionOutside: WorkoutSession = {
    id: 'sess-out',
    name: 'Outside Target Week (Prior Month)',
    startedAt: '2026-10-15T10:00:00Z',
    completed: true,
    sets: [
      {
        id: 's-out',
        sessionId: 'sess-out',
        exerciseId: 'pushup_standard',
        setNumber: 1,
        reps: 10,
        side: 'bilateral',
        techniqueQuality: 'good',
        completedAt: '2026-10-15T10:05:00Z',
      },
    ],
  };

  const output = calculateWeeklyExposure(
    [sessionInside, sessionOutside],
    canonicalExercises,
    canonicalMuscles,
    {
      interval: {
        start: '2026-11-01T00:00:00Z',
        end: '2026-11-07T23:59:59Z',
      },
      timezone: 'UTC',
    }
  );

  const chest = output.value.find((m) => m.muscleId === 'pectoralis_major_sternal')!;
  assert.equal(chest.directSets, 1.0, 'Only sessions inside the target date interval must be aggregated');
  assert.equal(output.metadata?.qualifiedSessionsCount, 1);
});

test('Exposure Engine: Invalid and Incomplete Sessions Exclusion', () => {
  const incompleteSession: WorkoutSession = {
    id: 'sess-inc',
    name: 'Abandoned Incomplete Workout',
    startedAt: '2026-11-02T10:00:00Z',
    completed: false, // Incomplete session
    sets: [
      {
        id: 's-inc',
        sessionId: 'sess-inc',
        exerciseId: 'pullup_standard',
        setNumber: 1,
        reps: 5,
        side: 'bilateral',
        techniqueQuality: 'good',
        completedAt: '2026-11-02T10:05:00Z',
      },
    ],
  };

  const output = calculateWeeklyExposure(
    [incompleteSession],
    canonicalExercises,
    canonicalMuscles,
    { qualificationRules: { requireCompletedSession: true } }
  );

  const lats = output.value.find((m) => m.muscleId === 'latissimus_dorsi')!;
  assert.equal(lats.directSets, 0, 'Incomplete sessions must be excluded when requireCompletedSession is true');
  assert.equal(output.metadata?.qualifiedSessionsCount, 0);
});

test('Exposure Engine: Degraded Technique and Zero-Effort Exclusion', () => {
  const session: WorkoutSession = {
    id: 'sess-qual',
    name: 'Quality Filter Session',
    startedAt: '2026-11-02T10:00:00Z',
    completed: true,
    sets: [
      {
        id: 's-deg',
        sessionId: 'sess-qual',
        exerciseId: 'pushup_standard',
        setNumber: 1,
        reps: 10,
        side: 'bilateral',
        techniqueQuality: 'degraded', // Form breakdown / cheat reps
        completedAt: '2026-11-02T10:05:00Z',
      },
      {
        id: 's-zero',
        sessionId: 'sess-qual',
        exerciseId: 'pushup_standard',
        setNumber: 2,
        reps: 0, // Zero effort
        side: 'bilateral',
        techniqueQuality: 'good',
        completedAt: '2026-11-02T10:08:00Z',
      },
      {
        id: 's-valid',
        sessionId: 'sess-qual',
        exerciseId: 'pushup_standard',
        setNumber: 3,
        reps: 8,
        side: 'bilateral',
        techniqueQuality: 'good',
        completedAt: '2026-11-02T10:12:00Z',
      },
    ],
  };

  const output = calculateWeeklyExposure(
    [session],
    canonicalExercises,
    canonicalMuscles,
    { qualificationRules: { excludeDegradedTechnique: true } }
  );

  const chest = output.value.find((m) => m.muscleId === 'pectoralis_major_sternal')!;
  assert.equal(chest.directSets, 1.0, 'Only the 1 valid, non-degraded, non-zero set must qualify');
  assert.equal(output.metadata?.excludedSetsCount, 2);
});

test('Exposure Engine: Personalized Targets Integration', () => {
  const session: WorkoutSession = {
    id: 'sess-targets',
    name: 'Target Calibration Session',
    startedAt: '2026-11-02T10:00:00Z',
    completed: true,
    sets: [
      {
        id: 's-1',
        sessionId: 'sess-targets',
        exerciseId: 'pushup_standard',
        setNumber: 1,
        reps: 10,
        side: 'bilateral',
        techniqueQuality: 'good',
        completedAt: '2026-11-02T10:05:00Z',
      },
      {
        id: 's-2',
        sessionId: 'sess-targets',
        exerciseId: 'pushup_standard',
        setNumber: 2,
        reps: 10,
        side: 'bilateral',
        techniqueQuality: 'good',
        completedAt: '2026-11-02T10:08:00Z',
      },
    ],
  };

  // User has personalized target of 2 - 4 sets for chest (rehab / low volume phase)
  const output = calculateWeeklyExposure(
    [session],
    canonicalExercises,
    canonicalMuscles,
    {
      personalizedTargets: [
        { muscleId: 'pectoralis_major_sternal', targetMin: 2, targetMax: 4 },
      ],
    }
  );

  const chest = output.value.find((m) => m.muscleId === 'pectoralis_major_sternal')!;
  assert.equal(chest.isTargetPersonalized, true, 'isTargetPersonalized must be true');
  assert.equal(chest.targetMin, 2);
  assert.equal(chest.targetMax, 4);
  assert.equal(chest.status, 'in_target', '2 sets must be in_target for 2-4 target');

  // Verify non-personalized muscle falls back to canonical defaults
  const lats = output.value.find((m) => m.muscleId === 'latissimus_dorsi')!;
  assert.equal(lats.isTargetPersonalized, false);
  assert.equal(lats.targetMin, 10);
});

test('Exposure Engine: Dynamic Evidence & Confidence Propagation', () => {
  const session: WorkoutSession = {
    id: 'sess-evidence',
    name: 'Evidence Session',
    startedAt: '2026-11-02T10:00:00Z',
    completed: true,
    sets: [
      {
        id: 's-1',
        sessionId: 'sess-evidence',
        exerciseId: 'pullup_standard',
        setNumber: 1,
        reps: 6,
        side: 'bilateral',
        techniqueQuality: 'good',
        completedAt: '2026-11-02T10:05:00Z',
      },
    ],
  };

  const output = calculateWeeklyExposure([session], canonicalExercises, canonicalMuscles);
  const lats = output.value.find((m) => m.muscleId === 'latissimus_dorsi')!;

  assert.ok(lats.evidenceCategories.length > 0, 'Evidence categories must be populated');
  assert.notEqual(lats.confidence, 'unknown', 'Confidence must not be unknown for canonical exercises');
  assert.notEqual(output.confidence, undefined);
});
