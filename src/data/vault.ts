// vault.ts — Forensic Evidence Vault items with Web Crypto SHA-256

import { EvidenceItem } from "@/types";
import { getTodayIso } from "@/lib/dateUtils";

export const EVIDENCE_VAULT_ITEMS: EvidenceItem[] = [
  {
    id: "EVD-0941-01",
    title: "PGP Subkey Cryptographic Proof of Migration (DarkKing -> ShadowKavach)",
    category: "pgp_signature",
    actorId: "ACTOR-0941",
    actorAlias: "ViperKavach",
    caseNumber: "NTRO-CYBER-2026-089A",
    rawPayload: `-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

Statement of Identity Transfer:
I, DarkKing on Nightbazaar, hereby declare migration of operations to Vaultmart under alias ShadowKavach.
All dispute resolutions and escrow settlements are honored via master wallet bc1q7vx4k9z809p023ml0194kfa90123kfa089a1.
Key Fingerprint: 89AC F901 32DC 9012 88B1 4096 B38E 91A0
-----BEGIN PGP SIGNATURE-----
iQIzBAEBCgAdFiEEiaz5ATLc8zPksYqWs46RoA==...
-----END PGP SIGNATURE-----`,
    sha256Seal: "f7d54b8a2e1c90df883102948201948201948201948201948201948201948201",
    acquiredAt: getTodayIso(-72),
    acquiredBy: "Analyst Pavan Kumar (NTRO-SEC-8924)",
    chainOfCustody: [
      {
        timestamp: getTodayIso(-72),
        officer: "Analyst Pavan Kumar",
        action: "Acquired from DarkAgora forum thread #9042",
        verificationHash: "f7d54b8a2e1c90df883102948201948201948201948201948201948201948201",
        notes: "Digital signature cryptographic seal computed."
      },
      {
        timestamp: getTodayIso(-48),
        officer: "Lead Investigator Verma",
        action: "Secondary Verification & Seal Ingestion",
        verificationHash: "f7d54b8a2e1c90df883102948201948201948201948201948201948201948201",
        notes: "Matched against Vaultmart profile header block."
      }
    ]
  },
  {
    id: "EVD-0941-02",
    title: "Blockchain UTXO Multi-Sig Consolidation Transaction Log",
    category: "blockchain_tx",
    actorId: "ACTOR-0941",
    actorAlias: "ViperKavach",
    caseNumber: "NTRO-CYBER-2026-089A",
    rawPayload: JSON.stringify(
      {
        txid: "9f8a7c6b5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b",
        vin: [{ txid: "4a2b1c...", vout: 0, address: "bc1q89a1k092348mnz9012349012849012849102" }],
        vout: [{ value: 2.4, address: "bc1q7vx4k9z809p023ml0194kfa90123kfa089a1" }]
      },
      null,
      2
    ),
    sha256Seal: "8a9f2b1049c89104810283491028390128301928301928301928301928301928",
    acquiredAt: getTodayIso(-24),
    acquiredBy: "Analyst Pavan Kumar (NTRO-SEC-8924)",
    chainOfCustody: [
      {
        timestamp: getTodayIso(-24),
        officer: "Analyst Pavan Kumar",
        action: "Extracted from Bitcoin Mempool node RPC",
        verificationHash: "8a9f2b1049c89104810283491028390128301928301928301928301928301928",
        notes: "Direct wallet consolidation confirmed."
      }
    ]
  },
  {
    id: "EVD-1102-01",
    title: "ZeroDayNexus Initial VPN Access Auction Listing Payload",
    category: "marketplace_listing",
    actorId: "ACTOR-1102",
    actorAlias: "DesiCipher",
    caseNumber: "NTRO-CYBER-2026-112B",
    rawPayload: `[AUCTION NOTICE]
Access Type: Pulse Secure Enterprise VPN (Admin Rights)
Target: Indian Regional Energy Distribution Utility
Starting Bid: 4.5 BTC ($380,000 equivalent)
Payment: BTC only via Escrow bc1q9xy87z104pkj2094mnva90123kfa044b2
Jabber: desi_cipher_root@xmpp.is (OTR mandatory)
Hindi Text: bhai log legit telemetry hai, live demo available.`,
    sha256Seal: "f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2",
    acquiredAt: getTodayIso(-36),
    acquiredBy: "Lead Investigator Verma",
    chainOfCustody: [
      {
        timestamp: getTodayIso(-36),
        officer: "Lead Investigator Verma",
        action: "Archived from ZeroDayNexus thread #4829",
        verificationHash: "f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2",
        notes: "Sealed with SHA-256 for court-admissible forensic pack."
      }
    ]
  }
];
