-- Migration 2: Exercise Catalogue Schema
-- Muscle Intelligence — Cross-Platform Scientific Data Foundation

-- 1. Movement Patterns (Fundamental Biomechanical Movement Categories)
CREATE TABLE IF NOT EXISTS public.movement_patterns (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    plane_of_motion VARCHAR(50), -- sagittal, frontal, transverse, multi-planar
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Equipment (Calisthenic & Supportive Gear)
CREATE TABLE IF NOT EXISTS public.equipment (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_minimal_calisthenics BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Exercises (Canonical Exercise Definitions)
CREATE TABLE IF NOT EXISTS public.exercises (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    primary_category VARCHAR(50) NOT NULL, -- cardio, pull, core, push, legs, mobility, accessory
    difficulty VARCHAR(50) NOT NULL, -- beginner, intermediate, advanced, elite
    default_unit VARCHAR(20) NOT NULL DEFAULT 'reps', -- reps, seconds, meters, flights
    unilateral BOOLEAN NOT NULL DEFAULT FALSE,
    instructions TEXT NOT NULL,
    safety_cautions TEXT,
    is_canonical BOOLEAN NOT NULL DEFAULT TRUE,
    is_user_custom BOOLEAN NOT NULL DEFAULT FALSE,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT chk_exercise_category CHECK (primary_category IN ('cardio', 'pull', 'core', 'push', 'legs', 'mobility', 'accessory')),
    CONSTRAINT chk_exercise_difficulty CHECK (difficulty IN ('beginner', 'intermediate', 'advanced', 'elite')),
    CONSTRAINT chk_exercise_unit CHECK (default_unit IN ('reps', 'seconds', 'meters', 'flights'))
);

CREATE INDEX IF NOT EXISTS idx_exercises_category ON public.exercises(primary_category);
CREATE INDEX IF NOT EXISTS idx_exercises_difficulty ON public.exercises(difficulty);
CREATE INDEX IF NOT EXISTS idx_exercises_canonical ON public.exercises(is_canonical);

-- Junction Table: Exercises <-> Movement Patterns
CREATE TABLE IF NOT EXISTS public.exercise_movement_patterns (
    exercise_id VARCHAR(100) NOT NULL REFERENCES public.exercises(id) ON UPDATE CASCADE ON DELETE CASCADE,
    movement_pattern_id VARCHAR(50) NOT NULL REFERENCES public.movement_patterns(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    is_primary BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (exercise_id, movement_pattern_id)
);

-- Junction Table: Exercises <-> Equipment
CREATE TABLE IF NOT EXISTS public.exercise_equipment (
    exercise_id VARCHAR(100) NOT NULL REFERENCES public.exercises(id) ON UPDATE CASCADE ON DELETE CASCADE,
    equipment_id VARCHAR(50) NOT NULL REFERENCES public.equipment(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    is_optional BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (exercise_id, equipment_id)
);

-- 4. Exercise Muscles (Authoritative Exercise-to-Muscle Mappings)
CREATE TABLE IF NOT EXISTS public.exercise_muscles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exercise_id VARCHAR(100) NOT NULL REFERENCES public.exercises(id) ON UPDATE CASCADE ON DELETE CASCADE,
    muscle_id VARCHAR(100) NOT NULL REFERENCES public.muscles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    muscle_head_id VARCHAR(100) REFERENCES public.muscle_heads(id) ON UPDATE CASCADE ON DELETE SET NULL,
    role VARCHAR(20) NOT NULL, -- primary, secondary, stabiliser, incidental
    coefficient NUMERIC(3, 2) NOT NULL DEFAULT 1.00,
    joint_action VARCHAR(100) NOT NULL,
    evidence_category VARCHAR(50) NOT NULL, -- anatomical_evidence, biomechanical_evidence, emg_excitation_evidence, etc.
    confidence NUMERIC(3, 2) NOT NULL DEFAULT 0.50,
    notes TEXT,
    reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_exercise_muscle_head UNIQUE (exercise_id, muscle_id, muscle_head_id),
    CONSTRAINT chk_muscle_role CHECK (role IN ('primary', 'secondary', 'stabiliser', 'incidental')),
    CONSTRAINT chk_coefficient_range CHECK (coefficient >= 0.0 AND coefficient <= 1.0),
    CONSTRAINT chk_confidence_range CHECK (confidence >= 0.0 AND confidence <= 1.0),
    CONSTRAINT chk_evidence_category CHECK (evidence_category IN (
        'anatomical_evidence',
        'biomechanical_evidence',
        'emg_excitation_evidence',
        'muscle_force_estimation',
        'longitudinal_hypertrophy',
        'strength_performance',
        'fatigue_recovery',
        'expert_inference'
    ))
);

CREATE INDEX IF NOT EXISTS idx_exercise_muscles_exercise ON public.exercise_muscles(exercise_id);
CREATE INDEX IF NOT EXISTS idx_exercise_muscles_muscle ON public.exercise_muscles(muscle_id);
CREATE INDEX IF NOT EXISTS idx_exercise_muscles_role ON public.exercise_muscles(role);

-- 5. Exercise Variations (Alternative grips, foot placements, leverages)
CREATE TABLE IF NOT EXISTS public.exercise_variations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    base_exercise_id VARCHAR(100) NOT NULL REFERENCES public.exercises(id) ON UPDATE CASCADE ON DELETE CASCADE,
    variation_exercise_id VARCHAR(100) NOT NULL REFERENCES public.exercises(id) ON UPDATE CASCADE ON DELETE CASCADE,
    variation_type VARCHAR(50) NOT NULL, -- grip_width, stance, elevation, tempo, leverage
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_exercise_variation UNIQUE (base_exercise_id, variation_exercise_id)
);

-- 6. Exercise Prerequisites (Required strength/mobility/tolerance before attempting)
CREATE TABLE IF NOT EXISTS public.exercise_prerequisites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exercise_id VARCHAR(100) NOT NULL REFERENCES public.exercises(id) ON UPDATE CASCADE ON DELETE CASCADE,
    prerequisite_exercise_id VARCHAR(100) REFERENCES public.exercises(id) ON UPDATE CASCADE ON DELETE CASCADE,
    custom_condition TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_exercise_prereq_exercise ON public.exercise_prerequisites(exercise_id);

-- 7. Exercise Regressions (Easier stepping stones if current exercise is too difficult)
CREATE TABLE IF NOT EXISTS public.exercise_regressions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exercise_id VARCHAR(100) NOT NULL REFERENCES public.exercises(id) ON UPDATE CASCADE ON DELETE CASCADE,
    regression_exercise_id VARCHAR(100) NOT NULL REFERENCES public.exercises(id) ON UPDATE CASCADE ON DELETE CASCADE,
    order_index INTEGER NOT NULL DEFAULT 1,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_exercise_regression UNIQUE (exercise_id, regression_exercise_id)
);

CREATE INDEX IF NOT EXISTS idx_exercise_regressions_exercise ON public.exercise_regressions(exercise_id);
