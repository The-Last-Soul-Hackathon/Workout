-- MUSCLE INTELLIGENCE CANONICAL SEED DATA
-- Idempotent upserts for core anatomy, exercises, and rounds

INSERT INTO public.muscles (id, name, latin_name, region, description, actions, default_target_min, default_target_max)
VALUES
('pectoralis_major_sternal', 'Pectoralis Major (Sternocostal)', 'Pectoralis major', 'chest', 'Main chest mass responsible for horizontal adduction and shoulder internal rotation.', '["horizontal adduction", "internal rotation"]', 8, 16),
('pectoralis_major_clavicular', 'Pectoralis Major (Clavicular)', 'Pectoralis major pars clavicularis', 'chest', 'Upper chest fibers assisting in shoulder flexion.', '["shoulder flexion", "horizontal adduction"]', 6, 14),
('latissimus_dorsi', 'Latissimus Dorsi', 'Latissimus dorsi', 'back', 'Prime mover for vertical and horizontal pulling.', '["shoulder extension", "shoulder adduction"]', 10, 18),
('trapezius_upper', 'Trapezius (Upper)', 'Trapezius pars descendens', 'back', 'Scapular elevator and cervical stabilizer.', '["scapular elevation"]', 6, 12),
('trapezius_mid_lower', 'Trapezius (Middle & Lower)', 'Trapezius pars transversa', 'back', 'Scapular retractor and depressor.', '["scapular retraction", "scapular depression"]', 8, 14),
('rhomboids', 'Rhomboids', 'Musculi rhomboidei', 'back', 'Scapular retractors.', '["scapular retraction"]', 6, 12),
('deltoid_anterior', 'Anterior Deltoid', 'Deltoideus pars clavicularis', 'shoulders', 'Front shoulder, prime mover in horizontal and vertical pushing.', '["shoulder flexion"]', 6, 12),
('deltoid_lateral', 'Lateral Deltoid', 'Deltoideus pars acromialis', 'shoulders', 'Shoulder abductor.', '["shoulder abduction"]', 8, 16),
('deltoid_posterior', 'Posterior Deltoid', 'Deltoideus pars spinalis', 'shoulders', 'Rear shoulder head.', '["horizontal abduction"]', 8, 14),
('biceps_brachii', 'Biceps Brachii', 'Biceps brachii', 'arms', 'Elbow flexors and forearm supinators.', '["elbow flexion", "forearm supination"]', 8, 16),
('triceps_brachii', 'Triceps Brachii', 'Triceps brachii', 'arms', 'Elbow extensors.', '["elbow extension"]', 8, 16),
('rectus_abdominis', 'Rectus Abdominis', 'Rectus abdominis', 'core', 'Anterior trunk flexor and anti-extension stabiliser.', '["trunk flexion", "anti-extension"]', 8, 16),
('obliques', 'Obliques', 'Musculi obliqui abdominis', 'core', 'Lateral rotators and anti-rotation stabilisers.', '["trunk rotation", "anti-rotation"]', 8, 16),
('gluteus_maximus', 'Gluteus Maximus', 'Gluteus maximus', 'hips_glutes', 'Primary hip extensor.', '["hip extension"]', 8, 18),
('quadriceps', 'Quadriceps Femoris', 'Quadriceps femoris', 'thighs', 'Knee extensor group.', '["knee extension"]', 10, 20),
('hamstrings', 'Hamstrings Complex', 'Biceps femoris, semitendinosus', 'thighs', 'Dual-action knee flexor and hip extensor.', '["knee flexion", "hip extension"]', 8, 16),
('gastrocnemius', 'Gastrocnemius', 'Gastrocnemius', 'calves_feet', 'Plantarflexor.', '["ankle plantarflexion"]', 6, 14),
('tibialis_anterior', 'Tibialis Anterior', 'Tibialis anterior', 'calves_feet', 'Ankle dorsiflexor.', '["ankle dorsiflexion"]', 4, 10)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- Canonical Rounds
INSERT INTO public.round_templates (id, round_number, name, type, description, is_canonical)
VALUES
('round_01', 1, 'Round 1 — Foundation Circuit', 'strength_conditioning', 'Jumping, standard pull-ups, crunches, standard push-ups, bodyweight squats.', true),
('round_02', 2, 'Round 2 — Wide & Explosive', 'strength_conditioning', 'Jumping jacks, wide-grip pull-ups, V-ups, diamond push-ups, jump squats.', true),
('round_03', 3, 'Round 3 — Elevation & Unilateral Base', 'strength_conditioning', 'Butt kicks, chin-ups, lying leg raises, decline push-ups, Bulgarian split squats.', true),
('round_04', 4, 'Round 4 — Archer & Rotational Control', 'strength_conditioning', 'Mountain climbers, archer pull-ups, bicycle crunches, archer push-ups, jumping lunges.', true),
('round_26', 26, 'Round 26 — Accessory Muscle Balance', 'accessory_balance', 'Targeted collection for scapular rotators, deep core, hamstrings, tibialis, and hip adductors.', true)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;
