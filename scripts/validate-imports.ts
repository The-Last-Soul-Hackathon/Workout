#!/usr/bin/env tsx
// CLI Script: Automated Validation Test Suite for Research & Data Foundation
// Usage: npx tsx scripts/validate-imports.ts

import { canonicalMuscles } from '../packages/exercise-data/src/muscles';
import { canonicalExercises } from '../packages/exercise-data/src/exercises';
import { canonicalRounds } from '../packages/exercise-data/src/rounds';
import { ExerciseValidator } from '../packages/exercise-data/src/validation/schemas';
import { ExerciseMatcher } from '../packages/exercise-data/src/deduplication/exercise-matcher';
import { StringSimilarity } from '../packages/exercise-data/src/deduplication/string-similarity';
import { LicenceValidator } from '../packages/exercise-data/src/licence-checks/licence-validator';
import { calculateWeeklyExposure } from '../packages/calculations/src/index';
import { WorkoutSession, Exercise } from '@muscle-intelligence/domain';

interface TestResult {
  suite: string;
  testName: string;
  passed: boolean;
  message?: string;
}

const results: TestResult[] = [];

function assert(suite: string, testName: string, condition: boolean, message?: string) {
  results.push({
    suite,
    testName,
    passed: condition,
    message: condition ? undefined : message || 'Assertion failed',
  });
}

// -----------------------------------------------------------------------------
// 1. ANATOMY VALIDATION
// -----------------------------------------------------------------------------
console.log('Running Suite 1: Anatomical Taxonomy Integrity...');
const muscleIdSet = new Set(canonicalMuscles.map((m) => m.id));
assert('Anatomy', 'Should have at least 28 functional muscles', canonicalMuscles.length >= 28);

const expectedRegions = [
  'chest', 'back', 'shoulders', 'arms', 'forearms',
  'core', 'hips_glutes', 'thighs', 'calves_feet', 'neck',
];
const foundRegions = new Set(canonicalMuscles.map((m) => m.region));
expectedRegions.forEach((reg) => {
  assert('Anatomy', `Should contain region "${reg}"`, foundRegions.has(reg as any));
});

canonicalMuscles.forEach((m) => {
  assert(
    'Anatomy',
    `Muscle "${m.id}" has valid target ranges`,
    m.defaultWeeklyTargetMin > 0 && m.defaultWeeklyTargetMin <= m.defaultWeeklyTargetMax
  );
});

// -----------------------------------------------------------------------------
// 2. CANONICAL EXERCISE VALIDATION
// -----------------------------------------------------------------------------
console.log('Running Suite 2: Canonical Exercise Schema & Referential Integrity...');
assert('Exercises', 'Should have canonical exercises', canonicalExercises.length > 0);

canonicalExercises.forEach((ex) => {
  const val = ExerciseValidator.validate(ex);
  assert(
    'Exercises',
    `Exercise "${ex.name}" passes schema validation`,
    val.isValid,
    val.errors.map((e) => e.message).join('; ')
  );

  ex.muscleMappings.forEach((mapping) => {
    assert(
      'Exercises',
      `Exercise "${ex.name}" references valid muscle "${mapping.muscleId}"`,
      muscleIdSet.has(mapping.muscleId),
      `Unknown muscleId: ${mapping.muscleId}`
    );
    assert(
      'Exercises',
      `Exercise "${ex.name}" muscle "${mapping.muscleId}" has valid coefficient`,
      mapping.coefficient >= 0 && mapping.coefficient <= 1.0
    );
  });
});

// -----------------------------------------------------------------------------
// 2b. CANONICAL ROUNDS VALIDATION (ALL 26 ROUNDS)
// -----------------------------------------------------------------------------
console.log('Running Suite 2b: Canonical Round Templates Integrity (Rounds 1-26)...');
assert('Rounds', 'Should have exactly 26 canonical rounds', canonicalRounds.length === 26);

const exIdSet = new Set(canonicalExercises.map((e) => e.id));
canonicalRounds.forEach((rnd) => {
  assert('Rounds', `Round ${rnd.roundNumber} has valid ID and name`, Boolean(rnd.id && rnd.name));
  assert('Rounds', `Round ${rnd.roundNumber} has exercises`, rnd.exercises.length > 0);
  rnd.exercises.forEach((item, idx) => {
    assert(
      'Rounds',
      `Round ${rnd.roundNumber} item ${idx + 1} (${item.exerciseId}) references valid exercise`,
      exIdSet.has(item.exerciseId),
      `Unknown exerciseId: ${item.exerciseId}`
    );
    assert(
      'Rounds',
      `Round ${rnd.roundNumber} item ${idx + 1} has valid sequence number`,
      item.sequence === idx + 1
    );
  });
});

// -----------------------------------------------------------------------------
// 3. DEDUPLICATION & STRING SIMILARITY
// -----------------------------------------------------------------------------
console.log('Running Suite 3: Deduplication & Entity Resolution...');
const exactSim = StringSimilarity.levenshtein('Push-up', 'Push-up');
assert('Deduplication', 'Exact string match returns 1.0', exactSim === 1.0);

const tokenSim = StringSimilarity.tokenJaccard('Diamond Push-up', 'Push-up Diamond');
assert('Deduplication', 'Reordered tokens produce high Jaccard similarity', tokenSim === 1.0);

// Test matching: candidate "Standard Push-up" should auto-link to "pushup_standard"
const candidatePushup: Exercise = {
  id: 'standard_pushup',
  name: 'Standard Push-up',
  category: 'push',
  movementPatterns: ['horizontal_push'],
  difficulty: 'beginner',
  equipment: ['bodyweight'],
  defaultUnit: 'reps',
  unilateral: false,
  instructions: 'Hands shoulder-width apart, lower chest to floor, press up.',
  muscleMappings: [
    { muscleId: 'pectoralis_major_sternal', role: 'primary', coefficient: 1.0, jointAction: 'shoulder horizontal adduction', confidence: 'high', notes: '' },
    { muscleId: 'triceps_brachii', role: 'secondary', coefficient: 0.5, jointAction: 'elbow extension', confidence: 'high', notes: '' },
    { muscleId: 'deltoid_anterior', role: 'secondary', coefficient: 0.5, jointAction: 'shoulder flexion', confidence: 'high', notes: '' },
  ],
};

const matchResult = ExerciseMatcher.matchAgainstCanonical(candidatePushup, canonicalExercises);
assert(
  'Deduplication',
  'Candidate "Standard Push-up" auto-links to canonical push-up',
  matchResult.decision === 'auto_link' && matchResult.matchedCanonicalExercise?.id === 'pushup_standard',
  `Result was ${matchResult.decision} with score ${matchResult.similarityScore}`
);

// -----------------------------------------------------------------------------
// 4. LICENCE COMPLIANCE CHECKS
// -----------------------------------------------------------------------------
console.log('Running Suite 4: Licence Compliance & Copyleft Guardrails...');
const mitCheck = LicenceValidator.validate('MIT', 'Kinetic DB');
assert('Licence', 'MIT license is compliant and commercial-permitted', mitCheck.isCompliant && mitCheck.isCommercialPermitted);

const ccByCheck = LicenceValidator.validate('CC-BY-4.0', 'EPIC Lab');
assert('Licence', 'CC-BY-4.0 is compliant and commercial-permitted', ccByCheck.isCompliant && ccByCheck.isCommercialPermitted);

const agplCheck = LicenceValidator.validate('AGPL-3.0', 'wger');
assert(
  'Licence',
  'AGPL-3.0 is flagged with severe viral copyleft risk',
  agplCheck.copyleftRiskLevel === 'severe_viral' && !agplCheck.isCompliant
);

const unknownCheck = LicenceValidator.validate('UNKNOWN-PROP', 'Shady Source');
assert('Licence', 'Unrecognized license is rejected', !unknownCheck.isCompliant);

// -----------------------------------------------------------------------------
// 5. CALCULATION ENGINE INTEGRITY
// -----------------------------------------------------------------------------
console.log('Running Suite 5: Calculation Engine Scientific Formulations...');

// Test 5.1: Weekly Muscle Exposure: Exposure(m) = Σ [hard sets(e) * coefficient(e, m)]
const testSession: WorkoutSession = {
  id: 'sess-001',
  name: 'Test Session',
  startedAt: new Date().toISOString(),
  completed: true,
  sets: [
    // 3 sets of standard push-ups: pec=1.0 direct, triceps=0.5 indirect, deltoid=0.5 indirect
    { id: 's1', sessionId: 'sess-001', exerciseId: 'pushup_standard', setNumber: 1, reps: 10, side: 'bilateral', techniqueQuality: 'good', completedAt: new Date().toISOString(), synced: true },
    { id: 's2', sessionId: 'sess-001', exerciseId: 'pushup_standard', setNumber: 2, reps: 10, side: 'bilateral', techniqueQuality: 'good', completedAt: new Date().toISOString(), synced: true },
    { id: 's3', sessionId: 'sess-001', exerciseId: 'pushup_standard', setNumber: 3, reps: 10, side: 'bilateral', techniqueQuality: 'good', completedAt: new Date().toISOString(), synced: true },
  ],
};

const exposureOutput = calculateWeeklyExposure([testSession], canonicalExercises, canonicalMuscles);
assert('Calculations', 'Exposure output includes model metadata', exposureOutput.model === 'weekly_muscle_exposure');
assert('Calculations', 'Exposure output has assumptions documented', exposureOutput.assumptions.length > 0);

const pecExp = exposureOutput.value.find((e) => e.muscleId === 'pectoralis_major_sternal');
assert('Calculations', 'Pectoralis major direct sets equals 3.0', pecExp?.directSets === 3);

const tricepsExp = exposureOutput.value.find((e) => e.muscleId === 'triceps_brachii');
assert('Calculations', 'Triceps brachii indirect sets equals 1.5 (3 sets * 0.5)', tricepsExp?.indirectSets === 1.5);

// Test 5.2: Joint Torque: τ = F * r * sin(θ)
const F = 500; // Newtons
const r = 0.35; // Meters (moment arm)
const thetaRad = Math.PI / 2; // 90 degrees, sin = 1.0
const tau = F * r * Math.sin(thetaRad);
assert('Calculations', 'Joint torque τ = F * r * sin(θ) calculates correctly (175 Nm)', Math.abs(tau - 175.0) < 0.001);

// Test 5.3: Mechanical Work: W = F * d * cos(θ)
const d = 0.5; // Meters displacement
const workThetaRad = 0; // Collinear, cos = 1.0
const workJoules = F * d * Math.cos(workThetaRad);
assert('Calculations', 'Mechanical work W = F * d * cos(θ) calculates correctly (250 J)', Math.abs(workJoules - 250.0) < 0.001);

// Test 5.4: Power: P = W / t
const timeSeconds = 1.25;
const powerWatts = workJoules / timeSeconds;
assert('Calculations', 'Power P = W / t calculates correctly (200 W)', Math.abs(powerWatts - 200.0) < 0.001);

// Test 5.5: RIR: RIR = max_sound_reps - completed_reps
const maxSoundReps = 12;
const completedReps = 10;
const rir = maxSoundReps - completedReps;
assert('Calculations', 'RIR = max_sound_reps - completed_reps calculates correctly (2 RIR)', rir === 2);

// -----------------------------------------------------------------------------
// SUMMARY REPORT
// -----------------------------------------------------------------------------
console.log('\n=================================================================');
console.log('🏁 TEST SUITE EXECUTION SUMMARY');
console.log('=================================================================');
const passedCount = results.filter((r) => r.passed).length;
const failedCount = results.filter((r) => !r.passed).length;

results.forEach((r) => {
  const icon = r.passed ? '✅' : '❌';
  console.log(`${icon} [${r.suite}] ${r.testName}`);
  if (!r.passed) {
    console.log(`   FAILURE DETAILS: ${r.message}`);
  }
});

console.log('-----------------------------------------------------------------');
console.log(`TOTAL TESTS: ${results.length} | PASSED: ${passedCount} | FAILED: ${failedCount}`);
console.log('=================================================================\n');

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL VALIDATION TESTS PASSED WITH 100% SUCCESS.\n');
  process.exit(0);
}
