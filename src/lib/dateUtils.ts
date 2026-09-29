// dateUtils.ts — Dynamic relative dates anchored to today

export function getTodayOffsetDays(offsetDays: number): string {
  const now = new Date();
  now.setDate(now.getDate() + offsetDays);
  return now.toISOString().split("T")[0];
}

export function getTodayIso(offsetHours: number = 0): string {
  const now = new Date();
  now.setHours(now.getHours() + offsetHours);
  return now.toISOString();
}

export function formatRelativeDate(isoOrDateStr: string): string {
  if (!isoOrDateStr) return "N/A";
  
  const date = new Date(isoOrDateStr);
  if (isNaN(date.getTime())) {
    // If it's already a relative phrase or date string
    return isoOrDateStr;
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;

  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function formatDateTime(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    }) + " IST";
  } catch {
    return isoString;
  }
}
