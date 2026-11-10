// OpenExerciseDB Source Types & Parser
// License: GPL-3.0

export interface OpenExerciseRaw {
  id: string;
  title: string;
  category: string;
  level: string;
  equipment: string[];
  primary_muscles: string[];
  secondary_muscles: string[];
  instructions: string[];
}

export interface OpenExerciseEnvelope {
  externalSourceId: 'openexercisedb';
  originalRecordId: string;
  sourceUrl: string;
  license: 'GPL-3.0';
  importDate: string;
  rawPayload: OpenExerciseRaw;
}

export class OpenExerciseDbParser {
  public static parseRawRecords(records: OpenExerciseRaw[]): OpenExerciseEnvelope[] {
    return records.map((record) => ({
      externalSourceId: 'openexercisedb',
      originalRecordId: record.id,
      sourceUrl: `https://github.com/rfivesix/OpenExerciseDB/tree/main/exercises/${record.id}.json`,
      license: 'GPL-3.0',
      importDate: new Date().toISOString(),
      rawPayload: record,
    }));
  }
}
