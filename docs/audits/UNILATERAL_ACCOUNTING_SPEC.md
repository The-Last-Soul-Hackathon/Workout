# Unilateral Accounting Specification & Double-Counting Audit
**Document ID:** `AUDIT-UNI-002`  
**System:** Muscle Intelligence Unilateral Volume Aggregation & Asymmetry Engine  
**Location:** [`packages/calculations/src/index.ts`](file:///workspaces/Workout/packages/calculations/src/index.ts)  
**Status:** Implemented, Tested, and Verified  

---

## 1. Original Behaviour
In previous engine builds:
- Unilateral sets were subject to ambiguous effective-set assignment.
- Sets logged with `side: 'each_side'` evaluated line `set.side === 'each_side' ? 2 : 1`, resulting in a factor of `2.0`.
- Furthermore, when a user logged individual unilateral sets per side (e.g., 3 sets Left + 3 sets Right of Bulgarian Split Squats), the engine treated each set as an independent whole set, yielding $3 + 3 = 6$ total sets of quadriceps volume.

---

## 2. Identified Defect
**Volume Double-Counting in Unilateral Resistance Training**:
In exercise physiology and hypertrophic dose-response literature (Schoenfeld et al., 2019), volume is monitored **per muscle group / per limb**. When an athlete completes 8 single-leg squats on the left leg and 8 on the right leg, each quadriceps has only completed **one single working set**. Falsely counting this as 2 sets of quadriceps volume inflates perceived weekly exposure by 100%, leading to erroneous recovery indicators and false assumptions of sufficient training stimulus.

---

## 3. Proposed & Implemented Corrections
1. **Paired-Limb Symmetrical Volume Accounting**:
   - `Bilateral set` (e.g. Standard Squat): 1 execution = **1.0 bilateral equivalent set**.
   - `Paired unilateral set` (1 left set + 1 right set): Each limb is stimulated once = **1.0 bilateral equivalent set** ($0.5 + 0.5$).
   - `Single unilateral set` (e.g. Left-only or Right skipped): **0.5 bilateral equivalent set**.
   - `Combined set` (logged as `both_sides` or `each_side`): 1 paired execution = **1.0 bilateral equivalent set** (remedying the false 2.0 doubling bug).
2. **Limb Asymmetry & Deficit Tracking**:
   - The engine computes and reports:
     - `leftSets`: total working sets performed on left side
     - `rightSets`: total working sets performed on right side
     - `pairedSets`: $\min(\text{leftSets}, \text{rightSets})$
     - `asymmetryDelta`: $|\text{leftSets} - \text{rightSets}|$

---

## 4. Files Changed
- [`packages/domain/src/index.ts`](file:///workspaces/Workout/packages/domain/src/index.ts) — Added `UnilateralBreakdown` interface to `MuscleExposure`.
- [`packages/calculations/src/index.ts`](file:///workspaces/Workout/packages/calculations/src/index.ts) — Implemented paired-limb aggregation and eliminated `2 : 1` multiplier.
- [`apps/mobile/src/shared/calculations.ts`](file:///workspaces/Workout/apps/mobile/src/shared/calculations.ts) — Synchronized mobile calculations.
- [`supabase/migrations/20261110000007_database_integrity_and_security_corrections.sql`](file:///workspaces/Workout/supabase/migrations/20261110000007_database_integrity_and_security_corrections.sql) — Allowed `'both_sides'` in `chk_set_side`.

---

## 5. Migration Impact
- **Non-Destructive**: Migration 7 updates `chk_set_side` to `CHECK (side IN ('bilateral', 'left', 'right', 'both_sides'))`. Existing `bilateral`, `left`, and `right` set records remain completely valid and untouched.

---

## 6. Tests Executed & Actual Results
Executed in [`tests/unilateral-accounting.test.ts`](file:///workspaces/Workout/tests/unilateral-accounting.test.ts):
- ✅ `Paired Unilateral Sets Prevent Volume Double-Counting`: 3 left sets + 3 right sets of Assisted Pistol Squats yielded exactly `3.0 directSets` (NOT 6.0), with `pairedSets: 3` and `asymmetryDelta: 0`.
- ✅ `Left-Only and Incomplete/Skipped Sides`: 2 left sets + 1 right set yielded `1.5 directSets` and `asymmetryDelta: 1`.
- ✅ `Combined each_side Logging`: 1 set logged with `both_sides` yielded exactly `1.0 directSet`.
- ✅ `Pure Bilateral Exercises`: 2 bilateral push-up sets yielded `2.0 directSets` with 0 unilateral asymmetry.

---

## 7. Remaining Scientific Assumptions
1. **Limb Independence**: Assumes unilateral loading does not produce cross-education or cross-limb spinal fatigue significant enough to alter contralateral set volume qualifications.
2. **Effort Parity**: Assumes left and right sets completed within the same pairing were executed with comparable RIR and technical standard.
