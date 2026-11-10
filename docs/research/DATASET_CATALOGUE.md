# Scientific Dataset Catalogue
**Muscle Intelligence — Research & Biomechanics Data Foundation**

This catalogue documents specific open-access datasets, musculoskeletal models, experimental electromyography (EMG) studies, and scholarly corpora evaluated for Muscle Intelligence.

---

## 1. Exercise Catalogues & Movement Taxonomies

### 1.1 Kinetic Exercises Database
- **Provider:** Kinetic.place (`@kinetic-place/exercises-db`)
- **License:** MIT License
- **Version Audited:** v1.2.0
- **Volume:** ~850 exercises (~240 pure bodyweight/calisthenics entries)
- **Data Structure:**
  ```json
  {
    "id": "push-up",
    "name": "Push Up",
    "target": "pectorals",
    "bodyPart": "chest",
    "equipment": "body weight",
    "secondaryMuscles": ["deltoids", "triceps", "core"],
    "instructions": ["Position hands shoulder-width...", "Lower body until chest touches..."]
  }
  ```
- **Strengths:** Consistent machine-readable schema, standardized equipment taxonomy (`body weight`, `pull-up bar`, `parallel bars`), clear primary target vs secondary list.
- **Limitations:** Does not distinguish anatomical subdivisions (e.g., sternocostal vs clavicular pectoralis major) or muscle roles beyond target vs secondary. Lacks biomechanical joint actions.
- **Muscle Intelligence Mapping:** Primary canonical reference spine for base exercise names and equipment tags. Enriched with canonical muscle IDs.

### 1.2 wger Exercise & Muscle Database
- **Provider:** wger Community (`wger.de`)
- **License:** Database under CC-BY-SA 3.0; Code under AGPL-3.0
- **Volume:** ~900 exercises across multiple languages
- **Data Structure:** Relational SQLite / PostgreSQL dump & REST API.
  - Endpoints: `/api/v2/exercise/`, `/api/v2/muscle/`, `/api/v2/equipment/`
  - Muscle entities: 15 broad muscle groups (e.g. Biceps brachii, Latissimus dorsi).
- **Strengths:** Broad community translations, image attachments with provenance metadata.
- **Limitations:** Broad muscle groups lack subdivision (e.g., Trapezius is treated as one lump sum rather than upper vs middle/lower). AGPL-3.0 copyleft code must not be linked into the closed-source platform.
- **Muscle Intelligence Mapping:** Used strictly for name alias matching and multilingual descriptive references via read-only ETL scripts.

### 1.3 OpenExerciseDB
- **Provider:** Train Libre (`rfivesix/OpenExerciseDB`)
- **License:** GPL-3.0
- **Volume:** ~350 exercises
- **Data Structure:** Individual Markdown and JSON records with YAML frontmatter.
- **Strengths:** Clean calisthenic progression lineages (e.g., knee push-up -> standard push-up -> archer push-up -> one-arm push-up).
- **Limitations:** Small overall corpus; classifications are based on user contribution rather than biomechanical citations.
- **Muscle Intelligence Mapping:** Used for verifying progression/regression sequences.

---

## 2. Musculoskeletal Simulation Models & Kinematic Datasets

### 2.1 Rajagopal 2016 Full-Body Musculoskeletal Model
- **Reference:** Rajagopal et al., *Full-Body Musculoskeletal Model for Muscle-Driven Simulation of Human Gait*, IEEE TBME, 2016.
- **Repository:** SimTK / OpenSim Core Model Library
- **License:** Apache-2.0 / SimTK Research License
- **Characteristics:**
  - 37 degrees of freedom, 80 lower-extremity and trunk muscle-tendon compartments per side.
  - Millard 2012 muscle-tendon dynamics curve models.
  - Validated for wide range of hip flexion (up to 120°) and knee flexion (up to 140°), essential for deep bodyweight squats and lunges.
- **Use in Muscle Intelligence:**
  - Offline extraction of quadriceps, gluteus maximus, and hamstring moment arm curves as a function of hip and knee joint angles.
  - Used to calibrate the joint torque formula $\tau = F \times r \times \sin(\theta)$ with empirically derived internal moment arms ($r$).

### 2.2 Hamner 2010 Running & Jumping Kinetic Dataset
- **Reference:** Hamner, Seth, & Delp, *Muscle contributions to propulsion and support during running*, J. Biomech., 2010.
- **Repository:** SimTK (`running_jumping_dataset`)
- **License:** Open Academic / CC-BY 4.0
- **Characteristics:**
  - Synchronized ground reaction force (GRF) and 3D optical motion capture of jumping, bounding, and running.
  - Induced acceleration analysis demonstrating individual muscle contributions to vertical center-of-mass acceleration.
- **Use in Muscle Intelligence:**
  - Informs the calculation engine's coefficient models for Round 1 jumping, Round 8 broad jumps, and Round 21 lateral bound sprints.

### 2.3 AddBiomechanics Core 1.0 Dataset
- **Provider:** Stanford Neuromuscular Biomechanics Lab (Keenon et al.)
- **License:** CC-BY 4.0 (Data)
- **Volume:** Over 1,000 motion capture trials across hundreds of subjects.
- **Characteristics:** Standardized inverse kinematics, inverse dynamics joint moments, and residual reduction algorithm (RRA) outputs across walking, running, squats, and jumps.
- **Use in Muscle Intelligence:** Benchmark data to validate joint moment calculations in bodyweight squat variations.

---

## 3. Surface Electromyography (sEMG) & Calisthenics Datasets

### 3.1 EPIC Lab Lower-Limb Biomechanics & sEMG Dataset
- **Provider:** Georgia Institute of Technology (Camargo, Young et al., 2021)
- **Source:** Mendeley Data (`doi:10.17632/6vp4wb3dvh.1`)
- **License:** CC-BY 4.0
- **Subject Cohort:** 22 healthy young adults (11 male, 11 female).
- **Sensors:** 16 surface EMG channels (Delsys Trigno) sampled at 1000 Hz:
  - Gluteus medius, Gluteus maximus, Tensor fasciae latae, Biceps femoris, Semitendinosus, Rectus femoris, Vastus medialis, Vastus lateralis, Gastrocnemius medialis, Gastrocnemius lateralis, Soleus, Tibialis anterior.
- **Activities Captured:** Level ground walking, stair ascent/descent (4 flight climbs), ramp ascent/descent, step-ups.
- **Units & Processing:** Raw voltage ($\mu$V), bandpass filtered (20–450 Hz), full-wave rectified, linear envelope, normalized to maximum voluntary contraction (%MVC).
- **Use in Muscle Intelligence:** Direct empirical ground truth for Round 6 Step-Ups, Round 17 Sprint Stair Climbs, and Round 21 Tibialis/Calf actions.

### 3.2 Calisthenic Upper-Body EMG Corpora (Consolidated Literature Ingestion)
Because no single open data repository contains full raw EMG arrays for all 26 calisthenics rounds, Muscle Intelligence compiles peer-reviewed experimental EMG datasets from published literature:

| Study & Year | Movement Analysed | Measured Muscles | Sample Size | Protocol & Units | Key Finding & Engine Implication |
|---|---|---|---|---|---|
| **Youdas et al. (2010)**<br>PMID: 21098523 | Pull-up vs Chin-up | Latissimus dorsi, Biceps brachii, Pectoralis major (sternal), Lower trapezius, Infraspinatus, Erector spinae | $n = 21$ (19M, 2F) | Normalized %MVC, dynamic repetition phases | Pull-up: greater lower trapezius ($56\%$ vs $45\%$ MVC). Chin-up: greater biceps brachii ($78\%$ vs $55\%$ MVC) and pectoralis major ($57\%$ vs $44\%$ MVC). Engine assigns `coefficient = 1.0` to latissimus dorsi in both, but scales biceps brachii from `0.5` in pull-up to `0.8` in chin-up. |
| **Cogley et al. (2005)**<br>PMID: 16095405 | Push-up Grip Widths (Wide, Shoulder, Narrow/Diamond) | Pectoralis major, Triceps brachii, Serratus anterior | $n = 40$ | EMG amplitude (%MVC) during isometric/dynamic push-up | Narrow/Diamond grip elicits significantly higher triceps brachii activation ($73\%$ vs $51\%$ MVC) and sternal pec activation than wide grip. Engine scales triceps coefficient in Diamond Push-up (Round 2) to `0.8` vs `0.5` in Standard Push-up. |
| **Ebben et al. (2011)**<br>PMID: 21873902 | Push-up Variations & Ground Reaction Force | Ground reaction force (% Body Weight) | $n = 23$ | Force plate measurement at hands | Standard Push-up: $64\%$ BW load at top, $75\%$ at bottom. Incline Push-up (hands on 60cm bench): $41\%$ BW. Decline Push-up (feet on 60cm bench): $74\%$ BW. Informs mechanical force input $F = \text{BW} \times \%_{\text{load}}$. |
| **Escamilla et al. (2010)**<br>PMID: 20436247 | Core & Abdominal Exercises (V-Ups, Leg Raises, Crunches, Planks) | Upper rectus abdominis, Lower rectus abdominis, External oblique, Internal oblique, Rectus femoris | $n = 21$ | Fine-wire and surface EMG (%MVC) | Hanging knee raises and V-ups produce highest rectus abdominis activation ($>80\%$ MVC), with high iliopsoas/rectus femoris co-activation. Crunches isolate upper rectus abdominis with low hip flexor involvement. |
| **Vigotsky et al. (2018)**<br>PMID: 28834797 | EMG Normalisation & Limitations in Hypertrophy | Methodological review | Systematic Review | Critical review of sEMG interpretation | **Foundational standard:** Confirms EMG cannot predict motor unit mechanical tension or direct hypertrophy. Muscle Intelligence treats EMG as excitation indicator, never hypertrophy proof. |

---

## 4. Bibliometric & Scholarly Literature Repositories

### 4.1 OpenAlex API
- **Endpoint:** `https://api.openalex.org/works`
- **License:** CC0 Public Domain Dedication
- **Rate Limit:** 100,000 requests per day (with polite `mailto:` parameter)
- **Key Fields Retrieved:**
  - `id`: Canonical OpenAlex ID (e.g. `W2165518427`)
  - `doi`: Digital Object Identifier
  - `title`, `publication_year`, `cited_by_count`
  - `authorships`: Author names, institutions, countries
  - `concepts`: Hierarchical topic taxonomy (e.g. "Electromyography", "Biomechanics", "Resistance training")
  - `open_access.is_oa`, `open_access.oa_url`: Direct links to legally accessible PDFs
- **Use in Muscle Intelligence:** Core automated engine for research citation resolution, literature search, and topic classification.

### 4.2 PubMed Central (PMC) Open Access Subset
- **Endpoint:** `https://www.ncbi.nlm.nih.gov/pmc/tools/oai/` and BioC REST API
- **License:** Open Access (CC-BY, CC0, PDM)
- **Rate Limit:** 3 requests/second (10 req/s with NCBI API key)
- **Data Format:** JATS XML, BioC JSON
- **Key Extraction Capabilities:** Structured methodology sections, electrode placement protocols, subject demographics (training status, age, sex), experimental exercise variations.
- **Use in Muscle Intelligence:** Ingestion pipeline for extracting study protocols and tabular data into `study_protocols` and `study_findings` tables.
