// Canonical Exercise Normaliser
import {
  Exercise,
  ExerciseCategory,
  MovementPattern,
  DifficultyLevel,
  ExerciseMuscleMapping,
} from '@muscle-intelligence/domain';
import { MuscleMapper } from './muscle-mapper';
import { EquipmentMapper } from './equipment-mapper';
import { KineticRawExercise } from '../sources/kinetic/types';

export class ExerciseNormaliser {
  public static normalizeKinetic(raw: KineticRawExercise): Exercise {
    const cleanName = this.normalizeTitle(raw.name);
    const category = this.determineCategory(raw.bodyPart, cleanName);
    const equipment = EquipmentMapper.normalize(raw.equipment);
    const movementPatterns = this.inferMovementPatterns(cleanName, category);
    const difficulty = this.inferDifficulty(cleanName, category);

    // Map primary and secondary muscles
    const primaryMuscle = MuscleMapper.mapTarget(raw.target);
    const secondaryMuscles = MuscleMapper.mapSecondary(raw.secondaryMuscles || []);

    const muscleMappings: ExerciseMuscleMapping[] = [
      {
        muscleId: primaryMuscle.muscleId,
        role: 'primary',
        coefficient: 1.0,
        jointAction: primaryMuscle.jointAction,
        evidenceCategory: 'expert_inference',
        confidence: 'moderate',
        confidenceScore: 0.7,
        notes: `Derived from Kinetic source target: "${raw.target}".`,
      },
      ...secondaryMuscles.map((sec) => ({
        muscleId: sec.muscleId,
        role: sec.role,
        coefficient: sec.coefficient,
        jointAction: sec.jointAction,
        evidenceCategory: 'expert_inference' as const,
        confidence: 'low' as const,
        confidenceScore: 0.5,
        notes: `Derived from Kinetic secondary muscle listing.`,
      })),
    ];

    const instructionsText = (raw.instructions && raw.instructions.length > 0)
      ? raw.instructions.join('\n')
      : `Perform ${cleanName} with controlled tempo and full range of motion.`;

    const canonicalSlug = cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');

    return {
      id: canonicalSlug,
      name: cleanName,
      category,
      primaryCategory: category,
      movementPatterns,
      difficulty,
      equipment,
      defaultUnit: 'reps',
      unilateral: this.isUnilateral(cleanName),
      instructions: instructionsText,
      isCanonical: false,
      muscleMappings,
    };
  }

  public static normalizeTitle(title: string): string {
    return title
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/\bpush\s*up\b/gi, 'Push-up')
      .replace(/\bpull\s*up\b/gi, 'Pull-up')
      .replace(/\bchin\s*up\b/gi, 'Chin-up')
      .replace(/\bv\s*up\b/gi, 'V-up')
      .replace(/\bstep\s*up\b/gi, 'Step-up')
      .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1));
  }

  public static determineCategory(bodyPart: string, name: string): ExerciseCategory {
    const bp = bodyPart.toLowerCase();
    const n = name.toLowerCase();

    if (bp.includes('cardio') || n.includes('jump') || n.includes('sprint') || n.includes('burpee')) return 'cardio';
    if (bp.includes('chest') || n.includes('push-up') || n.includes('dip')) return 'push';
    if (bp.includes('back') || n.includes('pull-up') || n.includes('row') || n.includes('chin-up')) return 'pull';
    if (bp.includes('waist') || n.includes('crunch') || n.includes('plank') || n.includes('v-up')) return 'core';
    if (bp.includes('leg') || n.includes('squat') || n.includes('lunge') || n.includes('calf')) return 'legs';
    if (n.includes('stretch') || n.includes('pose') || n.includes('flow')) return 'mobility';
    return 'accessory';
  }

  public static inferMovementPatterns(name: string, category: ExerciseCategory): MovementPattern[] {
    const n = name.toLowerCase();

    if (n.includes('pull-up') || n.includes('chin-up')) return ['vertical_pull'];
    if (n.includes('row') || n.includes('australian')) return ['horizontal_pull'];
    if (n.includes('pike') || n.includes('handstand')) return ['vertical_push'];
    if (n.includes('push-up') || n.includes('dip')) return ['horizontal_push'];
    if (n.includes('squat') || n.includes('sissy')) return ['squat'];
    if (n.includes('lunge') || n.includes('split') || n.includes('step-up')) return ['lunge'];
    if (n.includes('bridge') || n.includes('thrust') || n.includes('hinge') || n.includes('nordic')) return ['hip_hinge'];
    if (n.includes('crunch') || n.includes('v-up') || n.includes('leg raise')) return ['trunk_flexion'];
    if (n.includes('plank') && !n.includes('side')) return ['anti_extension'];
    if (n.includes('side plank') || n.includes('russian twist') || n.includes('bird dog')) return ['anti_rotation'];
    if (category === 'cardio') return ['jump_sprint'];
    if (category === 'mobility') return ['mobility_flow'];

    return ['accessory_isolation'];
  }

  public static inferDifficulty(name: string, category: ExerciseCategory): DifficultyLevel {
    const n = name.toLowerCase();
    if (n.includes('one-arm') || n.includes('planche') || n.includes('archer') || n.includes('aztec') || n.includes('copenhagen')) {
      return 'advanced';
    }
    if (n.includes('pull-up') || n.includes('chin-up') || n.includes('diamond') || n.includes('decline') || n.includes('jump')) {
      return 'intermediate';
    }
    return 'beginner';
  }

  public static isUnilateral(name: string): boolean {
    const n = name.toLowerCase();
    return (
      n.includes('single-leg') ||
      n.includes('one-arm') ||
      n.includes('pistol') ||
      n.includes('bulgarian') ||
      n.includes('archer') ||
      n.includes('commando') ||
      n.includes('side-lying') ||
      n.includes('split squat') ||
      n.includes('lunge')
    );
  }
}
