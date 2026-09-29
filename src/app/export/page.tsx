"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  FileSpreadsheet,
  FileCode,
  FileText,
  Download,
  Check,
  Shield,
  Clock,
  Printer,
  Eye,
  Filter,
  Users,
  Tag,
  Globe,
  RefreshCw,
  KeyRound,
  Wallet,
  Radio,
  AtSign,
  CheckCircle2,
  GitBranch,
  ShieldCheck,
  Layers
} from "lucide-react";
import { MOCK_ACTORS } from "@/data/mockData";
import { jsPDF } from "jspdf";

function ExportContent() {
  const searchParams = useSearchParams();
  const targetActorId = searchParams.get("target");

  const [exportFormat, setExportFormat] = useState<"csv" | "json" | "pdf">("csv");
  const [scope, setScope] = useState<"all" | "high_only" | "selected">(
    targetActorId ? "selected" : "all"
  );
  const [classification, setClassification] = useState("RESTRICTED // NTRO SIH26151");
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Compute dataset to export
  const getExportData = () => {
    if (scope === "selected" && targetActorId) {
      return MOCK_ACTORS.filter((a) => a.id === targetActorId);
    }
    if (scope === "high_only") {
      return MOCK_ACTORS.filter((a) => a.confidence.overall >= 80);
    }
    return MOCK_ACTORS;
  };

  const handleDownload = () => {
    setIsExporting(true);
    const data = getExportData();

    setTimeout(() => {
      if (exportFormat === "json") {
        const jsonString = JSON.stringify(
          {
            generatedAt: new Date().toISOString(),
            classification,
            analyst: "NTRO-SEC-8924",
            problemStatement: "SIH26151",
            totalRecords: data.length,
            actors: data
          },
          null,
          2
        );
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `NTRO_Actor_Dossier_${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
      } else if (exportFormat === "csv") {
        const headers = [
          "ID",
          "Primary Alias",
          "Case Status",
          "Known Aliases",
          "Category",
          "Source",
          "Last Scan Date",
          "Confidence Score",
          "Confidence Level",
          "First Seen",
          "Last Seen",
          "Stylometry Language",
          "Wallet Addresses",
          "PGP Keys"
        ];
        const rows = data.map((actor) => [
          `"${actor.id}"`,
          `"${actor.primaryAlias}"`,
          `"${actor.caseStatus}"`,
          `"${actor.aliases.join(", ")}"`,
          `"${actor.category}"`,
          `"${actor.source}"`,
          `"${actor.lastScanDate}"`,
          actor.confidence.overall,
          `"${actor.confidence.level}"`,
          `"${actor.firstSeen}"`,
          `"${actor.lastSeen}"`,
          `"${actor.language || "english"}"`,
          `"${actor.identifiers
            .filter((i) => i.type === "wallet")
            .map((i) => i.value)
            .join("; ")}"`,
          `"${actor.identifiers
            .filter((i) => i.type === "pgp_key")
            .map((i) => i.value)
            .join("; ")}"`
        ]);

        const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `NTRO_Actor_Intelligence_${Date.now()}.csv`;
        link.click();
        URL.revokeObjectURL(url);
      } else if (exportFormat === "pdf") {
        const doc = new jsPDF();
        let y = 15;

        // Header & Classification
        doc.setFontSize(10);
        doc.setTextColor(180, 0, 0);
        doc.text(classification, 14, y);
        doc.setTextColor(100, 100, 100);
        doc.text("SIH26151 • ONION EYE", 140, y);
        y += 8;

        doc.setFontSize(16);
        doc.setTextColor(20, 30, 60);
        doc.text("DE-ANONYMIZATION FORENSIC DOSSIER", 14, y);
        y += 7;

        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
        doc.text(`Generated: ${new Date().toISOString()} | Analyst: Pavan Kumar (NTRO-SEC-8924)`, 14, y);
        y += 10;

        // Iterate actors
        data.forEach((actor) => {
          if (y > 245) {
            doc.addPage();
            y = 15;
          }

          doc.setDrawColor(200, 210, 230);
          doc.line(14, y, 196, y);
          y += 6;

          doc.setFontSize(12);
          doc.setTextColor(10, 20, 40);
          doc.text(`[${actor.id}] ${actor.primaryAlias} (Confidence: ${actor.confidence.overall}%)`, 14, y);
          y += 5;

          doc.setFontSize(9);
          doc.setTextColor(60, 60, 60);
          doc.text(`Category: ${actor.category} | Case: ${actor.caseNumber} | Status: ${actor.caseStatus}`, 14, y);
          y += 5;
          doc.text(`Sources: ${actor.source} | Aliases: ${actor.aliases.join(", ")}`, 14, y);
          y += 5;

          // Identifiers
          doc.setTextColor(80, 80, 80);
          doc.text("Key Identifiers:", 14, y);
          y += 4;
          actor.identifiers.slice(0, 3).forEach((ident) => {
            doc.text(` • [${ident.type.toUpperCase()}] ${ident.value.substring(0, 65)} (Match: ${ident.matchConfidence}%)`, 16, y);
            y += 4;
          });

          // Timeline
          if (actor.timeline.length > 0) {
            doc.text(`Timeline: ${actor.timeline.length} migration hops recorded (${actor.firstSeen} to ${actor.lastSeen})`, 14, y);
            y += 5;
          }

          y += 4;
        });

        doc.save(`NTRO_Forensic_Dossier_${Date.now()}.pdf`);
      }

      setIsExporting(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 600);
  };

  const previewData = getExportData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Intelligence dossier export panel
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Package verified correlation findings, persona migration timelines, and confidence audit trails into forensic reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 tabular-nums">
            Export engine v2.4 (SIH26151)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Export Configuration Controls */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-5">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
              1. Select export format
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setExportFormat("csv")}
                className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all ${
                  exportFormat === "csv"
                    ? "border-blue-600 bg-blue-50 text-blue-700 font-semibold"
                    : "border-slate-200 hover:border-slate-300 text-slate-600"
                }`}
              >
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <span className="text-xs">CSV table</span>
              </button>

              <button
                type="button"
                onClick={() => setExportFormat("json")}
                className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all ${
                  exportFormat === "json"
                    ? "border-blue-600 bg-blue-50 text-blue-700 font-semibold"
                    : "border-slate-200 hover:border-slate-300 text-slate-600"
                }`}
              >
                <FileCode className="w-5 h-5 text-indigo-600" />
                <span className="text-xs">JSON data</span>
              </button>

              <button
                type="button"
                onClick={() => setExportFormat("pdf")}
                className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all ${
                  exportFormat === "pdf"
                    ? "border-blue-600 bg-blue-50 text-blue-700 font-semibold"
                    : "border-slate-200 hover:border-slate-300 text-slate-600"
                }`}
              >
                <FileText className="w-5 h-5 text-rose-600" />
                <span className="text-xs">PDF dossier</span>
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">
              2. Dataset scope
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer p-2 rounded-lg hover:bg-slate-50 border border-slate-200">
                <input
                  type="radio"
                  name="scope"
                  checked={scope === "all"}
                  onChange={() => setScope("all")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>All tracked threat actors ({MOCK_ACTORS.length} records)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer p-2 rounded-lg hover:bg-slate-50 border border-slate-200">
                <input
                  type="radio"
                  name="scope"
                  checked={scope === "high_only"}
                  onChange={() => setScope("high_only")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>High-confidence targets only (&ge; 80% score)</span>
              </label>

              {targetActorId && (
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer p-2 rounded-lg hover:bg-slate-50 border border-slate-200">
                  <input
                    type="radio"
                    name="scope"
                    checked={scope === "selected"}
                    onChange={() => setScope("selected")}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>Targeted case actor ({targetActorId})</span>
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1.5">
              3. Security classification marking
            </label>
            <select
              value={classification}
              onChange={(e) => setClassification(e.target.value)}
              className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
            >
              <option value="RESTRICTED // NTRO SIH26151">RESTRICTED // NTRO SIH26151</option>
              <option value="SECRET // LAW ENFORCEMENT SENSITIVE">SECRET // LAW ENFORCEMENT SENSITIVE</option>
              <option value="CONFIDENTIAL // INTER-AGENCY REL">CONFIDENTIAL // INTER-AGENCY REL</option>
            </select>
          </div>

          {/* Structured Export Specification Box */}
          <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-200 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-blue-900 text-[11px] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Structured forensic dossier output</span>
            </div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              The PDF report export is structured into formal evidentiary sections:
            </p>
            <ul className="text-[11px] text-blue-950 space-y-1 pl-1">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                <span><strong>Section 1: Actor summary</strong> — Categorization, aliases, source &amp; timestamps</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                <span><strong>Section 2: Identifier evidence</strong> — Wallets, PGP keys, and handshake banners</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                <span><strong>Section 3: Confidence breakdown</strong> — Multi-signal audit trail with weights</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                <span><strong>Section 4: Migration history</strong> — Persona hopping timeline</span>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isExporting}
              className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-2xs ${
                downloadSuccess
                  ? "bg-emerald-600"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Dossier exported successfully!</span>
                </>
              ) : isExporting ? (
                <span>Generating forensic artifact...</span>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Generate &amp; download {exportFormat.toUpperCase()}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-slate-500" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Export document preview (Structured forensic sections)
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 tabular-nums">
                {previewData.length} records selected
              </span>
            </div>

            {/* Document Header Representation */}
            <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-[11px] font-bold text-red-700 uppercase tracking-widest">
                  {classification}
                </span>
                <span className="text-[10px] text-slate-400">
                  NTRO SIH26151
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-800">
                INVESTIGATION SUMMARY REPORT: CROSS-MARKETPLACE THREAT ACTOR DE-ANONYMIZATION
              </div>
              <div className="text-[11px] text-slate-500 tabular-nums">
                Generated: {new Date().toUTCString()} • Format: {exportFormat.toUpperCase()} • Structure: 4 Evidentiary Sections
              </div>
            </div>

            {/* Structured Sections Preview */}
            <div className="mt-4 space-y-4 max-h-[460px] overflow-y-auto pr-1">
              {previewData.map((act) => {
                return (
                  <div
                    key={act.id}
                    className="p-4 rounded-lg border border-slate-200 bg-white shadow-2xs space-y-3 text-xs transition-colors"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">
                            {act.id}: {act.primaryAlias}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] uppercase font-semibold tabular-nums">
                            Case #{act.caseNumber}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Classification: {act.category} • Source: {act.source}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold tabular-nums">
                          Confidence: {act.confidence.overall}% ({act.confidence.level.toUpperCase()})
                        </span>
                      </div>
                    </div>

                    {/* SECTION 1: Actor Summary */}
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        <span className="flex items-center gap-1.5 text-blue-700">
                          <Tag className="w-3.5 h-3.5" />
                          <span>Section 1: Actor summary</span>
                        </span>
                        <span className="text-slate-400 font-normal tabular-nums">Last scan: {act.lastScanDate}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                        <div>
                          <span className="text-slate-400 block text-[10px]">CORRELATED ALIASES:</span>
                          <span className="text-slate-800 font-medium">{act.aliases.join(", ")}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">MONITORED SOURCE:</span>
                          <span className="text-slate-800 font-medium">{act.source}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">OBSERVED SPAN:</span>
                          <span className="text-slate-800 font-medium tabular-nums">{act.firstSeen} &rarr; {act.lastSeen}</span>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: Identifier Evidence */}
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        <span className="flex items-center gap-1.5 text-blue-700">
                          <Wallet className="w-3.5 h-3.5" />
                          <span>Section 2: Identifier evidence ({act.identifiers.length} indicators)</span>
                        </span>
                      </div>
                      <div className="space-y-1.5 pt-1">
                        {act.identifiers.map((id) => (
                          <div
                            key={id.id}
                            className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between text-[11px]"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 uppercase shrink-0">
                                {id.type.replace("_", " ")}
                              </span>
                              <span className="text-slate-900 truncate tabular-nums break-all">
                                {id.value}
                              </span>
                            </div>
                            <span className="text-emerald-700 font-semibold shrink-0 tabular-nums ml-2">
                              {id.matchConfidence}% Match
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="text-[11px]">
              Forensic dossier structured into 4 sections (Actor Summary, Identifier Evidence, Confidence Breakdown, Migration History)
            </span>
            <span className="text-[11px] tabular-nums">Schema: v2.4 (SIH26151)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExportPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-500">
          Loading export engine...
        </div>
      }
    >
      <ExportContent />
    </Suspense>
  );
}
