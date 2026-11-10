import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateWeeklyExposure } from '../packages/calculations/src';
import { canonicalExercises, canonicalMuscles } from '../packages/exercise-data/src';
import { WorkoutSession } from '../packages/domain/src';

test('Unilateral Accounting: Paired Unilateral Sets Prevent Volume Double-Counting', () => {
  // Assisted Pistol Squats (canonical unilateral exercise for quadriceps):
  // If user does 3 sets of left leg and 3 sets of right leg,
  // each leg experiences 3 sets of stimulus.
  // In the old buggy engine, this would count as 3 + 3 = 6 sets (falsely doubling volume!).
  // Under the corrected paired-limb accounting, 3 left sets + 3 right sets = 3.0 effective bilateral sets.
  const session: WorkoutSession = {
    id: 'sess-uni-1',
    name: 'Unilateral Legs Session',
    startedAt: '2026-11-03T10:00:00Z',
    completed: true,
    sets: [
      // Set 1: Left + Right
      { id: 's1-l', sessionId: 'sess-uni-1', exerciseId: 'assisted_pistol_squats', setNumber: 1, reps: 8, side: 'left', techniqueQuality: 'good', completedAt: '2026-11-03T10:05:00Z' },
      { id: 's1-r', sessionId: 'sess-uni-1', exerciseId: 'assisted_pistol_squats', setNumber: 1, reps: 8, side: 'right', techniqueQuality: 'good', completedAt: '2026-11-03T10:07:00Z' },
      // Set 2: Left + Right
      { id: 's2-l', sessionId: 'sess-uni-1', exerciseId: 'assisted_pistol_squats', setNumber: 2, reps: 8, side: 'left', techniqueQuality: 'good', completedAt: '2026-11-03T10:10:00Z' },
      { id: 's2-r', sessionId: 'sess-uni-1', exerciseId: 'assisted_pistol_squats', setNumber: 2, reps: 8, side: 'right', techniqueQuality: 'good', completedAt: '2026-11-03T10:12:00Z' },
      // Set 3: Left + Right
      { id: 's3-l', sessionId: 'sess-uni-1', exerciseId: 'assisted_pistol_squats', setNumber: 3, reps: 8, side: 'left', techniqueQuality: 'good', completedAt: '2026-11-03T10:15:00Z' },
      { id: 's3-r', sessionId: 'sess-uni-1', exerciseId: 'assisted_pistol_squats', setNumber: 3, reps: 8, side: 'right', techniqueQuality: 'good', completedAt: '2026-11-03T10:17:00Z' },
    ],
  };

  const output = calculateWeeklyExposure([session], canonicalExercises, canonicalMuscles);
  const quads = output.value.find((m) => m.muscleId === 'quadriceps')!;

  // 3 pairs (6 total individual limb logs) = 3.0 effective sets of stimulus!
  assert.equal(quads.directSets, 3.0, '3 left + 3 right unilateral sets must equal 3.0 effective bilateral sets, NOT 6.0');
  assert.equal(quads.unilateralBreakdown.leftSets, 3);
  assert.equal(quads.unilateralBreakdown.rightSets, 3);
  assert.equal(quads.unilateralBreakdown.pairedSets, 3);
  assert.equal(quads.unilateralBreakdown.asymmetryDelta, 0, 'Symmetrical execution must have 0 asymmetry delta');
});

test('Unilateral Accounting: Left-Only and Incomplete/Skipped Sides', () => {
  // User performs 2 sets on left leg, but only 1 set on right leg (right set skipped due to fatigue)
  const session: WorkoutSession = {
    id: 'sess-asym',
    name: 'Asymmetric Leg Session',
    startedAt: '2026-11-03T10:00:00Z',
    completed: true,
    sets: [
      { id: 's1-l', sessionId: 'sess-asym', exerciseId: 'assisted_pistol_squats', setNumber: 1, reps: 8, side: 'left', techniqueQuality: 'good', completedAt: '2026-11-03T10:05:00Z' },
      { id: 's1-r', sessionId: 'sess-asym', exerciseId: 'assisted_pistol_squats', setNumber: 1, reps: 8, side: 'right', techniqueQuality: 'good', completedAt: '2026-11-03T10:07:00Z' },
      { id: 's2-l', sessionId: 'sess-asym', exerciseId: 'assisted_pistol_squats', setNumber: 2, reps: 8, side: 'left', techniqueQuality: 'good', completedAt: '2026-11-03T10:10:00Z' },
    ],
  };

  const output = calculateWeeklyExposure([session], canonicalExercises, canonicalMuscles);
  const quads = output.value.find((m) => m.muscleId === 'quadriceps')!;

  // 1 pair (1.0) + 1 un-paired left set (0.5) = 1.5 effective bilateral sets
  assert.equal(quads.directSets, 1.5, '2 left + 1 right sets must equal 1.5 effective bilateral sets');
  assert.equal(quads.unilateralBreakdown.leftSets, 2);
  assert.equal(quads.unilateralBreakdown.rightSets, 1);
  assert.equal(quads.unilateralBreakdown.pairedSets, 1);
  assert.equal(quads.unilateralBreakdown.asymmetryDelta, 1, 'Asymmetry delta must reflect 1 un-paired set deficit');
});

test('Unilateral Accounting: Combined each_side / both_sides Logging', () => {
  // If a set is logged with side="both_sides" or "each_side", it represents 1 completed set on both limbs.
  // It must equate to 1.0 effective bilateral set (NOT 2.0).
  const session: WorkoutSession = {
    id: 'sess-comb',
    name: 'Combined Unilateral Session',
    startedAt: '2026-11-03T10:00:00Z',
    completed: true,
    sets: [
      {
        id: 's1-both',
        sessionId: 'sess-comb',
        exerciseId: 'assisted_pistol_squats',
        setNumber: 1,
        reps: 8,
        side: 'both_sides' as any,
        techniqueQuality: 'good',
        completedAt: '2026-11-03T10:05:00Z',
      },
    ],
  };

  const output = calculateWeeklyExposure([session], canonicalExercises, canonicalMuscles);
  const quads = output.value.find((m) => m.muscleId === 'quadriceps')!;

  assert.equal(quads.directSets, 1.0, 'A single combined set completed on both sides must equal 1.0 effective set, NOT 2.0');
});

test('Unilateral Accounting: Pure Bilateral Exercises', () => {
  // Bilateral push-up: both limbs work together
  const session: WorkoutSession = {
    id: 'sess-bi',
    name: 'Bilateral Push Session',
    startedAt: '2026-11-03T10:00:00Z',
    completed: true,
    sets: [
      { id: 's1-bi', sessionId: 'sess-bi', exerciseId: 'pushup_standard', setNumber: 1, reps: 15, side: 'bilateral', techniqueQuality: 'good', completedAt: '2026-11-03T10:05:00Z' },
      { id: 's2-bi', sessionId: 'sess-bi', exerciseId: 'pushup_standard', setNumber: 2, reps: 15, side: 'bilateral', techniqueQuality: 'good', completedAt: '2026-11-03T10:08:00Z' },
    ],
  };

  const output = calculateWeeklyExposure([session], canonicalExercises, canonicalMuscles);
  const chest = output.value.find((m) => m.muscleId === 'pectoralis_major_sternal')!;

  assert.equal(chest.directSets, 2.0);
  assert.equal(chest.unilateralBreakdown.bilateralSets, 2);
  assert.equal(chest.unilateralBreakdown.leftSets, 0);
  assert.equal(chest.unilateralBreakdown.rightSets, 0);
  assert.equal(chest.unilateralBreakdown.asymmetryDelta, 0);
});
