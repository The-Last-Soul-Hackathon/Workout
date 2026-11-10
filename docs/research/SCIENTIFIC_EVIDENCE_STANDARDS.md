# Scientific Evidence Standards & Epistemic Framework
**Muscle Intelligence — Research Integrity, Evidence Classification & Epistemology**
*Standard Established: November 2026*

Muscle Intelligence is built on the principle of **scientific transparency and explainability**. Under no circumstance may the platform present hypothetical heuristics, user classifications, or indirect electrical muscle excitation signals as direct, lab-verified measurements of force or muscle hypertrophy.

---

## 1. The Eight Canonical Scientific Evidence Categories

Every exercise-to-muscle mapping, biomechanical metric, and training recommendation must be tagged with exactly one of these eight formal evidence categories:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   SCIENTIFIC EVIDENCE TAXONOMY                        │
├────────────────────────────────┬───────────────────────────────────────┤
│ 1. Anatomical Evidence         │ Ground truth skeletal morphology      │
│ 2. Biomechanical Evidence      │ Kinematics, torques, moment arms      │
│ 3. EMG / Muscle Excitation     │ Surface/intramuscular electrical signals│
│ 4. Muscle-Force Estimation     │ Musculoskeletal simulation outputs    │
│ 5. Longitudinal Hypertrophy    │ Randomized controlled training trials │
│ 6. Strength / Performance      │ 1RM, velocity, endurance outcomes     │
│ 7. Fatigue / Recovery Evidence │ Neuromuscular & metabolic decay/return│
│ 8. Expert Inference / Unverified│ Heuristic deduction / unreviewed data │
└────────────────────────────────┴───────────────────────────────────────┘
```

### Category 1: Anatomical Evidence (`anatomical_evidence`)
- **Definition:** Verified physical attachment of muscle tissue (origin, insertion, lines of action, pennation angles, joint articulation crossings).
- **Accepted Sources:** Cadaveric dissections, anatomical atlases (Z-Anatomy, BodyParts3D, Gray's Anatomy), medical MRI/CT imaging.
- **Scope & Boundary:** Proves whether a muscle is physically capable of creating a torque about a given joint axis.
- **Explicit Limitation:** Anatomical capability does not prove that the central nervous system actually recruits that muscle during a specific multi-joint movement.

### Category 2: Biomechanical Evidence (`biomechanical_evidence`)
- **Definition:** Quantified movement kinematics, external ground reaction forces, joint angles, leverage, and net joint moments.
- **Accepted Sources:** Optical motion capture (AddBiomechanics, Vicon), force plates (Ebben 2011), 3D video kinematics (OpenCap), instrumented pull-up bars.
- **Key Formulas:**
  - Net joint torque: $\tau = F \times r \times \sin(\theta)$
  - Mechanical work: $W = F \times d \times \cos(\theta)$
  - Mechanical power: $P = \frac{W}{\Delta t}$
- **Explicit Limitation:** Net joint torque reflects the sum of all agonists, antagonists, and passive tissues crossing the joint. A high net knee extension torque does not specify the individual force sharing between the vastus lateralis, vastus medialis, and rectus femoris.

### Category 3: EMG / Muscle Excitation Evidence (`emg_excitation_evidence`)
- **Definition:** Microvolt ($\mu$V) electrical signals recorded via surface (sEMG) or fine-wire (iEMG) electrodes, reflecting neural drive and action potential propagation across the sarcolemma.
- **Accepted Sources:** Peer-reviewed electromyographic studies (e.g. Youdas 2010, Cogley 2005, Escamilla 2010), open repositories (EPIC Lab, MyoNeuroLink, JMNS).
- **Mandatory Reporting Requirements:**
  - Electrode configuration: Inter-electrode distance, SENIAM guidelines compliance.
  - Normalisation standard: Maximum voluntary isometric contraction (%MVIC), submaximal reference, or peak dynamic amplitude.
  - Signal processing: Bandpass filtering cutoff frequencies, rectification method, RMS window duration.
- **Strict Epistemic Limitation:**
  - **EMG $\neq$ Muscle Force:** EMG amplitude does not scale linearly with muscle force, especially during dynamic contractions where muscle length, velocity, and subcutaneous tissue thickness alter signal conduction.
  - **EMG $\neq$ Hypertrophy:** High acute EMG excitation does NOT guarantee long-term muscle hypertrophy (Vigotsky et al., 2018).

### Category 4: Muscle-Force Estimation (`muscle_force_estimation`)
- **Definition:** Calculated internal muscle and tendon forces derived from computational musculoskeletal models resolving the muscle redundancy problem.
- **Accepted Sources:** OpenSim static optimisation, Computed Muscle Control (CMC), forward dynamics simulations.
- **Explicit Limitation:** These are mathematical model estimates sensitive to assumed cost functions (e.g. minimizing sum of squared muscle activations), muscle physiological cross-sectional area (PCSA) tables, and generic tendon slack lengths. They are not direct sensor measurements.

### Category 5: Longitudinal Hypertrophy Evidence (`longitudinal_hypertrophy`)
- **Definition:** Chronic, prospective intervention studies (typically $\ge 6$ to 12 weeks) measuring changes in muscle size.
- **Accepted Sources:** Peer-reviewed randomised controlled trials (RCTs) utilizing magnetic resonance imaging (MRI), computed tomography (CT), or B-mode ultrasound muscle thickness.
- **Gold Standard:** Only studies with validated imaging modalities, documented dietary protein monitoring, and pre/post intra-rater reliability reporting are assigned `high` confidence.
- **Explicit Limitation:** Findings in resistance-trained young males cannot be directly extrapolated to untrained elderly females without caveat.

### Category 6: Strength / Performance Evidence (`strength_performance`)
- **Definition:** Measurable changes in maximal force output (1RM), maximum repetitions to failure, isometric peak force, or movement velocity over training cycles.
- **Accepted Sources:** Longitudinal or crossover human training studies measuring functional performance markers.
- **Explicit Limitation:** Neurological adaptations (motor unit synchronization, coordination, antagonist co-contraction inhibition) heavily drive early strength gains independently of muscle mass gains.

### Category 7: Fatigue / Recovery Evidence (`fatigue_recovery`)
- **Definition:** Time-course decay and restoration of neuromuscular capacity following acute exercise bouts.
- **Accepted Sources:** Studies measuring maximal voluntary contraction (MVC) decrements, resting twitch potentiation, blood biomarkers (creatine kinase, lactate dehydrogenase), and validated perceived recovery scales over 24, 48, and 72-hour intervals.
- **Explicit Limitation:** Recovery is highly individualized; fixed hourly recovery countdowns are scientifically invalid. Muscle Intelligence must present probabilistic recovery windows based on volume, eccentric strain, and user feedback.

### Category 8: Expert Inference / Unverified (`expert_inference`)
- **Definition:** Biomechanical deduction or clinical consensus derived from foundational kinesiology principles when direct empirical data on a specific variation is absent.
- **Accepted Sources:** Established kinesiology textbooks, expert consensus panels, or unreviewed preliminary imports.
- **Rule:** Must always be explicitly marked with `confidence = low` or `moderate` and flagged as `modelled` or `assumed`. It must NEVER be presented as empirical scientific truth.

---

## 2. Inviolable Epistemic Guardrails (Anti-Confusion Rules)

1. **The EMG-to-Force Fallacy:** Never convert an EMG %MVC percentage directly into a mechanical force value in Newtons ($N$).
2. **The Activation-to-Hypertrophy Fallacy:** Never claim that an exercise producing $80\%$ MVC EMG will produce twice the muscle growth of an exercise producing $40\%$ MVC.
3. **The Torque-to-Growth Fallacy:** A calculated joint torque does not predict regional muscle hypertrophy. Joint torque measures mechanical demand at the joint axis, not the length-tension relationship or mechanical tension experienced by individual muscle fibers.
4. **The Variation Transference Fallacy:** A scientific study evaluating standard bodyweight push-ups cannot be cited as empirical evidence for Aztec push-ups or pseudo-planche push-ups. Grip width, hand angle, elevation, and leverage fundamentally alter moment arms.
5. **The Role vs Contribution Fallacy:** Classifying a muscle as "primary" or "secondary" is an ordinal qualitative role, not a quantitative ratio. In our calculation engine, coefficients ($1.0, 0.5, 0.2$) are transparent bookkeeping weights for set tracking, not physiological percentages of total metabolic work.

---

## 3. Scientific Confidence Scoring Framework

Every imported claim, exercise mapping, and calculation model output is scored along a standardized confidence scale:

| Confidence Level | Numerical Score | Required Evidence Threshold | User Interface Presentation |
|---|---|---|---|
| **High** | $0.80 - 1.00$ | Multiple concordant peer-reviewed studies (longitudinal ultrasound/MRI or calibrated EMG + inverse dynamics) specifically testing the exact exercise variation with documented methodology. | Green verified badge: *"Peer-reviewed experimental evidence with direct measurement"* |
| **Moderate** | $0.50 - 0.79$ | Validated biomechanical model simulation or single peer-reviewed study on a closely related exercise variation with sound anatomical mechanics. | Yellow badge: *"Modelled biomechanical deduction with indirect study support"* |
| **Low** | $0.20 - 0.49$ | Anatomical line-of-action deduction or expert consensus lacking published instrumented kinetic or EMG verification. | Orange badge: *"Theoretical anatomical inference; unmeasured"* |
| **Unknown** | $0.00 - 0.19$ | Raw external source import prior to peer review or conflicting contradictory literature findings. | Grey badge: *"Preliminary / Pending scientific review"* |

---

## 4. Metadata Preservation Requirements

For every scientific finding stored in Supabase, the pipeline must preserve:
1. **Source Citation:** Canonical DOI, PubMed PMID, and OpenAlex ID.
2. **Participant Demographics:** Sample size ($n$), gender distribution, age, training status (trained vs untrained).
3. **Experimental Protocol:** Movement tempo, range of motion, load/resistance condition, rest interval, measurement instruments.
4. **Methodological Limitations:** Explicitly documented confounds (e.g., cross-talk in surface EMG, lack of blinding, short intervention duration).
5. **Audit Trail:** Timestamp of data ingestion, schema version, and reviewer ID approving the entry.
