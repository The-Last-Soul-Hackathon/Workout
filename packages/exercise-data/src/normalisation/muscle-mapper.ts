// Muscle Mapping Engine: Maps colloquial/external muscle strings to Canonical Muscle IDs

export interface ResolvedMuscleMapping {
  muscleId: string;
  role: 'primary' | 'secondary' | 'stabiliser' | 'incidental';
  coefficient: number;
  jointAction: string;
}

const EXTERNAL_MUSCLE_LOOKUP: Record<string, { muscleId: string; defaultJointAction: string }> = {
  // Chest
  'pectorals': { muscleId: 'pectoralis_major_sternal', defaultJointAction: 'shoulder horizontal adduction' },
  'chest': { muscleId: 'pectoralis_major_sternal', defaultJointAction: 'shoulder horizontal adduction' },
  'upper chest': { muscleId: 'pectoralis_major_clavicular', defaultJointAction: 'shoulder flexion' },
  'serratus': { muscleId: 'serratus_anterior', defaultJointAction: 'scapular protraction' },

  // Back
  'lats': { muscleId: 'latissimus_dorsi', defaultJointAction: 'shoulder adduction / extension' },
  'latissimus dorsi': { muscleId: 'latissimus_dorsi', defaultJointAction: 'shoulder adduction / extension' },
  'upper back': { muscleId: 'trapezius_upper', defaultJointAction: 'scapular elevation' },
  'traps': { muscleId: 'trapezius_mid_lower', defaultJointAction: 'scapular retraction' },
  'trapezius': { muscleId: 'trapezius_mid_lower', defaultJointAction: 'scapular retraction' },
  'middle back': { muscleId: 'rhomboids', defaultJointAction: 'scapular retraction' },
  'rhomboids': { muscleId: 'rhomboids', defaultJointAction: 'scapular retraction' },
  'lower back': { muscleId: 'erector_spinae', defaultJointAction: 'trunk anti-flexion' },
  'erectors': { muscleId: 'erector_spinae', defaultJointAction: 'trunk extension' },

  // Shoulders
  'deltoids': { muscleId: 'deltoid_anterior', defaultJointAction: 'shoulder flexion / horizontal adduction' },
  'shoulders': { muscleId: 'deltoid_anterior', defaultJointAction: 'shoulder abduction / flexion' },
  'front delts': { muscleId: 'deltoid_anterior', defaultJointAction: 'shoulder flexion' },
  'side delts': { muscleId: 'deltoid_lateral', defaultJointAction: 'shoulder abduction' },
  'rear delts': { muscleId: 'deltoid_posterior', defaultJointAction: 'shoulder horizontal abduction' },
  'rotator cuff': { muscleId: 'rotator_cuff', defaultJointAction: 'glenohumeral stabilization' },

  // Arms & Forearms
  'triceps': { muscleId: 'triceps_brachii', defaultJointAction: 'elbow extension' },
  'biceps': { muscleId: 'biceps_brachii', defaultJointAction: 'elbow flexion' },
  'forearms': { muscleId: 'forearm_flexors', defaultJointAction: 'finger / wrist flexion' },
  'grip': { muscleId: 'forearm_flexors', defaultJointAction: 'isometric finger flexion' },

  // Core
  'abdominals': { muscleId: 'rectus_abdominis', defaultJointAction: 'trunk flexion / anti-extension' },
  'abs': { muscleId: 'rectus_abdominis', defaultJointAction: 'trunk flexion' },
  'core': { muscleId: 'transversus_abdominis', defaultJointAction: 'intra-abdominal stabilization' },
  'obliques': { muscleId: 'obliques', defaultJointAction: 'anti-rotation / lateral flexion' },

  // Legs & Hips
  'quads': { muscleId: 'quadriceps', defaultJointAction: 'knee extension' },
  'quadriceps': { muscleId: 'quadriceps', defaultJointAction: 'knee extension' },
  'hamstrings': { muscleId: 'hamstrings', defaultJointAction: 'knee flexion / hip extension' },
  'glutes': { muscleId: 'gluteus_maximus', defaultJointAction: 'hip extension' },
  'butt': { muscleId: 'gluteus_maximus', defaultJointAction: 'hip extension' },
  'abductors': { muscleId: 'gluteus_medius_minimus', defaultJointAction: 'hip abduction' },
  'adductors': { muscleId: 'hip_adductors', defaultJointAction: 'hip adduction' },
  'groin': { muscleId: 'hip_adductors', defaultJointAction: 'hip adduction' },
  'calves': { muscleId: 'gastrocnemius', defaultJointAction: 'ankle plantarflexion' },
  'shins': { muscleId: 'tibialis_anterior', defaultJointAction: 'ankle dorsiflexion' },
  'neck': { muscleId: 'deep_cervical_flexors', defaultJointAction: 'cervical stabilization' },
};

export class MuscleMapper {
  public static mapTarget(targetString: string): ResolvedMuscleMapping {
    const key = targetString.trim().toLowerCase();
    const match = EXTERNAL_MUSCLE_LOOKUP[key];

    if (match) {
      return {
        muscleId: match.muscleId,
        role: 'primary',
        coefficient: 1.0,
        jointAction: match.defaultJointAction,
      };
    }

    // Default fallback
    return {
      muscleId: key.replace(/[\s-]+/g, '_'),
      role: 'primary',
      coefficient: 1.0,
      jointAction: 'movement prime mover',
    };
  }

  public static mapSecondary(secondaryStrings: string[] = []): ResolvedMuscleMapping[] {
    const results: ResolvedMuscleMapping[] = [];
    const seen = new Set<string>();

    for (const raw of secondaryStrings) {
      const key = raw.trim().toLowerCase();
      const match = EXTERNAL_MUSCLE_LOOKUP[key];
      const mId = match ? match.muscleId : key.replace(/[\s-]+/g, '_');

      if (!seen.has(mId)) {
        seen.add(mId);
        results.push({
          muscleId: mId,
          role: 'secondary',
          coefficient: 0.5,
          jointAction: match ? match.defaultJointAction : 'synergist assistance',
        });
      }
    }

    return results;
  }
}
