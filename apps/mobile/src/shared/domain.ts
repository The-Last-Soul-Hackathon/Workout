// Canonical Domain Types & Models
// Muscle Intelligence — Cross-Platform Scientific Data Foundation

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

export type MuscleRole = 'primary' | 'secondary' | 'synergist' | 'stabiliser' | 'incidental';

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

/**
 * The 8 Canonical Scientific Evidence Categories
 * Mandated to prevent confusing EMG, force estimation, and longitudinal hypertrophy.
 */
export type ScientificEvidenceCategory =
  | 'anatomical_evidence'
  | 'biomechanical_evidence'
  | 'emg_excitation_evidence'
  | 'muscle_force_estimation'
  | 'longitudinal_hypertrophy'
  | 'strength_performance'
  | 'fatigue_recovery'
  | 'expert_inference';

export interface MuscleGroup {
  id: MuscleRegion;
  name: string;
  description: string;
  displayOrder: number;
}

export interface MuscleHead {
  id: string;
  muscleId: string;
  name: string;
  latinName?: string;
  fiberOrientation?: string;
  origin?: string;
  insertion?: string;
}

export interface Muscle {
  id: string;
  muscleGroupId?: MuscleRegion;
  region: MuscleRegion;
  name: string;
  latinName?: string;
  fmaId?: string; // Foundational Model of Anatomy identifier
  description: string;
  origin?: string;
  insertion?: string;
  innervation?: string;
  actions: string[];
  anatomicalHeads?: string[];
  lateralitySupported: boolean;
  defaultWeeklyTargetMin: number; // e.g. 8.0 direct sets
  defaultWeeklyTargetMax: number; // e.g. 16.0 direct sets
}

export interface AnatomicalAction {
  id: string;
  muscleId: string;
  jointAction: string;
  leverageAdvantage: 'primary_agonist' | 'synergist' | 'fixator';
}

export interface AnatomicalStructure {
  id: string;
  muscleId: string;
  svgElementIdFront?: string;
  svgElementIdBack?: string;
  meshIdentifier3d?: string;
  centroidXNorm?: number;
  centroidYNorm?: number;
}

export interface ExerciseMuscleMapping {
  muscleId: string;
  muscleHeadId?: string;
  role: MuscleRole;
  coefficient: number; // 1.0 = primary, 0.5 = synergist, 0.2 = stabiliser, 0.0 = incidental
  jointAction: string;
  evidenceCategory?: ScientificEvidenceCategory;
  evidenceType?: 'direct_emg' | 'biomechanical_inference' | 'anatomy_inference' | 'intervention_study' | 'expert_consensus';
  confidence: EvidenceConfidence;
  confidenceScore?: number; // 0.0 - 1.0
  notes: string;
  sourceIds?: string[];
  reviewedBy?: string;
  reviewedAt?: string;
}

export type ExerciseCategory =
  | 'cardio'
  | 'pull'
  | 'core'
  | 'push'
  | 'legs'
  | 'mobility'
  | 'accessory';

export interface ExerciseVariation {
  baseExerciseId: string;
  variationExerciseId: string;
  variationType: 'grip_width' | 'stance' | 'elevation' | 'tempo' | 'leverage';
  description?: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  primaryCategory?: ExerciseCategory;
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
  isCanonical?: boolean;
  isUserCustom?: boolean;
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
  isCanonical?: boolean;
  exercises: RoundExerciseItem[];
}

export type TechniqueQuality = 'good' | 'acceptable' | 'degraded';

export interface SetLog {
  id: string;
  sessionId: string;
  userId?: string;
  exerciseId: string;
  setNumber: number;
  reps?: number;
  holdSeconds?: number;
  distanceMeters?: number;
  flightsClimbed?: number;
  side: 'bilateral' | 'left' | 'right';
  rir?: number; // Repetitions in Reserve (0-5)
  rpe?: number; // Rating of Perceived Exertion (1-10)
  restSeconds?: number;
  techniqueQuality: TechniqueQuality;
  notes?: string;
  completedAt: string;
  synced?: boolean;
}

export interface WorkoutSession {
  id: string;
  userId?: string;
  roundTemplateId?: string;
  name: string;
  startedAt: string;
  endedAt?: string;
  durationSeconds?: number;
  notes?: string;
  completed: boolean;
  sets: SetLog[];
}

export interface SourceLicense {
  id: string;
  fullName: string;
  isCommercialAllowed: boolean;
  requiresShareAlike: boolean;
  requiresAttribution: boolean;
  isCopyleftViral: boolean;
  licenseUrl?: string;
}

export interface ExternalSource {
  id: string;
  licenseId: string;
  name: string;
  url: string;
  attributionText: string;
}

export interface ResearchStudy {
  id: string;
  externalSourceId?: string;
  externalRecordId?: string;
  doi?: string;
  pmid?: string;
  openalexId?: string;
  title: string;
  authors: string[];
  publicationYear: number;
  journal?: string;
  abstract?: string;
  studyType?: string;
  openAccessUrl?: string;
  isOpenAccess: boolean;
  isPeerReviewed: boolean;
  evidenceCategory?: ScientificEvidenceCategory;
}

export interface StudyProtocol {
  id: string;
  studyId: string;
  sampleSize?: number;
  maleParticipants?: number;
  femaleParticipants?: number;
  trainingStatus?: string;
  electrodeBrandModel?: string;
  emgNormalizationMethod?: string;
  samplingRateHz?: number;
  movementTempo?: string;
  rangeOfMotionSpecification?: string;
}

export interface StudyFinding {
  id: string;
  studyId: string;
  exerciseName?: string;
  targetMuscleOrGroup?: string;
  findingText: string;
  effectSize?: string;
  statisticalSignificance?: string;
  methodologicalLimitations?: string;
}

export interface EvidenceMeasurement {
  id: string;
  studyFindingId: string;
  metricName: string;
  metricValue: number;
  metricVariance?: number;
  metricUnit: string;
  measurementPhase?: string;
}

export interface EvidenceReview {
  id: string;
  externalSourceId: string;
  originalRecordId: string;
  candidateExerciseName: string;
  candidatePayload: Record<string, unknown>;
  mappedCanonicalId?: string;
  suggestedSimilarityScore?: number;
  status: 'pending' | 'approved' | 'rejected' | 'modified';
  conflictSummary?: string;
  reviewerNotes?: string;
  reviewerId?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface ModelVersion {
  id: string;
  name: string;
  domain: 'exposure' | 'biomechanics' | 'fatigue' | 'progression';
  versionTag: string;
  formulaDefinition: string;
  latexRepresentation?: string;
  scientificBasis: string;
  isActive: boolean;
}

export interface ModelParameter {
  id: string;
  modelVersionId: string;
  parameterKey: string;
  parameterValue: number;
  unit?: string;
  description?: string;
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
  similarityScore: number; // 0.0 - 1.0
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
