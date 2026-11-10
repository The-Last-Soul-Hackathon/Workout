#!/usr/bin/env tsx
// CLI Script: Import & Normalise External Exercise Datasets
// Usage: npx tsx scripts/import-exercises.ts [--source=kinetic]

import * as fs from 'fs';
import * as path from 'path';
import { ExercisePipeline, PipelineExecutionReport } from '../packages/exercise-data/src/importers/exercise-pipeline';
import { kineticSampleExercises } from '../packages/exercise-data/src/sources/kinetic/sample-data';
import { canonicalExercises } from '../packages/exercise-data/src/exercises';

function run() {
  console.log('=================================================================');
  console.log('⚡ MUSCLE INTELLIGENCE — EXERCISE INGESTION & NORMALISATION PIPELINE');
  console.log('=================================================================\n');

  const args = process.argv.slice(2);
  const sourceArg = args.find((a) => a.startsWith('--source='))?.split('=')[1] || 'kinetic';

  console.log(`📡 Ingesting from Source: "${sourceArg.toUpperCase()}"`);
  console.log(`📚 Comparing against Canonical Library (${canonicalExercises.length} existing exercises)\n`);

  let report: PipelineExecutionReport;

  if (sourceArg.toLowerCase() === 'kinetic') {
    report = ExercisePipeline.runKineticImport(kineticSampleExercises, canonicalExercises);
  } else {
    console.error(`❌ Unsupported source: "${sourceArg}". Supported sources: kinetic`);
    process.exit(1);
  }

  // Display summary
  console.log('-----------------------------------------------------------------');
  console.log('📊 INGESTION EXECUTION SUMMARY');
  console.log('-----------------------------------------------------------------');
  console.log(`Total Records Processed:   ${report.totalProcessed}`);
  console.log(`Auto-Linked to Canonical:  ${report.autoLinkedCount} (High similarity >= 88%)`);
  console.log(`Flagged for Expert Review: ${report.flaggedReviewCount} (65% <= Similarity < 88%)`);
  console.log(`Staged as New Candidates:  ${report.stagedNewCount} (Novel variations)`);
  console.log(`Rejected (Non-compliant):  ${report.rejectedCount}\n`);

  if (report.autoLinkedExercises.length > 0) {
    console.log('🔗 AUTO-LINKED EXERCISES (Preserves Canonical Integrity):');
    report.autoLinkedExercises.forEach((item) => {
      console.log(`   ✓ "${item.candidateName}" -> [${item.canonicalId}] (${(item.similarityScore * 100).toFixed(1)}% match)`);
      console.log(`     Rationale: ${item.rationale}`);
    });
    console.log();
  }

  if (report.reviewQueueItems.length > 0) {
    console.log('⚠️  FLAGGED FOR SCIENTIFIC REVIEW (Staged in evidence_reviews):');
    report.reviewQueueItems.forEach((rev) => {
      console.log(`   ? "${rev.candidateExerciseName}" (Score: ${((rev.suggestedSimilarityScore || 0) * 100).toFixed(1)}%)`);
      console.log(`     Mapped to: ${rev.mappedCanonicalId || 'None'} | Notes: ${rev.reviewerNotes}`);
    });
    console.log();
  }

  if (report.stagedExercises.length > 0) {
    console.log('✨ NOVEL STAGED EXERCISES (Ready for Reviewer Promotion):');
    report.stagedExercises.forEach((ex) => {
      console.log(`   + "${ex.name}" [${ex.category}] - Primary: ${ex.muscleMappings[0]?.muscleId}`);
    });
    console.log();
  }

  // Write report to disk
  const outputPath = path.resolve(process.cwd(), 'docs/research/IMPORT_REPORT.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`💾 Full execution report saved to: ${outputPath}`);
  console.log('=================================================================\n');
}

run();
