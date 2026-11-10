# Multidimensional Exercise Comparison Model Audit
**Document ID:** `AUDIT-COMP-004`  
**System:** Exercise Kinematics, Substitution Feasibility & Biomechanical Profiling  
**Location:** [`packages/calculations/src/index.ts`](file:///workspaces/Workout/packages/calculations/src/index.ts)  
**Status:** Implemented, Tested, and Verified  

---

## 1. Original Behaviour
In previous iterations:
- `compareExercises` used a simple Jaccard set-intersection on `muscleId`:
  $$\text{sim} = \frac{2 \times |\text{SharedMuscles}|}{|\text{Muscles}_A| + |\text{Muscles}_B|}$$
- If two exercises recruited overlapping muscles, they were deemed highly similar, with a binary recommendation based purely on whether similarity was above or below `0.75`.

---

## 2. Identified Defect
**Oversimplification & False Equivalence**:
Two movements sharing active muscle recruitment can be biomechanically non-interchangeable. For example:
- A **Standard Push-up** (dynamic horizontal push, full ROM repetitions) and a **Standard Plank** (static anti-extension core hold, isometric duration) share anterior deltoid and core activation. Under the naive overlap formula, they appeared interchangeable, despite serving completely different training adaptations.
- A **Bilateral Squat** and a **Single-Leg Box Squat** share quadriceps prime mover recruitment, but single-leg loading imposes extreme anti-rotation, pelvic stabilizer, and adductor/abductor demands that a bilateral squat does not provide.

---

## 3. Proposed & Implemented Corrections
Implemented a **5-Dimensional Kinematic & Physiological Comparison Model**:

1. **Muscle Role & Evidence Alignment ($35\%$)**:
   - Differentiates matching primary roles ($2.0$ pts) from secondary/synergist roles ($1.0$ pt) and stabilizer roles ($0.5$ pt).
   - Confirms scientific evidence alignment between mappings.
2. **Movement Pattern & Joint Action Similarity ($25\%$)**:
   - Evaluates shared movement patterns (e.g. `horizontal_push` vs `vertical_push`).
   - Compares specific joint motions (e.g. glenohumeral horizontal adduction vs scapular protraction vs elbow extension).
3. **ROM & Contraction Profile ($15\%$)**:
   - Compares contraction modality (dynamic repetitions vs. isometric hold seconds).
   - Penalizes mismatched exercise categories (e.g. `push` vs `core` vs `mobility`).
4. **Unilateral Loading & Stability Demand ($15\%$)**:
   - Compares base of support and unilateral isolation.
   - Evaluates kinetic chain stability (ground-based closed chain vs. open/suspended rings or bar).
5. **Hierarchical Prerequisite & Progression Linkage ($10\%$)**:
   - Evaluates whether exercise B is a designated regression, progression, or prerequisite of exercise A.

### Weighted Composite Score Formula:
$$Score = 0.35 \times S_{\text{role}} + 0.25 \times S_{\text{pattern}} + 0.15 \times S_{\text{rom}} + 0.15 \times S_{\text{stability}} + 0.10 \times S_{\text{hierarchy}}$$

### Substitution Feasibility Classification:
- `direct_equivalent`: Composite score $\ge 0.82$ and shared patterns $\ge 0.60$.
- `regression_suitable`: Documented regression or lower difficulty tier with similar pattern.
- `progression_suitable`: Documented progression or higher difficulty tier.
- `partial_complement`: Modest overlap but distinct mechanical profile.
- `biomechanically_incompatible`: Composite score $< 0.40$ or zero movement pattern match.

---

## 4. Files Changed
- [`packages/domain/src/index.ts`](file:///workspaces/Workout/packages/domain/src/index.ts) — Extended `ExerciseComparison`, `MultidimensionalComparisonScores`, and `SubstitutionFeasibility`.
- [`packages/calculations/src/index.ts`](file:///workspaces/Workout/packages/calculations/src/index.ts) — Implemented multidimensional `compareExercises`.
- [`apps/mobile/src/shared/calculations.ts`](file:///workspaces/Workout/apps/mobile/src/shared/calculations.ts) — Synchronized mobile calculations.

---

## 5. Migration Impact
- **Non-Destructive**: Purely computational engine enhancement; requires no schema migrations.

---

## 6. Tests Executed & Actual Results
Executed in [`tests/exercise-comparison.test.ts`](file:///workspaces/Workout/tests/exercise-comparison.test.ts):
- ✅ `Two Exercises Are Not Equivalent Solely Due to Muscle Overlap`: Push-up vs. Side Plank resulted in `partial_complement` with an explicit contraction modality penalty.
- ✅ `Unilateral vs Bilateral Stability Penalty`: Squat vs. Assisted Pistol Squats resulted in an explicit stability penalty ($< 1.0$) and documented anti-rotation demand.
- ✅ `Direct Progression & Regression Linkage`: Wide-Grip Pull-up vs. Standard Pull-up yielded `regression_suitable` with $1.0$ hierarchy score.
- ✅ `Distinct Kinetic Chains & Incompatible Movements`: Pull-up vs. Squat evaluated to `biomechanically_incompatible` with composite score $< 0.40$.

---

## 7. Remaining Scientific Assumptions
1. **Kinematic Approximation**: Moment arm variations caused by individual anthropometry (e.g. femur-to-torso ratio) may slightly shift individual mechanical demands.
2. **Volitional Muscle Activation**: Assumes the athlete executes the movement with intentional mind-muscle recruitment of designated prime movers.
