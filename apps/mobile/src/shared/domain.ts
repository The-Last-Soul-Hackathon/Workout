export type MuscleRegion =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'arms'
  | 'forearms'
  | 'core'
  | 'hips_glutes'
  | 'thighs'
  | 'calves_feet'
  | 'neck';

export type MuscleRole = 'primary' | 'synergist' | 'secondary' | 'stabiliser' | 'incidental';

export type MovementPattern =
  | 'vertical_pull'
  | 'horizontal_pull'
  | 'vertical_push'
  | 'horizontal_push'
  | 'squat'
  | 'lunge'
  | 'hip_hinge'
  | 'trunk_flexion'
  | 'anti_extension'
  | 'anti_rotation'
  | 'lateral_flexion'
  | 'locomotion'
  | 'jump_sprint'
  | 'accessory_isolation'
  | 'mobility_flow';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'elite';

export type EvidenceConfidence = 'high' | 'moderate' | 'low' | 'unknown';

export type EvidenceClassification =
  | 'measured'
  | 'user_reported'
  | 'evidence_derived'
  | 'modelled'
  | 'assumed';

export interface Muscle {
  id: string;
  name: string;
  latinName?: string;
  region: MuscleRegion;
  description: string;
  actions: string[];
  anatomicalHeads?: string[];
  lateralitySupported: boolean;
  defaultWeeklyTargetMin: number;
  defaultWeeklyTargetMax: number;
}

export interface ExerciseMuscleMapping {
  muscleId: string;
  muscleHeadId?: string;
  role: MuscleRole;
  coefficient: number;
  jointAction: string;
  evidenceType: 'direct_emg' | 'biomechanical_inference' | 'anatomy_inference' | 'intervention_study' | 'expert_consensus';
  confidence: EvidenceConfidence;
  notes: string;
  sourceIds?: string[];
}

export type ExerciseCategory =
  | 'cardio'
  | 'pull'
  | 'core'
  | 'push'
  | 'legs'
  | 'mobility'
  | 'accessory';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  movementPatterns: MovementPattern[];
  difficulty: DifficultyLevel;
  equipment: string[];
  defaultUnit: 'reps' | 'seconds' | 'meters' | 'flights';
  unilateral: boolean;
  instructions: string;
  prerequisites?: string[];
  regressions?: string[];
  progressions?: string[];
  safetyCautions?: string;
  muscleMappings: ExerciseMuscleMapping[];
}

export interface RoundExerciseItem {
  exerciseId: string;
  category: ExerciseCategory;
  sequence: number;
  defaultValue: number;
  unit: 'reps' | 'seconds' | 'meters' | 'flights';
  sideRule: 'bilateral' | 'each_side' | 'alternating';
}

export interface RoundTemplate {
  id: string;
  roundNumber: number;
  name: string;
  type: 'strength_conditioning' | 'mobility' | 'accessory_balance';
  description: string;
  exercises: RoundExerciseItem[];
}

export type TechniqueQuality = 'good' | 'acceptable' | 'degraded';

export interface SetLog {
  id: string;
  sessionId: string;
  exerciseId: string;
  setNumber: number;
  reps?: number;
  holdSeconds?: number;
  side: 'bilateral' | 'left' | 'right' | 'each_side';
  rir?: number;
  rpe?: number;
  restSeconds?: number;
  techniqueQuality: TechniqueQuality;
  notes?: string;
  completedAt: string;
  synced: boolean;
}

export interface WorkoutSession {
  id: string;
  roundTemplateId?: string;
  name: string;
  startedAt: string;
  endedAt?: string;
  durationSeconds?: number;
  notes?: string;
  completed: boolean;
  sets: SetLog[];
}

export interface ModelOutput<T> {
  model: string;
  version: string;
  value: T;
  unit: string;
  confidence: EvidenceConfidence;
  classification: EvidenceClassification;
  assumptions: string[];
  sourceIds: string[];
  generatedAt: string;
}

export type ExposureStatus = 'below_target' | 'in_target' | 'above_target' | 'not_assessed';

export interface MuscleExposure {
  muscleId: string;
  muscleName: string;
  region: MuscleRegion;
  directSets: number;
  indirectSets: number;
  totalExposure: number;
  status: ExposureStatus;
  targetMin: number;
  targetMax: number;
  contributingExercises: Array<{
    exerciseId: string;
    exerciseName: string;
    sets: number;
    role: MuscleRole;
    contribution: number;
  }>;
}

export interface CoverageGap {
  muscleId: string;
  muscleName: string;
  region: MuscleRegion;
  exposure: number;
  targetMin: number;
  reason: string;
  suggestedExerciseIds: string[];
  confidence: EvidenceConfidence;
}

export interface ExerciseComparison {
  exerciseA: Exercise;
  exerciseB: Exercise;
  similarityScore: number;
  sharedMuscles: Array<{
    muscleId: string;
    muscleName: string;
    roleA: MuscleRole;
    roleB: MuscleRole;
  }>;
  distinctMusclesA: Array<{ muscleId: string; muscleName: string; role: MuscleRole }>;
  distinctMusclesB: Array<{ muscleId: string; muscleName: string; role: MuscleRole }>;
  mechanicalDifferences: string[];
  practicalRecommendation: string;
}
