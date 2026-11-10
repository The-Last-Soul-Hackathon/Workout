-- Migration 4: Calculation Engine Schema
-- Muscle Intelligence — Cross-Platform Scientific Data Foundation

-- 1. Model Versions (Formal Versioning of Calculation Formulas and Algorithms)
CREATE TABLE IF NOT EXISTS public.model_versions (
    id VARCHAR(50) PRIMARY KEY, -- weekly_exposure_v1.0, joint_torque_v1.0, work_power_v1.0, rir_estimator_v1.0
    name VARCHAR(150) NOT NULL,
    domain VARCHAR(50) NOT NULL, -- exposure, biomechanics, fatigue, progression
    version_tag VARCHAR(20) NOT NULL,
    formula_definition TEXT NOT NULL,
    latex_representation TEXT,
    scientific_basis TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Model Parameters (Configurable Numerical Constants, Coefficients, and Thresholds)
CREATE TABLE IF NOT EXISTS public.model_parameters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_version_id VARCHAR(50) NOT NULL REFERENCES public.model_versions(id) ON UPDATE CASCADE ON DELETE CASCADE,
    parameter_key VARCHAR(100) NOT NULL,
    parameter_value NUMERIC(10, 4) NOT NULL,
    unit VARCHAR(50),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_model_param UNIQUE (model_version_id, parameter_key)
);

CREATE INDEX IF NOT EXISTS idx_model_parameters_version ON public.model_parameters(model_version_id);

-- 3. Model Outputs (Auditable Record of Calculation Engine Executions)
CREATE TABLE IF NOT EXISTS public.model_outputs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_version_id VARCHAR(50) NOT NULL REFERENCES public.model_versions(id) ON UPDATE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id UUID,
    input_payload JSONB NOT NULL,
    output_payload JSONB NOT NULL,
    unit VARCHAR(50) NOT NULL,
    confidence VARCHAR(20) NOT NULL DEFAULT 'moderate', -- high, moderate, low, unknown
    classification VARCHAR(50) NOT NULL DEFAULT 'modelled', -- measured, user_reported, evidence_derived, modelled, assumed
    assumptions TEXT[] NOT NULL DEFAULT '{}',
    source_ids TEXT[] NOT NULL DEFAULT '{}',
    generated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT chk_output_confidence CHECK (confidence IN ('high', 'moderate', 'low', 'unknown')),
    CONSTRAINT chk_output_classification CHECK (classification IN ('measured', 'user_reported', 'evidence_derived', 'modelled', 'assumed'))
);

CREATE INDEX IF NOT EXISTS idx_model_outputs_user ON public.model_outputs(user_id);
CREATE INDEX IF NOT EXISTS idx_model_outputs_version ON public.model_outputs(model_version_id);

-- 4. Model Validation (Regression Test Cases and Gold-Standard Benchmarks)
CREATE TABLE IF NOT EXISTS public.model_validation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_version_id VARCHAR(50) NOT NULL REFERENCES public.model_versions(id) ON UPDATE CASCADE,
    test_case_name VARCHAR(150) NOT NULL,
    description TEXT,
    benchmark_source VARCHAR(150) NOT NULL,
    input_fixture JSONB NOT NULL,
    expected_output JSONB NOT NULL,
    tolerance_threshold NUMERIC(6, 4) NOT NULL DEFAULT 0.0100,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_model_validation_version ON public.model_validation(model_version_id);
