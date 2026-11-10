-- Migration 7: Database Integrity Constraints & Security Architect Corrections
-- Muscle Intelligence — Repository Correction Sprint

-- 1. Correct RIR Inconsistency and Set Log Numeric Validation Constraints
-- Drop previous loose RIR constraint (which allowed 0-10) and replace with scientific (0-5)
ALTER TABLE public.set_logs DROP CONSTRAINT IF EXISTS chk_set_rir;
ALTER TABLE public.set_logs ADD CONSTRAINT chk_set_rir CHECK (rir IS NULL OR (rir >= 0.0 AND rir <= 5.0));

-- Add explicit numeric validation constraints on set_logs to prevent invalid or corrupted training records
ALTER TABLE public.set_logs DROP CONSTRAINT IF EXISTS chk_set_number_positive;
ALTER TABLE public.set_logs ADD CONSTRAINT chk_set_number_positive CHECK (set_number > 0);

ALTER TABLE public.set_logs DROP CONSTRAINT IF EXISTS chk_set_reps_valid;
ALTER TABLE public.set_logs ADD CONSTRAINT chk_set_reps_valid CHECK (reps IS NULL OR (reps > 0 AND reps <= 1000));

ALTER TABLE public.set_logs DROP CONSTRAINT IF EXISTS chk_set_hold_seconds_valid;
ALTER TABLE public.set_logs ADD CONSTRAINT chk_set_hold_seconds_valid CHECK (hold_seconds IS NULL OR (hold_seconds > 0.0 AND hold_seconds <= 86400.0));

ALTER TABLE public.set_logs DROP CONSTRAINT IF EXISTS chk_set_distance_valid;
ALTER TABLE public.set_logs ADD CONSTRAINT chk_set_distance_valid CHECK (distance_meters IS NULL OR (distance_meters > 0.0 AND distance_meters <= 100000.0));

ALTER TABLE public.set_logs DROP CONSTRAINT IF EXISTS chk_set_flights_valid;
ALTER TABLE public.set_logs ADD CONSTRAINT chk_set_flights_valid CHECK (flights_climbed IS NULL OR (flights_climbed > 0.0 AND flights_climbed <= 2000.0));

ALTER TABLE public.set_logs DROP CONSTRAINT IF EXISTS chk_set_rest_seconds_valid;
ALTER TABLE public.set_logs ADD CONSTRAINT chk_set_rest_seconds_valid CHECK (rest_seconds IS NULL OR (rest_seconds >= 0 AND rest_seconds <= 3600));

-- Allow 'both_sides' in side column constraint for combined unilateral logging
ALTER TABLE public.set_logs DROP CONSTRAINT IF EXISTS chk_set_side;
ALTER TABLE public.set_logs ADD CONSTRAINT chk_set_side CHECK (side IN ('bilateral', 'left', 'right', 'both_sides'));

-- 2. Add Missing Numeric Bounds on Muscle Targets
ALTER TABLE public.muscle_targets DROP CONSTRAINT IF EXISTS chk_target_bounds;
ALTER TABLE public.muscle_targets ADD CONSTRAINT chk_target_bounds CHECK (weekly_target_min >= 0.0 AND weekly_target_max >= weekly_target_min);

-- 3. Correct Muscle Role Inconsistency to include 'synergist'
ALTER TABLE public.exercise_muscles DROP CONSTRAINT IF EXISTS chk_muscle_role;
ALTER TABLE public.exercise_muscles ADD CONSTRAINT chk_muscle_role CHECK (role IN ('primary', 'secondary', 'synergist', 'stabiliser', 'incidental'));

-- 4. Enforce Session / Set User Ownership Consistency
-- Create a trigger function that validates set_logs.user_id matches workout_sessions.user_id
CREATE OR REPLACE FUNCTION public.fn_validate_set_log_user_ownership()
RETURNS TRIGGER AS $$
DECLARE
    session_owner UUID;
BEGIN
    SELECT user_id INTO session_owner FROM public.workout_sessions WHERE id = NEW.session_id;
    IF session_owner IS NULL THEN
        RAISE EXCEPTION 'Target workout session % does not exist', NEW.session_id;
    END IF;
    IF session_owner <> NEW.user_id THEN
        RAISE EXCEPTION 'Ownership mismatch: set_log user_id (%) does not match session owner (%)', NEW.user_id, session_owner;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_validate_set_log_user_ownership ON public.set_logs;
CREATE TRIGGER trg_validate_set_log_user_ownership
    BEFORE INSERT OR UPDATE ON public.set_logs
    FOR EACH ROW
    EXECUTE FUNCTION public.fn_validate_set_log_user_ownership();

-- 5. RLS Security: Custom Round Child-Row Visibility & Mutation
-- Drop overly permissive public read on round_exercises
DROP POLICY IF EXISTS "Public read-only access for round_exercises" ON public.round_exercises;

-- Users can SELECT round_exercises only if parent template is canonical OR created by current user
CREATE POLICY "Read access for round_exercises: canonical or owned"
    ON public.round_exercises FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.round_templates rt
            WHERE rt.id = round_exercises.round_template_id
              AND (rt.is_canonical = true OR rt.created_by = auth.uid())
        )
    );

-- Users can INSERT/UPDATE/DELETE round_exercises only on their own custom templates
CREATE POLICY "Users can insert round_exercises for own templates"
    ON public.round_exercises FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.round_templates rt
            WHERE rt.id = round_exercises.round_template_id
              AND rt.created_by = auth.uid()
              AND rt.is_canonical = false
        )
    );

CREATE POLICY "Users can update round_exercises for own templates"
    ON public.round_exercises FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.round_templates rt
            WHERE rt.id = round_exercises.round_template_id
              AND rt.created_by = auth.uid()
              AND rt.is_canonical = false
        )
    );

CREATE POLICY "Users can delete round_exercises for own templates"
    ON public.round_exercises FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.round_templates rt
            WHERE rt.id = round_exercises.round_template_id
              AND rt.created_by = auth.uid()
              AND rt.is_canonical = false
        )
    );

-- 6. RLS Security: Evidence-Review Permissions
-- Drop overly broad ALL policy which allowed any authenticated user to tamper with reviews
DROP POLICY IF EXISTS "Scientific reviewers access for evidence_reviews" ON public.evidence_reviews;

-- Evidence reviews are publicly readable for verified scientific transparency
CREATE POLICY "Public read access for verified evidence_reviews"
    ON public.evidence_reviews FOR SELECT
    USING (true);

-- Only authenticated users with verified reviewer role (or service_role) can insert/update evidence reviews
CREATE POLICY "Reviewers can insert evidence_reviews"
    ON public.evidence_reviews FOR INSERT
    WITH CHECK (
        auth.uid() IS NOT NULL AND (
            coalesce((auth.jwt()->>'role'), '') = 'service_role' OR
            coalesce((auth.jwt()->'app_metadata'->>'is_scientific_reviewer')::boolean, false) = true
        )
    );

-- 7. RLS Security: Null-Owned Model-Output Write Access
-- Drop overly permissive INSERT policy which allowed users to insert null-owned outputs
DROP POLICY IF EXISTS "Users can insert own model outputs" ON public.model_outputs;

-- Ordinary authenticated users can only insert model outputs where user_id = auth.uid()
-- Null-owned model outputs (benchmarks / canonical models) can only be created by service_role
CREATE POLICY "Users can insert own model outputs strictly"
    ON public.model_outputs FOR INSERT
    WITH CHECK (
        (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
        (coalesce((auth.jwt()->>'role'), '') = 'service_role' AND user_id IS NULL)
    );

DROP POLICY IF EXISTS "Users can update own model outputs" ON public.model_outputs;
CREATE POLICY "Users can update own model outputs strictly"
    ON public.model_outputs FOR UPDATE
    USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own model outputs" ON public.model_outputs;
CREATE POLICY "Users can delete own model outputs strictly"
    ON public.model_outputs FOR DELETE
    USING (user_id = auth.uid());
