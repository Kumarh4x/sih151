"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  Plus,
  ExternalLink,
  Tag,
  Search,
  MessageSquare
} from "lucide-react";
import { SEED_CASES, CaseRecord } from "@/data/cases";
import { CaseStatusBadge } from "@/components/CaseStatusBadge";
import { getStoredCaseStatus, saveStoredCaseStatus, getAuditLog } from "@/lib/caseStore";
import { CaseStatus, AuditAction } from "@/types";

export default function CasesPage() {
  const [cases, setCases] = useState<CaseRecord[]>(SEED_CASES);
  const [auditLog, setAuditLog] = useState<AuditAction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    // Sync statuses from localStorage
    const updated = SEED_CASES.map((c) => ({
      ...c,
      status: getStoredCaseStatus(c.actorId, c.status)
    }));
    setCases(updated);
    setAuditLog(getAuditLog());
  }, []);

  const handleStatusChange = (actorId: string, newStatus: CaseStatus, actorAlias: string, caseNumber: string) => {
    saveStoredCaseStatus(actorId, newStatus, actorAlias, caseNumber);
    setCases((prev) =>
      prev.map((c) => (c.actorId === actorId ? { ...c, status: newStatus } : c))
    );
    setAuditLog(getAuditLog());
  };

  const filteredCases = cases.filter((c) => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.caseNumber.toLowerCase().includes(q) ||
        c.actorAlias.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.assignedInvestigator.toLowerCase().includes(q)
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
              Case files &amp; forensic audit log
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              Chain of Custody
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Active threat actor investigations, warrant tracking, case status transitions, and immutable audit activity logs.
          </p>
        </div>

        <Link
          href="/export"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-2xs self-start sm:self-auto"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export case files</span>
        </Link>
      </div>

      {/* Case Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs">
          <div className="text-[10px] uppercase font-semibold text-slate-400">
            Under investigation
          </div>
          <div className="text-xl font-bold text-amber-700 mt-1 tabular-nums">
            {cases.filter((c) => c.status === "under_investigation").length} Cases
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Active correlation &amp; demasking workflows.</p>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs">
          <div className="text-[10px] uppercase font-semibold text-slate-400">
            Confirmed links
          </div>
          <div className="text-xl font-bold text-emerald-700 mt-1 tabular-nums">
            {cases.filter((c) => c.status === "confirmed").length} Cases
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Cryptographically corroborated de-anonymized targets.</p>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs">
          <div className="text-[10px] uppercase font-semibold text-slate-400">
            Dismissed leads
          </div>
          <div className="text-xl font-bold text-slate-700 mt-1 tabular-nums">
            {cases.filter((c) => c.status === "dismissed").length} Cases
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Benign research or non-actionable leads.</p>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
          <h3 className="text-sm font-semibold text-slate-900">
            Active investigation files ({filteredCases.length})
          </h3>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700"
            >
              <option value="all">All statuses</option>
              <option value="under_investigation">Under investigation</option>
              <option value="confirmed">Confirmed link</option>
              <option value="dismissed">Dismissed lead</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Case Number</th>
                <th className="py-2.5 px-3">Target Actor</th>
                <th className="py-2.5 px-3">Threat Category</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Investigator</th>
                <th className="py-2.5 px-3">Opened</th>
                <th className="py-2.5 px-3 text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCases.map((c) => (
                <tr key={c.caseNumber} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900 tabular-nums">
                    {c.caseNumber}
                  </td>
                  <td className="py-3 px-3">
                    <Link
                      href={`/actors/${c.actorId}`}
                      className="font-bold text-slate-900 hover:text-blue-700"
                    >
                      {c.actorAlias}
                    </Link>
                  </td>
                  <td className="py-3 px-3 text-slate-700">{c.category}</td>
                  <td className="py-3 px-3">
                    <select
                      value={c.status}
                      onChange={(e) =>
                        handleStatusChange(c.actorId, e.target.value as CaseStatus, c.actorAlias, c.caseNumber)
                      }
                      className="px-2 py-1 text-xs bg-white border border-slate-200 rounded font-medium focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                    >
                      <option value="under_investigation">Under investigation</option>
                      <option value="confirmed">Confirmed link</option>
                      <option value="dismissed">Dismissed lead</option>
                    </select>
                  </td>
                  <td className="py-3 px-3 text-slate-600">{c.assignedInvestigator}</td>
                  <td className="py-3 px-3 tabular-nums text-slate-500">{c.dateOpened}</td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      href={`/actors/${c.actorId}`}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-[11px] font-semibold inline-flex items-center gap-1"
                    >
                      <span>Inspect</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Immutable Analyst Action Audit Log */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Analyst operational audit log (Immutable activity stream)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live tracking of case updates, cryptographic evidence verifications, and statutory orders.
            </p>
          </div>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 tabular-nums font-semibold">
            {auditLog.length} Actions Logged
          </span>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {auditLog.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1"
            >
              <div className="flex items-center justify-between text-slate-800">
                <span className="font-semibold text-slate-900">{log.analyst}</span>
                <span className="text-[11px] text-slate-500 tabular-nums">
                  {new Date(log.timestamp).toLocaleTimeString()} IST ({new Date(log.timestamp).toLocaleDateString()})
                </span>
              </div>
              <p className="text-slate-700 leading-relaxed">{log.details}</p>
              {log.caseNumber && (
                <div className="text-[10px] text-slate-400 tabular-nums font-medium">
                  Reference: {log.caseNumber} • ID: {log.id}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
