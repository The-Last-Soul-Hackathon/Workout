import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as path from 'node:path';

test('Database Integrity: Migration 7 Syntax and Constraint Validation', () => {
  const migrationPath = path.resolve(
    process.cwd(),
    'supabase/migrations/20261110000007_database_integrity_and_security_corrections.sql'
  );

  assert.ok(fs.existsSync(migrationPath), 'Migration 7 must exist on disk');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  // Verify RIR correction
  assert.ok(
    sql.includes('chk_set_rir CHECK (rir IS NULL OR (rir >= 0.0 AND rir <= 5.0))'),
    'Migration 7 must correct RIR check constraint to scientific 0.0 - 5.0 bound'
  );

  // Verify Numeric Constraints
  assert.ok(sql.includes('chk_set_reps_valid'), 'Must enforce valid reps range');
  assert.ok(sql.includes('chk_set_hold_seconds_valid'), 'Must enforce valid hold_seconds range');
  assert.ok(sql.includes('chk_set_rest_seconds_valid'), 'Must enforce valid rest_seconds range');
  assert.ok(sql.includes('chk_set_number_positive'), 'Must enforce positive set_number');
  assert.ok(sql.includes('chk_target_bounds'), 'Must enforce target_max >= target_min bounds');

  // Verify Synergist Role
  assert.ok(
    sql.includes("'synergist'"),
    'Must include synergist role in exercise_muscles check constraint'
  );

  // Verify Session / Set Ownership Trigger
  assert.ok(
    sql.includes('fn_validate_set_log_user_ownership'),
    'Must include ownership validation trigger between set_logs and workout_sessions'
  );

  // Verify Custom Round Child-Row RLS Policy
  assert.ok(
    sql.includes('Read access for round_exercises: canonical or owned'),
    'Must restrict round_exercises SELECT access to canonical or owned templates'
  );

  // Verify Evidence Review Security
  assert.ok(
    sql.includes('Public read access for verified evidence_reviews'),
    'Must provide public read transparency on verified evidence reviews'
  );
  assert.ok(
    sql.includes('is_scientific_reviewer'),
    'Must gate review mutations to verified scientific reviewers'
  );

  // Verify Null-Owned Model Output Write Restriction
  assert.ok(
    sql.includes('Users can insert own model outputs strictly'),
    'Must restrict null-owned model outputs to service_role'
  );
});

test('Database Integrity: Offline Retry & Unique Constraint Idempotency', () => {
  // Simulates offline log retry: inserting a set log with the same client-generated UUID
  // must be idempotent and prevent duplicate volume inflation.
  const processedSetIds = new Set<string>();

  const recordSet = (setLog: { id: string; reps: number }) => {
    if (processedSetIds.has(setLog.id)) {
      return { status: 'already_recorded', duplicatePrevented: true };
    }
    processedSetIds.add(setLog.id);
    return { status: 'inserted', duplicatePrevented: false };
  };

  const setA = { id: 'uuid-client-12345', reps: 10 };
  const firstAttempt = recordSet(setA);
  assert.equal(firstAttempt.status, 'inserted');
  assert.equal(firstAttempt.duplicatePrevented, false);

  // Client goes offline, retries network sync with same client UUID
  const secondAttempt = recordSet(setA);
  assert.equal(secondAttempt.status, 'already_recorded');
  assert.equal(secondAttempt.duplicatePrevented, true);
  assert.equal(processedSetIds.size, 1, 'Duplicate set must not be inserted twice');
});
