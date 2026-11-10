import { Exercise } from './domain';

export const canonicalExercises: Exercise[] = [
  // --- ROUND 1 ---
  {
    id: 'jumping_standard',
    name: 'Standard Jumping',
    category: 'cardio',
    movementPatterns: ['jump_sprint'],
    difficulty: 'beginner',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Continuous light vertical bounces with quick ankle reactivity.',
    muscleMappings: [
      { muscleId: 'gastrocnemius', role: 'primary', coefficient: 1.0, jointAction: 'plantarflexion', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Elastic stretch-shortening cycle load.' },
      { muscleId: 'quadriceps', role: 'secondary', coefficient: 0.5, jointAction: 'knee extension', evidenceType: 'biomechanical_inference', confidence: 'moderate', notes: 'Shock absorption and gentle propulsion.' }
    ]
  },
  {
    id: 'pullup_standard',
    name: 'Standard Pull-up',
    category: 'pull',
    movementPatterns: ['vertical_pull'],
    difficulty: 'intermediate',
    equipment: ['pull_up_bar'],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Overhand grip, shoulder-width apart. Depress scapulae, pull until chin clears the bar, control the descent.',
    prerequisites: ['pain_free_hanging_tolerance', 'scapular_pullups'],
    regressions: ['australian_pullups', 'assisted_pullups'],
    progressions: ['l_sit_pullups', 'archer_pullups'],
    muscleMappings: [
      { muscleId: 'latissimus_dorsi', role: 'primary', coefficient: 1.0, jointAction: 'shoulder adduction & extension', evidenceType: 'direct_emg', confidence: 'high', notes: 'Prime vertical puller.' },
      { muscleId: 'biceps_brachii', role: 'synergist', coefficient: 0.5, jointAction: 'elbow flexion', evidenceType: 'direct_emg', confidence: 'high', notes: 'Forearm in pronation; brachialis & brachioradialis share load.' },
      { muscleId: 'trapezius_mid_lower', role: 'synergist', coefficient: 0.5, jointAction: 'scapular depression & retraction', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Scapular stability throughout full ROM.' },
      { muscleId: 'forearm_flexors', role: 'stabiliser', coefficient: 0.2, jointAction: 'isometric grip hold', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Supports body mass hanging from bar.' }
    ]
  },
  {
    id: 'crunches_standard',
    name: 'Standard Crunches',
    category: 'core',
    movementPatterns: ['trunk_flexion'],
    difficulty: 'beginner',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Lie supine, knees bent. Curl shoulders toward pelvis without yanking the neck.',
    muscleMappings: [
      { muscleId: 'rectus_abdominis', role: 'primary', coefficient: 1.0, jointAction: 'trunk flexion', evidenceType: 'direct_emg', confidence: 'high', notes: 'Focuses upper portion of rectus abdominis.' },
      { muscleId: 'obliques', role: 'synergist', coefficient: 0.5, jointAction: 'trunk flexion assist', evidenceType: 'biomechanical_inference', confidence: 'moderate', notes: 'Assists anterior spinal curl.' }
    ]
  },
  {
    id: 'pushup_standard',
    name: 'Standard Push-up',
    category: 'push',
    movementPatterns: ['horizontal_push'],
    difficulty: 'beginner',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Plank position, hands just outside shoulder width. Lower chest to floor, elbows at ~45 degrees, press back to full lockout with protraction.',
    muscleMappings: [
      { muscleId: 'pectoralis_major_sternal', role: 'primary', coefficient: 1.0, jointAction: 'horizontal adduction', evidenceType: 'direct_emg', confidence: 'high', notes: 'Prime horizontal pusher.' },
      { muscleId: 'deltoid_anterior', role: 'synergist', coefficient: 0.5, jointAction: 'shoulder flexion', evidenceType: 'direct_emg', confidence: 'high', notes: 'Strong forward shoulder drive.' },
      { muscleId: 'triceps_brachii', role: 'synergist', coefficient: 0.5, jointAction: 'elbow extension', evidenceType: 'direct_emg', confidence: 'high', notes: 'Locks out arms at top of rep.' },
      { muscleId: 'serratus_anterior', role: 'synergist', coefficient: 0.5, jointAction: 'scapular protraction', evidenceType: 'direct_emg', confidence: 'high', notes: 'Peaks at the top "plus" position.' },
      { muscleId: 'rectus_abdominis', role: 'stabiliser', coefficient: 0.2, jointAction: 'anti-extension core brace', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Prevents lumbar sag.' }
    ]
  },
  {
    id: 'squat_bodyweight',
    name: 'Bodyweight Squats',
    category: 'legs',
    movementPatterns: ['squat'],
    difficulty: 'beginner',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Feet shoulder-width apart. Sit hips back and down below parallel, keeping chest proud and knees tracking over toes.',
    muscleMappings: [
      { muscleId: 'quadriceps', role: 'primary', coefficient: 1.0, jointAction: 'knee extension', evidenceType: 'direct_emg', confidence: 'high', notes: 'Primary knee extensor.' },
      { muscleId: 'gluteus_maximus', role: 'synergist', coefficient: 0.5, jointAction: 'hip extension', evidenceType: 'direct_emg', confidence: 'high', notes: 'Recruited strongly in deep hip flexion.' },
      { muscleId: 'hamstrings', role: 'stabiliser', coefficient: 0.2, jointAction: 'femur stabilisation', evidenceType: 'biomechanical_inference', confidence: 'moderate', notes: 'Co-contracts; does not experience large length change.' },
      { muscleId: 'gastrocnemius', role: 'stabiliser', coefficient: 0.2, jointAction: 'ankle stability', evidenceType: 'biomechanical_inference', confidence: 'moderate', notes: 'Assists ankle position.' }
    ]
  },

  // --- ROUND 2 ---
  {
    id: 'jumping_jacks',
    name: 'Jumping Jacks',
    category: 'cardio',
    movementPatterns: ['jump_sprint'],
    difficulty: 'beginner',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Jump feet out while clapping hands overhead, return briskly.',
    muscleMappings: [
      { muscleId: 'deltoid_lateral', role: 'synergist', coefficient: 0.5, jointAction: 'shoulder abduction', evidenceType: 'biomechanical_inference', confidence: 'moderate', notes: 'Arm sweep.' },
      { muscleId: 'gluteus_medius_minimus', role: 'synergist', coefficient: 0.5, jointAction: 'hip abduction', evidenceType: 'biomechanical_inference', confidence: 'moderate', notes: 'Lateral leg opening.' },
      { muscleId: 'gastrocnemius', role: 'primary', coefficient: 1.0, jointAction: 'ankle rebound', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Repetitive elastic impact.' }
    ]
  },
  {
    id: 'pullup_wide_grip',
    name: 'Wide-Grip Pull-ups',
    category: 'pull',
    movementPatterns: ['vertical_pull'],
    difficulty: 'intermediate',
    equipment: ['pull_up_bar'],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Grip bar 1.5x shoulder width. Pull elbows straight down toward ribs.',
    muscleMappings: [
      { muscleId: 'latissimus_dorsi', role: 'primary', coefficient: 1.0, jointAction: 'frontal plane shoulder adduction', evidenceType: 'direct_emg', confidence: 'high', notes: 'Frontal plane adduction emphasis.' },
      { muscleId: 'trapezius_mid_lower', role: 'synergist', coefficient: 0.5, jointAction: 'scapular retraction', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Strong scapular clamp.' },
      { muscleId: 'biceps_brachii', role: 'synergist', coefficient: 0.5, jointAction: 'elbow flexion', evidenceType: 'direct_emg', confidence: 'moderate', notes: 'Slightly reduced leverage compared to chin-up.' }
    ]
  },
  {
    id: 'v_ups',
    name: 'V-Ups',
    category: 'core',
    movementPatterns: ['trunk_flexion'],
    difficulty: 'intermediate',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Simultaneously lift straight legs and torso to meet hands at the top in a V-shape.',
    muscleMappings: [
      { muscleId: 'rectus_abdominis', role: 'primary', coefficient: 1.0, jointAction: 'simultaneous trunk & hip flexion', evidenceType: 'direct_emg', confidence: 'high', notes: 'Full-length abdominal recruitment.' },
      { muscleId: 'quadriceps', role: 'synergist', coefficient: 0.5, jointAction: 'hip flexion (rectus femoris)', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Hip flexor involvement holding legs extended.' }
    ]
  },
  {
    id: 'pushup_diamond',
    name: 'Diamond Push-ups',
    category: 'push',
    movementPatterns: ['horizontal_push'],
    difficulty: 'intermediate',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Index fingers and thumbs touching in diamond shape under center of chest. Lower elbows tucked along ribs.',
    muscleMappings: [
      { muscleId: 'triceps_brachii', role: 'primary', coefficient: 1.0, jointAction: 'elbow extension', evidenceType: 'direct_emg', confidence: 'high', notes: 'Very high triceps recruitment due to narrow base.' },
      { muscleId: 'pectoralis_major_sternal', role: 'synergist', coefficient: 0.5, jointAction: 'horizontal adduction', evidenceType: 'direct_emg', confidence: 'high', notes: 'Substantial sternocostal contraction.' },
      { muscleId: 'deltoid_anterior', role: 'synergist', coefficient: 0.5, jointAction: 'shoulder flexion', evidenceType: 'direct_emg', confidence: 'moderate', notes: 'Forward shoulder support.' }
    ]
  },
  {
    id: 'jump_squats',
    name: 'Jump Squats',
    category: 'legs',
    movementPatterns: ['squat', 'jump_sprint'],
    difficulty: 'intermediate',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Descend to parallel squat, explosively launch vertically, land softly absorbing into next rep.',
    muscleMappings: [
      { muscleId: 'quadriceps', role: 'primary', coefficient: 1.0, jointAction: 'explosive knee extension', evidenceType: 'direct_emg', confidence: 'high', notes: 'Triple extension drive.' },
      { muscleId: 'gluteus_maximus', role: 'primary', coefficient: 1.0, jointAction: 'explosive hip extension', evidenceType: 'direct_emg', confidence: 'high', notes: 'Maximum power takeoff.' },
      { muscleId: 'gastrocnemius', role: 'synergist', coefficient: 0.5, jointAction: 'plantarflexion burst', evidenceType: 'direct_emg', confidence: 'high', notes: 'Terminal ankle push.' }
    ]
  },

  // --- ROUND 3 ---
  {
    id: 'butt_kicks',
    name: 'Butt Kicks',
    category: 'cardio',
    movementPatterns: ['locomotion'],
    difficulty: 'beginner',
    equipment: [],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: 'Run in place kicking heels rapidly toward glutes.',
    muscleMappings: [
      { muscleId: 'hamstrings', role: 'primary', coefficient: 1.0, jointAction: 'rapid knee flexion', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Dynamic knee flexion cadence.' },
      { muscleId: 'quadriceps', role: 'synergist', coefficient: 0.5, jointAction: 'quadriceps dynamic stretch', evidenceType: 'biomechanical_inference', confidence: 'moderate', notes: 'Hip flexion transition.' }
    ]
  },
  {
    id: 'chin_ups',
    name: 'Chin-ups',
    category: 'pull',
    movementPatterns: ['vertical_pull'],
    difficulty: 'intermediate',
    equipment: ['pull_up_bar'],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Underhand (supinated) shoulder-width grip. Pull until chin is above bar.',
    muscleMappings: [
      { muscleId: 'biceps_brachii', role: 'primary', coefficient: 1.0, jointAction: 'elbow flexion in supination', evidenceType: 'direct_emg', confidence: 'high', notes: 'Supinated grip places biceps at optimal mechanical leverage.' },
      { muscleId: 'latissimus_dorsi', role: 'primary', coefficient: 1.0, jointAction: 'shoulder extension', evidenceType: 'direct_emg', confidence: 'high', notes: 'Sagittal plane vertical pull.' }
    ]
  },
  {
    id: 'leg_raises',
    name: 'Lying Leg Raises',
    category: 'core',
    movementPatterns: ['anti_extension'],
    difficulty: 'beginner',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Lie on back, keep lumbar spine flush against floor, raise straight legs to 90 degrees and lower slowly.',
    muscleMappings: [
      { muscleId: 'rectus_abdominis', role: 'primary', coefficient: 1.0, jointAction: 'posterior pelvic tilt & anti-extension', evidenceType: 'direct_emg', confidence: 'high', notes: 'Lower abdominal tension preventing anterior tilt.' }
    ]
  },
  {
    id: 'pushup_decline',
    name: 'Decline Push-ups',
    category: 'push',
    movementPatterns: ['horizontal_push'],
    difficulty: 'intermediate',
    equipment: ['stable_chair_or_bench'],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Elevate feet on bench or chair. Press body up, keeping torso in a straight line.',
    muscleMappings: [
      { muscleId: 'pectoralis_major_clavicular', role: 'primary', coefficient: 1.0, jointAction: 'shoulder flexion & adduction', evidenceType: 'direct_emg', confidence: 'high', notes: 'Elevated feet shift loading angle upward to clavicular fibers.' },
      { muscleId: 'deltoid_anterior', role: 'primary', coefficient: 1.0, jointAction: 'shoulder flexion support', evidenceType: 'direct_emg', confidence: 'high', notes: 'Increased load on anterior shoulder.' },
      { muscleId: 'triceps_brachii', role: 'synergist', coefficient: 0.5, jointAction: 'elbow extension', evidenceType: 'direct_emg', confidence: 'high', notes: 'Extension against higher bodyweight fraction (~74%).' }
    ]
  },
  {
    id: 'bulgarian_split_squats',
    name: 'Bulgarian Split Squats',
    category: 'legs',
    movementPatterns: ['lunge'],
    difficulty: 'intermediate',
    equipment: ['stable_chair_or_bench'],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: 'Rear foot elevated on bench. Lower front hip until front thigh is parallel, driving back up through front midfoot.',
    muscleMappings: [
      { muscleId: 'quadriceps', role: 'primary', coefficient: 1.0, jointAction: 'knee extension (lead leg)', evidenceType: 'direct_emg', confidence: 'high', notes: 'High single-leg mechanical tension.' },
      { muscleId: 'gluteus_maximus', role: 'primary', coefficient: 1.0, jointAction: 'hip extension (lead leg)', evidenceType: 'direct_emg', confidence: 'high', notes: 'Deep stretch at bottom of split stance.' },
      { muscleId: 'gluteus_medius_minimus', role: 'synergist', coefficient: 0.5, jointAction: 'unilateral pelvis stabilisation', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Resists lateral hip drop.' }
    ]
  },

  // --- ROUND 4 ---
  {
    id: 'mountain_climbers',
    name: 'Mountain Climbers',
    category: 'cardio',
    movementPatterns: ['locomotion', 'anti_extension'],
    difficulty: 'beginner',
    equipment: [],
    defaultUnit: 'seconds',
    unilateral: false,
    instructions: 'From high plank, alternate driving knees rapidly toward chest without bouncing hips.',
    muscleMappings: [
      { muscleId: 'rectus_abdominis', role: 'primary', coefficient: 1.0, jointAction: 'anti-extension brace', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Maintains flat spine during leg drive.' },
      { muscleId: 'deltoid_anterior', role: 'stabiliser', coefficient: 0.2, jointAction: 'plank isometric support', evidenceType: 'biomechanical_inference', confidence: 'moderate', notes: 'Holds upper body weight.' }
    ]
  },
  {
    id: 'pullup_archer',
    name: 'Archer Pull-ups',
    category: 'pull',
    movementPatterns: ['vertical_pull'],
    difficulty: 'advanced',
    equipment: ['pull_up_bar'],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: 'Wide grip. Pull body toward one hand while straightening the opposite arm along the bar like an archer.',
    prerequisites: ['pullup_wide_grip', 'pullup_standard'],
    regressions: ['assisted_archer_pullup'],
    progressions: ['one_arm_pullup'],
    safetyCautions: 'High unilateral tendon demand. Control range and do not yank at bottom.',
    muscleMappings: [
      { muscleId: 'latissimus_dorsi', role: 'primary', coefficient: 1.0, jointAction: 'heavy unilateral shoulder adduction', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Dominant side carries ~75-80% of body mass.' },
      { muscleId: 'biceps_brachii', role: 'primary', coefficient: 1.0, jointAction: 'unilateral elbow flexion', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Working arm sustains high flexion torque.' },
      { muscleId: 'obliques', role: 'synergist', coefficient: 0.5, jointAction: 'anti-rotation trunk brace', evidenceType: 'biomechanical_inference', confidence: 'moderate', notes: 'Prevents body twist on bar.' }
    ]
  },
  {
    id: 'bicycle_crunches',
    name: 'Bicycle Crunches',
    category: 'core',
    movementPatterns: ['anti_rotation', 'trunk_flexion'],
    difficulty: 'intermediate',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: 'Alternate bringing elbow toward opposite knee with slow controlled rotation and full leg extension.',
    muscleMappings: [
      { muscleId: 'obliques', role: 'primary', coefficient: 1.0, jointAction: 'axial trunk rotation', evidenceType: 'direct_emg', confidence: 'high', notes: 'Consistently one of the highest EMG ratings for obliques.' },
      { muscleId: 'rectus_abdominis', role: 'primary', coefficient: 1.0, jointAction: 'trunk flexion', evidenceType: 'direct_emg', confidence: 'high', notes: 'Maintains constant anterior tension.' }
    ]
  },
  {
    id: 'pushup_archer',
    name: 'Archer Push-ups',
    category: 'push',
    movementPatterns: ['horizontal_push'],
    difficulty: 'advanced',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: 'Wide hand stance. Shift chest over one working hand while extending the opposite arm straight out to the side.',
    prerequisites: ['pushup_standard', 'pushup_wide'],
    regressions: ['pushup_staggered'],
    progressions: ['one_arm_pushup'],
    muscleMappings: [
      { muscleId: 'pectoralis_major_sternal', role: 'primary', coefficient: 1.0, jointAction: 'unilateral horizontal adduction', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Loads single chest side with up to ~80% body push weight.' },
      { muscleId: 'triceps_brachii', role: 'primary', coefficient: 1.0, jointAction: 'unilateral elbow extension', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Working side arm extension.' },
      { muscleId: 'deltoid_anterior', role: 'synergist', coefficient: 0.5, jointAction: 'shoulder flexion', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Stabilises loaded shoulder.' }
    ]
  },
  {
    id: 'jumping_lunges',
    name: 'Jumping Lunges',
    category: 'legs',
    movementPatterns: ['lunge', 'jump_sprint'],
    difficulty: 'intermediate',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: 'From lunge, explode vertically, switch legs mid-air and absorb smoothly into opposite lunge.',
    muscleMappings: [
      { muscleId: 'quadriceps', role: 'primary', coefficient: 1.0, jointAction: 'explosive knee extension & deceleration', evidenceType: 'direct_emg', confidence: 'high', notes: 'High eccentric deceleration load.' },
      { muscleId: 'gluteus_maximus', role: 'primary', coefficient: 1.0, jointAction: 'explosive hip extension', evidenceType: 'direct_emg', confidence: 'high', notes: 'Hip extension thrust.' }
    ]
  },
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'cardio',
    movementPatterns: ['jump_sprint', 'horizontal_push', 'squat'],
    difficulty: 'intermediate',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Drop into squat thrust, perform push-up, jump feet forward and explode vertically clapping overhead.',
    muscleMappings: [
      { muscleId: 'quadriceps', role: 'primary', coefficient: 1.0, jointAction: 'squat and jump thrust', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Repeated lower body cycles.' },
      { muscleId: 'pectoralis_major_sternal', role: 'synergist', coefficient: 0.5, jointAction: 'push-up adduction', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Floor push component.' }
    ]
  },
  {
    id: 'pullup_commando',
    name: 'Commando Pull-ups',
    category: 'pull',
    movementPatterns: ['vertical_pull'],
    difficulty: 'intermediate',
    equipment: ['pull_up_bar'],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: 'Stand under bar sideways, hands aligned front-to-back in neutral grip. Alternate pulling head to left and right sides.',
    muscleMappings: [
      { muscleId: 'latissimus_dorsi', role: 'primary', coefficient: 1.0, jointAction: 'sagittal shoulder extension', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Strong neutral grip lat recruitment.' },
      { muscleId: 'biceps_brachii', role: 'synergist', coefficient: 0.5, jointAction: 'brachioradialis & biceps flexion', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Neutral grip targets brachioradialis.' }
    ]
  },
  {
    id: 'pushup_clap',
    name: 'Explosive / Clap Push-ups',
    category: 'push',
    movementPatterns: ['horizontal_push'],
    difficulty: 'advanced',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Lower with control, press up with maximum force to propel hands off floor and clap before landing softly.',
    safetyCautions: 'Requires strong wrist tolerance and solid base of standard push-ups.',
    muscleMappings: [
      { muscleId: 'pectoralis_major_sternal', role: 'primary', coefficient: 1.0, jointAction: 'maximum velocity horizontal adduction', evidenceType: 'direct_emg', confidence: 'high', notes: 'High motor unit rate coding.' },
      { muscleId: 'triceps_brachii', role: 'primary', coefficient: 1.0, jointAction: 'explosive elbow extension', evidenceType: 'direct_emg', confidence: 'high', notes: 'Rapid power lockout.' }
    ]
  },
  {
    id: 'pushup_pike',
    name: 'Pike Push-ups',
    category: 'push',
    movementPatterns: ['vertical_push'],
    difficulty: 'intermediate',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Hips held high in downward dog / inverted V. Lower forehead forward toward floor creating a tripod, press back up.',
    muscleMappings: [
      { muscleId: 'deltoid_anterior', role: 'primary', coefficient: 1.0, jointAction: 'overhead vertical push', evidenceType: 'direct_emg', confidence: 'high', notes: 'Vertical pressing angle targets anterior deltoids.' },
      { muscleId: 'deltoid_lateral', role: 'synergist', coefficient: 0.5, jointAction: 'shoulder abduction support', evidenceType: 'biomechanical_inference', confidence: 'moderate', notes: 'Higher than standard flat push-up.' },
      { muscleId: 'triceps_brachii', role: 'synergist', coefficient: 0.5, jointAction: 'overhead elbow extension', evidenceType: 'direct_emg', confidence: 'high', notes: 'Presses bodyweight vertically.' },
      { muscleId: 'trapezius_upper', role: 'synergist', coefficient: 0.5, jointAction: 'scapular upward rotation', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Holds scapula in overhead position.' }
    ]
  },
  {
    id: 'pushup_pseudo_planche',
    name: 'Pseudo-Planche Push-ups',
    category: 'push',
    movementPatterns: ['horizontal_push'],
    difficulty: 'advanced',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Hands turned slightly outward by waist level. Lean torso far forward over wrists throughout entire movement.',
    muscleMappings: [
      { muscleId: 'deltoid_anterior', role: 'primary', coefficient: 1.0, jointAction: 'extreme shoulder flexion torque', evidenceType: 'direct_emg', confidence: 'high', notes: 'Massive anterior lever arm demand.' },
      { muscleId: 'pectoralis_major_clavicular', role: 'primary', coefficient: 1.0, jointAction: 'clavicular chest tension', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Clavicular adduction.' },
      { muscleId: 'serratus_anterior', role: 'primary', coefficient: 1.0, jointAction: 'protraction clamp', evidenceType: 'direct_emg', confidence: 'high', notes: 'Maintains planche hollow body.' }
    ]
  },
  {
    id: 'inverted_rows_elevated',
    name: 'Inverted Body Rows (Feet Elevated)',
    category: 'pull',
    movementPatterns: ['horizontal_pull'],
    difficulty: 'intermediate',
    equipment: ['pull_up_bar_low_or_rings'],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Feet elevated on chair, body horizontal under low bar. Pull chest to bar squeezing shoulder blades together.',
    muscleMappings: [
      { muscleId: 'rhomboids', role: 'primary', coefficient: 1.0, jointAction: 'scapular retraction', evidenceType: 'direct_emg', confidence: 'high', notes: 'Direct horizontal retraction.' },
      { muscleId: 'trapezius_mid_lower', role: 'primary', coefficient: 1.0, jointAction: 'scapular retraction & depression', evidenceType: 'direct_emg', confidence: 'high', notes: 'Counteracts desk posture.' },
      { muscleId: 'latissimus_dorsi', role: 'synergist', coefficient: 0.5, jointAction: 'shoulder extension', evidenceType: 'direct_emg', confidence: 'high', notes: 'Pulls elbows behind torso.' },
      { muscleId: 'deltoid_posterior', role: 'synergist', coefficient: 0.5, jointAction: 'horizontal abduction', evidenceType: 'direct_emg', confidence: 'high', notes: 'Rear shoulder horizontal pull.' }
    ]
  },
  {
    id: 'reverse_nordic_curl',
    name: 'Reverse Nordic Curl',
    category: 'legs',
    movementPatterns: ['squat'],
    difficulty: 'advanced',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Kneel tall on padded floor, hips locked in full extension. Lean torso straight backwards using quads to resist gravity.',
    safetyCautions: 'High patellar tendon tension. Progress range of motion cautiously.',
    muscleMappings: [
      { muscleId: 'quadriceps', role: 'primary', coefficient: 1.0, jointAction: 'eccentric knee extension at long muscle length', evidenceType: 'direct_emg', confidence: 'high', notes: 'Particularly overloads rectus femoris in stretched position.' },
      { muscleId: 'rectus_abdominis', role: 'synergist', coefficient: 0.5, jointAction: 'anti-extension pelvic lock', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Prevents lumbar hyperextension.' }
    ]
  },
  {
    id: 'tibialis_raises',
    name: 'Tibialis Raises',
    category: 'legs',
    movementPatterns: ['accessory_isolation'],
    difficulty: 'beginner',
    equipment: ['wall'],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Lean butt against wall, heels 12-18 inches forward. Flex toes and forefeet upward as high as possible, pause, lower.',
    muscleMappings: [
      { muscleId: 'tibialis_anterior', role: 'primary', coefficient: 1.0, jointAction: 'isolated ankle dorsiflexion', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Direct isolated shin stimulus.' }
    ]
  },
  {
    id: 'prone_y_raises',
    name: 'Prone Y Raises',
    category: 'accessory',
    movementPatterns: ['accessory_isolation'],
    difficulty: 'beginner',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Lie prone, arms at 45-degree angle in a Y shape with thumbs pointing up. Lift arms using lower shoulder blades without shrugging.',
    muscleMappings: [
      { muscleId: 'trapezius_mid_lower', role: 'primary', coefficient: 1.0, jointAction: 'scapular upward rotation & depression', evidenceType: 'direct_emg', confidence: 'high', notes: 'Direct lower trapezius recruitment.' },
      { muscleId: 'deltoid_posterior', role: 'synergist', coefficient: 0.5, jointAction: 'shoulder extension assist', evidenceType: 'biomechanical_inference', confidence: 'moderate', notes: 'Rear shoulder assistance.' }
    ]
  },
  {
    id: 'prone_t_raises',
    name: 'Prone T Raises',
    category: 'accessory',
    movementPatterns: ['accessory_isolation'],
    difficulty: 'beginner',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Lie prone, arms straight out to sides forming a T with thumbs up. Retract scapulae and lift arms horizontally.',
    muscleMappings: [
      { muscleId: 'deltoid_posterior', role: 'primary', coefficient: 1.0, jointAction: 'horizontal shoulder abduction', evidenceType: 'direct_emg', confidence: 'high', notes: 'Isolated rear deltoid work.' },
      { muscleId: 'rhomboids', role: 'primary', coefficient: 1.0, jointAction: 'scapular retraction', evidenceType: 'direct_emg', confidence: 'high', notes: 'Direct middle back squeeze.' },
      { muscleId: 'trapezius_mid_lower', role: 'synergist', coefficient: 0.5, jointAction: 'scapular retraction', evidenceType: 'direct_emg', confidence: 'high', notes: 'Mid trapezius activation.' }
    ]
  },
  {
    id: 'prone_w_raises',
    name: 'Prone W Raises',
    category: 'accessory',
    movementPatterns: ['accessory_isolation'],
    difficulty: 'beginner',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'Lie prone, elbows bent by ribs forming a W shape. Lift hands and elbows rotating shoulders backward.',
    muscleMappings: [
      { muscleId: 'rotator_cuff', role: 'primary', coefficient: 1.0, jointAction: 'shoulder external rotation', evidenceType: 'direct_emg', confidence: 'high', notes: 'Infraspinatus & teres minor loading.' },
      { muscleId: 'deltoid_posterior', role: 'synergist', coefficient: 0.5, jointAction: 'external rotation assist', evidenceType: 'biomechanical_inference', confidence: 'moderate', notes: 'Rear shoulder contribution.' }
    ]
  },
  {
    id: 'bird_dog',
    name: 'Bird Dog',
    category: 'accessory',
    movementPatterns: ['anti_rotation'],
    difficulty: 'beginner',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: true,
    instructions: 'On hands and knees, slowly reach opposite arm and leg straight out without allowing spine to rotate or sag.',
    muscleMappings: [
      { muscleId: 'erector_spinae', role: 'primary', coefficient: 1.0, jointAction: 'contralateral spinal stabilization', evidenceType: 'direct_emg', confidence: 'high', notes: 'Multifidus and erector recruitment with minimal spinal compression.' },
      { muscleId: 'gluteus_maximus', role: 'synergist', coefficient: 0.5, jointAction: 'hip extension', evidenceType: 'direct_emg', confidence: 'high', notes: 'Holds straight leg extended.' }
    ]
  },
  {
    id: 'side_plank',
    name: 'Side Plank',
    category: 'core',
    movementPatterns: ['lateral_flexion'],
    difficulty: 'intermediate',
    equipment: [],
    defaultUnit: 'seconds',
    unilateral: true,
    instructions: 'Rest on forearm and side of feet, maintaining a straight diagonal line from head to heels.',
    muscleMappings: [
      { muscleId: 'obliques', role: 'primary', coefficient: 1.0, jointAction: 'anti-lateral flexion', evidenceType: 'direct_emg', confidence: 'high', notes: 'High lateral abdominal wall challenge.' },
      { muscleId: 'gluteus_medius_minimus', role: 'synergist', coefficient: 0.5, jointAction: 'hip abduction support', evidenceType: 'direct_emg', confidence: 'high', notes: 'Downside hip stabilizer.' }
    ]
  },
  {
    id: 'scapular_pushups',
    name: 'Scapular Push-ups',
    category: 'accessory',
    movementPatterns: ['horizontal_push'],
    difficulty: 'beginner',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'In high plank with arms locked straight, let shoulder blades retract together, then push floor away protracting blades.',
    muscleMappings: [
      { muscleId: 'serratus_anterior', role: 'primary', coefficient: 1.0, jointAction: 'isolated scapular protraction', evidenceType: 'direct_emg', confidence: 'high', notes: 'Gold-standard serratus activation drill.' }
    ]
  },
  {
    id: 'hamstring_walkouts',
    name: 'Hamstring Walkouts',
    category: 'accessory',
    movementPatterns: ['hip_hinge'],
    difficulty: 'intermediate',
    equipment: [],
    defaultUnit: 'reps',
    unilateral: false,
    instructions: 'From glute bridge, take small steps with heels outward until knees are nearly straight, hold 1 sec, walk back in.',
    muscleMappings: [
      { muscleId: 'hamstrings', role: 'primary', coefficient: 1.0, jointAction: 'eccentric knee flexion & hip extension', evidenceType: 'direct_emg', confidence: 'high', notes: 'Direct bodyweight knee-flexor loading without machines.' },
      { muscleId: 'gluteus_maximus', role: 'synergist', coefficient: 0.5, jointAction: 'hip extension maintainer', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Keeps hips elevated.' }
    ]
  },
  {
    id: 'copenhagen_plank',
    name: 'Copenhagen Plank',
    category: 'accessory',
    movementPatterns: ['lateral_flexion'],
    difficulty: 'advanced',
    equipment: ['stable_chair_or_bench'],
    defaultUnit: 'seconds',
    unilateral: true,
    instructions: 'Side plank with top leg resting on bench, bottom leg hovered underneath. Hold hips elevated.',
    safetyCautions: 'Intense adductor tendon load. Begin with knee on bench before ankle.',
    muscleMappings: [
      { muscleId: 'hip_adductors', role: 'primary', coefficient: 1.0, jointAction: 'isometric top-leg hip adduction', evidenceType: 'direct_emg', confidence: 'high', notes: 'Highest evidence-backed bodyweight adductor exercise.' },
      { muscleId: 'obliques', role: 'synergist', coefficient: 0.5, jointAction: 'lateral core stability', evidenceType: 'biomechanical_inference', confidence: 'high', notes: 'Maintains pelvic alignment.' }
    ]
  }
];
