"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Radio,
  Shield,
  ShieldAlert,
  Server,
  Globe,
  ExternalLink,
  Search,
  Filter,
  Copy,
  Check,
  Tag,
  AlertTriangle,
  Cpu
} from "lucide-react";
import { INFRASTRUCTURE_FINDINGS } from "@/data/infrastructure";
import { CopyButton } from "@/components/CopyButton";

export default function InfrastructurePage() {
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFindings = INFRASTRUCTURE_FINDINGS.filter((f) => {
    if (filterSeverity !== "all" && f.severity !== filterSeverity) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        f.title.toLowerCase().includes(q) ||
        f.actorAlias.toLowerCase().includes(q) ||
        f.clearnetOriginIp?.includes(q) ||
        f.asnOrg?.toLowerCase().includes(q) ||
        f.jarmFingerprint?.includes(q) ||
        f.tlsSha256?.includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Infrastructure correlation &amp; OpSec findings
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              TLS &amp; JARM Demasking
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked clearnet origin IP candidates, active probe JARM fingerprints, TLS certificate SHA-256 reuse, and host banner leaks.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded bg-red-50 text-red-800 border border-red-200 font-semibold">
            {INFRASTRUCTURE_FINDINGS.filter((f) => f.severity === "critical").length} Critical OpSec Leaks
          </span>
        </div>
      </div>

      {/* Top Ranked Clearnet Candidates Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {INFRASTRUCTURE_FINDINGS.map((finding) => (
          <div
            key={finding.id}
            className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{finding.actorAlias}</span>
                <span
                  className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                    finding.severity === "critical"
                      ? "bg-red-100 text-red-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {finding.severity}
                </span>
              </div>
              <div className="text-xs text-slate-700 font-medium mt-1">
                Clearnet IP: <strong className="tabular-nums text-slate-900">{finding.clearnetOriginIp}</strong>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">{finding.location}</div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">{finding.asnOrg}</span>
              {finding.shodanScore && (
                <span className="font-semibold text-emerald-700 tabular-nums">
                  Shodan: {finding.shodanScore}/100
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search IP, JARM hash, TLS SHA-256, or ASN..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white tabular-nums"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Severity:</span>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs"
          >
            <option value="all">All severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
          </select>
        </div>
      </div>

      {/* Detailed OpSec Findings Table */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">
            De-anonymization technical evidence records
          </h3>
          <span className="text-xs text-slate-500 tabular-nums">
            {filteredFindings.length} Records
          </span>
        </div>

        <div className="space-y-4">
          {filteredFindings.map((finding) => (
            <div
              key={finding.id}
              className="p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      finding.severity === "critical"
                        ? "bg-red-100 text-red-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {finding.severity}
                  </span>
                  <span className="font-bold text-slate-900 text-xs">{finding.title}</span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <Link
                    href={`/actors/${finding.actorId}`}
                    className="font-semibold text-blue-700 hover:text-blue-900"
                  >
                    Target: {finding.actorAlias}
                  </Link>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {finding.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                {/* TLS SHA-256 */}
                {finding.tlsSha256 && (
                  <div className="p-2.5 rounded bg-white border border-slate-200 space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                      TLS Cert SHA-256 (crt.sh):
                    </span>
                    <CopyButton text={finding.tlsSha256} displayValue={`${finding.tlsSha256.slice(0, 20)}...`} />
                    {finding.crtShMatch && (
                      <span className="text-[10px] text-blue-600 font-semibold block">
                        Matched: {finding.crtShMatch}
                      </span>
                    )}
                  </div>
                )}

                {/* JARM */}
                {finding.jarmFingerprint && (
                  <div className="p-2.5 rounded bg-white border border-slate-200 space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                      JARM Fingerprint (Censys):
                    </span>
                    <CopyButton text={finding.jarmFingerprint} displayValue={`${finding.jarmFingerprint.slice(0, 20)}...`} />
                    {finding.censysTag && (
                      <span className="text-[10px] text-indigo-600 font-semibold block">
                        Tag: {finding.censysTag}
                      </span>
                    )}
                  </div>
                )}

                {/* Origin IP & ASN */}
                {finding.clearnetOriginIp && (
                  <div className="p-2.5 rounded bg-white border border-slate-200 space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                      Origin IP &amp; Shodan Label:
                    </span>
                    <CopyButton text={finding.clearnetOriginIp} />
                    <span className="text-[10px] text-slate-600 font-medium block">
                      {finding.asnOrg} • {finding.location}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
