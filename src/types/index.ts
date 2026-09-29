// types.ts — shared data contract for ONION EYE (SIH26151)

export type ConfidenceLevel = "high" | "medium" | "low";

export type CaseStatus = "under_investigation" | "confirmed" | "dismissed";

export interface CaseNote {
  id: string;
  text: string;
  createdAt: string;   // ISO datetime
  statusAtTime: CaseStatus;
  author?: string;
}

export interface ConfidenceWeights {
  wallet: number;             // default 0.35 (35%)
  offbandPgp: number;         // default 0.25 (25%)
  stylometryBehaviour: number;// default 0.20 (20%)
  infra: number;              // default 0.20 (20%)
}

export interface ConfidenceSignal {
  signal: "wallet_match" | "stylometry" | "infra_match" | "pgp_match" | "handle_match" | "behavioral_pattern";
  category?: "wallet" | "offbandPgp" | "stylometryBehaviour" | "infra";
  weight: number;        // e.g. 0.35
  similarity: number;    // 0-1, e.g. 0.95
  matched: boolean;
  notes?: string;
}

export interface ConfidenceScore {
  overall: number;              // 0-100
  level: ConfidenceLevel;
  breakdown: ConfidenceSignal[];
  computedWeights?: ConfidenceWeights;
}

export interface InfraFingerprint {
  tlsSha256?: string;
  jarmFingerprint?: string;
  bannerString?: string;
  asn?: string;
  asnOrg?: string;
  clearnetCandidateIp?: string;
  certIssuer?: string;
  openPorts?: number[];
  shodanScore?: number;
  censysTag?: string;
  crtShMatch?: string;
}

export interface Identifier {
  id: string;
  type: "handle" | "pgp_key" | "wallet" | "infra_indicator" | "clearnet_ip" | "vasp_account";
  value: string;
  source: string;
  firstSeen: string;   // ISO date or relative
  lastSeen: string;    // ISO date or relative
  matchConfidence: number; // 0-100
  chain?: string;
  context?: string;
  fingerprint?: InfraFingerprint;
}

export interface TimelineEvent {
  id: string;
  actorAlias: string;
  source: string;
  startDate: string;   // ISO date
  endDate: string | null; // null = still active
  linkedIdentifierId: string;
  linkedIdentifierType?: "handle" | "pgp_key" | "wallet" | "infra_indicator" | "clearnet_ip" | "vasp_account";
  linkedIdentifierValue?: string;
  notes?: string;
  vector?: string;
}

export interface Actor {
  id: string;
  primaryAlias: string;
  aliases: string[];
  category: string;         // e.g. "Narcotics Syndicate", "Ransomware Access Broker"
  source: string;           // e.g. "Boreas Market / Archon Market"
  lastScanDate: string;     // ISO date
  firstSeen: string;
  lastSeen: string;
  confidence: ConfidenceScore;
  identifiers: Identifier[];
  timeline: TimelineEvent[];
  language?: "english" | "hindi" | "hinglish";
  threatLevel?: "critical" | "high" | "elevated" | "moderate";
  caseNumber?: string;
  caseStatus: CaseStatus;
  notes: CaseNote[];
  summaryDescription?: string;
  signalSimilarities?: {
    wallet: number;
    offbandPgp: number;
    stylometryBehaviour: number;
    infra: number;
  };
}

export interface ChangeEvent {
  id: string;
  description: string;
  timestamp: string; // ISO datetime or relative
  actorId: string;
  actorAlias?: string;
  changeType?: "wallet" | "pgp" | "infra" | "stylometry" | "migration";
  source?: string;
}

export interface Source {
  id: string;
  name: string;
  type: "marketplace" | "forum" | "deep_web";
  status: "active" | "offline";
  lastScan: string;    // ISO datetime
  nextScan: string;    // ISO datetime
  health: "healthy" | "degraded" | "error";
  onionAddress?: string;
  itemsIndexed?: number;
  actorsDiscovered?: number;
  avgLatencyMs?: number;
  intervalHours?: number;
}

export interface GraphNode {
  id: string;
  type: "actor" | "handle" | "wallet" | "pgp_key" | "infra" | "source" | "offband" | "clearnet" | "vasp";
  label: string;
  details?: Record<string, any>;
}

export interface GraphEdge {
  source: string;   // GraphNode id
  target: string;   // GraphNode id
  relation: string; // e.g. "uses_handle", "shares_wallet", "vouched_for", "referred_by", "escrow_settlement"
  weight?: number;
  style?: "solid" | "dashed";
  category?: "match" | "vouch" | "financial" | "infrastructure";
}

// OpSec & Infrastructure Types
export interface OpSecFinding {
  id: string;
  actorId: string;
  actorAlias: string;
  leakType: "timezone_leak" | "tls_cert_reuse" | "jarm_cluster" | "ssh_banner_leak" | "origin_ip_exposure" | "dns_mx_leak";
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  clearnetOriginIp?: string;
  jarmFingerprint?: string;
  tlsSha256?: string;
  asnOrg?: string;
  location?: string;
  shodanScore?: number;
  censysTag?: string;
  crtShMatch?: string;
  detectedAt: string;
  remediationStatus: "open" | "remediated" | "investigating";
}

// Blockchain & UTXO Types
export interface BlockchainUTXONode {
  id: string;
  address: string;
  chain: "BTC" | "XMR";
  balance: string;
  totalReceived: string;
  actorId?: string;
  actorAlias?: string;
  clusterTag?: string;
  isMixer?: boolean;
  isVasp?: boolean;
  vaspName?: string;
  peelHops?: number;
  txCount: number;
}

export interface BlockchainTransaction {
  txid: string;
  timestamp: string;
  fromAddress: string;
  toAddress: string;
  amount: string;
  currency: string;
  fee: string;
  isPeelChange: boolean;
  isCommonInputCluster: boolean;
  mixerService?: string;
  vaspEndpoint?: string;
}

// Off-Band Handle Types
export interface OffbandEntity {
  id: string;
  platform: "Telegram" | "Jabber" | "Tox" | "Session";
  handle: string;
  actorId: string;
  actorAlias: string;
  sourceMarket: string;
  pgpKeyId?: string;
  pgpFingerprint?: string;
  status: "active" | "dormant" | "monitored";
  firstSeen: string;
  lastSeen: string;
  metadata?: string;
}

export interface MockHkpKey {
  keyId: string;
  fingerprint: string;
  uid: string;
  email: string;
  creationDate: string;
  expiryDate: string;
  algorithm: string;
  bits: number;
  capabilities: string[];
  signatures: string[];
  associatedActorId?: string;
  associatedActorAlias?: string;
}

// Evidence Vault & Chain of Custody Types
export interface ChainOfCustodyEntry {
  timestamp: string;
  officer: string;
  action: string;
  verificationHash: string;
  notes: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  category: "blockchain_tx" | "pgp_signature" | "stylometry_corpus" | "tls_cert" | "chat_transcript" | "marketplace_listing";
  actorId: string;
  actorAlias: string;
  rawPayload: string;
  sha256Seal: string;
  acquiredAt: string;
  acquiredBy: string;
  caseNumber: string;
  chainOfCustody: ChainOfCustodyEntry[];
}

// Audit Log for Cases
export interface AuditAction {
  id: string;
  timestamp: string;
  analyst: string;
  action: "status_change" | "note_added" | "evidence_verified" | "kyc_issued" | "export_generated" | "weight_adjusted";
  actorId?: string;
  caseNumber?: string;
  details: string;
}
