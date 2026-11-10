// Validation Engine & Schema Integrity Verification
import { Exercise, ExerciseMuscleMapping, ScientificEvidenceCategory } from '@muscle-intelligence/domain';

export interface ValidationIssue {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationReport {
  isValid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

const VALID_CATEGORIES = new Set(['cardio', 'pull', 'core', 'push', 'legs', 'mobility', 'accessory']);
const VALID_EVIDENCE_CATEGORIES = new Set<ScientificEvidenceCategory>([
  'anatomical_evidence',
  'biomechanical_evidence',
  'emg_excitation_evidence',
  'muscle_force_estimation',
  'longitudinal_hypertrophy',
  'strength_performance',
  'fatigue_recovery',
  'expert_inference',
]);

export class ExerciseValidator {
  public static validate(exercise: Exercise): ValidationReport {
    const errors: ValidationIssue[] = [];
    const warnings: ValidationIssue[] = [];

    // ID check
    if (!exercise.id || exercise.id.trim().length === 0) {
      errors.push({ field: 'id', message: 'Exercise must have a non-empty canonical ID slug.', severity: 'error' });
    } else if (!/^[a-z0-9_]+$/.test(exercise.id)) {
      errors.push({ field: 'id', message: `ID "${exercise.id}" must only contain lowercase alphanumeric characters and underscores.`, severity: 'error' });
    }

    // Name check
    if (!exercise.name || exercise.name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Exercise must have a human-readable title.', severity: 'error' });
    }

    // Category check
    if (!VALID_CATEGORIES.has(exercise.category)) {
      errors.push({ field: 'category', message: `Invalid exercise category "${exercise.category}".`, severity: 'error' });
    }

    // Instructions check
    if (!exercise.instructions || exercise.instructions.trim().length < 10) {
      warnings.push({ field: 'instructions', message: 'Instructions are brief or missing detailed coaching cues.', severity: 'warning' });
    }

    // Muscle Mappings check
    if (!exercise.muscleMappings || exercise.muscleMappings.length === 0) {
      errors.push({ field: 'muscleMappings', message: 'Exercise must have at least one muscle mapping.', severity: 'error' });
    } else {
      let hasPrimary = false;
      exercise.muscleMappings.forEach((m, idx) => {
        const mappingErrors = this.validateMapping(m, idx);
        errors.push(...mappingErrors.errors);
        warnings.push(...mappingErrors.warnings);
        if (m.role === 'primary') hasPrimary = true;
      });

      if (!hasPrimary) {
        warnings.push({ field: 'muscleMappings', message: 'Exercise has no designated "primary" mover.', severity: 'warning' });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  public static validateMapping(mapping: ExerciseMuscleMapping, index: number): { errors: ValidationIssue[]; warnings: ValidationIssue[] } {
    const errors: ValidationIssue[] = [];
    const warnings: ValidationIssue[] = [];

    if (!mapping.muscleId) {
      errors.push({ field: `muscleMappings[${index}].muscleId`, message: 'Muscle ID is required.', severity: 'error' });
    }

    if (mapping.coefficient < 0.0 || mapping.coefficient > 1.0) {
      errors.push({ field: `muscleMappings[${index}].coefficient`, message: `Coefficient ${mapping.coefficient} must be between 0.0 and 1.0.`, severity: 'error' });
    }

    if (!VALID_EVIDENCE_CATEGORIES.has(mapping.evidenceCategory)) {
      errors.push({
        field: `muscleMappings[${index}].evidenceCategory`,
        message: `Invalid evidence category "${mapping.evidenceCategory}". Must match one of the 8 canonical categories.`,
        severity: 'error',
      });
    }

    if (!mapping.jointAction || mapping.jointAction.trim().length === 0) {
      warnings.push({ field: `muscleMappings[${index}].jointAction`, message: 'Joint action description is missing.', severity: 'warning' });
    }

    return { errors, warnings };
  }
}
