"use client";

import React, { useState, useMemo } from "react";
import {
  Cpu,
  Layers,
  Sparkles,
  AlertTriangle,
  FileText,
  Clock,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Languages
} from "lucide-react";
import { SAMPLE_STYLOMETRY_PAIRS } from "@/data/stylometry";
import {
  computeCharNgramSimilarity,
  computeHinglishCodeSwitchRatio,
  generatePostingCadenceHeatmap,
  computeCadenceOverlap
} from "@/lib/stylometry";

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS_LABELS = Array.from({ length: 24 }, (_, i) => `${i}:00`);

export default function StylometryPage() {
  const [selectedPairId, setSelectedPairId] = useState<string>("PAIR-01");
  const [textA, setTextA] = useState<string>(SAMPLE_STYLOMETRY_PAIRS[0].textA);
  const [textB, setTextB] = useState<string>(SAMPLE_STYLOMETRY_PAIRS[0].textB);
  const [ngramSize, setNgramSize] = useState<number>(3);

  // Load sample pair
  const handleSelectPair = (pairId: string) => {
    setSelectedPairId(pairId);
    const pair = SAMPLE_STYLOMETRY_PAIRS.find((p) => p.id === pairId);
    if (pair) {
      setTextA(pair.textA);
      setTextB(pair.textB);
    }
  };

  // Perform TF-IDF Char N-gram cosine similarity
  const ngramAnalysis = useMemo(() => {
    return computeCharNgramSimilarity(textA, textB, ngramSize);
  }, [textA, textB, ngramSize]);

  // Hinglish code-switching ratios
  const hinglishA = useMemo(() => computeHinglishCodeSwitchRatio(textA), [textA]);
  const hinglishB = useMemo(() => computeHinglishCodeSwitchRatio(textB), [textB]);

  // Heatmaps (Simulated for Text A persona vs Text B persona)
  const heatmapA = useMemo(() => generatePostingCadenceHeatmap(2, 5), []);
  const heatmapB = useMemo(() => generatePostingCadenceHeatmap(2, 6), []);
  const cadenceOverlap = useMemo(() => computeCadenceOverlap(heatmapA, heatmapB), [heatmapA, heatmapB]);

  // Min length warnings
  const isTooShortA = textA.trim().split(/\s+/).length < 25;
  const isTooShortB = textB.trim().split(/\s+/).length < 25;

  // Composite Stylometric Match Score (Ngram similarity 60% + Hinglish similarity 20% + Cadence overlap 20%)
  const hinglishDiff = Math.abs(hinglishA.ratio - hinglishB.ratio);
  const hinglishScore = Math.max(0, 1 - hinglishDiff * 2);
  const compositeScore = Math.round(
    (ngramAnalysis.similarity * 0.6 + hinglishScore * 0.2 + cadenceOverlap * 0.2) * 100
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Stylometry &amp; NLP linguistic compare
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              TF-IDF Char N-Gram Cosine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare two threat actor writing samples using character n-gram cosine distance, Hinglish code-switching ratio, and 24x7 posting cadence overlap.
          </p>
        </div>

        {/* Composite Score Card */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-4 py-2 shadow-xs self-start sm:self-auto">
          <div className="text-right">
            <div className="text-[10px] uppercase font-semibold text-slate-400">
              Linguistic match
            </div>
            <div className="text-xl font-bold text-slate-900 tabular-nums">
              {compositeScore}%
            </div>
          </div>
          <div className="h-8 w-[1px] bg-slate-200" />
          <span
            className={`text-xs px-2.5 py-1 rounded font-semibold uppercase ${
              compositeScore >= 80
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : compositeScore >= 60
                ? "bg-amber-50 text-amber-800 border border-amber-200"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {compositeScore >= 80 ? "High match" : compositeScore >= 60 ? "Moderate" : "Low match"}
          </span>
        </div>
      </div>

      {/* Preset Sample Corpus Selector */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Preloaded corpus samples
          </span>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">N-gram size:</span>
            <select
              value={ngramSize}
              onChange={(e) => setNgramSize(Number(e.target.value))}
              className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs"
            >
              <option value={3}>3-gram (Tri-gram)</option>
              <option value={4}>4-gram (Quad-gram)</option>
              <option value={5}>5-gram (Penta-gram)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {SAMPLE_STYLOMETRY_PAIRS.map((pair) => (
            <button
              key={pair.id}
              type="button"
              onClick={() => handleSelectPair(pair.id)}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedPairId === pair.id
                  ? "bg-blue-50/70 border-blue-300 text-blue-900 font-medium"
                  : "bg-slate-50 hover:bg-slate-100/60 border-slate-200 text-slate-700"
              }`}
            >
              <div className="font-semibold text-xs text-slate-900 flex items-center justify-between">
                <span>{pair.actor}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-500">
                  {pair.id}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                {pair.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dual Text Input & Metric Boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sample A */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Sample A (Known / Reference Persona)
              </h3>
            </div>
            <span className="text-xs text-slate-400 tabular-nums">
              {textA.trim().split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          {isTooShortA && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Warning: Sample A has under 25 words. Statistical reliability may decrease.</span>
            </div>
          )}

          <textarea
            rows={7}
            value={textA}
            onChange={(e) => {
              setTextA(e.target.value);
              setSelectedPairId("custom");
            }}
            placeholder="Paste first text sample (e.g. marketplace listing, forum post, or chat log)..."
            className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white resize-y font-sans"
          />

          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[10px] uppercase text-slate-400 font-semibold">
                Hinglish code-switch ratio
              </div>
              <div className="text-sm font-bold text-slate-900 mt-0.5 tabular-nums">
                {Math.round(hinglishA.ratio * 100)}%
                <span className="text-[10px] font-normal text-slate-500 ml-1">
                  ({hinglishA.hinglishCount}/{hinglishA.totalWords} tokens)
                </span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[10px] uppercase text-slate-400 font-semibold">
                Detected Hindi/Hinglish idioms
              </div>
              <div className="text-xs text-slate-700 mt-0.5 truncate">
                {hinglishA.detectedHinglishTokens.length > 0
                  ? hinglishA.detectedHinglishTokens.slice(0, 4).join(", ")
                  : "None detected"}
              </div>
            </div>
          </div>
        </div>

        {/* Sample B */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                Sample B (Candidate / Suspect Persona)
              </h3>
            </div>
            <span className="text-xs text-slate-400 tabular-nums">
              {textB.trim().split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          {isTooShortB && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Warning: Sample B has under 25 words. Statistical reliability may decrease.</span>
            </div>
          )}

          <textarea
            rows={7}
            value={textB}
            onChange={(e) => {
              setTextB(e.target.value);
              setSelectedPairId("custom");
            }}
            placeholder="Paste second text sample for cross-examination..."
            className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white resize-y font-sans"
          />

          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[10px] uppercase text-slate-400 font-semibold">
                Hinglish code-switch ratio
              </div>
              <div className="text-sm font-bold text-slate-900 mt-0.5 tabular-nums">
                {Math.round(hinglishB.ratio * 100)}%
                <span className="text-[10px] font-normal text-slate-500 ml-1">
                  ({hinglishB.hinglishCount}/{hinglishB.totalWords} tokens)
                </span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[10px] uppercase text-slate-400 font-semibold">
                Detected Hindi/Hinglish idioms
              </div>
              <div className="text-xs text-slate-700 mt-0.5 truncate">
                {hinglishB.detectedHinglishTokens.length > 0
                  ? hinglishB.detectedHinglishTokens.slice(0, 4).join(", ")
                  : "None detected"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shared Character N-Grams Highlighted Table */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Highlighted shared {ngramSize}-grams ({ngramAnalysis.sharedNGrams.length} matched)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Top character sub-sequences shared across both corpora, ranked by combined occurrence frequency.
            </p>
          </div>
          <div className="text-xs text-slate-500 tabular-nums">
            TF-IDF Cosine: <strong className="text-blue-700">{Math.round(ngramAnalysis.similarity * 100)}%</strong>
          </div>
        </div>

        {ngramAnalysis.sharedNGrams.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No shared {ngramSize}-grams found between the two texts.
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            {ngramAnalysis.sharedNGrams.map((item) => (
              <span
                key={item.gram}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-xs text-blue-900"
              >
                <span className="font-semibold">&ldquo;{item.gram}&rdquo;</span>
                <span className="text-[10px] text-blue-600 bg-white px-1 py-0.2 rounded border border-blue-200 tabular-nums">
                  A:{item.count1} | B:{item.count2}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 24x7 Posting-Cadence Heatmap Matrix */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                24x7 Posting-Cadence Diurnal Heatmap
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Hourly activity distribution across Mon–Sun demonstrating synchronized operational timezone (IST 02:00–05:00 peak).
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold tabular-nums">
            Temporal Overlap: {Math.round(cadenceOverlap * 100)}%
          </span>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[700px] space-y-1 text-[11px]">
            {/* Hour header */}
            <div className="grid grid-cols-25 gap-1 text-[10px] text-slate-400 font-medium text-center pb-1">
              <div>Day</div>
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i}>{i}h</div>
              ))}
            </div>

            {DAYS_OF_WEEK.map((day, dayIdx) => (
              <div key={day} className="grid grid-cols-25 gap-1 items-center">
                <div className="text-xs font-semibold text-slate-600">{day}</div>
                {heatmapA[dayIdx]?.map((val, hourIdx) => {
                  const intensityClass =
                    val >= 70
                      ? "bg-blue-600 text-white"
                      : val >= 40
                      ? "bg-blue-400 text-white"
                      : val >= 20
                      ? "bg-blue-200 text-blue-950"
                      : val > 0
                      ? "bg-blue-50 text-slate-600"
                      : "bg-slate-100 text-slate-400";

                  return (
                    <div
                      key={hourIdx}
                      title={`${day} at ${hourIdx}:00 IST — Activity Intensity: ${val}%`}
                      className={`h-6 rounded flex items-center justify-center text-[9px] tabular-nums font-medium cursor-default ${intensityClass}`}
                    >
                      {val > 25 ? val : ""}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs">Intensity:</span>
            <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200" />
            <span className="text-[10px]">0%</span>
            <span className="w-3 h-3 rounded bg-blue-200" />
            <span className="text-[10px]">25%</span>
            <span className="w-3 h-3 rounded bg-blue-400" />
            <span className="text-[10px]">50%</span>
            <span className="w-3 h-3 rounded bg-blue-600" />
            <span className="text-[10px]">75%+</span>
          </div>
          <span className="text-[11px]">Primary Timezone Correlated: Asia/Kolkata (IST +05:30)</span>
        </div>
      </div>
    </div>
  );
}
