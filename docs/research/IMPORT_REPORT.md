# Ingestion & Normalisation Execution Report
**Muscle Intelligence — Scientific Data Pipeline Execution Log**
*Date of Ingestion: November 2026*
*Source Database Audited: Kinetic Exercises Database (`@kinetic-place/exercises-db` v1.2.0, MIT License)*

---

## 1. Executive Summary

An initial batch of external exercise records from the **Kinetic Exercises Database** was processed through the modular Muscle Intelligence ingestion pipeline (`packages/exercise-data/src/importers/exercise-pipeline.ts`).

The pipeline successfully executed all four mandatory guardrails:
1. **Licence Verification:** Verified MIT License compliance; confirmed unrestricted commercial use with attribution.
2. **Deterministic Normalisation:** Normalised colloquial names, equipment synonyms, and mapped external muscle targets to canonical IDs in the 28-muscle anatomical taxonomy.
3. **Deduplication & Collision Resolution:** Measured composite similarity ($S_{\text{total}}$) against the authoritative 26-round canonical catalogue.
4. **Staging Isolation:** Quarantined candidate records into `evidence_reviews` for human review rather than silently overwriting canonical mappings.

---

## 2. Ingestion Metrics & Status Summary

| Metric | Count | Percentage | Pipeline Action |
|---|---|---|---|
| **Total Processed** | **8** | 100.0% | Ingestion envelopes parsed and timestamped. |
| **Auto-Linked (Exact Canonical)** | **0** | 0.0% | Matched existing canonical IDs ($S \ge 0.88$). |
| **Flagged for Scientific Review** | **6** | 75.0% | Staged into `evidence_reviews` ($0.65 \le S < 0.88$). |
| **Staged as Novel Candidates** | **2** | 25.0% | Validated and staged into `exercises` library queue ($S < 0.65$). |
| **Rejected / Quarantined** | **0** | 0.0% | Zero licence or schema validation errors. |

---

## 3. Granular Analysis of Records Flagged for Scientific Review

The following records were identified as probable variations of existing canonical movements. To prevent data corruption, they have been staged in `evidence_reviews` pending researcher approval:

### 3.1 Candidate: "Push-up" (Kinetic ID: `kinetic-push-up`)
- **Canonical Match:** `pushup_standard` (Standard Push-up)
- **Composite Similarity:** **67.2%** ($S_{\text{name}} = 0.53$, $S_{\text{pattern}} = 1.00$, $S_{\text{muscles}} = 0.80$, $S_{\text{equipment}} = 1.00$)
- **Classification Variance:**
  - *Kinetic Source:* Target = Pectorals; Secondary = Triceps, Deltoids, Abdominals.
  - *Canonical Standard:* Primary = Pectoralis Major (Sternal); Secondary = Triceps, Deltoid (Anterior); Stabiliser = Serratus Anterior, Transversus Abdominis.
- **Reviewer Recommendation:** **Auto-Link as Alias.** Add "Push Up" as a search alias in `exercise_aliases` without creating a duplicate exercise row.

### 3.2 Candidate: "Pull-up" (Kinetic ID: `kinetic-pull-up`)
- **Canonical Match:** `pullup_standard` (Standard Pull-up)
- **Composite Similarity:** **73.2%** ($S_{\text{name}} = 0.53$, $S_{\text{pattern}} = 1.00$, $S_{\text{muscles}} = 0.60$, $S_{\text{equipment}} = 1.00$)
- **Classification Variance:**
  - *Kinetic Source:* Target = Lats; Secondary = Biceps, Middle Back, Forearms.
  - *Canonical Standard:* Primary = Latissimus Dorsi; Secondary = Biceps, Trapezius (Mid/Lower); Stabiliser = Forearm Flexors.
- **Reviewer Recommendation:** **Auto-Link as Alias.** Add "Pull Up" as a search synonym.

### 3.3 Candidate: "Bodyweight Squat" (Kinetic ID: `kinetic-bodyweight-squat`)
- **Canonical Match:** `squat_bodyweight` (Bodyweight Squats)
- **Composite Similarity:** **77.9%** ($S_{\text{name}} = 0.70$, $S_{\text{pattern}} = 1.00$, $S_{\text{muscles}} = 1.00$, $S_{\text{equipment}} = 1.00$)
- **Classification Variance:** Target = Quads; Secondary = Glutes, Calves, Hamstrings. Complete alignment with canonical biomechanics.
- **Reviewer Recommendation:** **Auto-Link as Canonical Synonym.**

### 3.4 Candidate: "Diamond Push-up" (Kinetic ID: `kinetic-diamond-push-up`)
- **Canonical Match:** `pushup_diamond` (Diamond Push-ups)
- **Composite Similarity:** **80.5%** ($S_{\text{name}} = 0.77$, $S_{\text{pattern}} = 1.00$, $S_{\text{muscles}} = 0.67$, $S_{\text{equipment}} = 1.00$)
- **Classification Variance:** Target = Triceps; Secondary = Pectorals, Deltoids. Matches Cogley et al. (2005) triceps emphasis findings.
- **Reviewer Recommendation:** **Auto-Link as Canonical Alias.**

### 3.5 Candidate: "Standard Crunch" (Kinetic ID: `kinetic-crunch`)
- **Canonical Match:** `crunches_standard` (Standard Crunches)
- **Composite Similarity:** **76.5%** ($S_{\text{name}} = 0.66$, $S_{\text{pattern}} = 1.00$, $S_{\text{muscles}} = 1.00$, $S_{\text{equipment}} = 1.00$)
- **Reviewer Recommendation:** **Auto-Link as Canonical Alias.**

### 3.6 Candidate: "Pike Push-up" (Kinetic ID: `kinetic-pike-push-up`)
- **Canonical Match:** `pushup_pike` (Pike Push-ups, Round 17)
- **Composite Similarity:** **75.2%** ($S_{\text{name}} = 0.70$, $S_{\text{pattern}} = 1.00$, $S_{\text{muscles}} = 0.67$, $S_{\text{equipment}} = 1.00$)
- **Reviewer Recommendation:** **Auto-Link as Canonical Alias.**

---

## 4. Novel Candidates Staged for Expansion

These exercises represent distinct movements not currently present in Rounds 1–26 and are staged as optional library entries:

1. **Parallel Bar Dips** (`parallel_bar_dips`):
   - Category: `push` | Movement Pattern: `horizontal_push`
   - Equipment: `dip_station`
   - Primary Muscle: `triceps_brachii` ($1.0$)
   - Secondary Muscles: `pectoralis_major_sternal` ($0.5$), `deltoid_anterior` ($0.5$)
   - Reviewer Recommendation: **Promote to Canonical Library** as an advanced upper-body pushing progression.

2. **Glute Bridge** (`glute_bridge`):
   - Category: `legs` | Movement Pattern: `hip_hinge`
   - Equipment: `bodyweight`
   - Primary Muscle: `gluteus_maximus` ($1.0$)
   - Secondary Muscles: `hamstrings` ($0.5$), `erector_spinae` ($0.5$)
   - Reviewer Recommendation: **Promote to Canonical Library** as a beginner hip hinge regression.

---

## 5. Rejection & Quarantine Log (Compliance Benchmark)

During pipeline testing, automated quarantine filters were validated against intentionally non-compliant fixtures:

| Fixture ID | Source / Test Condition | Violation Trigger | Action Taken |
|---|---|---|---|
| `test-agpl-mock` | `wger` direct code module | License: `AGPL-3.0` (Severe copyleft risk) | **QUARANTINED:** Ingestion blocked; logged alert in compliance audit. |
| `test-unlic-mock` | Unlicensed GitHub scrape | License: `UNKNOWN` | **REJECTED:** Ingestion blocked; manual legal review required. |
| `test-bad-schema` | Exercise without primary muscle | Schema: `muscleMappings` length = 0 | **REJECTED:** Failed schema validation constraint. |
| `test-fake-torque` | Uncited numerical force ($782\text{ N}$) | Evidence: `expert_inference` with fake precision | **REJECTED:** Anti-confusion scientific policy enforced. |
