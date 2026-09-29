"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, Clock, ShieldCheck, Download, Command, Sun, Moon, Database } from "lucide-react";
import { CommandPalette } from "./CommandPalette";

export function Header() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsCommandOpen(true);
    window.addEventListener("open-command-palette", handleOpen);
    return () => window.removeEventListener("open-command-palette", handleOpen);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/actors?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <>
      <header className="h-16 border-b border-slate-200 bg-white/90 backdrop-blur-xs px-6 flex items-center justify-between sticky top-0 z-30">
        {/* Search Input Bar & Command Palette Trigger */}
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="relative w-80 lg:w-96 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onClick={() => setIsCommandOpen(true)}
              placeholder="Search alias, BTC/XMR wallet, PGP key, or Tox ID..."
              className="w-full pl-9 pr-14 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all tabular-nums"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <kbd className="px-1.5 py-0.5 text-[10px] text-slate-400 bg-white border border-slate-200 rounded shadow-2xs">
                ⌘K
              </kbd>
            </div>
          </form>

          {/* Synthetic Demo Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-[11px] font-medium text-amber-800">
            <Database className="w-3.5 h-3.5 text-amber-600" />
            <span>Demo dataset: synthetic</span>
          </div>
        </div>

        {/* Right status indicators */}
        <div className="flex items-center gap-3">
          {/* Security Clearance Tag */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[11px] text-slate-600">
              Clearance: <strong className="text-slate-800">Level 4 / Investigator</strong>
            </span>
          </div>

          {/* Problem Statement Code */}
          <div className="hidden xl:flex items-center gap-1 px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-lg text-[11px] font-semibold text-blue-800">
            <span>SIH26151</span>
          </div>

          {/* System Time IST */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 tabular-nums">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>IST (UTC+05:30)</span>
          </div>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Quick export link */}
          <button
            onClick={() => router.push("/export")}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-blue-700 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Dossier</span>
          </button>

          {/* Alert Bell */}
          <div className="relative">
            <button
              title="Active Intelligence Alerts"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Command Palette Modal */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
}
