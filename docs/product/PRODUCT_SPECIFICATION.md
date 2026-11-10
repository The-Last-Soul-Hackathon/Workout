# MUSCLE INTELLIGENCE
## A research-informed bodyweight training analysis, planning and optimisation platform
**PRODUCT REQUIREMENTS • EXERCISE DATABASE • SCIENTIFIC MODELS • UX • ARCHITECTURE • IMPLEMENTATION ROADMAP**

Prepared from the full discussion to date. This document consolidates the product vision, exercise inventory, anatomical coverage, scientific principles, proposed calculations, database design, user interface, technical architecture, validation strategy and build sequence.

> **Important status:** This is a product and engineering specification, not a clinically validated training prescription. Numerical muscle-contribution scores and readiness outputs must be labelled as estimates or heuristics unless supported by direct, appropriate measurements.

---

## Document map
1. Executive summary and product definition
2. Goals, non-goals and key product decisions
3. Full exercise inventory: original rounds and accessory round
4. Anatomical model and muscle taxonomy
5. Exercise-to-muscle mapping and evidence model
6. Scientific principles and limitations
7. Calculation engine: formulas, inputs and outputs
8. Training prescription and optimisation logic
9. Recovery, fatigue and progression
10. Product screens and interaction design
11. Data architecture and database schema
12. Frontend/backend technology architecture
13. Data quality, research provenance and confidence
14. Validation, testing and safety requirements
15. Development roadmap and MVP scope
16. Example data structures and API contracts
17. Open decisions and recommended next steps
- **Appendix A.** Complete exercise list
- **Appendix B.** Formula catalogue
- **Appendix C.** Glossary

---

## 1. Executive summary and product definition

Muscle Intelligence is a personal training analysis platform focused initially on bodyweight exercise. It is intended to turn a large exercise library and a user's logged training into an explainable model of muscular coverage, weekly training dose, exercise overlap, progression and possible gaps.

The product is not merely a workout logger. It combines four connected capabilities:
- **Exercise knowledge base:** standardised exercise definitions, variations, movement patterns, equipment requirements, technique notes, muscle roles and supporting evidence.
- **Training accounting:** records rounds, sets, repetitions, hold duration, range of motion, effort (RIR/RPE), rest, side-specific work and session context.
- **Analysis engine:** estimates direct and indirect muscle-group exposure, compares exercises, tracks volume and highlights possible undertraining or excessive workload.
- **Planning and decision support:** helps assemble a balanced weekly plan and suggests progression or substitutions while making uncertainty visible.

The central design principle is **explainability**. Every important result should show the inputs, calculation, evidence quality, assumptions and limitations. The system should not present a speculative muscle percentage as a laboratory measurement.

---

## 2. Goals, non-goals and key product decisions

### 2.1 Product goals
- Represent each exercise at the level of relevant muscles and, where useful, muscle heads or anatomical subdivisions.
- Distinguish prime movers, synergists, stabilisers and muscles receiving incidental or low-level demand.
- Compare exercises by movement pattern, joint actions, range of motion, leverage, difficulty, equipment, muscle emphasis and evidence quality.
- Estimate weekly training exposure by muscle group using transparent direct/indirect set accounting.
- Identify muscles and movement patterns that appear underrepresented in the current plan.
- Generate editable plans based on the user's goals, available days, equipment, exercise ability and recovery.
- Track performance over time and use the user's own data to refine estimates.
- Display research findings with source, population, method, limitations and date.

### 2.2 Non-goals for the first release
- Do not claim to predict exact muscle growth in grams or percentage for an individual.
- Do not claim EMG activation percentages equal force contribution or hypertrophy contribution.
- Do not automatically prescribe maximal-effort training or failure on every set.
- Do not treat all 25 original rounds as one workout or assume every round must be completed in a single session.
- Do not require machine learning in the MVP; a transparent rule-based engine is easier to inspect and validate.
- Do not create a medical diagnosis, injury diagnosis or rehabilitation protocol.

### 2.3 Key decisions to preserve

| Decision | Specification |
| :--- | :--- |
| **Platform** | Responsive web and React Native mobile application sharing domain and calculation logic. |
| **Training focus** | Bodyweight-first. Core library uses pull-up bar, wall and stable support where required; no gym machines required. |
| **Data layer** | PostgreSQL/Supabase as backend with Row Level Security and offline client sync. |
| **Visualisation** | Chart.js / SVG-based front/back anatomy maps for clickable muscle groups. |
| **Research integrity** | Every score has a classification: measured, evidence-derived, estimated, assumed, or user-calibrated. |
| **Exercise rounds** | Rounds are reusable templates/library groupings, not mandatory all-in-one workouts. |
| **Personalisation** | Start with explicit user inputs and logged performance. Add model calibration gradually. |

---

## 3. Full exercise inventory: original rounds and accessory round

The supplied exercise catalogue contains 22 conditioning/strength rounds, three mobility rounds, and a proposed additional muscle-balance/accessory round (Round 26).

> **Note:** The quantities below are initial template defaults, not universal prescriptions. The application allows full editing and stores unit, side convention and duration separately.

| Round | Cardio | Pull | Abs / Core | Push | Legs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Round 1** | Jumping — 45 | Standard Pull-ups — 3 | Crunches — 6 | Standard Push-ups — 5 | Bodyweight Squats — 6 |
| **Round 2** | Jumping Jacks — 15 | Wide-Grip Pull-ups — 2 | V-Ups — 6 reps | Diamond Push-ups — 4 reps | Jump Squats — 6 reps |
| **Round 3** | Butt Kicks — 15 sec | Chin-ups — 2 reps | Leg Raises — 6 reps | Decline Push-ups — 4 reps | Bulgarian Split Squats — 6 (3/leg) |
| **Round 4** | Mountain Climbers — 15 sec | Archer Pull-ups — 2/side | Bicycle Crunches — 6/side | Archer Push-ups — 3/side | Jumping Lunges — 6 (3/leg) |
| **Round 5** | Burpees — 6 reps | Commando Pull-ups — 3/side | Reverse Crunches — 6 reps | Explosive/Clap Push-ups — 4 reps | Skater Jumps — 6 (3/side) |
| **Round 6** | Shuttle Runs — 6 × 10 m | Close-Grip Pull-ups — 3 reps | Russian Twists — 6/side | Wide Push-ups — 5 reps | Step-Ups — 6 (3/leg) |
| **Round 7** | High Knees — 15 sec | L-Sit Pull-ups — 2 reps | Plank-to-Push-up — 6 reps | Staggered Push-ups — 4 reps | Calf Raises — 6 reps |
| **Round 8** | Broad Jumps — 6 reps | Around-the-World Pull-ups — 2 each dir | Flutter Kicks — 15 sec | Plyometric Push-ups — 4 reps | Assisted Pistol Squats — 6 (3/leg) |
| **Round 9** | Jump Rope — 15 sec | One-Arm Assisted Pull-ups — 3/arm | Hanging Knee Raises — 6 reps | Cobra Push-ups — 5 reps | Glute Bridges — 6 reps |
| **Round 10** | Suicide Runs — 3 × 10 m | Typewriter Pull-ups — 2/side | Windshield Wipers — 6/side | Slow-Motion Push-ups — 4 reps | Lateral Lunges — 6 (3/leg) |
| **Round 11** | Bear Crawl — 15 m | Explosive Pull-ups — 2 reps | Dead Bug — 6/side | Spiderman Push-ups — 4/side | Reverse Lunge to Knee Drive — 6 (3/leg) |
| **Round 12** | Ladder Drills — 15 sec | Behind-the-Neck Pull-ups — 2 reps | Hollow Body Hold — 10 sec | Deep Stretch Push-ups — 4 reps | Sumo Squats — 6 reps |
| **Round 13** | Agility Ladder Hops — 15 sec | Mixed-Grip Pull-ups — 3 reps | Side Plank Raises — 6/side | Aztec Push-ups — 3 reps | Wall Sit — 10 sec |
| **Round 14** | Burpee Broad Jumps — 6 reps | Ice Cream Maker Pull-ups — 2 reps | Superman Hold — 10 sec | Hindu Push-ups — 4 reps | Cossack Squats — 6 (3/leg) |
| **Round 15** | Sprint-Jump-Sprint — 3 reps | Towel Rows (under door) — 4 reps | Alternating Heel Touches — 6/side | Fingertip Push-ups — 4 reps | Single-Leg Glute Bridge — 6 (3/leg) |
| **Round 16** | Plank Jump-Ins — 10 reps | Inverted Body Rows (feet elevated) — 4 reps | Seated In-and-Outs — 6 reps | Pseudo-Planche Push-ups — 4 reps | Duck Walk — 10 m |
| **Round 17** | Sprint Stair Climbs — 4 fl | Scapular Pull-ups — 5 reps | Boat Hold — 12 sec | Pike Push-ups — 4 reps | Calf Jumps — 6 reps |
| **Round 18** | Footfire Drills — 15 sec | Wide→Close Pull-ups — 3 reps | Toes-to-Bar — 6 reps | Decline Clap Push-ups — 4 reps | Reverse Nordic Curl — 6 reps |
| **Round 19** | Agility Ladder Hops — 15 sec | One-Arm Negative Pull-ups — 2/arm | V-Hold — 10 sec | Incline Clap Push-ups — 3 reps | Elevated Lunges — 6 (3/leg) |
| **Round 20** | Sprint-in-Place — 15 sec | Australian Pull-ups — 4 reps | Alternating Heel Touches — 6/side | Shoulder-Tap Push-ups — 4/side | Curtsy Lunges — 6 (3/leg) |
| **Round 21** | Lateral Bound Sprints — 10m×4 | Close-Grip Chin-ups — 3 reps | Crossbody Mountain Climbers — 6/side | Wall Push-ups — 5 reps | Tibialis Raises — 6 reps |
| **Round 22** | Cone Weave Sprints — 15 sec | Isometric Pull-up Hold (top) — 5 sec | Hollow-to-Arch Rock — 6 reps | One-Arm Wall Push-ups — 3/side | Sissy Squats (eccentric) — 6 reps |

### 3.1 Original mobility rounds

| Round | Sequence |
| :--- | :--- |
| **Round 23 — Dynamic Flow** | Surya Namaskar; Tadasana; Ardha Uttanasana; Adho Mukha Svanasana; Cat–Cow. |
| **Round 24 — Hips & Spine** | Anjaneyasana (Low Lunge); Pigeon Pose; Lizard Pose; Seated Forward Fold; Supine Spinal Twist. |
| **Round 25 — Lower Body & Shoulders** | Butterfly Stretch; Hamstring Wall Stretch; Frog Pose; Shoulder Opener; Wrist Flexor Stretch. |

### 3.2 Proposed muscle-balance/accessory round (Round 26)

| Target / category | Bodyweight movement | Main intended emphasis | Implementation note |
| :--- | :--- | :--- | :--- |
| **Lower trapezius / scapular control** | Prone Y Raises | Lower trapezius; upward-rotation and scapular control | Controlled, light effort; avoid shrugging. |
| **Posterior shoulder / retractors** | Prone T Raises | Posterior deltoid, middle trapezius, rhomboids | Keep neck neutral; avoid excessive lumbar extension. |
| **External rotation / scapular** | Prone W Raises | Posterior deltoid, scapular retractors, external rotators | Small controlled range; do not force shoulder position. |
| **Deep trunk coordination** | Bird Dog | Multifidus and trunk stabilisers | Resist trunk rotation; move slowly. |
| **Lateral trunk** | Side Plank | Obliques, quadratus lumborum and lateral chain | Scale with bent knees or shorter holds. |
| **Serratus / protraction** | Scapular Push-ups | Serratus anterior and scapular protraction | Keep elbows straight; move shoulder blades. |
| **Scapular upward rotation** | Wall Slides | Serratus anterior and lower trapezius | Use pain-free range; do not force overhead position. |
| **Rotator cuff** | Side-Lying External Rotation | Infraspinatus and teres minor | No external load; self-resisted if appropriate. |
| **Hamstrings** | Hamstring Walkouts | Hamstrings and hip extensors | Short range initially; control eccentric phase. |
| **Hip adductors** | Copenhagen Plank | Adductor group, trunk stabilisers | High difficulty; begin short-lever/knee-supported. |
| **Lateral hip** | Side-Lying Hip Abduction | Gluteus medius/minimus | Avoid rolling pelvis backwards. |
| **Soleus** | Bent-Knee Calf Raises | Soleus emphasis | Controlled full range; progress single-leg. |
| **Foot intrinsics** | Short-Foot Exercise | Intrinsic foot musculature and arch | Subtle contraction; avoid toe curling. |
| **Neck flexors** | Chin Tucks | Deep cervical flexor coordination | Gentle movement only; stop if symptoms occur. |
| **Wrist extensors** | Self-Resisted Wrist Extension | Wrist extensor group | Use other hand to provide adjustable resistance. |
| **Hand / fingers** | Finger Spreading and Opening | Intrinsic hand muscles and finger extensors | Low load; treat as optional accessory work. |

> **Safety note:** Copenhagen planks, hamstring walkouts, reverse Nordics, one-arm negatives, behind-the-neck pull-ups, fingertip push-ups and explosive push-ups can impose substantial joint/tendon stress. The app flags prerequisites, regressions and technique cautions.

---

## 4. Anatomical model and muscle taxonomy

The anatomy database supports parent groups, individual muscles, heads/regions and functional roles.

| Region | Muscles / subdivisions to represent |
| :--- | :--- |
| **Back / scapular complex** | Latissimus dorsi; trapezius (upper, middle, lower); rhomboid major/minor; teres major; levator scapulae; erector spinae; multifidus. |
| **Chest** | Pectoralis major (clavicular, sternocostal, abdominal portions); pectoralis minor; serratus anterior. |
| **Shoulder** | Deltoid (anterior, lateral/middle, posterior); rotator cuff (supraspinatus, infraspinatus, teres minor, subscapularis). |
| **Arm** | Biceps brachii (long and short heads); brachialis; brachioradialis; triceps brachii (long, lateral, medial heads). |
| **Forearm / hand** | Wrist and finger flexors; wrist and finger extensors; pronators/supinators; intrinsic hand muscles. |
| **Abdominal / trunk** | Rectus abdominis; external oblique; internal oblique; transversus abdominis; quadratus lumborum; multifidus. |
| **Gluteal / hip** | Gluteus maximus, medius and minimus; iliopsoas; tensor fasciae latae; hip adductors; deep hip rotators. |
| **Thigh** | Quadriceps (rectus femoris, vastus lateralis, vastus medialis, vastus intermedius); hamstrings (biceps femoris, semitendinosus, semimembranosus); sartorius; gracilis. |
| **Lower leg / foot** | Gastrocnemius; soleus; tibialis anterior; tibialis posterior; fibularis/peroneal muscles; intrinsic foot muscles. |
| **Neck** | Sternocleidomastoid; deep cervical flexors; upper trapezius and cervical stabilisers. |

---

## 5. Exercise-to-muscle mapping and evidence model

### 5.1 Roles assigned per exercise
- **Prime mover / primary:** Major contribution to intended joint action. Counts as direct working set when adequately loaded ($1.0$).
- **Synergist / secondary:** Assists prime mover materially. Counts as indirect exposure coefficient ($0.5$ default).
- **Stabiliser:** Controls joint position or resists unwanted movement ($0.2$ default).
- **Incidental / tertiary:** Low-level demand ($0.0$).

### 5.2 Evidence record for each mapping
```typescript
interface ExerciseMuscleMapping {
  exerciseId: string;
  muscleId: string;
  muscleHeadId?: string;
  role: 'primary' | 'secondary' | 'stabiliser' | 'incidental';
  jointAction: string;
  coefficient: number; // e.g. 1.0, 0.5, 0.2
  evidenceType: 'direct_emg' | 'biomechanical_inference' | 'anatomy_inference' | 'intervention_study' | 'expert_consensus';
  confidence: 'high' | 'moderate' | 'low' | 'unknown';
  notes: string;
  sourceIds: string[];
}
```

---

## 6. Scientific principles and limitations

1. Muscle demand depends on joint moments, leverage, body angle, velocity and fatigue.
2. EMG amplitude $\neq$ hypertrophy or absolute muscle force.
3. Training volume is not simply raw reps; proximity to failure (RIR), tempo, and ROM determine mechanical tension.
4. Recovery cannot be computed as a fixed hourly countdown from a percentage score.
5. Soreness is not a direct measure of stimulus or hypertrophy.
6. The app presents ranges and confidence rather than deceptive precision.

---

## 7. Calculation engine: formulas, inputs and outputs

### 7.1 Weekly muscle exposure (Fractional sets)
$$\text{WeeklyExposure}[m] = \sum_{e \in \text{exercises}} \left( \text{hard\_sets}[e] \times \text{coefficient}[e, m] \right)$$

### 7.2 Repetitions in Reserve (RIR)
$$\text{RIR} = \text{estimated maximal reps with sound technique} - \text{reps completed}$$

### 7.3 Illustrative diminishing-returns dose-response
$$H(V) = H_{\max} \times \left(1 - e^{-k \cdot V}\right)$$

### 7.4 Left-Right Asymmetry
$$\text{Asymmetry (\%)} = \frac{|L - R|}{\frac{L + R}{2}} \times 100$$

### 7.5 Exercise equivalence vector
$$\mathbf{v}_e = [\text{pattern}, \text{joint actions}, \text{roles}, \text{ROM}, \text{leverage}, \text{difficulty}, \text{stability}]$$
$$\text{Similarity}(e_1, e_2) = \frac{\mathbf{v}_1 \cdot \mathbf{v}_2}{\|\mathbf{v}_1\| \|\mathbf{v}_2\|}$$

---

## 8. Training prescription and optimisation logic

- Balance primary goals: hypertrophy, strength, muscular endurance, or athletic balance.
- Filter exercises by equipment, user ability, injuries and preferences.
- Default to double progression: hit top of rep/hold range across all sets with good technique before progressing leverage, ROM, or variation difficulty.

---

## 9. Recovery, fatigue and progression

Log key performance indicators per set:
- Sets, reps, hold time, and side
- RIR / RPE
- Rest interval (seconds)
- Technique quality (Good / Degraded / Form breakdown)
- Perceived session exertion (RPE 1-10)

---

## 10. Database schema & architecture

PostgreSQL entities:
- `muscle_groups`, `muscles`, `muscle_heads`
- `exercises`, `exercise_variations`, `exercise_muscles`
- `round_templates`, `round_exercises`
- `workout_plans`, `workout_sessions`, `set_logs`
- `research_studies`, `mapping_evidence`

---

## Appendix A. Complete exercise list

Refer to Section 3 for the detailed 26-round breakdown.

## Appendix B. Formula catalogue

| Module | Formula | Classification |
| :--- | :--- | :--- |
| **Joint torque** | $\tau = F \cdot r \cdot \sin(\theta)$ | Biomechanical principle |
| **Mechanical work** | $W = F \cdot d \cdot \cos(\theta)$ | Physics definition |
| **Weekly exposure** | $\sum (\text{sets} \times \text{coeff})$ | Volume accounting convention |
| **Fatigue decay** | $F(t) = F_0 \cdot e^{-t/\tau}$ | Heuristic decay model |
| **Readiness score** | $w_P P + w_S S + w_F F + w_D D$ | Multi-factor heuristic |

## Appendix C. Glossary

- **Prime mover:** Muscle providing the main accelerating torque for the joint action.
- **Synergist:** Muscle assisting the prime mover or stabilizing intermediate joints.
- **Stabiliser:** Muscle providing static/isometric resistance to unwanted movement planes.
- **RIR:** Repetitions in reserve.
- **Fractional set:** Bookkeeping fraction assigned to indirect muscle stimulation.
