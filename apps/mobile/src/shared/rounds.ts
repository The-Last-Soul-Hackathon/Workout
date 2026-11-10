import { RoundTemplate } from './domain';

export const canonicalRounds: RoundTemplate[] = [
  {
    id: 'round_01',
    roundNumber: 1,
    name: 'Round 1 — Foundation Circuit',
    type: 'strength_conditioning',
    description: 'Fundamental bodyweight baseline: jumping, standard pull-ups, crunches, standard push-ups, bodyweight squats.',
    exercises: [
      { exerciseId: 'jumping_standard', category: 'cardio', sequence: 1, defaultValue: 45, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'pullup_standard', category: 'pull', sequence: 2, defaultValue: 3, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'crunches_standard', category: 'core', sequence: 3, defaultValue: 6, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'pushup_standard', category: 'push', sequence: 4, defaultValue: 5, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'squat_bodyweight', category: 'legs', sequence: 5, defaultValue: 6, unit: 'reps', sideRule: 'bilateral' }
    ]
  },
  {
    id: 'round_02',
    roundNumber: 2,
    name: 'Round 2 — Wide & Explosive',
    type: 'strength_conditioning',
    description: 'Jumping jacks, wide-grip pull-ups, V-ups, diamond push-ups, jump squats.',
    exercises: [
      { exerciseId: 'jumping_jacks', category: 'cardio', sequence: 1, defaultValue: 15, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'pullup_wide_grip', category: 'pull', sequence: 2, defaultValue: 2, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'v_ups', category: 'core', sequence: 3, defaultValue: 6, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'pushup_diamond', category: 'push', sequence: 4, defaultValue: 4, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'jump_squats', category: 'legs', sequence: 5, defaultValue: 6, unit: 'reps', sideRule: 'bilateral' }
    ]
  },
  {
    id: 'round_03',
    roundNumber: 3,
    name: 'Round 3 — Elevation & Unilateral Base',
    type: 'strength_conditioning',
    description: 'Butt kicks, chin-ups, lying leg raises, decline push-ups, Bulgarian split squats.',
    exercises: [
      { exerciseId: 'butt_kicks', category: 'cardio', sequence: 1, defaultValue: 15, unit: 'seconds', sideRule: 'bilateral' },
      { exerciseId: 'chin_ups', category: 'pull', sequence: 2, defaultValue: 2, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'leg_raises', category: 'core', sequence: 3, defaultValue: 6, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'pushup_decline', category: 'push', sequence: 4, defaultValue: 4, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'bulgarian_split_squats', category: 'legs', sequence: 5, defaultValue: 6, unit: 'reps', sideRule: 'each_side' }
    ]
  },
  {
    id: 'round_04',
    roundNumber: 4,
    name: 'Round 4 — Archer & Rotational Control',
    type: 'strength_conditioning',
    description: 'Mountain climbers, archer pull-ups, bicycle crunches, archer push-ups, jumping lunges.',
    exercises: [
      { exerciseId: 'mountain_climbers', category: 'cardio', sequence: 1, defaultValue: 15, unit: 'seconds', sideRule: 'bilateral' },
      { exerciseId: 'pullup_archer', category: 'pull', sequence: 2, defaultValue: 2, unit: 'reps', sideRule: 'each_side' },
      { exerciseId: 'bicycle_crunches', category: 'core', sequence: 3, defaultValue: 6, unit: 'reps', sideRule: 'each_side' },
      { exerciseId: 'pushup_archer', category: 'push', sequence: 4, defaultValue: 3, unit: 'reps', sideRule: 'each_side' },
      { exerciseId: 'jumping_lunges', category: 'legs', sequence: 5, defaultValue: 6, unit: 'reps', sideRule: 'each_side' }
    ]
  },
  {
    id: 'round_05',
    roundNumber: 5,
    name: 'Round 5 — Power & Commando Grip',
    type: 'strength_conditioning',
    description: 'Burpees, commando pull-ups, reverse crunches, explosive clap push-ups, skater jumps.',
    exercises: [
      { exerciseId: 'burpees', category: 'cardio', sequence: 1, defaultValue: 6, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'pullup_commando', category: 'pull', sequence: 2, defaultValue: 3, unit: 'reps', sideRule: 'each_side' },
      { exerciseId: 'crunches_standard', category: 'core', sequence: 3, defaultValue: 6, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'pushup_clap', category: 'push', sequence: 4, defaultValue: 4, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'jumping_lunges', category: 'legs', sequence: 5, defaultValue: 6, unit: 'reps', sideRule: 'each_side' }
    ]
  },
  {
    id: 'round_16',
    roundNumber: 16,
    name: 'Round 16 — Planche & Inverted Rows',
    type: 'strength_conditioning',
    description: 'Plank jump-ins, inverted body rows (feet elevated), seated in-and-outs, pseudo-planche push-ups, duck walk.',
    exercises: [
      { exerciseId: 'mountain_climbers', category: 'cardio', sequence: 1, defaultValue: 10, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'inverted_rows_elevated', category: 'pull', sequence: 2, defaultValue: 4, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'v_ups', category: 'core', sequence: 3, defaultValue: 6, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'pushup_pseudo_planche', category: 'push', sequence: 4, defaultValue: 4, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'squat_bodyweight', category: 'legs', sequence: 5, defaultValue: 10, unit: 'meters', sideRule: 'bilateral' }
    ]
  },
  {
    id: 'round_17',
    roundNumber: 17,
    name: 'Round 17 — Pike Overhead & Scapular Control',
    type: 'strength_conditioning',
    description: 'Sprint stair climbs, scapular pull-ups, boat hold, pike push-ups, calf jumps.',
    exercises: [
      { exerciseId: 'jumping_standard', category: 'cardio', sequence: 1, defaultValue: 4, unit: 'flights', sideRule: 'bilateral' },
      { exerciseId: 'pullup_standard', category: 'pull', sequence: 2, defaultValue: 5, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'v_ups', category: 'core', sequence: 3, defaultValue: 12, unit: 'seconds', sideRule: 'bilateral' },
      { exerciseId: 'pushup_pike', category: 'push', sequence: 4, defaultValue: 4, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'jumping_standard', category: 'legs', sequence: 5, defaultValue: 6, unit: 'reps', sideRule: 'bilateral' }
    ]
  },
  {
    id: 'round_18',
    roundNumber: 18,
    name: 'Round 18 — Nordic Eccentric & Core Compression',
    type: 'strength_conditioning',
    description: 'Footfire drills, wide to close pull-ups, toes-to-bar, decline clap push-ups, reverse Nordic curls.',
    exercises: [
      { exerciseId: 'butt_kicks', category: 'cardio', sequence: 1, defaultValue: 15, unit: 'seconds', sideRule: 'bilateral' },
      { exerciseId: 'pullup_standard', category: 'pull', sequence: 2, defaultValue: 3, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'leg_raises', category: 'core', sequence: 3, defaultValue: 6, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'pushup_decline', category: 'push', sequence: 4, defaultValue: 4, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'reverse_nordic_curl', category: 'legs', sequence: 5, defaultValue: 6, unit: 'reps', sideRule: 'bilateral' }
    ]
  },
  {
    id: 'round_26',
    roundNumber: 26,
    name: 'Round 26 — Accessory Muscle Balance',
    type: 'accessory_balance',
    description: 'Proposed targeted collection for scapular rotators, deep core, hamstrings, tibialis, and hip adductors.',
    exercises: [
      { exerciseId: 'prone_y_raises', category: 'accessory', sequence: 1, defaultValue: 10, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'prone_t_raises', category: 'accessory', sequence: 2, defaultValue: 10, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'prone_w_raises', category: 'accessory', sequence: 3, defaultValue: 10, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'hamstring_walkouts', category: 'accessory', sequence: 4, defaultValue: 8, unit: 'reps', sideRule: 'bilateral' },
      { exerciseId: 'copenhagen_plank', category: 'accessory', sequence: 5, defaultValue: 20, unit: 'seconds', sideRule: 'each_side' },
      { exerciseId: 'tibialis_raises', category: 'accessory', sequence: 6, defaultValue: 15, unit: 'reps', sideRule: 'bilateral' }
    ]
  }
];
