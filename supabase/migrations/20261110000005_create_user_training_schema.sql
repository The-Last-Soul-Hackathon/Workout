-- Migration 5: User Training & Templates Schema
-- Muscle Intelligence — Cross-Platform Scientific Data Foundation

-- 1. Round Templates (The 26 Reusable Rounds & User Custom Circuits)
CREATE TABLE IF NOT EXISTS public.round_templates (
    id VARCHAR(50) PRIMARY KEY, -- round_01, round_02, ..., round_26, or UUID for user custom
    round_number INTEGER,
    name VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL, -- strength_conditioning, mobility, accessory_balance
    description TEXT,
    is_canonical BOOLEAN NOT NULL DEFAULT TRUE,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT chk_round_type CHECK (type IN ('strength_conditioning', 'mobility', 'accessory_balance'))
);

CREATE INDEX IF NOT EXISTS idx_round_templates_canonical ON public.round_templates(is_canonical);
CREATE INDEX IF NOT EXISTS idx_round_templates_type ON public.round_templates(type);

-- 2. Round Exercises (Structured Exercise Slots within Templates)
CREATE TABLE IF NOT EXISTS public.round_exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    round_template_id VARCHAR(50) NOT NULL REFERENCES public.round_templates(id) ON UPDATE CASCADE ON DELETE CASCADE,
    exercise_id VARCHAR(100) NOT NULL REFERENCES public.exercises(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    category VARCHAR(50) NOT NULL, -- cardio, pull, core, push, legs, mobility, accessory
    sequence INTEGER NOT NULL,
    default_value NUMERIC(6, 2) NOT NULL,
    unit VARCHAR(20) NOT NULL DEFAULT 'reps', -- reps, seconds, meters, flights
    side_rule VARCHAR(30) NOT NULL DEFAULT 'bilateral', -- bilateral, each_side, alternating
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_round_exercise_seq UNIQUE (round_template_id, sequence),
    CONSTRAINT chk_round_ex_unit CHECK (unit IN ('reps', 'seconds', 'meters', 'flights')),
    CONSTRAINT chk_round_ex_side CHECK (side_rule IN ('bilateral', 'each_side', 'alternating'))
);

CREATE INDEX IF NOT EXISTS idx_round_exercises_template ON public.round_exercises(round_template_id);
CREATE INDEX IF NOT EXISTS idx_round_exercises_exercise ON public.round_exercises(exercise_id);

-- 3. Workout Plans (Multi-Week Periodised User Plans)
CREATE TABLE IF NOT EXISTS public.workout_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    days_per_week INTEGER NOT NULL DEFAULT 4,
    target_focus VARCHAR(100), -- hypertrophy, strength, muscular_endurance, general_fitness
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_workout_plans_user ON public.workout_plans(user_id);

-- 4. Workout Sessions (Executed Live Workouts)
CREATE TABLE IF NOT EXISTS public.workout_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    workout_plan_id UUID REFERENCES public.workout_plans(id) ON DELETE SET NULL,
    round_template_id VARCHAR(50) REFERENCES public.round_templates(id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    started_at TIMESTAMPTZ NOT NULL,
    ended_at TIMESTAMPTZ,
    duration_seconds INTEGER,
    notes TEXT,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_workout_sessions_user ON public.workout_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_sessions_started ON public.workout_sessions(started_at);

-- 5. Set Logs (Individual Set Executions with Effort and Quality Metrics)
CREATE TABLE IF NOT EXISTS public.set_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.workout_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    exercise_id VARCHAR(100) NOT NULL REFERENCES public.exercises(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    set_number INTEGER NOT NULL,
    reps INTEGER,
    hold_seconds NUMERIC(5, 1),
    distance_meters NUMERIC(6, 2),
    flights_climbed NUMERIC(4, 1),
    side VARCHAR(20) NOT NULL DEFAULT 'bilateral', -- bilateral, left, right
    rir NUMERIC(3, 1), -- Repetitions in Reserve (0.0 to 5.0)
    rpe NUMERIC(3, 1), -- Rating of Perceived Exertion (1.0 to 10.0)
    rest_seconds INTEGER,
    technique_quality VARCHAR(30) NOT NULL DEFAULT 'good', -- good, acceptable, degraded
    notes TEXT,
    completed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT chk_set_side CHECK (side IN ('bilateral', 'left', 'right')),
    CONSTRAINT chk_set_quality CHECK (technique_quality IN ('good', 'acceptable', 'degraded')),
    CONSTRAINT chk_set_rir CHECK (rir IS NULL OR (rir >= 0.0 AND rir <= 10.0)),
    CONSTRAINT chk_set_rpe CHECK (rpe IS NULL OR (rpe >= 1.0 AND rpe <= 10.0))
);

CREATE INDEX IF NOT EXISTS idx_set_logs_session ON public.set_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_set_logs_user_exercise ON public.set_logs(user_id, exercise_id);
CREATE INDEX IF NOT EXISTS idx_set_logs_completed_at ON public.set_logs(completed_at);

-- 6. Muscle Targets (Personalised Target Volume Bounds per Muscle)
CREATE TABLE IF NOT EXISTS public.muscle_targets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    muscle_id VARCHAR(100) NOT NULL REFERENCES public.muscles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    weekly_target_min NUMERIC(4, 1) NOT NULL,
    weekly_target_max NUMERIC(4, 1) NOT NULL,
    custom_notes TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_user_muscle_target UNIQUE (user_id, muscle_id)
);

CREATE INDEX IF NOT EXISTS idx_muscle_targets_user ON public.muscle_targets(user_id);

-- 7. Muscle Exposure Snapshots (Weekly Direct & Indirect Exposure Snapshots)
CREATE TABLE IF NOT EXISTS public.muscle_exposure_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    snapshot_date DATE NOT NULL,
    muscle_id VARCHAR(100) NOT NULL REFERENCES public.muscles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    direct_sets NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    indirect_sets NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    total_exposure NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(30) NOT NULL DEFAULT 'not_assessed', -- below_target, in_target, above_target, not_assessed
    target_min NUMERIC(4, 1) NOT NULL,
    target_max NUMERIC(4, 1) NOT NULL,
    contributing_exercise_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_user_date_muscle_snapshot UNIQUE (user_id, snapshot_date, muscle_id),
    CONSTRAINT chk_exposure_status CHECK (status IN ('below_target', 'in_target', 'above_target', 'not_assessed'))
);

CREATE INDEX IF NOT EXISTS idx_muscle_exposure_user_date ON public.muscle_exposure_snapshots(user_id, snapshot_date);
