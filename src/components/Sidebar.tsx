"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Cpu,
  Wallet,
  Radio,
  AtSign,
  FileCheck,
  Calendar,
  Layers,
  Network,
  RadioTower,
  FileSpreadsheet,
  Shield
} from "lucide-react";

const NAV_ITEMS = [
  {
    name: "Dashboard overview",
    href: "/",
    icon: LayoutDashboard,
    badge: null
  },
  {
    name: "Threat actors",
    href: "/actors",
    icon: Users,
    badge: "142 Active"
  },
  {
    name: "Stylometry compare",
    href: "/stylometry",
    icon: Cpu,
    badge: "NLP"
  },
  {
    name: "Blockchain & UTXO",
    href: "/blockchain",
    icon: Wallet,
    badge: "KYC"
  },
  {
    name: "Infrastructure & OpSec",
    href: "/infrastructure",
    icon: Radio,
    badge: "JARM"
  },
  {
    name: "Off-band & PGP",
    href: "/offband",
    icon: AtSign,
    badge: "HKP"
  },
  {
    name: "Evidence vault",
    href: "/vault",
    icon: FileCheck,
    badge: "SHA-256"
  },
  {
    name: "Persona timeline",
    href: "/timeline",
    icon: Calendar,
    badge: null
  },
  {
    name: "Case management",
    href: "/cases",
    icon: Layers,
    badge: "Audit"
  },
  {
    name: "Relationship graph",
    href: "/graph",
    icon: Network,
    badge: null
  },
  {
    name: "Autonomous scans",
    href: "/sources",
    icon: RadioTower,
    badge: "Live"
  },
  {
    name: "Export dossiers",
    href: "/export",
    icon: FileSpreadsheet,
    badge: null
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between shrink-0 select-none min-h-screen">
      {/* Brand & Organization Title */}
      <div>
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white font-bold tracking-wider shadow-2xs">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold tracking-tight text-slate-900">
                  NTRO INTEL-FLOW
                </span>
                <span className="text-[10px] font-semibold px-1 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  SIH26151
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium">
                De-Anonymization Platform
              </p>
            </div>
          </div>
        </div>

        {/* Operational Status Pill */}
        <div className="px-3 py-2 mx-3 mt-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-semibold text-slate-700">Autonomous crawler</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            ONLINE
          </span>
        </div>

        {/* Navigation list */}
        <div className="p-2 space-y-0.5 overflow-y-auto max-h-[calc(100vh-220px)]">
          <div className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Investigation Suite
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-800 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive ? "text-blue-700" : "text-slate-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded font-medium ${
                      item.badge === "Live"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Analyst Session Details */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/60">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-xs font-semibold text-slate-700">
            PK
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-800 truncate">
              Analyst Pavan Kumar
            </div>
            <div className="text-[10px] text-slate-500 truncate tabular-nums">
              ID: NTRO-SEC-8924
            </div>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between">
          <span>CLASSIFICATION</span>
          <span className="text-slate-700 font-semibold">RESTRICTED // SIH</span>
        </div>
      </div>
    </aside>
  );
}
