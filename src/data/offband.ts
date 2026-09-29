// offband.ts — Telegram, Jabber, Tox handles, and Mock HKP Keyserver

import { OffbandEntity, MockHkpKey } from "@/types";
import { getTodayOffsetDays } from "@/lib/dateUtils";

export const OFFBAND_HANDLES: OffbandEntity[] = [
  {
    id: "OB-01",
    platform: "Telegram",
    handle: "@viper_kavach_support",
    actorId: "ACTOR-0941",
    actorAlias: "ViperKavach",
    sourceMarket: "Vaultmart Vendor Profile",
    pgpKeyId: "B38E91A0",
    pgpFingerprint: "89AC F901 32DC 9012 88B1 4096 B38E 91A0",
    status: "active",
    firstSeen: "2024-08-01",
    lastSeen: getTodayOffsetDays(0),
    metadata: "Support bot with Hinglish automated order status responder"
  },
  {
    id: "OB-02",
    platform: "Tox",
    handle: "892B104F98DCBA910029E1087FA120491823BCDE401928491028491028491028491028491028",
    actorId: "ACTOR-0941",
    actorAlias: "ViperKavach",
    sourceMarket: "DarkAgora Security Sig",
    pgpKeyId: "B38E91A0",
    pgpFingerprint: "89AC F901 32DC 9012 88B1 4096 B38E 91A0",
    status: "active",
    firstSeen: "2024-06-12",
    lastSeen: getTodayOffsetDays(0),
    metadata: "P2P Tox ID advertised on vendor profile"
  },
  {
    id: "OB-03",
    platform: "Jabber",
    handle: "desi_cipher_root@xmpp.is",
    actorId: "ACTOR-1102",
    actorAlias: "DesiCipher",
    sourceMarket: "ZeroDayNexus Auction Thread",
    pgpKeyId: "F772AA19",
    pgpFingerprint: "1102 99AA BB33 44DD 8810 4096 F772 AA19",
    status: "active",
    firstSeen: "2024-01-10",
    lastSeen: getTodayOffsetDays(0),
    metadata: "OTR-enabled Jabber endpoint for private VPN auction bids"
  },
  {
    id: "OB-04",
    platform: "Telegram",
    handle: "@phantom_kolkata_bot",
    actorId: "ACTOR-0824",
    actorAlias: "PhantomKolkata",
    sourceMarket: "Vaultmart Carding Category",
    pgpKeyId: undefined,
    status: "active",
    firstSeen: "2024-02-14",
    lastSeen: getTodayOffsetDays(0),
    metadata: "Carding batch automated sales bot channel"
  },
  {
    id: "OB-05",
    platform: "Session",
    handle: "05a891023849102834901284901284901284901284901284901284901284901234",
    actorId: "ACTOR-0619",
    actorAlias: "OpiumPrince",
    sourceMarket: "Nightbazaar Storefront",
    pgpKeyId: "C19044A1",
    pgpFingerprint: "9901 44A1 8812 33DC 9901 4096 C190 44A1",
    status: "monitored",
    firstSeen: "2024-03-01",
    lastSeen: getTodayOffsetDays(-3),
    metadata: "Session Messenger ID for dead-drop GPS coordination"
  }
];

export const HKP_KEYSERVER_DATABASE: Record<string, MockHkpKey> = {
  "B38E91A0": {
    keyId: "B38E91A0",
    fingerprint: "89AC F901 32DC 9012 88B1 4096 B38E 91A0",
    uid: "DarkKing <darkking_vendor@protonmail.ch>",
    email: "darkking_vendor@protonmail.ch",
    creationDate: "2023-01-14T11:20:00Z",
    expiryDate: "2028-01-14T11:20:00Z",
    algorithm: "RSA",
    bits: 4096,
    capabilities: ["Encrypt", "Sign", "Certify"],
    signatures: ["DarkKing Master (Self-signed)", "ShadowKavach Subkey Cert 2024"],
    associatedActorId: "ACTOR-0941",
    associatedActorAlias: "ViperKavach"
  },
  "F772AA19": {
    keyId: "F772AA19",
    fingerprint: "1102 99AA BB33 44DD 8810 4096 F772 AA19",
    uid: "CryptHacker <crypthacker_access@exploit.im>",
    email: "crypthacker_access@exploit.im",
    creationDate: "2023-06-20T08:15:00Z",
    expiryDate: "2027-06-20T08:15:00Z",
    algorithm: "RSA",
    bits: 4096,
    capabilities: ["Encrypt", "Sign"],
    signatures: ["CryptHacker Root Cert", "KaliLock Subkey 2024"],
    associatedActorId: "ACTOR-1102",
    associatedActorAlias: "DesiCipher"
  },
  "E881340B": {
    keyId: "E881340B",
    fingerprint: "4405 1405 8899 AABB CCEE 1122 E881 340B",
    uid: "BrahmaDev <brahmadev@scadasec.is>",
    email: "brahmadev@scadasec.is",
    creationDate: "2024-01-08T16:45:00Z",
    expiryDate: "2029-01-08T16:45:00Z",
    algorithm: "RSA",
    bits: 4096,
    capabilities: ["Sign", "Certify", "Authentication"],
    signatures: ["BrahmaLock Master Key"],
    associatedActorId: "ACTOR-1405",
    associatedActorAlias: "BrahmaLock"
  },
  "C19044A1": {
    keyId: "C19044A1",
    fingerprint: "9901 44A1 8812 33DC 9901 4096 C190 44A1",
    uid: "DesiVendor <desivendor_orders@secmail.pro>",
    email: "desivendor_orders@secmail.pro",
    creationDate: "2022-11-04T14:10:00Z",
    expiryDate: "2026-11-04T14:10:00Z",
    algorithm: "RSA",
    bits: 4096,
    capabilities: ["Encrypt", "Sign"],
    signatures: ["OpiumPrince Transition Sig"],
    associatedActorId: "ACTOR-0619",
    associatedActorAlias: "OpiumPrince"
  }
};
