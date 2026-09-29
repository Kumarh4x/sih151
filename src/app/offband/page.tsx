"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AtSign,
  KeyRound,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Send,
  MessageSquare,
  Globe,
  Tag
} from "lucide-react";
import { OFFBAND_HANDLES, HKP_KEYSERVER_DATABASE } from "@/data/offband";
import { CopyButton } from "@/components/CopyButton";
import { MockHkpKey } from "@/types";

export default function OffbandPage() {
  const router = useRouter();
  const [searchKey, setSearchKey] = useState("B38E91A0");
  const [queriedKeyResult, setQueriedKeyResult] = useState<MockHkpKey | null>(HKP_KEYSERVER_DATABASE["B38E91A0"]);
  const [isSearching, setIsSearching] = useState(false);
  const [platformFilter, setPlatformFilter] = useState("all");

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchKey.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      const q = searchKey.trim().toUpperCase().replace(/\s+/g, "");
      const found = Object.values(HKP_KEYSERVER_DATABASE).find(
        (k) =>
          k.keyId.toUpperCase().includes(q) ||
          k.fingerprint.toUpperCase().replace(/\s+/g, "").includes(q) ||
          k.email.toUpperCase().includes(q) ||
          k.uid.toUpperCase().includes(q)
      );
      setQueriedKeyResult(found || null);
      setIsSearching(false);
    }, 300);
  };

  const filteredHandles = OFFBAND_HANDLES.filter((h) => {
    if (platformFilter !== "all" && h.platform !== platformFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Off-band communications &amp; PGP keyserver lookup
            </h1>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              HKP SKS Protocol
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-correlate Telegram, Jabber (XMPP), Tox, and Session handles with decentralized PGP public key certificates.
          </p>
        </div>

        <Link
          href="/graph"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Layers className="w-4 h-4" />
          <span>Launch correlation graph</span>
        </Link>
      </div>

      {/* PGP HKP Keyserver Query Box */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-semibold text-slate-900">
                Mock HKP Keyserver query endpoint (hkp://keys.openpgp.org:11371)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Query PGP Key ID, full 40-character fingerprint, or associated email to retrieve signed UIDs and subkey attestations.
            </p>
          </div>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700">
            HKP Synchronized
          </span>
        </div>

        <form onSubmit={handleLookup} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Enter PGP Key ID (e.g. 'B38E91A0', 'F772AA19') or email address..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white tabular-nums"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            {isSearching ? "Querying HKP..." : "Lookup key"}
          </button>
        </form>

        {/* Query Result Card */}
        {queriedKeyResult ? (
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">
                  {queriedKeyResult.uid}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                  Valid Certificate
                </span>
              </div>
              <div className="flex items-center gap-2">
                {queriedKeyResult.associatedActorId && (
                  <Link
                    href={`/actors/${queriedKeyResult.associatedActorId}`}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                  >
                    <span>View Actor Dossier</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
                <Link
                  href="/graph"
                  className="px-2.5 py-1 rounded bg-blue-600 text-white text-[11px] font-medium"
                >
                  Pivot to Graph
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[11px] pt-1">
              <div>
                <span className="text-slate-400 block text-[10px]">KEY ID / BITS:</span>
                <span className="font-semibold text-slate-800 tabular-nums">
                  {queriedKeyResult.keyId} ({queriedKeyResult.algorithm}-{queriedKeyResult.bits})
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">VERIFIED EMAIL:</span>
                <span className="text-slate-800 font-medium">{queriedKeyResult.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">CREATION DATE:</span>
                <span className="text-slate-800 tabular-nums">{queriedKeyResult.creationDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">EXPIRY DATE:</span>
                <span className="text-slate-800 tabular-nums">{queriedKeyResult.expiryDate}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] gap-2">
              <div>
                <span className="text-slate-400 block text-[10px]">FINGERPRINT:</span>
                <CopyButton text={queriedKeyResult.fingerprint} />
              </div>
              <div className="flex gap-1">
                {queriedKeyResult.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px]"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-center text-xs text-slate-400">
            No PGP public key found on HKP keyserver for &ldquo;{searchKey}&rdquo;
          </div>
        )}
      </div>

      {/* Off-Band Handles Table */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Correlated off-band communication channels
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Encrypted messaging profiles harvested from vendor profile banners and dispute dispute signatures.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Platform:</span>
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs"
            >
              <option value="all">All platforms</option>
              <option value="Telegram">Telegram</option>
              <option value="Jabber">Jabber (XMPP)</option>
              <option value="Tox">Tox</option>
              <option value="Session">Session</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-semibold text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Platform</th>
                <th className="py-2.5 px-3">Handle / Address</th>
                <th className="py-2.5 px-3">Linked Threat Actor</th>
                <th className="py-2.5 px-3">Source Discovery</th>
                <th className="py-2.5 px-3">PGP Key ID</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredHandles.map((handle) => (
                <tr key={handle.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-slate-900">
                      <AtSign className="w-3.5 h-3.5 text-blue-600" />
                      <span>{handle.platform}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <CopyButton text={handle.handle} displayValue={handle.handle.length > 32 ? `${handle.handle.slice(0, 24)}...` : handle.handle} />
                  </td>
                  <td className="py-3 px-3">
                    <Link
                      href={`/actors/${handle.actorId}`}
                      className="font-bold text-slate-900 hover:text-blue-700"
                    >
                      {handle.actorAlias}
                    </Link>
                  </td>
                  <td className="py-3 px-3 text-slate-600">{handle.sourceMarket}</td>
                  <td className="py-3 px-3 tabular-nums font-medium text-indigo-700">
                    {handle.pgpKeyId || "None"}
                  </td>
                  <td className="py-3 px-3 text-right space-x-2">
                    <Link
                      href="/graph"
                      className="px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 text-[11px] font-semibold inline-flex items-center gap-1"
                    >
                      <span>Pivot to graph</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
