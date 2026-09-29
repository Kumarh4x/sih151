"use client";

import React, { useState } from "react";
import { ConfidenceScore, ConfidenceWeights } from "@/types";
import { ShieldCheck, Info, CheckCircle2, XCircle, Sliders, RotateCcw } from "lucide-react";
import { computeConfidenceScore, DEFAULT_CONFIDENCE_WEIGHTS } from "@/lib/scoring";

interface Props {
  confidence: ConfidenceScore;
  actorSimilarities?: {
    wallet: number;
    offbandPgp: number;
    stylometryBehaviour: number;
    infra: number;
  };
  onScoreRecalculated?: (newScore: ConfidenceScore) => void;
}

const SIGNAL_METADATA: Record<string, { title: string; desc: string; category: string }> = {
  wallet_match: {
    title: "On-chain wallet clustering (35%)",
    desc: "Direct UTXO flow, common input ownership, peel chain hops, or multisig coordination",
    category: "wallet"
  },
  pgp_match: {
    title: "Off-band & PGP key signatures (25%)",
    desc: "Cryptographic identity verification, subkey certification, and cross-market handle overlap",
    category: "offbandPgp"
  },
  stylometry: {
    title: "Stylometry & behavioral cadence (20%)",
    desc: "Char n-gram TF-IDF cosine, Hinglish code-switching ratio, and 24x7 diurnal posting tempo",
    category: "stylometryBehaviour"
  },
  infra_match: {
    title: "Infrastructure & OpSec indicators (20%)",
    desc: "Shared hosting ASN, Tox ID, JARM TLS fingerprint, SSH banner, and clearnet origin IP candidate",
    category: "infra"
  },
  handle_match: {
    title: "Handle morphing heuristics",
    desc: "Levenshtein distance, phonetic substitution, and vendor prefix preservation",
    category: "offbandPgp"
  },
  behavioral_pattern: {
    title: "Behavioral pattern analysis",
    desc: "Posting-time-of-day cadence, activity frequency, and pricing tier similarity",
    category: "stylometryBehaviour"
  }
};

export function ConfidenceAuditTrail({ confidence, actorSimilarities, onScoreRecalculated }: Props) {
  const [showAdjustWeights, setShowAdjustWeights] = useState(false);
  const [weights, setWeights] = useState<ConfidenceWeights>({
    wallet: 0.35,
    offbandPgp: 0.25,
    stylometryBehaviour: 0.20,
    infra: 0.20
  });

  const currentSimilarities = actorSimilarities || {
    wallet: 0.96,
    offbandPgp: 0.95,
    stylometryBehaviour: 0.84,
    infra: 0.72
  };

  const currentComputed = computeConfidenceScore(
    {
      walletSimilarity: currentSimilarities.wallet,
      offbandPgpSimilarity: currentSimilarities.offbandPgp,
      stylometryBehaviourSimilarity: currentSimilarities.stylometryBehaviour,
      infraSimilarity: currentSimilarities.infra
    },
    weights
  );

  const activeScore = showAdjustWeights ? currentComputed : confidence;

  const handleWeightChange = (key: keyof ConfidenceWeights, value: number) => {
    const updated = { ...weights, [key]: value };
    setWeights(updated);
    if (onScoreRecalculated) {
      const recalculated = computeConfidenceScore(
        {
          walletSimilarity: currentSimilarities.wallet,
          offbandPgpSimilarity: currentSimilarities.offbandPgp,
          stylometryBehaviourSimilarity: currentSimilarities.stylometryBehaviour,
          infraSimilarity: currentSimilarities.infra
        },
        updated
      );
      onScoreRecalculated(recalculated);
    }
  };

  const handleResetWeights = () => {
    setWeights(DEFAULT_CONFIDENCE_WEIGHTS);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-semibold text-slate-900">
              Confidence audit trail (Explainability panel)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent multi-signal de-anonymization formula backing actor link identification.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setShowAdjustWeights(!showAdjustWeights)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              showAdjustWeights
                ? "bg-blue-50 text-blue-700 border-blue-300"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showAdjustWeights ? "Hide weight controls" : "Adjust weights"}</span>
          </button>

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-1.5">
            <div className="text-right">
              <div className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                Composite score
              </div>
              <div className="text-lg font-bold text-slate-900 tabular-nums leading-none mt-0.5">
                {activeScore.overall}
                <span className="text-xs font-normal text-slate-400">/100</span>
              </div>
            </div>
            <div className="h-7 w-[1px] bg-slate-200" />
            <span
              className={`text-xs px-2.5 py-1 rounded font-medium uppercase tracking-wider ${
                activeScore.level === "high"
                  ? "bg-emerald-100 text-emerald-800"
                  : activeScore.level === "medium"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {activeScore.level}
            </span>
          </div>
        </div>
      </div>

      {/* Live Weight Adjuster Panel */}
      {showAdjustWeights && (
        <div className="my-4 p-4 rounded-lg bg-blue-50/50 border border-blue-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-semibold text-blue-900">
                Interactive scoring weight tuner
              </span>
            </div>
            <button
              type="button"
              onClick={handleResetWeights}
              className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to default (35 / 25 / 20 / 20)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div>
              <div className="flex justify-between text-xs text-slate-700 font-medium mb-1">
                <span>Wallet match</span>
                <span className="tabular-nums font-semibold text-blue-700">{Math.round(weights.wallet * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(weights.wallet * 100)}
                onChange={(e) => handleWeightChange("wallet", Number(e.target.value) / 100)}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-700 font-medium mb-1">
                <span>Off-band / PGP</span>
                <span className="tabular-nums font-semibold text-blue-700">{Math.round(weights.offbandPgp * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(weights.offbandPgp * 100)}
                onChange={(e) => handleWeightChange("offbandPgp", Number(e.target.value) / 100)}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-700 font-medium mb-1">
                <span>Stylometry + behavior</span>
                <span className="tabular-nums font-semibold text-blue-700">{Math.round(weights.stylometryBehaviour * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(weights.stylometryBehaviour * 100)}
                onChange={(e) => handleWeightChange("stylometryBehaviour", Number(e.target.value) / 100)}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-700 font-medium mb-1">
                <span>Infrastructure</span>
                <span className="tabular-nums font-semibold text-blue-700">{Math.round(weights.infra * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(weights.infra * 100)}
                onChange={(e) => handleWeightChange("infra", Number(e.target.value) / 100)}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Signals Breakdown Table / Bars */}
      <div className="mt-4 space-y-3">
        {activeScore.breakdown.map((item) => {
          const meta = SIGNAL_METADATA[item.signal] || {
            title: item.signal.replace(/_/g, " "),
            desc: "Algorithmic correlation signal",
            category: "generic"
          };
          const contribution = Math.round(item.weight * item.similarity * 100);

          return (
            <div
              key={item.signal}
              className="p-3.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-lg transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {item.matched ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className="text-xs font-semibold text-slate-900">
                      {meta.title}
                    </span>
                    <span className="text-[11px] tabular-nums px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                      Weight: {Math.round(item.weight * 100)}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 pl-6">
                    {meta.desc}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs tabular-nums font-semibold text-slate-800">
                    Similarity: {Math.round(item.similarity * 100)}%
                  </div>
                  <div className="text-[11px] text-slate-500 tabular-nums">
                    +{contribution}% to total
                  </div>
                </div>
              </div>

              {/* Progress visual bar */}
              <div className="mt-3 pl-6">
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      item.similarity >= 0.8
                        ? "bg-blue-600"
                        : item.similarity >= 0.5
                        ? "bg-amber-500"
                        : "bg-slate-400"
                    }`}
                    style={{ width: `${Math.round(item.similarity * 100)}%` }}
                  />
                </div>
              </div>

              {/* Heuristic reasoning notes */}
              {item.notes && (
                <div className="mt-2.5 pl-6 flex items-start gap-1.5 text-xs text-slate-600 bg-white p-2 rounded border border-slate-200">
                  <Info className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed tabular-nums">
                    {item.notes}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          Mathematical verification: Σ (Weight × Similarity) = Overall confidence score
        </span>
        <span className="tabular-nums text-xs">NTRO SIH26151 Engine v2.4</span>
      </div>
    </div>
  );
}
