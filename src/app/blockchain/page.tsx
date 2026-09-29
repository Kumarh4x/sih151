"use client";

import React, { useState } from "react";
import {
  Wallet,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Download,
  Copy,
  Check,
  Layers,
  ExternalLink,
  Send,
  Building,
  Radio,
  X
} from "lucide-react";
import { BLOCKCHAIN_NODES, BLOCKCHAIN_TRANSACTIONS } from "@/data/blockchain";
import { CopyButton } from "@/components/CopyButton";
import { addAuditLogEntry } from "@/lib/caseStore";

export default function BlockchainPage() {
  const [selectedTx, setSelectedTx] = useState<string>(BLOCKCHAIN_TRANSACTIONS[0].txid);
  const [kycModalOpen, setKycModalOpen] = useState(false);
  const [targetVaspAddress, setTargetVaspAddress] = useState("3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy");
  const [targetVaspName, setTargetVaspName] = useState("CoinDCX (FIU-IND Reg #IND-VASP-2023-019)");
  const [kycGenerated, setKycGenerated] = useState(false);

  const handleOpenKycModal = (address: string, vaspName?: string) => {
    setTargetVaspAddress(address);
    setTargetVaspName(vaspName || "Registered VASP / FIU Gateway");
    setKycModalOpen(true);
    setKycGenerated(false);
  };

  const handleGenerateKycOrder = () => {
    setKycGenerated(true);
    addAuditLogEntry({
      analyst: "Analyst Pavan Kumar (NTRO-SEC-8924)",
      action: "kyc_issued",
      actorId: "ACTOR-0941",
      caseNumber: "NTRO-CYBER-2026-089A",
      details: `Issued FIU-IND Section 12 PMLA Requisition to ${targetVaspName} for address ${targetVaspAddress}`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Cryptocurrency forensic ledger &amp; UTXO graph
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              On-Chain Correlation
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Trace Bitcoin UTXO consolidation, multi-hop peel chains, mixer hops (CoinJoin), and identify FIU-IND registered exchange exit endpoints.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleOpenKycModal(targetVaspAddress, targetVaspName)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Building className="w-4 h-4" />
          <span>Issue FIU-IND KYC request</span>
        </button>
      </div>

      {/* Heuristic Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs">
          <div className="text-[10px] uppercase font-semibold text-slate-400">
            Common-input clustering
          </div>
          <div className="text-lg font-bold text-slate-900 mt-1 tabular-nums">
            6 Addresses
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Co-spent inputs mathematically clustered into single actor wallet entity.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs">
          <div className="text-[10px] uppercase font-semibold text-slate-400">
            Peel-chain hops detected
          </div>
          <div className="text-lg font-bold text-blue-700 mt-1 tabular-nums">
            2 Change Hops
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Small amounts peeled off to mixer while principal retained in change address.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs">
          <div className="text-[10px] uppercase font-semibold text-slate-400">
            Anonymity mixer flag
          </div>
          <div className="text-lg font-bold text-amber-700 mt-1 flex items-center gap-1.5">
            <span>Wasabi CoinJoin</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            100-input CoinJoin pool transaction identified with high deanonymization heuristic.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-xs">
          <div className="text-[10px] uppercase font-semibold text-slate-400">
            Identified VASP endpoint
          </div>
          <div className="text-lg font-bold text-emerald-700 mt-1">
            CoinDCX India
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            FIU-IND reporting entity with KYC identity lookup capability.
          </p>
        </div>
      </div>

      {/* Interactive UTXO & Peel Chain Diagram */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Visual UTXO peel-chain flow &amp; exchange demixing
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any cluster node to inspect cryptographic flow and trigger forensic actions.
            </p>
          </div>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
            4-Hop Graph
          </span>
        </div>

        {/* Step-by-Step Flow Line */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 pt-2">
          {/* Node 1: Vendor Hot Escrow */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase text-slate-500">
              <span>Step 1: Vendor Escrow</span>
              <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">Origin</span>
            </div>
            <div className="font-bold text-xs text-slate-900">
              Vaultmart Hot Escrow
            </div>
            <div className="text-[11px] text-slate-600 tabular-nums break-all">
              bc1q89a1k092348mnz9...
            </div>
            <div className="text-[10px] text-slate-500">
              Turnover: 28.40 BTC (112 TXs)
            </div>
          </div>

          {/* Node 2: Cold Consolidation */}
          <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-200 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase text-blue-700">
              <span>Step 2: Consolidation</span>
              <span className="px-1.5 py-0.2 rounded bg-blue-600 text-white">Target #1</span>
            </div>
            <div className="font-bold text-xs text-slate-900">
              Viper Cold Storage
            </div>
            <div className="text-[11px] text-slate-800 tabular-nums break-all font-semibold">
              bc1q7vx4k9z809p023ml0194...
            </div>
            <div className="text-[10px] text-blue-900 font-medium">
              Consolidated: 14.82 BTC
            </div>
          </div>

          {/* Node 3: Peel Chain + Mixer */}
          <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase text-amber-800">
              <span>Step 3: Peel &amp; Mix</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-200 text-amber-900">Flagged</span>
            </div>
            <div className="font-bold text-xs text-slate-900">
              Wasabi CoinJoin Pool
            </div>
            <div className="text-[11px] text-slate-700 tabular-nums break-all">
              bc1qwasabi990128490...
            </div>
            <div className="text-[10px] text-amber-900">
              Peeled 0.75 BTC into 100-input pool
            </div>
          </div>

          {/* Node 4: VASP Endpoint */}
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase text-emerald-800">
              <span>Step 4: FIU Endpoint</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-600 text-white">Actionable</span>
            </div>
            <div className="font-bold text-xs text-slate-900">
              CoinDCX Exchange
            </div>
            <div className="text-[11px] text-slate-700 tabular-nums break-all">
              3J98t1WpEZ73CNmQ...
            </div>
            <button
              type="button"
              onClick={() => handleOpenKycModal("3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy", "CoinDCX India")}
              className="w-full mt-1 py-1 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-medium transition-colors text-center"
            >
              Order KYC Demasking
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Ledger Table */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">
            Forensic On-Chain Transactions Ledger
          </h3>
          <span className="text-xs text-slate-500 tabular-nums">
            {BLOCKCHAIN_TRANSACTIONS.length} Verified Transactions
          </span>
        </div>

        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Transaction ID (TXID)</th>
                <th className="py-2.5 px-3">From Address</th>
                <th className="py-2.5 px-3">To Address</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Heuristic Flag</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {BLOCKCHAIN_TRANSACTIONS.map((tx) => (
                <tr key={tx.txid} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3">
                    <CopyButton text={tx.txid} displayValue={`${tx.txid.slice(0, 10)}...${tx.txid.slice(-8)}`} />
                  </td>
                  <td className="py-3 px-3">
                    <CopyButton text={tx.fromAddress} displayValue={`${tx.fromAddress.slice(0, 10)}...`} />
                  </td>
                  <td className="py-3 px-3">
                    <CopyButton text={tx.toAddress} displayValue={`${tx.toAddress.slice(0, 10)}...`} />
                  </td>
                  <td className="py-3 px-3 tabular-nums font-semibold text-slate-900">
                    {tx.amount} {tx.currency}
                  </td>
                  <td className="py-3 px-3">
                    {tx.mixerService ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-semibold">
                        Mixer: {tx.mixerService}
                      </span>
                    ) : tx.vaspEndpoint ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold">
                        VASP: {tx.vaspEndpoint}
                      </span>
                    ) : tx.isPeelChange ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-semibold">
                        Peel-Chain Change
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">
                        Common-Input Cluster
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    {tx.vaspEndpoint ? (
                      <button
                        type="button"
                        onClick={() => handleOpenKycModal(tx.toAddress, tx.vaspEndpoint)}
                        className="px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 text-[11px] font-semibold"
                      >
                        KYC Request
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedTx(tx.txid)}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px]"
                      >
                        Trace
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* KYC Requisition Modal */}
      {kycModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl w-full max-w-xl overflow-hidden animate-in fade-in duration-150 space-y-4 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-700" />
                <h3 className="text-base font-bold text-slate-900">
                  FIU-IND Section 12 Statutory Requisition Order
                </h3>
              </div>
              <button
                onClick={() => setKycModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p>
                <strong>Legal Authority:</strong> Prevention of Money Laundering Act (PMLA), 2002, Section 12 &amp; Rule 3 of PMLA Maintenance of Records Rules.
              </p>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5 tabular-nums">
                <div><strong>Recipient VASP:</strong> {targetVaspName}</div>
                <div><strong>Deposit Address:</strong> <span className="break-all">{targetVaspAddress}</span></div>
                <div><strong>Investigation Case:</strong> NTRO-CYBER-2026-089A (Target: ViperKavach)</div>
                <div><strong>Statutory Window:</strong> 24 Hours Emergency Production</div>
              </div>

              {kycGenerated ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Requisition Order Generated &amp; Signed</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Order Ref #FIU-IND/NTRO/2026/089-A dispatched via encrypted SFTP gateway. Logged into audit trail.
                  </p>
                </div>
              ) : (
                <p className="text-slate-500 leading-relaxed">
                  Clicking below signs and generates the official Form 4A production notice requiring user identity, linked bank account numbers, KYC document scans, and IP connection logs.
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setKycModalOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
              {!kycGenerated ? (
                <button
                  type="button"
                  onClick={handleGenerateKycOrder}
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                >
                  Sign &amp; Dispatch Order
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setKycModalOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
