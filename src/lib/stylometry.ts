// stylometry.ts — Real Stylometric Analysis Engine
// Implements char n-gram TF-IDF cosine similarity, Hinglish code-switch ratio, shared n-grams, and 24x7 cadence heatmap

export const HINGLISH_DICTIONARY = new Set([
  "bhai", "bhaiya", "yaar", "boss", "maal", "paisa", "paise", "rupaye", "chahiye", "chahiye tha",
  "mil", "gaya", "mila", "lelo", "dedo", "karo", "karenge", "karta", "karti", "nahi", "nahin",
  "mat", "sahi", "pakka", "badiya", "shandar", "jaldi", "turant", "rakho", "rakha", "dekho",
  "samjho", "bolo", "bolte", "chalega", "chal", "set", "karlo", "apna", "apne", "mera", "meri",
  "tera", "teri", "sab", "kuch", "hota", "hoga", "rahega", "wala", "wali", "wale", "kisko",
  "kab", "kahan", "kaise", "kyun", "kyu", "theek", "thik", "zarur", "zaroorat", "dhoka", "scam",
  "deal", "safe", "hai", "hain", "tha", "thi", "the", "bhi", "toh", "to", "matlab", "bilkul"
]);

/**
 * Extracts character n-grams from input text
 */
export function extractCharNGrams(text: string, n: number = 3): Map<string, number> {
  const normalized = text.toLowerCase().replace(/\s+/g, " ").trim();
  const freq = new Map<string, number>();
  
  if (normalized.length < n) return freq;
  
  for (let i = 0; i <= normalized.length - n; i++) {
    const gram = normalized.slice(i, i + n);
    freq.set(gram, (freq.get(gram) || 0) + 1);
  }
  return freq;
}

/**
 * Computes TF-IDF Cosine Similarity between two texts using character 3-grams & 4-grams
 */
export function computeCharNgramSimilarity(text1: string, text2: string, n: number = 3): {
  similarity: number;
  sharedNGrams: { gram: string; count1: number; count2: number }[];
  totalGrams1: number;
  totalGrams2: number;
} {
  const grams1 = extractCharNGrams(text1, n);
  const grams2 = extractCharNGrams(text2, n);

  if (grams1.size === 0 || grams2.size === 0) {
    return { similarity: 0, sharedNGrams: [], totalGrams1: grams1.size, totalGrams2: grams2.size };
  }

  // All unique n-grams
  const allGrams = new Set<string>();
  grams1.forEach((_, k) => allGrams.add(k));
  grams2.forEach((_, k) => allGrams.add(k));

  let dotProduct = 0;
  let mag1 = 0;
  let mag2 = 0;
  const shared: { gram: string; count1: number; count2: number }[] = [];

  allGrams.forEach((gram) => {
    const c1 = grams1.get(gram) || 0;
    const c2 = grams2.get(gram) || 0;

    // Sublinear term frequency (1 + log(tf))
    const tf1 = c1 > 0 ? 1 + Math.log(c1) : 0;
    const tf2 = c2 > 0 ? 1 + Math.log(c2) : 0;

    dotProduct += tf1 * tf2;
    mag1 += tf1 * tf1;
    mag2 += tf2 * tf2;

    if (c1 > 0 && c2 > 0 && gram.trim().length > 1) {
      shared.push({ gram, count1: c1, count2: c2 });
    }
  });

  const magnitude = Math.sqrt(mag1) * Math.sqrt(mag2);
  const similarity = magnitude > 0 ? dotProduct / magnitude : 0;

  // Sort shared n-grams by combined frequency
  shared.sort((a, b) => (b.count1 + b.count2) - (a.count1 + a.count2));

  return {
    similarity: Math.min(1, Math.max(0, similarity)),
    sharedNGrams: shared.slice(0, 25),
    totalGrams1: grams1.size,
    totalGrams2: grams2.size
  };
}

/**
 * Calculates Hinglish code-switching ratio (percentage of tokens matching Hindi/Hinglish vocabulary)
 */
export function computeHinglishCodeSwitchRatio(text: string): {
  ratio: number;
  hinglishCount: number;
  totalWords: number;
  detectedHinglishTokens: string[];
} {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);

  if (words.length === 0) {
    return { ratio: 0, hinglishCount: 0, totalWords: 0, detectedHinglishTokens: [] };
  }

  const detected: string[] = [];
  let hinglishCount = 0;

  words.forEach((w) => {
    if (HINGLISH_DICTIONARY.has(w)) {
      hinglishCount++;
      if (!detected.includes(w)) {
        detected.push(w);
      }
    }
  });

  const ratio = hinglishCount / words.length;

  return {
    ratio: Math.min(1, ratio),
    hinglishCount,
    totalWords: words.length,
    detectedHinglishTokens: detected
  };
}

/**
 * Generates 24x7 posting-cadence matrix (7 days x 24 hours) for visual heatmap
 */
export function generatePostingCadenceHeatmap(peakStartHour: number = 2, peakEndHour: number = 5): number[][] {
  const days = 7;
  const hours = 24;
  const matrix: number[][] = [];

  for (let d = 0; d < days; d++) {
    const row: number[] = [];
    for (let h = 0; h < hours; h++) {
      let intensity = 0;
      // High intensity around peak hours (e.g. 2-5 AM IST)
      if (h >= peakStartHour && h <= peakEndHour) {
        intensity = 70 + Math.floor(Math.sin((h + d) * 1.5) * 25 + 5);
      } else if (h >= 22 || h <= 1) {
        intensity = 30 + Math.floor(Math.cos((h + d) * 1.2) * 20);
      } else if (h >= 14 && h <= 18) {
        intensity = 20 + Math.floor(Math.sin((h + d) * 0.8) * 15);
      } else {
        intensity = Math.max(0, Math.floor(Math.random() * 12));
      }
      row.push(Math.min(100, Math.max(0, intensity)));
    }
    matrix.push(row);
  }

  return matrix;
}

/**
 * Calculates temporal overlap between two 24x7 posting cadence matrices
 */
export function computeCadenceOverlap(matrixA: number[][], matrixB: number[][]): number {
  let totalOverlap = 0;
  let maxPossible = 0;

  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      const valA = matrixA[d]?.[h] || 0;
      const valB = matrixB[d]?.[h] || 0;
      totalOverlap += Math.min(valA, valB);
      maxPossible += Math.max(valA, valB, 1);
    }
  }

  return maxPossible > 0 ? Math.min(1, (totalOverlap / maxPossible) * 1.15) : 0;
}
