"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
  displayValue?: string;
  className?: string;
}

export function CopyButton({ text, displayValue, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`inline-flex items-center gap-1.5 max-w-full ${className}`}>
      <span className="tabular-nums break-all text-slate-800 text-xs">
        {displayValue || text}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        title="Copy to clipboard"
        className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors shrink-0"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-600" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
}
