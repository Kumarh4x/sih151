// stylometry.ts — Seed data and sample text corpora for stylometry compare

export interface StylometrySamplePair {
  id: string;
  title: string;
  actor: string;
  description: string;
  textA: string;
  textB: string;
  sourceA: string;
  sourceB: string;
}

export const SAMPLE_STYLOMETRY_PAIRS: StylometrySamplePair[] = [
  {
    id: "PAIR-01",
    title: "ViperKavach: DarkKing (Nightbazaar) vs Viper0x (Vaultmart)",
    actor: "ViperKavach",
    description: "Vendor customer support notes exhibiting heavy Hinglish dialect switching and informal phrasing.",
    sourceA: "Nightbazaar Vendor Listing 2023",
    sourceB: "Vaultmart Customer Support Bot 2026",
    textA: `Namaste buyers. All stealth packets are dispatched within 24 hours of escrow lock. Bhai delivery 100% secure hai boss, no need to worry about regional dispatch delays. Custom double-vacuum packaging with decoying electronics. Please share PGP key before pinging on Tox. Agar koi issue aata hai toh ticket raise karo, prompt refund guarantee.`,
    textB: `Hello customers. Automated tracking tokens updated hourly. Bhai delivery secure hai boss, fully tested batches with PGP signed receipts. Bulk order discounts available for repeat buyers. Telegram support gateway live for instant verification. Agar payment confirm nahi hua toh wait 2 confirmations then ping support.`
  },
  {
    id: "PAIR-02",
    title: "DesiCipher: CryptHacker (ZeroDayNexus) vs KaliLock (CipherForum)",
    actor: "DesiCipher",
    description: "Initial access broker auction postings showing specialized Hindi technical script transliteration.",
    sourceA: "ZeroDayNexus Auction Thread 2023",
    sourceB: "CipherForum VPN Credentials Post 2025",
    textA: `Auction notice for enterprise VPN domain admin credentials. Access verified on Pulse Secure gateway. Bhai log legit telemetry hai, live demo available for serious buyers only. Price 4.5 BTC non-negotiable. Escrow through forum admin or direct multisig wallet. Jaldi karo, first come first serve deal hai.`,
    textB: `New corporate network dump available. Full domain controller access with SCADA subnet reach. Bhai log legit telemetry check kar lo proof attachment mein. Contact via Jabber OTR for live verification. Deal strictly on Bitcoin escrow. Paisa safe rahega boss.`
  },
  {
    id: "PAIR-03",
    title: "PhantomKolkata: Carding Shop vs Telegram Support",
    actor: "PhantomKolkata",
    description: "Stolen banking token shop notes comparing marketplace listings with automated Telegram bot broadcasts.",
    sourceA: "Vaultmart Carding Category 2024",
    sourceB: "Telegram Broadcast Channel 2026",
    textA: `Fresh 2024 regional bank payment gateway CVV dumps with 95% valid balance rate. Instant replacement within 30 mins if card dead. Sahi maal hai bhai, bulk buyers DM on Jabber. Sab verified tokens available instantly.`,
    textB: `Carding bots updated with fresh batch from private gateways. Instant auto-replace active on Telegram bot. Sahi maal hai bhai, don't miss this limited stock. Refund request directly through bot command.`
  }
];
