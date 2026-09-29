"use client";

import React from "react";
import { RelationshipGraph } from "@/components/RelationshipGraph";
import { MOCK_GRAPH_DATA } from "@/data/mockData";
import { Network, Info, Shield, Layers, HelpCircle } from "lucide-react";

export default function GraphPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Entity relationship &amp; persona hopping graph
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              Live Topology (SIH26151)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Interactive multi-hop linkage between Threat Actors, Aliases, Cryptocurrency Wallets, PGP Subkeys, Off-band Handles, and Darknet Infrastructure.
          </p>
        </div>

        {/* Legend / Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-600 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-2xs tabular-nums">
          <div>
            Nodes: <strong className="text-slate-900">{MOCK_GRAPH_DATA.nodes.length}</strong>
          </div>
          <div className="w-[1px] h-4 bg-slate-200" />
          <div>
            Edges: <strong className="text-slate-900">{MOCK_GRAPH_DATA.edges.length}</strong>
          </div>
          <div className="w-[1px] h-4 bg-slate-200" />
          <div className="text-emerald-700 font-medium">
            Clustered: 100%
          </div>
        </div>
      </div>

      {/* Main Interactive Graph Component */}
      <RelationshipGraph
        initialNodes={MOCK_GRAPH_DATA.nodes}
        initialEdges={MOCK_GRAPH_DATA.edges}
      />

      {/* Analyst Guidance Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs text-xs text-slate-600 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>Graph algorithm:</strong> Physics force-directed (CoSE) with A* shortest-path solver.
            </span>
          </div>

          <div className="flex items-center gap-4 pl-0 sm:pl-3 sm:border-l border-slate-200 text-[11px] font-medium">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-5 h-0.5 bg-slate-400" />
              <span>Identifier match (Solid)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-5 h-0 border-t-2 border-dashed border-amber-600" />
              <span className="text-amber-800">Trust / vouch link (Dashed)</span>
            </span>
          </div>
        </div>

        <div className="shrink-0 text-[11px] text-slate-400">
          Double-click to center • Scroll to zoom • Drag to pan
        </div>
      </div>
    </div>
  );
}
