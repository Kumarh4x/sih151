"use client";

import React, { useEffect, useRef, useState } from "react";
import cytoscape, { Core, NodeSingular } from "cytoscape";
import { GraphNode, GraphEdge } from "@/types";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RefreshCw,
  Filter,
  User,
  AtSign,
  Wallet,
  KeyRound,
  Server,
  Globe,
  X,
  ExternalLink,
  ShieldAlert,
  Building,
  Route,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface Props {
  initialNodes: GraphNode[];
  initialEdges: GraphEdge[];
}

const NODE_COLORS: Record<string, { bg: string; border: string; text: string; label: string }> = {
  actor: { bg: "#1e3a8a", border: "#1d4ed8", text: "#ffffff", label: "Threat Actor" },
  handle: { bg: "#475569", border: "#334155", text: "#ffffff", label: "Handle / Alias" },
  wallet: { bg: "#047857", border: "#065f46", text: "#ffffff", label: "Crypto Wallet" },
  pgp_key: { bg: "#6d28d9", border: "#5b21b6", text: "#ffffff", label: "PGP Key" },
  infra: { bg: "#b91c1c", border: "#991b1b", text: "#ffffff", label: "Infrastructure / C2" },
  source: { bg: "#0284c7", border: "#0369a1", text: "#ffffff", label: "Darknet Source" },
  offband: { bg: "#0891b2", border: "#0e7490", text: "#ffffff", label: "Off-Band (Telegram/Tox)" },
  clearnet: { bg: "#ea580c", border: "#c2410c", text: "#ffffff", label: "Clearnet IP / Host" },
  vasp: { bg: "#059669", border: "#047857", text: "#ffffff", label: "VASP / Exchange (FIU)" }
};

export function RelationshipGraph({ initialNodes, initialEdges }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);

  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [selectedNeighbors, setSelectedNeighbors] = useState<{ node: GraphNode; relation: string }[]>([]);
  const [activeTypes, setActiveTypes] = useState<Record<string, boolean>>({
    actor: true,
    handle: true,
    wallet: true,
    pgp_key: true,
    infra: true,
    source: true,
    offband: true,
    clearnet: true,
    vasp: true
  });
  const [edgeCategoryFilter, setEdgeCategoryFilter] = useState<string>("all");

  // Shortest Path state
  const [pathSourceId, setPathSourceId] = useState<string>("act_viper");
  const [pathTargetId, setPathTargetId] = useState<string>("vasp_coindcx");
  const [shortestPathResult, setShortestPathResult] = useState<string[] | null>(null);

  const toggleType = (type: string) => {
    setActiveTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Filter nodes based on active types
    const filteredNodes = initialNodes.filter((n) => activeTypes[n.type]);
    const activeNodeIds = new Set(filteredNodes.map((n) => n.id));
    
    // Filter edges based on category & active nodes
    const filteredEdges = initialEdges.filter((e) => {
      if (!activeNodeIds.has(e.source) || !activeNodeIds.has(e.target)) return false;
      if (edgeCategoryFilter !== "all" && e.category && e.category !== edgeCategoryFilter) return false;
      return true;
    });

    const elements = [
      ...filteredNodes.map((node) => ({
        data: {
          id: node.id,
          label: node.label,
          type: node.type,
          details: node.details,
          color: NODE_COLORS[node.type]?.bg || "#64748b",
          borderColor: NODE_COLORS[node.type]?.border || "#334155"
        }
      })),
      ...filteredEdges.map((edge, idx) => ({
        data: {
          id: `e_${edge.source}_${edge.target}_${idx}`,
          source: edge.source,
          target: edge.target,
          label: edge.relation.replace(/_/g, " "),
          relation: edge.relation,
          category: edge.category || "match",
          isDashed: edge.style === "dashed" || edge.relation === "vouched_for" || edge.relation === "referred_by" || edge.relation === "escrow_settlement",
          weight: edge.weight || 50
        }
      }))
    ];

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: [
        {
          selector: "node",
          style: {
            "background-color": "data(color)",
            "border-width": 2,
            "border-color": "data(borderColor)",
            label: "data(label)",
            color: "#1e293b",
            "font-size": 11,
            "font-family": "Inter, ui-sans-serif, system-ui, sans-serif",
            "font-weight": 600,
            "text-valign": "bottom",
            "text-margin-y": 6,
            "text-background-color": "#ffffff",
            "text-background-opacity": 0.9,
            "text-background-padding": "2px 4px",
            "text-background-shape": "roundrectangle",
            width: (ele: NodeSingular) => (ele.data("type") === "actor" ? 44 : 32),
            height: (ele: NodeSingular) => (ele.data("type") === "actor" ? 44 : 32)
          }
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#cbd5e1",
            "target-arrow-color": "#94a3b8",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            label: "data(label)",
            "font-size": 9,
            "font-family": "Inter, sans-serif",
            color: "#64748b",
            "text-background-color": "#f8fafc",
            "text-background-opacity": 0.9,
            "text-background-padding": "2px",
            "text-rotation": "autorotate"
          }
        },
        {
          selector: "edge[?isDashed]",
          style: {
            width: 2.5,
            "line-style": "dashed",
            "line-dash-pattern": [6, 3],
            "line-color": "#d97706",
            "target-arrow-color": "#d97706",
            color: "#b45309",
            "text-background-color": "#fffbeb"
          }
        },
        {
          selector: ".highlighted",
          style: {
            "border-width": 4,
            "border-color": "#2563eb",
            "line-color": "#2563eb",
            "target-arrow-color": "#2563eb",
            width: 3.5,
            "z-index": 999
          }
        },
        {
          selector: ".path-highlighted",
          style: {
            "border-width": 4,
            "border-color": "#10b981",
            "line-color": "#10b981",
            "target-arrow-color": "#10b981",
            width: 4,
            "z-index": 999
          }
        },
        {
          selector: ".dimmed",
          style: {
            opacity: 0.15
          }
        }
      ],
      layout: {
        name: "cose",
        animate: false,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: () => 400000,
        nodeOverlap: 20,
        idealEdgeLength: () => 120,
        edgeElasticity: () => 100
      }
    });

    cy.on("tap", "node", (evt) => {
      const node = evt.target;
      const nodeId = node.id();
      const nodeData = initialNodes.find((n) => n.id === nodeId);

      if (nodeData) {
        setSelectedNode(nodeData);

        // Highlight connected subgraph
        cy.elements().removeClass("highlighted path-highlighted dimmed");
        const connectedEdges = node.connectedEdges();
        const connectedNodes = connectedEdges.connectedNodes();

        cy.elements().addClass("dimmed");
        node.removeClass("dimmed").addClass("highlighted");
        connectedNodes.removeClass("dimmed").addClass("highlighted");
        connectedEdges.removeClass("dimmed").addClass("highlighted");

        // Find neighbors
        const neighbors: { node: GraphNode; relation: string }[] = [];
        connectedEdges.forEach((edge: any) => {
          const isSource = edge.data("source") === nodeId;
          const otherId = isSource ? edge.data("target") : edge.data("source");
          const otherNode = initialNodes.find((n) => n.id === otherId);
          if (otherNode) {
            neighbors.push({
              node: otherNode,
              relation: edge.data("label")
            });
          }
        });
        setSelectedNeighbors(neighbors);
      }
    });

    cy.on("tap", (evt) => {
      if (evt.target === cy) {
        cy.elements().removeClass("highlighted path-highlighted dimmed");
        setSelectedNode(null);
        setSelectedNeighbors([]);
      }
    });

    cyRef.current = cy;

    return () => {
      cy.destroy();
    };
  }, [activeTypes, edgeCategoryFilter, initialNodes, initialEdges]);

  // Shortest path calculation
  const handleCalculateShortestPath = () => {
    if (!cyRef.current || !pathSourceId || !pathTargetId) return;
    const cy = cyRef.current;

    cy.elements().removeClass("highlighted path-highlighted dimmed");

    const aStar = cy.elements().aStar({
      root: `#${pathSourceId}`,
      goal: `#${pathTargetId}`,
      directed: false
    });

    if (aStar.found) {
      cy.elements().addClass("dimmed");
      aStar.path.removeClass("dimmed").addClass("path-highlighted");

      const nodeSteps: string[] = [];
      aStar.path.nodes().forEach((n: any) => {
        nodeSteps.push(n.data("label"));
      });
      setShortestPathResult(nodeSteps);
    } else {
      setShortestPathResult([]);
    }
  };

  const handleZoomIn = () => cyRef.current?.zoom(cyRef.current.zoom() * 1.25);
  const handleZoomOut = () => cyRef.current?.zoom(cyRef.current.zoom() * 0.8);
  const handleResetFit = () => {
    if (cyRef.current) {
      cyRef.current.fit();
      cyRef.current.elements().removeClass("highlighted path-highlighted dimmed");
      setSelectedNode(null);
      setSelectedNeighbors([]);
      setShortestPathResult(null);
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "actor":
        return <User className="w-4 h-4 text-blue-700" />;
      case "handle":
        return <AtSign className="w-4 h-4 text-slate-700" />;
      case "wallet":
        return <Wallet className="w-4 h-4 text-emerald-700" />;
      case "pgp_key":
        return <KeyRound className="w-4 h-4 text-purple-700" />;
      case "infra":
        return <Server className="w-4 h-4 text-red-700" />;
      case "source":
        return <Globe className="w-4 h-4 text-sky-700" />;
      case "offband":
        return <AtSign className="w-4 h-4 text-cyan-700" />;
      case "clearnet":
        return <Globe className="w-4 h-4 text-orange-700" />;
      case "vasp":
        return <Building className="w-4 h-4 text-emerald-700" />;
      default:
        return <ShieldAlert className="w-4 h-4 text-slate-700" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs flex flex-col h-[780px]">
      {/* Top toolbar */}
      <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
        {/* Node Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider mr-1">
            Nodes:
          </span>
          {Object.keys(NODE_COLORS).map((type) => {
            const info = NODE_COLORS[type];
            const active = activeTypes[type];
            return (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`text-[11px] px-2 py-0.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                  active
                    ? "bg-white text-slate-800 border-slate-300 font-medium shadow-2xs"
                    : "bg-slate-100 text-slate-400 border-slate-200 line-through opacity-70"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: info.bg }}
                />
                <span>{info.label}</span>
              </button>
            );
          })}
        </div>

        {/* Edge Category Filter & View Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium">Edges:</span>
            <select
              value={edgeCategoryFilter}
              onChange={(e) => setEdgeCategoryFilter(e.target.value)}
              className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-700"
            >
              <option value="all">All relations</option>
              <option value="match">Matches (Solid)</option>
              <option value="vouch">Vouch / Trust (Dashed)</option>
              <option value="financial">Financial (Wallets/VASP)</option>
              <option value="infrastructure">Infrastructure</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 shadow-2xs">
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetFit}
              title="Reset View"
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Shortest Path Bar */}
      <div className="px-4 py-2.5 bg-blue-50 border-b border-blue-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <Route className="w-4 h-4 text-blue-700 shrink-0" />
          <span className="font-semibold text-blue-900">Shortest path finder:</span>
          <select
            value={pathSourceId}
            onChange={(e) => setPathSourceId(e.target.value)}
            className="px-2 py-1 bg-white border border-slate-200 rounded text-xs max-w-[200px] truncate"
          >
            {initialNodes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={pathTargetId}
            onChange={(e) => setPathTargetId(e.target.value)}
            className="px-2 py-1 bg-white border border-slate-200 rounded text-xs max-w-[200px] truncate"
          >
            {initialNodes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleCalculateShortestPath}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded text-xs transition-colors"
          >
            Calculate Path
          </button>
        </div>

        {shortestPathResult !== null && (
          <div className="text-xs text-emerald-800 font-medium flex items-center gap-1.5">
            {shortestPathResult.length > 0 ? (
              <span>
                Shortest path ({shortestPathResult.length} hops):{" "}
                <strong>{shortestPathResult.join(" → ")}</strong>
              </span>
            ) : (
              <span className="text-red-600">No path exists between selected nodes</span>
            )}
          </div>
        )}
      </div>

      {/* Main Canvas & Inspector View */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* Cytoscape Container */}
        <div ref={containerRef} className="flex-1 h-full w-full bg-slate-50 cursor-grab active:cursor-grabbing" />

        {/* Selected Node Inspector Flyout */}
        {selectedNode && (
          <div className="w-80 md:w-96 border-l border-slate-200 bg-white p-4 overflow-y-auto flex flex-col justify-between z-20 shadow-md">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div
                    className="p-1.5 rounded-lg"
                    style={{ backgroundColor: `${NODE_COLORS[selectedNode.type]?.bg}15` }}
                  >
                    {getNodeIcon(selectedNode.type)}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-500">
                      {NODE_COLORS[selectedNode.type]?.label || selectedNode.type}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 break-all leading-tight mt-0.5">
                      {selectedNode.label}
                    </h4>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedNode(null);
                    setSelectedNeighbors([]);
                    cyRef.current?.elements().removeClass("highlighted path-highlighted dimmed");
                  }}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {selectedNode.details && (
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                  {Object.entries(selectedNode.details).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-slate-500 capitalize">{k.replace(/_/g, " ")}:</span>
                      <span className="font-semibold text-slate-800 text-right">{String(v)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Connected Neighbors */}
              <div>
                <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex justify-between">
                  <span>Linked graph nodes</span>
                  <span className="text-slate-400 tabular-nums">({selectedNeighbors.length})</span>
                </div>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {selectedNeighbors.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-0.5"
                    >
                      <div className="font-semibold text-slate-900">{item.node.label}</div>
                      <div className="text-[11px] text-blue-700 font-medium">
                        Relation: {item.relation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {selectedNode.type === "actor" && (
              <div className="pt-3 border-t border-slate-200">
                <Link
                  href={`/actors/${selectedNode.id === "act_viper" ? "ACTOR-0941" : selectedNode.id === "act_desi" ? "ACTOR-1102" : selectedNode.id === "act_phantom" ? "ACTOR-0824" : "ACTOR-1405"}`}
                  className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <span>Open threat dossier</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
