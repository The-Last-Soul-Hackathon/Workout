import { Exercise } from '@muscle-intelligence/domain';

/**
 * Canonical Exercise Catalogue (Rounds 1 - 26)
 * Includes 22 strength/conditioning circuits, 3 mobility flows, and the Round 26 muscle-balance collection.
 * Every exercise is mapped to canonical muscles with evidence classifications.
 */
export const canonicalExercises: Exercise[] = [
  {
    id: 'jumping_standard',
    name: "Standard Jumping",
    category: 'cardio',
    movementPatterns: ["jump_sprint"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Continuous light vertical bounces with quick ankle reactivity.",
    safetyCautions: "Land softly on balls of feet to avoid heel strike impact.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gastrocnemius',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "plantarflexion",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Elastic stretch-shortening cycle load."
      },
      {
        muscleId: 'quadriceps',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "knee extension",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Shock absorption and gentle propulsion."
      },
    ]
  },
  {
    id: 'pullup_standard',
    name: "Standard Pull-up",
    category: 'pull',
    movementPatterns: ["vertical_pull"],
    difficulty: 'intermediate',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Overhand grip, shoulder-width apart. Depress scapulae, pull until chin clears the bar, control the descent.",
    safetyCautions: "Avoid kipping or excessive lumbar hyperextension.",
    prerequisites: ["pain_free_hanging_tolerance", "scapular_pullups"],
    regressions: ["pullup_assisted", "band_assisted_pullups"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'latissimus_dorsi',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "shoulder adduction & extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Prime vertical puller (>115% MVC in Youdas 2010)."
      },
      {
        muscleId: 'biceps_brachii',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "elbow flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Synergist elbow flexor."
      },
      {
        muscleId: 'trapezius_mid_lower',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "scapular depression & retraction",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Scapular stability throughout full ROM."
      },
      {
        muscleId: 'forearm_flexors',
        role: 'stabiliser',
        coefficient: 0.2,
        jointAction: "isometric grip hold",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Supports body mass hanging from bar."
      },
    ]
  },
  {
    id: 'crunches_standard',
    name: "Standard Crunches",
    category: 'core',
    movementPatterns: ["trunk_flexion"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Lie supine, knees bent. Curl shoulders toward pelvis by contracting rectus abdominis; keep cervical spine relaxed.",
    safetyCautions: "Do not pull on the back of the neck.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rectus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "trunk flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Focuses upper portion of rectus abdominis."
      },
      {
        muscleId: 'obliques',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "trunk flexion assist",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Assists anterior spinal curl."
      },
    ]
  },
  {
    id: 'pushup_standard',
    name: "Standard Push-up",
    category: 'push',
    movementPatterns: ["horizontal_push"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Hands slightly wider than shoulder width, rigid core plank. Lower under controlled eccentric tempo until chest approaches floor (elbows tracked at ~45° in scapular plane), then press to full elbow lockout.",
    safetyCautions: "Prevent hips from sagging; maintain glute and abdominal tension.",
    regressions: ["pushup_incline", "pushup_knee"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "horizontal adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Primary horizontal pusher. Biomechanical estimate: ~64% bodyweight ground reaction force at top lockout, ~69-75% at bottom inflection (Ebben et al. 2011; Suprak et al. 2011)."
      },
      {
        muscleId: 'deltoid_anterior',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "shoulder flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Forward shoulder propulsion."
      },
      {
        muscleId: 'triceps_brachii',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "elbow extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Locks out arms at top of rep."
      },
      {
        muscleId: 'serratus_anterior',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "scapular protraction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Peaks at top plus position."
      },
      {
        muscleId: 'rectus_abdominis',
        role: 'stabiliser',
        coefficient: 0.2,
        jointAction: "anti-extension core brace",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Prevents lumbar sag."
      },
    ]
  },
  {
    id: 'squat_bodyweight',
    name: "Bodyweight Squats",
    category: 'legs',
    movementPatterns: ["squat"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Feet shoulder-width apart. Sit hips back and down until hip crease is below parallel, keeping heels planted.",
    safetyCautions: "Avoid dynamic knee valgus collapse.",
    regressions: ["squat_box_assisted"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "knee extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Primary knee extensor."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "hip extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Recruited strongly in deep hip flexion."
      },
      {
        muscleId: 'hamstrings',
        role: 'stabiliser',
        coefficient: 0.2,
        jointAction: "femur stabilisation",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Co-contracts; does not experience large length change."
      },
      {
        muscleId: 'gastrocnemius',
        role: 'stabiliser',
        coefficient: 0.2,
        jointAction: "ankle stability",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Assists ankle position."
      },
    ]
  },
  {
    id: 'jumping_jacks',
    name: "Jumping Jacks",
    category: 'cardio',
    movementPatterns: ["jump_sprint"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Jump feet wide while bringing arms overhead, then return to start in rhythm.",
    safetyCautions: "Land softly on midfoot.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'deltoid_lateral',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "shoulder abduction",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Arm sweep."
      },
      {
        muscleId: 'gluteus_medius_minimus',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "hip abduction",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Lateral leg opening."
      },
      {
        muscleId: 'gastrocnemius',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "ankle rebound",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Repetitive elastic impact."
      },
    ]
  },
  {
    id: 'pullup_wide_grip',
    name: "Wide-Grip Pull-ups",
    category: 'pull',
    movementPatterns: ["vertical_pull"],
    difficulty: 'intermediate',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Grip approximately 1.5x shoulder width. Emphasizes scapular depression and frontal plane adduction.",
    safetyCautions: "Requires high glenohumeral clearance.",
    prerequisites: ["pullup_standard"],
    regressions: ["pullup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'latissimus_dorsi',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "frontal plane shoulder adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "High coronal plane leverage."
      },
      {
        muscleId: 'trapezius_mid_lower',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "scapular depression",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Assists scapulohumeral rhythm."
      },
      {
        muscleId: 'biceps_brachii',
        role: 'secondary',
        coefficient: 0.4,
        jointAction: "elbow flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'moderate',
        notes: "Reduced mechanical advantage compared to chin-up."
      },
    ]
  },
  {
    id: 'v_ups',
    name: "V-Ups",
    category: 'core',
    movementPatterns: ["trunk_flexion"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Simultaneously lift straight legs and torso into a V shape, reaching hands toward toes.",
    safetyCautions: "Avoid straining lumbar spine.",
    prerequisites: ["leg_raises"],
    regressions: ["crunches_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rectus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "simultaneous upper & lower trunk flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Peak abdominal compression (>80% MVC)."
      },
      {
        muscleId: 'transversus_abdominis',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "core brace",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Stabilizes pelvis."
      },
    ]
  },
  {
    id: 'pushup_diamond',
    name: "Diamond Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Place thumbs and index fingers together under center of chest. Press through triceps.",
    safetyCautions: "Flare elbows moderately if wrist discomfort occurs.",
    prerequisites: ["pushup_standard"],
    regressions: ["pushup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'triceps_brachii',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "elbow extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Significantly higher triceps EMG than standard (Cogley 2005)."
      },
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "horizontal adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Sternal pec activation remains high."
      },
      {
        muscleId: 'deltoid_anterior',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "shoulder flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'moderate',
        notes: "Anterior shoulder drive."
      },
    ]
  },
  {
    id: 'jump_squats',
    name: "Jump Squats",
    category: 'legs',
    movementPatterns: ["squat", "jump_sprint"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Squat to parallel and explode vertically into full triple extension. Absorb landing smoothly.",
    safetyCautions: "Land softly through balls of feet into knee flexion.",
    prerequisites: ["squat_bodyweight"],
    regressions: ["squat_bodyweight"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "explosive knee extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "High velocity motor unit recruitment."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "explosive hip extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Glute propulsion."
      },
      {
        muscleId: 'gastrocnemius',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "plantarflexion impulse",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Terminal takeoff push."
      },
    ]
  },
  {
    id: 'butt_kicks',
    name: "Butt Kicks",
    category: 'cardio',
    movementPatterns: ["jump_sprint"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Run in place kicking heels up toward glutes with rapid turnover.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'hamstrings',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "knee flexion",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Active heel pull."
      },
      {
        muscleId: 'gastrocnemius',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "plantarflexion",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Ankle bounce."
      },
    ]
  },
  {
    id: 'chin_ups',
    name: "Chin-ups",
    category: 'pull',
    movementPatterns: ["vertical_pull"],
    difficulty: 'intermediate',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Supinated (underhand) grip. Pull until chin clears bar; increased elbow flexion demand.",
    safetyCautions: "Avoid shrugging shoulders at peak.",
    prerequisites: ["pullup_standard"],
    regressions: ["pullup_assisted"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'latissimus_dorsi',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "shoulder extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Prime mover in sagittal plane."
      },
      {
        muscleId: 'biceps_brachii',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "elbow flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Significantly higher biceps EMG than pronated pull-up (Youdas 2010)."
      },
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "shoulder extension assist",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'moderate',
        notes: "Sternal pec active in chin-up."
      },
    ]
  },
  {
    id: 'leg_raises',
    name: "Lying Leg Raises",
    category: 'core',
    movementPatterns: ["trunk_flexion"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Lie flat on back, elevate legs to 90 degrees while keeping lumbar spine pressed into floor.",
    safetyCautions: "Do not arch lower back off floor.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rectus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "posterior pelvic tilt & anti-extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Strong lower abdominal demand."
      },
      {
        muscleId: 'transversus_abdominis',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "lumbar brace",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Maintains flat spine."
      },
    ]
  },
  {
    id: 'pushup_decline',
    name: "Decline Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push"],
    difficulty: 'intermediate',
    equipment: ["box_bench"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Feet elevated on a 30-45cm bench or step. Shifts center of mass forward onto upper chest.",
    safetyCautions: "Maintain rigid core plank.",
    prerequisites: ["pushup_standard"],
    regressions: ["pushup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'pectoralis_major_clavicular',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "shoulder flexion & horizontal adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Upper chest emphasis (Ebben 2011)."
      },
      {
        muscleId: 'deltoid_anterior',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "shoulder flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "High anterior shoulder demand."
      },
      {
        muscleId: 'triceps_brachii',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "elbow extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Elbow lockout."
      },
    ]
  },
  {
    id: 'bulgarian_split_squats',
    name: "Bulgarian Split Squats",
    category: 'legs',
    movementPatterns: ["lunge"],
    difficulty: 'intermediate',
    equipment: ["box_bench"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Rear foot elevated on bench. Descend front knee until thigh is parallel to floor, drive through heel.",
    safetyCautions: "Keep front knee tracking over second toe.",
    prerequisites: ["squat_bodyweight"],
    regressions: ["lunges_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "knee extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Unilateral knee extension loading."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "hip extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Deep hip extension."
      },
      {
        muscleId: 'gluteus_medius_minimus',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "pelvic stabilization",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Prevents pelvic drop."
      },
    ]
  },
  {
    id: 'mountain_climbers',
    name: "Mountain Climbers",
    category: 'cardio',
    movementPatterns: ["locomotion", "anti_extension"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "In high plank, rapidly drive knees alternating toward chest.",
    safetyCautions: "Keep hips level.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rectus_abdominis',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "anti-extension brace",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'moderate',
        notes: "Stabilizes trunk dynamically."
      },
      {
        muscleId: 'transversus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "dynamic core stabilization",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Resists spinal extension."
      },
      {
        muscleId: 'deltoid_anterior',
        role: 'secondary',
        coefficient: 0.4,
        jointAction: "isometric shoulder support",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Holds upper body."
      },
    ]
  },
  {
    id: 'pullup_archer',
    name: "Archer Pull-ups",
    category: 'pull',
    movementPatterns: ["vertical_pull"],
    difficulty: 'advanced',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Pull body to one arm while extending the other arm straight along the bar. Alternate sides.",
    safetyCautions: "Demands high tendon strength in straight arm.",
    prerequisites: ["pullup_wide_grip"],
    regressions: ["pullup_wide_grip"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'latissimus_dorsi',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "unilateral shoulder adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Unilateral overload."
      },
      {
        muscleId: 'biceps_brachii',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "unilateral elbow flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "High single-arm elbow flexion load."
      },
    ]
  },
  {
    id: 'bicycle_crunches',
    name: "Bicycle Crunches",
    category: 'core',
    movementPatterns: ["anti_rotation", "trunk_flexion"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Alternating opposite elbow to knee with shoulder rotation.",
    safetyCautions: "Avoid pulling on neck.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'obliques',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "trunk rotation & lateral flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Top-ranked oblique activation exercise."
      },
      {
        muscleId: 'rectus_abdominis',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "anterior core curl",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Continuous tension."
      },
    ]
  },
  {
    id: 'pushup_archer',
    name: "Archer Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push"],
    difficulty: 'advanced',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Wide stance hands; lower chest over one hand while extending opposite arm straight out.",
    safetyCautions: "Regress to knee support if shoulder feels strained.",
    prerequisites: ["pushup_wide"],
    regressions: ["pushup_wide"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "unilateral horizontal adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Near single-arm chest loading."
      },
      {
        muscleId: 'triceps_brachii',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "unilateral elbow extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Primary pressing arm triceps."
      },
    ]
  },
  {
    id: 'jumping_lunges',
    name: "Jumping Lunges",
    category: 'legs',
    movementPatterns: ["lunge", "jump_sprint"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Explode upward from lunge and switch legs mid-air, landing softly into next lunge.",
    safetyCautions: "Absorb impact decelerating with control.",
    prerequisites: ["lunges_standard"],
    regressions: ["lunges_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "eccentric/concentric knee extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "High decelerative stretch-shortening."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "explosive hip extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Drive out of split stance."
      },
    ]
  },
  {
    id: 'burpees',
    name: "Burpees",
    category: 'cardio',
    movementPatterns: ["jump_sprint", "horizontal_push"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Drop to plank, perform push-up, jump feet in and leap vertically with overhead reach.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "squat & jump propulsion",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Full body cyclic recruitment."
      },
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "push-up phase",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Floor push."
      },
      {
        muscleId: 'gastrocnemius',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "jump takeoff",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Ankle extension."
      },
    ]
  },
  {
    id: 'pullup_commando',
    name: "Commando Pull-ups",
    category: 'pull',
    movementPatterns: ["vertical_pull"],
    difficulty: 'intermediate',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Stand under bar facing along it. Neutral grip with hands in tandem; pull head to alternate sides.",
    prerequisites: ["pullup_standard"],
    regressions: ["pullup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'latissimus_dorsi',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "sagittal/frontal pulling",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Neutral grip lat load."
      },
      {
        muscleId: 'biceps_brachii',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "elbow flexion (brachialis emphasis)",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Neutral grip loads brachialis heavily."
      },
    ]
  },
  {
    id: 'reverse_crunches',
    name: "Reverse Crunches",
    category: 'core',
    movementPatterns: ["trunk_flexion"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Lie supine; contract lower abdominals to curl pelvis and knees toward chest without using momentum.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rectus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "posterior pelvic tilt",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Lower rectus abdominis emphasis."
      },
      {
        muscleId: 'obliques',
        role: 'secondary',
        coefficient: 0.4,
        jointAction: "pelvic curl assistance",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Core synergy."
      },
    ]
  },
  {
    id: 'pushup_clap',
    name: "Explosive / Clap Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push", "jump_sprint"],
    difficulty: 'advanced',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Drive explosively off floor with enough height to clap hands before landing smoothly.",
    safetyCautions: "Absorb landing into next rep without locking elbows abruptly.",
    prerequisites: ["pushup_standard"],
    regressions: ["pushup_plyometric"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "maximal rate of force development adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "High rate of force development."
      },
      {
        muscleId: 'triceps_brachii',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "explosive elbow extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Terminal propulsion."
      },
    ]
  },
  {
    id: 'skater_jumps',
    name: "Skater Jumps",
    category: 'legs',
    movementPatterns: ["jump_sprint", "lunge"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Bound laterally from one foot to the other, absorbing landing on outside leg with knee flexed.",
    safetyCautions: "Land softly tracking knee over toes.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gluteus_medius_minimus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "lateral propulsion & decelerative stabilization",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Frontal plane glute load."
      },
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "landing knee extension absorption",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Eccentric shock absorption."
      },
    ]
  },
  {
    id: 'shuttle_runs',
    name: "Shuttle Runs (6x10m)",
    category: 'cardio',
    movementPatterns: ["locomotion", "jump_sprint"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'meters',
    unilateral: false,
    instructions: "Sprint 10 meters, touch the line, decelerate and sprint back.",
    safetyCautions: "Plant foot firmly before turning.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gastrocnemius',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "acceleration plantarflexion",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Ankle propulsion."
      },
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "deceleration & change of direction",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Eccentric braking."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "hip extension drive",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Forward sprint drive."
      },
    ]
  },
  {
    id: 'pullup_close_grip',
    name: "Close-Grip Pull-ups",
    category: 'pull',
    movementPatterns: ["vertical_pull"],
    difficulty: 'intermediate',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Overhand grip with hands spaced 15-20cm apart. Pull chest to bar.",
    prerequisites: ["pullup_standard"],
    regressions: ["pullup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'latissimus_dorsi',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "shoulder adduction/extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Latissimus pull."
      },
      {
        muscleId: 'biceps_brachii',
        role: 'secondary',
        coefficient: 0.7,
        jointAction: "elbow flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Increased elbow flexion angle demand."
      },
      {
        muscleId: 'forearm_flexors',
        role: 'stabiliser',
        coefficient: 0.2,
        jointAction: "grip hold",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Bar grip."
      },
    ]
  },
  {
    id: 'russian_twists',
    name: "Russian Twists",
    category: 'core',
    movementPatterns: ["anti_rotation", "trunk_flexion"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Seated in V-shape with heels elevated; rotate torso smoothly from side to side.",
    safetyCautions: "Keep lumbar spine neutral; avoid rounding.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'obliques',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "transverse trunk rotation",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Internal/external oblique rotation."
      },
      {
        muscleId: 'rectus_abdominis',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "isometric V-sit flexion",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Holds torso angle."
      },
    ]
  },
  {
    id: 'pushup_wide',
    name: "Wide Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Hands placed 1.5x shoulder width apart. Lower chest into deep horizontal stretch.",
    safetyCautions: "Avoid excessive elbow flaring.",
    prerequisites: ["pushup_standard"],
    regressions: ["pushup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "horizontal adduction at wide angle",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "High chest stretch."
      },
      {
        muscleId: 'deltoid_anterior',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "shoulder flexion support",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'moderate',
        notes: "Anterior shoulder."
      },
      {
        muscleId: 'triceps_brachii',
        role: 'secondary',
        coefficient: 0.4,
        jointAction: "elbow extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'moderate',
        notes: "Reduced triceps moment arm."
      },
    ]
  },
  {
    id: 'step_ups',
    name: "Step-Ups",
    category: 'legs',
    movementPatterns: ["lunge"],
    difficulty: 'beginner',
    equipment: ["box_bench"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Step one foot fully onto a 40-50cm bench, drive through heel to stand tall, control descent.",
    safetyCautions: "Do not push off back toe excessively.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "concentric knee extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Step drive."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "concentric hip extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Hip extension atop bench."
      },
      {
        muscleId: 'gastrocnemius',
        role: 'stabiliser',
        coefficient: 0.2,
        jointAction: "ankle balance",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Single limb balance."
      },
    ]
  },
  {
    id: 'high_knees',
    name: "High Knees",
    category: 'cardio',
    movementPatterns: ["jump_sprint", "locomotion"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Run in place driving knees up to hip height with quick reactive ground contacts.",
    safetyCautions: "Stay tall through torso.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gastrocnemius',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "rapid plantarflexion rebound",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Ankle reactivity."
      },
      {
        muscleId: 'quadriceps',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "hip flexion & knee extension",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Leg drive."
      },
      {
        muscleId: 'rectus_abdominis',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "pelvic stabilization",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Maintains pelvis."
      },
    ]
  },
  {
    id: 'pullup_l_sit',
    name: "L-Sit Pull-ups",
    category: 'pull',
    movementPatterns: ["vertical_pull", "trunk_flexion"],
    difficulty: 'advanced',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Hold legs extended parallel to floor in an L-sit while performing full range pull-ups.",
    safetyCautions: "High core and hip flexor cramp potential.",
    prerequisites: ["pullup_standard", "leg_raises"],
    regressions: ["pullup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'latissimus_dorsi',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "vertical pulling",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Vertical pulling prime mover."
      },
      {
        muscleId: 'rectus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "isometric L-sit hold",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Severe isometric trunk flexion."
      },
      {
        muscleId: 'biceps_brachii',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "elbow flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Synergist flexor."
      },
    ]
  },
  {
    id: 'plank_to_pushup',
    name: "Plank-to-Push-up",
    category: 'core',
    movementPatterns: ["anti_extension", "horizontal_push"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Transition from forearm plank to high push-up plank one hand at a time, minimizing hip sway.",
    safetyCautions: "Keep hips level throughout transitions.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'transversus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "anti-extension & anti-rotation core brace",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Maintains pelvic alignment."
      },
      {
        muscleId: 'triceps_brachii',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "push-up transition press",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Elbow extension off floor."
      },
      {
        muscleId: 'deltoid_anterior',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "shoulder stability",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Single arm support."
      },
    ]
  },
  {
    id: 'pushup_staggered',
    name: "Staggered Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "One hand placed forward of shoulder and other hand set slightly back. Alternate sides.",
    prerequisites: ["pushup_standard"],
    regressions: ["pushup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "asymmetric horizontal adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Asymmetric chest loading."
      },
      {
        muscleId: 'triceps_brachii',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "elbow extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Lockout drive."
      },
      {
        muscleId: 'obliques',
        role: 'stabiliser',
        coefficient: 0.3,
        jointAction: "anti-rotation torso brace",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Resists asymmetrical floor force."
      },
    ]
  },
  {
    id: 'calf_raises',
    name: "Calf Raises",
    category: 'legs',
    movementPatterns: ["accessory_isolation"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Stand on edge of step or floor; rise onto balls of feet to full plantarflexion, hold 1 sec, lower.",
    safetyCautions: "Full range of motion down to stretch.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gastrocnemius',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "straight-leg ankle plantarflexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Primary calf recruitment."
      },
      {
        muscleId: 'soleus',
        role: 'secondary',
        coefficient: 0.7,
        jointAction: "ankle plantarflexion support",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Deep calf synergist."
      },
    ]
  },
  {
    id: 'broad_jumps',
    name: "Broad Jumps",
    category: 'cardio',
    movementPatterns: ["jump_sprint"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Swing arms, load hips back, and jump forward for maximum distance. Stick landing into squat.",
    safetyCautions: "Absorb landing through hips and knees.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gluteus_maximus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "explosive horizontal hip extension",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Primary horizontal propulsion."
      },
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "knee extension takeoff & landing",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Takeoff and landing absorption."
      },
      {
        muscleId: 'gastrocnemius',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "ankle push-off",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Plantarflexion impulse."
      },
    ]
  },
  {
    id: 'pullup_around_the_world',
    name: "Around-the-World Pull-ups",
    category: 'pull',
    movementPatterns: ["vertical_pull"],
    difficulty: 'advanced',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Pull up toward right hand, glide horizontally across bar to left hand, and lower. Reverse direction.",
    safetyCautions: "Demands high scapular and unilateral pulling control.",
    prerequisites: ["pullup_wide_grip"],
    regressions: ["pullup_wide_grip"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'latissimus_dorsi',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "multidirectional coronal pulling",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Continuous tension lat pull."
      },
      {
        muscleId: 'biceps_brachii',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "unilateral elbow flexion transition",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Shifting elbow flexor load."
      },
      {
        muscleId: 'trapezius_mid_lower',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "scapular retractor & depressor",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Scapular positioning."
      },
    ]
  },
  {
    id: 'flutter_kicks',
    name: "Flutter Kicks",
    category: 'core',
    movementPatterns: ["anti_extension"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Lie flat; hover legs 15cm off floor and alternate small vertical kicks while pressing lower back down.",
    safetyCautions: "Keep lower back glued to floor.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rectus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "anti-extension core brace",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Isometric lower abdominal brace."
      },
      {
        muscleId: 'transversus_abdominis',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "intra-abdominal pressure",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Core corset."
      },
    ]
  },
  {
    id: 'pushup_plyometric',
    name: "Plyometric Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push", "jump_sprint"],
    difficulty: 'advanced',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Push explosively off the floor so hands leave the ground momentarily.",
    safetyCautions: "Maintain straight plank during flight.",
    prerequisites: ["pushup_standard"],
    regressions: ["pushup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "explosive horizontal adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "High rate of force development."
      },
      {
        muscleId: 'triceps_brachii',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "rapid elbow extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Fast twitch triceps recruitment."
      },
    ]
  },
  {
    id: 'assisted_pistol_squats',
    name: "Assisted Pistol Squats",
    category: 'legs',
    movementPatterns: ["squat"],
    difficulty: 'intermediate',
    equipment: ["wall"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Single leg squat with non-working leg straight forward, using wall or pole lightly for balance.",
    safetyCautions: "Do not allow knee to collapse inward.",
    prerequisites: ["squat_bodyweight"],
    regressions: ["squat_bodyweight"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "unilateral knee extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Maximal single leg quad load."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "unilateral hip extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Deep single leg glute drive."
      },
      {
        muscleId: 'gluteus_medius_minimus',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "pelvic leveling",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Maintains pelvis in frontal plane."
      },
    ]
  },
  {
    id: 'jump_rope',
    name: "Jump Rope",
    category: 'cardio',
    movementPatterns: ["jump_sprint"],
    difficulty: 'beginner',
    equipment: ["jump_rope"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Continuous rhythmic skipping on balls of feet with minimal knee bend.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gastrocnemius',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "elastic ankle plantarflexion",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "High frequency tendon elastic recoil."
      },
      {
        muscleId: 'soleus',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "postural ankle stability",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Plantarflexor support."
      },
    ]
  },
  {
    id: 'pullup_one_arm_assisted',
    name: "One-Arm Assisted Pull-ups",
    category: 'pull',
    movementPatterns: ["vertical_pull"],
    difficulty: 'advanced',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "One hand on bar; other hand grasps wrist or towel for minimal assistance.",
    safetyCautions: "Severe load on pulling arm lat and elbow flexors.",
    prerequisites: ["pullup_standard"],
    regressions: ["pullup_archer"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'latissimus_dorsi',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "unilateral latissimus adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Heavy unilateral overload."
      },
      {
        muscleId: 'biceps_brachii',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "unilateral elbow flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "High elbow flexion torque."
      },
      {
        muscleId: 'forearm_flexors',
        role: 'stabiliser',
        coefficient: 0.3,
        jointAction: "high grip intensity",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Grip loading."
      },
    ]
  },
  {
    id: 'hanging_knee_raises',
    name: "Hanging Knee Raises",
    category: 'core',
    movementPatterns: ["trunk_flexion"],
    difficulty: 'intermediate',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Dead hang from bar; curl knees upward into chest by tilting pelvis posteriorly.",
    safetyCautions: "Avoid swinging or kipping.",
    prerequisites: ["leg_raises"],
    regressions: ["leg_raises"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rectus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "posterior pelvic tilt & abdominal flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Escamilla 2010 confirmed top abdominal activation."
      },
      {
        muscleId: 'forearm_flexors',
        role: 'stabiliser',
        coefficient: 0.2,
        jointAction: "hanging grip support",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Bar hang."
      },
    ]
  },
  {
    id: 'pushup_cobra',
    name: "Cobra Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Prone position; press palms down to extend arms and arch upper torso into extension.",
    safetyCautions: "Gentle on lumbar spine; do not force range.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'triceps_brachii',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "terminal elbow extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Lockout elbow extensor."
      },
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'secondary',
        coefficient: 0.4,
        jointAction: "horizontal support",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Lower chest support."
      },
      {
        muscleId: 'erector_spinae',
        role: 'stabiliser',
        coefficient: 0.2,
        jointAction: "lumbar extension",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Spine extensors."
      },
    ]
  },
  {
    id: 'glute_bridges',
    name: "Glute Bridges",
    category: 'legs',
    movementPatterns: ["hip_hinge"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Lie supine, knees bent, feet flat. Drive through heels to lift hips until thighs and torso align.",
    safetyCautions: "Squeeze glutes at top; avoid hyperextending lumbar spine.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gluteus_maximus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "terminal hip extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Targeted glute recruitment without spine load."
      },
      {
        muscleId: 'hamstrings',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "hip extension synergy",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Synergist hip extension."
      },
    ]
  },
  {
    id: 'suicide_runs',
    name: "Suicide Runs (3x10m)",
    category: 'cardio',
    movementPatterns: ["locomotion", "jump_sprint"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'meters',
    unilateral: false,
    instructions: "Sprint 5m and back, sprint 10m and back, sprint 15m and back with rapid floor touches.",
    safetyCautions: "Decelerate with low center of mass.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "eccentric deceleration & propulsion",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Change of direction demands."
      },
      {
        muscleId: 'gastrocnemius',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "sprint drive",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Propulsion."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "hip drive",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Sprinting power."
      },
    ]
  },
  {
    id: 'pullup_typewriter',
    name: "Typewriter Pull-ups",
    category: 'pull',
    movementPatterns: ["vertical_pull", "horizontal_pull"],
    difficulty: 'advanced',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Pull chin above bar; glide horizontally to right hand, then to left hand, remaining at top.",
    safetyCautions: "Severe isometric upper body load.",
    prerequisites: ["pullup_wide_grip"],
    regressions: ["pullup_around_the_world"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'latissimus_dorsi',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "sustained isometric coronal pulling",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Continuous lat engagement."
      },
      {
        muscleId: 'biceps_brachii',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "isometric & dynamic elbow flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Elbow flexor overload."
      },
      {
        muscleId: 'trapezius_mid_lower',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "scapular retractor",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Upper back stability."
      },
    ]
  },
  {
    id: 'windshield_wipers',
    name: "Windshield Wipers",
    category: 'core',
    movementPatterns: ["anti_rotation", "trunk_flexion"],
    difficulty: 'advanced',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Hanging from bar with legs vertical; rotate legs side to side in a controlled arc.",
    safetyCautions: "Requires high shoulder hang strength and oblique control.",
    prerequisites: ["toes_to_bar"],
    regressions: ["hanging_knee_raises"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'obliques',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "transverse plane rotational control",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Peak oblique eccentric and concentric load."
      },
      {
        muscleId: 'rectus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "isometric hip flexion hold",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Holds legs elevated."
      },
      {
        muscleId: 'latissimus_dorsi',
        role: 'stabiliser',
        coefficient: 0.3,
        jointAction: "straight arm bar stabilization",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Bar stabilization."
      },
    ]
  },
  {
    id: 'pushup_slow_motion',
    name: "Slow-Motion Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "4 seconds down, 2 seconds isometric hold at bottom, 4 seconds up.",
    safetyCautions: "Maintain rigid plank throughout slow tempo.",
    prerequisites: ["pushup_standard"],
    regressions: ["pushup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "prolonged time-under-tension adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "High metabolic stress in pec major."
      },
      {
        muscleId: 'triceps_brachii',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "controlled elbow extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Eccentric triceps control."
      },
    ]
  },
  {
    id: 'lateral_lunges',
    name: "Lateral Lunges",
    category: 'legs',
    movementPatterns: ["lunge"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Step wide to the side, sit hips back over bending leg while keeping opposite leg straight.",
    safetyCautions: "Keep both heels on floor.",
    prerequisites: ["squat_bodyweight"],
    regressions: ["squat_bodyweight"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "single-leg knee extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Working leg quad drive."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "hip extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Glute drive out of hole."
      },
      {
        muscleId: 'hip_adductors',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "frontal deceleration & straight-leg adductor stretch",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Adductor involvement."
      },
    ]
  },
  {
    id: 'bear_crawl',
    name: "Bear Crawl",
    category: 'cardio',
    movementPatterns: ["locomotion", "anti_extension"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'meters',
    unilateral: false,
    instructions: "Hands and feet on floor, knees hovering 5cm above ground. Crawl forward with opposite limbs in sync.",
    safetyCautions: "Keep back flat as a tabletop.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'transversus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "anti-extension quadrupedal brace",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Core compression."
      },
      {
        muscleId: 'serratus_anterior',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "scapular protraction stability",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Shoulder girdle support under crawl load."
      },
      {
        muscleId: 'quadriceps',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "isometric knee flexion hover",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Hovering knees."
      },
    ]
  },
  {
    id: 'pullup_explosive',
    name: "Explosive Pull-ups",
    category: 'pull',
    movementPatterns: ["vertical_pull", "jump_sprint"],
    difficulty: 'advanced',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Pull with maximum acceleration to bring bar down to chest or sternum level.",
    safetyCautions: "Decelerate smoothly at bottom.",
    prerequisites: ["pullup_standard"],
    regressions: ["pullup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'latissimus_dorsi',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "maximal rate of force development vertical pull",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "High threshold motor unit recruitment."
      },
      {
        muscleId: 'biceps_brachii',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "rapid elbow flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Fast elbow flexion impulse."
      },
    ]
  },
  {
    id: 'dead_bug',
    name: "Dead Bug",
    category: 'core',
    movementPatterns: ["anti_extension"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Supine with arms up, knees at 90 degrees. Slowly lower opposite arm and leg while keeping lumbar flat.",
    safetyCautions: "Lumbar spine must remain flush against floor.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'transversus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "contralateral lumbo-pelvic anti-extension brace",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Deep core stabilization."
      },
      {
        muscleId: 'rectus_abdominis',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "anterior core support",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Prevents anterior pelvic tilt."
      },
    ]
  },
  {
    id: 'pushup_spiderman',
    name: "Spiderman Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push", "trunk_flexion"],
    difficulty: 'advanced',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "As you lower into push-up, bring one knee outward to touch the elbow on the same side.",
    safetyCautions: "Keep hips from twisting excessively.",
    prerequisites: ["pushup_standard"],
    regressions: ["pushup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "horizontal adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Chest press."
      },
      {
        muscleId: 'obliques',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "lateral trunk flexion & knee drive",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "High unilateral oblique crunch."
      },
      {
        muscleId: 'triceps_brachii',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "elbow extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Arm lockout."
      },
    ]
  },
  {
    id: 'reverse_lunge_knee_drive',
    name: "Reverse Lunge to Knee Drive",
    category: 'legs',
    movementPatterns: ["lunge", "jump_sprint"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Step back into reverse lunge, drive through front heel, and explosively lift rear knee to chest.",
    prerequisites: ["lunges_standard"],
    regressions: ["lunges_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "unilateral knee extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Front leg extension."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "unilateral hip extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Glute drive into standing."
      },
      {
        muscleId: 'gastrocnemius',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "explosive calf push-off",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Knee drive takeoff."
      },
    ]
  },
  {
    id: 'ladder_drills',
    name: "Ladder Drills",
    category: 'cardio',
    movementPatterns: ["locomotion", "jump_sprint"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "High-frequency in-in-out-out footwork agility patterns.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gastrocnemius',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "rapid agility plantarflexion",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Fast ankle reactivity."
      },
      {
        muscleId: 'soleus',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "ankle support",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Postural stabilizer."
      },
    ]
  },
  {
    id: 'pullup_behind_the_neck',
    name: "Behind-the-Neck Pull-ups",
    category: 'pull',
    movementPatterns: ["vertical_pull"],
    difficulty: 'advanced',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Pull up until bar gently touches base of neck behind head.",
    safetyCautions: "Requires high glenohumeral clearance; avoid if impingement occurs.",
    prerequisites: ["pullup_wide_grip"],
    regressions: ["pullup_wide_grip"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'latissimus_dorsi',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "coronal adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "High lat activation in extreme coronal plane."
      },
      {
        muscleId: 'trapezius_mid_lower',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "scapular retraction & depression",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Extreme upper back retraction."
      },
      {
        muscleId: 'rhomboids',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "scapular retraction",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Rhomboid contraction."
      },
    ]
  },
  {
    id: 'hollow_body_hold',
    name: "Hollow Body Hold",
    category: 'core',
    movementPatterns: ["anti_extension"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Supine, arms overhead, legs extended 10cm off floor, lower back pressed completely flat.",
    safetyCautions: "Regress by bending knees if lower back lifts.",
    prerequisites: ["crunches_standard"],
    regressions: ["crunches_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rectus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "posterior pelvic tilt & anti-extension brace",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Gymnastic core foundation (>85% MVC)."
      },
      {
        muscleId: 'transversus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "deep abdominal compression",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Intra-abdominal pressure."
      },
    ]
  },
  {
    id: 'pushup_deep_stretch',
    name: "Deep Stretch Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push"],
    difficulty: 'intermediate',
    equipment: ["box_bench"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Hands elevated on two blocks or handles; lower chest below hand level for maximum stretch.",
    safetyCautions: "Do not overstretch shoulder capsule.",
    prerequisites: ["pushup_standard"],
    regressions: ["pushup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "lengthened-state horizontal adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "High mechanical tension in stretched position."
      },
      {
        muscleId: 'deltoid_anterior',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "shoulder flexion from deep deficit",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Deep anterior delt drive."
      },
    ]
  },
  {
    id: 'sumo_squats',
    name: "Sumo Squats",
    category: 'legs',
    movementPatterns: ["squat"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Wide stance, toes turned out 45 degrees. Squat while keeping knees pushed out over toes.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "knee extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Knee extensor."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "hip extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Glute drive."
      },
      {
        muscleId: 'hip_adductors',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "wide stance adductor contribution",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Adductor longus/magnus recruitment."
      },
    ]
  },
  {
    id: 'agility_ladder_hops',
    name: "Agility Ladder Hops",
    category: 'cardio',
    movementPatterns: ["jump_sprint"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Two-foot or single-foot rapid hops through agility ladder squares.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gastrocnemius',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "reactive ankle hopping",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Stretch-shortening cycle."
      },
      {
        muscleId: 'quadriceps',
        role: 'secondary',
        coefficient: 0.4,
        jointAction: "knee landing absorption",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Landing dampening."
      },
    ]
  },
  {
    id: 'pullup_mixed_grip',
    name: "Mixed-Grip Pull-ups",
    category: 'pull',
    movementPatterns: ["vertical_pull"],
    difficulty: 'intermediate',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "One hand overhand, other hand underhand. Alternate grip each set.",
    prerequisites: ["pullup_standard"],
    regressions: ["pullup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'latissimus_dorsi',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "vertical pulling",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Asymmetric lat load."
      },
      {
        muscleId: 'biceps_brachii',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "supinated arm elbow flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Supinated side biceps load."
      },
    ]
  },
  {
    id: 'side_plank_raises',
    name: "Side Plank Raises",
    category: 'core',
    movementPatterns: ["lateral_flexion"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "In side plank, dip hips toward floor and raise them above neutral into lateral flexion.",
    prerequisites: ["side_plank"],
    regressions: ["side_plank"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'obliques',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "dynamic lateral spinal flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Dynamic oblique shortening."
      },
      {
        muscleId: 'gluteus_medius_minimus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "hip abduction elevation",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Downside lateral hip drive."
      },
    ]
  },
  {
    id: 'pushup_aztec',
    name: "Aztec Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push", "jump_sprint"],
    difficulty: 'elite',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Explode completely off floor, pike body in mid-air to touch toes with hands, and land into push-up.",
    safetyCautions: "Extreme wrist and shoulder impact load; elite calisthenics movement only.",
    prerequisites: ["pushup_clap"],
    regressions: ["pushup_clap"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "maximal explosive pressing",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Peak rate of force development."
      },
      {
        muscleId: 'triceps_brachii',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "explosive elbow lockout",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Propulsion."
      },
      {
        muscleId: 'rectus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "mid-air rapid pike compression",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Extreme pike core contraction."
      },
    ]
  },
  {
    id: 'wall_sit',
    name: "Wall Sit",
    category: 'legs',
    movementPatterns: ["squat"],
    difficulty: 'beginner',
    equipment: ["wall"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Back flat against wall, slide down until thighs are parallel to floor with knees at 90 degrees.",
    safetyCautions: "Keep entire back pressed into wall.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "sustained 90-degree isometric knee extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Pure isometric quad tension."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "hip stabilization",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Holds position."
      },
    ]
  },
  {
    id: 'burpee_broad_jumps',
    name: "Burpee Broad Jumps",
    category: 'cardio',
    movementPatterns: ["jump_sprint", "locomotion"],
    difficulty: 'advanced',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Perform a full push-up burpee, and leap out of bottom squat into a maximum distance broad jump.",
    prerequisites: ["burpees", "broad_jumps"],
    regressions: ["burpees"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "squat & jump takeoff",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Compound leg power."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "horizontal hip extension",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Glute drive."
      },
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "burpee floor push",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Upper body press."
      },
    ]
  },
  {
    id: 'pullup_ice_cream_maker',
    name: "Ice Cream Maker Pull-ups",
    category: 'pull',
    movementPatterns: ["vertical_pull", "horizontal_pull"],
    difficulty: 'advanced',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Pull chin to bar, push body back into horizontal front lever while maintaining bent arms, pull back in.",
    safetyCautions: "Demands advanced scapular leverage and core stability.",
    prerequisites: ["pullup_standard"],
    regressions: ["inverted_rows_elevated"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'latissimus_dorsi',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "transition between vertical and horizontal lever",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Continuous lat recruitment."
      },
      {
        muscleId: 'biceps_brachii',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "isometric elbow flexion hold",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Holding 90 degree arm angle."
      },
      {
        muscleId: 'rectus_abdominis',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "horizontal lever core support",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Prevents hip drop."
      },
    ]
  },
  {
    id: 'superman_hold',
    name: "Superman Hold",
    category: 'core',
    movementPatterns: ["hip_hinge"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Lie prone; simultaneously lift arms, chest, and legs off floor by engaging entire posterior chain.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'erector_spinae',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "full spinal extension hold",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Posterior spinal extensor strength."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "hip extension hold",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Glute contraction lifting legs."
      },
      {
        muscleId: 'trapezius_mid_lower',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "scapular retraction",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Upper back hold."
      },
    ]
  },
  {
    id: 'pushup_hindu',
    name: "Hindu Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push", "vertical_push"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "From downward dog, sweep chest down and forward brushing floor, arch up into upward dog, push back.",
    prerequisites: ["pushup_standard"],
    regressions: ["pushup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "swooping horizontal press",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Chest press through arc."
      },
      {
        muscleId: 'deltoid_anterior',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "shoulder flexion in transition",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Shoulder press overhead transition."
      },
      {
        muscleId: 'triceps_brachii',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "elbow extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Lockout."
      },
    ]
  },
  {
    id: 'cossack_squats',
    name: "Cossack Squats",
    category: 'legs',
    movementPatterns: ["lunge"],
    difficulty: 'advanced',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Wide stance; descend deep into single-leg squat while opposite leg stays straight with toes pointed up.",
    safetyCautions: "Ensure heel of squatting leg stays on floor.",
    prerequisites: ["lateral_lunges"],
    regressions: ["lateral_lunges"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "deep single-leg knee flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Full ROM single leg quad drive."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "deep hip extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Glute drive out of bottom."
      },
      {
        muscleId: 'hip_adductors',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "deep eccentric stretch on straight leg",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Groin mobility and control."
      },
    ]
  },
  {
    id: 'sprint_jump_sprint',
    name: "Sprint-Jump-Sprint (3 reps)",
    category: 'cardio',
    movementPatterns: ["jump_sprint", "locomotion"],
    difficulty: 'advanced',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Sprint 10m, explode into maximum vertical jump, land and sprint immediately for another 10m.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gastrocnemius',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "sprinting propulsion",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Ankle power."
      },
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "acceleration & vertical jump",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Knee extensor drive."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "hip extension sprint drive",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Hip propulsion."
      },
    ]
  },
  {
    id: 'towel_rows',
    name: "Towel Rows (under door)",
    category: 'pull',
    movementPatterns: ["horizontal_pull"],
    difficulty: 'beginner',
    equipment: ["towel_strap"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Loop strong towel around door anchor or post; lean back with straight arms and row chest to hands.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rhomboids',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "scapular retraction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Scapular pinching."
      },
      {
        muscleId: 'trapezius_mid_lower',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "middle back contraction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Mid back pull."
      },
      {
        muscleId: 'latissimus_dorsi',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "horizontal shoulder extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'moderate',
        notes: "Lat assistance."
      },
    ]
  },
  {
    id: 'alternating_heel_touches',
    name: "Alternating Heel Touches",
    category: 'core',
    movementPatterns: ["lateral_flexion"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Lie supine with knees bent; crunch shoulders up and alternate reaching side to side to touch heels.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'obliques',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "lateral trunk flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Oblique crunching."
      },
      {
        muscleId: 'rectus_abdominis',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "isometric core curl",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Holds shoulders off floor."
      },
    ]
  },
  {
    id: 'pushup_fingertip',
    name: "Fingertip Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push"],
    difficulty: 'advanced',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Perform push-ups supporting bodyweight entirely on fingertips.",
    safetyCautions: "Regress to knee support if joint pain occurs.",
    prerequisites: ["pushup_standard"],
    regressions: ["pushup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'forearm_flexors',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "isometric finger joint stabilization",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Exceptional finger and grip strength."
      },
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "horizontal adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Chest push."
      },
      {
        muscleId: 'triceps_brachii',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "elbow extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Arm lockout."
      },
    ]
  },
  {
    id: 'single_leg_glute_bridge',
    name: "Single-Leg Glute Bridge",
    category: 'legs',
    movementPatterns: ["hip_hinge"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "One leg extended straight in air; drive through planted heel to raise hips into full extension.",
    prerequisites: ["glute_bridges"],
    regressions: ["glute_bridges"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gluteus_maximus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "unilateral hip extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Isolated single glute drive."
      },
      {
        muscleId: 'hamstrings',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "hip extension synergy",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Hamstring assistance."
      },
      {
        muscleId: 'gluteus_medius_minimus',
        role: 'stabiliser',
        coefficient: 0.3,
        jointAction: "pelvic leveling",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Prevents non-working side pelvic drop."
      },
    ]
  },
  {
    id: 'plank_jump_ins',
    name: "Plank Jump-Ins",
    category: 'cardio',
    movementPatterns: ["jump_sprint", "anti_extension"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "From push-up plank, jump both feet forward together outside hands, then jump back to plank.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rectus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "rapid hip/trunk flexion tuck",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Core flexion rebound."
      },
      {
        muscleId: 'gastrocnemius',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "ankle rebound",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Foot spring."
      },
    ]
  },
  {
    id: 'inverted_rows_elevated',
    name: "Inverted Body Rows (Feet Elevated)",
    category: 'pull',
    movementPatterns: ["horizontal_pull"],
    difficulty: 'intermediate',
    equipment: ["pull_up_bar", "box_bench"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Horizontal bar at waist height, heels on bench. Pull chest to touch bar with full scapular retraction.",
    prerequisites: ["australian_pullups"],
    regressions: ["australian_pullups"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rhomboids',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "scapular retraction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Scapular retractors."
      },
      {
        muscleId: 'trapezius_mid_lower',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "scapular depression and retraction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Mid back thickness."
      },
      {
        muscleId: 'latissimus_dorsi',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "horizontal shoulder extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Synergist pull."
      },
      {
        muscleId: 'biceps_brachii',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "elbow flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Elbow flexor."
      },
    ]
  },
  {
    id: 'seated_in_and_outs',
    name: "Seated In-and-Outs",
    category: 'core',
    movementPatterns: ["trunk_flexion"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Sit on floor leaning back slightly; extend legs straight forward, then pull knees tightly into chest.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rectus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "dynamic abdominal shortening",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Anterior core compression."
      },
      {
        muscleId: 'transversus_abdominis',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "core brace",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Torso balance."
      },
    ]
  },
  {
    id: 'pushup_pseudo_planche',
    name: "Pseudo-Planche Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push"],
    difficulty: 'advanced',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Hands turned slightly out and placed down near waist level; lean shoulders far forward of wrists.",
    safetyCautions: "High wrist extension angle; warm up wrists thoroughly.",
    prerequisites: ["pushup_standard"],
    regressions: ["pushup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'deltoid_anterior',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "extreme shoulder flexion leverage",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Severe forward shoulder lean loading."
      },
      {
        muscleId: 'pectoralis_major_clavicular',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "clavicular pec horizontal flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Upper chest push."
      },
      {
        muscleId: 'serratus_anterior',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "scapular protraction under forward lean",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Protraction strength."
      },
    ]
  },
  {
    id: 'duck_walk',
    name: "Duck Walk (10m)",
    category: 'legs',
    movementPatterns: ["squat", "locomotion"],
    difficulty: 'advanced',
    equipment: ["bodyweight"],
    defaultUnit: 'meters',
    unilateral: false,
    instructions: "Drop into full deep squat; waddle forward keeping hips low and torso upright.",
    safetyCautions: "Demands high knee flexion tolerance.",
    prerequisites: ["squat_bodyweight"],
    regressions: ["squat_bodyweight"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "sustained deep knee flexion torque",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "High time-under-tension knee loading."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "hip stabilization",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Base support."
      },
    ]
  },
  {
    id: 'sprint_stair_climbs',
    name: "Sprint Stair Climbs (4 flights)",
    category: 'cardio',
    movementPatterns: ["locomotion", "jump_sprint"],
    difficulty: 'intermediate',
    equipment: ["stairs"],
    defaultUnit: 'flights',
    unilateral: false,
    instructions: "Sprint rapidly up stairs 2 steps at a time, driving knees high.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "concentric stair push",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Knee extensor drive."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "hip extension drive",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Glute power."
      },
      {
        muscleId: 'gastrocnemius',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "plantarflexion stair spring",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Ankle propulsion."
      },
    ]
  },
  {
    id: 'pullup_scapular',
    name: "Scapular Pull-ups",
    category: 'pull',
    movementPatterns: ["vertical_pull"],
    difficulty: 'beginner',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Hang from bar with straight arms; depress and retract shoulder blades to lift torso 8-10cm, then relax.",
    safetyCautions: "Do not bend elbows.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'trapezius_mid_lower',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "isolated scapular depression & upward rotation",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Essential scapulohumeral rhythm drill."
      },
      {
        muscleId: 'latissimus_dorsi',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "initial pull initiation",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Lat initiation."
      },
    ]
  },
  {
    id: 'boat_hold',
    name: "Boat Hold",
    category: 'core',
    movementPatterns: ["anti_extension", "trunk_flexion"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Sit on sit-bones, lift straight legs 45 degrees, reach arms forward parallel to ground; hold steady.",
    prerequisites: ["crunches_standard"],
    regressions: ["crunches_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rectus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "sustained V-position isometric flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Isometric compression."
      },
      {
        muscleId: 'transversus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "deep pelvic floor & core brace",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Core girdle."
      },
    ]
  },
  {
    id: 'pushup_pike',
    name: "Pike Push-ups",
    category: 'push',
    movementPatterns: ["vertical_push"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Inverted V-shape with hips elevated; lower crown of head diagonally forward between hands, press back.",
    prerequisites: ["pushup_decline"],
    regressions: ["pushup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'deltoid_anterior',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "overhead vertical shoulder flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Bodyweight shoulder press prime mover."
      },
      {
        muscleId: 'triceps_brachii',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "elbow extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Overhead elbow lockout."
      },
      {
        muscleId: 'trapezius_upper',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "scapular upward rotation",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Shoulder elevation."
      },
    ]
  },
  {
    id: 'calf_jumps',
    name: "Calf Jumps",
    category: 'legs',
    movementPatterns: ["jump_sprint"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Hop repeatedly vertically using only ankle plantarflexion with knees kept nearly locked straight.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gastrocnemius',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "stiff ankle reactive bouncing",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Achilles tendon elasticity."
      },
      {
        muscleId: 'soleus',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "ankle plantarflexion support",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Synergist support."
      },
    ]
  },
  {
    id: 'footfire_drills',
    name: "Footfire Drills",
    category: 'cardio',
    movementPatterns: ["jump_sprint"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Rapid alternating foot patter in quarter squat with maximum turnover speed.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gastrocnemius',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "rapid ankle flutter",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "High cadence ankle action."
      },
      {
        muscleId: 'soleus',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "postural stabilization",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Soleus support."
      },
    ]
  },
  {
    id: 'pullup_wide_to_close',
    name: "Wide-to-Close Pull-ups",
    category: 'pull',
    movementPatterns: ["vertical_pull"],
    difficulty: 'advanced',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Perform wide-grip pull-up, walk hands to shoulder width for next rep, walk to close grip for next rep.",
    prerequisites: ["pullup_standard"],
    regressions: ["pullup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'latissimus_dorsi',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "variable width shoulder adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Full range lat activation."
      },
      {
        muscleId: 'biceps_brachii',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "elbow flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Varying arm flexor load."
      },
    ]
  },
  {
    id: 'toes_to_bar',
    name: "Toes-to-Bar",
    category: 'core',
    movementPatterns: ["trunk_flexion"],
    difficulty: 'advanced',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "From dead hang, contract lats and compress abs to bring toes all the way up to touch the bar.",
    safetyCautions: "Avoid uncontrolled swinging.",
    prerequisites: ["hanging_knee_raises"],
    regressions: ["hanging_knee_raises"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rectus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "full anterior pelvic tilt & lumbar flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Peak abdominal recruitment."
      },
      {
        muscleId: 'latissimus_dorsi',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "straight-arm shoulder depression",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Lat pull maintaining clearance."
      },
    ]
  },
  {
    id: 'pushup_decline_clap',
    name: "Decline Clap Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push", "jump_sprint"],
    difficulty: 'elite',
    equipment: ["box_bench"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Feet elevated on 30-45cm bench; explode off hands with enough clearance to clap before landing.",
    safetyCautions: "Severe impact on wrists and shoulders.",
    prerequisites: ["pushup_clap"],
    regressions: ["pushup_clap"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'pectoralis_major_clavicular',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "explosive clavicular pec drive",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "High upper chest rate of force development."
      },
      {
        muscleId: 'triceps_brachii',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "rapid elbow extension lockout",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Fast twitch triceps."
      },
      {
        muscleId: 'deltoid_anterior',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "shoulder flexion drive",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Anterior shoulder."
      },
    ]
  },
  {
    id: 'reverse_nordic_curl',
    name: "Reverse Nordic Curl",
    category: 'legs',
    movementPatterns: ["squat"],
    difficulty: 'advanced',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Tall kneeling, hips locked forward. Lean torso backward from knees only, descend under control, drive back up.",
    safetyCautions: "High quadriceps tendon loading; progress ROM gradually.",
    prerequisites: ["squat_bodyweight"],
    regressions: ["squat_bodyweight"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "extreme lengthened-state eccentric knee extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Heavy eccentric overload on rectus femoris."
      },
      {
        muscleId: 'rectus_abdominis',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "anterior core pelvic lock",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Maintains neutral pelvis."
      },
    ]
  },
  {
    id: 'pullup_one_arm_negatives',
    name: "One-Arm Negative Pull-ups",
    category: 'pull',
    movementPatterns: ["vertical_pull"],
    difficulty: 'elite',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Jump with two arms to top of pull-up, release one hand, and lower over 5 full seconds on single arm.",
    safetyCautions: "Prerequisite: 15+ standard pull-ups. Severe eccentric tendon stress.",
    prerequisites: ["pullup_one_arm_assisted"],
    regressions: ["pullup_one_arm_assisted"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'latissimus_dorsi',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "maximal unilateral eccentric shoulder adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Supramaximal single arm lat overload."
      },
      {
        muscleId: 'biceps_brachii',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "maximal unilateral eccentric elbow flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Supramaximal eccentric biceps strain."
      },
      {
        muscleId: 'forearm_flexors',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "maximal single-hand bar hang grip",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Full bodyweight single hand grip."
      },
    ]
  },
  {
    id: 'v_hold',
    name: "V-Hold",
    category: 'core',
    movementPatterns: ["trunk_flexion"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Hold the apex of a V-up with straight legs and torso forming a sharp V; arms reach toward feet.",
    prerequisites: ["v_ups"],
    regressions: ["v_ups"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rectus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "isometric hip & trunk flexion hold",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Maximal isometric abdominal compression."
      },
      {
        muscleId: 'transversus_abdominis',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "core stabilization",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Core corset."
      },
    ]
  },
  {
    id: 'pushup_incline_clap',
    name: "Incline Clap Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push", "jump_sprint"],
    difficulty: 'intermediate',
    equipment: ["box_bench"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Hands on bench, feet on floor; push explosively off bench to clap hands before landing smoothly.",
    prerequisites: ["pushup_standard"],
    regressions: ["pushup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "explosive chest press",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Rate of force development regression for clapping push-up."
      },
      {
        muscleId: 'triceps_brachii',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "elbow extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Lockout."
      },
    ]
  },
  {
    id: 'elevated_lunges',
    name: "Elevated Lunges",
    category: 'legs',
    movementPatterns: ["lunge"],
    difficulty: 'intermediate',
    equipment: ["box_bench"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Front foot on 10-15cm step; descend deeply so back knee approaches floor below front foot plane.",
    prerequisites: ["lunges_standard"],
    regressions: ["lunges_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "deficit knee extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Increased ROM quad work."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "deficit hip extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Deep hip stretch and drive."
      },
    ]
  },
  {
    id: 'sprint_in_place',
    name: "Sprint-in-Place",
    category: 'cardio',
    movementPatterns: ["locomotion"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Maximum effort sprinting in place with vigorous arm drive.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gastrocnemius',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "cadence plantarflexion",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Ankle power."
      },
      {
        muscleId: 'quadriceps',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "knee drive",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Leg turnover."
      },
    ]
  },
  {
    id: 'australian_pullups',
    name: "Australian Pull-ups",
    category: 'pull',
    movementPatterns: ["horizontal_pull"],
    difficulty: 'beginner',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Bar at waist height; feet on floor with body at 45 degree angle. Row chest to bar.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rhomboids',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "scapular retraction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Retraction prime mover."
      },
      {
        muscleId: 'trapezius_mid_lower',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "scapular depression & retraction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Middle back thickness."
      },
      {
        muscleId: 'latissimus_dorsi',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "shoulder extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Lat synergy."
      },
    ]
  },
  {
    id: 'pushup_shoulder_tap',
    name: "Shoulder-Tap Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push", "anti_rotation"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Perform push-up; at top lockout tap opposite shoulder with hand while bracing hips from swaying.",
    prerequisites: ["pushup_standard"],
    regressions: ["pushup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "horizontal adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Chest press."
      },
      {
        muscleId: 'obliques',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "anti-rotational torso brace on 3 contact points",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Resists rotational torque during tap."
      },
      {
        muscleId: 'triceps_brachii',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "elbow extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Lockout."
      },
    ]
  },
  {
    id: 'curtsy_lunges',
    name: "Curtsy Lunges",
    category: 'legs',
    movementPatterns: ["lunge"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Step rear foot diagonally behind front leg and bend knees into curtsy lunge.",
    prerequisites: ["lunges_standard"],
    regressions: ["lunges_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gluteus_medius_minimus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "lateral hip abduction and stabilization",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "High glute medius challenge in crossover stance."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "hip extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Glute drive."
      },
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "knee extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Front quad drive."
      },
    ]
  },
  {
    id: 'lateral_bound_sprints',
    name: "Lateral Bound Sprints (10mx4)",
    category: 'cardio',
    movementPatterns: ["jump_sprint", "locomotion"],
    difficulty: 'advanced',
    equipment: ["bodyweight"],
    defaultUnit: 'meters',
    unilateral: true,
    instructions: "Dynamic lateral bounds alternating left and right covering 10 meters, followed by sprint turnaround.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gluteus_medius_minimus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "frontal plane propulsion",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Lateral push-off power."
      },
      {
        muscleId: 'gastrocnemius',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "ankle explosive push-off",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Plantarflexion drive."
      },
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "lateral landing absorption",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Decelerative knee stability."
      },
    ]
  },
  {
    id: 'chin_ups_close_grip',
    name: "Close-Grip Chin-ups",
    category: 'pull',
    movementPatterns: ["vertical_pull"],
    difficulty: 'intermediate',
    equipment: ["pull_up_bar"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Underhand grip with hands 10-15cm apart. Pull chest to bar with intense biceps squeeze.",
    prerequisites: ["chin_ups"],
    regressions: ["chin_ups"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'biceps_brachii',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "maximal elbow flexion leverage in supination",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Peak biceps mechanical advantage."
      },
      {
        muscleId: 'latissimus_dorsi',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "sagittal shoulder extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Lat extension."
      },
    ]
  },
  {
    id: 'mountain_climbers_crossbody',
    name: "Crossbody Mountain Climbers",
    category: 'core',
    movementPatterns: ["anti_rotation", "trunk_flexion"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Drive knee across body toward opposite elbow in high plank.",
    prerequisites: ["mountain_climbers"],
    regressions: ["mountain_climbers"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'obliques',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "rotational knee drive",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Oblique rotational engagement."
      },
      {
        muscleId: 'rectus_abdominis',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "anti-extension core brace",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Core brace."
      },
    ]
  },
  {
    id: 'pushup_wall',
    name: "Wall Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push"],
    difficulty: 'beginner',
    equipment: ["wall"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Hands on wall at chest height; lower face to wall and push back.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "light horizontal adduction regression",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Beginner regression (~30% BW load)."
      },
      {
        muscleId: 'triceps_brachii',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "elbow extension",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Arm push."
      },
    ]
  },
  {
    id: 'tibialis_raises',
    name: "Tibialis Raises",
    category: 'legs',
    movementPatterns: ["accessory_isolation"],
    difficulty: 'beginner',
    equipment: ["wall"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Lean back against wall with heels 30cm out; dorsiflex ankles pulling toes toward shins, hold 1 sec.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'tibialis_anterior',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "isolated ankle dorsiflexion against body leverage",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Direct anterior shin strengthening drill."
      },
    ]
  },
  {
    id: 'cone_weave_sprints',
    name: "Cone Weave Sprints",
    category: 'cardio',
    movementPatterns: ["locomotion", "jump_sprint"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Weave in and out around cones in rapid slalom pattern.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gastrocnemius',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "multi-directional ankle cuts",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Cutting agility."
      },
      {
        muscleId: 'gluteus_medius_minimus',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "frontal hip stabilization during lateral cuts",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Hip stabilization."
      },
    ]
  },
  {
    id: 'pullup_isometric_hold_top',
    name: "Isometric Pull-up Hold (top)",
    category: 'pull',
    movementPatterns: ["vertical_pull"],
    difficulty: 'intermediate',
    equipment: ["pull_up_bar"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Hold chin over bar with elbows pulled down and back for designated duration.",
    prerequisites: ["pullup_standard"],
    regressions: ["pullup_standard"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'latissimus_dorsi',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "peak concentric isometric shoulder adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Maximal peak contraction hold."
      },
      {
        muscleId: 'biceps_brachii',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "isometric elbow flexion hold",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Holding flexed elbow."
      },
      {
        muscleId: 'trapezius_mid_lower',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "full scapular depression hold",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Upper back lockout."
      },
    ]
  },
  {
    id: 'hollow_to_arch_rock',
    name: "Hollow-to-Arch Rock",
    category: 'core',
    movementPatterns: ["anti_extension", "hip_hinge"],
    difficulty: 'advanced',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "From hollow body rock, roll over smoothly into arch rock and back without touching limbs down.",
    prerequisites: ["hollow_body_hold", "superman_hold"],
    regressions: ["hollow_body_hold"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rectus_abdominis',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "hollow body anterior flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Anterior core gymnastics compression."
      },
      {
        muscleId: 'erector_spinae',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "arch posterior extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Posterior chain arch."
      },
      {
        muscleId: 'transversus_abdominis',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "rotational coordination",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Core roll transition."
      },
    ]
  },
  {
    id: 'pushup_one_arm_wall',
    name: "One-Arm Wall Push-ups",
    category: 'push',
    movementPatterns: ["horizontal_push"],
    difficulty: 'intermediate',
    equipment: ["wall"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Stand facing wall, press with one arm while opposite hand rests behind back.",
    prerequisites: ["pushup_wall"],
    regressions: ["pushup_wall"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "unilateral pushing regression",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Single arm pressing mechanics."
      },
      {
        muscleId: 'obliques',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "anti-rotational torso stability",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Prevents torso twist."
      },
    ]
  },
  {
    id: 'sissy_squats_eccentric',
    name: "Sissy Squats (Eccentric)",
    category: 'legs',
    movementPatterns: ["squat"],
    difficulty: 'advanced',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Rise onto toes, push knees forward while leaning torso backward in straight line, lower under control.",
    safetyCautions: "High patellofemoral shear; initiate with short range of motion.",
    prerequisites: ["squat_bodyweight"],
    regressions: ["squat_bodyweight"],
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "extreme rectus femoris lengthened-state knee extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Severe isolated rectus femoris tension."
      },
      {
        muscleId: 'gastrocnemius',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "plantarflexion balance support",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Toe balance."
      },
    ]
  },
  {
    id: 'surya_namaskar',
    name: "Surya Namaskar (Sun Salutation)",
    category: 'mobility',
    movementPatterns: ["mobility_flow"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Classic continuous vinyasa sequence linking mountain pose, forward fold, plank, cobra, and downward dog with breath.",
    safetyCautions: "Flow smoothly between postures.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'erector_spinae',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "segmental spinal extension and flexion",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Dynamic spinal wave."
      },
      {
        muscleId: 'hamstrings',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "posterior chain dynamic lengthening",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Forward fold elongation."
      },
      {
        muscleId: 'deltoid_anterior',
        role: 'secondary',
        coefficient: 0.4,
        jointAction: "overhead arm sweep",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Shoulder mobility."
      },
    ]
  },
  {
    id: 'tadasana',
    name: "Tadasana (Mountain Pose)",
    category: 'mobility',
    movementPatterns: ["mobility_flow"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Stand tall with feet parallel, engage arches, align pelvis neutral, roll shoulders back, lengthen crown.",
    safetyCautions: "Focus on even weight distribution through foot tripod.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'transversus_abdominis',
        role: 'secondary',
        coefficient: 0.4,
        jointAction: "axial elongation and postural core tone",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Neutral spine alignment."
      },
      {
        muscleId: 'deep_cervical_flexors',
        role: 'secondary',
        coefficient: 0.4,
        jointAction: "cervical spine axial alignment",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Chin tuck posture."
      },
    ]
  },
  {
    id: 'ardha_uttanasana',
    name: "Ardha Uttanasana (Half Forward Fold)",
    category: 'mobility',
    movementPatterns: ["mobility_flow"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Hinge at hips, place hands on shins, extend spine parallel to floor with flat back and broad collarbones.",
    safetyCautions: "Micro-bend knees if hamstrings are tight.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'hamstrings',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "proximal hamstring active elongation",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Posterior chain lengthen."
      },
      {
        muscleId: 'erector_spinae',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "isometric horizontal spine hold",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Spinal extensor tone."
      },
    ]
  },
  {
    id: 'adho_mukha_svanasana',
    name: "Adho Mukha Svanasana (Downward-Facing Dog)",
    category: 'mobility',
    movementPatterns: ["mobility_flow"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Inverted V-shape with hands shoulder-width, pressing floor away, heels descending toward ground.",
    safetyCautions: "Broaden upper back; relax neck.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gastrocnemius',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "ankle dorsiflexion and calf stretch",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Calf/Achilles lengthen."
      },
      {
        muscleId: 'serratus_anterior',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "scapular upward rotation support",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Active push through palms."
      },
      {
        muscleId: 'latissimus_dorsi',
        role: 'secondary',
        coefficient: 0.4,
        jointAction: "overhead shoulder flexion opening",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Thoracic opening."
      },
    ]
  },
  {
    id: 'cat_cow_stretch',
    name: "Cat\u2013Cow Flow",
    category: 'mobility',
    movementPatterns: ["mobility_flow"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "On hands and knees; alternate undulating spine from gentle lumbar/thoracic extension (Cow) to full flexion (Cat).",
    safetyCautions: "Coordinate motion with natural breathing.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'erector_spinae',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "active spinal extension mobility",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Segmental spine extension."
      },
      {
        muscleId: 'rectus_abdominis',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "active spinal flexion mobility",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Segmental spine flexion."
      },
    ]
  },
  {
    id: 'anjaneyasana_low_lunge',
    name: "Anjaneyasana (Low Lunge)",
    category: 'mobility',
    movementPatterns: ["mobility_flow"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: true,
    instructions: "Step one foot forward into lunge, lower rear knee to floor, glide hips forward while lifting chest.",
    safetyCautions: "Engage glute of rear leg to deepen anterior hip stretch.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'quadriceps',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "rectus femoris & iliopsoas elongation",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Anterior hip flexor stretch."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'secondary',
        coefficient: 0.4,
        jointAction: "rear leg hip extension assist",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Hip opening."
      },
    ]
  },
  {
    id: 'pigeon_pose',
    name: "Pigeon Pose (Eka Pada Rajakapotasana)",
    category: 'mobility',
    movementPatterns: ["mobility_flow"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: true,
    instructions: "Front knee bent at 45-90 degrees across mat, rear leg extended straight back. Lower torso over front shin.",
    safetyCautions: "Place block under hip if pelvis tilts excessively.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gluteus_maximus',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "deep piriformis & hip external rotator stretch",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Posterior hip capsule release."
      },
      {
        muscleId: 'gluteus_medius_minimus',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "lateral hip tissue elongation",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Lateral glute mobility."
      },
    ]
  },
  {
    id: 'lizard_pose',
    name: "Lizard Pose (Utthan Pristhasana)",
    category: 'mobility',
    movementPatterns: ["mobility_flow"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: true,
    instructions: "Deep lunge with front foot placed outside both hands; lower forearms toward floor inside front foot.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'hip_adductors',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "groin & adductor elongation",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Deep groin opening."
      },
      {
        muscleId: 'hamstrings',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "proximal hamstring release",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Hamstring origin stretch."
      },
    ]
  },
  {
    id: 'seated_forward_fold',
    name: "Seated Forward Fold (Paschimottanasana)",
    category: 'mobility',
    movementPatterns: ["mobility_flow"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Sit with legs extended straight forward; hinge at hips and reach forward toward toes with long spine.",
    safetyCautions: "Hinge from hips, do not aggressively round upper back.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'hamstrings',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "bilateral posterior chain elongation",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Hamstring tendon stretch."
      },
      {
        muscleId: 'erector_spinae',
        role: 'secondary',
        coefficient: 0.4,
        jointAction: "lumbar paraspinal stretch",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Lower back release."
      },
    ]
  },
  {
    id: 'supine_spinal_twist',
    name: "Supine Spinal Twist (Supta Matsyendrasana)",
    category: 'mobility',
    movementPatterns: ["mobility_flow"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: true,
    instructions: "Lie on back, draw one knee to chest, cross it over opposite side toward floor while keeping shoulders grounded.",
    safetyCautions: "Allow gravity to guide the knee down.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'obliques',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "thoracolumbar rotational mobility",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Rotational spinal release."
      },
      {
        muscleId: 'erector_spinae',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "paraspinal muscle relaxation",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Spine decompression."
      },
    ]
  },
  {
    id: 'butterfly_stretch',
    name: "Butterfly Stretch (Baddha Konasana)",
    category: 'mobility',
    movementPatterns: ["mobility_flow"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Seated; bring soles of feet together, knees dropping out to sides, gently press knees down toward floor.",
    safetyCautions: "Sit tall on sit-bones.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'hip_adductors',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "bilateral groin adductor stretch",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Adductor longus/brevis release."
      },
      {
        muscleId: 'gluteus_medius_minimus',
        role: 'secondary',
        coefficient: 0.3,
        jointAction: "hip external rotation assist",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Hip opening."
      },
    ]
  },
  {
    id: 'hamstring_wall_stretch',
    name: "Hamstring Wall Stretch",
    category: 'mobility',
    movementPatterns: ["mobility_flow"],
    difficulty: 'beginner',
    equipment: ["wall"],
    defaultUnit: 'seconds',
    unilateral: true,
    instructions: "Lie supine next to doorway or wall with one leg resting vertically up the surface, other leg flat on floor.",
    safetyCautions: "Keep pelvis grounded on floor.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'hamstrings',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "isolated passive hamstring elongation",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Full length hamstring stretch."
      },
    ]
  },
  {
    id: 'frog_pose',
    name: "Frog Pose (Mandukasana)",
    category: 'mobility',
    movementPatterns: ["mobility_flow"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "On hands and knees; widen knees as far apart as comfortable, feet turned outward, sink hips back.",
    safetyCautions: "Use padding beneath knees.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'hip_adductors',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "intense bilateral hip adductor opening",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Deep groin and pelvic floor release."
      },
    ]
  },
  {
    id: 'shoulder_opener_stretch',
    name: "Shoulder Opener Stretch (Prone / Wall)",
    category: 'mobility',
    movementPatterns: ["mobility_flow"],
    difficulty: 'beginner',
    equipment: ["wall"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Hands placed overhead against wall or floor; press chest through into shoulder flexion opening.",
    safetyCautions: "Breathe into thoracic spine.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'pectoralis_major_sternal',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "anterior chest stretch",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Chest opening."
      },
      {
        muscleId: 'latissimus_dorsi',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "latissimus tendon stretch",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Overhead shoulder mobility."
      },
    ]
  },
  {
    id: 'wrist_flexor_stretch',
    name: "Wrist Flexor Stretch",
    category: 'mobility',
    movementPatterns: ["mobility_flow"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: "Kneeling with palms flat on floor, fingers pointing backward toward knees. Gently lean hips back.",
    safetyCautions: "Do not force through sharp wrist pain.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'forearm_flexors',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "wrist & finger flexor tendon elongation",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Wrist flexor mobility."
      },
      {
        muscleId: 'forearm_extensors',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "wrist extensor release",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Opposite side wrist release."
      },
    ]
  },
  {
    id: 'prone_y_raises',
    name: "Prone Y Raises",
    category: 'accessory',
    movementPatterns: ["accessory_isolation"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Lie face down, arms outstretched at 45 degrees forming a Y, thumbs pointed upward. Lift thumbs toward ceiling.",
    safetyCautions: "Avoid shrugging; initiate from lower shoulder blades.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'trapezius_mid_lower',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "lower trapezius upward rotation & depression",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Direct lower trapezius isolation."
      },
      {
        muscleId: 'deltoid_posterior',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "rear shoulder extension assist",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'moderate',
        notes: "Rear shoulder synergist."
      },
    ]
  },
  {
    id: 'prone_t_raises',
    name: "Prone T Raises",
    category: 'accessory',
    movementPatterns: ["accessory_isolation"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Lie prone, arms straight out to sides forming a T with thumbs up. Pinch shoulder blades together to lift arms.",
    safetyCautions: "Keep neck neutral.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'deltoid_posterior',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "horizontal abduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Posterior deltoid agonist."
      },
      {
        muscleId: 'rhomboids',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "scapular retraction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Middle back retraction."
      },
      {
        muscleId: 'trapezius_mid_lower',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "middle trapezius squeeze",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Middle trapezius synergy."
      },
    ]
  },
  {
    id: 'prone_w_raises',
    name: "Prone W Raises",
    category: 'accessory',
    movementPatterns: ["accessory_isolation"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Lie prone, elbows bent by ribs forming a W shape. Lift hands and elbows rotating shoulders backward.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rotator_cuff',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "shoulder external rotation",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Infraspinatus & teres minor loading."
      },
      {
        muscleId: 'deltoid_posterior',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "external rotation assist",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Rear shoulder contribution."
      },
    ]
  },
  {
    id: 'bird_dog',
    name: "Bird Dog",
    category: 'accessory',
    movementPatterns: ["anti_rotation"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "On hands and knees, slowly reach opposite arm and leg straight out without allowing spine to rotate or sag.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'erector_spinae',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "contralateral spinal stabilization",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Multifidus and erector recruitment with minimal spinal compression."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "hip extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Holds straight leg extended."
      },
    ]
  },
  {
    id: 'side_plank',
    name: "Side Plank",
    category: 'accessory',
    movementPatterns: ["lateral_flexion"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'seconds',
    unilateral: true,
    instructions: "Rest on forearm and side of feet, maintaining a straight diagonal line from head to heels.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'obliques',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "anti-lateral flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "High lateral abdominal wall challenge."
      },
      {
        muscleId: 'gluteus_medius_minimus',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "hip abduction support",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Downside hip stabilizer."
      },
    ]
  },
  {
    id: 'scapular_pushups',
    name: "Scapular Push-ups",
    category: 'accessory',
    movementPatterns: ["horizontal_push"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "In high plank with arms locked straight, let shoulder blades retract together, then push floor away protracting blades.",
    safetyCautions: "Do not bend elbows.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'serratus_anterior',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "isolated scapular protraction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Gold-standard serratus activation drill."
      },
    ]
  },
  {
    id: 'wall_slides',
    name: "Wall Slides",
    category: 'accessory',
    movementPatterns: ["accessory_isolation"],
    difficulty: 'beginner',
    equipment: ["wall"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Stand with back, elbows, and wrists pressed against wall; slide forearms upward into Y shape.",
    safetyCautions: "Maintain contact with wall without arching lower back.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'serratus_anterior',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "scapular upward rotation under wall resistance",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Shoulder health and upward rotation."
      },
      {
        muscleId: 'trapezius_mid_lower',
        role: 'secondary',
        coefficient: 0.6,
        jointAction: "lower trapezius upward rotation",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Lower trap activation."
      },
    ]
  },
  {
    id: 'side_lying_external_rotation',
    name: "Side-Lying External Rotation",
    category: 'accessory',
    movementPatterns: ["accessory_isolation"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Lie on side with top elbow pinned against ribcage bent at 90 degrees; rotate forearm upward toward ceiling.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'rotator_cuff',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "isolated infraspinatus & teres minor external rotation",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "High isolated rotator cuff activation."
      },
      {
        muscleId: 'deltoid_posterior',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "rear shoulder assist",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Synergist rotation."
      },
    ]
  },
  {
    id: 'hamstring_walkouts',
    name: "Hamstring Walkouts",
    category: 'accessory',
    movementPatterns: ["hip_hinge"],
    difficulty: 'intermediate',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "From glute bridge, take small steps with heels outward until knees are nearly straight, hold 1 sec, walk back in.",
    safetyCautions: "High eccentric hamstring tension.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'hamstrings',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "eccentric knee flexion & hip extension",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Direct bodyweight knee-flexor loading without machines."
      },
      {
        muscleId: 'gluteus_maximus',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "hip extension maintainer",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Keeps hips elevated."
      },
    ]
  },
  {
    id: 'copenhagen_plank',
    name: "Copenhagen Plank",
    category: 'accessory',
    movementPatterns: ["lateral_flexion"],
    difficulty: 'advanced',
    equipment: ["box_bench"],
    defaultUnit: 'seconds',
    unilateral: true,
    instructions: "Side plank with top leg resting on bench, bottom leg hovered underneath. Hold hips elevated.",
    safetyCautions: "Intense adductor tendon load. Begin with knee on bench before ankle.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'hip_adductors',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "isometric top-leg hip adduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Highest evidence-backed bodyweight adductor exercise (Schryver 2020)."
      },
      {
        muscleId: 'obliques',
        role: 'secondary',
        coefficient: 0.5,
        jointAction: "lateral core stability",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Maintains pelvic alignment."
      },
    ]
  },
  {
    id: 'side_lying_hip_abduction',
    name: "Side-Lying Hip Abduction",
    category: 'accessory',
    movementPatterns: ["accessory_isolation"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Lie on side, keep top leg straight with toes pointing slightly downward; lift top leg toward ceiling.",
    safetyCautions: "Do not roll pelvis backward.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'gluteus_medius_minimus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "isolated hip abduction",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Direct gluteus medius/minimus activation."
      },
      {
        muscleId: 'transversus_abdominis',
        role: 'stabiliser',
        coefficient: 0.2,
        jointAction: "pelvic core brace",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Pelvic stability."
      },
    ]
  },
  {
    id: 'bent_knee_calf_raises',
    name: "Bent-Knee Calf Raises",
    category: 'accessory',
    movementPatterns: ["accessory_isolation"],
    difficulty: 'beginner',
    equipment: ["wall"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Stand with knees bent to 25-30 degrees; rise onto balls of feet holding knee flexion throughout.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'soleus',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "isolated soleus plantarflexion under gastrocnemius slack",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Bent knee takes gastrocnemius into active insufficiency, isolating soleus."
      },
      {
        muscleId: 'gastrocnemius',
        role: 'secondary',
        coefficient: 0.3,
        jointAction: "submaximal plantarflexion",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Secondary support."
      },
    ]
  },
  {
    id: 'short_foot_exercise',
    name: "Short-Foot Exercise",
    category: 'accessory',
    movementPatterns: ["accessory_isolation"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Stand barefoot; draw the ball of the foot toward the heel without curling toes, elevating medial longitudinal arch.",
    safetyCautions: "Avoid curling toes.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'tibialis_anterior',
        role: 'secondary',
        coefficient: 0.4,
        jointAction: "foot arch elevation synergy",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Arch elevation."
      },
      {
        muscleId: 'gastrocnemius',
        role: 'stabiliser',
        coefficient: 0.2,
        jointAction: "tripod foot stability",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'moderate',
        notes: "Foot tripod balance."
      },
    ]
  },
  {
    id: 'chin_tucks',
    name: "Chin Tucks",
    category: 'accessory',
    movementPatterns: ["accessory_isolation"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Seated tall, gently draw chin straight backward making a double chin without tilting head down.",
    safetyCautions: "Gentle motion; stop if symptoms occur.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'deep_cervical_flexors',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "isolated craniocervical flexion",
        evidenceCategory: 'emg_excitation_evidence',
        confidence: 'high',
        notes: "Targeted longus colli/capitis postural strengthening."
      },
    ]
  },
  {
    id: 'self_resisted_wrist_extension',
    name: "Self-Resisted Wrist Extension",
    category: 'accessory',
    movementPatterns: ["accessory_isolation"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: "Forearm supported; use opposite hand to push downward against back of hand while extending wrist upward.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'forearm_extensors',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "concentric/isometric wrist extension",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Direct forearm extensor loading protecting against lateral epicondylalgia."
      },
    ]
  },
  {
    id: 'finger_spreading_opening',
    name: "Finger Spreading and Opening",
    category: 'accessory',
    movementPatterns: ["accessory_isolation"],
    difficulty: 'beginner',
    equipment: ["bodyweight"],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: "Make a fist, then forcefully spread and extend all fingers outward against air or light elastic band.",
    isCanonical: true,
    muscleMappings: [
      {
        muscleId: 'forearm_extensors',
        role: 'primary',
        coefficient: 1.0,
        jointAction: "intrinsic hand and finger extensor opening",
        evidenceCategory: 'biomechanical_evidence',
        confidence: 'high',
        notes: "Antagonist balance against bar hanging grip flexion."
      },
    ]
  },
];
