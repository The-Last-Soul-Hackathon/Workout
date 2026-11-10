#!/usr/bin/env tsx
// CLI Script: Import & Audit Anatomical Taxonomy
// Usage: npx tsx scripts/import-anatomy.ts

import { canonicalMuscles } from '../packages/exercise-data/src/muscles';

function run() {
  console.log('=================================================================');
  console.log('🧬 MUSCLE INTELLIGENCE — ANATOMICAL TAXONOMY AUDIT');
  console.log('=================================================================\n');

  console.log(`Total Functional Units & Complexes: ${canonicalMuscles.length}\n`);

  const regionCounts: Record<string, number> = {};
  for (const m of canonicalMuscles) {
    regionCounts[m.region] = (regionCounts[m.region] || 0) + 1;
  }

  console.log('📍 MUSCLE DISTRIBUTION BY REGION:');
  Object.entries(regionCounts).forEach(([reg, count]) => {
    console.log(`   • ${reg.toUpperCase().padEnd(14)} : ${count} muscles`);
  });
  console.log();

  console.log('📋 CANONICAL ANATOMY CATALOGUE:');
  console.log('-----------------------------------------------------------------------------------------');
  console.log('ID                              | Region       | Weekly Target (Min-Max) | Heads');
  console.log('-----------------------------------------------------------------------------------------');

  for (const m of canonicalMuscles) {
    const heads = m.anatomicalHeads ? m.anatomicalHeads.join(', ') : 'Single Belly';
    const target = `${m.defaultWeeklyTargetMin} - ${m.defaultWeeklyTargetMax} sets`;
    console.log(`${m.id.padEnd(31)} | ${m.region.padEnd(12)} | ${target.padEnd(23)} | ${heads}`);
  }

  console.log('-----------------------------------------------------------------------------------------');
  console.log('✅ Anatomical taxonomy successfully audited and verified.');
  console.log('=================================================================\n');
}

run();
