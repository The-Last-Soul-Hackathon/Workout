import test from 'node:test';
import assert from 'node:assert/strict';
import { compareExercises } from '../packages/calculations/src';
import { canonicalExercises } from '../packages/exercise-data/src';

test('Exercise Comparison: Two Exercises Are Not Equivalent Solely Due to Muscle Overlap', () => {
  // Push-up vs Side Plank:
  // Push-up is dynamic horizontal push (reps), Side Plank is static lateral/core hold (seconds).
  const pushup = canonicalExercises.find((e) => e.id === 'pushup_standard')!;
  const sidePlank = canonicalExercises.find((e) => e.id === 'side_plank')!;

  const comparison = compareExercises(pushup, sidePlank);

  assert.notEqual(
    comparison.substitutionFeasibility,
    'direct_equivalent',
    'Push-up and Side Plank must not be marked as direct equivalents'
  );
  assert.ok(comparison.scores.compositeScore < 0.8, 'Composite score must penalize differing contraction modalities');
  assert.ok(
    comparison.mechanicalDifferences.some((d) => d.includes('Contraction modality') || d.includes('isometric hold')),
    'Must document isometric vs dynamic mechanical difference'
  );
});

test('Exercise Comparison: Unilateral vs Bilateral Stability Penalty', () => {
  // Standard Squat vs Assisted Pistol Squats:
  // Both are squat pattern, but pistol squat is unilateral and imposes anti-rotation/stabilizer demand.
  const squat = canonicalExercises.find((e) => e.id === 'squat_bodyweight')!;
  const pistol = canonicalExercises.find((e) => e.id === 'assisted_pistol_squats')!;

  const comparison = compareExercises(squat, pistol);

  assert.notEqual(comparison.substitutionFeasibility, 'direct_equivalent');
  assert.ok(comparison.scores.unilateralAndStabilityDemand < 1.0, 'Must apply stability penalty for unilateral loading');
  assert.ok(
    comparison.stabilityDifferences.some((d) => d.includes('unilateral') || d.includes('anti-rotation')),
    'Must record stability and anti-rotation differences'
  );
});

test('Exercise Comparison: Direct Progression & Regression Linkage', () => {
  // Wide-Grip Pull-up vs Standard Pull-up:
  // Standard pull-up is an established canonical regression for Wide-grip pull-up.
  const widePullup = canonicalExercises.find((e) => e.id === 'pullup_wide_grip')!;
  const standardPullup = canonicalExercises.find((e) => e.id === 'pullup_standard')!;

  const comparison = compareExercises(widePullup, standardPullup);

  assert.ok(
    comparison.substitutionFeasibility === 'regression_suitable' ||
    comparison.substitutionFeasibility === 'direct_equivalent' ||
    comparison.scores.hierarchicalRelationship >= 0.7,
    'Must detect progression/regression hierarchy between pull-up variants'
  );
  assert.equal(comparison.scores.hierarchicalRelationship, 1.0, 'Direct regression must receive 1.0 hierarchy score');
});

test('Exercise Comparison: Distinct Kinetic Chains & Incompatible Movements', () => {
  // Standard Pull-up (vertical pull) vs Standard Squat (bilateral squat)
  const pullup = canonicalExercises.find((e) => e.id === 'pullup_standard')!;
  const squat = canonicalExercises.find((e) => e.id === 'squat_bodyweight')!;

  const comparison = compareExercises(pullup, squat);

  assert.equal(
    comparison.substitutionFeasibility,
    'biomechanically_incompatible',
    'Pull-up and Squat must be flagged as biomechanically incompatible substitutes'
  );
  assert.ok(comparison.similarityScore < 0.40, 'Similarity score must be low for unrelated movement planes');
  assert.ok(comparison.practicalRecommendation.includes('cannot serve as a mechanical substitute'));
});
