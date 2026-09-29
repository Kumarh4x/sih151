"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Layers,
  ArrowRight,
  Globe,
  Wallet,
  KeyRound,
  Radio,
  Filter,
  Shield,
  Search
} from "lucide-react";
import { MOCK_ACTORS } from "@/data/mockData";
import { PERSONA_MIGRATION_EVENTS } from "@/data/timeline";

export default function TimelinePage() {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedActorId, setSelectedActorId] = useState<string>("all");

  const allHops = MOCK_ACTORS.flatMap((a) =>
    a.timeline.map((t) => ({ ...t, actorId: a.id, primaryAlias: a.primaryAlias }))
  );

  const filteredHops = allHops.filter((h) => {
    if (selectedActorId !== "all" && h.actorId !== selectedActorId) return false;
    if (selectedYear !== "all") {
      if (!h.startDate.startsWith(selectedYear)) return false;
    }
    return true;
  }).sort((a, b) => b.startDate.localeCompare(a.startDate));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Cross-actor persona migration timeline
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              Rebranding Lineage
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Track multi-year threat actor rebranding vectors across darknet marketplace seizures and forum migrations.
          </p>
        </div>

        <Link
          href="/graph"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Layers className="w-4 h-4" />
          <span>View topology graph</span>
        </Link>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Target actor:</span>
          </div>
          <select
            value={selectedActorId}
            onChange={(e) => setSelectedActorId(e.target.value)}
            className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs"
          >
            <option value="all">All threat actors</option>
            {MOCK_ACTORS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.primaryAlias} ({a.id})
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1.5 text-slate-500 ml-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Epoch year:</span>
          </div>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs"
          >
            <option value="all">All years (2022–2026)</option>
            <option value="2026">2026 (Active)</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>

        <span className="text-slate-500 tabular-nums font-medium">
          Showing {filteredHops.length} migration events
        </span>
      </div>

      {/* Chronological Timeline Stream */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="relative border-l-2 border-blue-200 ml-4 pl-6 space-y-8">
          {filteredHops.map((hop, idx) => {
            const isActive = !hop.endDate;

            return (
              <div key={hop.id} className="relative group">
                {/* Timeline Dot */}
                <span
                  className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white ring-2 ${
                    isActive ? "bg-emerald-500 ring-emerald-200" : "bg-blue-600 ring-blue-100"
                  }`}
                />

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 group-hover:border-blue-300 transition-colors space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        {hop.actorAlias}
                      </span>
                      <Link
                        href={`/actors/${hop.actorId}`}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        ({hop.primaryAlias})
                      </Link>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          isActive
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {isActive ? "Active persona" : "Deprecated alias"}
                      </span>
                    </div>

                    <span className="text-xs text-slate-500 tabular-nums">
                      {hop.startDate} &rarr; {hop.endDate || "Present"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Venue: {hop.source}</span>
                  </div>

                  {hop.vector && (
                    <div className="text-[11px] font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded inline-block">
                      Vector: {hop.vector}
                    </div>
                  )}

                  {hop.linkedIdentifierValue && (
                    <div className="text-[11px] text-slate-600 flex items-center gap-1.5 pt-1">
                      <span className="text-slate-400">Cryptographic Anchor:</span>
                      <span className="tabular-nums font-medium text-slate-800 break-all">
                        {hop.linkedIdentifierValue}
                      </span>
                    </div>
                  )}

                  {hop.notes && (
                    <p className="text-xs text-slate-600 pt-1 border-t border-slate-200/80 leading-relaxed">
                      {hop.notes}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
