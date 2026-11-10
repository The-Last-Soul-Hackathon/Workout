// Kinetic Source Parser & Ingestion Wrapper
import { KineticRawExercise, IngestionEnvelope } from './types';
import { kineticSampleExercises } from './sample-data';

export class KineticParser {
  public static parseRawRecords(
    rawExercises: KineticRawExercise[] = kineticSampleExercises
  ): IngestionEnvelope<KineticRawExercise>[] {
    return rawExercises.map((raw) => ({
      externalSourceId: 'kinetic',
      originalRecordId: raw.id,
      sourceUrl: `https://github.com/kinetic-place/exercises-db/tree/main/exercises/${raw.id}.json`,
      license: 'MIT',
      importDate: new Date().toISOString(),
      rawPayload: raw,
    }));
  }
}
