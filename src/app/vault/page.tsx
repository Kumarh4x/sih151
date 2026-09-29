"use client";

import React, { useState, useEffect } from "react";
import {
  FileCheck,
  Shield,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Download,
  AlertTriangle,
  RotateCcw,
  Copy,
  Check,
  FileSpreadsheet,
  FileCode,
  FileText,
  Clock
} from "lucide-react";
import { EVIDENCE_VAULT_ITEMS } from "@/data/vault";
import { calculateSha256 } from "@/lib/cryptoUtils";
import { CopyButton } from "@/components/CopyButton";
import { addAuditLogEntry } from "@/lib/caseStore";
import { jsPDF } from "jspdf";

export default function VaultPage() {
  const [items, setItems] = useState(EVIDENCE_VAULT_ITEMS);
  const [selectedItemId, setSelectedItemId] = useState(EVIDENCE_VAULT_ITEMS[0].id);
  const [verificationResults, setVerificationResults] = useState<Record<string, { verified: boolean; computedHash: string }>>({});
  const [isVerifying, setIsVerifying] = useState<Record<string, boolean>>({});
  const [tamperedItemIds, setTamperedItemIds] = useState<Record<string, boolean>>({});
  const [customPayloads, setCustomPayloads] = useState<Record<string, string>>({});

  const selectedItem = items.find((i) => i.id === selectedItemId) || items[0];

  // Perform real Web Crypto SHA-256 verification on load
  const verifyItemIntegrity = async (itemId: string, rawText?: string) => {
    setIsVerifying((prev) => ({ ...prev, [itemId]: true }));
    const target = items.find((i) => i.id === itemId);
    if (!target) return;

    const payloadToHash = rawText !== undefined ? rawText : (customPayloads[itemId] ?? target.rawPayload);
    const computedHash = await calculateSha256(payloadToHash);
    const isMatch = computedHash.toLowerCase() === target.sha256Seal.toLowerCase();

    setVerificationResults((prev) => ({
      ...prev,
      [itemId]: { verified: isMatch, computedHash }
    }));
    setIsVerifying((prev) => ({ ...prev, [itemId]: false }));

    addAuditLogEntry({
      analyst: "Analyst Pavan Kumar (NTRO-SEC-8924)",
      action: "evidence_verified",
      actorId: target.actorId,
      caseNumber: target.caseNumber,
      details: `Web Crypto SHA-256 verification for ${target.id}: ${isMatch ? "VERIFIED VALID" : "HASH MISMATCH / TAMPER DETECTED"}`
    });
  };

  const handleTamperDemo = (itemId: string) => {
    const target = items.find((i) => i.id === itemId);
    if (!target) return;

    const tampered = target.rawPayload + "\n[TAMPERED INJECTION: 0xDEADBEEF MALICIOUS BYTE]";
    setCustomPayloads((prev) => ({ ...prev, [itemId]: tampered }));
    setTamperedItemIds((prev) => ({ ...prev, [itemId]: true }));
    verifyItemIntegrity(itemId, tampered);
  };

  const handleResetTamper = (itemId: string) => {
    const target = items.find((i) => i.id === itemId);
    if (!target) return;

    setCustomPayloads((prev) => ({ ...prev, [itemId]: target.rawPayload }));
    setTamperedItemIds((prev) => ({ ...prev, [itemId]: false }));
    verifyItemIntegrity(itemId, target.rawPayload);
  };

  const handleDownloadCertificate = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.setFontSize(10);
    doc.setTextColor(180, 0, 0);
    doc.text("RESTRICTED // NTRO SIH26151", 14, y);
    doc.setTextColor(100, 100, 100);
    doc.text("FORENSIC EVIDENCE VAULT CERTIFICATE", 110, y);
    y += 10;

    doc.setFontSize(16);
    doc.setTextColor(20, 30, 60);
    doc.text("CRYPTOGRAPHIC EVIDENCE INTEGRITY CERTIFICATE", 14, y);
    y += 8;

    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text(`Evidence Item: ${selectedItem.id} | Case: ${selectedItem.caseNumber} | Target: ${selectedItem.actorAlias}`, 14, y);
    doc.text(`Seal SHA-256: ${selectedItem.sha256Seal}`, 14, y + 5);
    doc.text(`Acquisition Date: ${selectedItem.acquiredAt} | Officer: ${selectedItem.acquiredBy}`, 14, y + 10);
    y += 20;

    doc.setFontSize(11);
    doc.setTextColor(10, 20, 40);
    doc.text("Chain of Custody Verification Log:", 14, y);
    y += 6;

    selectedItem.chainOfCustody.forEach((c) => {
      doc.setFontSize(8);
      doc.setTextColor(60, 60, 60);
      doc.text(`• [${c.timestamp}] ${c.officer}: ${c.action}`, 16, y);
      doc.text(`  Seal: ${c.verificationHash.slice(0, 40)}...`, 16, y + 4);
      y += 10;
    });

    y += 10;
    doc.text("Raw Evidence Content:", 14, y);
    y += 6;
    doc.setFontSize(7);
    doc.setTextColor(90, 90, 90);
    const lines = doc.splitTextToSize(selectedItem.rawPayload, 180);
    doc.text(lines, 14, y);

    doc.save(`NTRO_Evidence_Certificate_${selectedItem.id}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Forensic evidence vault &amp; chain of custody
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              Web Crypto SHA-256
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Court-admissible cryptographic evidence locker with client-side SHA-256 integrity verification, chain-of-custody seals, and tamper detection.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadCertificate}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export evidence certificate (PDF)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evidence List */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Stored evidence artifacts ({items.length})
            </h3>
          </div>

          <div className="space-y-2">
            {items.map((item) => {
              const res = verificationResults[item.id];
              const isTampered = tamperedItemIds[item.id];

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedItemId(item.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    selectedItemId === item.id
                      ? "bg-blue-50 border-blue-300"
                      : "bg-slate-50 hover:bg-slate-100/60 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{item.id}</span>
                    {isTampered ? (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-800 font-bold">
                        Tampered
                      </span>
                    ) : res?.verified ? (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Sealed
                      </span>
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                        Unverified
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-700 font-medium mt-1 line-clamp-1">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Target: {item.actorAlias} • Case #{item.caseNumber}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Evidence Detail & Live Verification */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">{selectedItem.title}</h3>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Acquired by {selectedItem.acquiredBy} on {selectedItem.acquiredAt}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {!tamperedItemIds[selectedItem.id] ? (
                <button
                  type="button"
                  onClick={() => handleTamperDemo(selectedItem.id)}
                  className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 text-xs font-medium transition-colors"
                >
                  Simulate tamper
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleResetTamper(selectedItem.id)}
                  className="px-2.5 py-1 rounded bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 text-xs font-medium flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset payload
                </button>
              )}

              <button
                type="button"
                onClick={() => verifyItemIntegrity(selectedItem.id)}
                disabled={isVerifying[selectedItem.id]}
                className="px-3.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
              >
                {isVerifying[selectedItem.id] ? "Computing SHA-256..." : "Verify integrity"}
              </button>
            </div>
          </div>

          {/* Cryptographic SHA-256 Seals Status */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Stored SHA-256 Seal (Master):</span>
              <CopyButton text={selectedItem.sha256Seal} />
            </div>
            {verificationResults[selectedItem.id] && (
              <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-200">
                <span className="font-semibold text-slate-700">Computed Web Crypto SHA-256:</span>
                <CopyButton text={verificationResults[selectedItem.id].computedHash} />
              </div>
            )}

            {verificationResults[selectedItem.id] && (
              <div
                className={`p-2.5 rounded text-xs font-semibold flex items-center gap-2 ${
                  verificationResults[selectedItem.id].verified
                    ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                    : "bg-red-50 text-red-900 border border-red-200"
                }`}
              >
                {verificationResults[selectedItem.id].verified ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>INTEGRITY VERIFIED: SHA-256 match validated. Evidence untouched.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>TAMPER DETECTED: Computed hash does not match vault seal!</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Raw Payload Inspector */}
          <div>
            <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Raw evidence payload
            </div>
            <pre className="p-3 rounded-lg bg-slate-950 text-slate-200 text-xs tabular-nums overflow-x-auto max-h-48 whitespace-pre-wrap">
              {customPayloads[selectedItem.id] ?? selectedItem.rawPayload}
            </pre>
          </div>

          {/* Chain of Custody Log */}
          <div>
            <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Chain of custody audit trail ({selectedItem.chainOfCustody.length} Events)
            </div>
            <div className="space-y-2">
              {selectedItem.chainOfCustody.map((log, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-slate-800">
                    <span className="font-semibold">{log.action}</span>
                    <span className="text-[11px] text-slate-500 tabular-nums">{log.timestamp}</span>
                  </div>
                  <div className="text-[11px] text-slate-600">Officer: {log.officer}</div>
                  <div className="text-[10px] text-slate-400 tabular-nums break-all">
                    Verification Seal: {log.verificationHash}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
