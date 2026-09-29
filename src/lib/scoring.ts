// scoring.ts — NTRO SIH26151 Confidence Scoring Engine
// Weights: Wallet 35%, Off-band/PGP 25%, Stylometry+Behaviour 20%, Infrastructure 20%

import { ConfidenceWeights, ConfidenceScore, ConfidenceSignal, ConfidenceLevel } from "@/types";

export const DEFAULT_CONFIDENCE_WEIGHTS: ConfidenceWeights = {
  wallet: 0.35,              // 35%
  offbandPgp: 0.25,          // 25%
  stylometryBehaviour: 0.20, // 20%
  infra: 0.20                // 20%
};

export function getConfidenceLevel(score: number): ConfidenceLevel {
  if (score >= 80) return "high";
  if (score >= 60) return "medium";
  return "low";
}

export interface ScoreInput {
  walletSimilarity: number;             // 0 to 1.0 (or 0 to 100)
  offbandPgpSimilarity: number;         // 0 to 1.0
  stylometryBehaviourSimilarity: number;// 0 to 1.0
  infraSimilarity: number;              // 0 to 1.0
}

/**
 * Computes the overall confidence score based on the 4 canonical NTRO vectors
 * Normalized to sum to 100%
 */
export function computeConfidenceScore(
  input: ScoreInput,
  customWeights: Partial<ConfidenceWeights> = {}
): ConfidenceScore {
  const weights: ConfidenceWeights = {
    wallet: customWeights.wallet !== undefined ? customWeights.wallet : DEFAULT_CONFIDENCE_WEIGHTS.wallet,
    offbandPgp: customWeights.offbandPgp !== undefined ? customWeights.offbandPgp : DEFAULT_CONFIDENCE_WEIGHTS.offbandPgp,
    stylometryBehaviour: customWeights.stylometryBehaviour !== undefined ? customWeights.stylometryBehaviour : DEFAULT_CONFIDENCE_WEIGHTS.stylometryBehaviour,
    infra: customWeights.infra !== undefined ? customWeights.infra : DEFAULT_CONFIDENCE_WEIGHTS.infra,
  };

  // Normalize weights if their sum is > 0
  const weightSum = weights.wallet + weights.offbandPgp + weights.stylometryBehaviour + weights.infra;
  const normWallet = weightSum > 0 ? weights.wallet / weightSum : 0.35;
  const normOffband = weightSum > 0 ? weights.offbandPgp / weightSum : 0.25;
  const normStylo = weightSum > 0 ? weights.stylometryBehaviour / weightSum : 0.20;
  const normInfra = weightSum > 0 ? weights.infra / weightSum : 0.20;

  // Ensure input similarities are in range [0, 1]
  const clamp = (val: number) => (val > 1 ? Math.min(val / 100, 1) : Math.max(0, Math.min(val, 1)));

  const sWallet = clamp(input.walletSimilarity);
  const sOffband = clamp(input.offbandPgpSimilarity);
  const sStylo = clamp(input.stylometryBehaviourSimilarity);
  const sInfra = clamp(input.infraSimilarity);

  const weightedSum =
    sWallet * normWallet +
    sOffband * normOffband +
    sStylo * normStylo +
    sInfra * normInfra;

  const overall = Math.round(weightedSum * 100);
  const level = getConfidenceLevel(overall);

  const breakdown: ConfidenceSignal[] = [
    {
      signal: "wallet_match",
      category: "wallet",
      weight: normWallet,
      similarity: sWallet,
      matched: sWallet > 0.5,
      notes: `Cryptographic UTXO consolidation & peel-chain correlation (${Math.round(sWallet * 100)}% match)`
    },
    {
      signal: "pgp_match",
      category: "offbandPgp",
      weight: normOffband,
      similarity: sOffband,
      matched: sOffband > 0.5,
      notes: `PGP key/subkey cryptographic validation & cross-market handle match (${Math.round(sOffband * 100)}% match)`
    },
    {
      signal: "stylometry",
      category: "stylometryBehaviour",
      weight: normStylo,
      similarity: sStylo,
      matched: sStylo > 0.5,
      notes: `Char n-gram TF-IDF cosine similarity & Hinglish code-switching cadence (${Math.round(sStylo * 100)}% match)`
    },
    {
      signal: "infra_match",
      category: "infra",
      weight: normInfra,
      similarity: sInfra,
      matched: sInfra > 0.5,
      notes: `JARM TLS fingerprint, SSH banner, and clearnet origin ASN correlation (${Math.round(sInfra * 100)}% match)`
    }
  ];

  return {
    overall,
    level,
    breakdown,
    computedWeights: weights
  };
}
