import React from "react";
import { CaseStatus } from "@/types";

interface Props {
  status: CaseStatus;
  size?: "sm" | "md" | "lg";
}

export function CaseStatusBadge({ status, size = "md" }: Props) {
  const getBadgeConfig = () => {
    switch (status) {
      case "under_investigation":
        return {
          label: "Under investigation",
          bg: "bg-amber-50 text-amber-800 border-amber-200",
          dot: "bg-amber-500"
        };
      case "confirmed":
        return {
          label: "Confirmed link",
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          dot: "bg-emerald-500"
        };
      case "dismissed":
        return {
          label: "Dismissed lead",
          bg: "bg-slate-100 text-slate-600 border-slate-200",
          dot: "bg-slate-400"
        };
      default:
        return {
          label: status,
          bg: "bg-slate-100 text-slate-700 border-slate-200",
          dot: "bg-slate-400"
        };
    }
  };

  const config = getBadgeConfig();

  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5 font-medium",
    md: "text-xs px-2.5 py-1 font-medium",
    lg: "text-xs px-3 py-1.5 font-semibold"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border ${config.bg} ${sizeClasses[size]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
    </span>
  );
}
