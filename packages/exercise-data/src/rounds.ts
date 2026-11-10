import { RoundTemplate } from '@muscle-intelligence/domain';

/**
 * Canonical Round Templates (Rounds 1 - 26)
 * Covers Rounds 1-22 (Strength & Conditioning), Rounds 23-25 (Mobility Flows), and Round 26 (Accessory Balance).
 */
export const canonicalRounds: RoundTemplate[] = [
  {
    id: 'round_01',
    roundNumber: 1,
    name: "Round 1 \u2014 Foundation Circuit",
    type: 'strength_conditioning',
    description: "Fundamental bodyweight baseline: jumping, standard pull-ups, crunches, standard push-ups, bodyweight squats.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'jumping_standard',
        category: 'cardio',
        sequence: 1,
        defaultValue: 45,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pullup_standard',
        category: 'pull',
        sequence: 2,
        defaultValue: 3,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'crunches_standard',
        category: 'core',
        sequence: 3,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pushup_standard',
        category: 'push',
        sequence: 4,
        defaultValue: 5,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'squat_bodyweight',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
    ]
  },
  {
    id: 'round_02',
    roundNumber: 2,
    name: "Round 2 \u2014 Wide & Explosive",
    type: 'strength_conditioning',
    description: "Jumping jacks, wide-grip pull-ups, V-ups, diamond push-ups, jump squats.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'jumping_jacks',
        category: 'cardio',
        sequence: 1,
        defaultValue: 15,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pullup_wide_grip',
        category: 'pull',
        sequence: 2,
        defaultValue: 2,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'v_ups',
        category: 'core',
        sequence: 3,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pushup_diamond',
        category: 'push',
        sequence: 4,
        defaultValue: 4,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'jump_squats',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
    ]
  },
  {
    id: 'round_03',
    roundNumber: 3,
    name: "Round 3 \u2014 Elevation & Unilateral Base",
    type: 'strength_conditioning',
    description: "Butt kicks, chin-ups, lying leg raises, decline push-ups, Bulgarian split squats.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'butt_kicks',
        category: 'cardio',
        sequence: 1,
        defaultValue: 15,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'chin_ups',
        category: 'pull',
        sequence: 2,
        defaultValue: 2,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'leg_raises',
        category: 'core',
        sequence: 3,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pushup_decline',
        category: 'push',
        sequence: 4,
        defaultValue: 4,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'bulgarian_split_squats',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
    ]
  },
  {
    id: 'round_04',
    roundNumber: 4,
    name: "Round 4 \u2014 Archer & Rotational Control",
    type: 'strength_conditioning',
    description: "Mountain climbers, archer pull-ups, bicycle crunches, archer push-ups, jumping lunges.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'mountain_climbers',
        category: 'cardio',
        sequence: 1,
        defaultValue: 15,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pullup_archer',
        category: 'pull',
        sequence: 2,
        defaultValue: 2,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'bicycle_crunches',
        category: 'core',
        sequence: 3,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'pushup_archer',
        category: 'push',
        sequence: 4,
        defaultValue: 3,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'jumping_lunges',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
    ]
  },
  {
    id: 'round_05',
    roundNumber: 5,
    name: "Round 5 \u2014 Power & Commando Grip",
    type: 'strength_conditioning',
    description: "Burpees, commando pull-ups, reverse crunches, explosive clap push-ups, skater jumps.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'burpees',
        category: 'cardio',
        sequence: 1,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pullup_commando',
        category: 'pull',
        sequence: 2,
        defaultValue: 3,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'reverse_crunches',
        category: 'core',
        sequence: 3,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pushup_clap',
        category: 'push',
        sequence: 4,
        defaultValue: 4,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'skater_jumps',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
    ]
  },
  {
    id: 'round_06',
    roundNumber: 6,
    name: "Round 6 \u2014 Agility & Wide Leverage",
    type: 'strength_conditioning',
    description: "Shuttle runs, close-grip pull-ups, Russian twists, wide push-ups, step-ups.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'shuttle_runs',
        category: 'cardio',
        sequence: 1,
        defaultValue: 60,
        unit: 'meters',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pullup_close_grip',
        category: 'pull',
        sequence: 2,
        defaultValue: 3,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'russian_twists',
        category: 'core',
        sequence: 3,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'pushup_wide',
        category: 'push',
        sequence: 4,
        defaultValue: 5,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'step_ups',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
    ]
  },
  {
    id: 'round_07',
    roundNumber: 7,
    name: "Round 7 \u2014 Staggered Pushing & L-Sit Pull",
    type: 'strength_conditioning',
    description: "High knees, L-sit pull-ups, plank-to-push-up, staggered push-ups, calf raises.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'high_knees',
        category: 'cardio',
        sequence: 1,
        defaultValue: 15,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pullup_l_sit',
        category: 'pull',
        sequence: 2,
        defaultValue: 2,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'plank_to_pushup',
        category: 'core',
        sequence: 3,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pushup_staggered',
        category: 'push',
        sequence: 4,
        defaultValue: 4,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'calf_raises',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
    ]
  },
  {
    id: 'round_08',
    roundNumber: 8,
    name: "Round 8 \u2014 Broad Jumps & Around the World",
    type: 'strength_conditioning',
    description: "Broad jumps, around-the-world pull-ups, flutter kicks, plyometric push-ups, assisted pistol squats.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'broad_jumps',
        category: 'cardio',
        sequence: 1,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pullup_around_the_world',
        category: 'pull',
        sequence: 2,
        defaultValue: 2,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'flutter_kicks',
        category: 'core',
        sequence: 3,
        defaultValue: 15,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pushup_plyometric',
        category: 'push',
        sequence: 4,
        defaultValue: 4,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'assisted_pistol_squats',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
    ]
  },
  {
    id: 'round_09',
    roundNumber: 9,
    name: "Round 9 \u2014 Jump Rope & Cobra Push",
    type: 'strength_conditioning',
    description: "Jump rope, one-arm assisted pull-ups, hanging knee raises, cobra push-ups, glute bridges.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'jump_rope',
        category: 'cardio',
        sequence: 1,
        defaultValue: 15,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pullup_one_arm_assisted',
        category: 'pull',
        sequence: 2,
        defaultValue: 3,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'hanging_knee_raises',
        category: 'core',
        sequence: 3,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pushup_cobra',
        category: 'push',
        sequence: 4,
        defaultValue: 5,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'glute_bridges',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
    ]
  },
  {
    id: 'round_10',
    roundNumber: 10,
    name: "Round 10 \u2014 Suicides & Typewriter Pull",
    type: 'strength_conditioning',
    description: "Suicide runs, typewriter pull-ups, windshield wipers, slow-motion push-ups, lateral lunges.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'suicide_runs',
        category: 'cardio',
        sequence: 1,
        defaultValue: 30,
        unit: 'meters',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pullup_typewriter',
        category: 'pull',
        sequence: 2,
        defaultValue: 2,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'windshield_wipers',
        category: 'core',
        sequence: 3,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'pushup_slow_motion',
        category: 'push',
        sequence: 4,
        defaultValue: 4,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'lateral_lunges',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
    ]
  },
  {
    id: 'round_11',
    roundNumber: 11,
    name: "Round 11 \u2014 Bear Crawl & Spiderman Push",
    type: 'strength_conditioning',
    description: "Bear crawl, explosive pull-ups, dead bug, Spiderman push-ups, reverse lunge to knee drive.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'bear_crawl',
        category: 'cardio',
        sequence: 1,
        defaultValue: 15,
        unit: 'meters',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pullup_explosive',
        category: 'pull',
        sequence: 2,
        defaultValue: 2,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'dead_bug',
        category: 'core',
        sequence: 3,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'pushup_spiderman',
        category: 'push',
        sequence: 4,
        defaultValue: 4,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'reverse_lunge_knee_drive',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
    ]
  },
  {
    id: 'round_12',
    roundNumber: 12,
    name: "Round 12 \u2014 Behind Neck & Deep Stretch",
    type: 'strength_conditioning',
    description: "Ladder drills, behind-the-neck pull-ups, hollow body hold, deep stretch push-ups, sumo squats.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'ladder_drills',
        category: 'cardio',
        sequence: 1,
        defaultValue: 15,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pullup_behind_the_neck',
        category: 'pull',
        sequence: 2,
        defaultValue: 2,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'hollow_body_hold',
        category: 'core',
        sequence: 3,
        defaultValue: 10,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pushup_deep_stretch',
        category: 'push',
        sequence: 4,
        defaultValue: 4,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'sumo_squats',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
    ]
  },
  {
    id: 'round_13',
    roundNumber: 13,
    name: "Round 13 \u2014 Aztec Push & Mixed Grip",
    type: 'strength_conditioning',
    description: "Agility ladder hops, mixed-grip pull-ups, side plank raises, Aztec push-ups, wall sit.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'agility_ladder_hops',
        category: 'cardio',
        sequence: 1,
        defaultValue: 15,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pullup_mixed_grip',
        category: 'pull',
        sequence: 2,
        defaultValue: 3,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'side_plank_raises',
        category: 'core',
        sequence: 3,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'pushup_aztec',
        category: 'push',
        sequence: 4,
        defaultValue: 3,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'wall_sit',
        category: 'legs',
        sequence: 5,
        defaultValue: 10,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
    ]
  },
  {
    id: 'round_14',
    roundNumber: 14,
    name: "Round 14 \u2014 Hindu Push & Ice Cream Maker",
    type: 'strength_conditioning',
    description: "Burpee broad jumps, ice cream maker pull-ups, superman hold, Hindu push-ups, Cossack squats.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'burpee_broad_jumps',
        category: 'cardio',
        sequence: 1,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pullup_ice_cream_maker',
        category: 'pull',
        sequence: 2,
        defaultValue: 2,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'superman_hold',
        category: 'core',
        sequence: 3,
        defaultValue: 10,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pushup_hindu',
        category: 'push',
        sequence: 4,
        defaultValue: 4,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'cossack_squats',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
    ]
  },
  {
    id: 'round_15',
    roundNumber: 15,
    name: "Round 15 \u2014 Fingertip Push & Towel Rows",
    type: 'strength_conditioning',
    description: "Sprint-jump-sprint, towel rows (under door), alternating heel touches, fingertip push-ups, single-leg glute bridge.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'sprint_jump_sprint',
        category: 'cardio',
        sequence: 1,
        defaultValue: 3,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'towel_rows',
        category: 'pull',
        sequence: 2,
        defaultValue: 4,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'alternating_heel_touches',
        category: 'core',
        sequence: 3,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'pushup_fingertip',
        category: 'push',
        sequence: 4,
        defaultValue: 4,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'single_leg_glute_bridge',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
    ]
  },
  {
    id: 'round_16',
    roundNumber: 16,
    name: "Round 16 \u2014 Planche & Inverted Rows",
    type: 'strength_conditioning',
    description: "Plank jump-ins, inverted body rows (feet elevated), seated in-and-outs, pseudo-planche push-ups, duck walk.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'plank_jump_ins',
        category: 'cardio',
        sequence: 1,
        defaultValue: 10,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'inverted_rows_elevated',
        category: 'pull',
        sequence: 2,
        defaultValue: 4,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'seated_in_and_outs',
        category: 'core',
        sequence: 3,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pushup_pseudo_planche',
        category: 'push',
        sequence: 4,
        defaultValue: 4,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'duck_walk',
        category: 'legs',
        sequence: 5,
        defaultValue: 10,
        unit: 'meters',
        sideRule: 'bilateral'
      },
    ]
  },
  {
    id: 'round_17',
    roundNumber: 17,
    name: "Round 17 \u2014 Pike Overhead & Scapular Control",
    type: 'strength_conditioning',
    description: "Sprint stair climbs, scapular pull-ups, boat hold, pike push-ups, calf jumps.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'sprint_stair_climbs',
        category: 'cardio',
        sequence: 1,
        defaultValue: 4,
        unit: 'flights',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pullup_scapular',
        category: 'pull',
        sequence: 2,
        defaultValue: 5,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'boat_hold',
        category: 'core',
        sequence: 3,
        defaultValue: 12,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pushup_pike',
        category: 'push',
        sequence: 4,
        defaultValue: 4,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'calf_jumps',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
    ]
  },
  {
    id: 'round_18',
    roundNumber: 18,
    name: "Round 18 \u2014 Nordic Eccentric & Core Compression",
    type: 'strength_conditioning',
    description: "Footfire drills, wide to close pull-ups, toes-to-bar, decline clap push-ups, reverse Nordic curls.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'footfire_drills',
        category: 'cardio',
        sequence: 1,
        defaultValue: 15,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pullup_wide_to_close',
        category: 'pull',
        sequence: 2,
        defaultValue: 3,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'toes_to_bar',
        category: 'core',
        sequence: 3,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pushup_decline_clap',
        category: 'push',
        sequence: 4,
        defaultValue: 4,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'reverse_nordic_curl',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
    ]
  },
  {
    id: 'round_19',
    roundNumber: 19,
    name: "Round 19 \u2014 One-Arm Negatives & Incline Clap",
    type: 'strength_conditioning',
    description: "Agility ladder hops, one-arm negative pull-ups, V-hold, incline clap push-ups, elevated lunges.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'agility_ladder_hops',
        category: 'cardio',
        sequence: 1,
        defaultValue: 15,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pullup_one_arm_negatives',
        category: 'pull',
        sequence: 2,
        defaultValue: 2,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'v_hold',
        category: 'core',
        sequence: 3,
        defaultValue: 10,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pushup_incline_clap',
        category: 'push',
        sequence: 4,
        defaultValue: 3,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'elevated_lunges',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
    ]
  },
  {
    id: 'round_20',
    roundNumber: 20,
    name: "Round 20 \u2014 Australian Rows & Shoulder Taps",
    type: 'strength_conditioning',
    description: "Sprint-in-place, Australian pull-ups, alternating heel touches, shoulder-tap push-ups, curtsy lunges.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'sprint_in_place',
        category: 'cardio',
        sequence: 1,
        defaultValue: 15,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'australian_pullups',
        category: 'pull',
        sequence: 2,
        defaultValue: 4,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'alternating_heel_touches',
        category: 'core',
        sequence: 3,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'pushup_shoulder_tap',
        category: 'push',
        sequence: 4,
        defaultValue: 4,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'curtsy_lunges',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
    ]
  },
  {
    id: 'round_21',
    roundNumber: 21,
    name: "Round 21 \u2014 Lateral Bounds & Close Chin-ups",
    type: 'strength_conditioning',
    description: "Lateral bound sprints, close-grip chin-ups, crossbody mountain climbers, wall push-ups, tibialis raises.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'lateral_bound_sprints',
        category: 'cardio',
        sequence: 1,
        defaultValue: 40,
        unit: 'meters',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'chin_ups_close_grip',
        category: 'pull',
        sequence: 2,
        defaultValue: 3,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'mountain_climbers_crossbody',
        category: 'core',
        sequence: 3,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'pushup_wall',
        category: 'push',
        sequence: 4,
        defaultValue: 5,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'tibialis_raises',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
    ]
  },
  {
    id: 'round_22',
    roundNumber: 22,
    name: "Round 22 \u2014 Sissy Squats & Top Holds",
    type: 'strength_conditioning',
    description: "Cone weave sprints, isometric pull-up hold (top), hollow-to-arch rock, one-arm wall push-ups, sissy squats (eccentric).",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'cone_weave_sprints',
        category: 'cardio',
        sequence: 1,
        defaultValue: 15,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pullup_isometric_hold_top',
        category: 'pull',
        sequence: 2,
        defaultValue: 5,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'hollow_to_arch_rock',
        category: 'core',
        sequence: 3,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'pushup_one_arm_wall',
        category: 'push',
        sequence: 4,
        defaultValue: 3,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'sissy_squats_eccentric',
        category: 'legs',
        sequence: 5,
        defaultValue: 6,
        unit: 'reps',
        sideRule: 'bilateral'
      },
    ]
  },
  {
    id: 'round_23',
    roundNumber: 23,
    name: "Round 23 \u2014 Dynamic Flow (Mobility)",
    type: 'mobility',
    description: "Full dynamic vinyasa flow: Surya Namaskar, Tadasana, Ardha Uttanasana, Adho Mukha Svanasana, Cat-Cow.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'surya_namaskar',
        category: 'mobility',
        sequence: 1,
        defaultValue: 5,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'tadasana',
        category: 'mobility',
        sequence: 2,
        defaultValue: 30,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'ardha_uttanasana',
        category: 'mobility',
        sequence: 3,
        defaultValue: 30,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'adho_mukha_svanasana',
        category: 'mobility',
        sequence: 4,
        defaultValue: 45,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'cat_cow_stretch',
        category: 'mobility',
        sequence: 5,
        defaultValue: 10,
        unit: 'reps',
        sideRule: 'bilateral'
      },
    ]
  },
  {
    id: 'round_24',
    roundNumber: 24,
    name: "Round 24 \u2014 Hips & Spine (Mobility)",
    type: 'mobility',
    description: "Deep hip opening and spinal release: Anjaneyasana, Pigeon Pose, Lizard Pose, Seated Forward Fold, Supine Spinal Twist.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'anjaneyasana_low_lunge',
        category: 'mobility',
        sequence: 1,
        defaultValue: 45,
        unit: 'seconds',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'pigeon_pose',
        category: 'mobility',
        sequence: 2,
        defaultValue: 60,
        unit: 'seconds',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'lizard_pose',
        category: 'mobility',
        sequence: 3,
        defaultValue: 45,
        unit: 'seconds',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'seated_forward_fold',
        category: 'mobility',
        sequence: 4,
        defaultValue: 60,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'supine_spinal_twist',
        category: 'mobility',
        sequence: 5,
        defaultValue: 45,
        unit: 'seconds',
        sideRule: 'each_side'
      },
    ]
  },
  {
    id: 'round_25',
    roundNumber: 25,
    name: "Round 25 \u2014 Lower Body & Shoulders (Mobility)",
    type: 'mobility',
    description: "Lower body and shoulder girdle restoration: Butterfly Stretch, Hamstring Wall Stretch, Frog Pose, Shoulder Opener, Wrist Flexor Stretch.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'butterfly_stretch',
        category: 'mobility',
        sequence: 1,
        defaultValue: 60,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'hamstring_wall_stretch',
        category: 'mobility',
        sequence: 2,
        defaultValue: 60,
        unit: 'seconds',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'frog_pose',
        category: 'mobility',
        sequence: 3,
        defaultValue: 60,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'shoulder_opener_stretch',
        category: 'mobility',
        sequence: 4,
        defaultValue: 45,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'wrist_flexor_stretch',
        category: 'mobility',
        sequence: 5,
        defaultValue: 30,
        unit: 'seconds',
        sideRule: 'bilateral'
      },
    ]
  },
  {
    id: 'round_26',
    roundNumber: 26,
    name: "Round 26 \u2014 Accessory Muscle Balance",
    type: 'accessory_balance',
    description: "Targeted collection addressing calisthenic volume gaps: lower trapezius, rotator cuff, adductors, hamstrings, tibialis, and deep stabilizers.",
    isCanonical: true,
    exercises: [
      {
        exerciseId: 'prone_y_raises',
        category: 'accessory',
        sequence: 1,
        defaultValue: 10,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'prone_t_raises',
        category: 'accessory',
        sequence: 2,
        defaultValue: 10,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'prone_w_raises',
        category: 'accessory',
        sequence: 3,
        defaultValue: 10,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'bird_dog',
        category: 'accessory',
        sequence: 4,
        defaultValue: 10,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'side_plank',
        category: 'accessory',
        sequence: 5,
        defaultValue: 30,
        unit: 'seconds',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'scapular_pushups',
        category: 'accessory',
        sequence: 6,
        defaultValue: 12,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'wall_slides',
        category: 'accessory',
        sequence: 7,
        defaultValue: 10,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'side_lying_external_rotation',
        category: 'accessory',
        sequence: 8,
        defaultValue: 12,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'hamstring_walkouts',
        category: 'accessory',
        sequence: 9,
        defaultValue: 8,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'copenhagen_plank',
        category: 'accessory',
        sequence: 10,
        defaultValue: 20,
        unit: 'seconds',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'side_lying_hip_abduction',
        category: 'accessory',
        sequence: 11,
        defaultValue: 15,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'bent_knee_calf_raises',
        category: 'accessory',
        sequence: 12,
        defaultValue: 15,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'short_foot_exercise',
        category: 'accessory',
        sequence: 13,
        defaultValue: 10,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'chin_tucks',
        category: 'accessory',
        sequence: 14,
        defaultValue: 10,
        unit: 'reps',
        sideRule: 'bilateral'
      },
      {
        exerciseId: 'self_resisted_wrist_extension',
        category: 'accessory',
        sequence: 15,
        defaultValue: 12,
        unit: 'reps',
        sideRule: 'each_side'
      },
      {
        exerciseId: 'finger_spreading_opening',
        category: 'accessory',
        sequence: 16,
        defaultValue: 15,
        unit: 'reps',
        sideRule: 'bilateral'
      },
    ]
  },
];
