"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  User,
  Wallet,
  KeyRound,
  AtSign,
  Layers,
  FileSpreadsheet,
  Cpu,
  Radio,
  FileCheck,
  Calendar,
  X,
  ArrowRight
} from "lucide-react";
import { MOCK_ACTORS } from "@/data/mockData";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or window event
          window.dispatchEvent(new CustomEvent("open-command-palette"));
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search actors
  const matchedActors = MOCK_ACTORS.filter(
    (a) =>
      a.primaryAlias.toLowerCase().includes(q) ||
      a.aliases.some((al) => al.toLowerCase().includes(q)) ||
      a.id.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q)
  );

  // Search wallets, pgp, handles
  const matchedIdentifiers: { actorId: string; actorAlias: string; type: string; value: string }[] = [];
  MOCK_ACTORS.forEach((actor) => {
    actor.identifiers.forEach((id) => {
      if (id.value.toLowerCase().includes(q) || id.type.toLowerCase().includes(q)) {
        matchedIdentifiers.push({
          actorId: actor.id,
          actorAlias: actor.primaryAlias,
          type: id.type,
          value: id.value
        });
      }
    });
  });

  const routes = [
    { name: "Threat Actors Registry", path: "/actors", icon: User },
    { name: "Stylometry Linguistic Compare", path: "/stylometry", icon: Cpu },
    { name: "Blockchain UTXO & Peel Chains", path: "/blockchain", icon: Wallet },
    { name: "Infrastructure & OpSec Findings", path: "/infrastructure", icon: Radio },
    { name: "Off-Band & PGP Keyserver", path: "/offband", icon: AtSign },
    { name: "Forensic Evidence Vault", path: "/vault", icon: FileCheck },
    { name: "Persona Migration Timeline", path: "/timeline", icon: Calendar },
    { name: "Case Management & Audit Log", path: "/cases", icon: Layers },
    { name: "Entity Relationship Graph", path: "/graph", icon: Layers },
    { name: "Autonomous Source Monitors", path: "/sources", icon: Radio },
    { name: "Export Intelligence Dossier", path: "/export", icon: FileSpreadsheet }
  ].filter((r) => r.name.toLowerCase().includes(q));

  const handleSelect = (url: string) => {
    onClose();
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search header */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200">
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search actors, BTC/XMR addresses, PGP keys, handles, or jump to route..."
            className="w-full text-sm bg-transparent placeholder-slate-400 text-slate-900 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {/* Quick Navigation Routes */}
          {routes.length > 0 && (
            <div>
              <div className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Investigation Modules
              </div>
              <div className="space-y-0.5 mt-1">
                {routes.slice(0, 5).map((route) => {
                  const Icon = route.icon;
                  return (
                    <button
                      key={route.path}
                      onClick={() => handleSelect(route.path)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 text-left transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium">{route.name}</span>
                      </div>
                      <span className="text-slate-400 text-[11px]">{route.path}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Matched Threat Actors */}
          {matchedActors.length > 0 && (
            <div>
              <div className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Threat Actors ({matchedActors.length})
              </div>
              <div className="space-y-0.5 mt-1">
                {matchedActors.slice(0, 4).map((actor) => (
                  <button
                    key={actor.id}
                    onClick={() => handleSelect(`/actors/${actor.id}`)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 text-left transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-slate-900 flex items-center gap-2">
                        <span>{actor.primaryAlias}</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                          {actor.id}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {actor.category} • Confidence: {actor.confidence.overall}%
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Identifiers */}
          {matchedIdentifiers.length > 0 && (
            <div>
              <div className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Correlated Identifiers ({matchedIdentifiers.length})
              </div>
              <div className="space-y-0.5 mt-1">
                {matchedIdentifiers.slice(0, 5).map((id, idx) => (
                  <button
                    key={`${id.actorId}-${id.type}-${idx}`}
                    onClick={() => handleSelect(`/actors/${id.actorId}`)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 text-left transition-colors"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {id.type.replace("_", " ")}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Linked to {id.actorAlias}
                        </span>
                      </div>
                      <div className="text-xs text-slate-800 break-all tabular-nums mt-0.5">
                        {id.value}
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {routes.length === 0 && matchedActors.length === 0 && matchedIdentifiers.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-500">
              No matching records found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Navigate with ↵ Enter • Close with Esc</span>
          <span>NTRO SIH26151</span>
        </div>
      </div>
    </div>
  );
}
