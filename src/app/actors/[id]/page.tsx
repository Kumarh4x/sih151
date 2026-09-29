"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Shield,
  Calendar,
  Wallet,
  KeyRound,
  AtSign,
  Radio,
  ExternalLink,
  Copy,
  Check,
  Download,
  Layers,
  AlertTriangle,
  Languages,
  Clock,
  FileText,
  MessageSquare,
  Send,
  UserCheck,
  Tag,
  ChevronDown,
  ChevronUp,
  Globe,
  RefreshCw,
  Terminal,
  Cpu
} from "lucide-react";
import { MOCK_ACTORS } from "@/data/mockData";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { ConfidenceAuditTrail } from "@/components/ConfidenceAuditTrail";
import { PersonaMigrationTimeline } from "@/components/PersonaMigrationTimeline";
import { CaseStatusBadge } from "@/components/CaseStatusBadge";
import { CaseStatus, CaseNote, ConfidenceScore } from "@/types";
import { getStoredCaseStatus, saveStoredCaseStatus, getStoredNotes, saveStoredNotes } from "@/lib/caseStore";
import { CopyButton } from "@/components/CopyButton";

export default function ActorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const actorId = params.id as string;

  const initialActor = MOCK_ACTORS.find((a) => a.id === actorId) || MOCK_ACTORS[0];

  const [currentStatus, setCurrentStatus] = useState<CaseStatus>(initialActor.caseStatus || "under_investigation");
  const [notes, setNotes] = useState<CaseNote[]>(initialActor.notes || []);
  const [newNoteText, setNewNoteText] = useState("");
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [liveConfidence, setLiveConfidence] = useState<ConfidenceScore>(initialActor.confidence);

  // Initialize from LocalStorage
  useEffect(() => {
    const storedStatus = getStoredCaseStatus(initialActor.id, initialActor.caseStatus);
    const storedNotes = getStoredNotes(initialActor.id, initialActor.notes || []);
    setCurrentStatus(storedStatus);
    setNotes(storedNotes);
  }, [initialActor]);

  const handleStatusChange = (newStatus: CaseStatus) => {
    setCurrentStatus(newStatus);
    saveStoredCaseStatus(initialActor.id, newStatus, initialActor.primaryAlias, initialActor.caseNumber);
  };

  // Interactive toggle for deep infrastructure fingerprinting
  const [expandedInfra, setExpandedInfra] = useState<Record<string, boolean>>({
    "ID-I401": true,
    "ID-I402": true,
    "ID-I403": true,
    "ID-I404": true,
    "ID-I405": true,
    "ID-I406": true
  });

  const toggleInfra = (id: string) => {
    setExpandedInfra((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    setIsSubmittingNote(true);
    const newNote: CaseNote = {
      id: `NOTE-${Date.now().toString().slice(-4)}`,
      text: newNoteText.trim(),
      createdAt: new Date().toISOString(),
      statusAtTime: currentStatus,
      author: "Analyst Pavan Kumar (NTRO-SEC-8924)"
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    saveStoredNotes(initialActor.id, updated);
    setNewNoteText("");
    setIsSubmittingNote(false);
  };

  const getIdentifierIcon = (type: string) => {
    switch (type) {
      case "wallet":
        return <Wallet className="w-4 h-4 text-emerald-600" />;
      case "pgp_key":
        return <KeyRound className="w-4 h-4 text-indigo-600" />;
      case "handle":
        return <AtSign className="w-4 h-4 text-slate-600" />;
      case "infra_indicator":
        return <Radio className="w-4 h-4 text-red-600" />;
      default:
        return <Shield className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/actors"
            className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-white text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 tabular-nums">
                {initialActor.id}
              </span>
              <span className="text-xs text-slate-300">•</span>
              <span className="text-xs text-slate-400 tabular-nums">
                Case #{initialActor.caseNumber}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
              <span>{initialActor.primaryAlias}</span>
              <ConfidenceBadge
                level={liveConfidence.level}
                score={liveConfidence.overall}
                size="md"
              />
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/graph"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-medium transition-colors shadow-2xs"
          >
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>View in graph</span>
          </Link>
          <Link
            href={`/export?target=${initialActor.id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export dossier</span>
          </Link>
        </div>
      </div>

      {/* 1. Actor Summary Card with Case Status Control */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        {/* CASE STATUS CONTROL AT TOP OF SUMMARY CARD */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
              Investigation tag &amp; case status:
            </span>
            <CaseStatusBadge status={currentStatus} size="md" />
          </div>

          {/* Interactive Segmented Control */}
          <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200 self-start sm:self-auto text-xs font-medium">
            <button
              type="button"
              onClick={() => handleStatusChange("under_investigation")}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                currentStatus === "under_investigation"
                  ? "bg-white text-amber-900 shadow-2xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Under investigation</span>
            </button>

            <button
              type="button"
              onClick={() => handleStatusChange("confirmed")}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                currentStatus === "confirmed"
                  ? "bg-white text-emerald-900 shadow-2xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Confirmed link</span>
            </button>

            <button
              type="button"
              onClick={() => handleStatusChange("dismissed")}
              className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                currentStatus === "dismissed"
                  ? "bg-white text-slate-900 shadow-2xs font-semibold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              <span>Dismissed lead</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3 space-y-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Threat classification &amp; behavior
              </div>
              <h2 className="text-base font-bold text-slate-900 mt-1">
                {initialActor.category}
              </h2>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {initialActor.summaryDescription ||
                  "High-value target under active correlation across dark web marketplaces."}
              </p>
            </div>

            {/* Explicit Schema Fields: Category, Source, Last Scan Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Tag className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">
                    Category
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-900 mt-1">
                  {initialActor.category}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Globe className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">
                    Monitored source(s)
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-800 mt-1 truncate" title={initialActor.source}>
                  {initialActor.source}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold">
                    Last autonomous scan
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-800 mt-1 tabular-nums">
                  {initialActor.lastScanDate}
                </div>
              </div>
            </div>

            {/* Known Aliases */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Correlated persona aliases
              </div>
              <div className="flex flex-wrap gap-2">
                {initialActor.aliases.map((alias) => (
                  <span
                    key={alias}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800"
                  >
                    <AtSign className="w-3 h-3 text-slate-400" />
                    <span>{alias}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Metrics Column */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col justify-between space-y-3">
            <div className="space-y-3">
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-semibold">
                  Source endpoint
                </span>
                <div className="text-xs font-medium text-slate-800 mt-0.5 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate" title={initialActor.source}>{initialActor.source}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase text-slate-400 font-semibold">
                  Last scan date
                </span>
                <div className="text-xs font-medium text-slate-800 mt-0.5 flex items-center gap-1 tabular-nums">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{initialActor.lastScanDate}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase text-slate-400 font-semibold">
                  First observed
                </span>
                <div className="text-xs font-medium text-slate-800 mt-0.5 flex items-center gap-1 tabular-nums">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{initialActor.firstSeen}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase text-slate-400 font-semibold">
                  Last activity
                </span>
                <div className="text-xs font-medium text-slate-800 mt-0.5 flex items-center gap-1 tabular-nums">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{initialActor.lastSeen}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase text-slate-400 font-semibold">
                  Stylometry profile
                </span>
                <div className="text-xs font-medium text-slate-800 mt-0.5 flex items-center gap-1">
                  <Languages className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="capitalize">{initialActor.language || "English"}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Investigation mode:</span>
              <span className="text-blue-700 font-semibold">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PERSONA MIGRATION TIMELINE */}
      <PersonaMigrationTimeline timeline={initialActor.timeline} />

      {/* 3. CONFIDENCE AUDIT TRAIL (With Live Weight Adjuster Control) */}
      <ConfidenceAuditTrail
        confidence={liveConfidence}
        actorSimilarities={initialActor.signalSimilarities}
        onScoreRecalculated={(recalculated) => setLiveConfidence(recalculated)}
      />

      {/* 4. INVESTIGATOR NOTES & CASE HISTORY SECTION */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-semibold text-slate-900">
                Investigator notes &amp; case tag history
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Chronological log of forensic observations, warrant updates, and operational decisions recorded by intelligence analysts.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 tabular-nums">
            {notes.length} Recorded entries
          </span>
        </div>

        {/* Note Authoring Form */}
        <form onSubmit={handleAddNote} className="mt-4 space-y-3">
          <div className="relative">
            <textarea
              rows={3}
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Record forensic observation, wallet clustering update, or warrant status for this threat actor..."
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white resize-y font-sans transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Will be logged as:</span>
              <CaseStatusBadge status={currentStatus} size="sm" />
              <span className="hidden sm:inline text-[11px] text-slate-400">
                • Analyst Pavan Kumar
              </span>
            </div>

            <button
              type="submit"
              disabled={!newNoteText.trim() || isSubmittingNote}
              className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-white transition-all shadow-2xs ${
                !newNoteText.trim() || isSubmittingNote
                  ? "bg-slate-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Save investigator note</span>
            </button>
          </div>
        </form>

        {/* Saved Notes Feed */}
        <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Previous case log entries
          </div>

          {notes.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-lg border border-slate-200">
              No notes recorded yet for this case. Use the text area above to add the initial finding.
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/60 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 mb-2 border-b border-slate-200 gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-800">
                        {note.author || "Analyst Pavan Kumar (NTRO-SEC-8924)"}
                      </span>
                      <span className="text-slate-300 text-xs">•</span>
                      <CaseStatusBadge status={note.statusAtTime} size="sm" />
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-1 tabular-nums">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{new Date(note.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-wrap">
                    {note.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5. Linked Identifiers Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Linked identifiers &amp; forensic indicators
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Specific digital artifacts tying this persona across marketplaces, forums, and encrypted communications.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg tabular-nums">
            {initialActor.identifiers.length} Artifacts
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {initialActor.identifiers.map((ident) => (
            <div
              key={ident.id}
              className="p-4 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100/60 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                      {getIdentifierIcon(ident.type)}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                        {ident.type.replace(/_/g, " ")}
                        {ident.chain && ` (${ident.chain})`}
                      </span>
                    </div>
                  </div>

                  {/* Match Confidence Tag */}
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border tabular-nums ${
                      ident.matchConfidence >= 90
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : ident.matchConfidence >= 75
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    Match: {ident.matchConfidence}%
                  </span>
                </div>

                {/* Value & Copy */}
                <div className="mt-3 flex items-center justify-between bg-white border border-slate-200 rounded-lg p-2.5">
                  <span className="text-xs text-slate-800 truncate select-all tabular-nums break-all">
                    {ident.value}
                  </span>
                  <button
                    onClick={() => handleCopy(ident.value, ident.id)}
                    title="Copy value"
                    className="p-1 text-slate-400 hover:text-slate-700 transition-colors ml-2"
                  >
                    {copiedId === ident.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Context Description */}
                {ident.context && (
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {ident.context}
                  </p>
                )}

                {/* Infrastructure Fingerprint Deep Detail */}
                {ident.type === "infra_indicator" && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => toggleInfra(ident.id)}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-900 border border-red-200 text-xs font-medium transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        <Radio className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span className="font-semibold text-[11px]">
                          Infrastructure fingerprint details
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-red-700">
                        <span>{expandedInfra[ident.id] ? "Collapse" : "Expand"}</span>
                        {expandedInfra[ident.id] ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </div>
                    </button>

                    {expandedInfra[ident.id] && (
                      <div className="mt-2 p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 space-y-2.5 text-[11px]">
                        <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[10px] text-slate-400">
                          <span className="text-red-400 font-semibold tracking-wider uppercase">
                            Probe telemetry
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                            Active scanner
                          </span>
                        </div>

                        {/* TLS Certificate SHA-256 Hash */}
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center justify-between">
                            <span>TLS Cert SHA-256 (Origin Hash):</span>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopy(
                                  ident.fingerprint?.tlsSha256 ||
                                    "4e:91:a0:c4:f8:81:90:3b:e6:10:48:89:c2:71:e0:88:14:22:90:aa:bc:43:19:02:44:98:20:cc:91:82:77:1e",
                                  `${ident.id}-tls`
                                )
                              }
                              className="text-slate-400 hover:text-white flex items-center gap-0.5 text-[10px]"
                            >
                              {copiedId === `${ident.id}-tls` ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                              <span>{copiedId === `${ident.id}-tls` ? "Copied" : "Copy"}</span>
                            </button>
                          </div>
                          <div
                            className="text-emerald-400 bg-slate-950 p-1.5 rounded mt-0.5 break-all select-all tabular-nums text-[11px] border border-slate-800 cursor-pointer"
                            title={ident.fingerprint?.tlsSha256 || "Full TLS SHA-256 Certificate Hash"}
                          >
                            {ident.fingerprint?.tlsSha256
                              ? `${ident.fingerprint.tlsSha256.substring(0, 26)}...${ident.fingerprint.tlsSha256.slice(-14)}`
                              : "SHA256: 4e:91:a0:c4:f8:81...82:77:1e"}
                          </div>
                        </div>

                        {/* JARM Fingerprint */}
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center justify-between">
                            <span>JARM Active Fingerprint:</span>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopy(
                                  ident.fingerprint?.jarmFingerprint ||
                                    "29d29d15d29d29d00042d42d000000a9437190e447b97c8d9d88566a7b7a61",
                                  `${ident.id}-jarm`
                                )
                              }
                              className="text-slate-400 hover:text-white flex items-center gap-0.5 text-[10px]"
                            >
                              {copiedId === `${ident.id}-jarm` ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                              <span>{copiedId === `${ident.id}-jarm` ? "Copied" : "Copy"}</span>
                            </button>
                          </div>
                          <div className="text-indigo-300 bg-slate-950 p-1.5 rounded mt-0.5 break-all select-all tabular-nums text-[11px] border border-slate-800">
                            {ident.fingerprint?.jarmFingerprint ||
                              "29d29d15d29d29d00042d42d000000a9437190e447b97c8d9d88566a7b7a61"}
                          </div>
                        </div>

                        {/* Specific Banner String Matched */}
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                            Handshake banner matched:
                          </div>
                          <div className="text-amber-300 bg-slate-950 p-1.5 rounded mt-0.5 select-all text-[11px] border border-slate-800 leading-relaxed whitespace-pre-wrap">
                            {ident.fingerprint?.bannerString ||
                              "SSH-2.0-OpenSSH_8.4p1-Debian-5+deb11u1 ToxNode/0.2.19"}
                          </div>
                        </div>

                        {/* ASN Network Details */}
                        {(ident.fingerprint?.asn || ident.fingerprint?.asnOrg) && (
                          <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 tabular-nums">
                            <span>ASN: {ident.fingerprint.asn}</span>
                            <span className="text-slate-300 font-semibold truncate max-w-[200px]">
                              {ident.fingerprint.asnOrg}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 tabular-nums">
                <span>Source: {ident.source}</span>
                <span>Active: {ident.firstSeen}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
