"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Radio,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Clock,
  Layers,
  Globe,
  Server,
  Zap,
  Play,
  Pause,
  Terminal,
  ChevronRight,
  Activity,
  ShieldCheck,
  ShieldAlert,
  GitBranch,
  ArrowRight,
  ExternalLink,
  KeyRound,
  Wallet,
  FileText
} from "lucide-react";
import {
  MOCK_SOURCES,
  MOCK_CHANGE_EVENTS,
  MOCK_DESCRIPTOR_FINDINGS,
  DescriptorFinding
} from "@/data/mockData";
import { Source, ChangeEvent } from "@/types";

export default function SourcesPage() {
  const [sources, setSources] = useState<Source[]>(MOCK_SOURCES);
  const [isScanning, setIsScanning] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [changeEvents, setChangeEvents] = useState<ChangeEvent[]>(MOCK_CHANGE_EVENTS);
  const [descriptorFindings] = useState<DescriptorFinding[]>(MOCK_DESCRIPTOR_FINDINGS);
  const [logs, setLogs] = useState<string[]>([
    "[08:15:02 UTC] [SCHEDULER] Autonomous crawl cycle #4928 initiated via Tor circuit bundle.",
    "[08:15:10 UTC] [CRAWLER] Nightbazaar: Discovered 48 new vendor listings. Extracted 6 BTC addresses.",
    "[08:22:45 UTC] [PARSER] DarkAgora: Extracted PGP signature block 4096R/B38E91A0. Correlating against known keystores.",
    "[08:30:19 UTC] [STYLOMETRY] NLP tokenizer loaded 14 Hinglish comment threads. Code-switching ratio: 0.74.",
    "[08:34:00 UTC] [MONITOR] ShadowPort Relay failed circuit rendezvous. Marked OFFLINE (Auto-retry queued)."
  ]);

  const handleTriggerCrawl = () => {
    setIsScanning(true);
    const nowIso = new Date().toISOString();
    const newLog = `[${nowIso.substring(11, 19)} UTC] [MANUAL-TRIGGER] Analyst initiated immediate scan cycle across all active onion endpoints.`;
    setLogs((prev) => [newLog, ...prev]);

    setTimeout(() => {
      setIsScanning(false);
      const finishedIso = new Date().toISOString();
      setSources((prev) =>
        prev.map((s) =>
          s.status === "active"
            ? { ...s, lastScan: finishedIso }
            : s
        )
      );
      // Continuous loop diff detection
      const freshChange: ChangeEvent = {
        id: `CHG-${Date.now().toString().slice(-4)}`,
        actorId: "ACTOR-0941",
        actorAlias: "ViperKavach",
        description: "New transaction cluster detected on Bohemia escrow relay — Just now",
        timestamp: finishedIso,
        changeType: "wallet",
        source: "Nightbazaar"
      };
      setChangeEvents((prev) => [freshChange, ...prev]);
      setLogs((prev) => [
        `[${finishedIso.substring(11, 19)} UTC] [CHANGE-DIFF] Emitted ChangeEvent ${freshChange.id}: Traced new UTXO flow to bc1q7vx4k...`,
        `[${finishedIso.substring(11, 19)} UTC] [SUCCESS] Autonomous scan cycle completed. 891 listings indexed without error.`,
        ...prev
      ]);
    }, 2000);
  };

  const getChangeIcon = (type?: string) => {
    switch (type) {
      case "wallet":
        return <Wallet className="w-3.5 h-3.5 text-emerald-600" />;
      case "pgp":
        return <KeyRound className="w-3.5 h-3.5 text-indigo-600" />;
      case "infra":
        return <Radio className="w-3.5 h-3.5 text-red-600" />;
      case "stylometry":
        return <Activity className="w-3.5 h-3.5 text-purple-600" />;
      case "migration":
        return <GitBranch className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Zap className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  const filteredSources = sources.filter((s) => {
    if (activeFilter === "all") return true;
    return s.type === activeFilter;
  });

  const getHealthBadge = (health: string) => {
    switch (health) {
      case "healthy":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Healthy
          </span>
        );
      case "degraded":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Degraded
          </span>
        );
      case "error":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Down
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Autonomous Orchestration Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Monitored Sources & Autonomous Crawl Orchestrator
            </h1>
            <span className="text-xs tabular-nums px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Autonomous Mode Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous background indexing of onion marketplaces, escrow gateways, forums, and dark web data dumps.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleTriggerCrawl}
            disabled={isScanning}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-white transition-all shadow-2xs ${
              isScanning
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : ""}`} />
            <span>{isScanning ? "Executing Tor Crawl..." : "Run Immediate Scan"}</span>
          </button>
        </div>
      </div>

      {/* Operational Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Active Tor Daemons
            </span>
            <Server className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold tabular-nums text-slate-900 mt-2">
            6 / 8 Online
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 tabular-nums">
            <span>Avg Circuit Latency: 345ms</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Total Darknet Items Indexed
            </span>
            <Layers className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold tabular-nums text-slate-900 mt-2">
            890,290
          </div>
          <div className="text-xs text-emerald-600 mt-1 font-medium tabular-nums">
            +6,410 past 24 hours
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Actors Discovered
            </span>
            <Globe className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold tabular-nums text-slate-900 mt-2">
            5,981
          </div>
          <div className="text-xs text-slate-500 mt-1 tabular-nums">
            142 flagged high priority
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Next Scheduled Cycle
            </span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold tabular-nums text-slate-900 mt-2">
            in 28m
          </div>
          <div className="text-xs text-slate-500 mt-1 tabular-nums">
            Scheduled frequency: Every 2h
          </div>
        </div>
      </div>

      {/* Autonomous Scheduler: Diff-Based Change Detection & Recent Changes Feed */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Autonomous Scheduler: Recent Changes &amp; Graph Diff Feed
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Continuous <span className="tabular-nums text-slate-700 font-semibold">collect &rarr; extract &rarr; analyze &rarr; update-graph</span> loop with diff-based change detection across darknet sources.
            </p>
          </div>

          <div className="flex items-center gap-2 tabular-nums text-[11px] self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Event-Driven Diff Engine
            </span>
          </div>
        </div>

        {/* Change events list */}
        <div className="mt-3 divide-y divide-slate-100">
          {changeEvents.map((evt) => (
            <div
              key={evt.id}
              className="py-3 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 px-2 rounded-lg transition-colors"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-100 border border-slate-200/80 shrink-0 mt-0.5 sm:mt-0">
                  {getChangeIcon(evt.changeType)}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900">
                      {evt.description}
                    </span>
                    {evt.changeType && (
                      <span className="text-[10px] tabular-nums px-2 py-0.5 rounded uppercase font-semibold tracking-wider bg-slate-100 text-slate-600">
                        {evt.changeType}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 tabular-nums mt-1">
                    {evt.actorAlias && (
                      <Link
                        href={`/actors/${evt.actorId}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold hover:underline inline-flex items-center gap-0.5"
                      >
                        <span>Target: {evt.actorAlias}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </Link>
                    )}
                    {evt.source && (
                      <>
                        <span className="text-slate-300">•</span>
                        <span>Source: {evt.source}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 tabular-nums text-[11px] text-slate-400">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>
                  {new Date(evt.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sources Table with Filter */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Filter by Source Type:
            </span>
            <div className="flex gap-1">
              {["all", "marketplace", "forum", "deep_web"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveFilter(t)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                    activeFilter === t
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {t === "all" ? "All Sources" : t.replace(/_/g, " ").toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-500 tabular-nums">
            Monitoring 8 Onion / Clearnet Mirrors
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Monitored Endpoint</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Health</th>
                <th className="py-3 px-4">Last Scanned</th>
                <th className="py-3 px-4">Next Scan</th>
                <th className="py-3 px-4">Index Volume</th>
                <th className="py-3 px-4">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 tabular-nums text-[11px]">
              {filteredSources.map((source) => (
                <tr key={source.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 font-sans text-xs">
                      {source.name}
                    </div>
                    <div className="text-[11px] text-slate-400 tabular-nums">
                      {source.onionAddress}
                    </div>
                  </td>

                  <td className="py-3 px-4 capitalize font-sans">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium uppercase">
                      {source.type.replace(/_/g, " ")}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        source.status === "active"
                          ? "text-emerald-700"
                          : "text-rose-600"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          source.status === "active" ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                      />
                      {source.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-sans">
                    {getHealthBadge(source.health)}
                  </td>

                  <td className="py-3 px-4 text-slate-600">
                    {new Date(source.lastScan).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </td>

                  <td className="py-3 px-4 text-slate-500">
                    {new Date(source.nextScan).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </td>

                  <td className="py-3 px-4 text-slate-800">
                    <div>{source.itemsIndexed?.toLocaleString()} items</div>
                    <div className="text-[10px] text-slate-400">
                      {source.actorsDiscovered} actors
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    {source.avgLatencyMs ? (
                      <span
                        className={
                          source.avgLatencyMs > 1000
                            ? "text-amber-600 font-semibold"
                            : "text-slate-600"
                        }
                      >
                        {source.avgLatencyMs}ms
                      </span>
                    ) : (
                      <span className="text-rose-500">Timeout</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Tor Descriptor Consistency Checks — Upgraded to Active Engine */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Tor Descriptor Consistency Engine
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Engine // Operational
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Protocol-level analysis tracking hidden service descriptor publication timestamps, intro point rotation velocity, and HSDir consensus churn across distributed directory authorities.
            </p>
          </div>

          <div className="flex items-center gap-2 tabular-nums text-[11px] text-slate-400 self-start sm:self-auto shrink-0">
            <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Model Implemented</span>
            </span>
          </div>
        </div>

        {/* Descriptor Findings Cards */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span>Recent Descriptor Anomaly Findings (Real-Time Consensus Audit)</span>
            <span className="tabular-nums text-[11px] text-slate-400">3 Flagged Discrepancies</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {descriptorFindings.map((finding) => (
              <div
                key={finding.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 pb-1.5 border-b border-slate-200/70">
                    <span
                      className={`text-[10px] tabular-nums px-2 py-0.5 rounded font-bold uppercase ${
                        finding.severity === "critical"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {finding.severity}
                    </span>
                    <span className="tabular-nums text-[10px] text-slate-400">{finding.timestamp}</span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 mt-2">
                    {finding.title}
                  </h4>

                  <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed font-sans">
                    {finding.detail}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 tabular-nums text-[10px] text-slate-500 space-y-0.5">
                  <div className="truncate font-semibold text-slate-700">{finding.source}</div>
                  <div className="text-slate-400 truncate">{finding.consensusRelay}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Autonomous Crawl Telemetry Console */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md tabular-nums text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-400" />
            <span className="text-slate-200 font-bold">Autonomous Crawler Telemetry Stream</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>STREAMING REAL-TIME LOGS</span>
          </div>
        </div>

        <div className="mt-3 space-y-1.5 max-h-48 overflow-y-auto text-slate-300 tabular-nums text-[11px] leading-relaxed">
          {logs.map((log, i) => (
            <div key={i} className="hover:text-white transition-colors">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
