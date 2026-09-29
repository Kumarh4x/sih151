"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  Link2,
  ShieldAlert,
  Radio,
  Search,
  ArrowRight,
  TrendingUp,
  Activity,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Layers,
  Sparkles
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { MOCK_STATS, MOCK_ACTIVITY_FEED, MOCK_ACTORS, MOCK_SOURCES } from "@/data/mockData";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";

const ACTIVITY_TREND_DATA = [
  { day: "Mon", crawls: 4200, linksDiscovered: 4, stylometryMatches: 8 },
  { day: "Tue", crawls: 5100, linksDiscovered: 7, stylometryMatches: 12 },
  { day: "Wed", crawls: 6800, linksDiscovered: 11, stylometryMatches: 15 },
  { day: "Thu", crawls: 5900, linksDiscovered: 9, stylometryMatches: 14 },
  { day: "Fri", crawls: 8200, linksDiscovered: 14, stylometryMatches: 22 },
  { day: "Sat", crawls: 7400, linksDiscovered: 12, stylometryMatches: 18 },
  { day: "Sun", crawls: 9100, linksDiscovered: 16, stylometryMatches: 26 },
];

const CONFIDENCE_DISTRIBUTION = [
  { name: "High (>80%)", value: 38, color: "#10b981" },
  { name: "Medium (60-79%)", value: 64, color: "#f59e0b" },
  { name: "Low (<60%)", value: 40, color: "#94a3b8" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [quickQuery, setQuickQuery] = useState("");

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      router.push(`/actors?q=${encodeURIComponent(quickQuery.trim())}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Search */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                National Technical Research Organisation
              </span>
              <span className="text-xs text-slate-400">• SIH 2026 Problem Statement ID SIH26151</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1.5 tracking-tight">
              Dark Web Threat Actor De-Anonymization Platform
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Autonomous cross-marketplace persona correlation engine leveraging cryptographic wallet clustering, PGP subkey analysis, and multilingual (Hindi/Hinglish) stylometry.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <Link
              href="/graph"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors shadow-2xs"
            >
              <Layers className="w-4 h-4" />
              <span>Launch Correlation Graph</span>
            </Link>
          </div>
        </div>

        {/* Quick Search Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <form onSubmit={handleQuickSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={quickQuery}
                onChange={(e) => setQuickQuery(e.target.value)}
                placeholder="Quick Search: e.g. 'bc1q7vx4k...', 'ViperKavach', '4096R/B38E91A0', 'tox:892B10...'"
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white tabular-nums"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Search Database</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-600">Sample Queries:</span>
            <button
              type="button"
              onClick={() => router.push("/actors?q=ViperKavach")}
              className="tabular-nums text-[11px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              ViperKavach
            </button>
            <button
              type="button"
              onClick={() => router.push("/actors?q=bc1q7vx4k9z809p023ml0194kfa90123kfa089a1")}
              className="tabular-nums text-[11px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              bc1q7vx4... (BTC)
            </button>
            <button
              type="button"
              onClick={() => router.push("/actors?q=4096R/B38E91A0")}
              className="tabular-nums text-[11px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              4096R/B38E91A0 (PGP)
            </button>
            <button
              type="button"
              onClick={() => router.push("/actors?lang=hinglish")}
              className="tabular-nums text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
            >
              Filter: Hinglish Stylometry
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Actors Tracked
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold tabular-nums text-slate-900 mt-2">
            {MOCK_STATS.totalActorsTracked}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 mt-2 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14 newly correlated this month</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              High-Confidence Links
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Link2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold tabular-nums text-slate-900 mt-2">
            {MOCK_STATS.highConfidenceLinks}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Score &ge; 80% with multi-signal proof</span>
          </div>
        </div>

        <Link
          href="/actors"
          className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-slate-300 transition-colors block"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Active Investigations
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold tabular-nums text-slate-900 mt-2 flex items-baseline gap-2">
            <span>{MOCK_ACTORS.filter((a) => a.caseStatus === "under_investigation").length}</span>
            <span className="text-xs font-normal text-slate-400 font-sans">tagged active</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-800 mt-2 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Tagged &quot;Under Investigation&quot;</span>
          </div>
        </Link>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Sources Monitored
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <Radio className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold tabular-nums text-slate-900 mt-2">
            {MOCK_STATS.sourcesMonitored}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>6/8 Tor endpoints operational</span>
          </div>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* De-Anonymization Crawl & Link Discovery Trend */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Autonomous Correlation Trend (7-Day Cycle)
              </h3>
              <p className="text-xs text-slate-500">
                Volume of monitored dark web items crawled vs verified cross-actor identifier links discovered.
              </p>
            </div>
            <span className="text-[11px] tabular-nums text-slate-400">Past 7 Days</span>
          </div>

          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ACTIVITY_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="crawlGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="linkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "8px",
                    fontSize: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="crawls"
                  name="Items Crawled"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#crawlGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="linksDiscovered"
                  name="Links Discovered"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#linkGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2 text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              Items Crawled (Tor Listings)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Persona Links Discovered
            </span>
          </div>
        </div>

        {/* Confidence Level Distribution */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">
                Confidence Distribution
              </h3>
              <span className="text-[11px] tabular-nums text-slate-400">142 Entities</span>
            </div>

            <div className="h-44 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CONFIDENCE_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {CONFIDENCE_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderColor: "#e2e8f0",
                      borderRadius: "8px",
                      fontSize: "12px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 mt-2">
              {CONFIDENCE_DISTRIBUTION.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600">{item.name}</span>
                  </span>
                  <span className="tabular-nums font-semibold text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            High confidence indicates multiple cryptographically corroborated links (e.g. shared BTC wallet + identical PGP subkey).
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Activity Feed & Priority Targets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                Recent Intelligence Activity Feed
              </h3>
            </div>
            <span className="text-xs text-slate-400 tabular-nums">Live Ingestion</span>
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {MOCK_ACTIVITY_FEED.map((item) => (
              <div key={item.id} className="py-3.5 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900">
                      {item.title}
                    </span>
                    <span className="text-[10px] tabular-nums px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
                      Target: {item.actor}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                    {item.details}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 tabular-nums">
                    <span>{item.timestamp}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-medium">{item.confidenceBadge}</span>
                  </div>
                </div>

                <Link
                  href={
                    item.actor === "ViperKavach"
                      ? "/actors/ACTOR-0941"
                      : item.actor === "PhantomKolkata"
                      ? "/actors/ACTOR-0824"
                      : item.actor === "DesiCipher"
                      ? "/actors/ACTOR-1102"
                      : item.actor === "BrahmaLock"
                      ? "/actors/ACTOR-1405"
                      : "/actors"
                  }
                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded transition-colors self-center"
                  title="Inspect Intelligence Record"
                >
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Threat Actor Profiles */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">
                High-Priority Suspects
              </h3>
              <Link
                href="/actors"
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-0.5"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {MOCK_ACTORS.slice(0, 3).map((actor) => (
                <div key={actor.id} className="py-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/actors/${actor.id}`}
                      className="text-xs font-bold text-slate-900 hover:text-blue-700 transition-colors"
                    >
                      {actor.primaryAlias}
                    </Link>
                    <ConfidenceBadge
                      level={actor.confidence.level}
                      score={actor.confidence.overall}
                      size="sm"
                    />
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    Category: {actor.category}
                  </div>
                  <div className="flex items-center justify-between text-[11px] tabular-nums text-slate-400">
                    <span>{actor.identifiers.length} Linked Identifiers</span>
                    <span className="text-slate-600 font-semibold">{actor.timeline.length} Migration Epochs</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <Link
              href="/sources"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 transition-colors"
            >
              <Radio className="w-3.5 h-3.5 text-blue-600" />
              <span>Review Autonomous Crawl Status</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
