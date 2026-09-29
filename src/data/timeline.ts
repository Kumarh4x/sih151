// timeline.ts — Persona Migration Timeline Data

import { TimelineEvent } from "@/types";

export const PERSONA_MIGRATION_EVENTS: TimelineEvent[] = [
  {
    id: "TM-01",
    actorAlias: "DarkKing",
    source: "Nightbazaar",
    startDate: "2023-01-14",
    endDate: "2024-02-18",
    linkedIdentifierId: "ID-W101",
    linkedIdentifierType: "wallet",
    linkedIdentifierValue: "bc1q7vx4k9z8...",
    vector: "Initial Operations",
    notes: "Genesis vendor profile on Nightbazaar."
  },
  {
    id: "TM-02",
    actorAlias: "ShadowKavach",
    source: "Vaultmart",
    startDate: "2024-03-01",
    endDate: "2025-06-10",
    linkedIdentifierId: "ID-P201",
    linkedIdentifierType: "pgp_key",
    linkedIdentifierValue: "4096R/B38E91A0",
    vector: "PGP Subkey Transfer",
    notes: "Migrated to Vaultmart with signed proof of reputation."
  },
  {
    id: "TM-03",
    actorAlias: "Viper0x",
    source: "DarkAgora Forum",
    startDate: "2025-07-01",
    endDate: "2025-12-15",
    linkedIdentifierId: "ID-I401",
    linkedIdentifierType: "infra_indicator",
    linkedIdentifierValue: "tox:892B104F...",
    vector: "Tox Infrastructure Pivot",
    notes: "Advertised automated escrow bot service."
  },
  {
    id: "TM-04",
    actorAlias: "ViperKavach",
    source: "Vaultmart (Active)",
    startDate: "2026-01-05",
    endDate: null,
    linkedIdentifierId: "ID-W101",
    linkedIdentifierType: "wallet",
    linkedIdentifierValue: "bc1q7vx4k9z8...",
    vector: "Consolidated Vendor Bot",
    notes: "Current active operational persona across Nightbazaar and Vaultmart."
  },
  {
    id: "TM-11",
    actorAlias: "CryptHacker",
    source: "ZeroDayNexus",
    startDate: "2023-06-20",
    endDate: "2024-04-10",
    linkedIdentifierId: "ID-P202",
    linkedIdentifierType: "pgp_key",
    linkedIdentifierValue: "4096R/F772AA19",
    vector: "Initial Network Breaches",
    notes: "Auctioned enterprise VPN credentials."
  },
  {
    id: "TM-12",
    actorAlias: "KaliLock",
    source: "CipherForum",
    startDate: "2024-04-15",
    endDate: "2025-01-20",
    linkedIdentifierId: "ID-P202",
    linkedIdentifierType: "pgp_key",
    linkedIdentifierValue: "4096R/F772AA19",
    vector: "Subkey Signed Migration",
    notes: "Ransomware builder affiliate program."
  }
];
