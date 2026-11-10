#!/usr/bin/env python3
"""
Complete Canonical Exercise & Round Generator for Muscle Intelligence
Builds all 26 rounds (22 strength/conditioning circuits, 3 mobility flows, 1 muscle-balance accessory round)
Adheres strictly to PRODUCT_SPECIFICATION.md Section 3 and 28 Canonical Muscles.
"""

import os
import json

EXERCISES_TS_PATH = "packages/exercise-data/src/exercises.ts"
ROUNDS_TS_PATH = "packages/exercise-data/src/rounds.ts"

# 1. Complete exercise definitions list (canonicalExercises)
# Each entry: (id, name, category, patterns, difficulty, equipment, defaultUnit, unilateral, instructions, cautions, prereqs, regressions, mappings)
# mappings: list of (muscleId, role, coeff, jointAction, evidenceCategory, confidence, notes)

EXERCISES_DATA = [
  # --- ROUND 1 ---
  ("jumping_standard", "Standard Jumping", "cardio", ["jump_sprint"], "beginner", ["bodyweight"], "reps", False,
   "Continuous light vertical bounces with quick ankle reactivity.", "Land softly on balls of feet to avoid heel strike impact.", [], [],
   [("gastrocnemius", "primary", 1.0, "plantarflexion", "biomechanical_evidence", "high", "Elastic stretch-shortening cycle load."),
    ("quadriceps", "secondary", 0.5, "knee extension", "biomechanical_evidence", "moderate", "Shock absorption and gentle propulsion.")]),

  ("pullup_standard", "Standard Pull-up", "pull", ["vertical_pull"], "intermediate", ["pull_up_bar"], "reps", False,
   "Overhand grip, shoulder-width apart. Depress scapulae, pull until chin clears the bar, control the descent.", "Avoid kipping or excessive lumbar hyperextension.", ["pain_free_hanging_tolerance", "scapular_pullups"], ["pullup_assisted", "band_assisted_pullups"],
   [("latissimus_dorsi", "primary", 1.0, "shoulder adduction & extension", "emg_excitation_evidence", "high", "Prime vertical puller (>115% MVC in Youdas 2010)."),
    ("biceps_brachii", "secondary", 0.5, "elbow flexion", "emg_excitation_evidence", "high", "Synergist elbow flexor."),
    ("trapezius_mid_lower", "secondary", 0.5, "scapular depression & retraction", "biomechanical_evidence", "high", "Scapular stability throughout full ROM."),
    ("forearm_flexors", "stabiliser", 0.2, "isometric grip hold", "biomechanical_evidence", "high", "Supports body mass hanging from bar.")]),

  ("crunches_standard", "Standard Crunches", "core", ["trunk_flexion"], "beginner", ["bodyweight"], "reps", False,
   "Lie supine, knees bent. Curl shoulders toward pelvis by contracting rectus abdominis; keep cervical spine relaxed.", "Do not pull on the back of the neck.", [], [],
   [("rectus_abdominis", "primary", 1.0, "trunk flexion", "emg_excitation_evidence", "high", "Focuses upper portion of rectus abdominis."),
    ("obliques", "secondary", 0.5, "trunk flexion assist", "biomechanical_evidence", "moderate", "Assists anterior spinal curl.")]),

  ("pushup_standard", "Standard Push-up", "push", ["horizontal_push"], "beginner", ["bodyweight"], "reps", False,
   "Hands shoulder-width apart, rigid core plank. Lower chest until 2cm from floor with elbows at 45 degrees, press back to full lockout.", "Prevent hips from sagging; maintain glute tension.", [], ["pushup_incline", "pushup_knee"],
   [("pectoralis_major_sternal", "primary", 1.0, "horizontal adduction", "emg_excitation_evidence", "high", "Prime horizontal pusher (~65-75% BW load)."),
    ("deltoid_anterior", "secondary", 0.5, "shoulder flexion", "emg_excitation_evidence", "high", "Forward shoulder propulsion."),
    ("triceps_brachii", "secondary", 0.5, "elbow extension", "emg_excitation_evidence", "high", "Locks out arms at top of rep."),
    ("serratus_anterior", "secondary", 0.5, "scapular protraction", "emg_excitation_evidence", "high", "Peaks at top plus position."),
    ("rectus_abdominis", "stabiliser", 0.2, "anti-extension core brace", "biomechanical_evidence", "high", "Prevents lumbar sag.")]),

  ("squat_bodyweight", "Bodyweight Squats", "legs", ["squat"], "beginner", ["bodyweight"], "reps", False,
   "Feet shoulder-width apart. Sit hips back and down until hip crease is below parallel, keeping heels planted.", "Avoid dynamic knee valgus collapse.", [], ["squat_box_assisted"],
   [("quadriceps", "primary", 1.0, "knee extension", "emg_excitation_evidence", "high", "Primary knee extensor."),
    ("gluteus_maximus", "secondary", 0.5, "hip extension", "emg_excitation_evidence", "high", "Recruited strongly in deep hip flexion."),
    ("hamstrings", "stabiliser", 0.2, "femur stabilisation", "biomechanical_evidence", "moderate", "Co-contracts; does not experience large length change."),
    ("gastrocnemius", "stabiliser", 0.2, "ankle stability", "biomechanical_evidence", "moderate", "Assists ankle position.")]),

  # --- ROUND 2 ---
  ("jumping_jacks", "Jumping Jacks", "cardio", ["jump_sprint"], "beginner", ["bodyweight"], "reps", False,
   "Jump feet wide while bringing arms overhead, then return to start in rhythm.", "Land softly on midfoot.", [], [],
   [("deltoid_lateral", "secondary", 0.5, "shoulder abduction", "biomechanical_evidence", "moderate", "Arm sweep."),
    ("gluteus_medius_minimus", "secondary", 0.5, "hip abduction", "biomechanical_evidence", "moderate", "Lateral leg opening."),
    ("gastrocnemius", "primary", 1.0, "ankle rebound", "biomechanical_evidence", "high", "Repetitive elastic impact.")]),

  ("pullup_wide_grip", "Wide-Grip Pull-ups", "pull", ["vertical_pull"], "intermediate", ["pull_up_bar"], "reps", False,
   "Grip approximately 1.5x shoulder width. Emphasizes scapular depression and frontal plane adduction.", "Requires high glenohumeral clearance.", ["pullup_standard"], ["pullup_standard"],
   [("latissimus_dorsi", "primary", 1.0, "frontal plane shoulder adduction", "emg_excitation_evidence", "high", "High coronal plane leverage."),
    ("trapezius_mid_lower", "secondary", 0.5, "scapular depression", "biomechanical_evidence", "high", "Assists scapulohumeral rhythm."),
    ("biceps_brachii", "secondary", 0.4, "elbow flexion", "emg_excitation_evidence", "moderate", "Reduced mechanical advantage compared to chin-up.")]),

  ("v_ups", "V-Ups", "core", ["trunk_flexion"], "intermediate", ["bodyweight"], "reps", False,
   "Simultaneously lift straight legs and torso into a V shape, reaching hands toward toes.", "Avoid straining lumbar spine.", ["leg_raises"], ["crunches_standard"],
   [("rectus_abdominis", "primary", 1.0, "simultaneous upper & lower trunk flexion", "emg_excitation_evidence", "high", "Peak abdominal compression (>80% MVC)."),
    ("transversus_abdominis", "secondary", 0.5, "core brace", "biomechanical_evidence", "moderate", "Stabilizes pelvis.")]),

  ("pushup_diamond", "Diamond Push-ups", "push", ["horizontal_push"], "intermediate", ["bodyweight"], "reps", False,
   "Place thumbs and index fingers together under center of chest. Press through triceps.", "Flare elbows moderately if wrist discomfort occurs.", ["pushup_standard"], ["pushup_standard"],
   [("triceps_brachii", "primary", 1.0, "elbow extension", "emg_excitation_evidence", "high", "Significantly higher triceps EMG than standard (Cogley 2005)."),
    ("pectoralis_major_sternal", "primary", 1.0, "horizontal adduction", "emg_excitation_evidence", "high", "Sternal pec activation remains high."),
    ("deltoid_anterior", "secondary", 0.5, "shoulder flexion", "emg_excitation_evidence", "moderate", "Anterior shoulder drive.")]),

  ("jump_squats", "Jump Squats", "legs", ["squat", "jump_sprint"], "intermediate", ["bodyweight"], "reps", False,
   "Squat to parallel and explode vertically into full triple extension. Absorb landing smoothly.", "Land softly through balls of feet into knee flexion.", ["squat_bodyweight"], ["squat_bodyweight"],
   [("quadriceps", "primary", 1.0, "explosive knee extension", "emg_excitation_evidence", "high", "High velocity motor unit recruitment."),
    ("gluteus_maximus", "primary", 1.0, "explosive hip extension", "emg_excitation_evidence", "high", "Glute propulsion."),
    ("gastrocnemius", "secondary", 0.6, "plantarflexion impulse", "biomechanical_evidence", "high", "Terminal takeoff push.")]),

  # --- ROUND 3 ---
  ("butt_kicks", "Butt Kicks", "cardio", ["jump_sprint"], "beginner", ["bodyweight"], "seconds", False,
   "Run in place kicking heels up toward glutes with rapid turnover.", "", [], [],
   [("hamstrings", "secondary", 0.5, "knee flexion", "biomechanical_evidence", "moderate", "Active heel pull."),
    ("gastrocnemius", "primary", 1.0, "plantarflexion", "biomechanical_evidence", "high", "Ankle bounce.")]),

  ("chin_ups", "Chin-ups", "pull", ["vertical_pull"], "intermediate", ["pull_up_bar"], "reps", False,
   "Supinated (underhand) grip. Pull until chin clears bar; increased elbow flexion demand.", "Avoid shrugging shoulders at peak.", ["pullup_standard"], ["pullup_assisted"],
   [("latissimus_dorsi", "primary", 1.0, "shoulder extension", "emg_excitation_evidence", "high", "Prime mover in sagittal plane."),
    ("biceps_brachii", "primary", 1.0, "elbow flexion", "emg_excitation_evidence", "high", "Significantly higher biceps EMG than pronated pull-up (Youdas 2010)."),
    ("pectoralis_major_sternal", "secondary", 0.5, "shoulder extension assist", "emg_excitation_evidence", "moderate", "Sternal pec active in chin-up.")]),

  ("leg_raises", "Lying Leg Raises", "core", ["trunk_flexion"], "beginner", ["bodyweight"], "reps", False,
   "Lie flat on back, elevate legs to 90 degrees while keeping lumbar spine pressed into floor.", "Do not arch lower back off floor.", [], [],
   [("rectus_abdominis", "primary", 1.0, "posterior pelvic tilt & anti-extension", "emg_excitation_evidence", "high", "Strong lower abdominal demand."),
    ("transversus_abdominis", "secondary", 0.5, "lumbar brace", "biomechanical_evidence", "moderate", "Maintains flat spine.")]),

  ("pushup_decline", "Decline Push-ups", "push", ["horizontal_push"], "intermediate", ["box_bench"], "reps", False,
   "Feet elevated on a 30-45cm bench or step. Shifts center of mass forward onto upper chest.", "Maintain rigid core plank.", ["pushup_standard"], ["pushup_standard"],
   [("pectoralis_major_clavicular", "primary", 1.0, "shoulder flexion & horizontal adduction", "emg_excitation_evidence", "high", "Upper chest emphasis (Ebben 2011)."),
    ("deltoid_anterior", "primary", 1.0, "shoulder flexion", "emg_excitation_evidence", "high", "High anterior shoulder demand."),
    ("triceps_brachii", "secondary", 0.5, "elbow extension", "emg_excitation_evidence", "high", "Elbow lockout.")]),

  ("bulgarian_split_squats", "Bulgarian Split Squats", "legs", ["lunge"], "intermediate", ["box_bench"], "reps", True,
   "Rear foot elevated on bench. Descend front knee until thigh is parallel to floor, drive through heel.", "Keep front knee tracking over second toe.", ["squat_bodyweight"], ["lunges_standard"],
   [("quadriceps", "primary", 1.0, "knee extension", "emg_excitation_evidence", "high", "Unilateral knee extension loading."),
    ("gluteus_maximus", "primary", 1.0, "hip extension", "emg_excitation_evidence", "high", "Deep hip extension."),
    ("gluteus_medius_minimus", "secondary", 0.5, "pelvic stabilization", "biomechanical_evidence", "high", "Prevents pelvic drop.")]),

  # --- ROUND 4 ---
  ("mountain_climbers", "Mountain Climbers", "cardio", ["locomotion", "anti_extension"], "beginner", ["bodyweight"], "seconds", False,
   "In high plank, rapidly drive knees alternating toward chest.", "Keep hips level.", [], [],
   [("rectus_abdominis", "secondary", 0.5, "anti-extension brace", "emg_excitation_evidence", "moderate", "Stabilizes trunk dynamically."),
    ("transversus_abdominis", "primary", 1.0, "dynamic core stabilization", "biomechanical_evidence", "high", "Resists spinal extension."),
    ("deltoid_anterior", "secondary", 0.4, "isometric shoulder support", "biomechanical_evidence", "moderate", "Holds upper body.")]),

  ("pullup_archer", "Archer Pull-ups", "pull", ["vertical_pull"], "advanced", ["pull_up_bar"], "reps", True,
   "Pull body to one arm while extending the other arm straight along the bar. Alternate sides.", "Demands high tendon strength in straight arm.", ["pullup_wide_grip"], ["pullup_wide_grip"],
   [("latissimus_dorsi", "primary", 1.0, "unilateral shoulder adduction", "emg_excitation_evidence", "high", "Unilateral overload."),
    ("biceps_brachii", "primary", 1.0, "unilateral elbow flexion", "emg_excitation_evidence", "high", "High single-arm elbow flexion load.")]),

  ("bicycle_crunches", "Bicycle Crunches", "core", ["anti_rotation", "trunk_flexion"], "beginner", ["bodyweight"], "reps", True,
   "Alternating opposite elbow to knee with shoulder rotation.", "Avoid pulling on neck.", [], [],
   [("obliques", "primary", 1.0, "trunk rotation & lateral flexion", "emg_excitation_evidence", "high", "Top-ranked oblique activation exercise."),
    ("rectus_abdominis", "secondary", 0.5, "anterior core curl", "emg_excitation_evidence", "high", "Continuous tension.")]),

  ("pushup_archer", "Archer Push-ups", "push", ["horizontal_push"], "advanced", ["bodyweight"], "reps", True,
   "Wide stance hands; lower chest over one hand while extending opposite arm straight out.", "Regress to knee support if shoulder feels strained.", ["pushup_wide"], ["pushup_wide"],
   [("pectoralis_major_sternal", "primary", 1.0, "unilateral horizontal adduction", "emg_excitation_evidence", "high", "Near single-arm chest loading."),
    ("triceps_brachii", "primary", 1.0, "unilateral elbow extension", "emg_excitation_evidence", "high", "Primary pressing arm triceps.")]),

  ("jumping_lunges", "Jumping Lunges", "legs", ["lunge", "jump_sprint"], "intermediate", ["bodyweight"], "reps", True,
   "Explode upward from lunge and switch legs mid-air, landing softly into next lunge.", "Absorb impact decelerating with control.", ["lunges_standard"], ["lunges_standard"],
   [("quadriceps", "primary", 1.0, "eccentric/concentric knee extension", "emg_excitation_evidence", "high", "High decelerative stretch-shortening."),
    ("gluteus_maximus", "primary", 1.0, "explosive hip extension", "emg_excitation_evidence", "high", "Drive out of split stance.")]),

  # --- ROUND 5 ---
  ("burpees", "Burpees", "cardio", ["jump_sprint", "horizontal_push"], "intermediate", ["bodyweight"], "reps", False,
   "Drop to plank, perform push-up, jump feet in and leap vertically with overhead reach.", "", [], [],
   [("quadriceps", "primary", 1.0, "squat & jump propulsion", "biomechanical_evidence", "high", "Full body cyclic recruitment."),
    ("pectoralis_major_sternal", "secondary", 0.5, "push-up phase", "biomechanical_evidence", "moderate", "Floor push."),
    ("gastrocnemius", "secondary", 0.5, "jump takeoff", "biomechanical_evidence", "high", "Ankle extension.")]),

  ("pullup_commando", "Commando Pull-ups", "pull", ["vertical_pull"], "intermediate", ["pull_up_bar"], "reps", True,
   "Stand under bar facing along it. Neutral grip with hands in tandem; pull head to alternate sides.", "", ["pullup_standard"], ["pullup_standard"],
   [("latissimus_dorsi", "primary", 1.0, "sagittal/frontal pulling", "emg_excitation_evidence", "high", "Neutral grip lat load."),
    ("biceps_brachii", "primary", 1.0, "elbow flexion (brachialis emphasis)", "emg_excitation_evidence", "high", "Neutral grip loads brachialis heavily.")]),

  ("reverse_crunches", "Reverse Crunches", "core", ["trunk_flexion"], "beginner", ["bodyweight"], "reps", False,
   "Lie supine; contract lower abdominals to curl pelvis and knees toward chest without using momentum.", "", [], [],
   [("rectus_abdominis", "primary", 1.0, "posterior pelvic tilt", "emg_excitation_evidence", "high", "Lower rectus abdominis emphasis."),
    ("obliques", "secondary", 0.4, "pelvic curl assistance", "biomechanical_evidence", "moderate", "Core synergy.")]),

  ("pushup_clap", "Explosive / Clap Push-ups", "push", ["horizontal_push", "jump_sprint"], "advanced", ["bodyweight"], "reps", False,
   "Drive explosively off floor with enough height to clap hands before landing smoothly.", "Absorb landing into next rep without locking elbows abruptly.", ["pushup_standard"], ["pushup_plyometric"],
   [("pectoralis_major_sternal", "primary", 1.0, "maximal rate of force development adduction", "emg_excitation_evidence", "high", "High rate of force development."),
    ("triceps_brachii", "primary", 1.0, "explosive elbow extension", "emg_excitation_evidence", "high", "Terminal propulsion.")]),

  ("skater_jumps", "Skater Jumps", "legs", ["jump_sprint", "lunge"], "intermediate", ["bodyweight"], "reps", True,
   "Bound laterally from one foot to the other, absorbing landing on outside leg with knee flexed.", "Land softly tracking knee over toes.", [], [],
   [("gluteus_medius_minimus", "primary", 1.0, "lateral propulsion & decelerative stabilization", "emg_excitation_evidence", "high", "Frontal plane glute load."),
    ("quadriceps", "primary", 1.0, "landing knee extension absorption", "biomechanical_evidence", "high", "Eccentric shock absorption.")]),

  # --- ROUND 6 ---
  ("shuttle_runs", "Shuttle Runs (6x10m)", "cardio", ["locomotion", "jump_sprint"], "beginner", ["bodyweight"], "meters", False,
   "Sprint 10 meters, touch the line, decelerate and sprint back.", "Plant foot firmly before turning.", [], [],
   [("gastrocnemius", "primary", 1.0, "acceleration plantarflexion", "biomechanical_evidence", "high", "Ankle propulsion."),
    ("quadriceps", "primary", 1.0, "deceleration & change of direction", "biomechanical_evidence", "high", "Eccentric braking."),
    ("gluteus_maximus", "secondary", 0.5, "hip extension drive", "biomechanical_evidence", "high", "Forward sprint drive.")]),

  ("pullup_close_grip", "Close-Grip Pull-ups", "pull", ["vertical_pull"], "intermediate", ["pull_up_bar"], "reps", False,
   "Overhand grip with hands spaced 15-20cm apart. Pull chest to bar.", "", ["pullup_standard"], ["pullup_standard"],
   [("latissimus_dorsi", "primary", 1.0, "shoulder adduction/extension", "emg_excitation_evidence", "high", "Latissimus pull."),
    ("biceps_brachii", "secondary", 0.7, "elbow flexion", "emg_excitation_evidence", "high", "Increased elbow flexion angle demand."),
    ("forearm_flexors", "stabiliser", 0.2, "grip hold", "biomechanical_evidence", "high", "Bar grip.")]),

  ("russian_twists", "Russian Twists", "core", ["anti_rotation", "trunk_flexion"], "beginner", ["bodyweight"], "reps", True,
   "Seated in V-shape with heels elevated; rotate torso smoothly from side to side.", "Keep lumbar spine neutral; avoid rounding.", [], [],
   [("obliques", "primary", 1.0, "transverse trunk rotation", "emg_excitation_evidence", "high", "Internal/external oblique rotation."),
    ("rectus_abdominis", "secondary", 0.5, "isometric V-sit flexion", "biomechanical_evidence", "high", "Holds torso angle.")]),

  ("pushup_wide", "Wide Push-ups", "push", ["horizontal_push"], "intermediate", ["bodyweight"], "reps", False,
   "Hands placed 1.5x shoulder width apart. Lower chest into deep horizontal stretch.", "Avoid excessive elbow flaring.", ["pushup_standard"], ["pushup_standard"],
   [("pectoralis_major_sternal", "primary", 1.0, "horizontal adduction at wide angle", "emg_excitation_evidence", "high", "High chest stretch."),
    ("deltoid_anterior", "secondary", 0.5, "shoulder flexion support", "emg_excitation_evidence", "moderate", "Anterior shoulder."),
    ("triceps_brachii", "secondary", 0.4, "elbow extension", "emg_excitation_evidence", "moderate", "Reduced triceps moment arm.")]),

  ("step_ups", "Step-Ups", "legs", ["lunge"], "beginner", ["box_bench"], "reps", True,
   "Step one foot fully onto a 40-50cm bench, drive through heel to stand tall, control descent.", "Do not push off back toe excessively.", [], [],
   [("quadriceps", "primary", 1.0, "concentric knee extension", "emg_excitation_evidence", "high", "Step drive."),
    ("gluteus_maximus", "primary", 1.0, "concentric hip extension", "emg_excitation_evidence", "high", "Hip extension atop bench."),
    ("gastrocnemius", "stabiliser", 0.2, "ankle balance", "biomechanical_evidence", "moderate", "Single limb balance.")]),

  # --- ROUND 7 ---
  ("high_knees", "High Knees", "cardio", ["jump_sprint", "locomotion"], "beginner", ["bodyweight"], "seconds", False,
   "Run in place driving knees up to hip height with quick reactive ground contacts.", "Stay tall through torso.", [], [],
   [("gastrocnemius", "primary", 1.0, "rapid plantarflexion rebound", "biomechanical_evidence", "high", "Ankle reactivity."),
    ("quadriceps", "secondary", 0.5, "hip flexion & knee extension", "biomechanical_evidence", "moderate", "Leg drive."),
    ("rectus_abdominis", "secondary", 0.5, "pelvic stabilization", "biomechanical_evidence", "moderate", "Maintains pelvis.")]),

  ("pullup_l_sit", "L-Sit Pull-ups", "pull", ["vertical_pull", "trunk_flexion"], "advanced", ["pull_up_bar"], "reps", False,
   "Hold legs extended parallel to floor in an L-sit while performing full range pull-ups.", "High core and hip flexor cramp potential.", ["pullup_standard", "leg_raises"], ["pullup_standard"],
   [("latissimus_dorsi", "primary", 1.0, "vertical pulling", "emg_excitation_evidence", "high", "Vertical pulling prime mover."),
    ("rectus_abdominis", "primary", 1.0, "isometric L-sit hold", "emg_excitation_evidence", "high", "Severe isometric trunk flexion."),
    ("biceps_brachii", "secondary", 0.5, "elbow flexion", "emg_excitation_evidence", "high", "Synergist flexor.")]),

  ("plank_to_pushup", "Plank-to-Push-up", "core", ["anti_extension", "horizontal_push"], "intermediate", ["bodyweight"], "reps", True,
   "Transition from forearm plank to high push-up plank one hand at a time, minimizing hip sway.", "Keep hips level throughout transitions.", [], [],
   [("transversus_abdominis", "primary", 1.0, "anti-extension & anti-rotation core brace", "biomechanical_evidence", "high", "Maintains pelvic alignment."),
    ("triceps_brachii", "secondary", 0.6, "push-up transition press", "biomechanical_evidence", "high", "Elbow extension off floor."),
    ("deltoid_anterior", "secondary", 0.5, "shoulder stability", "biomechanical_evidence", "high", "Single arm support.")]),

  ("pushup_staggered", "Staggered Push-ups", "push", ["horizontal_push"], "intermediate", ["bodyweight"], "reps", True,
   "One hand placed forward of shoulder and other hand set slightly back. Alternate sides.", "", ["pushup_standard"], ["pushup_standard"],
   [("pectoralis_major_sternal", "primary", 1.0, "asymmetric horizontal adduction", "emg_excitation_evidence", "high", "Asymmetric chest loading."),
    ("triceps_brachii", "secondary", 0.5, "elbow extension", "emg_excitation_evidence", "high", "Lockout drive."),
    ("obliques", "stabiliser", 0.3, "anti-rotation torso brace", "biomechanical_evidence", "high", "Resists asymmetrical floor force.")]),

  ("calf_raises", "Calf Raises", "legs", ["accessory_isolation"], "beginner", ["bodyweight"], "reps", False,
   "Stand on edge of step or floor; rise onto balls of feet to full plantarflexion, hold 1 sec, lower.", "Full range of motion down to stretch.", [], [],
   [("gastrocnemius", "primary", 1.0, "straight-leg ankle plantarflexion", "emg_excitation_evidence", "high", "Primary calf recruitment."),
    ("soleus", "secondary", 0.7, "ankle plantarflexion support", "emg_excitation_evidence", "high", "Deep calf synergist.")]),

  # --- ROUND 8 ---
  ("broad_jumps", "Broad Jumps", "cardio", ["jump_sprint"], "intermediate", ["bodyweight"], "reps", False,
   "Swing arms, load hips back, and jump forward for maximum distance. Stick landing into squat.", "Absorb landing through hips and knees.", [], [],
   [("gluteus_maximus", "primary", 1.0, "explosive horizontal hip extension", "biomechanical_evidence", "high", "Primary horizontal propulsion."),
    ("quadriceps", "primary", 1.0, "knee extension takeoff & landing", "biomechanical_evidence", "high", "Takeoff and landing absorption."),
    ("gastrocnemius", "secondary", 0.6, "ankle push-off", "biomechanical_evidence", "high", "Plantarflexion impulse.")]),

  ("pullup_around_the_world", "Around-the-World Pull-ups", "pull", ["vertical_pull"], "advanced", ["pull_up_bar"], "reps", True,
   "Pull up toward right hand, glide horizontally across bar to left hand, and lower. Reverse direction.", "Demands high scapular and unilateral pulling control.", ["pullup_wide_grip"], ["pullup_wide_grip"],
   [("latissimus_dorsi", "primary", 1.0, "multidirectional coronal pulling", "emg_excitation_evidence", "high", "Continuous tension lat pull."),
    ("biceps_brachii", "secondary", 0.6, "unilateral elbow flexion transition", "emg_excitation_evidence", "high", "Shifting elbow flexor load."),
    ("trapezius_mid_lower", "secondary", 0.6, "scapular retractor & depressor", "biomechanical_evidence", "high", "Scapular positioning.")]),

  ("flutter_kicks", "Flutter Kicks", "core", ["anti_extension"], "beginner", ["bodyweight"], "seconds", False,
   "Lie flat; hover legs 15cm off floor and alternate small vertical kicks while pressing lower back down.", "Keep lower back glued to floor.", [], [],
   [("rectus_abdominis", "primary", 1.0, "anti-extension core brace", "emg_excitation_evidence", "high", "Isometric lower abdominal brace."),
    ("transversus_abdominis", "secondary", 0.5, "intra-abdominal pressure", "biomechanical_evidence", "moderate", "Core corset.")]),

  ("pushup_plyometric", "Plyometric Push-ups", "push", ["horizontal_push", "jump_sprint"], "advanced", ["bodyweight"], "reps", False,
   "Push explosively off the floor so hands leave the ground momentarily.", "Maintain straight plank during flight.", ["pushup_standard"], ["pushup_standard"],
   [("pectoralis_major_sternal", "primary", 1.0, "explosive horizontal adduction", "emg_excitation_evidence", "high", "High rate of force development."),
    ("triceps_brachii", "secondary", 0.6, "rapid elbow extension", "emg_excitation_evidence", "high", "Fast twitch triceps recruitment.")]),

  ("assisted_pistol_squats", "Assisted Pistol Squats", "legs", ["squat"], "intermediate", ["wall"], "reps", True,
   "Single leg squat with non-working leg straight forward, using wall or pole lightly for balance.", "Do not allow knee to collapse inward.", ["squat_bodyweight"], ["squat_bodyweight"],
   [("quadriceps", "primary", 1.0, "unilateral knee extension", "emg_excitation_evidence", "high", "Maximal single leg quad load."),
    ("gluteus_maximus", "primary", 1.0, "unilateral hip extension", "emg_excitation_evidence", "high", "Deep single leg glute drive."),
    ("gluteus_medius_minimus", "secondary", 0.5, "pelvic leveling", "biomechanical_evidence", "high", "Maintains pelvis in frontal plane.")]),

  # --- ROUND 9 ---
  ("jump_rope", "Jump Rope", "cardio", ["jump_sprint"], "beginner", ["jump_rope"], "seconds", False,
   "Continuous rhythmic skipping on balls of feet with minimal knee bend.", "", [], [],
   [("gastrocnemius", "primary", 1.0, "elastic ankle plantarflexion", "biomechanical_evidence", "high", "High frequency tendon elastic recoil."),
    ("soleus", "secondary", 0.5, "postural ankle stability", "biomechanical_evidence", "moderate", "Plantarflexor support.")]),

  ("pullup_one_arm_assisted", "One-Arm Assisted Pull-ups", "pull", ["vertical_pull"], "advanced", ["pull_up_bar"], "reps", True,
   "One hand on bar; other hand grasps wrist or towel for minimal assistance.", "Severe load on pulling arm lat and elbow flexors.", ["pullup_standard"], ["pullup_archer"],
   [("latissimus_dorsi", "primary", 1.0, "unilateral latissimus adduction", "emg_excitation_evidence", "high", "Heavy unilateral overload."),
    ("biceps_brachii", "primary", 1.0, "unilateral elbow flexion", "emg_excitation_evidence", "high", "High elbow flexion torque."),
    ("forearm_flexors", "stabiliser", 0.3, "high grip intensity", "biomechanical_evidence", "high", "Grip loading.")]),

  ("hanging_knee_raises", "Hanging Knee Raises", "core", ["trunk_flexion"], "intermediate", ["pull_up_bar"], "reps", False,
   "Dead hang from bar; curl knees upward into chest by tilting pelvis posteriorly.", "Avoid swinging or kipping.", ["leg_raises"], ["leg_raises"],
   [("rectus_abdominis", "primary", 1.0, "posterior pelvic tilt & abdominal flexion", "emg_excitation_evidence", "high", "Escamilla 2010 confirmed top abdominal activation."),
    ("forearm_flexors", "stabiliser", 0.2, "hanging grip support", "biomechanical_evidence", "high", "Bar hang.")]),

  ("pushup_cobra", "Cobra Push-ups", "push", ["horizontal_push"], "beginner", ["bodyweight"], "reps", False,
   "Prone position; press palms down to extend arms and arch upper torso into extension.", "Gentle on lumbar spine; do not force range.", [], [],
   [("triceps_brachii", "primary", 1.0, "terminal elbow extension", "emg_excitation_evidence", "high", "Lockout elbow extensor."),
    ("pectoralis_major_sternal", "secondary", 0.4, "horizontal support", "biomechanical_evidence", "moderate", "Lower chest support."),
    ("erector_spinae", "stabiliser", 0.2, "lumbar extension", "biomechanical_evidence", "moderate", "Spine extensors.")]),

  ("glute_bridges", "Glute Bridges", "legs", ["hip_hinge"], "beginner", ["bodyweight"], "reps", False,
   "Lie supine, knees bent, feet flat. Drive through heels to lift hips until thighs and torso align.", "Squeeze glutes at top; avoid hyperextending lumbar spine.", [], [],
   [("gluteus_maximus", "primary", 1.0, "terminal hip extension", "emg_excitation_evidence", "high", "Targeted glute recruitment without spine load."),
    ("hamstrings", "secondary", 0.5, "hip extension synergy", "emg_excitation_evidence", "high", "Synergist hip extension.")]),

  # --- ROUND 10 ---
  ("suicide_runs", "Suicide Runs (3x10m)", "cardio", ["locomotion", "jump_sprint"], "intermediate", ["bodyweight"], "meters", False,
   "Sprint 5m and back, sprint 10m and back, sprint 15m and back with rapid floor touches.", "Decelerate with low center of mass.", [], [],
   [("quadriceps", "primary", 1.0, "eccentric deceleration & propulsion", "biomechanical_evidence", "high", "Change of direction demands."),
    ("gastrocnemius", "primary", 1.0, "sprint drive", "biomechanical_evidence", "high", "Propulsion."),
    ("gluteus_maximus", "secondary", 0.5, "hip drive", "biomechanical_evidence", "high", "Sprinting power.")]),

  ("pullup_typewriter", "Typewriter Pull-ups", "pull", ["vertical_pull", "horizontal_pull"], "advanced", ["pull_up_bar"], "reps", True,
   "Pull chin above bar; glide horizontally to right hand, then to left hand, remaining at top.", "Severe isometric upper body load.", ["pullup_wide_grip"], ["pullup_around_the_world"],
   [("latissimus_dorsi", "primary", 1.0, "sustained isometric coronal pulling", "emg_excitation_evidence", "high", "Continuous lat engagement."),
    ("biceps_brachii", "primary", 1.0, "isometric & dynamic elbow flexion", "emg_excitation_evidence", "high", "Elbow flexor overload."),
    ("trapezius_mid_lower", "secondary", 0.6, "scapular retractor", "biomechanical_evidence", "high", "Upper back stability.")]),

  ("windshield_wipers", "Windshield Wipers", "core", ["anti_rotation", "trunk_flexion"], "advanced", ["pull_up_bar"], "reps", True,
   "Hanging from bar with legs vertical; rotate legs side to side in a controlled arc.", "Requires high shoulder hang strength and oblique control.", ["toes_to_bar"], ["hanging_knee_raises"],
   [("obliques", "primary", 1.0, "transverse plane rotational control", "emg_excitation_evidence", "high", "Peak oblique eccentric and concentric load."),
    ("rectus_abdominis", "primary", 1.0, "isometric hip flexion hold", "emg_excitation_evidence", "high", "Holds legs elevated."),
    ("latissimus_dorsi", "stabiliser", 0.3, "straight arm bar stabilization", "biomechanical_evidence", "high", "Bar stabilization.")]),

  ("pushup_slow_motion", "Slow-Motion Push-ups", "push", ["horizontal_push"], "intermediate", ["bodyweight"], "reps", False,
   "4 seconds down, 2 seconds isometric hold at bottom, 4 seconds up.", "Maintain rigid plank throughout slow tempo.", ["pushup_standard"], ["pushup_standard"],
   [("pectoralis_major_sternal", "primary", 1.0, "prolonged time-under-tension adduction", "emg_excitation_evidence", "high", "High metabolic stress in pec major."),
    ("triceps_brachii", "secondary", 0.5, "controlled elbow extension", "emg_excitation_evidence", "high", "Eccentric triceps control.")]),

  ("lateral_lunges", "Lateral Lunges", "legs", ["lunge"], "intermediate", ["bodyweight"], "reps", True,
   "Step wide to the side, sit hips back over bending leg while keeping opposite leg straight.", "Keep both heels on floor.", ["squat_bodyweight"], ["squat_bodyweight"],
   [("quadriceps", "primary", 1.0, "single-leg knee extension", "emg_excitation_evidence", "high", "Working leg quad drive."),
    ("gluteus_maximus", "primary", 1.0, "hip extension", "emg_excitation_evidence", "high", "Glute drive out of hole."),
    ("hip_adductors", "secondary", 0.6, "frontal deceleration & straight-leg adductor stretch", "biomechanical_evidence", "high", "Adductor involvement.")]),

  # --- ROUND 11 ---
  ("bear_crawl", "Bear Crawl", "cardio", ["locomotion", "anti_extension"], "intermediate", ["bodyweight"], "meters", False,
   "Hands and feet on floor, knees hovering 5cm above ground. Crawl forward with opposite limbs in sync.", "Keep back flat as a tabletop.", [], [],
   [("transversus_abdominis", "primary", 1.0, "anti-extension quadrupedal brace", "biomechanical_evidence", "high", "Core compression."),
    ("serratus_anterior", "secondary", 0.5, "scapular protraction stability", "biomechanical_evidence", "high", "Shoulder girdle support under crawl load."),
    ("quadriceps", "secondary", 0.5, "isometric knee flexion hover", "biomechanical_evidence", "moderate", "Hovering knees.")]),

  ("pullup_explosive", "Explosive Pull-ups", "pull", ["vertical_pull", "jump_sprint"], "advanced", ["pull_up_bar"], "reps", False,
   "Pull with maximum acceleration to bring bar down to chest or sternum level.", "Decelerate smoothly at bottom.", ["pullup_standard"], ["pullup_standard"],
   [("latissimus_dorsi", "primary", 1.0, "maximal rate of force development vertical pull", "emg_excitation_evidence", "high", "High threshold motor unit recruitment."),
    ("biceps_brachii", "secondary", 0.6, "rapid elbow flexion", "emg_excitation_evidence", "high", "Fast elbow flexion impulse.")]),

  ("dead_bug", "Dead Bug", "core", ["anti_extension"], "beginner", ["bodyweight"], "reps", True,
   "Supine with arms up, knees at 90 degrees. Slowly lower opposite arm and leg while keeping lumbar flat.", "Lumbar spine must remain flush against floor.", [], [],
   [("transversus_abdominis", "primary", 1.0, "contralateral lumbo-pelvic anti-extension brace", "emg_excitation_evidence", "high", "Deep core stabilization."),
    ("rectus_abdominis", "secondary", 0.5, "anterior core support", "biomechanical_evidence", "moderate", "Prevents anterior pelvic tilt.")]),

  ("pushup_spiderman", "Spiderman Push-ups", "push", ["horizontal_push", "trunk_flexion"], "advanced", ["bodyweight"], "reps", True,
   "As you lower into push-up, bring one knee outward to touch the elbow on the same side.", "Keep hips from twisting excessively.", ["pushup_standard"], ["pushup_standard"],
   [("pectoralis_major_sternal", "primary", 1.0, "horizontal adduction", "emg_excitation_evidence", "high", "Chest press."),
    ("obliques", "primary", 1.0, "lateral trunk flexion & knee drive", "emg_excitation_evidence", "high", "High unilateral oblique crunch."),
    ("triceps_brachii", "secondary", 0.5, "elbow extension", "emg_excitation_evidence", "high", "Arm lockout.")]),

  ("reverse_lunge_knee_drive", "Reverse Lunge to Knee Drive", "legs", ["lunge", "jump_sprint"], "intermediate", ["bodyweight"], "reps", True,
   "Step back into reverse lunge, drive through front heel, and explosively lift rear knee to chest.", "", ["lunges_standard"], ["lunges_standard"],
   [("quadriceps", "primary", 1.0, "unilateral knee extension", "emg_excitation_evidence", "high", "Front leg extension."),
    ("gluteus_maximus", "primary", 1.0, "unilateral hip extension", "emg_excitation_evidence", "high", "Glute drive into standing."),
    ("gastrocnemius", "secondary", 0.5, "explosive calf push-off", "biomechanical_evidence", "moderate", "Knee drive takeoff.")]),

  # --- ROUND 12 ---
  ("ladder_drills", "Ladder Drills", "cardio", ["locomotion", "jump_sprint"], "beginner", ["bodyweight"], "seconds", False,
   "High-frequency in-in-out-out footwork agility patterns.", "", [], [],
   [("gastrocnemius", "primary", 1.0, "rapid agility plantarflexion", "biomechanical_evidence", "high", "Fast ankle reactivity."),
    ("soleus", "secondary", 0.5, "ankle support", "biomechanical_evidence", "moderate", "Postural stabilizer.")]),

  ("pullup_behind_the_neck", "Behind-the-Neck Pull-ups", "pull", ["vertical_pull"], "advanced", ["pull_up_bar"], "reps", False,
   "Pull up until bar gently touches base of neck behind head.", "Requires high glenohumeral clearance; avoid if impingement occurs.", ["pullup_wide_grip"], ["pullup_wide_grip"],
   [("latissimus_dorsi", "primary", 1.0, "coronal adduction", "emg_excitation_evidence", "high", "High lat activation in extreme coronal plane."),
    ("trapezius_mid_lower", "primary", 1.0, "scapular retraction & depression", "emg_excitation_evidence", "high", "Extreme upper back retraction."),
    ("rhomboids", "secondary", 0.6, "scapular retraction", "biomechanical_evidence", "high", "Rhomboid contraction.")]),

  ("hollow_body_hold", "Hollow Body Hold", "core", ["anti_extension"], "intermediate", ["bodyweight"], "seconds", False,
   "Supine, arms overhead, legs extended 10cm off floor, lower back pressed completely flat.", "Regress by bending knees if lower back lifts.", ["crunches_standard"], ["crunches_standard"],
   [("rectus_abdominis", "primary", 1.0, "posterior pelvic tilt & anti-extension brace", "emg_excitation_evidence", "high", "Gymnastic core foundation (>85% MVC)."),
    ("transversus_abdominis", "primary", 1.0, "deep abdominal compression", "biomechanical_evidence", "high", "Intra-abdominal pressure.")]),

  ("pushup_deep_stretch", "Deep Stretch Push-ups", "push", ["horizontal_push"], "intermediate", ["box_bench"], "reps", False,
   "Hands elevated on two blocks or handles; lower chest below hand level for maximum stretch.", "Do not overstretch shoulder capsule.", ["pushup_standard"], ["pushup_standard"],
   [("pectoralis_major_sternal", "primary", 1.0, "lengthened-state horizontal adduction", "emg_excitation_evidence", "high", "High mechanical tension in stretched position."),
    ("deltoid_anterior", "secondary", 0.5, "shoulder flexion from deep deficit", "emg_excitation_evidence", "high", "Deep anterior delt drive.")]),

  ("sumo_squats", "Sumo Squats", "legs", ["squat"], "beginner", ["bodyweight"], "reps", False,
   "Wide stance, toes turned out 45 degrees. Squat while keeping knees pushed out over toes.", "", [], [],
   [("quadriceps", "primary", 1.0, "knee extension", "emg_excitation_evidence", "high", "Knee extensor."),
    ("gluteus_maximus", "primary", 1.0, "hip extension", "emg_excitation_evidence", "high", "Glute drive."),
    ("hip_adductors", "primary", 1.0, "wide stance adductor contribution", "emg_excitation_evidence", "high", "Adductor longus/magnus recruitment.")]),

  # --- ROUND 13 ---
  ("agility_ladder_hops", "Agility Ladder Hops", "cardio", ["jump_sprint"], "intermediate", ["bodyweight"], "seconds", False,
   "Two-foot or single-foot rapid hops through agility ladder squares.", "", [], [],
   [("gastrocnemius", "primary", 1.0, "reactive ankle hopping", "biomechanical_evidence", "high", "Stretch-shortening cycle."),
    ("quadriceps", "secondary", 0.4, "knee landing absorption", "biomechanical_evidence", "moderate", "Landing dampening.")]),

  ("pullup_mixed_grip", "Mixed-Grip Pull-ups", "pull", ["vertical_pull"], "intermediate", ["pull_up_bar"], "reps", True,
   "One hand overhand, other hand underhand. Alternate grip each set.", "", ["pullup_standard"], ["pullup_standard"],
   [("latissimus_dorsi", "primary", 1.0, "vertical pulling", "emg_excitation_evidence", "high", "Asymmetric lat load."),
    ("biceps_brachii", "secondary", 0.6, "supinated arm elbow flexion", "emg_excitation_evidence", "high", "Supinated side biceps load.")]),

  ("side_plank_raises", "Side Plank Raises", "core", ["lateral_flexion"], "intermediate", ["bodyweight"], "reps", True,
   "In side plank, dip hips toward floor and raise them above neutral into lateral flexion.", "", ["side_plank"], ["side_plank"],
   [("obliques", "primary", 1.0, "dynamic lateral spinal flexion", "emg_excitation_evidence", "high", "Dynamic oblique shortening."),
    ("gluteus_medius_minimus", "primary", 1.0, "hip abduction elevation", "emg_excitation_evidence", "high", "Downside lateral hip drive.")]),

  ("pushup_aztec", "Aztec Push-ups", "push", ["horizontal_push", "jump_sprint"], "elite", ["bodyweight"], "reps", False,
   "Explode completely off floor, pike body in mid-air to touch toes with hands, and land into push-up.", "Extreme wrist and shoulder impact load; elite calisthenics movement only.", ["pushup_clap"], ["pushup_clap"],
   [("pectoralis_major_sternal", "primary", 1.0, "maximal explosive pressing", "emg_excitation_evidence", "high", "Peak rate of force development."),
    ("triceps_brachii", "primary", 1.0, "explosive elbow lockout", "emg_excitation_evidence", "high", "Propulsion."),
    ("rectus_abdominis", "primary", 1.0, "mid-air rapid pike compression", "emg_excitation_evidence", "high", "Extreme pike core contraction.")]),

  ("wall_sit", "Wall Sit", "legs", ["squat"], "beginner", ["wall"], "seconds", False,
   "Back flat against wall, slide down until thighs are parallel to floor with knees at 90 degrees.", "Keep entire back pressed into wall.", [], [],
   [("quadriceps", "primary", 1.0, "sustained 90-degree isometric knee extension", "emg_excitation_evidence", "high", "Pure isometric quad tension."),
    ("gluteus_maximus", "secondary", 0.5, "hip stabilization", "biomechanical_evidence", "moderate", "Holds position.")]),

  # --- ROUND 14 ---
  ("burpee_broad_jumps", "Burpee Broad Jumps", "cardio", ["jump_sprint", "locomotion"], "advanced", ["bodyweight"], "reps", False,
   "Perform a full push-up burpee, and leap out of bottom squat into a maximum distance broad jump.", "", ["burpees", "broad_jumps"], ["burpees"],
   [("quadriceps", "primary", 1.0, "squat & jump takeoff", "biomechanical_evidence", "high", "Compound leg power."),
    ("gluteus_maximus", "primary", 1.0, "horizontal hip extension", "biomechanical_evidence", "high", "Glute drive."),
    ("pectoralis_major_sternal", "secondary", 0.5, "burpee floor push", "biomechanical_evidence", "moderate", "Upper body press.")]),

  ("pullup_ice_cream_maker", "Ice Cream Maker Pull-ups", "pull", ["vertical_pull", "horizontal_pull"], "advanced", ["pull_up_bar"], "reps", False,
   "Pull chin to bar, push body back into horizontal front lever while maintaining bent arms, pull back in.", "Demands advanced scapular leverage and core stability.", ["pullup_standard"], ["inverted_rows_elevated"],
   [("latissimus_dorsi", "primary", 1.0, "transition between vertical and horizontal lever", "emg_excitation_evidence", "high", "Continuous lat recruitment."),
    ("biceps_brachii", "primary", 1.0, "isometric elbow flexion hold", "emg_excitation_evidence", "high", "Holding 90 degree arm angle."),
    ("rectus_abdominis", "secondary", 0.6, "horizontal lever core support", "biomechanical_evidence", "high", "Prevents hip drop.")]),

  ("superman_hold", "Superman Hold", "core", ["hip_hinge"], "beginner", ["bodyweight"], "seconds", False,
   "Lie prone; simultaneously lift arms, chest, and legs off floor by engaging entire posterior chain.", "", [], [],
   [("erector_spinae", "primary", 1.0, "full spinal extension hold", "emg_excitation_evidence", "high", "Posterior spinal extensor strength."),
    ("gluteus_maximus", "primary", 1.0, "hip extension hold", "emg_excitation_evidence", "high", "Glute contraction lifting legs."),
    ("trapezius_mid_lower", "secondary", 0.5, "scapular retraction", "biomechanical_evidence", "moderate", "Upper back hold.")]),

  ("pushup_hindu", "Hindu Push-ups", "push", ["horizontal_push", "vertical_push"], "intermediate", ["bodyweight"], "reps", False,
   "From downward dog, sweep chest down and forward brushing floor, arch up into upward dog, push back.", "", ["pushup_standard"], ["pushup_standard"],
   [("pectoralis_major_sternal", "primary", 1.0, "swooping horizontal press", "emg_excitation_evidence", "high", "Chest press through arc."),
    ("deltoid_anterior", "primary", 1.0, "shoulder flexion in transition", "emg_excitation_evidence", "high", "Shoulder press overhead transition."),
    ("triceps_brachii", "secondary", 0.6, "elbow extension", "emg_excitation_evidence", "high", "Lockout.")]),

  ("cossack_squats", "Cossack Squats", "legs", ["lunge"], "advanced", ["bodyweight"], "reps", True,
   "Wide stance; descend deep into single-leg squat while opposite leg stays straight with toes pointed up.", "Ensure heel of squatting leg stays on floor.", ["lateral_lunges"], ["lateral_lunges"],
   [("quadriceps", "primary", 1.0, "deep single-leg knee flexion", "emg_excitation_evidence", "high", "Full ROM single leg quad drive."),
    ("gluteus_maximus", "primary", 1.0, "deep hip extension", "emg_excitation_evidence", "high", "Glute drive out of bottom."),
    ("hip_adductors", "primary", 1.0, "deep eccentric stretch on straight leg", "biomechanical_evidence", "high", "Groin mobility and control.")]),

  # --- ROUND 15 ---
  ("sprint_jump_sprint", "Sprint-Jump-Sprint (3 reps)", "cardio", ["jump_sprint", "locomotion"], "advanced", ["bodyweight"], "reps", False,
   "Sprint 10m, explode into maximum vertical jump, land and sprint immediately for another 10m.", "", [], [],
   [("gastrocnemius", "primary", 1.0, "sprinting propulsion", "biomechanical_evidence", "high", "Ankle power."),
    ("quadriceps", "primary", 1.0, "acceleration & vertical jump", "biomechanical_evidence", "high", "Knee extensor drive."),
    ("gluteus_maximus", "primary", 1.0, "hip extension sprint drive", "biomechanical_evidence", "high", "Hip propulsion.")]),

  ("towel_rows", "Towel Rows (under door)", "pull", ["horizontal_pull"], "beginner", ["towel_strap"], "reps", False,
   "Loop strong towel around door anchor or post; lean back with straight arms and row chest to hands.", "", [], [],
   [("rhomboids", "primary", 1.0, "scapular retraction", "emg_excitation_evidence", "high", "Scapular pinching."),
    ("trapezius_mid_lower", "primary", 1.0, "middle back contraction", "emg_excitation_evidence", "high", "Mid back pull."),
    ("latissimus_dorsi", "secondary", 0.5, "horizontal shoulder extension", "emg_excitation_evidence", "moderate", "Lat assistance.")]),

  ("alternating_heel_touches", "Alternating Heel Touches", "core", ["lateral_flexion"], "beginner", ["bodyweight"], "reps", True,
   "Lie supine with knees bent; crunch shoulders up and alternate reaching side to side to touch heels.", "", [], [],
   [("obliques", "primary", 1.0, "lateral trunk flexion", "emg_excitation_evidence", "high", "Oblique crunching."),
    ("rectus_abdominis", "secondary", 0.5, "isometric core curl", "biomechanical_evidence", "moderate", "Holds shoulders off floor.")]),

  ("pushup_fingertip", "Fingertip Push-ups", "push", ["horizontal_push"], "advanced", ["bodyweight"], "reps", False,
   "Perform push-ups supporting bodyweight entirely on fingertips.", "Regress to knee support if joint pain occurs.", ["pushup_standard"], ["pushup_standard"],
   [("forearm_flexors", "primary", 1.0, "isometric finger joint stabilization", "biomechanical_evidence", "high", "Exceptional finger and grip strength."),
    ("pectoralis_major_sternal", "primary", 1.0, "horizontal adduction", "emg_excitation_evidence", "high", "Chest push."),
    ("triceps_brachii", "secondary", 0.5, "elbow extension", "emg_excitation_evidence", "high", "Arm lockout.")]),

  ("single_leg_glute_bridge", "Single-Leg Glute Bridge", "legs", ["hip_hinge"], "intermediate", ["bodyweight"], "reps", True,
   "One leg extended straight in air; drive through planted heel to raise hips into full extension.", "", ["glute_bridges"], ["glute_bridges"],
   [("gluteus_maximus", "primary", 1.0, "unilateral hip extension", "emg_excitation_evidence", "high", "Isolated single glute drive."),
    ("hamstrings", "secondary", 0.6, "hip extension synergy", "emg_excitation_evidence", "high", "Hamstring assistance."),
    ("gluteus_medius_minimus", "stabiliser", 0.3, "pelvic leveling", "biomechanical_evidence", "high", "Prevents non-working side pelvic drop.")]),

  # --- ROUND 16 ---
  ("plank_jump_ins", "Plank Jump-Ins", "cardio", ["jump_sprint", "anti_extension"], "intermediate", ["bodyweight"], "reps", False,
   "From push-up plank, jump both feet forward together outside hands, then jump back to plank.", "", [], [],
   [("rectus_abdominis", "primary", 1.0, "rapid hip/trunk flexion tuck", "biomechanical_evidence", "high", "Core flexion rebound."),
    ("gastrocnemius", "secondary", 0.5, "ankle rebound", "biomechanical_evidence", "moderate", "Foot spring.")]),

  ("inverted_rows_elevated", "Inverted Body Rows (Feet Elevated)", "pull", ["horizontal_pull"], "intermediate", ["pull_up_bar", "box_bench"], "reps", False,
   "Horizontal bar at waist height, heels on bench. Pull chest to touch bar with full scapular retraction.", "", ["australian_pullups"], ["australian_pullups"],
   [("rhomboids", "primary", 1.0, "scapular retraction", "emg_excitation_evidence", "high", "Scapular retractors."),
    ("trapezius_mid_lower", "primary", 1.0, "scapular depression and retraction", "emg_excitation_evidence", "high", "Mid back thickness."),
    ("latissimus_dorsi", "secondary", 0.5, "horizontal shoulder extension", "emg_excitation_evidence", "high", "Synergist pull."),
    ("biceps_brachii", "secondary", 0.5, "elbow flexion", "emg_excitation_evidence", "high", "Elbow flexor.")]),

  ("seated_in_and_outs", "Seated In-and-Outs", "core", ["trunk_flexion"], "beginner", ["bodyweight"], "reps", False,
   "Sit on floor leaning back slightly; extend legs straight forward, then pull knees tightly into chest.", "", [], [],
   [("rectus_abdominis", "primary", 1.0, "dynamic abdominal shortening", "emg_excitation_evidence", "high", "Anterior core compression."),
    ("transversus_abdominis", "secondary", 0.5, "core brace", "biomechanical_evidence", "moderate", "Torso balance.")]),

  ("pushup_pseudo_planche", "Pseudo-Planche Push-ups", "push", ["horizontal_push"], "advanced", ["bodyweight"], "reps", False,
   "Hands turned slightly out and placed down near waist level; lean shoulders far forward of wrists.", "High wrist extension angle; warm up wrists thoroughly.", ["pushup_standard"], ["pushup_standard"],
   [("deltoid_anterior", "primary", 1.0, "extreme shoulder flexion leverage", "emg_excitation_evidence", "high", "Severe forward shoulder lean loading."),
    ("pectoralis_major_clavicular", "primary", 1.0, "clavicular pec horizontal flexion", "emg_excitation_evidence", "high", "Upper chest push."),
    ("serratus_anterior", "primary", 1.0, "scapular protraction under forward lean", "emg_excitation_evidence", "high", "Protraction strength.")]),

  ("duck_walk", "Duck Walk (10m)", "legs", ["squat", "locomotion"], "advanced", ["bodyweight"], "meters", False,
   "Drop into full deep squat; waddle forward keeping hips low and torso upright.", "Demands high knee flexion tolerance.", ["squat_bodyweight"], ["squat_bodyweight"],
   [("quadriceps", "primary", 1.0, "sustained deep knee flexion torque", "biomechanical_evidence", "high", "High time-under-tension knee loading."),
    ("gluteus_maximus", "secondary", 0.5, "hip stabilization", "biomechanical_evidence", "moderate", "Base support.")]),

  # --- ROUND 17 ---
  ("sprint_stair_climbs", "Sprint Stair Climbs (4 flights)", "cardio", ["locomotion", "jump_sprint"], "intermediate", ["stairs"], "flights", False,
   "Sprint rapidly up stairs 2 steps at a time, driving knees high.", "", [], [],
   [("quadriceps", "primary", 1.0, "concentric stair push", "biomechanical_evidence", "high", "Knee extensor drive."),
    ("gluteus_maximus", "primary", 1.0, "hip extension drive", "biomechanical_evidence", "high", "Glute power."),
    ("gastrocnemius", "primary", 1.0, "plantarflexion stair spring", "biomechanical_evidence", "high", "Ankle propulsion.")]),

  ("pullup_scapular", "Scapular Pull-ups", "pull", ["vertical_pull"], "beginner", ["pull_up_bar"], "reps", False,
   "Hang from bar with straight arms; depress and retract shoulder blades to lift torso 8-10cm, then relax.", "Do not bend elbows.", [], [],
   [("trapezius_mid_lower", "primary", 1.0, "isolated scapular depression & upward rotation", "emg_excitation_evidence", "high", "Essential scapulohumeral rhythm drill."),
    ("latissimus_dorsi", "secondary", 0.5, "initial pull initiation", "biomechanical_evidence", "moderate", "Lat initiation.")]),

  ("boat_hold", "Boat Hold", "core", ["anti_extension", "trunk_flexion"], "intermediate", ["bodyweight"], "seconds", False,
   "Sit on sit-bones, lift straight legs 45 degrees, reach arms forward parallel to ground; hold steady.", "", ["crunches_standard"], ["crunches_standard"],
   [("rectus_abdominis", "primary", 1.0, "sustained V-position isometric flexion", "emg_excitation_evidence", "high", "Isometric compression."),
    ("transversus_abdominis", "primary", 1.0, "deep pelvic floor & core brace", "biomechanical_evidence", "high", "Core girdle.")]),

  ("pushup_pike", "Pike Push-ups", "push", ["vertical_push"], "intermediate", ["bodyweight"], "reps", False,
   "Inverted V-shape with hips elevated; lower crown of head diagonally forward between hands, press back.", "", ["pushup_decline"], ["pushup_standard"],
   [("deltoid_anterior", "primary", 1.0, "overhead vertical shoulder flexion", "emg_excitation_evidence", "high", "Bodyweight shoulder press prime mover."),
    ("triceps_brachii", "primary", 1.0, "elbow extension", "emg_excitation_evidence", "high", "Overhead elbow lockout."),
    ("trapezius_upper", "secondary", 0.5, "scapular upward rotation", "biomechanical_evidence", "high", "Shoulder elevation.")]),

  ("calf_jumps", "Calf Jumps", "legs", ["jump_sprint"], "beginner", ["bodyweight"], "reps", False,
   "Hop repeatedly vertically using only ankle plantarflexion with knees kept nearly locked straight.", "", [], [],
   [("gastrocnemius", "primary", 1.0, "stiff ankle reactive bouncing", "biomechanical_evidence", "high", "Achilles tendon elasticity."),
    ("soleus", "secondary", 0.5, "ankle plantarflexion support", "biomechanical_evidence", "moderate", "Synergist support.")]),

  # --- ROUND 18 ---
  ("footfire_drills", "Footfire Drills", "cardio", ["jump_sprint"], "beginner", ["bodyweight"], "seconds", False,
   "Rapid alternating foot patter in quarter squat with maximum turnover speed.", "", [], [],
   [("gastrocnemius", "primary", 1.0, "rapid ankle flutter", "biomechanical_evidence", "high", "High cadence ankle action."),
    ("soleus", "secondary", 0.5, "postural stabilization", "biomechanical_evidence", "moderate", "Soleus support.")]),

  ("pullup_wide_to_close", "Wide-to-Close Pull-ups", "pull", ["vertical_pull"], "advanced", ["pull_up_bar"], "reps", False,
   "Perform wide-grip pull-up, walk hands to shoulder width for next rep, walk to close grip for next rep.", "", ["pullup_standard"], ["pullup_standard"],
   [("latissimus_dorsi", "primary", 1.0, "variable width shoulder adduction", "emg_excitation_evidence", "high", "Full range lat activation."),
    ("biceps_brachii", "secondary", 0.6, "elbow flexion", "emg_excitation_evidence", "high", "Varying arm flexor load.")]),

  ("toes_to_bar", "Toes-to-Bar", "core", ["trunk_flexion"], "advanced", ["pull_up_bar"], "reps", False,
   "From dead hang, contract lats and compress abs to bring toes all the way up to touch the bar.", "Avoid uncontrolled swinging.", ["hanging_knee_raises"], ["hanging_knee_raises"],
   [("rectus_abdominis", "primary", 1.0, "full anterior pelvic tilt & lumbar flexion", "emg_excitation_evidence", "high", "Peak abdominal recruitment."),
    ("latissimus_dorsi", "secondary", 0.5, "straight-arm shoulder depression", "biomechanical_evidence", "high", "Lat pull maintaining clearance.")]),

  ("pushup_decline_clap", "Decline Clap Push-ups", "push", ["horizontal_push", "jump_sprint"], "elite", ["box_bench"], "reps", False,
   "Feet elevated on 30-45cm bench; explode off hands with enough clearance to clap before landing.", "Severe impact on wrists and shoulders.", ["pushup_clap"], ["pushup_clap"],
   [("pectoralis_major_clavicular", "primary", 1.0, "explosive clavicular pec drive", "emg_excitation_evidence", "high", "High upper chest rate of force development."),
    ("triceps_brachii", "primary", 1.0, "rapid elbow extension lockout", "emg_excitation_evidence", "high", "Fast twitch triceps."),
    ("deltoid_anterior", "secondary", 0.6, "shoulder flexion drive", "emg_excitation_evidence", "high", "Anterior shoulder.")]),

  ("reverse_nordic_curl", "Reverse Nordic Curl", "legs", ["squat"], "advanced", ["bodyweight"], "reps", False,
   "Tall kneeling, hips locked forward. Lean torso backward from knees only, descend under control, drive back up.", "High quadriceps tendon loading; progress ROM gradually.", ["squat_bodyweight"], ["squat_bodyweight"],
   [("quadriceps", "primary", 1.0, "extreme lengthened-state eccentric knee extension", "emg_excitation_evidence", "high", "Heavy eccentric overload on rectus femoris."),
    ("rectus_abdominis", "secondary", 0.5, "anterior core pelvic lock", "biomechanical_evidence", "high", "Maintains neutral pelvis.")]),

  # --- ROUND 19 ---
  ("pullup_one_arm_negatives", "One-Arm Negative Pull-ups", "pull", ["vertical_pull"], "elite", ["pull_up_bar"], "reps", True,
   "Jump with two arms to top of pull-up, release one hand, and lower over 5 full seconds on single arm.", "Prerequisite: 15+ standard pull-ups. Severe eccentric tendon stress.", ["pullup_one_arm_assisted"], ["pullup_one_arm_assisted"],
   [("latissimus_dorsi", "primary", 1.0, "maximal unilateral eccentric shoulder adduction", "emg_excitation_evidence", "high", "Supramaximal single arm lat overload."),
    ("biceps_brachii", "primary", 1.0, "maximal unilateral eccentric elbow flexion", "emg_excitation_evidence", "high", "Supramaximal eccentric biceps strain."),
    ("forearm_flexors", "primary", 1.0, "maximal single-hand bar hang grip", "biomechanical_evidence", "high", "Full bodyweight single hand grip.")]),

  ("v_hold", "V-Hold", "core", ["trunk_flexion"], "intermediate", ["bodyweight"], "seconds", False,
   "Hold the apex of a V-up with straight legs and torso forming a sharp V; arms reach toward feet.", "", ["v_ups"], ["v_ups"],
   [("rectus_abdominis", "primary", 1.0, "isometric hip & trunk flexion hold", "emg_excitation_evidence", "high", "Maximal isometric abdominal compression."),
    ("transversus_abdominis", "secondary", 0.5, "core stabilization", "biomechanical_evidence", "moderate", "Core corset.")]),

  ("pushup_incline_clap", "Incline Clap Push-ups", "push", ["horizontal_push", "jump_sprint"], "intermediate", ["box_bench"], "reps", False,
   "Hands on bench, feet on floor; push explosively off bench to clap hands before landing smoothly.", "", ["pushup_standard"], ["pushup_standard"],
   [("pectoralis_major_sternal", "primary", 1.0, "explosive chest press", "emg_excitation_evidence", "high", "Rate of force development regression for clapping push-up."),
    ("triceps_brachii", "secondary", 0.5, "elbow extension", "emg_excitation_evidence", "high", "Lockout.")]),

  ("elevated_lunges", "Elevated Lunges", "legs", ["lunge"], "intermediate", ["box_bench"], "reps", True,
   "Front foot on 10-15cm step; descend deeply so back knee approaches floor below front foot plane.", "", ["lunges_standard"], ["lunges_standard"],
   [("quadriceps", "primary", 1.0, "deficit knee extension", "emg_excitation_evidence", "high", "Increased ROM quad work."),
    ("gluteus_maximus", "primary", 1.0, "deficit hip extension", "emg_excitation_evidence", "high", "Deep hip stretch and drive.")]),

  # --- ROUND 20 ---
  ("sprint_in_place", "Sprint-in-Place", "cardio", ["locomotion"], "beginner", ["bodyweight"], "seconds", False,
   "Maximum effort sprinting in place with vigorous arm drive.", "", [], [],
   [("gastrocnemius", "primary", 1.0, "cadence plantarflexion", "biomechanical_evidence", "high", "Ankle power."),
    ("quadriceps", "secondary", 0.5, "knee drive", "biomechanical_evidence", "moderate", "Leg turnover.")]),

  ("australian_pullups", "Australian Pull-ups", "pull", ["horizontal_pull"], "beginner", ["pull_up_bar"], "reps", False,
   "Bar at waist height; feet on floor with body at 45 degree angle. Row chest to bar.", "", [], [],
   [("rhomboids", "primary", 1.0, "scapular retraction", "emg_excitation_evidence", "high", "Retraction prime mover."),
    ("trapezius_mid_lower", "primary", 1.0, "scapular depression & retraction", "emg_excitation_evidence", "high", "Middle back thickness."),
    ("latissimus_dorsi", "secondary", 0.5, "shoulder extension", "emg_excitation_evidence", "high", "Lat synergy.")]),

  ("pushup_shoulder_tap", "Shoulder-Tap Push-ups", "push", ["horizontal_push", "anti_rotation"], "intermediate", ["bodyweight"], "reps", True,
   "Perform push-up; at top lockout tap opposite shoulder with hand while bracing hips from swaying.", "", ["pushup_standard"], ["pushup_standard"],
   [("pectoralis_major_sternal", "primary", 1.0, "horizontal adduction", "emg_excitation_evidence", "high", "Chest press."),
    ("obliques", "primary", 1.0, "anti-rotational torso brace on 3 contact points", "emg_excitation_evidence", "high", "Resists rotational torque during tap."),
    ("triceps_brachii", "secondary", 0.5, "elbow extension", "emg_excitation_evidence", "high", "Lockout.")]),

  ("curtsy_lunges", "Curtsy Lunges", "legs", ["lunge"], "intermediate", ["bodyweight"], "reps", True,
   "Step rear foot diagonally behind front leg and bend knees into curtsy lunge.", "", ["lunges_standard"], ["lunges_standard"],
   [("gluteus_medius_minimus", "primary", 1.0, "lateral hip abduction and stabilization", "emg_excitation_evidence", "high", "High glute medius challenge in crossover stance."),
    ("gluteus_maximus", "primary", 1.0, "hip extension", "emg_excitation_evidence", "high", "Glute drive."),
    ("quadriceps", "primary", 1.0, "knee extension", "emg_excitation_evidence", "high", "Front quad drive.")]),

  # --- ROUND 21 ---
  ("lateral_bound_sprints", "Lateral Bound Sprints (10mx4)", "cardio", ["jump_sprint", "locomotion"], "advanced", ["bodyweight"], "meters", True,
   "Dynamic lateral bounds alternating left and right covering 10 meters, followed by sprint turnaround.", "", [], [],
   [("gluteus_medius_minimus", "primary", 1.0, "frontal plane propulsion", "biomechanical_evidence", "high", "Lateral push-off power."),
    ("gastrocnemius", "primary", 1.0, "ankle explosive push-off", "biomechanical_evidence", "high", "Plantarflexion drive."),
    ("quadriceps", "primary", 1.0, "lateral landing absorption", "biomechanical_evidence", "high", "Decelerative knee stability.")]),

  ("chin_ups_close_grip", "Close-Grip Chin-ups", "pull", ["vertical_pull"], "intermediate", ["pull_up_bar"], "reps", False,
   "Underhand grip with hands 10-15cm apart. Pull chest to bar with intense biceps squeeze.", "", ["chin_ups"], ["chin_ups"],
   [("biceps_brachii", "primary", 1.0, "maximal elbow flexion leverage in supination", "emg_excitation_evidence", "high", "Peak biceps mechanical advantage."),
    ("latissimus_dorsi", "primary", 1.0, "sagittal shoulder extension", "emg_excitation_evidence", "high", "Lat extension.")]),

  ("mountain_climbers_crossbody", "Crossbody Mountain Climbers", "core", ["anti_rotation", "trunk_flexion"], "intermediate", ["bodyweight"], "reps", True,
   "Drive knee across body toward opposite elbow in high plank.", "", ["mountain_climbers"], ["mountain_climbers"],
   [("obliques", "primary", 1.0, "rotational knee drive", "emg_excitation_evidence", "high", "Oblique rotational engagement."),
    ("rectus_abdominis", "secondary", 0.5, "anti-extension core brace", "biomechanical_evidence", "moderate", "Core brace.")]),

  ("pushup_wall", "Wall Push-ups", "push", ["horizontal_push"], "beginner", ["wall"], "reps", False,
   "Hands on wall at chest height; lower face to wall and push back.", "", [], [],
   [("pectoralis_major_sternal", "primary", 1.0, "light horizontal adduction regression", "biomechanical_evidence", "high", "Beginner regression (~30% BW load)."),
    ("triceps_brachii", "secondary", 0.5, "elbow extension", "biomechanical_evidence", "high", "Arm push.")]),

  ("tibialis_raises", "Tibialis Raises", "legs", ["accessory_isolation"], "beginner", ["wall"], "reps", False,
   "Lean back against wall with heels 30cm out; dorsiflex ankles pulling toes toward shins, hold 1 sec.", "", [], [],
   [("tibialis_anterior", "primary", 1.0, "isolated ankle dorsiflexion against body leverage", "emg_excitation_evidence", "high", "Direct anterior shin strengthening drill.")]),

  # --- ROUND 22 ---
  ("cone_weave_sprints", "Cone Weave Sprints", "cardio", ["locomotion", "jump_sprint"], "intermediate", ["bodyweight"], "seconds", False,
   "Weave in and out around cones in rapid slalom pattern.", "", [], [],
   [("gastrocnemius", "primary", 1.0, "multi-directional ankle cuts", "biomechanical_evidence", "high", "Cutting agility."),
    ("gluteus_medius_minimus", "secondary", 0.6, "frontal hip stabilization during lateral cuts", "biomechanical_evidence", "high", "Hip stabilization.")]),

  ("pullup_isometric_hold_top", "Isometric Pull-up Hold (top)", "pull", ["vertical_pull"], "intermediate", ["pull_up_bar"], "seconds", False,
   "Hold chin over bar with elbows pulled down and back for designated duration.", "", ["pullup_standard"], ["pullup_standard"],
   [("latissimus_dorsi", "primary", 1.0, "peak concentric isometric shoulder adduction", "emg_excitation_evidence", "high", "Maximal peak contraction hold."),
    ("biceps_brachii", "primary", 1.0, "isometric elbow flexion hold", "emg_excitation_evidence", "high", "Holding flexed elbow."),
    ("trapezius_mid_lower", "primary", 1.0, "full scapular depression hold", "biomechanical_evidence", "high", "Upper back lockout.")]),

  ("hollow_to_arch_rock", "Hollow-to-Arch Rock", "core", ["anti_extension", "hip_hinge"], "advanced", ["bodyweight"], "reps", False,
   "From hollow body rock, roll over smoothly into arch rock and back without touching limbs down.", "", ["hollow_body_hold", "superman_hold"], ["hollow_body_hold"],
   [("rectus_abdominis", "primary", 1.0, "hollow body anterior flexion", "emg_excitation_evidence", "high", "Anterior core gymnastics compression."),
    ("erector_spinae", "primary", 1.0, "arch posterior extension", "emg_excitation_evidence", "high", "Posterior chain arch."),
    ("transversus_abdominis", "secondary", 0.5, "rotational coordination", "biomechanical_evidence", "moderate", "Core roll transition.")]),

  ("pushup_one_arm_wall", "One-Arm Wall Push-ups", "push", ["horizontal_push"], "intermediate", ["wall"], "reps", True,
   "Stand facing wall, press with one arm while opposite hand rests behind back.", "", ["pushup_wall"], ["pushup_wall"],
   [("pectoralis_major_sternal", "primary", 1.0, "unilateral pushing regression", "biomechanical_evidence", "high", "Single arm pressing mechanics."),
    ("obliques", "primary", 1.0, "anti-rotational torso stability", "biomechanical_evidence", "high", "Prevents torso twist.")]),

  ("sissy_squats_eccentric", "Sissy Squats (Eccentric)", "legs", ["squat"], "advanced", ["bodyweight"], "reps", False,
   "Rise onto toes, push knees forward while leaning torso backward in straight line, lower under control.", "High patellofemoral shear; initiate with short range of motion.", ["squat_bodyweight"], ["squat_bodyweight"],
   [("quadriceps", "primary", 1.0, "extreme rectus femoris lengthened-state knee extension", "emg_excitation_evidence", "high", "Severe isolated rectus femoris tension."),
    ("gastrocnemius", "secondary", 0.5, "plantarflexion balance support", "biomechanical_evidence", "moderate", "Toe balance.")]),

  # --- ROUND 23: DYNAMIC FLOW (MOBILITY) ---
  ("surya_namaskar", "Surya Namaskar (Sun Salutation)", "mobility", ["mobility_flow"], "beginner", ["bodyweight"], "reps", False,
   "Classic continuous vinyasa sequence linking mountain pose, forward fold, plank, cobra, and downward dog with breath.", "Flow smoothly between postures.", [], [],
   [("erector_spinae", "secondary", 0.5, "segmental spinal extension and flexion", "biomechanical_evidence", "high", "Dynamic spinal wave."),
    ("hamstrings", "secondary", 0.5, "posterior chain dynamic lengthening", "biomechanical_evidence", "high", "Forward fold elongation."),
    ("deltoid_anterior", "secondary", 0.4, "overhead arm sweep", "biomechanical_evidence", "moderate", "Shoulder mobility.")]),

  ("tadasana", "Tadasana (Mountain Pose)", "mobility", ["mobility_flow"], "beginner", ["bodyweight"], "seconds", False,
   "Stand tall with feet parallel, engage arches, align pelvis neutral, roll shoulders back, lengthen crown.", "Focus on even weight distribution through foot tripod.", [], [],
   [("transversus_abdominis", "secondary", 0.4, "axial elongation and postural core tone", "biomechanical_evidence", "moderate", "Neutral spine alignment."),
    ("deep_cervical_flexors", "secondary", 0.4, "cervical spine axial alignment", "biomechanical_evidence", "moderate", "Chin tuck posture.")]),

  ("ardha_uttanasana", "Ardha Uttanasana (Half Forward Fold)", "mobility", ["mobility_flow"], "beginner", ["bodyweight"], "seconds", False,
   "Hinge at hips, place hands on shins, extend spine parallel to floor with flat back and broad collarbones.", "Micro-bend knees if hamstrings are tight.", [], [],
   [("hamstrings", "secondary", 0.5, "proximal hamstring active elongation", "biomechanical_evidence", "high", "Posterior chain lengthen."),
    ("erector_spinae", "secondary", 0.5, "isometric horizontal spine hold", "biomechanical_evidence", "high", "Spinal extensor tone.")]),

  ("adho_mukha_svanasana", "Adho Mukha Svanasana (Downward-Facing Dog)", "mobility", ["mobility_flow"], "beginner", ["bodyweight"], "seconds", False,
   "Inverted V-shape with hands shoulder-width, pressing floor away, heels descending toward ground.", "Broaden upper back; relax neck.", [], [],
   [("gastrocnemius", "secondary", 0.5, "ankle dorsiflexion and calf stretch", "biomechanical_evidence", "high", "Calf/Achilles lengthen."),
    ("serratus_anterior", "secondary", 0.5, "scapular upward rotation support", "emg_excitation_evidence", "high", "Active push through palms."),
    ("latissimus_dorsi", "secondary", 0.4, "overhead shoulder flexion opening", "biomechanical_evidence", "moderate", "Thoracic opening.")]),

  ("cat_cow_stretch", "Cat–Cow Flow", "mobility", ["mobility_flow"], "beginner", ["bodyweight"], "reps", False,
   "On hands and knees; alternate undulating spine from gentle lumbar/thoracic extension (Cow) to full flexion (Cat).", "Coordinate motion with natural breathing.", [], [],
   [("erector_spinae", "secondary", 0.5, "active spinal extension mobility", "biomechanical_evidence", "high", "Segmental spine extension."),
    ("rectus_abdominis", "secondary", 0.5, "active spinal flexion mobility", "biomechanical_evidence", "high", "Segmental spine flexion.")]),

  # --- ROUND 24: HIPS & SPINE (MOBILITY) ---
  ("anjaneyasana_low_lunge", "Anjaneyasana (Low Lunge)", "mobility", ["mobility_flow"], "beginner", ["bodyweight"], "seconds", True,
   "Step one foot forward into lunge, lower rear knee to floor, glide hips forward while lifting chest.", "Engage glute of rear leg to deepen anterior hip stretch.", [], [],
   [("quadriceps", "secondary", 0.5, "rectus femoris & iliopsoas elongation", "biomechanical_evidence", "high", "Anterior hip flexor stretch."),
    ("gluteus_maximus", "secondary", 0.4, "rear leg hip extension assist", "biomechanical_evidence", "moderate", "Hip opening.")]),

  ("pigeon_pose", "Pigeon Pose (Eka Pada Rajakapotasana)", "mobility", ["mobility_flow"], "intermediate", ["bodyweight"], "seconds", True,
   "Front knee bent at 45-90 degrees across mat, rear leg extended straight back. Lower torso over front shin.", "Place block under hip if pelvis tilts excessively.", [], [],
   [("gluteus_maximus", "secondary", 0.5, "deep piriformis & hip external rotator stretch", "biomechanical_evidence", "high", "Posterior hip capsule release."),
    ("gluteus_medius_minimus", "secondary", 0.5, "lateral hip tissue elongation", "biomechanical_evidence", "high", "Lateral glute mobility.")]),

  ("lizard_pose", "Lizard Pose (Utthan Pristhasana)", "mobility", ["mobility_flow"], "intermediate", ["bodyweight"], "seconds", True,
   "Deep lunge with front foot placed outside both hands; lower forearms toward floor inside front foot.", "", [], [],
   [("hip_adductors", "secondary", 0.5, "groin & adductor elongation", "biomechanical_evidence", "high", "Deep groin opening."),
    ("hamstrings", "secondary", 0.5, "proximal hamstring release", "biomechanical_evidence", "high", "Hamstring origin stretch.")]),

  ("seated_forward_fold", "Seated Forward Fold (Paschimottanasana)", "mobility", ["mobility_flow"], "beginner", ["bodyweight"], "seconds", False,
   "Sit with legs extended straight forward; hinge at hips and reach forward toward toes with long spine.", "Hinge from hips, do not aggressively round upper back.", [], [],
   [("hamstrings", "secondary", 0.5, "bilateral posterior chain elongation", "biomechanical_evidence", "high", "Hamstring tendon stretch."),
    ("erector_spinae", "secondary", 0.4, "lumbar paraspinal stretch", "biomechanical_evidence", "moderate", "Lower back release.")]),

  ("supine_spinal_twist", "Supine Spinal Twist (Supta Matsyendrasana)", "mobility", ["mobility_flow"], "beginner", ["bodyweight"], "seconds", True,
   "Lie on back, draw one knee to chest, cross it over opposite side toward floor while keeping shoulders grounded.", "Allow gravity to guide the knee down.", [], [],
   [("obliques", "secondary", 0.5, "thoracolumbar rotational mobility", "biomechanical_evidence", "high", "Rotational spinal release."),
    ("erector_spinae", "secondary", 0.5, "paraspinal muscle relaxation", "biomechanical_evidence", "high", "Spine decompression.")]),

  # --- ROUND 25: LOWER BODY & SHOULDERS (MOBILITY) ---
  ("butterfly_stretch", "Butterfly Stretch (Baddha Konasana)", "mobility", ["mobility_flow"], "beginner", ["bodyweight"], "seconds", False,
   "Seated; bring soles of feet together, knees dropping out to sides, gently press knees down toward floor.", "Sit tall on sit-bones.", [], [],
   [("hip_adductors", "secondary", 0.5, "bilateral groin adductor stretch", "biomechanical_evidence", "high", "Adductor longus/brevis release."),
    ("gluteus_medius_minimus", "secondary", 0.3, "hip external rotation assist", "biomechanical_evidence", "moderate", "Hip opening.")]),

  ("hamstring_wall_stretch", "Hamstring Wall Stretch", "mobility", ["mobility_flow"], "beginner", ["wall"], "seconds", True,
   "Lie supine next to doorway or wall with one leg resting vertically up the surface, other leg flat on floor.", "Keep pelvis grounded on floor.", [], [],
   [("hamstrings", "secondary", 0.5, "isolated passive hamstring elongation", "biomechanical_evidence", "high", "Full length hamstring stretch.")]),

  ("frog_pose", "Frog Pose (Mandukasana)", "mobility", ["mobility_flow"], "intermediate", ["bodyweight"], "seconds", False,
   "On hands and knees; widen knees as far apart as comfortable, feet turned outward, sink hips back.", "Use padding beneath knees.", [], [],
   [("hip_adductors", "secondary", 0.6, "intense bilateral hip adductor opening", "biomechanical_evidence", "high", "Deep groin and pelvic floor release.")]),

  ("shoulder_opener_stretch", "Shoulder Opener Stretch (Prone / Wall)", "mobility", ["mobility_flow"], "beginner", ["wall"], "seconds", False,
   "Hands placed overhead against wall or floor; press chest through into shoulder flexion opening.", "Breathe into thoracic spine.", [], [],
   [("pectoralis_major_sternal", "secondary", 0.5, "anterior chest stretch", "biomechanical_evidence", "high", "Chest opening."),
    ("latissimus_dorsi", "secondary", 0.5, "latissimus tendon stretch", "biomechanical_evidence", "high", "Overhead shoulder mobility.")]),

  ("wrist_flexor_stretch", "Wrist Flexor Stretch", "mobility", ["mobility_flow"], "beginner", ["bodyweight"], "seconds", False,
   "Kneeling with palms flat on floor, fingers pointing backward toward knees. Gently lean hips back.", "Do not force through sharp wrist pain.", [], [],
   [("forearm_flexors", "secondary", 0.5, "wrist & finger flexor tendon elongation", "biomechanical_evidence", "high", "Wrist flexor mobility."),
    ("forearm_extensors", "secondary", 0.5, "wrist extensor release", "biomechanical_evidence", "high", "Opposite side wrist release.")]),

  # --- ROUND 26: MUSCLE-BALANCE ACCESSORY COLLECTION ---
  ("prone_y_raises", "Prone Y Raises", "accessory", ["accessory_isolation"], "beginner", ["bodyweight"], "reps", False,
   "Lie face down, arms outstretched at 45 degrees forming a Y, thumbs pointed upward. Lift thumbs toward ceiling.", "Avoid shrugging; initiate from lower shoulder blades.", [], [],
   [("trapezius_mid_lower", "primary", 1.0, "lower trapezius upward rotation & depression", "emg_excitation_evidence", "high", "Direct lower trapezius isolation."),
    ("deltoid_posterior", "secondary", 0.5, "rear shoulder extension assist", "emg_excitation_evidence", "moderate", "Rear shoulder synergist.")]),

  ("prone_t_raises", "Prone T Raises", "accessory", ["accessory_isolation"], "beginner", ["bodyweight"], "reps", False,
   "Lie prone, arms straight out to sides forming a T with thumbs up. Pinch shoulder blades together to lift arms.", "Keep neck neutral.", [], [],
   [("deltoid_posterior", "primary", 1.0, "horizontal abduction", "emg_excitation_evidence", "high", "Posterior deltoid agonist."),
    ("rhomboids", "primary", 1.0, "scapular retraction", "emg_excitation_evidence", "high", "Middle back retraction."),
    ("trapezius_mid_lower", "secondary", 0.5, "middle trapezius squeeze", "biomechanical_evidence", "high", "Middle trapezius synergy.")]),

  ("prone_w_raises", "Prone W Raises", "accessory", ["accessory_isolation"], "beginner", ["bodyweight"], "reps", False,
   "Lie prone, elbows bent by ribs forming a W shape. Lift hands and elbows rotating shoulders backward.", "", [], [],
   [("rotator_cuff", "primary", 1.0, "shoulder external rotation", "emg_excitation_evidence", "high", "Infraspinatus & teres minor loading."),
    ("deltoid_posterior", "secondary", 0.5, "external rotation assist", "biomechanical_evidence", "moderate", "Rear shoulder contribution.")]),

  ("bird_dog", "Bird Dog", "accessory", ["anti_rotation"], "beginner", ["bodyweight"], "reps", True,
   "On hands and knees, slowly reach opposite arm and leg straight out without allowing spine to rotate or sag.", "", [], [],
   [("erector_spinae", "primary", 1.0, "contralateral spinal stabilization", "emg_excitation_evidence", "high", "Multifidus and erector recruitment with minimal spinal compression."),
    ("gluteus_maximus", "secondary", 0.5, "hip extension", "emg_excitation_evidence", "high", "Holds straight leg extended.")]),

  ("side_plank", "Side Plank", "accessory", ["lateral_flexion"], "intermediate", ["bodyweight"], "seconds", True,
   "Rest on forearm and side of feet, maintaining a straight diagonal line from head to heels.", "", [], [],
   [("obliques", "primary", 1.0, "anti-lateral flexion", "emg_excitation_evidence", "high", "High lateral abdominal wall challenge."),
    ("gluteus_medius_minimus", "secondary", 0.5, "hip abduction support", "emg_excitation_evidence", "high", "Downside hip stabilizer.")]),

  ("scapular_pushups", "Scapular Push-ups", "accessory", ["horizontal_push"], "beginner", ["bodyweight"], "reps", False,
   "In high plank with arms locked straight, let shoulder blades retract together, then push floor away protracting blades.", "Do not bend elbows.", [], [],
   [("serratus_anterior", "primary", 1.0, "isolated scapular protraction", "emg_excitation_evidence", "high", "Gold-standard serratus activation drill.")]),

  ("wall_slides", "Wall Slides", "accessory", ["accessory_isolation"], "beginner", ["wall"], "reps", False,
   "Stand with back, elbows, and wrists pressed against wall; slide forearms upward into Y shape.", "Maintain contact with wall without arching lower back.", [], [],
   [("serratus_anterior", "primary", 1.0, "scapular upward rotation under wall resistance", "emg_excitation_evidence", "high", "Shoulder health and upward rotation."),
    ("trapezius_mid_lower", "secondary", 0.6, "lower trapezius upward rotation", "emg_excitation_evidence", "high", "Lower trap activation.")]),

  ("side_lying_external_rotation", "Side-Lying External Rotation", "accessory", ["accessory_isolation"], "beginner", ["bodyweight"], "reps", True,
   "Lie on side with top elbow pinned against ribcage bent at 90 degrees; rotate forearm upward toward ceiling.", "", [], [],
   [("rotator_cuff", "primary", 1.0, "isolated infraspinatus & teres minor external rotation", "emg_excitation_evidence", "high", "High isolated rotator cuff activation."),
    ("deltoid_posterior", "secondary", 0.5, "rear shoulder assist", "biomechanical_evidence", "moderate", "Synergist rotation.")]),

  ("hamstring_walkouts", "Hamstring Walkouts", "accessory", ["hip_hinge"], "intermediate", ["bodyweight"], "reps", False,
   "From glute bridge, take small steps with heels outward until knees are nearly straight, hold 1 sec, walk back in.", "High eccentric hamstring tension.", [], [],
   [("hamstrings", "primary", 1.0, "eccentric knee flexion & hip extension", "emg_excitation_evidence", "high", "Direct bodyweight knee-flexor loading without machines."),
    ("gluteus_maximus", "secondary", 0.5, "hip extension maintainer", "biomechanical_evidence", "high", "Keeps hips elevated.")]),

  ("copenhagen_plank", "Copenhagen Plank", "accessory", ["lateral_flexion"], "advanced", ["box_bench"], "seconds", True,
   "Side plank with top leg resting on bench, bottom leg hovered underneath. Hold hips elevated.", "Intense adductor tendon load. Begin with knee on bench before ankle.", [], [],
   [("hip_adductors", "primary", 1.0, "isometric top-leg hip adduction", "emg_excitation_evidence", "high", "Highest evidence-backed bodyweight adductor exercise (Schryver 2020)."),
    ("obliques", "secondary", 0.5, "lateral core stability", "biomechanical_evidence", "high", "Maintains pelvic alignment.")]),

  ("side_lying_hip_abduction", "Side-Lying Hip Abduction", "accessory", ["accessory_isolation"], "beginner", ["bodyweight"], "reps", True,
   "Lie on side, keep top leg straight with toes pointing slightly downward; lift top leg toward ceiling.", "Do not roll pelvis backward.", [], [],
   [("gluteus_medius_minimus", "primary", 1.0, "isolated hip abduction", "emg_excitation_evidence", "high", "Direct gluteus medius/minimus activation."),
    ("transversus_abdominis", "stabiliser", 0.2, "pelvic core brace", "biomechanical_evidence", "moderate", "Pelvic stability.")]),

  ("bent_knee_calf_raises", "Bent-Knee Calf Raises", "accessory", ["accessory_isolation"], "beginner", ["wall"], "reps", False,
   "Stand with knees bent to 25-30 degrees; rise onto balls of feet holding knee flexion throughout.", "", [], [],
   [("soleus", "primary", 1.0, "isolated soleus plantarflexion under gastrocnemius slack", "emg_excitation_evidence", "high", "Bent knee takes gastrocnemius into active insufficiency, isolating soleus."),
    ("gastrocnemius", "secondary", 0.3, "submaximal plantarflexion", "biomechanical_evidence", "moderate", "Secondary support.")]),

  ("short_foot_exercise", "Short-Foot Exercise", "accessory", ["accessory_isolation"], "beginner", ["bodyweight"], "reps", True,
   "Stand barefoot; draw the ball of the foot toward the heel without curling toes, elevating medial longitudinal arch.", "Avoid curling toes.", [], [],
   [("tibialis_anterior", "secondary", 0.4, "foot arch elevation synergy", "biomechanical_evidence", "moderate", "Arch elevation."),
    ("gastrocnemius", "stabiliser", 0.2, "tripod foot stability", "biomechanical_evidence", "moderate", "Foot tripod balance.")]),

  ("chin_tucks", "Chin Tucks", "accessory", ["accessory_isolation"], "beginner", ["bodyweight"], "reps", False,
   "Seated tall, gently draw chin straight backward making a double chin without tilting head down.", "Gentle motion; stop if symptoms occur.", [], [],
   [("deep_cervical_flexors", "primary", 1.0, "isolated craniocervical flexion", "emg_excitation_evidence", "high", "Targeted longus colli/capitis postural strengthening.")]),

  ("self_resisted_wrist_extension", "Self-Resisted Wrist Extension", "accessory", ["accessory_isolation"], "beginner", ["bodyweight"], "reps", True,
   "Forearm supported; use opposite hand to push downward against back of hand while extending wrist upward.", "", [], [],
   [("forearm_extensors", "primary", 1.0, "concentric/isometric wrist extension", "biomechanical_evidence", "high", "Direct forearm extensor loading protecting against lateral epicondylalgia.")]),

  ("finger_spreading_opening", "Finger Spreading and Opening", "accessory", ["accessory_isolation"], "beginner", ["bodyweight"], "reps", False,
   "Make a fist, then forcefully spread and extend all fingers outward against air or light elastic band.", "", [], [],
   [("forearm_extensors", "primary", 1.0, "intrinsic hand and finger extensor opening", "biomechanical_evidence", "high", "Antagonist balance against bar hanging grip flexion.")])
]

# 2. Build canonicalRounds list (all 26 rounds)
ROUNDS_DATA = [
  (1, "round_01", "Round 1 — Foundation Circuit", "strength_conditioning",
   "Fundamental bodyweight baseline: jumping, standard pull-ups, crunches, standard push-ups, bodyweight squats.",
   [("jumping_standard", "cardio", 1, 45, "reps", "bilateral"),
    ("pullup_standard", "pull", 2, 3, "reps", "bilateral"),
    ("crunches_standard", "core", 3, 6, "reps", "bilateral"),
    ("pushup_standard", "push", 4, 5, "reps", "bilateral"),
    ("squat_bodyweight", "legs", 5, 6, "reps", "bilateral")]),

  (2, "round_02", "Round 2 — Wide & Explosive", "strength_conditioning",
   "Jumping jacks, wide-grip pull-ups, V-ups, diamond push-ups, jump squats.",
   [("jumping_jacks", "cardio", 1, 15, "reps", "bilateral"),
    ("pullup_wide_grip", "pull", 2, 2, "reps", "bilateral"),
    ("v_ups", "core", 3, 6, "reps", "bilateral"),
    ("pushup_diamond", "push", 4, 4, "reps", "bilateral"),
    ("jump_squats", "legs", 5, 6, "reps", "bilateral")]),

  (3, "round_03", "Round 3 — Elevation & Unilateral Base", "strength_conditioning",
   "Butt kicks, chin-ups, lying leg raises, decline push-ups, Bulgarian split squats.",
   [("butt_kicks", "cardio", 1, 15, "seconds", "bilateral"),
    ("chin_ups", "pull", 2, 2, "reps", "bilateral"),
    ("leg_raises", "core", 3, 6, "reps", "bilateral"),
    ("pushup_decline", "push", 4, 4, "reps", "bilateral"),
    ("bulgarian_split_squats", "legs", 5, 6, "reps", "each_side")]),

  (4, "round_04", "Round 4 — Archer & Rotational Control", "strength_conditioning",
   "Mountain climbers, archer pull-ups, bicycle crunches, archer push-ups, jumping lunges.",
   [("mountain_climbers", "cardio", 1, 15, "seconds", "bilateral"),
    ("pullup_archer", "pull", 2, 2, "reps", "each_side"),
    ("bicycle_crunches", "core", 3, 6, "reps", "each_side"),
    ("pushup_archer", "push", 4, 3, "reps", "each_side"),
    ("jumping_lunges", "legs", 5, 6, "reps", "each_side")]),

  (5, "round_05", "Round 5 — Power & Commando Grip", "strength_conditioning",
   "Burpees, commando pull-ups, reverse crunches, explosive clap push-ups, skater jumps.",
   [("burpees", "cardio", 1, 6, "reps", "bilateral"),
    ("pullup_commando", "pull", 2, 3, "reps", "each_side"),
    ("reverse_crunches", "core", 3, 6, "reps", "bilateral"),
    ("pushup_clap", "push", 4, 4, "reps", "bilateral"),
    ("skater_jumps", "legs", 5, 6, "reps", "each_side")]),

  (6, "round_06", "Round 6 — Agility & Wide Leverage", "strength_conditioning",
   "Shuttle runs, close-grip pull-ups, Russian twists, wide push-ups, step-ups.",
   [("shuttle_runs", "cardio", 1, 60, "meters", "bilateral"),
    ("pullup_close_grip", "pull", 2, 3, "reps", "bilateral"),
    ("russian_twists", "core", 3, 6, "reps", "each_side"),
    ("pushup_wide", "push", 4, 5, "reps", "bilateral"),
    ("step_ups", "legs", 5, 6, "reps", "each_side")]),

  (7, "round_07", "Round 7 — Staggered Pushing & L-Sit Pull", "strength_conditioning",
   "High knees, L-sit pull-ups, plank-to-push-up, staggered push-ups, calf raises.",
   [("high_knees", "cardio", 1, 15, "seconds", "bilateral"),
    ("pullup_l_sit", "pull", 2, 2, "reps", "bilateral"),
    ("plank_to_pushup", "core", 3, 6, "reps", "bilateral"),
    ("pushup_staggered", "push", 4, 4, "reps", "bilateral"),
    ("calf_raises", "legs", 5, 6, "reps", "bilateral")]),

  (8, "round_08", "Round 8 — Broad Jumps & Around the World", "strength_conditioning",
   "Broad jumps, around-the-world pull-ups, flutter kicks, plyometric push-ups, assisted pistol squats.",
   [("broad_jumps", "cardio", 1, 6, "reps", "bilateral"),
    ("pullup_around_the_world", "pull", 2, 2, "reps", "each_side"),
    ("flutter_kicks", "core", 3, 15, "seconds", "bilateral"),
    ("pushup_plyometric", "push", 4, 4, "reps", "bilateral"),
    ("assisted_pistol_squats", "legs", 5, 6, "reps", "each_side")]),

  (9, "round_09", "Round 9 — Jump Rope & Cobra Push", "strength_conditioning",
   "Jump rope, one-arm assisted pull-ups, hanging knee raises, cobra push-ups, glute bridges.",
   [("jump_rope", "cardio", 1, 15, "seconds", "bilateral"),
    ("pullup_one_arm_assisted", "pull", 2, 3, "reps", "each_side"),
    ("hanging_knee_raises", "core", 3, 6, "reps", "bilateral"),
    ("pushup_cobra", "push", 4, 5, "reps", "bilateral"),
    ("glute_bridges", "legs", 5, 6, "reps", "bilateral")]),

  (10, "round_10", "Round 10 — Suicides & Typewriter Pull", "strength_conditioning",
   "Suicide runs, typewriter pull-ups, windshield wipers, slow-motion push-ups, lateral lunges.",
   [("suicide_runs", "cardio", 1, 30, "meters", "bilateral"),
    ("pullup_typewriter", "pull", 2, 2, "reps", "each_side"),
    ("windshield_wipers", "core", 3, 6, "reps", "each_side"),
    ("pushup_slow_motion", "push", 4, 4, "reps", "bilateral"),
    ("lateral_lunges", "legs", 5, 6, "reps", "each_side")]),

  (11, "round_11", "Round 11 — Bear Crawl & Spiderman Push", "strength_conditioning",
   "Bear crawl, explosive pull-ups, dead bug, Spiderman push-ups, reverse lunge to knee drive.",
   [("bear_crawl", "cardio", 1, 15, "meters", "bilateral"),
    ("pullup_explosive", "pull", 2, 2, "reps", "bilateral"),
    ("dead_bug", "core", 3, 6, "reps", "each_side"),
    ("pushup_spiderman", "push", 4, 4, "reps", "each_side"),
    ("reverse_lunge_knee_drive", "legs", 5, 6, "reps", "each_side")]),

  (12, "round_12", "Round 12 — Behind Neck & Deep Stretch", "strength_conditioning",
   "Ladder drills, behind-the-neck pull-ups, hollow body hold, deep stretch push-ups, sumo squats.",
   [("ladder_drills", "cardio", 1, 15, "seconds", "bilateral"),
    ("pullup_behind_the_neck", "pull", 2, 2, "reps", "bilateral"),
    ("hollow_body_hold", "core", 3, 10, "seconds", "bilateral"),
    ("pushup_deep_stretch", "push", 4, 4, "reps", "bilateral"),
    ("sumo_squats", "legs", 5, 6, "reps", "bilateral")]),

  (13, "round_13", "Round 13 — Aztec Push & Mixed Grip", "strength_conditioning",
   "Agility ladder hops, mixed-grip pull-ups, side plank raises, Aztec push-ups, wall sit.",
   [("agility_ladder_hops", "cardio", 1, 15, "seconds", "bilateral"),
    ("pullup_mixed_grip", "pull", 2, 3, "reps", "bilateral"),
    ("side_plank_raises", "core", 3, 6, "reps", "each_side"),
    ("pushup_aztec", "push", 4, 3, "reps", "bilateral"),
    ("wall_sit", "legs", 5, 10, "seconds", "bilateral")]),

  (14, "round_14", "Round 14 — Hindu Push & Ice Cream Maker", "strength_conditioning",
   "Burpee broad jumps, ice cream maker pull-ups, superman hold, Hindu push-ups, Cossack squats.",
   [("burpee_broad_jumps", "cardio", 1, 6, "reps", "bilateral"),
    ("pullup_ice_cream_maker", "pull", 2, 2, "reps", "bilateral"),
    ("superman_hold", "core", 3, 10, "seconds", "bilateral"),
    ("pushup_hindu", "push", 4, 4, "reps", "bilateral"),
    ("cossack_squats", "legs", 5, 6, "reps", "each_side")]),

  (15, "round_15", "Round 15 — Fingertip Push & Towel Rows", "strength_conditioning",
   "Sprint-jump-sprint, towel rows (under door), alternating heel touches, fingertip push-ups, single-leg glute bridge.",
   [("sprint_jump_sprint", "cardio", 1, 3, "reps", "bilateral"),
    ("towel_rows", "pull", 2, 4, "reps", "bilateral"),
    ("alternating_heel_touches", "core", 3, 6, "reps", "each_side"),
    ("pushup_fingertip", "push", 4, 4, "reps", "bilateral"),
    ("single_leg_glute_bridge", "legs", 5, 6, "reps", "each_side")]),

  (16, "round_16", "Round 16 — Planche & Inverted Rows", "strength_conditioning",
   "Plank jump-ins, inverted body rows (feet elevated), seated in-and-outs, pseudo-planche push-ups, duck walk.",
   [("plank_jump_ins", "cardio", 1, 10, "reps", "bilateral"),
    ("inverted_rows_elevated", "pull", 2, 4, "reps", "bilateral"),
    ("seated_in_and_outs", "core", 3, 6, "reps", "bilateral"),
    ("pushup_pseudo_planche", "push", 4, 4, "reps", "bilateral"),
    ("duck_walk", "legs", 5, 10, "meters", "bilateral")]),

  (17, "round_17", "Round 17 — Pike Overhead & Scapular Control", "strength_conditioning",
   "Sprint stair climbs, scapular pull-ups, boat hold, pike push-ups, calf jumps.",
   [("sprint_stair_climbs", "cardio", 1, 4, "flights", "bilateral"),
    ("pullup_scapular", "pull", 2, 5, "reps", "bilateral"),
    ("boat_hold", "core", 3, 12, "seconds", "bilateral"),
    ("pushup_pike", "push", 4, 4, "reps", "bilateral"),
    ("calf_jumps", "legs", 5, 6, "reps", "bilateral")]),

  (18, "round_18", "Round 18 — Nordic Eccentric & Core Compression", "strength_conditioning",
   "Footfire drills, wide to close pull-ups, toes-to-bar, decline clap push-ups, reverse Nordic curls.",
   [("footfire_drills", "cardio", 1, 15, "seconds", "bilateral"),
    ("pullup_wide_to_close", "pull", 2, 3, "reps", "bilateral"),
    ("toes_to_bar", "core", 3, 6, "reps", "bilateral"),
    ("pushup_decline_clap", "push", 4, 4, "reps", "bilateral"),
    ("reverse_nordic_curl", "legs", 5, 6, "reps", "bilateral")]),

  (19, "round_19", "Round 19 — One-Arm Negatives & Incline Clap", "strength_conditioning",
   "Agility ladder hops, one-arm negative pull-ups, V-hold, incline clap push-ups, elevated lunges.",
   [("agility_ladder_hops", "cardio", 1, 15, "seconds", "bilateral"),
    ("pullup_one_arm_negatives", "pull", 2, 2, "reps", "each_side"),
    ("v_hold", "core", 3, 10, "seconds", "bilateral"),
    ("pushup_incline_clap", "push", 4, 3, "reps", "bilateral"),
    ("elevated_lunges", "legs", 5, 6, "reps", "each_side")]),

  (20, "round_20", "Round 20 — Australian Rows & Shoulder Taps", "strength_conditioning",
   "Sprint-in-place, Australian pull-ups, alternating heel touches, shoulder-tap push-ups, curtsy lunges.",
   [("sprint_in_place", "cardio", 1, 15, "seconds", "bilateral"),
    ("australian_pullups", "pull", 2, 4, "reps", "bilateral"),
    ("alternating_heel_touches", "core", 3, 6, "reps", "each_side"),
    ("pushup_shoulder_tap", "push", 4, 4, "reps", "each_side"),
    ("curtsy_lunges", "legs", 5, 6, "reps", "each_side")]),

  (21, "round_21", "Round 21 — Lateral Bounds & Close Chin-ups", "strength_conditioning",
   "Lateral bound sprints, close-grip chin-ups, crossbody mountain climbers, wall push-ups, tibialis raises.",
   [("lateral_bound_sprints", "cardio", 1, 40, "meters", "bilateral"),
    ("chin_ups_close_grip", "pull", 2, 3, "reps", "bilateral"),
    ("mountain_climbers_crossbody", "core", 3, 6, "reps", "each_side"),
    ("pushup_wall", "push", 4, 5, "reps", "bilateral"),
    ("tibialis_raises", "legs", 5, 6, "reps", "bilateral")]),

  (22, "round_22", "Round 22 — Sissy Squats & Top Holds", "strength_conditioning",
   "Cone weave sprints, isometric pull-up hold (top), hollow-to-arch rock, one-arm wall push-ups, sissy squats (eccentric).",
   [("cone_weave_sprints", "cardio", 1, 15, "seconds", "bilateral"),
    ("pullup_isometric_hold_top", "pull", 2, 5, "seconds", "bilateral"),
    ("hollow_to_arch_rock", "core", 3, 6, "reps", "bilateral"),
    ("pushup_one_arm_wall", "push", 4, 3, "reps", "each_side"),
    ("sissy_squats_eccentric", "legs", 5, 6, "reps", "bilateral")]),

  # --- MOBILITY ROUNDS ---
  (23, "round_23", "Round 23 — Dynamic Flow (Mobility)", "mobility",
   "Full dynamic vinyasa flow: Surya Namaskar, Tadasana, Ardha Uttanasana, Adho Mukha Svanasana, Cat-Cow.",
   [("surya_namaskar", "mobility", 1, 5, "reps", "bilateral"),
    ("tadasana", "mobility", 2, 30, "seconds", "bilateral"),
    ("ardha_uttanasana", "mobility", 3, 30, "seconds", "bilateral"),
    ("adho_mukha_svanasana", "mobility", 4, 45, "seconds", "bilateral"),
    ("cat_cow_stretch", "mobility", 5, 10, "reps", "bilateral")]),

  (24, "round_24", "Round 24 — Hips & Spine (Mobility)", "mobility",
   "Deep hip opening and spinal release: Anjaneyasana, Pigeon Pose, Lizard Pose, Seated Forward Fold, Supine Spinal Twist.",
   [("anjaneyasana_low_lunge", "mobility", 1, 45, "seconds", "each_side"),
    ("pigeon_pose", "mobility", 2, 60, "seconds", "each_side"),
    ("lizard_pose", "mobility", 3, 45, "seconds", "each_side"),
    ("seated_forward_fold", "mobility", 4, 60, "seconds", "bilateral"),
    ("supine_spinal_twist", "mobility", 5, 45, "seconds", "each_side")]),

  (25, "round_25", "Round 25 — Lower Body & Shoulders (Mobility)", "mobility",
   "Lower body and shoulder girdle restoration: Butterfly Stretch, Hamstring Wall Stretch, Frog Pose, Shoulder Opener, Wrist Flexor Stretch.",
   [("butterfly_stretch", "mobility", 1, 60, "seconds", "bilateral"),
    ("hamstring_wall_stretch", "mobility", 2, 60, "seconds", "each_side"),
    ("frog_pose", "mobility", 3, 60, "seconds", "bilateral"),
    ("shoulder_opener_stretch", "mobility", 4, 45, "seconds", "bilateral"),
    ("wrist_flexor_stretch", "mobility", 5, 30, "seconds", "bilateral")]),

  # --- ACCESSORY ROUND ---
  (26, "round_26", "Round 26 — Accessory Muscle Balance", "accessory_balance",
   "Targeted collection addressing calisthenic volume gaps: lower trapezius, rotator cuff, adductors, hamstrings, tibialis, and deep stabilizers.",
   [("prone_y_raises", "accessory", 1, 10, "reps", "bilateral"),
    ("prone_t_raises", "accessory", 2, 10, "reps", "bilateral"),
    ("prone_w_raises", "accessory", 3, 10, "reps", "bilateral"),
    ("bird_dog", "accessory", 4, 10, "reps", "each_side"),
    ("side_plank", "accessory", 5, 30, "seconds", "each_side"),
    ("scapular_pushups", "accessory", 6, 12, "reps", "bilateral"),
    ("wall_slides", "accessory", 7, 10, "reps", "bilateral"),
    ("side_lying_external_rotation", "accessory", 8, 12, "reps", "each_side"),
    ("hamstring_walkouts", "accessory", 9, 8, "reps", "bilateral"),
    ("copenhagen_plank", "accessory", 10, 20, "seconds", "each_side"),
    ("side_lying_hip_abduction", "accessory", 11, 15, "reps", "each_side"),
    ("bent_knee_calf_raises", "accessory", 12, 15, "reps", "bilateral"),
    ("short_foot_exercise", "accessory", 13, 10, "reps", "each_side"),
    ("chin_tucks", "accessory", 14, 10, "reps", "bilateral"),
    ("self_resisted_wrist_extension", "accessory", 15, 12, "reps", "each_side"),
    ("finger_spreading_opening", "accessory", 16, 15, "reps", "bilateral")])
]

def generate_exercises_ts():
    lines = [
        "import { Exercise } from '@muscle-intelligence/domain';",
        "",
        "/**",
        " * Canonical Exercise Catalogue (Rounds 1 - 26)",
        " * Includes 22 strength/conditioning circuits, 3 mobility flows, and the Round 26 muscle-balance collection.",
        " * Every exercise is mapped to canonical muscles with evidence classifications.",
        " */",
        "export const canonicalExercises: Exercise[] = ["
    ]

    for ex in EXERCISES_DATA:
        ex_id, name, cat, patterns, diff, eq, unit, unilateral, instr, cautions, prereqs, regressions, mappings = ex
        lines.append("  {")
        lines.append(f"    id: '{ex_id}',")
        lines.append(f"    name: {json.dumps(name)},")
        lines.append(f"    category: '{cat}',")
        lines.append(f"    movementPatterns: {json.dumps(patterns)},")
        lines.append(f"    difficulty: '{diff}',")
        lines.append(f"    equipment: {json.dumps(eq)},")
        lines.append(f"    defaultUnit: '{unit}',")
        lines.append(f"    unilateral: {'true' if unilateral else 'false'},")
        lines.append(f"    instructions: {json.dumps(instr)},")
        if cautions:
            lines.append(f"    safetyCautions: {json.dumps(cautions)},")
        if prereqs:
            lines.append(f"    prerequisites: {json.dumps(prereqs)},")
        if regressions:
            lines.append(f"    regressions: {json.dumps(regressions)},")
        lines.append("    isCanonical: true,")
        lines.append("    muscleMappings: [")
        for m in mappings:
            m_id, role, coeff, action, ev_cat, conf, notes = m
            lines.append("      {")
            lines.append(f"        muscleId: '{m_id}',")
            lines.append(f"        role: '{role}',")
            lines.append(f"        coefficient: {coeff},")
            lines.append(f"        jointAction: {json.dumps(action)},")
            lines.append(f"        evidenceCategory: '{ev_cat}',")
            lines.append(f"        confidence: '{conf}',")
            lines.append(f"        notes: {json.dumps(notes)}")
            lines.append("      },")
        lines.append("    ]")
        lines.append("  },")

    lines.append("];")
    lines.append("")

    with open(EXERCISES_TS_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"✓ Generated {EXERCISES_TS_PATH} with {len(EXERCISES_DATA)} canonical exercises.")

def generate_rounds_ts():
    lines = [
        "import { RoundTemplate } from '@muscle-intelligence/domain';",
        "",
        "/**",
        " * Canonical Round Templates (Rounds 1 - 26)",
        " * Covers Rounds 1-22 (Strength & Conditioning), Rounds 23-25 (Mobility Flows), and Round 26 (Accessory Balance).",
        " */",
        "export const canonicalRounds: RoundTemplate[] = ["
    ]

    for rnd in ROUNDS_DATA:
        rnd_num, rnd_id, name, rnd_type, desc, ex_list = rnd
        lines.append("  {")
        lines.append(f"    id: '{rnd_id}',")
        lines.append(f"    roundNumber: {rnd_num},")
        lines.append(f"    name: {json.dumps(name)},")
        lines.append(f"    type: '{rnd_type}',")
        lines.append(f"    description: {json.dumps(desc)},")
        lines.append("    isCanonical: true,")
        lines.append("    exercises: [")
        for item in ex_list:
            ex_id, cat, seq, def_val, unit, side = item
            lines.append("      {")
            lines.append(f"        exerciseId: '{ex_id}',")
            lines.append(f"        category: '{cat}',")
            lines.append(f"        sequence: {seq},")
            lines.append(f"        defaultValue: {def_val},")
            lines.append(f"        unit: '{unit}',")
            lines.append(f"        sideRule: '{side}'")
            lines.append("      },")
        lines.append("    ]")
        lines.append("  },")

    lines.append("];")
    lines.append("")

    with open(ROUNDS_TS_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"✓ Generated {ROUNDS_TS_PATH} with {len(ROUNDS_DATA)} canonical rounds.")

if __name__ == "__main__":
    generate_exercises_ts()
    generate_rounds_ts()
    print("All canonical files generated successfully.")
