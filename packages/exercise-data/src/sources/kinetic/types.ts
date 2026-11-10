// Kinetic Exercises Database Raw Source Types
// Source: https://github.com/kinetic-place/exercises-db
// License: MIT

export interface KineticRawExercise {
  id: string;
  name: string;
  target: string;
  bodyPart: string;
  equipment: string;
  secondaryMuscles?: string[];
  instructions?: string[];
}

export interface IngestionEnvelope<T> {
  externalSourceId: string;
  originalRecordId: string;
  sourceUrl: string;
  license: string;
  importDate: string;
  rawPayload: T;
}
