"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  ArrowUpDown,
  ExternalLink,
  Languages,
  Calendar,
  Layers,
  Shield,
  FileSpreadsheet,
  Tag,
  X,
  Clock,
  Globe
} from "lucide-react";
import { MOCK_ACTORS } from "@/data/mockData";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { CaseStatusBadge } from "@/components/CaseStatusBadge";
import { getStoredCaseStatus } from "@/lib/caseStore";
import { CaseStatus } from "@/types";

function ActorSearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialLang = searchParams.get("lang") || "all";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [confidenceFilter, setConfidenceFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState(initialLang);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"confidence_desc" | "confidence_asc" | "name_asc" | "name_desc" | "last_seen">("confidence_desc");
  const [actorStatuses, setActorStatuses] = useState<Record<string, CaseStatus>>({});

  useEffect(() => {
    const statuses: Record<string, CaseStatus> = {};
    MOCK_ACTORS.forEach((a) => {
      statuses[a.id] = getStoredCaseStatus(a.id, a.caseStatus);
    });
    setActorStatuses(statuses);
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(MOCK_ACTORS.map((a) => a.category)));
  }, []);

  const sources = useMemo(() => {
    const list = new Set<string>();
    MOCK_ACTORS.forEach((a) => {
      a.identifiers.forEach((id) => list.add(id.source));
      a.timeline.forEach((t) => list.add(t.source));
    });
    return Array.from(list);
  }, []);

  const filteredActors = useMemo(() => {
    return MOCK_ACTORS.filter((actor) => {
      const currentStatus = actorStatuses[actor.id] || actor.caseStatus;

      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesPrimary = actor.primaryAlias.toLowerCase().includes(q);
        const matchesAliases = actor.aliases.some((alias) =>
          alias.toLowerCase().includes(q)
        );
        const matchesCategory = actor.category.toLowerCase().includes(q);
        const matchesSource = actor.source.toLowerCase().includes(q);
        const matchesIdentifiers = actor.identifiers.some(
          (id) =>
            id.value.toLowerCase().includes(q) ||
            id.type.toLowerCase().includes(q) ||
            id.source.toLowerCase().includes(q)
        );
        if (
          !matchesPrimary &&
          !matchesAliases &&
          !matchesCategory &&
          !matchesSource &&
          !matchesIdentifiers
        ) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "all" && actor.category !== selectedCategory) {
        return false;
      }

      // Confidence filter
      if (confidenceFilter !== "all") {
        if (confidenceFilter === "high" && actor.confidence.overall < 80) return false;
        if (confidenceFilter === "medium" && (actor.confidence.overall < 60 || actor.confidence.overall >= 80)) return false;
        if (confidenceFilter === "low" && actor.confidence.overall >= 60) return false;
      }

      // Case Status filter
      if (statusFilter !== "all" && currentStatus !== statusFilter) {
        return false;
      }

      // Language Stylometry filter
      if (languageFilter !== "all" && actor.language !== languageFilter) {
        return false;
      }

      // Source filter
      if (selectedSource !== "all") {
        const hasSource =
          actor.source.includes(selectedSource) ||
          actor.timeline.some((t) => t.source === selectedSource) ||
          actor.identifiers.some((id) => id.source.includes(selectedSource));
        if (!hasSource) return false;
      }

      // Date filter
      if (dateFilter !== "all") {
        if (dateFilter === "2026" && !actor.lastSeen.startsWith("2026")) return false;
        if (dateFilter === "2025" && !actor.lastSeen.startsWith("2025")) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "confidence_desc") return b.confidence.overall - a.confidence.overall;
      if (sortBy === "confidence_asc") return a.confidence.overall - b.confidence.overall;
      if (sortBy === "name_asc") return a.primaryAlias.localeCompare(b.primaryAlias);
      if (sortBy === "name_desc") return b.primaryAlias.localeCompare(a.primaryAlias);
      if (sortBy === "last_seen") return b.lastSeen.localeCompare(a.lastSeen);
      return 0;
    });
  }, [searchQuery, selectedCategory, confidenceFilter, statusFilter, languageFilter, selectedSource, dateFilter, sortBy, actorStatuses]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setConfidenceFilter("all");
    setStatusFilter("all");
    setLanguageFilter("all");
    setSelectedSource("all");
    setDateFilter("all");
    setSortBy("confidence_desc");
  };

  return (
    <div className="space-y-6">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Threat actor intelligence &amp; search
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Query darknet personas across multi-marketplace correlation indexes, wallet clusters, and stylometry dialects.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/export"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-xs font-medium text-slate-700 transition-colors shadow-2xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
            <span>Export table</span>
          </Link>
          <Link
            href="/graph"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-2xs"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>View graph</span>
          </Link>
        </div>
      </div>

      {/* Filter / Search Panel with Stylometry Language Toggle & Case Status */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Main search text */}
          <div className="lg:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search alias, crypto wallet, PGP fingerprint, or keyword..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white tabular-nums"
            />
          </div>

          {/* Category Dropdown */}
          <div className="lg:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">All threat categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Case Status Dropdown */}
          <div className="lg:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-medium"
            >
              <option value="all">Status: All cases</option>
              <option value="under_investigation">Under investigation</option>
              <option value="confirmed">Confirmed link</option>
              <option value="dismissed">Dismissed lead</option>
            </select>
          </div>

          {/* Confidence Level Dropdown */}
          <div className="lg:col-span-1">
            <select
              value={confidenceFilter}
              onChange={(e) => setConfidenceFilter(e.target.value)}
              className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">Score</option>
              <option value="high">&ge; 80%</option>
              <option value="medium">60-79%</option>
              <option value="low">&lt; 60%</option>
            </select>
          </div>

          {/* STYLOMETRY REGIONAL LANGUAGE TOGGLE */}
          <div className="lg:col-span-2">
            <div className="relative">
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-xs bg-blue-50 border border-blue-200 rounded-lg text-blue-900 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">Language: All</option>
                <option value="english">English (Global)</option>
                <option value="hindi">Hindi (Devanagari)</option>
                <option value="hinglish">Hinglish (Transliterated)</option>
              </select>
              <Languages className="w-3.5 h-3.5 text-blue-600 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Secondary Filter Row: Sort & Date */}
        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 font-medium">
              Showing <strong className="text-slate-900 tabular-nums">{filteredActors.length}</strong> threat actor profiles
            </span>

            {statusFilter !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-200 text-slate-800 text-[11px] font-medium">
                <Tag className="w-3 h-3 text-slate-500" />
                <span>Status: {statusFilter.replace(/_/g, " ")}</span>
                <button
                  onClick={() => setStatusFilter("all")}
                  className="hover:text-slate-950 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {languageFilter !== "all" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-100 text-blue-800 text-[11px] font-medium">
                <Languages className="w-3 h-3" />
                <span>Stylometry: {languageFilter.toUpperCase()}</span>
                <button
                  onClick={() => setLanguageFilter("all")}
                  className="hover:text-blue-950 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {(searchQuery || selectedCategory !== "all" || confidenceFilter !== "all" || statusFilter !== "all" || dateFilter !== "all") && (
              <button
                onClick={resetFilters}
                className="text-xs text-blue-600 hover:text-blue-800 underline ml-2"
              >
                Reset all filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
            >
              <option value="confidence_desc">Highest confidence</option>
              <option value="confidence_asc">Lowest confidence</option>
              <option value="name_asc">Alias A-Z</option>
              <option value="name_desc">Alias Z-A</option>
              <option value="last_seen">Recently seen</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Threat actor / aliases</th>
                <th className="py-3 px-4">Case status</th>
                <th className="py-3 px-4">Threat category</th>
                <th className="py-3 px-4">Monitored source</th>
                <th className="py-3 px-4">Confidence score</th>
                <th className="py-3 px-4">Last scan</th>
                <th className="py-3 px-4">Stylometry</th>
                <th className="py-3 px-4">Active period</th>
                <th className="py-3 px-4">Indicators</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredActors.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400 text-sm">
                    No threat actor profiles matched your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredActors.map((actor) => {
                  const stylometrySignal = actor.confidence.breakdown.find(
                    (s) => s.signal === "stylometry"
                  );
                  const currentStatus = actorStatuses[actor.id] || actor.caseStatus;

                  return (
                    <tr
                      key={actor.id}
                      className="hover:bg-slate-50 transition-colors group cursor-pointer"
                    >
                      {/* Actor Alias */}
                      <td className="py-3 px-4">
                        <Link
                          href={`/actors/${actor.id}`}
                          className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors text-sm"
                        >
                          {actor.primaryAlias}
                        </Link>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {actor.aliases.map((alias) => (
                            <span
                              key={alias}
                              className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600"
                            >
                              {alias}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="py-3 px-4">
                        <CaseStatusBadge status={currentStatus} size="sm" />
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <span className="font-medium text-slate-800">
                          {actor.category}
                        </span>
                        <div className="text-[10px] text-slate-400 tabular-nums mt-0.5">
                          Case #{actor.caseNumber}
                        </div>
                      </td>

                      {/* Source */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-800 flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="text-[11px] text-slate-700">
                            {actor.source}
                          </span>
                        </div>
                      </td>

                      {/* Confidence % */}
                      <td className="py-3 px-4">
                        <ConfidenceBadge
                          level={actor.confidence.level}
                          score={actor.confidence.overall}
                          size="md"
                        />
                      </td>

                      {/* Last Scan Date */}
                      <td className="py-3 px-4 text-[11px] text-slate-600 whitespace-nowrap tabular-nums">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                          <Clock className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{actor.lastScanDate}</span>
                        </div>
                      </td>

                      {/* Stylometry Support Indicator */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                              actor.language === "hindi"
                                ? "bg-orange-50 text-orange-700 border border-orange-200"
                                : actor.language === "hinglish"
                                ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                                : "bg-slate-100 text-slate-700 border border-slate-200"
                            }`}
                          >
                            {actor.language || "english"}
                          </span>
                          {stylometrySignal && (
                            <span className="text-[11px] text-slate-500 tabular-nums">
                              ({Math.round(stylometrySignal.similarity * 100)}%)
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Active Dates */}
                      <td className="py-3 px-4 text-[11px] text-slate-500 tabular-nums">
                        {actor.firstSeen} &rarr; {actor.lastSeen}
                      </td>

                      {/* Identifiers Count */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 tabular-nums">
                          <span className="font-semibold text-slate-800">
                            {actor.identifiers.length}
                          </span>
                          <span>indicators</span>
                          <span className="text-slate-400">•</span>
                          <span>{actor.timeline.length} hops</span>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/actors/${actor.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-medium transition-colors text-xs"
                        >
                          <span>Inspect</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function ActorSearchPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-500">
          Loading intelligence index...
        </div>
      }
    >
      <ActorSearchContent />
    </Suspense>
  );
}
