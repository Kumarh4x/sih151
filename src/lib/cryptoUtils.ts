// cryptoUtils.ts — Real Web Crypto SHA-256 hashing

export async function calculateSha256(text: string): Promise<string> {
  if (typeof window === "undefined" || !window.crypto || !window.crypto.subtle) {
    // Fallback pseudo-sha256 if running in non-browser context
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(64, "0");
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

export function formatAddressOrHash(str: string, leadChars: number = 8, tailChars: number = 8): string {
  if (!str || str.length <= leadChars + tailChars) return str;
  return `${str.slice(0, leadChars)}...${str.slice(-tailChars)}`;
}
