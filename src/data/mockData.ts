import { Actor, Source, GraphNode, GraphEdge, ChangeEvent } from "@/types";

export const MOCK_ACTORS: Actor[] = [
  {
    id: "ACTOR-0941",
    primaryAlias: "ViperKavach",
    aliases: ["DarkKing", "ShadowKavach", "Viper0x", "KavachRogue"],
    category: "Narcotics & Weaponized Exploits",
    source: "Nightbazaar / Vaultmart",
    lastScanDate: "2026-03-27",
    firstSeen: "2023-01-14",
    lastSeen: "2026-03-24",
    language: "hinglish",
    threatLevel: "critical",
    caseNumber: "NTRO-CYBER-2026-089A",
    caseStatus: "under_investigation",
    summaryDescription: "High-value target. Operates automated vendor bots across Nightbazaar and Vaultmart. Stylometry exhibits heavy Hinglish syntax switching (Bilingual Hindi-English idioms).",
    notes: [
      {
        id: "NOTE-01",
        text: "Cold wallet correlation bc1q7...89a1 links Nightbazaar vendor to active Vaultmart seller. Initiated regional IP intercept warrant.",
        createdAt: "2026-03-24T14:32:00Z",
        statusAtTime: "under_investigation",
        author: "Analyst Pavan Kumar (NTRO-SEC-8924)"
      },
      {
        id: "NOTE-02",
        text: "Stylometry linguistic run completed: 84% Hinglish idiom overlap with Telegram customer support transcripts.",
        createdAt: "2026-03-20T09:15:00Z",
        statusAtTime: "under_investigation",
        author: "Analyst Pavan Kumar (NTRO-SEC-8924)"
      }
    ],
    confidence: {
      overall: 89,
      level: "high",
      breakdown: [
        {
          signal: "wallet_match",
          weight: 0.30,
          similarity: 0.96,
          matched: true,
          notes: "Direct UTXO consolidation into shared cold-storage wallet bc1q7...89a1"
        },
        {
          signal: "pgp_match",
          weight: 0.20,
          similarity: 1.0,
          matched: true,
          notes: "Identical 4096R/B38E91A0 subkey used across 2 distinct market profiles"
        },
        {
          signal: "stylometry",
          weight: 0.20,
          similarity: 0.84,
          matched: true,
          notes: "Transliterated Hinglish dialect fingerprint: recurrent n-gram 'bhai delivery secure hai boss'"
        },
        {
          signal: "infra_match",
          weight: 0.15,
          similarity: 0.72,
          matched: true,
          notes: "Shared Tox ID & Jabber node hosting on Russian bulletproof AS20984"
        },
        {
          signal: "handle_match",
          weight: 0.05,
          similarity: 0.65,
          matched: true,
          notes: "Levenshtein distance 0.65 between legacy and active vendor handles"
        },
        {
          signal: "behavioral_pattern",
          weight: 0.10,
          similarity: 0.78,
          matched: true,
          notes: "Consistent posting window: 2-4 AM IST across both profiles; Nightbazaar pricing within 3% of Vaultmart listings, bulk negotiation templates reused verbatim"
        }
      ]
    },
    identifiers: [
      {
        id: "ID-W101",
        type: "wallet",
        value: "bc1q7vx4k9z809p023ml0194kfa90123kfa089a1",
        source: "Nightbazaar Escrow",
        firstSeen: "2023-02-10",
        lastSeen: "2026-03-22",
        matchConfidence: 96,
        chain: "BTC",
        context: "Vendor deposit address linked to 14.82 BTC in turnover"
      },
      {
        id: "ID-W102",
        type: "wallet",
        value: "888tNkZrPN6JsE8xZGW...49kX",
        source: "Vaultmart P2P Escrow",
        firstSeen: "2024-05-18",
        lastSeen: "2026-03-24",
        matchConfidence: 91,
        chain: "XMR (Monero)",
        context: "Stealth subaddress correlated through timing analysis"
      },
      {
        id: "ID-P201",
        type: "pgp_key",
        value: "4096R/B38E91A0 (Fingerprint: 89AC F901 32DC 9012 88B1)",
        source: "DarkAgora Signatures",
        firstSeen: "2023-01-14",
        lastSeen: "2025-11-09",
        matchConfidence: 100,
        context: "Cryptographic proof of migration from DarkKing to ShadowKavach"
      },
      {
        id: "ID-H301",
        type: "handle",
        value: "viper_kavach_support",
        source: "Telegram (Secret Chat gateway)",
        firstSeen: "2024-08-01",
        lastSeen: "2026-03-20",
        matchConfidence: 88,
        context: "Customer support endpoint for out-of-band PGP validation"
      },
      {
        id: "ID-I401",
        type: "infra_indicator",
        value: "tox:892B104F903A992...284C",
        source: "Vendor Profile Pinned Note",
        firstSeen: "2024-03-12",
        lastSeen: "2026-03-24",
        matchConfidence: 82,
        context: "Deterministic Tox public key active during market downtime",
        fingerprint: {
          tlsSha256: "b4:8a:92:c1:4f:99:3a:77:28:10:9f:5c:21:88:b9:24:66:31:0a:7e:90:dc:41:88:fe:22:91:04:ab:c3:21:94",
          jarmFingerprint: "29d29d15d29d29d00042d42d000000a9437190e447b97c8d9d88566a7b7a61",
          bannerString: "SSH-2.0-OpenSSH_8.4p1-Debian-5+deb11u1 ToxNode/0.2.19 (P2P-Encrypted-Relay)",
          asn: "AS20984",
          asnOrg: "Bulletproof Hosting Services Ltd."
        }
      }
    ],
    timeline: [
      {
        id: "TM-01",
        actorAlias: "DarkKing",
        source: "Nightbazaar",
        startDate: "2023-01-14",
        endDate: "2024-02-28",
        linkedIdentifierId: "ID-P201",
        linkedIdentifierType: "pgp_key",
        linkedIdentifierValue: "4096R/B38E91A0",
        notes: "Initial storefront established. Active narcotics listings."
      },
      {
        id: "TM-02",
        actorAlias: "ShadowKavach",
        source: "Vaultmart",
        startDate: "2024-03-01",
        endDate: "2025-04-15",
        linkedIdentifierId: "ID-W101",
        linkedIdentifierType: "wallet",
        linkedIdentifierValue: "bc1q7vx4k9z8...",
        notes: "Persona hopped post-Nightbazaar DDoS. Retained identical BTC deposit clusters."
      },
      {
        id: "TM-03",
        actorAlias: "Viper0x",
        source: "DarkAgora",
        startDate: "2025-04-18",
        endDate: "2025-12-10",
        linkedIdentifierId: "ID-I401",
        linkedIdentifierType: "infra_indicator",
        linkedIdentifierValue: "Tox: 892B104F...",
        notes: "Reputation migration thread validating new PGP signature."
      },
      {
        id: "TM-04",
        actorAlias: "ViperKavach",
        source: "ShadowPort Relay & Private Escrow",
        startDate: "2025-12-15",
        endDate: null,
        linkedIdentifierId: "ID-W101",
        linkedIdentifierType: "wallet",
        linkedIdentifierValue: "bc1q7vx4k9z8...",
        notes: "Current active operational persona. Multi-vendor automation active."
      }
    ]
  },
  {
    id: "ACTOR-1102",
    primaryAlias: "DesiCipher",
    aliases: ["CryptHacker", "DesiCipher", "KaliLock", "AnandBroker"],
    category: "Ransomware Access Broker",
    source: "ZeroDayNexus / CipherForum",
    lastScanDate: "2026-03-27",
    firstSeen: "2023-06-20",
    lastSeen: "2026-03-25",
    language: "hindi",
    threatLevel: "critical",
    caseNumber: "NTRO-CYBER-2026-112B",
    caseStatus: "confirmed",
    summaryDescription: "Specializes in breaching Indian critical infrastructure and regional enterprise VPNs. Exclusively posts auction notices in Hindi script on Russian underground forums.",
    notes: [
      {
        id: "NOTE-03",
        text: "Ransomware access broker confirmed across ZeroDayNexus and XSS forums. PGP subkey signed directly by primary CryptHacker key.",
        createdAt: "2026-03-25T11:40:00Z",
        statusAtTime: "confirmed",
        author: "Lead Investigator Verma"
      },
      {
        id: "NOTE-04",
        text: "Initial C2 staging beacon correlated with bulletproof Seychelles subnet AS44034.",
        createdAt: "2026-03-10T16:20:00Z",
        statusAtTime: "under_investigation",
        author: "Analyst Pavan Kumar"
      }
    ],
    confidence: {
      overall: 82,
      level: "high",
      breakdown: [
        {
          signal: "wallet_match",
          weight: 0.30,
          similarity: 0.88,
          matched: true,
          notes: "Ransom payout split traced to Wasabi coinjoin pool"
        },
        {
          signal: "stylometry",
          weight: 0.20,
          similarity: 0.94,
          matched: true,
          notes: "Native Devanagari punctuation patterns & syntactic clause ordering"
        },
        {
          signal: "infra_match",
          weight: 0.20,
          similarity: 0.78,
          matched: true,
          notes: "C2 server hosted in Seychelles proxy subnet matching known KaliLock IP"
        },
        {
          signal: "pgp_match",
          weight: 0.15,
          similarity: 0.60,
          matched: true,
          notes: "Signatures match secondary signing key with high trust path"
        },
        {
          signal: "handle_match",
          weight: 0.05,
          similarity: 0.85,
          matched: true,
          notes: "Alias preservation across ZeroDayNexus and XSS"
        },
        {
          signal: "behavioral_pattern",
          weight: 0.10,
          similarity: 0.72,
          matched: true,
          notes: "Auction listing cadence aligns with CryptHacker's Thursday-Sunday window (01:00-03:30 IST); pricing follows identical tiered access model"
        }
      ]
    },
    identifiers: [
      {
        id: "ID-W201",
        type: "wallet",
        value: "1BoatSLRHtKNngkd...7Z37",
        source: "CipherForum Escrow",
        firstSeen: "2023-07-01",
        lastSeen: "2026-03-10",
        matchConfidence: 88,
        chain: "BTC",
        context: "Target ransom payment address"
      },
      {
        id: "ID-P202",
        type: "pgp_key",
        value: "2048R/E49120DC (Fingerprint: 45A1 098B C451 90AB)",
        source: "ZeroDayNexus PGP Registry",
        firstSeen: "2023-06-20",
        lastSeen: "2026-02-14",
        matchConfidence: 94,
        context: "Used to authenticate server access credentials"
      },
      {
        id: "ID-I402",
        type: "infra_indicator",
        value: "185.220.101.45 (AS44034)",
        source: "C2 Beacon Log",
        firstSeen: "2024-01-10",
        lastSeen: "2026-03-25",
        matchConfidence: 78,
        context: "Reverse shell staging proxy for enterprise network exfiltration",
        fingerprint: {
          tlsSha256: "9c:28:e4:77:81:ab:03:d4:55:12:90:ea:7b:19:6c:33:04:88:21:f4:d8:20:11:59:71:09:ac:ef:43:99:12:87",
          jarmFingerprint: "27d27d27d00027d00041d41d00041d5b3d8c47b97c8d9d88566a7b7a618820",
          bannerString: "nginx/1.18.0 (Ubuntu) Strict-Transport-Security: max-age=31536000; X-Powered-By: KaliReverseProxy/1.2",
          asn: "AS44034",
          asnOrg: "Seychelles Offshore Transit AS"
        }
      }
    ],
    timeline: [
      {
        id: "TM-11",
        actorAlias: "CryptHacker",
        source: "BreachArchive Shadow Archive",
        startDate: "2023-06-20",
        endDate: "2024-01-15",
        linkedIdentifierId: "ID-P202",
        linkedIdentifierType: "pgp_key",
        linkedIdentifierValue: "2048R/E49120DC",
        notes: "Offered initial enterprise database dumps."
      },
      {
        id: "TM-12",
        actorAlias: "KaliLock",
        source: "ZeroDayNexus",
        startDate: "2024-01-20",
        endDate: "2024-11-30",
        linkedIdentifierId: "ID-I402",
        linkedIdentifierType: "infra_indicator",
        linkedIdentifierValue: "185.220.101.45",
        notes: "Advertised Citrix gateway credentials linked to same staging node."
      },
      {
        id: "TM-13",
        actorAlias: "DesiCipher",
        source: "XSS & Private Jabber",
        startDate: "2024-12-05",
        endDate: null,
        linkedIdentifierId: "ID-W201",
        linkedIdentifierType: "wallet",
        linkedIdentifierValue: "1BoatSLRHtKN...",
        notes: "Transitioned to pure access brokering; active listing of SCADA telemetry."
      }
    ]
  },
  {
    id: "ACTOR-0824",
    primaryAlias: "PhantomKolkata",
    aliases: ["KolkataEx", "KaliSpecter", "Phantom08", "SpecterPayload"],
    category: "Financial Fraud & Carding",
    source: "Vaultmart / Telegram",
    lastScanDate: "2026-03-26",
    firstSeen: "2023-09-05",
    lastSeen: "2026-03-21",
    language: "hinglish",
    threatLevel: "elevated",
    caseNumber: "NTRO-CYBER-2026-044C",
    caseStatus: "under_investigation",
    summaryDescription: "Dumps stolen CVV batches from regional Indian cooperative bank payment gateways. Uses Hinglish customer support channels on Telegram.",
    notes: [
      {
        id: "NOTE-05",
        text: "USDT TRC20 automated merchant checkout address identified on Vaultmart. Monitoring outgoing mixer hops.",
        createdAt: "2026-03-22T08:10:00Z",
        statusAtTime: "under_investigation",
        author: "Analyst Pavan Kumar"
      }
    ],
    confidence: {
      overall: 74,
      level: "medium",
      breakdown: [
        {
          signal: "wallet_match",
          weight: 0.30,
          similarity: 0.79,
          matched: true,
          notes: "USDT TRC20 address correlation on TronScan"
        },
        {
          signal: "stylometry",
          weight: 0.20,
          similarity: 0.71,
          matched: true,
          notes: "Hinglish colloquialisms: 'Full 100% replacement guarantee bhai'"
        },
        {
          signal: "handle_match",
          weight: 0.15,
          similarity: 0.82,
          matched: true,
          notes: "Predictable phonetic substitution in handles"
        },
        {
          signal: "infra_match",
          weight: 0.15,
          similarity: 0.62,
          matched: true,
          notes: "Common domain registrar & bulletproof DNS NS records"
        },
        {
          signal: "pgp_match",
          weight: 0.10,
          similarity: 0.0,
          matched: false,
          notes: "No verified PGP key published under latest alias"
        },
        {
          signal: "behavioral_pattern",
          weight: 0.10,
          similarity: 0.76,
          matched: true,
          notes: "Consistent posting window: 11 PM-2 AM IST during weekly dumps; bulk replacement guarantee negotiation phrasing identical to legacy profile"
        }
      ]
    },
    identifiers: [
      {
        id: "ID-W301",
        type: "wallet",
        value: "TXk5901kLz882N0014a091LqKk189",
        source: "Vaultmart P2P Escrow",
        firstSeen: "2023-09-12",
        lastSeen: "2026-03-21",
        matchConfidence: 79,
        chain: "USDT (TRC-20)",
        context: "Carding checkout automated merchant wallet"
      },
      {
        id: "ID-H302",
        type: "handle",
        value: "@phantom_kolkata_official",
        source: "Telegram Broadcast Channel",
        firstSeen: "2024-02-14",
        lastSeen: "2026-03-19",
        matchConfidence: 82,
        context: "Announcements of new bank database dumps"
      },
      {
        id: "ID-I404",
        type: "infra_indicator",
        value: "194.26.29.112 (AS59729)",
        source: "Carding Shop Checkout Gateway",
        firstSeen: "2024-03-15",
        lastSeen: "2026-03-20",
        matchConfidence: 72,
        context: "Automated payment webhook endpoint for stolen card batches",
        fingerprint: {
          tlsSha256: "7a:11:39:bc:44:80:ea:23:66:91:02:d8:12:44:a9:bc:98:71:02:ef:31:88:45:90:bc:12:90:aa:44:55:12:09",
          jarmFingerprint: "15d3fd16d29d29d00042d42d0000007890437190e447b97c8d9d88566a7b7a",
          bannerString: "Apache/2.4.52 (Debian) OpenSSL/1.1.1n PhantomCardGateway/2.0",
          asn: "AS59729",
          asnOrg: "Panama Cyber Transit LLC"
        }
      }
    ],
    timeline: [
      {
        id: "TM-21",
        actorAlias: "KolkataEx",
        source: "GenesisNexus Clone Market",
        startDate: "2023-09-05",
        endDate: "2024-04-10",
        linkedIdentifierId: "ID-W301",
        linkedIdentifierType: "wallet",
        linkedIdentifierValue: "TXk5901kLz88...",
        notes: "Dumped Tier-2 bank BIN tables."
      },
      {
        id: "TM-22",
        actorAlias: "PhantomKolkata",
        source: "Vaultmart",
        startDate: "2024-04-15",
        endDate: null,
        linkedIdentifierId: "ID-W301",
        linkedIdentifierType: "wallet",
        linkedIdentifierValue: "TXk5901kLz88...",
        notes: "Rebranded operation after GenesisNexusNexus marketplace seizure."
      }
    ]
  },
  {
    id: "ACTOR-1405",
    primaryAlias: "BrahmaLock",
    aliases: ["BrahmaDev", "VaultShiva", "BrahmaLock"],
    category: "Industrial Control / SCADA Exploits",
    source: "DarkAgora / Private Onion",
    lastScanDate: "2026-03-27",
    firstSeen: "2024-01-08",
    lastSeen: "2026-03-26",
    language: "hindi",
    threatLevel: "critical",
    caseNumber: "NTRO-CYBER-2026-177D",
    caseStatus: "confirmed",
    summaryDescription: "APT-adjacent actor targeting electrical distribution units in Northern India. Stylometry indicates technical Hindi with specialized mechanical engineering jargon.",
    notes: [
      {
        id: "NOTE-06",
        text: "Target confirmed as primary threat actor behind North Grid SCADA intrusion telemetry payloads. Hardcoded SSL certificate SHA-256 match validated.",
        createdAt: "2026-03-26T17:05:00Z",
        statusAtTime: "confirmed",
        author: "Dir. Cyber Operations"
      }
    ],
    confidence: {
      overall: 93,
      level: "high",
      breakdown: [
        {
          signal: "infra_match",
          weight: 0.30,
          similarity: 0.98,
          matched: true,
          notes: "Hardcoded SSL certificate SHA-256 fingerprint in custom implants"
        },
        {
          signal: "wallet_match",
          weight: 0.20,
          similarity: 0.92,
          matched: true,
          notes: "Direct on-chain hop to sanctioned Russian darknet liquidity hub"
        },
        {
          signal: "pgp_match",
          weight: 0.20,
          similarity: 0.95,
          matched: true,
          notes: "PGP key signature chain corroborated by 3 trusted forum arbiters"
        },
        {
          signal: "stylometry",
          weight: 0.15,
          similarity: 0.86,
          matched: true,
          notes: "Pure Hindi technical syntax when writing exploit advisory release notes"
        },
        {
          signal: "handle_match",
          weight: 0.05,
          similarity: 0.80,
          matched: true,
          notes: "Mythological naming convention consistency"
        },
        {
          signal: "behavioral_pattern",
          weight: 0.10,
          similarity: 0.82,
          matched: true,
          notes: "Consistent posting window: 1-4 AM IST during zero-day disclosure drops; post frequency spikes 48h after SCADA advisories; reserve price formulas identical across profiles"
        }
      ]
    },
    identifiers: [
      {
        id: "ID-I403",
        type: "infra_indicator",
        value: "SHA256: 4e91a0c4f881903be6104889c2...71e",
        source: "Malware Sandbox Capture",
        firstSeen: "2024-02-11",
        lastSeen: "2026-03-26",
        matchConfidence: 98,
        context: "Self-signed certificate embedded in OT payload delivery droppers",
        fingerprint: {
          tlsSha256: "4e:91:a0:c4:f8:81:90:3b:e6:10:48:89:c2:71:e0:88:14:22:90:aa:bc:43:19:02:44:98:20:cc:91:82:77:1e",
          jarmFingerprint: "2ad2ad16d2ad2ad22c42d42d000000e352d43a6d4590c23948e8a609d5c829",
          bannerString: "SCADA-OT-Gateway/3.1 (Siemens S7-1500 Telemetry Emulator; X.509 Subject: CN=BrahmaPayloadC2)",
          asn: "AS19820",
          asnOrg: "Rostelecom Custom Subnet"
        }
      },
      {
        id: "ID-W104",
        type: "wallet",
        value: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
        source: "DarkAgora Escrow",
        firstSeen: "2024-01-08",
        lastSeen: "2026-03-25",
        matchConfidence: 92,
        chain: "BTC",
        context: "High-value bounty escrow wallet for zero-day exploits"
      }
    ],
    timeline: [
      {
        id: "TM-31",
        actorAlias: "BrahmaDev",
        source: "ZeroDayNexus (Mirror)",
        startDate: "2024-01-08",
        endDate: "2024-09-30",
        linkedIdentifierId: "ID-I403",
        linkedIdentifierType: "infra_indicator",
        linkedIdentifierValue: "SHA256: 4e91a0c...",
        notes: "Shared initial proof-of-concept PLC disruption code."
      },
      {
        id: "TM-32",
        actorAlias: "VaultShiva",
        source: "DarkAgora",
        startDate: "2024-10-05",
        endDate: "2025-06-20",
        linkedIdentifierId: "ID-W104",
        linkedIdentifierType: "wallet",
        linkedIdentifierValue: "3J98t1WpEZ73...",
        notes: "Auctioned proprietary grid telemetry tools."
      },
      {
        id: "TM-33",
        actorAlias: "BrahmaLock",
        source: "Private Onion Marketplace",
        startDate: "2025-07-01",
        endDate: null,
        linkedIdentifierId: "ID-I403",
        linkedIdentifierType: "infra_indicator",
        linkedIdentifierValue: "SHA256: 4e91a0c...",
        notes: "Active ransomware deployment team targeting state utilities."
      }
    ]
  },
  {
    id: "ACTOR-0619",
    primaryAlias: "OpiumPrince",
    aliases: ["DesiVendor", "GoldenCrescent99", "OpiumPrince"],
    category: "Narcotics Logistics Syndicate",
    source: "Nightbazaar / ShadowPort",
    lastScanDate: "2026-03-25",
    firstSeen: "2022-11-04",
    lastSeen: "2026-03-18",
    language: "english",
    threatLevel: "high",
    caseNumber: "NTRO-CYBER-2026-019E",
    caseStatus: "under_investigation",
    summaryDescription: "Coordinates physical dead-drops across Punjab, Delhi NCR, and Mumbai. Communicates strictly in standardized international business English on marketplace frontends.",
    notes: [
      {
        id: "NOTE-07",
        text: "Cross-correlated multi-sig escrow dispute refund address on Nightbazaar. Awaiting local courier interception sync.",
        createdAt: "2026-03-18T10:45:00Z",
        statusAtTime: "under_investigation",
        author: "Analyst Pavan Kumar"
      }
    ],
    confidence: {
      overall: 68,
      level: "medium",
      breakdown: [
        {
          signal: "wallet_match",
          weight: 0.30,
          similarity: 0.70,
          matched: true,
          notes: "Multi-sig escrow patterns on Nightbazaar and Vaultmart"
        },
        {
          signal: "stylometry",
          weight: 0.20,
          similarity: 0.65,
          matched: true,
          notes: "English legalistic shipping terms and boilerplate disclaimer texts"
        },
        {
          signal: "handle_match",
          weight: 0.15,
          similarity: 0.75,
          matched: true,
          notes: "Known vendor signature format in profile descriptions"
        },
        {
          signal: "infra_match",
          weight: 0.15,
          similarity: 0.50,
          matched: false,
          notes: "Rotating VPN egress nodes make direct IP linking inconclusive"
        },
        {
          signal: "pgp_match",
          weight: 0.10,
          similarity: 0.85,
          matched: true,
          notes: "PGP key sub-fingerprint match on ShadowPort marketplace"
        },
        {
          signal: "behavioral_pattern",
          weight: 0.10,
          similarity: 0.68,
          matched: true,
          notes: "Bi-weekly dispute batch resolution window (Sunday evening UTC); standardized customer negotiation templates replicated across markets"
        }
      ]
    },
    identifiers: [
      {
        id: "ID-W105",
        type: "wallet",
        value: "bc1q99x2j309d940k1209348981200192309823091",
        source: "Nightbazaar",
        firstSeen: "2022-11-04",
        lastSeen: "2026-03-15",
        matchConfidence: 70,
        chain: "BTC",
        context: "Direct customer dispute refund wallet"
      },
      {
        id: "ID-I405",
        type: "infra_indicator",
        value: "jabber:opium_logistics@xmpp.is",
        source: "ShadowPort Vendor Profile",
        firstSeen: "2023-01-20",
        lastSeen: "2026-03-18",
        matchConfidence: 65,
        context: "Encrypted XMPP endpoint for dispute arbitration",
        fingerprint: {
          tlsSha256: "3d:90:81:fa:76:12:09:aa:bc:44:91:02:38:fe:90:82:11:00:23:44:19:90:ab:44:55:76:89:12:00:19:bb:34",
          jarmFingerprint: "20d20d16d20d20d00042d42d000000b9437190e447b97c8d9d88566a7b7a61",
          bannerString: "Prosody 0.11.13 (XMPP Server; TLSv1.3 TLS_AES_256_GCM_SHA384)",
          asn: "AS16276",
          asnOrg: "OVH SAS Bulletproof Egress"
        }
      }
    ],
    timeline: [
      {
        id: "TM-41",
        actorAlias: "DesiVendor",
        source: "SpectreBazaar Market (Legacy Trace)",
        startDate: "2022-11-04",
        endDate: "2024-03-15",
        linkedIdentifierId: "ID-W105",
        linkedIdentifierType: "wallet",
        linkedIdentifierValue: "bc1q99x2j30...",
        notes: "Operated initial pharmaceutical export storefront."
      },
      {
        id: "TM-42",
        actorAlias: "OpiumPrince",
        source: "Nightbazaar",
        startDate: "2024-04-01",
        endDate: null,
        linkedIdentifierId: "ID-W105",
        linkedIdentifierType: "wallet",
        linkedIdentifierValue: "bc1q99x2j30...",
        notes: "Current persona with over 3,400 verified positive feedback reviews."
      }
    ]
  },
  {
    id: "ACTOR-1993",
    primaryAlias: "ByteRaider",
    aliases: ["ZeroDayGuru", "KernelNull", "ByteRaider"],
    category: "Zero-Day Exploit Broker",
    source: "CipherVault / ZeroDayNexus",
    lastScanDate: "2026-03-26",
    firstSeen: "2024-04-12",
    lastSeen: "2026-03-26",
    language: "english",
    threatLevel: "high",
    caseNumber: "NTRO-CYBER-2026-302F",
    caseStatus: "dismissed",
    summaryDescription: "Technical research profile selling Linux kernel elevation of privilege exploits. Clean professional English documentation.",
    notes: [
      {
        id: "NOTE-08",
        text: "Independent vulnerability researcher. Transactions routed through legitimate third-party escrow without malicious payload distribution. Case closed and tagged dismissed.",
        createdAt: "2026-03-26T15:20:00Z",
        statusAtTime: "dismissed",
        author: "Lead Investigator Verma"
      }
    ],
    confidence: {
      overall: 48,
      level: "low",
      breakdown: [
        {
          signal: "handle_match",
          weight: 0.25,
          similarity: 0.55,
          matched: true,
          notes: "Weak alias correlation across technical messageboards"
        },
        {
          signal: "wallet_match",
          weight: 0.25,
          similarity: 0.42,
          matched: false,
          notes: "Transactions routed through Tornado.cash / Railgun anonymity pools"
        },
        {
          signal: "stylometry",
          weight: 0.20,
          similarity: 0.58,
          matched: true,
          notes: "Standard open-source C style code comments and markdown formatting"
        },
        {
          signal: "infra_match",
          weight: 0.10,
          similarity: 0.60,
          matched: true,
          notes: "Consistent WireGuard mesh relay exit hop"
        },
        {
          signal: "pgp_match",
          weight: 0.10,
          similarity: 0.30,
          matched: false,
          notes: "Fresh ephemeral PGP key pair generated per transaction"
        },
        {
          signal: "behavioral_pattern",
          weight: 0.10,
          similarity: 0.45,
          matched: false,
          notes: "Sporadic listing times with no fixed diurnal pattern; irregular disclosure intervals without predictable pricing tier"
        }
      ]
    },
    identifiers: [
      {
        id: "ID-H305",
        type: "handle",
        value: "byte_raider_sec",
        source: "CipherVault Darknet",
        firstSeen: "2024-04-12",
        lastSeen: "2026-03-26",
        matchConfidence: 55,
        context: "Verified VIP member on technical exploit forum"
      },
      {
        id: "ID-I406",
        type: "infra_indicator",
        value: "wireguard://relay.cryptbb.net:51820",
        source: "ZeroDayNexus PoC Upload Log",
        firstSeen: "2024-06-10",
        lastSeen: "2026-03-26",
        matchConfidence: 60,
        context: "Encrypted WireGuard peer node used to upload Linux kernel PoCs",
        fingerprint: {
          tlsSha256: "1f:44:89:cc:02:19:bb:78:23:44:11:89:ea:90:bc:31:00:23:76:89:12:44:aa:bb:90:12:44:76:89:12:33:45",
          jarmFingerprint: "00000000000000000041d41d00041d8820c47b97c8d9d88566a7b7a618820",
          bannerString: "WireGuard/1.0.0 (Linux 5.15.0; UDP Handshake Responding)",
          asn: "AS13335",
          asnOrg: "Cloudflare Warp / Mesh Peer"
        }
      }
    ],
    timeline: [
      {
        id: "TM-51",
        actorAlias: "ZeroDayGuru",
        source: "CipherVault Darknet",
        startDate: "2024-04-12",
        endDate: "2025-01-20",
        linkedIdentifierId: "ID-H305",
        linkedIdentifierType: "handle",
        linkedIdentifierValue: "byte_raider_sec",
        notes: "Early PoC disclosures."
      },
      {
        id: "TM-52",
        actorAlias: "ByteRaider",
        source: "ZeroDayNexus (Mirror)",
        startDate: "2025-02-01",
        endDate: null,
        linkedIdentifierId: "ID-H305",
        linkedIdentifierType: "handle",
        linkedIdentifierValue: "byte_raider_sec",
        notes: "Active broker with escrow verification pending."
      }
    ]
  }
];

export const MOCK_SOURCES: Source[] = [
  {
    id: "SRC-001",
    name: "Nightbazaar",
    type: "marketplace",
    status: "active",
    lastScan: "2026-03-27T08:15:00Z",
    nextScan: "2026-03-27T10:15:00Z",
    health: "healthy",
    onionAddress: "bohemiadark57x...onion",
    itemsIndexed: 48920,
    actorsDiscovered: 312,
    avgLatencyMs: 380,
    intervalHours: 2
  },
  {
    id: "SRC-002",
    name: "Vaultmart",
    type: "marketplace",
    status: "active",
    lastScan: "2026-03-27T07:45:00Z",
    nextScan: "2026-03-27T09:45:00Z",
    health: "healthy",
    onionAddress: "archetyp4u280v...onion",
    itemsIndexed: 62410,
    actorsDiscovered: 487,
    avgLatencyMs: 410,
    intervalHours: 2
  },
  {
    id: "SRC-003",
    name: "DarkAgora",
    type: "forum",
    status: "active",
    lastScan: "2026-03-27T08:30:00Z",
    nextScan: "2026-03-27T09:30:00Z",
    health: "healthy",
    onionAddress: "dreadcpm4v90...onion",
    itemsIndexed: 194300,
    actorsDiscovered: 1205,
    avgLatencyMs: 290,
    intervalHours: 1
  },
  {
    id: "SRC-004",
    name: "ZeroDayNexus (Mirror)",
    type: "forum",
    status: "active",
    lastScan: "2026-03-27T06:00:00Z",
    nextScan: "2026-03-27T12:00:00Z",
    health: "degraded",
    onionAddress: "exploitmirror7x...onion",
    itemsIndexed: 88150,
    actorsDiscovered: 641,
    avgLatencyMs: 1420,
    intervalHours: 6
  },
  {
    id: "SRC-005",
    name: "CipherVault Darknet",
    type: "forum",
    status: "active",
    lastScan: "2026-03-27T04:00:00Z",
    nextScan: "2026-03-27T16:00:00Z",
    health: "healthy",
    onionAddress: "cryptbbv490x...onion",
    itemsIndexed: 31200,
    actorsDiscovered: 198,
    avgLatencyMs: 340,
    intervalHours: 12
  },
  {
    id: "SRC-006",
    name: "ShadowPort Relay",
    type: "marketplace",
    status: "offline",
    lastScan: "2026-03-26T22:10:00Z",
    nextScan: "2026-03-27T10:10:00Z",
    health: "error",
    onionAddress: "tor2door78f9...onion",
    itemsIndexed: 14200,
    actorsDiscovered: 89,
    avgLatencyMs: 0,
    intervalHours: 4
  },
  {
    id: "SRC-007",
    name: "BreachArchive Shadow Archive",
    type: "deep_web",
    status: "active",
    lastScan: "2026-03-27T01:00:00Z",
    nextScan: "2026-03-28T01:00:00Z",
    health: "healthy",
    onionAddress: "rfarchive910...onion",
    itemsIndexed: 450120,
    actorsDiscovered: 2840,
    avgLatencyMs: 210,
    intervalHours: 24
  },
  {
    id: "SRC-008",
    name: "SpectreBazaar Legacy Trace",
    type: "deep_web",
    status: "offline",
    lastScan: "2026-03-25T18:00:00Z",
    nextScan: "2026-03-27T18:00:00Z",
    health: "error",
    onionAddress: "incognitodk90...onion",
    itemsIndexed: 54100,
    actorsDiscovered: 410,
    avgLatencyMs: 0,
    intervalHours: 24
  }
];

export const MOCK_GRAPH_DATA: { nodes: GraphNode[]; edges: GraphEdge[] } = {
  nodes: [
    // Actors
    { id: "act_viper", type: "actor", label: "ViperKavach (Target #1)", details: { confidence: 89, category: "Narcotics/Exploits", threat: "Critical" } },
    { id: "act_desi", type: "actor", label: "DesiCipher (Target #2)", details: { confidence: 82, category: "Ransomware Access", threat: "Critical" } },
    { id: "act_phantom", type: "actor", label: "PhantomKolkata", details: { confidence: 74, category: "Carding/Fraud", threat: "Elevated" } },
    { id: "act_brahma", type: "actor", label: "BrahmaLock", details: { confidence: 93, category: "SCADA Exploits", threat: "Critical" } },

    // Handles & Aliases
    { id: "hdl_darkking", type: "handle", label: "DarkKing (Nightbazaar Alias)", details: { active: "2023-2024" } },
    { id: "hdl_shadowkavach", type: "handle", label: "ShadowKavach (Vaultmart Alias)", details: { active: "2024-2025" } },
    { id: "hdl_viper0x", type: "handle", label: "Viper0x (DarkAgora)", details: { active: "2025-2026" } },
    { id: "hdl_crypthacker", type: "handle", label: "CryptHacker", details: { active: "2023-2024" } },
    { id: "hdl_kalilock", type: "handle", label: "KaliLock", details: { active: "2024" } },

    // Wallets
    { id: "wlt_btc_shared", type: "wallet", label: "BTC: bc1q7vx4k9z8...089a1", details: { balance: "14.82 BTC", cluster: "Cold Storage" } },
    { id: "wlt_xmr_stealth", type: "wallet", label: "XMR: 888tNkZrPN6...49kX", details: { currency: "Monero", ringSize: 16 } },
    { id: "wlt_ransom_xss", type: "wallet", label: "BTC: 1BoatSLRHtK...7Z37", details: { balance: "6.40 BTC", cluster: "Wasabi Pool" } },
    { id: "wlt_carding_tron", type: "wallet", label: "USDT-TRC20: TXk5901kLz88...", details: { network: "Tron", volume: "$94,200" } },

    // PGP Keys
    { id: "pgp_b38e", type: "pgp_key", label: "PGP: 4096R/B38E91A0", details: { fingerprint: "89AC F901 32DC 9012 88B1", keyLength: 4096 } },
    { id: "pgp_e491", type: "pgp_key", label: "PGP: 2048R/E49120DC", details: { fingerprint: "45A1 098B C451 90AB", keyLength: 2048 } },

    // Infrastructure
    { id: "inf_tox_node", type: "infra", label: "Tox: 892B104F903A992...", details: { protocol: "Tox Core", uptime: "99.4%" } },
    { id: "inf_ip_proxy", type: "infra", label: "IP: 185.220.101.45 (AS44034)", details: { isp: "Bulletproof Seychelles", role: "C2 Gateway" } },
    { id: "inf_cert_sha", type: "infra", label: "SSL Cert SHA256: 4e91a0c4f8...", details: { target: "PLC Disruption Implant" } },

    // Sources
    { id: "src_bohemia", type: "source", label: "Nightbazaar (.onion)", details: { status: "Active", items: 48920 } },
    { id: "src_archetyp", type: "source", label: "Vaultmart (.onion)", details: { status: "Active", items: 62410 } },
    { id: "src_dread", type: "source", label: "DarkAgora (.onion)", details: { status: "Active", members: 194300 } },
    { id: "src_exploit", type: "source", label: "ZeroDayNexus Mirror", details: { status: "Active (Degraded)" } }
  ],
  edges: [
    // Viper connections
    { source: "act_viper", target: "hdl_darkking", relation: "uses_handle", weight: 95 },
    { source: "act_viper", target: "hdl_shadowkavach", relation: "uses_handle", weight: 92 },
    { source: "act_viper", target: "hdl_viper0x", relation: "uses_handle", weight: 88 },
    { source: "hdl_darkking", target: "pgp_b38e", relation: "signed_with", weight: 100 },
    { source: "hdl_shadowkavach", target: "pgp_b38e", relation: "signed_with", weight: 100 },
    { source: "hdl_darkking", target: "wlt_btc_shared", relation: "deposit_wallet", weight: 96 },
    { source: "hdl_shadowkavach", target: "wlt_btc_shared", relation: "payout_wallet", weight: 96 },
    { source: "hdl_shadowkavach", target: "wlt_xmr_stealth", relation: "transacts_via", weight: 91 },
    { source: "act_viper", target: "inf_tox_node", relation: "operates_infra", weight: 82 },
    { source: "hdl_darkking", target: "src_bohemia", relation: "hosted_on", weight: 100 },
    { source: "hdl_shadowkavach", target: "src_archetyp", relation: "hosted_on", weight: 100 },
    { source: "hdl_viper0x", target: "src_dread", relation: "posts_to", weight: 95 },

    // DesiCipher connections
    { source: "act_desi", target: "hdl_crypthacker", relation: "uses_handle", weight: 94 },
    { source: "act_desi", target: "hdl_kalilock", relation: "uses_handle", weight: 86 },
    { source: "hdl_crypthacker", target: "pgp_e491", relation: "signed_with", weight: 94 },
    { source: "act_desi", target: "wlt_ransom_xss", relation: "demands_ransom_to", weight: 88 },
    { source: "act_desi", target: "inf_ip_proxy", relation: "routes_through", weight: 78 },
    { source: "hdl_crypthacker", target: "src_exploit", relation: "advertises_on", weight: 90 },

    // BrahmaLock connections
    { source: "act_brahma", target: "inf_cert_sha", relation: "signatures_match", weight: 98 },
    { source: "act_brahma", target: "src_dread", relation: "auctions_on", weight: 85 },

    // PhantomKolkata connections
    { source: "act_phantom", target: "wlt_carding_tron", relation: "settles_via", weight: 79 },
    { source: "act_phantom", target: "src_archetyp", relation: "vends_on", weight: 84 },

    // Cross-link cluster correlation (shared infrastructure overlap)
    { source: "inf_tox_node", target: "inf_ip_proxy", relation: "co-located_asn", weight: 64 },

    // Trust / Vouch links (reputation-based vendor endorsements, distinct from identifier matches)
    { source: "act_viper", target: "act_phantom", relation: "vouched_for", weight: 72 },
    { source: "act_desi", target: "act_brahma", relation: "referred_by", weight: 68 },
    { source: "act_phantom", target: "act_desi", relation: "vouched_for", weight: 55 }
  ]
};

export const MOCK_ACTIVITY_FEED = [
  {
    id: "ACT-01",
    timestamp: "12 mins ago",
    type: "breakthrough",
    title: "Wallet Consolidation Link Confirmed",
    actor: "ViperKavach",
    details: "Automated heuristics traced 2.4 BTC transfer from Vaultmart vendor escrow directly into cold wallet bc1q7vx...089a1 previously tied to 'DarkKing' on Nightbazaar.",
    confidenceBadge: "96% High",
    severity: "critical"
  },
  {
    id: "ACT-02",
    timestamp: "38 mins ago",
    type: "stylometry",
    title: "Hinglish Stylometry Linguistic Match",
    actor: "PhantomKolkata",
    details: "NLP linguistic engine matched chat transcripts on Telegram with customer reviews on Vaultmart (Syntactic similarity: 84.2%, Regional Hindi-English vocabulary).",
    confidenceBadge: "84% High",
    severity: "medium"
  },
  {
    id: "ACT-03",
    timestamp: "1 hour ago",
    type: "scan",
    title: "Autonomous Scan Cycle Completed",
    actor: "All Monitored Sources",
    details: "Crawled 6,420 new listings across Nightbazaar and Vaultmart. 4 new vendor handles cross-referenced with PGP key registry.",
    confidenceBadge: "Routine",
    severity: "info"
  },
  {
    id: "ACT-04",
    timestamp: "3 hours ago",
    type: "persona_hop",
    title: "Persona Migration Detected",
    actor: "DesiCipher",
    details: "New alias 'KaliLock' detected on ZeroDayNexus attempting reputation transfer using subkey verified under CryptHacker master key.",
    confidenceBadge: "94% High",
    severity: "critical"
  },
  {
    id: "ACT-05",
    timestamp: "5 hours ago",
    type: "infra_alert",
    title: "Infrastructure IP Node Shift",
    actor: "BrahmaLock",
    details: "C2 relay certificate re-observed on new IP subnet 185.220.101.45 (Bulletproof Hosting Seychelles).",
    confidenceBadge: "78% Med",
    severity: "high"
  }
];

export const MOCK_STATS = {
  totalActorsTracked: 142,
  highConfidenceLinks: 38,
  activeInvestigations: 19,
  sourcesMonitored: 8,
  monthlyPersonaHopsDetected: 64,
  stylometryMatches24h: 12
};

export interface DescriptorFinding {
  id: string;
  source: string;
  onionAddress: string;
  severity: "critical" | "warning" | "info";
  title: string;
  detail: string;
  timestamp: string;
  consensusRelay: string;
}

export const MOCK_DESCRIPTOR_FINDINGS: DescriptorFinding[] = [
  {
    id: "DESC-01",
    source: "Nightbazaar Mirror #4",
    onionAddress: "bohemiadark57x...onion",
    severity: "critical",
    title: "Mismatched cert expiry detected on 2 mirrors",
    detail: "TLS certificate expiration timestamp on descriptor replica deviates by 14 days from primary HSDir publication. Potential rogue relay or desynchronized clone.",
    timestamp: "18m ago",
    consensusRelay: "HSDir Relay [gandalf-tor-02]"
  },
  {
    id: "DESC-02",
    source: "Vaultmart",
    onionAddress: "archetyp4u280v...onion",
    severity: "warning",
    title: "Revision counter anomaly flagged",
    detail: "Descriptor revision-counter jumped abruptly by +4,096 in single epoch. Protocol heuristic indicates possible key re-publication or desynchronized multi-replica service.",
    timestamp: "42m ago",
    consensusRelay: "HSDir Relay [tor-auth-nl]"
  },
  {
    id: "DESC-03",
    source: "ZeroDayNexus (Mirror)",
    onionAddress: "exploitmirror7x...onion",
    severity: "warning",
    title: "Intro point rotation desynchronization",
    detail: "3 introduction points reported distinct rendezvous authentication keys across 2 authoritative HSDir directory caches. Indicates split-horizon onion proxying.",
    timestamp: "1h 15m ago",
    consensusRelay: "HSDir Relay [darknet-consensus-01]"
  }
];

export const MOCK_CHANGE_EVENTS: ChangeEvent[] = [
  {
    id: "CHG-01",
    actorId: "ACTOR-0941",
    actorAlias: "ViperKavach",
    description: "New wallet address detected for ViperKavach — 2 hours ago (Monero stealth subaddress on Vaultmart)",
    timestamp: "2026-03-27T07:15:00Z",
    changeType: "wallet",
    source: "Vaultmart"
  },
  {
    id: "CHG-02",
    actorId: "ACTOR-0941",
    actorAlias: "ViperKavach",
    description: "New PGP subkey observed on Vaultmart — 6 hours ago (Key ID: 4096R/B38E91A0)",
    timestamp: "2026-03-27T03:30:00Z",
    changeType: "pgp",
    source: "Vaultmart"
  },
  {
    id: "CHG-03",
    actorId: "ACTOR-1102",
    actorAlias: "DesiCipher",
    description: "Infrastructure IP node shift: new C2 staging reverse-proxy 185.220.101.45 flagged — 9 hours ago",
    timestamp: "2026-03-26T23:45:00Z",
    changeType: "infra",
    source: "ZeroDayNexus Mirror"
  },
  {
    id: "CHG-04",
    actorId: "ACTOR-0824",
    actorAlias: "PhantomKolkata",
    description: "New carding shop telegram gateway @phantom_kolkata_official correlated via Hinglish dialect match — 14 hours ago",
    timestamp: "2026-03-26T18:20:00Z",
    changeType: "stylometry",
    source: "Telegram Broadcast Monitor"
  },
  {
    id: "CHG-05",
    actorId: "ACTOR-1405",
    actorAlias: "BrahmaLock",
    description: "Persona migration hop: alias 'BrahmaLock' published new OT exploit telemetry citing VaultShiva PGP proof — 22 hours ago",
    timestamp: "2026-03-26T11:10:00Z",
    changeType: "migration",
    source: "DarkAgora (.onion)"
  }
];
