import React from "react";
import { TimelineEvent } from "@/types";
import { ArrowRight, Link2, ShieldAlert, KeyRound, Wallet, Globe, Radio } from "lucide-react";

interface Props {
  timeline: TimelineEvent[];
}

export function PersonaMigrationTimeline({ timeline }: Props) {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-6 text-center text-slate-500 text-sm">
        No persona migration events recorded for this entity.
      </div>
    );
  }

  const getIdentifierIcon = (type?: string) => {
    switch (type) {
      case "wallet":
        return <Wallet className="w-3.5 h-3.5 text-blue-600" />;
      case "pgp_key":
        return <KeyRound className="w-3.5 h-3.5 text-indigo-600" />;
      case "infra_indicator":
        return <Radio className="w-3.5 h-3.5 text-slate-700" />;
      default:
        return <Link2 className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-semibold text-slate-900">
              Persona migration timeline
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Temporal lineage of actor rebranding across darknet venues, linked by immutable cryptographic identifiers.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 tabular-nums">
          <span>{timeline.length} migration epochs</span>
        </div>
      </div>

      {/* Horizontal / Flow representation */}
      <div className="mt-6 overflow-x-auto pb-4">
        <div className="min-w-[760px] flex items-stretch">
          {timeline.map((event, idx) => {
            const isLast = idx === timeline.length - 1;
            const isActive = !event.endDate;

            return (
              <React.Fragment key={event.id}>
                {/* Node Box */}
                <div className="flex-1 max-w-[280px] bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col justify-between hover:border-blue-400 transition-all relative">
                  {/* Top status indicator */}
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Phase 0{idx + 1}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${
                          isActive
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {isActive ? "Active persona" : "Deprecated"}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                      {event.actorAlias}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1 font-medium">
                      <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{event.source}</span>
                    </div>

                    <div className="text-[11px] text-slate-500 mt-1 tabular-nums">
                      {event.startDate} &rarr; {event.endDate || "Present"}
                    </div>
                  </div>

                  {event.notes && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
                      {event.notes}
                    </div>
                  )}
                </div>

                {/* Connector with Annotated Shared Identifier */}
                {!isLast && (
                  <div className="w-40 flex flex-col items-center justify-center px-2 relative my-auto">
                    {/* The shared identifier badge pinned in between */}
                    <div className="bg-white border-2 border-blue-500 rounded-lg p-2 text-center w-full z-10">
                      <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                        {getIdentifierIcon(event.linkedIdentifierType)}
                        <span>Shared {event.linkedIdentifierType?.replace("_", " ") || "link"}</span>
                      </div>
                      <div
                        className="text-[10px] text-slate-800 truncate font-semibold mt-0.5 tabular-nums break-all"
                        title={event.linkedIdentifierValue}
                      >
                        {event.linkedIdentifierValue || event.linkedIdentifierId}
                      </div>
                    </div>

                    {/* Connecting line with arrow */}
                    <div className="absolute inset-x-0 h-0.5 bg-blue-300 top-1/2 -translate-y-1/2 z-0" />
                    <ArrowRight className="w-4 h-4 text-blue-600 absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="mt-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
        <span className="text-xs">
          Annotated links indicate mathematical continuity: the threat actor hopped marketplaces but reused wallet clusters, PGP signers, or C2 beacons.
        </span>
        <span className="font-semibold text-blue-700 text-xs">Chain integrity: Verified</span>
      </div>
    </div>
  );
}
