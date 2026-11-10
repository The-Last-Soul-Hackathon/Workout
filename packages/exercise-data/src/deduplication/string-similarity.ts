// String & Token Similarity Algorithms

export class StringSimilarity {
  /**
   * Computes normalized Levenshtein distance similarity in [0, 1].
   * 1.0 = identical strings, 0.0 = completely disjoint.
   */
  public static levenshtein(strA: string, strB: string): number {
    const s1 = strA.toLowerCase().trim();
    const s2 = strB.toLowerCase().trim();

    if (s1 === s2) return 1.0;
    if (s1.length === 0 || s2.length === 0) return 0.0;

    const track = Array(s2.length + 1)
      .fill(null)
      .map(() => Array(s1.length + 1).fill(null));

    for (let i = 0; i <= s1.length; i += 1) {
      track[0][i] = i;
    }
    for (let j = 0; j <= s2.length; j += 1) {
      track[j][0] = j;
    }

    for (let j = 1; j <= s2.length; j += 1) {
      for (let i = 1; i <= s1.length; i += 1) {
        const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1, // deletion
          track[j - 1][i] + 1, // insertion
          track[j - 1][i - 1] + indicator // substitution
        );
      }
    }

    const distance = track[s2.length][s1.length];
    const maxLength = Math.max(s1.length, s2.length);
    return Math.max(0, 1 - distance / maxLength);
  }

  /**
   * Computes token-level Jaccard similarity across two word sets.
   */
  public static tokenJaccard(strA: string, strB: string): number {
    const tokensA = new Set(strA.toLowerCase().split(/[\s_-]+/).filter(Boolean));
    const tokensB = new Set(strB.toLowerCase().split(/[\s_-]+/).filter(Boolean));

    if (tokensA.size === 0 && tokensB.size === 0) return 1.0;
    if (tokensA.size === 0 || tokensB.size === 0) return 0.0;

    let intersectionCount = 0;
    for (const t of tokensA) {
      if (tokensB.has(t)) intersectionCount++;
    }

    const unionCount = tokensA.size + tokensB.size - intersectionCount;
    return unionCount === 0 ? 0 : intersectionCount / unionCount;
  }
}
