// wger Source Types & Parser
// License: Data CC-BY-SA 3.0 / Code AGPL-3.0

export interface WgerRawExercise {
  id: number;
  uuid: string;
  name: string;
  exercise_base: number;
  description: string;
  category: number;
  muscles: number[];
  muscles_secondary: number[];
  equipment: number[];
  language: number;
}

export interface WgerEnvelope {
  externalSourceId: 'wger';
  originalRecordId: string;
  sourceUrl: string;
  license: 'CC-BY-SA-3.0';
  importDate: string;
  rawPayload: WgerRawExercise;
}

export class WgerParser {
  public static parseRawRecords(records: WgerRawExercise[]): WgerEnvelope[] {
    return records.map((record) => ({
      externalSourceId: 'wger',
      originalRecordId: String(record.id),
      sourceUrl: `https://wger.de/api/v2/exercise/${record.id}/`,
      license: 'CC-BY-SA-3.0',
      importDate: new Date().toISOString(),
      rawPayload: record,
    }));
  }
}
