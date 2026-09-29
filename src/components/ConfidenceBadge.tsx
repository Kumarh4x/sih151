import React from "react";
import { ConfidenceLevel } from "@/types";

interface Props {
  level: ConfidenceLevel;
  score?: number;
  size?: "sm" | "md" | "lg";
}

export function ConfidenceBadge({ level, score, size = "md" }: Props) {
  const getColors = () => {
    switch (level) {
      case "high":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "medium":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "low":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-xs px-2.5 py-1 font-medium",
    lg: "text-sm px-3 py-1 font-semibold"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border ${getColors()} ${sizeClasses[size]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          level === "high"
            ? "bg-emerald-500"
            : level === "medium"
            ? "bg-amber-500"
            : "bg-slate-400"
        }`}
      />
      <span className="capitalize">{level} confidence</span>
      {typeof score === "number" && (
        <span className="opacity-75 tabular-nums font-medium">({score}%)</span>
      )}
    </span>
  );
}
