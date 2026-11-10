// Multi-Factor Deduplication & Entity Resolution Engine
import { Exercise } from '@muscle-intelligence/domain';
import { StringSimilarity } from './string-similarity';

export interface MatchResult {
  decision: 'auto_link' | 'flag_review' | 'new_candidate';
  similarityScore: number;
  matchedCanonicalExercise?: Exercise;
  rationale: string;
}

export class ExerciseMatcher {
  public static readonly AUTO_LINK_THRESHOLD = 0.88;
  public static readonly REVIEW_FLAG_THRESHOLD = 0.65;

  public static matchAgainstCanonical(
    candidate: Exercise,
    canonicalCatalog: Exercise[]
  ): MatchResult {
    let highestScore = 0;
    let bestCanonicalMatch: Exercise | undefined = undefined;
    let bestRationale = 'No significant match in canonical database.';

    for (const canonical of canonicalCatalog) {
      // 1. Name Similarity: Blend Levenshtein & token Jaccard
      const levSim = StringSimilarity.levenshtein(candidate.name, canonical.name);
      const jaccardSim = StringSimilarity.tokenJaccard(candidate.name, canonical.name);
      const nameScore = levSim * 0.6 + jaccardSim * 0.4;

      // 2. Movement Pattern Alignment
      const candidatePatterns = new Set(candidate.movementPatterns);
      const sharedPatterns = canonical.movementPatterns.filter((p) => candidatePatterns.has(p));
      const patternScore = sharedPatterns.length > 0 ? 1.0 : 0.0;

      // 3. Muscle Involvement Jaccard
      const candidateMuscles = new Set(candidate.muscleMappings.map((m) => m.muscleId));
      const canonicalMuscles = new Set(canonical.muscleMappings.map((m) => m.muscleId));
      let muscleIntersect = 0;
      for (const m of candidateMuscles) {
        if (canonicalMuscles.has(m)) muscleIntersect++;
      }
      const muscleUnion = candidateMuscles.size + canonicalMuscles.size - muscleIntersect;
      const muscleScore = muscleUnion > 0 ? muscleIntersect / muscleUnion : 0.5;

      // 4. Equipment Match
      const candEq = new Set(candidate.equipment);
      const canEq = new Set(canonical.equipment);
      let eqIntersect = 0;
      for (const e of candEq) {
        if (canEq.has(e)) eqIntersect++;
      }
      const eqUnion = candEq.size + canEq.size - eqIntersect;
      const equipmentScore = eqUnion > 0 ? eqIntersect / eqUnion : 1.0;

      // Weighted Composite Score
      const compositeScore = Number(
        (
          0.40 * nameScore +
          0.30 * patternScore +
          0.20 * muscleScore +
          0.10 * equipmentScore
        ).toFixed(3)
      );

      if (compositeScore > highestScore) {
        highestScore = compositeScore;
        bestCanonicalMatch = canonical;
        bestRationale = `Name sim: ${nameScore.toFixed(2)}, Pattern match: ${patternScore}, Muscle Jaccard: ${muscleScore.toFixed(2)}`;
      }
    }

    const isAutoLink = highestScore >= this.AUTO_LINK_THRESHOLD || (highestScore >= 0.80 && bestRationale.includes('Name sim: 1.00'));

    if (isAutoLink && bestCanonicalMatch) {
      return {
        decision: 'auto_link',
        similarityScore: highestScore,
        matchedCanonicalExercise: bestCanonicalMatch,
        rationale: `High confidence match with canonical "${bestCanonicalMatch.name}" (${bestCanonicalMatch.id}). ${bestRationale}`,
      };
    }

    if (highestScore >= this.REVIEW_FLAG_THRESHOLD && bestCanonicalMatch) {
      return {
        decision: 'flag_review',
        similarityScore: highestScore,
        matchedCanonicalExercise: bestCanonicalMatch,
        rationale: `Potential variation or conflicting classification with "${bestCanonicalMatch.name}". Routed to scientific review queue. ${bestRationale}`,
      };
    }

    return {
      decision: 'new_candidate',
      similarityScore: highestScore,
      rationale: `Unique movement pattern or novel calisthenic variation (highest match: ${highestScore.toFixed(2)}).`,
    };
  }
}
