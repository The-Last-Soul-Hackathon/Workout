-- Migration 6: Row Level Security (RLS) Policies & Access Controls
-- Muscle Intelligence — Cross-Platform Scientific Data Foundation

-- Enable Row Level Security on all tables
ALTER TABLE public.muscle_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.muscles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.muscle_heads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anatomical_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anatomical_structures ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.movement_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_movement_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_muscles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_variations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_prerequisites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_regressions ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.source_licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.external_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_muscle_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_reviews ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.model_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_parameters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_outputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_validation ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.round_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.round_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.set_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.muscle_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.muscle_exposure_snapshots ENABLE ROW LEVEL SECURITY;

--------------------------------------------------------------------------------
-- 1. REFERENCE TABLES (CANONICAL DATA: PUBLIC READ-ONLY)
--------------------------------------------------------------------------------

-- Anatomy Policies
CREATE POLICY "Public read-only access for muscle_groups"
    ON public.muscle_groups FOR SELECT
    USING (true);

CREATE POLICY "Public read-only access for muscles"
    ON public.muscles FOR SELECT
    USING (true);

CREATE POLICY "Public read-only access for muscle_heads"
    ON public.muscle_heads FOR SELECT
    USING (true);

CREATE POLICY "Public read-only access for anatomical_actions"
    ON public.anatomical_actions FOR SELECT
    USING (true);

CREATE POLICY "Public read-only access for anatomical_structures"
    ON public.anatomical_structures FOR SELECT
    USING (true);

-- Exercise Catalogue Policies
CREATE POLICY "Public read-only access for movement_patterns"
    ON public.movement_patterns FOR SELECT
    USING (true);

CREATE POLICY "Public read-only access for equipment"
    ON public.equipment FOR SELECT
    USING (true);

CREATE POLICY "Read access for exercises: canonical or user-owned"
    ON public.exercises FOR SELECT
    USING (is_canonical = true OR created_by = auth.uid());

CREATE POLICY "Users can create custom exercises"
    ON public.exercises FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid() AND is_canonical = false);

CREATE POLICY "Users can update their own custom exercises"
    ON public.exercises FOR UPDATE
    USING (created_by = auth.uid() AND is_canonical = false);

CREATE POLICY "Users can delete their own custom exercises"
    ON public.exercises FOR DELETE
    USING (created_by = auth.uid() AND is_canonical = false);

CREATE POLICY "Public read-only access for exercise_movement_patterns"
    ON public.exercise_movement_patterns FOR SELECT
    USING (true);

CREATE POLICY "Public read-only access for exercise_equipment"
    ON public.exercise_equipment FOR SELECT
    USING (true);

CREATE POLICY "Public read-only access for exercise_muscles"
    ON public.exercise_muscles FOR SELECT
    USING (true);

CREATE POLICY "Public read-only access for exercise_variations"
    ON public.exercise_variations FOR SELECT
    USING (true);

CREATE POLICY "Public read-only access for exercise_prerequisites"
    ON public.exercise_prerequisites FOR SELECT
    USING (true);

CREATE POLICY "Public read-only access for exercise_regressions"
    ON public.exercise_regressions FOR SELECT
    USING (true);

-- Research & Evidence Policies
CREATE POLICY "Public read-only access for source_licenses"
    ON public.source_licenses FOR SELECT
    USING (true);

CREATE POLICY "Public read-only access for external_sources"
    ON public.external_sources FOR SELECT
    USING (true);

CREATE POLICY "Public read-only access for research_studies"
    ON public.research_studies FOR SELECT
    USING (true);

CREATE POLICY "Public read-only access for study_protocols"
    ON public.study_protocols FOR SELECT
    USING (true);

CREATE POLICY "Public read-only access for study_findings"
    ON public.study_findings FOR SELECT
    USING (true);

CREATE POLICY "Public read-only access for evidence_measurements"
    ON public.evidence_measurements FOR SELECT
    USING (true);

CREATE POLICY "Public read-only access for exercise_muscle_evidence"
    ON public.exercise_muscle_evidence FOR SELECT
    USING (true);

CREATE POLICY "Scientific reviewers access for evidence_reviews"
    ON public.evidence_reviews FOR ALL
    USING (auth.uid() IS NOT NULL);

-- Calculation Engine Policies
CREATE POLICY "Public read-only access for model_versions"
    ON public.model_versions FOR SELECT
    USING (true);

CREATE POLICY "Public read-only access for model_parameters"
    ON public.model_parameters FOR SELECT
    USING (true);

CREATE POLICY "Public read-only access for model_validation"
    ON public.model_validation FOR SELECT
    USING (true);

CREATE POLICY "Users can read own model outputs"
    ON public.model_outputs FOR SELECT
    USING (user_id IS NULL OR user_id = auth.uid());

CREATE POLICY "Users can insert own model outputs"
    ON public.model_outputs FOR INSERT
    WITH CHECK (user_id IS NULL OR user_id = auth.uid());

-- Templates Policies
CREATE POLICY "Read access for round_templates: canonical or user-owned"
    ON public.round_templates FOR SELECT
    USING (is_canonical = true OR created_by = auth.uid());

CREATE POLICY "Users can create custom round templates"
    ON public.round_templates FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid() AND is_canonical = false);

CREATE POLICY "Users can update own custom round templates"
    ON public.round_templates FOR UPDATE
    USING (created_by = auth.uid() AND is_canonical = false);

CREATE POLICY "Users can delete own custom round templates"
    ON public.round_templates FOR DELETE
    USING (created_by = auth.uid() AND is_canonical = false);

CREATE POLICY "Public read-only access for round_exercises"
    ON public.round_exercises FOR SELECT
    USING (true);

--------------------------------------------------------------------------------
-- 2. USER DATA TABLES (STRICT USER ISOLATION)
--------------------------------------------------------------------------------

-- Workout Plans
CREATE POLICY "Users can CRUD own workout plans"
    ON public.workout_plans FOR ALL
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Workout Sessions
CREATE POLICY "Users can CRUD own workout sessions"
    ON public.workout_sessions FOR ALL
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Set Logs
CREATE POLICY "Users can CRUD own set logs"
    ON public.set_logs FOR ALL
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Muscle Targets
CREATE POLICY "Users can CRUD own muscle targets"
    ON public.muscle_targets FOR ALL
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Muscle Exposure Snapshots
CREATE POLICY "Users can CRUD own exposure snapshots"
    ON public.muscle_exposure_snapshots FOR ALL
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());
