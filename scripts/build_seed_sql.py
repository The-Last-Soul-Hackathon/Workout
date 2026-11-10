#!/usr/bin/env python3
"""
Builds complete supabase/seed.sql containing all 26 rounds and all canonical exercises.
"""
import re
from build_data import EXERCISES_DATA, ROUNDS_DATA

SEED_SQL_PATH = "supabase/seed.sql"

def escape_sql(text):
    if text is None:
        return "NULL"
    return "'" + str(text).replace("'", "''") + "'"

def generate_seed_sql():
    lines = [
        "-- Idempotent Canonical Database Seed",
        "-- Muscle Intelligence — Cross-Platform Scientific Data Foundation",
        "-- Contains complete canonical definitions for Rounds 1 - 26, 28 functional muscles, and research studies.",
        "",
        "-- 1. Source Licenses",
        "INSERT INTO public.source_licenses (id, full_name, is_commercial_allowed, requires_share_alike, requires_attribution, is_copyleft_viral, license_url)",
        "VALUES",
        "    ('MIT', 'MIT License', TRUE, FALSE, TRUE, FALSE, 'https://opensource.org/licenses/MIT'),",
        "    ('Apache-2.0', 'Apache License 2.0', TRUE, FALSE, TRUE, FALSE, 'https://www.apache.org/licenses/LICENSE-2.0'),",
        "    ('CC-BY-4.0', 'Creative Commons Attribution 4.0 International', TRUE, FALSE, TRUE, FALSE, 'https://creativecommons.org/licenses/by/4.0/'),",
        "    ('CC-BY-SA-3.0', 'Creative Commons Attribution-ShareAlike 3.0 Unported', TRUE, TRUE, TRUE, FALSE, 'https://creativecommons.org/licenses/by-sa/3.0/'),",
        "    ('CC-BY-SA-4.0', 'Creative Commons Attribution-ShareAlike 4.0 International', TRUE, TRUE, TRUE, FALSE, 'https://creativecommons.org/licenses/by-sa/4.0/'),",
        "    ('CC0-1.0', 'Creative Commons Zero v1.0 Universal (Public Domain Dedication)', TRUE, FALSE, FALSE, FALSE, 'https://creativecommons.org/publicdomain/zero/1.0/')",
        "ON CONFLICT (id) DO UPDATE SET",
        "    full_name = EXCLUDED.full_name,",
        "    is_commercial_allowed = EXCLUDED.is_commercial_allowed,",
        "    requires_share_alike = EXCLUDED.requires_share_alike;",
        "",
        "-- 2. External Sources",
        "INSERT INTO public.external_sources (id, license_id, name, url, attribution_text)",
        "VALUES",
        "    ('kinetic', 'MIT', 'Kinetic Exercises Database', 'https://github.com/kinetic-place/exercises-db', 'Exercise definitions sourced from Kinetic.place under MIT License.'),",
        "    ('wger', 'CC-BY-SA-3.0', 'wger Workout Manager', 'https://github.com/wger-project/wger', 'Exercise descriptions and translations from wger Community under CC-BY-SA 3.0.'),",
        "    ('openalex', 'CC0-1.0', 'OpenAlex Global Scholarly Index', 'https://openalex.org', 'Bibliometric metadata provided by OpenAlex under CC0.'),",
        "    ('crossref', 'CC0-1.0', 'Crossref Metadata Search', 'https://www.crossref.org', 'DOI citations resolved via Crossref REST API.'),",
        "    ('pubmed', 'CC0-1.0', 'National Library of Medicine PubMed', 'https://pubmed.ncbi.nlm.nih.gov', 'Biomedical citations and abstracts courtesy of NLM / NCBI.'),",
        "    ('epic_lab', 'CC-BY-4.0', 'Georgia Tech EPIC Lab Open Data', 'https://www.epic.gatech.edu', 'Biomechanics and sEMG datasets from Georgia Tech EPIC Lab under CC-BY 4.0.')",
        "ON CONFLICT (id) DO UPDATE SET",
        "    license_id = EXCLUDED.license_id,",
        "    name = EXCLUDED.name,",
        "    url = EXCLUDED.url;",
        "",
        "-- 3. Muscle Groups (10 Primary Anatomical Regions)",
        "INSERT INTO public.muscle_groups (id, name, description, display_order)",
        "VALUES",
        "    ('chest', 'Chest', 'Pectoral girdle and anterior thoracic cage muscles.', 1),",
        "    ('back', 'Back & Posterior Scapular', 'Latissimus dorsi, trapezius, rhomboids and spine extensors.', 2),",
        "    ('shoulders', 'Shoulders & Rotator Cuff', 'Deltoids and stabilizing rotator cuff complex.', 3),",
        "    ('arms', 'Upper Arms', 'Biceps, brachialis, and triceps compartments.', 4),",
        "    ('forearms', 'Forearms & Hands', 'Wrist flexors, extensors, pronators, and grip musculature.', 5),",
        "    ('core', 'Core & Abdominal Wall', 'Rectus abdominis, obliques, transverse abdominis, and deep stabilizers.', 6),",
        "    ('hips_glutes', 'Hips & Gluteals', 'Gluteus maximus, medius/minimus, adductors, and deep hip rotators.', 7),",
        "    ('thighs', 'Thighs', 'Quadriceps femoris, hamstrings, and sartorius.', 8),",
        "    ('calves_feet', 'Lower Leg & Feet', 'Gastrocnemius, soleus, tibialis anterior, and intrinsic foot arches.', 9),",
        "    ('neck', 'Neck & Cervical Spine', 'Sternocleidomastoid, deep cervical flexors, and upper cervical stabilisers.', 10)",
        "ON CONFLICT (id) DO UPDATE SET",
        "    name = EXCLUDED.name,",
        "    description = EXCLUDED.description,",
        "    display_order = EXCLUDED.display_order;",
        "",
        "-- 4. Muscles (28 Functional Units and Complexes)",
        "INSERT INTO public.muscles (id, muscle_group_id, name, latin_name, fma_id, description, default_weekly_target_min, default_weekly_target_max)",
        "VALUES",
        "    ('pectoralis_major_sternal', 'chest', 'Pectoralis Major (Sternocostal)', 'Pectoralis major', 'FMA:9627', 'Main mid-to-lower chest mass responsible for horizontal adduction and shoulder internal rotation.', 8.0, 16.0),",
        "    ('pectoralis_major_clavicular', 'chest', 'Pectoralis Major (Clavicular / Upper)', 'Pectoralis major pars clavicularis', 'FMA:9627-c', 'Upper chest fibers assisting in shoulder flexion and diagonal horizontal adduction.', 6.0, 14.0),",
        "    ('serratus_anterior', 'chest', 'Serratus Anterior', 'Serratus anterior', 'FMA:13397', 'Scapular protractor and upward rotator; essential for shoulder health and push-up mechanics.', 6.0, 12.0),",
        "    ('latissimus_dorsi', 'back', 'Latissimus Dorsi', 'Latissimus dorsi', 'FMA:9629', 'Broadest muscle of the back; primary vertical and horizontal pulling prime mover.', 10.0, 18.0),",
        "    ('trapezius_upper', 'back', 'Trapezius (Upper)', 'Trapezius pars descendens', 'FMA:9626-u', 'Scapular elevator and neck stabiliser.', 6.0, 12.0),",
        "    ('trapezius_mid_lower', 'back', 'Trapezius (Middle & Lower)', 'Trapezius pars transversa et ascendens', 'FMA:9626-ml', 'Scapular retractor and depressor; crucial for posture and scapulohumeral rhythm.', 8.0, 14.0),",
        "    ('rhomboids', 'back', 'Rhomboids (Major & Minor)', 'Musculi rhomboidei', 'FMA:13379', 'Scapular retractors acting strongly in horizontal pulling movements.', 6.0, 12.0),",
        "    ('erector_spinae', 'back', 'Erector Spinae & Multifidus', 'Erector spinae', 'FMA:71302', 'Spine extensors and core posture stabilisers.', 6.0, 12.0),",
        "    ('deltoid_anterior', 'shoulders', 'Deltoid (Anterior)', 'Deltoideus pars clavicularis', 'FMA:9622-a', 'Front shoulder prime mover in shoulder flexion and horizontal adduction.', 6.0, 12.0),",
        "    ('deltoid_lateral', 'shoulders', 'Deltoid (Lateral / Middle)', 'Deltoideus pars acromialis', 'FMA:9622-l', 'Shoulder abductor responsible for shoulder width.', 6.0, 14.0),",
        "    ('deltoid_posterior', 'shoulders', 'Deltoid (Posterior)', 'Deltoideus pars spinalis', 'FMA:9622-p', 'Rear shoulder prime mover in horizontal abduction and external rotation.', 6.0, 14.0),",
        "    ('rotator_cuff', 'shoulders', 'Rotator Cuff Complex', 'Musculi rotatores humeri', 'FMA:71300', 'Infraspinatus, supraspinatus, subscapularis, teres minor; stabilizes humeral head in glenoid fossa.', 6.0, 12.0),",
        "    ('biceps_brachii', 'arms', 'Biceps Brachii & Brachialis', 'Biceps brachii', 'FMA:37670', 'Elbow flexors and forearm supinators; active in vertical and horizontal pulling.', 8.0, 14.0),",
        "    ('triceps_brachii', 'arms', 'Triceps Brachii', 'Triceps brachii', 'FMA:37688', 'Elbow extensor comprising long, lateral, and medial heads; prime mover in push-ups and dips.', 8.0, 16.0),",
        "    ('forearm_flexors', 'forearms', 'Forearm Flexors & Grip', 'Flexores antebrachii', 'FMA:71301', 'Wrist and finger flexors governing bar hang tolerance and grip strength.', 6.0, 14.0),",
        "    ('forearm_extensors', 'forearms', 'Forearm Extensors', 'Extensores antebrachii', 'FMA:71303', 'Wrist extensors and finger stabilizers protecting elbow health.', 4.0, 10.0),",
        "    ('rectus_abdominis', 'core', 'Rectus Abdominis', 'Rectus abdominis', 'FMA:9628', 'Anterior abdominal wall flexor; active in leg raises, V-ups, and crunches.', 8.0, 16.0),",
        "    ('obliques', 'core', 'Internal & External Obliques', 'Musculi obliqui abdominis', 'FMA:71304', 'Rotational and lateral flexion prime movers, resisting asymmetric loads.', 6.0, 14.0),",
        "    ('transversus_abdominis', 'core', 'Transversus Abdominis & Deep Core', 'Transversus abdominis', 'FMA:15570', 'Deep compressive corset maintaining intra-abdominal pressure during planks and hollow bodies.', 6.0, 12.0),",
        "    ('gluteus_maximus', 'hips_glutes', 'Gluteus Maximus', 'Gluteus maximus', 'FMA:22353', 'Largest extensor of the hip; prime mover in squats, bridges, and jumping.', 8.0, 16.0),",
        "    ('gluteus_medius_minimus', 'hips_glutes', 'Gluteus Medius & Minimus', 'Gluteus medius et minimus', 'FMA:71305', 'Hip abductors and pelvic stabilizers during single-leg support.', 6.0, 12.0),",
        "    ('hip_adductors', 'hips_glutes', 'Hip Adductors', 'Musculi adductores femoris', 'FMA:71306', 'Groin complex stabilizing the femur in the frontal plane during squats and lunges.', 4.0, 10.0),",
        "    ('quadriceps', 'thighs', 'Quadriceps Femoris', 'Quadriceps femoris', 'FMA:22428', 'Knee extensor group (vastus lateralis, medialis, intermedius, rectus femoris).', 10.0, 20.0),",
        "    ('hamstrings', 'thighs', 'Hamstrings Complex', 'Musculi ischiocrurales', 'FMA:71307', 'Knee flexors and hip extensors (biceps femoris, semitendinosus, semimembranosus).', 8.0, 16.0),",
        "    ('gastrocnemius', 'calves_feet', 'Gastrocnemius', 'Gastrocnemius', 'FMA:22541', 'Superficial two-headed calf muscle active in explosive ankle plantarflexion and jumping.', 6.0, 14.0),",
        "    ('soleus', 'calves_feet', 'Soleus', 'Soleus', 'FMA:22542', 'Deep postural plantarflexor, heavily recruited during bent-knee calf movements.', 6.0, 12.0),",
        "    ('tibialis_anterior', 'calves_feet', 'Tibialis Anterior', 'Tibialis anterior', 'FMA:22532', 'Ankle dorsiflexor and shin decelerator.', 4.0, 10.0),",
        "    ('deep_cervical_flexors', 'neck', 'Deep Cervical Flexors & Neck', 'Flexores colli profundi', 'FMA:71308', 'Longus colli and capitis; essential for postural stabilization and chin tucks.', 4.0, 8.0)",
        "ON CONFLICT (id) DO UPDATE SET",
        "    name = EXCLUDED.name,",
        "    description = EXCLUDED.description,",
        "    default_weekly_target_min = EXCLUDED.default_weekly_target_min,",
        "    default_weekly_target_max = EXCLUDED.default_weekly_target_max;",
        "",
        "-- 5. Movement Patterns",
        "INSERT INTO public.movement_patterns (id, name, description, plane_of_motion)",
        "VALUES",
        "    ('vertical_pull', 'Vertical Pull', 'Overhead pulling movements in frontal or sagittal planes.', 'frontal_sagittal'),",
        "    ('horizontal_pull', 'Horizontal Pull', 'Pulling perpendicular to torso; scapular retraction emphasis.', 'sagittal_transverse'),",
        "    ('vertical_push', 'Vertical Push', 'Pushing load overhead relative to torso.', 'frontal_sagittal'),",
        "    ('horizontal_push', 'Horizontal Push', 'Pushing load away from chest in anterior direction.', 'transverse_sagittal'),",
        "    ('squat', 'Squat', 'Simultaneous bilateral knee and hip flexion with upright trunk.', 'sagittal'),",
        "    ('lunge', 'Lunge & Split Stance', 'Unilateral or staggered leg flexion with high pelvic stabilization.', 'sagittal_frontal'),",
        "    ('hip_hinge', 'Hip Hinge', 'Hip extension dominant posterior chain mechanics.', 'sagittal'),",
        "    ('trunk_flexion', 'Trunk Flexion', 'Active shortening of anterior abdominal wall.', 'sagittal'),",
        "    ('anti_extension', 'Anti-Extension Core', 'Isometric resistance against lumbar spine extension.', 'sagittal'),",
        "    ('anti_rotation', 'Anti-Rotation Core', 'Isometric resistance against torso rotational torque.', 'transverse'),",
        "    ('lateral_flexion', 'Lateral Flexion Core', 'Frontal plane trunk flexion and pelvic lateral stabilization.', 'frontal'),",
        "    ('locomotion', 'Locomotion & Crawling', 'Cyclic quadrupedal or bipedal dynamic translation.', 'multi_planar'),",
        "    ('jump_sprint', 'Jump & Sprint Plyometrics', 'High-velocity stretch-shortening cycle power output.', 'sagittal'),",
        "    ('accessory_isolation', 'Accessory Isolation', 'Targeted single-joint stability or rehabilitative loading.', 'targeted'),",
        "    ('mobility_flow', 'Mobility Flow', 'Dynamic joint range-of-motion sequence.', 'multi_planar')",
        "ON CONFLICT (id) DO UPDATE SET",
        "    name = EXCLUDED.name,",
        "    description = EXCLUDED.description;",
        "",
        "-- 6. Equipment",
        "INSERT INTO public.equipment (id, name, description, is_minimal_calisthenics)",
        "VALUES",
        "    ('bodyweight', 'Bodyweight / Floor', 'No external apparatus required.', TRUE),",
        "    ('pull_up_bar', 'Pull-Up Bar', 'Horizontal bar or overhead stable support.', TRUE),",
        "    ('dip_station', 'Dip Station / Parallel Bars', 'Parallel bars or sturdy chair supports.', TRUE),",
        "    ('wall', 'Wall Surface', 'Solid vertical wall for support and balance.', TRUE),",
        "    ('stairs', 'Staircase', 'Flight of stairs for climbs and elevation.', TRUE),",
        "    ('box_bench', 'Box / Bench', 'Elevated surface for step-ups and push-up elevation.', TRUE),",
        "    ('towel_strap', 'Towel / Strap', 'Towel or non-elastic strap for self-resistance.', TRUE),",
        "    ('jump_rope', 'Jump Rope', 'Cord for cardio skipping.', TRUE)",
        "ON CONFLICT (id) DO UPDATE SET",
        "    name = EXCLUDED.name,",
        "    description = EXCLUDED.description;",
        "",
        "-- 7. Model Versions & Parameters",
        "INSERT INTO public.model_versions (id, name, domain, version_tag, formula_definition, latex_representation, scientific_basis)",
        "VALUES",
        "    ('weekly_exposure_v1.0', 'Weekly Fractional Muscle Exposure Model', 'exposure', '1.0.0',",
        "     'Exposure(m) = sum(hard_sets(e) * coefficient(e, m))',",
        "     'Exposure(m) = \\sum_{e} \\left[ \\text{hard\\_sets}(e) \\times \\text{coefficient}(e, m) \\right]',",
        "     'Fractional volume bookkeeping derived from Schoenfeld et al. (2017) and Pelland et al. (2026) dose-response relationships.'),",
        "    ('joint_torque_v1.0', 'Static Peak Joint Torque Estimator', 'biomechanics', '1.0.0',",
        "     'tau = F * r * sin(theta)',",
        "     '\\tau = F \\times r \\times \\sin(\\theta)',",
        "     'Standard Newtonian mechanics using bodyweight segment mass fractions from Dempster (1955) and moment arms.'),",
        "    ('work_power_v1.0', 'Mechanical Work and Power Model', 'biomechanics', '1.0.0',",
        "     'W = F * d * cos(theta), P = W / t',",
        "     'W = F \\times d \\times \\cos(\\theta), \\quad P = \\frac{W}{\\Delta t}',",
        "     'Classical work-energy theorem applied to center-of-mass vertical displacement during calisthenics.'),",
        "    ('rir_estimator_v1.0', 'Repetitions In Reserve Deductive Estimator', 'fatigue', '1.0.0',",
        "     'RIR = max_sound_reps - completed_reps',",
        "     '\\text{RIR} = \\text{reps}_{\\text{max\\_sound}} - \\text{reps}_{\\text{completed}}',",
        "     'Zourdos et al. (2016) resistance training RPE/RIR scale calibrated for bodyweight failure thresholds.')",
        "ON CONFLICT (id) DO UPDATE SET",
        "    formula_definition = EXCLUDED.formula_definition,",
        "    latex_representation = EXCLUDED.latex_representation;",
        "",
        "INSERT INTO public.model_parameters (model_version_id, parameter_key, parameter_value, unit, description)",
        "VALUES",
        "    ('weekly_exposure_v1.0', 'primary_mover_coefficient', 1.0000, 'fraction', 'Direct working set weight for primary agonists.'),",
        "    ('weekly_exposure_v1.0', 'synergist_coefficient', 0.5000, 'fraction', 'Indirect working set credit for secondary synergists.'),",
        "    ('weekly_exposure_v1.0', 'stabiliser_coefficient', 0.2000, 'fraction', 'Indirect stabilization credit for isometric stabilizers.'),",
        "    ('weekly_exposure_v1.0', 'incidental_coefficient', 0.0000, 'fraction', 'Incidental involvement without hypertrophy credit.')",
        "ON CONFLICT (model_version_id, parameter_key) DO UPDATE SET",
        "    parameter_value = EXCLUDED.parameter_value;",
        "",
        "-- 8. Canonical Exercises (All Rounds 1 - 26)",
        "INSERT INTO public.exercises (id, name, primary_category, difficulty, default_unit, unilateral, instructions, safety_cautions, is_canonical)",
        "VALUES"
    ]

    ex_values = []
    for ex in EXERCISES_DATA:
        ex_id, name, cat, patterns, diff, eq, unit, unilateral, instr, cautions, prereqs, regressions, mappings = ex
        val = f"    ({escape_sql(ex_id)}, {escape_sql(name)}, {escape_sql(cat)}, {escape_sql(diff)}, {escape_sql(unit)}, {'TRUE' if unilateral else 'FALSE'}, {escape_sql(instr)}, {escape_sql(cautions)}, TRUE)"
        ex_values.append(val)
    lines.append(",\n".join(ex_values))
    lines.append("ON CONFLICT (id) DO UPDATE SET")
    lines.append("    name = EXCLUDED.name,")
    lines.append("    instructions = EXCLUDED.instructions,")
    lines.append("    safety_cautions = EXCLUDED.safety_cautions;\n")

    # 9. Exercise Muscles
    lines.append("-- 9. Exercise-to-Muscle Mappings with Scientific Evidence")
    lines.append("INSERT INTO public.exercise_muscles (exercise_id, muscle_id, role, coefficient, joint_action, evidence_category, confidence, notes)")
    lines.append("VALUES")

    mapping_values = []
    for ex in EXERCISES_DATA:
        ex_id = ex[0]
        mappings = ex[12]
        for m in mappings:
            m_id, role, coeff, action, ev_cat, conf, notes = m
            conf_val = 0.90 if conf == "high" else (0.75 if conf == "moderate" else 0.50)
            val = f"    ({escape_sql(ex_id)}, {escape_sql(m_id)}, {escape_sql(role)}, {coeff:.2f}, {escape_sql(action)}, {escape_sql(ev_cat)}, {conf_val:.2f}, {escape_sql(notes)})"
            mapping_values.append(val)
    lines.append(",\n".join(mapping_values))
    lines.append("ON CONFLICT (exercise_id, muscle_id, muscle_head_id) DO UPDATE SET")
    lines.append("    role = EXCLUDED.role,")
    lines.append("    coefficient = EXCLUDED.coefficient,")
    lines.append("    joint_action = EXCLUDED.joint_action,")
    lines.append("    evidence_category = EXCLUDED.evidence_category,")
    lines.append("    confidence = EXCLUDED.confidence;\n")

    # 10. Canonical Round Templates (Rounds 1 - 26)
    lines.append("-- 10. Canonical Round Templates (Rounds 1 - 26)")
    lines.append("INSERT INTO public.round_templates (id, round_number, name, type, description, is_canonical)")
    lines.append("VALUES")

    round_values = []
    for rnd in ROUNDS_DATA:
        rnd_num, rnd_id, name, rnd_type, desc, ex_list = rnd
        val = f"    ({escape_sql(rnd_id)}, {rnd_num}, {escape_sql(name)}, {escape_sql(rnd_type)}, {escape_sql(desc)}, TRUE)"
        round_values.append(val)
    lines.append(",\n".join(round_values))
    lines.append("ON CONFLICT (id) DO UPDATE SET")
    lines.append("    name = EXCLUDED.name,")
    lines.append("    description = EXCLUDED.description;\n")

    # 11. Round Exercises
    lines.append("-- 11. Round Exercises (Structured Slots)")
    lines.append("INSERT INTO public.round_exercises (round_template_id, exercise_id, category, sequence, default_value, unit, side_rule)")
    lines.append("VALUES")

    rx_values = []
    for rnd in ROUNDS_DATA:
        rnd_id = rnd[1]
        ex_list = rnd[5]
        for item in ex_list:
            ex_id, cat, seq, def_val, unit, side = item
            val = f"    ({escape_sql(rnd_id)}, {escape_sql(ex_id)}, {escape_sql(cat)}, {seq}, {def_val}, {escape_sql(unit)}, {escape_sql(side)})"
            rx_values.append(val)
    lines.append(",\n".join(rx_values))
    lines.append("ON CONFLICT (round_template_id, sequence) DO UPDATE SET")
    lines.append("    exercise_id = EXCLUDED.exercise_id,")
    lines.append("    default_value = EXCLUDED.default_value;\n")

    # 12. Landmark Peer-Reviewed Research Studies
    lines.append("-- 12. Landmark Peer-Reviewed Research Studies")
    lines.append("INSERT INTO public.research_studies (id, external_source_id, doi, pmid, title, authors, publication_year, journal, abstract, study_type, evidence_category, is_peer_reviewed)")
    lines.append("VALUES")
    lines.append("    ('a0000000-0000-0000-0000-000000000001', 'pubmed', '10.1519/JSC.0b013e3181e3826e', '21098523',")
    lines.append("     'Surface electromyographic activation of the latissimus dorsi and other muscles during the pull-up and chin-up exercises',")
    lines.append("     ARRAY['Youdas JW', 'Amundson CL', 'Cicero KS', 'Hahn JJ', 'Harkness JR', 'Hollman JH'],")
    lines.append("     2010, 'Journal of Strength and Conditioning Research',")
    lines.append("     'Investigated surface electromyographic activity in latissimus dorsi, biceps brachii, lower trapezius, and infraspinatus across pronated pull-up and supinated chin-up variations.',")
    lines.append("     'cross_sectional_emg', 'emg_excitation_evidence', TRUE),")
    lines.append("    ('a0000000-0000-0000-0000-000000000002', 'pubmed', '10.1519/R-16074.1', '16095405',")
    lines.append("     'Comparison of muscle activation using various hand positions during the push-up exercise',")
    lines.append("     ARRAY['Cogley RM', 'Archambault TA', 'Fibeger VD', 'Koverman JW'],")
    lines.append("     2005, 'Journal of Strength and Conditioning Research',")
    lines.append("     'Evaluated wide, shoulder-width, and narrow/diamond hand placements during push-ups. Narrow diamond position elicited significantly greater EMG amplitude in triceps brachii and sternal pectoralis.',")
    lines.append("     'cross_sectional_emg', 'emg_excitation_evidence', TRUE),")
    lines.append("    ('a0000000-0000-0000-0000-000000000003', 'pubmed', '10.1519/JSC.0b013e31820f50be', '21873902',")
    lines.append("     'Electromyographic and kinetic analysis of variations of the push-up exercise',")
    lines.append("     ARRAY['Ebben WP', 'Wurm B', 'VanderZanden TL', 'Spadavecchia ML', 'Duchow AR', 'Feldmann CR'],")
    lines.append("     2011, 'Journal of Strength and Conditioning Research',")
    lines.append("     'Measured ground reaction force and sEMG across standard, incline, decline, knee-supported, and elevated push-up variations.',")
    lines.append("     'biomechanical_simulation', 'biomechanical_evidence', TRUE),")
    lines.append("    ('a0000000-0000-0000-0000-000000000004', 'pubmed', '10.1007/s40279-017-0779-8', '28834797',")
    lines.append("     'Greater Electromyographic Responses Do Not Imply Greater Motor Unit Recruitment and Cannot Be Used to Predict Hypertrophy',")
    lines.append("     ARRAY['Vigotsky AD', 'Halperin I', 'Lehman GJ', 'Trajano GS', 'Vieira TM'],")
    lines.append("     2018, 'Sports Medicine',")
    lines.append("     'Critical review establishing methodological limitations of surface EMG, warning that surface EMG amplitude cannot directly predict motor unit force or long-term longitudinal hypertrophy.',")
    lines.append("     'systematic_review', 'emg_excitation_evidence', TRUE)")
    lines.append("ON CONFLICT (doi) DO UPDATE SET")
    lines.append("    title = EXCLUDED.title,")
    lines.append("    abstract = EXCLUDED.abstract;\n")

    # 13. Link evidence to exercise_muscles
    lines.append("-- 13. Link evidence to exercise_muscles")
    lines.append("INSERT INTO public.exercise_muscle_evidence (exercise_muscle_id, study_id, reported_relationship, confidence_contribution, evidence_notes)")
    lines.append("SELECT em.id, 'a0000000-0000-0000-0000-000000000001'::uuid, 'agonist', 0.95, 'Youdas 2010 confirms latissimus dorsi is primary agonist (>115% MVC) in pronated pull-up.'")
    lines.append("FROM public.exercise_muscles em")
    lines.append("WHERE em.exercise_id = 'pullup_standard' AND em.muscle_id = 'latissimus_dorsi'")
    lines.append("ON CONFLICT (exercise_muscle_id, study_id) DO NOTHING;\n")

    with open(SEED_SQL_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"✓ Generated {SEED_SQL_PATH} with all 26 rounds and exercises.")

if __name__ == "__main__":
    generate_seed_sql()
