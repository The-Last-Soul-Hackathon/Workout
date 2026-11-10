-- Migration 1: Anatomy Domain Schema
-- Muscle Intelligence — Cross-Platform Scientific Data Foundation

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Muscle Groups (Primary Body Regions)
CREATE TABLE IF NOT EXISTS public.muscle_groups (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Muscles (Anatomical Units & Functional Complexes)
CREATE TABLE IF NOT EXISTS public.muscles (
    id VARCHAR(100) PRIMARY KEY,
    muscle_group_id VARCHAR(50) NOT NULL REFERENCES public.muscle_groups(id) ON UPDATE CASCADE,
    name VARCHAR(150) NOT NULL,
    latin_name VARCHAR(150),
    fma_id VARCHAR(50), -- Foundational Model of Anatomy identifier
    description TEXT NOT NULL,
    origin TEXT,
    insertion TEXT,
    innervation TEXT,
    laterality_supported BOOLEAN NOT NULL DEFAULT TRUE,
    default_weekly_target_min NUMERIC(4, 1) NOT NULL DEFAULT 8.0,
    default_weekly_target_max NUMERIC(4, 1) NOT NULL DEFAULT 16.0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for parent group lookups
CREATE INDEX IF NOT EXISTS idx_muscles_group_id ON public.muscles(muscle_group_id);

-- 3. Muscle Heads (Subdivisions & Bellies)
CREATE TABLE IF NOT EXISTS public.muscle_heads (
    id VARCHAR(100) PRIMARY KEY,
    muscle_id VARCHAR(100) NOT NULL REFERENCES public.muscles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    latin_name VARCHAR(150),
    fiber_orientation VARCHAR(100),
    origin TEXT,
    insertion TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_muscle_heads_muscle_id ON public.muscle_heads(muscle_id);

-- 4. Anatomical Actions (Joint Action Capabilities)
CREATE TABLE IF NOT EXISTS public.anatomical_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    muscle_id VARCHAR(100) NOT NULL REFERENCES public.muscles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    joint_action VARCHAR(100) NOT NULL,
    leverage_advantage VARCHAR(50) DEFAULT 'primary_agonist',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_anatomical_actions_muscle_id ON public.anatomical_actions(muscle_id);

-- 5. Anatomical Structures (2D Vector SVG & 3D Spatial Geometry Mapping)
CREATE TABLE IF NOT EXISTS public.anatomical_structures (
    id VARCHAR(100) PRIMARY KEY,
    muscle_id VARCHAR(100) NOT NULL REFERENCES public.muscles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    svg_element_id_front VARCHAR(100),
    svg_element_id_back VARCHAR(100),
    mesh_identifier_3d VARCHAR(100),
    centroid_x_norm NUMERIC(5, 4),
    centroid_y_norm NUMERIC(5, 4),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_anatomical_structures_muscle_id ON public.anatomical_structures(muscle_id);
