# Biomechanical Exposure Engine Correction Audit
**Document ID:** `AUDIT-CALC-001`  
**System:** Muscle Intelligence Weekly Exposure & Workload Accounting  
**Location:** [`packages/calculations/src/index.ts`](file:///workspaces/Workout/packages/calculations/src/index.ts) & [`apps/mobile/src/shared/calculations.ts`](file:///workspaces/Workout/apps/mobile/src/shared/calculations.ts)  
**Status:** Implemented, Tested, and Verified  

---

## 1. Original Behaviour
In the initial v1 engine implementation:
- All logged workout sessions in memory were aggregated indiscriminately without enforcing explicit date interval windowing or timezone boundaries.
- Mobility flow exercises (e.g., Surya Namaskar, Tadasana, Downward Dog) and conditioning cardio movements (e.g., sprint intervals, jumping jacks) were lumped into standard resistance hypertrophy volume, accumulating as `directSets` and `indirectSets`.
- Output confidence was statically hardcoded to `'high'`.
- Volume targets were strictly sourced from canonical defaults (`Muscle.defaultWeeklyTargetMin/Max`), disregarding user-specific rehabilitation or phased periodization bounds.
- Set-level qualification was binary and unconfigurable. Incomplete, degraded, or zero-effort entries could contribute fractional volume.

---

## 2. Identified Defects
1. **Conflation of Hypertrophy Stimulus with Mobility/Conditioning**: Assigning fractional hypertrophy set credits to submaximal yoga flows or sprint drills violates resistance-training volume principles (Schoenfeld et al., 2019; Pelland et al., 2026).
2. **Trailing Window Leakage**: Lack of date intervals allowed workouts completed weeks or months prior to bleed into current weekly exposure calculations.
3. **Hardcoded Scientific Confidence**: Masked evidence-category limitations, presenting expert-inferred classifications with false certainty.
4. **Target Inflexibility**: Prevented clinical personalization for athletes requiring modified set thresholds due to injury or deload weeks.

---

## 3. Proposed & Implemented Corrections
1. **Workload Separation**:
   - `workloadType` is partitioned into `'resistance'`, `'mobility'`, and `'conditioning'`.
   - Resistance exercises accumulate into `directSets` (prime movers), `indirectSets` (synergists/secondaries), and `stabiliserSets` (isometric fixators).
   - Mobility movements accumulate strictly into `mobilityWorkload` (sets / hold seconds).
   - Conditioning movements accumulate into `conditioningWorkload`.
2. **Explicit Interval & Timezone Enforcements**:
   - Accepts `interval: { start: string | Date; end: string | Date }` and `timezone?: string`. Validates ISO formatting and rejects inverted ranges.
3. **Configurable Qualification Rules**:
   - Configurable flags: `requireCompletedSession` (default `true`), `excludeDegradedTechnique`, `minRir`, `maxRir`, `minRpe`, and `customSetPredicate`. Zero-effort entries (`reps <= 0`, `holdSeconds <= 0`) are discarded.
4. **Evidence & Confidence Propagation**:
   - Aggregates evidence categories per muscle. Resolves overall confidence dynamically: downgrades to `'moderate'` or `'low'` if underlying evidence is unverified or conflicting.
5. **Personalized Targets**:
   - Ingests `options.personalizedTargets`. If present for a muscle, overrides canonical bounds, calculates `status` accordingly, and sets `isTargetPersonalized: true`.

---

## 4. Files Changed
- [`packages/domain/src/index.ts`](file:///workspaces/Workout/packages/domain/src/index.ts) — Extended `MuscleExposure`, `WeeklyExposureOptions`, `QualificationRules`, and `CoefficientRules`.
- [`apps/mobile/src/shared/domain.ts`](file:///workspaces/Workout/apps/mobile/src/shared/domain.ts) — Synchronized mobile domain models.
- [`packages/calculations/src/index.ts`](file:///workspaces/Workout/packages/calculations/src/index.ts) — Corrected `calculateWeeklyExposure` implementation.
- [`apps/mobile/src/shared/calculations.ts`](file:///workspaces/Workout/apps/mobile/src/shared/calculations.ts) — Synchronized mobile calculations engine.

---

## 5. Migration Impact
- **Database Schema**: Non-breaking. Database table `muscle_exposure_snapshots` retains schema compatibility while now receiving separated resistance vs. mobility metrics.
- **Data Preservation**: Zero existing records deleted; existing completed workout logs remain fully readable.

---

## 6. Tests Executed & Actual Results
Tested via production test suite [`tests/exposure-engine.test.ts`](file:///workspaces/Workout/tests/exposure-engine.test.ts):
- ✅ `Mobility vs Resistance Separation`: Surya Namaskar & Downward Dog produced `directSets: 0`, `indirectSets: 0`, and positive `mobilityWorkload`.
- ✅ `Cardio vs Resistance Separation`: Sprints and jumping jacks produced `conditioningWorkload` with 0 resistance volume.
- ✅ `Date Boundaries & Timezones`: Out-of-window sessions correctly excluded.
- ✅ `Invalid & Incomplete Exclusion`: Incomplete and degraded sets filtered out.
- ✅ `Personalized Targets`: 2 sets for chest successfully evaluated as `in_target` against customized 2–4 target range.
- ✅ `Confidence Propagation`: Correctly populated evidence categories and computed dynamic confidence.

---

## 7. Remaining Scientific Assumptions
1. **Bookkeeping Approximation**: A fractional coefficient (e.g. 0.5 for synergists) is a mathematical bookkeeping tool for total mechanical exposure, not an exact physiological measurement of intracellular protein synthesis.
2. **Technique Uniformity**: Assumes registered sets represent genuine repetitions within the intended motor pattern without kinematic cheating unless flagged as degraded.
