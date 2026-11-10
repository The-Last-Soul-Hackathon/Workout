-- MUSCLE INTELLIGENCE CORE DATABASE SCHEMA
-- PostgreSQL + Supabase with Row Level Security (RLS)

-- 1. Reference Anatomy Taxonomy
CREATE TABLE IF NOT EXISTS public.muscles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    latin_name TEXT,
    region TEXT NOT NULL,
    description TEXT NOT NULL,
    actions JSONB NOT NULL DEFAULT '[]',
    anatomical_heads JSONB DEFAULT '[]',
    laterality_supported BOOLEAN NOT NULL DEFAULT true,
    default_target_min NUMERIC NOT NULL DEFAULT 8,
    default_target_max NUMERIC NOT NULL DEFAULT 16,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Movement Patterns
CREATE TABLE IF NOT EXISTS public.movement_patterns (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

-- 3. Exercise Library
CREATE TABLE IF NOT EXISTS public.exercises (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    movement_patterns JSONB NOT NULL DEFAULT '[]',
    difficulty TEXT NOT NULL,
    equipment JSONB NOT NULL DEFAULT '[]',
    default_unit TEXT NOT NULL DEFAULT 'reps',
    unilateral BOOLEAN NOT NULL DEFAULT false,
    instructions TEXT NOT NULL,
    prerequisites JSONB DEFAULT '[]',
    regressions JSONB DEFAULT '[]',
    progressions JSONB DEFAULT '[]',
    safety_cautions TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Exercise-to-Muscle Mappings (Evidence-backed)
CREATE TABLE IF NOT EXISTS public.exercise_muscles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exercise_id TEXT NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
    muscle_id TEXT NOT NULL REFERENCES public.muscles(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('primary', 'synergist', 'secondary', 'stabiliser', 'incidental')),
    coefficient NUMERIC NOT NULL CHECK (coefficient >= 0 AND coefficient <= 1.0),
    joint_action TEXT NOT NULL,
    evidence_type TEXT NOT NULL,
    confidence TEXT NOT NULL CHECK (confidence IN ('high', 'moderate', 'low', 'unknown')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Round Templates (Rounds 1-26 and user custom rounds)
CREATE TABLE IF NOT EXISTS public.round_templates (
    id TEXT PRIMARY KEY,
    round_number INTEGER,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- NULL for canonical rounds
    is_canonical BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.round_exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    round_id TEXT NOT NULL REFERENCES public.round_templates(id) ON DELETE CASCADE,
    exercise_id TEXT NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    sequence INTEGER NOT NULL,
    default_value NUMERIC NOT NULL,
    unit TEXT NOT NULL,
    side_rule TEXT NOT NULL DEFAULT 'bilateral'
);

-- 6. User Workout Sessions
CREATE TABLE IF NOT EXISTS public.workout_sessions (
    id TEXT PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    round_template_id TEXT REFERENCES public.round_templates(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    started_at TIMESTAMPTZ NOT NULL,
    ended_at TIMESTAMPTZ,
    duration_seconds INTEGER,
    notes TEXT,
    completed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. User Set Logs
CREATE TABLE IF NOT EXISTS public.set_logs (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL REFERENCES public.workout_sessions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    exercise_id TEXT NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
    set_number INTEGER NOT NULL,
    reps INTEGER,
    hold_seconds INTEGER,
    side TEXT NOT NULL DEFAULT 'bilateral',
    rir INTEGER,
    rpe NUMERIC,
    rest_seconds INTEGER DEFAULT 90,
    technique_quality TEXT NOT NULL DEFAULT 'good',
    notes TEXT,
    completed_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ROW LEVEL SECURITY (RLS) POLICIES

ALTER TABLE public.muscles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.movement_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_muscles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.round_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.round_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.set_logs ENABLE ROW LEVEL SECURITY;

-- Canonical reference tables: readable by everyone
CREATE POLICY "Public read for muscles" ON public.muscles FOR SELECT USING (true);
CREATE POLICY "Public read for patterns" ON public.movement_patterns FOR SELECT USING (true);
CREATE POLICY "Public read for exercises" ON public.exercises FOR SELECT USING (true);
CREATE POLICY "Public read for exercise_muscles" ON public.exercise_muscles FOR SELECT USING (true);

-- Round templates: readable if canonical or owned by current user
CREATE POLICY "Read round templates" ON public.round_templates
    FOR SELECT USING (is_canonical = true OR auth.uid() = user_id);

CREATE POLICY "Insert round templates" ON public.round_templates
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Update round templates" ON public.round_templates
    FOR UPDATE USING (auth.uid() = user_id);

-- User workout sessions: user isolated
CREATE POLICY "User sessions select" ON public.workout_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "User sessions insert" ON public.workout_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User sessions update" ON public.workout_sessions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "User sessions delete" ON public.workout_sessions
    FOR DELETE USING (auth.uid() = user_id);

-- User set logs: user isolated
CREATE POLICY "User set logs select" ON public.set_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "User set logs insert" ON public.set_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User set logs update" ON public.set_logs
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "User set logs delete" ON public.set_logs
    FOR DELETE USING (auth.uid() = user_id);
