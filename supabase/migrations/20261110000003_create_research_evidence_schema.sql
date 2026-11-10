-- Migration 3: Research & Evidence Schema
-- Muscle Intelligence — Cross-Platform Scientific Data Foundation

-- 1. Source Licenses (Governing open data, models, and texts)
CREATE TABLE IF NOT EXISTS public.source_licenses (
    id VARCHAR(50) PRIMARY KEY, -- MIT, Apache-2.0, CC-BY-4.0, CC-BY-SA-3.0, CC0-1.0
    full_name VARCHAR(150) NOT NULL,
    is_commercial_allowed BOOLEAN NOT NULL DEFAULT TRUE,
    requires_share_alike BOOLEAN NOT NULL DEFAULT FALSE,
    requires_attribution BOOLEAN NOT NULL DEFAULT TRUE,
    is_copyleft_viral BOOLEAN NOT NULL DEFAULT FALSE,
    license_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. External Sources (Registries of external origin databases and archives)
CREATE TABLE IF NOT EXISTS public.external_sources (
    id VARCHAR(50) PRIMARY KEY, -- kinetic, wger, openalex, crossref, pubmed, epic_lab
    license_id VARCHAR(50) NOT NULL REFERENCES public.source_licenses(id) ON UPDATE CASCADE,
    name VARCHAR(150) NOT NULL,
    url TEXT NOT NULL,
    attribution_text TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Research Studies (Canonical Bibliographic Index)
CREATE TABLE IF NOT EXISTS public.research_studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_source_id VARCHAR(50) REFERENCES public.external_sources(id) ON UPDATE CASCADE,
    external_record_id VARCHAR(150),
    doi VARCHAR(150) UNIQUE,
    pmid VARCHAR(50),
    openalex_id VARCHAR(100),
    title TEXT NOT NULL,
    authors TEXT[] NOT NULL DEFAULT '{}',
    publication_year INTEGER NOT NULL,
    journal VARCHAR(200),
    volume VARCHAR(50),
    issue VARCHAR(50),
    pages VARCHAR(50),
    abstract TEXT,
    study_type VARCHAR(100), -- randomized_controlled_trial, cross_sectional_emg, biomechanical_simulation, systematic_review
    open_access_url TEXT,
    is_open_access BOOLEAN NOT NULL DEFAULT FALSE,
    is_peer_reviewed BOOLEAN NOT NULL DEFAULT TRUE,
    evidence_category VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT chk_study_evidence_category CHECK (evidence_category IN (
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

CREATE INDEX IF NOT EXISTS idx_research_studies_doi ON public.research_studies(doi);
CREATE INDEX IF NOT EXISTS idx_research_studies_pmid ON public.research_studies(pmid);
CREATE INDEX IF NOT EXISTS idx_research_studies_year ON public.research_studies(publication_year);

-- 4. Study Protocols (Subject Characteristics, Equipment, Experimental Conditions)
CREATE TABLE IF NOT EXISTS public.study_protocols (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    study_id UUID NOT NULL REFERENCES public.research_studies(id) ON UPDATE CASCADE ON DELETE CASCADE,
    sample_size INTEGER,
    male_participants INTEGER,
    female_participants INTEGER,
    training_status VARCHAR(100), -- trained, untrained, recreationally_active, elite
    age_mean NUMERIC(4, 1),
    age_sd NUMERIC(4, 1),
    electrode_brand_model VARCHAR(150),
    emg_normalization_method VARCHAR(150), -- mvic, submaximal, peak_dynamic
    sampling_rate_hz INTEGER,
    filtering_protocol TEXT,
    movement_tempo VARCHAR(50),
    range_of_motion_specification TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_study_protocols_study_id ON public.study_protocols(study_id);

-- 5. Study Findings (High-level Statistical Results and Syntheses)
CREATE TABLE IF NOT EXISTS public.study_findings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    study_id UUID NOT NULL REFERENCES public.research_studies(id) ON UPDATE CASCADE ON DELETE CASCADE,
    exercise_name VARCHAR(150),
    target_muscle_or_group VARCHAR(150),
    finding_text TEXT NOT NULL,
    effect_size VARCHAR(100),
    statistical_significance VARCHAR(100), -- p < 0.05, p < 0.01, ns
    methodological_limitations TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_study_findings_study_id ON public.study_findings(study_id);

-- 6. Evidence Measurements (Raw or Aggregated Experimental Measurement Values)
CREATE TABLE IF NOT EXISTS public.evidence_measurements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    study_finding_id UUID NOT NULL REFERENCES public.study_findings(id) ON UPDATE CASCADE ON DELETE CASCADE,
    metric_name VARCHAR(100) NOT NULL, -- emg_mean_percent_mvic, peak_torque_nm, ground_reaction_force_bw_percent
    metric_value NUMERIC(10, 4) NOT NULL,
    metric_variance NUMERIC(10, 4), -- standard deviation or standard error
    metric_unit VARCHAR(50) NOT NULL, -- percent_mvic, nm, percent_bw, degrees, watts
    measurement_phase VARCHAR(100), -- concentric, eccentric, isometric, peak, mean
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_evidence_measurements_finding ON public.evidence_measurements(study_finding_id);

-- 7. Exercise Muscle Evidence (Direct Many-to-Many Linking Studies to Canonical Mappings)
CREATE TABLE IF NOT EXISTS public.exercise_muscle_evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exercise_muscle_id UUID NOT NULL REFERENCES public.exercise_muscles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    study_id UUID NOT NULL REFERENCES public.research_studies(id) ON UPDATE CASCADE ON DELETE CASCADE,
    reported_relationship VARCHAR(100) NOT NULL, -- agonist, synergist, low_activation, antagonist
    confidence_contribution NUMERIC(3, 2) NOT NULL DEFAULT 0.80,
    evidence_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_exercise_muscle_study UNIQUE (exercise_muscle_id, study_id)
);

CREATE INDEX IF NOT EXISTS idx_eme_exercise_muscle ON public.exercise_muscle_evidence(exercise_muscle_id);
CREATE INDEX IF NOT EXISTS idx_eme_study ON public.exercise_muscle_evidence(study_id);

-- 8. Evidence Reviews (Staging Table for Human Scientific Review Queue)
CREATE TABLE IF NOT EXISTS public.evidence_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    external_source_id VARCHAR(50) NOT NULL REFERENCES public.external_sources(id) ON UPDATE CASCADE,
    original_record_id VARCHAR(150) NOT NULL,
    candidate_exercise_name VARCHAR(150) NOT NULL,
    candidate_payload JSONB NOT NULL,
    mapped_canonical_id VARCHAR(100) REFERENCES public.exercises(id) ON UPDATE CASCADE ON DELETE SET NULL,
    suggested_similarity_score NUMERIC(4, 3),
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, approved, rejected, modified
    conflict_summary TEXT,
    reviewer_notes TEXT,
    reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    resolved_at TIMESTAMPTZ,
    CONSTRAINT chk_review_status CHECK (status IN ('pending', 'approved', 'rejected', 'modified'))
);

CREATE INDEX IF NOT EXISTS idx_evidence_reviews_status ON public.evidence_reviews(status);
CREATE INDEX IF NOT EXISTS idx_evidence_reviews_source ON public.evidence_reviews(external_source_id);
