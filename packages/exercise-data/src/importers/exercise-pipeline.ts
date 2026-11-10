// Exercise Data Ingestion Pipeline Orchestrator
import { Exercise, EvidenceReview } from '@muscle-intelligence/domain';
import { KineticParser } from '../sources/kinetic/parser';
import { KineticRawExercise } from '../sources/kinetic/types';
import { ExerciseNormaliser } from '../normalisation/exercise-normaliser';
import { ExerciseMatcher, MatchResult } from '../deduplication/exercise-matcher';
import { LicenceValidator } from '../licence-checks/licence-validator';
import { ExerciseValidator, ValidationReport } from '../validation/schemas';
import { canonicalExercises } from '../exercises';

export interface PipelineExecutionReport {
  timestamp: string;
  source: string;
  totalProcessed: number;
  autoLinkedCount: number;
  flaggedReviewCount: number;
  stagedNewCount: number;
  rejectedCount: number;
  autoLinkedExercises: Array<{
    candidateName: string;
    canonicalId: string;
    similarityScore: number;
    rationale: string;
  }>;
  reviewQueueItems: EvidenceReview[];
  stagedExercises: Exercise[];
  rejectedRecords: Array<{
    recordId: string;
    name: string;
    reason: string;
  }>;
}

export class ExercisePipeline {
  public static runKineticImport(
    rawRecords?: KineticRawExercise[],
    canonicalCatalog: Exercise[] = canonicalExercises
  ): PipelineExecutionReport {
    const envelopes = KineticParser.parseRawRecords(rawRecords);

    const report: PipelineExecutionReport = {
      timestamp: new Date().toISOString(),
      source: 'Kinetic Exercises Database (MIT)',
      totalProcessed: envelopes.length,
      autoLinkedCount: 0,
      flaggedReviewCount: 0,
      stagedNewCount: 0,
      rejectedCount: 0,
      autoLinkedExercises: [],
      reviewQueueItems: [],
      stagedExercises: [],
      rejectedRecords: [],
    };

    for (const env of envelopes) {
      // 1. License Check Gate
      const licCheck = LicenceValidator.validate(env.license, env.externalSourceId);
      if (!licCheck.isCompliant || !licCheck.isCommercialPermitted) {
        report.rejectedCount++;
        report.rejectedRecords.push({
          recordId: env.originalRecordId,
          name: env.rawPayload.name,
          reason: `License non-compliance: ${licCheck.violations.join('; ')}`,
        });
        continue;
      }

      // 2. Normalisation
      const normalized = ExerciseNormaliser.normalizeKinetic(env.rawPayload);

      // 3. Schema & Evidence Validation
      const validation: ValidationReport = ExerciseValidator.validate(normalized);
      if (!validation.isValid) {
        report.rejectedCount++;
        report.rejectedRecords.push({
          recordId: env.originalRecordId,
          name: env.rawPayload.name,
          reason: `Validation failed: ${validation.errors.map((e) => `${e.field}: ${e.message}`).join(', ')}`,
        });
        continue;
      }

      // 4. Deduplication & Canonical Match
      const match: MatchResult = ExerciseMatcher.matchAgainstCanonical(normalized, canonicalCatalog);

      if (match.decision === 'auto_link' && match.matchedCanonicalExercise) {
        report.autoLinkedCount++;
        report.autoLinkedExercises.push({
          candidateName: normalized.name,
          canonicalId: match.matchedCanonicalExercise.id,
          similarityScore: match.similarityScore,
          rationale: match.rationale,
        });
      } else if (match.decision === 'flag_review') {
        report.flaggedReviewCount++;
        report.reviewQueueItems.push({
          id: `rev-${env.originalRecordId}`,
          externalSourceId: env.externalSourceId,
          originalRecordId: env.originalRecordId,
          candidateExerciseName: normalized.name,
          candidatePayload: env.rawPayload as unknown as Record<string, unknown>,
          mappedCanonicalId: match.matchedCanonicalExercise?.id,
          suggestedSimilarityScore: match.similarityScore,
          status: 'pending',
          conflictSummary: match.rationale,
          reviewerNotes: `Flagged for expert review. Overlaps with ${match.matchedCanonicalExercise?.name} (${match.similarityScore * 100}%).`,
          createdAt: new Date().toISOString(),
        });
      } else {
        report.stagedNewCount++;
        report.stagedExercises.push(normalized);
      }
    }

    return report;
  }
}
