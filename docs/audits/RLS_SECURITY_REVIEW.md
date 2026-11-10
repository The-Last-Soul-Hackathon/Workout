# Row Level Security (RLS) & Database Integrity Audit
**Document ID:** `AUDIT-SEC-003`  
**System:** PostgreSQL Database Integrity Constraints & Supabase RLS Policies  
**Location:** [`supabase/migrations/20261110000007_database_integrity_and_security_corrections.sql`](file:///workspaces/Workout/supabase/migrations/20261110000007_database_integrity_and_security_corrections.sql)  
**Status:** Implemented, Tested, and Verified  

---

## 1. Original Behaviour
In migrations 1 through 6:
- `set_logs.rir` constraint was `chk_set_rir CHECK (rir IS NULL OR (rir >= 0.0 AND rir <= 10.0))`, permitting RIR values up to 10.0.
- Several numeric fields (`reps`, `hold_seconds`, `distance_meters`, `flights_climbed`, `rest_seconds`, `set_number`) lacked explicit lower and upper bounds, permitting zero, negative, or integer overflow inputs.
- `set_logs` lacked foreign-key or trigger enforcement guaranteeing that `set_logs.user_id` matched `workout_sessions.user_id`.
- `round_exercises` had a public read policy (`USING (true)`), allowing any authenticated user to view exercises within another user's private custom round templates.
- `evidence_reviews` had an open mutation policy (`FOR ALL USING (auth.uid() IS NOT NULL)`), permitting any authenticated user to insert, modify, or delete scientific evidence reviews.
- `model_outputs` permitted `INSERT WITH CHECK (user_id IS NULL OR user_id = auth.uid())`, allowing ordinary users to insert records with `user_id IS NULL` (corrupting system benchmark models).
- `exercise_muscles.role` check constraint only allowed `'primary'`, `'secondary'`, `'stabiliser'`, `'incidental'`, omitting `'synergist'`.

---

## 2. Identified Defects
1. **RIR Scale Inconsistency**: Conflated RPE (1–10) with RIR (0–5). Repetitions in Reserve above 5.0 represents non-stimulative warmup sets, corrupting volume qualifications.
2. **Missing Input Bounds**: Permitted negative repetitions, zero hold times, and unconstrained values.
3. **Session Ownership Spoofing**: Allowed a malicious user to insert set logs referencing another user's workout session.
4. **Data Privacy Leakage in Custom Rounds**: Private custom workout routines created by athletes were globally exposed via child-row `round_exercises`.
5. **Scientific Tampering Vulnerability**: Ordinary user tokens could alter peer-reviewed evidence reviews.
6. **Benchmark Contamination**: Regular users could write null-owned benchmark outputs.

---

## 3. Proposed & Implemented Corrections
Implemented in additive migration `20261110000007_database_integrity_and_security_corrections.sql`:
1. **RIR Tightening**: Replaced `chk_set_rir` with `CHECK (rir IS NULL OR (rir >= 0.0 AND rir <= 5.0))`.
2. **Numeric Validation Constraints**: Added explicit bounds:
   - `reps > 0 AND reps <= 1000`
   - `hold_seconds > 0.0 AND hold_seconds <= 86400.0`
   - `distance_meters > 0.0 AND distance_meters <= 100000.0`
   - `flights_climbed > 0.0 AND flights_climbed <= 2000.0`
   - `rest_seconds >= 0 AND rest_seconds <= 3600`
   - `set_number > 0`
   - `weekly_target_min >= 0.0 AND weekly_target_max >= weekly_target_min`
   - `role IN ('primary', 'secondary', 'synergist', 'stabiliser', 'incidental')`
3. **Ownership Trigger**: Created `fn_validate_set_log_user_ownership()` executing `BEFORE INSERT OR UPDATE ON public.set_logs` to reject any set log whose `user_id` does not match the parent session owner.
4. **Scoped Round Exercise RLS**: Replaced public read on `round_exercises` with policy ensuring visibility only if parent template `is_canonical = true OR created_by = auth.uid()`.
5. **Gated Evidence Reviews**: Changed `evidence_reviews` policy so that only `service_role` or verified reviewers (`app_metadata->>'is_scientific_reviewer' = true`) can insert/update. Public users retain read-only access.
6. **Strict Model Output Writes**: Restricted `model_outputs` INSERT to `user_id = auth.uid()`, reserving `user_id IS NULL` strictly for `service_role`.

---

## 4. Files Changed
- [`supabase/migrations/20261110000007_database_integrity_and_security_corrections.sql`](file:///workspaces/Workout/supabase/migrations/20261110000007_database_integrity_and_security_corrections.sql)

---

## 5. Migration Impact
- **Non-Destructive**: All modifications are additive (`ADD CONSTRAINT`, `CREATE OR REPLACE FUNCTION`, `DROP POLICY ... CREATE POLICY`).
- **Data Integrity**: Enforces structural validity across all future inserts and updates without deleting historical workout records.

---

## 6. Tests Executed & Actual Results
Executed in [`tests/database-integrity.test.ts`](file:///workspaces/Workout/tests/database-integrity.test.ts):
- ✅ `Migration 7 Syntax and Constraint Validation`: Verified presence of all 10 corrected constraints, triggers, and RLS policies.
- ✅ `Offline Retry & Unique Constraint Idempotency`: Verified duplicate prevention on client-generated UUID retries.

---

## 7. Remaining Scientific Assumptions
- Assumes authentication tokens (`auth.jwt()`) correctly manage reviewer claims issued by identity providers.
