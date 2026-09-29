// caseStore.ts — LocalStorage persistence for Case Statuses, Case Notes, and Audit Trail

import { CaseStatus, CaseNote, AuditAction } from "@/types";

const CASE_STATUS_STORAGE_KEY = "ntro_sih26151_case_statuses";
const CASE_NOTES_STORAGE_KEY = "ntro_sih26151_case_notes";
const AUDIT_LOG_STORAGE_KEY = "ntro_sih26151_audit_log";

const INITIAL_AUDIT_LOG: AuditAction[] = [
  {
    id: "AUD-101",
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    analyst: "Analyst Pavan Kumar (NTRO-SEC-8924)",
    action: "status_change",
    actorId: "ACTOR-0941",
    caseNumber: "NTRO-CYBER-2026-089A",
    details: "Affirmed Under Investigation status following cold wallet clustering on Boreas Market."
  },
  {
    id: "AUD-102",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    analyst: "Analyst Pavan Kumar (NTRO-SEC-8924)",
    action: "evidence_verified",
    actorId: "ACTOR-0941",
    caseNumber: "NTRO-CYBER-2026-089A",
    details: "Verified Web Crypto SHA-256 integrity seal for PGP subkey signed migration declaration."
  },
  {
    id: "AUD-103",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    analyst: "Lead Investigator Verma",
    action: "status_change",
    actorId: "ACTOR-1102",
    caseNumber: "NTRO-CYBER-2026-112B",
    details: "Elevated DesiCipher to Confirmed Link after cross-market CryptHacker master key subkey verification."
  },
  {
    id: "AUD-104",
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    analyst: "Analyst Pavan Kumar (NTRO-SEC-8924)",
    action: "kyc_issued",
    actorId: "ACTOR-0941",
    caseNumber: "NTRO-CYBER-2026-089A",
    details: "Generated FIU-IND Section 12 Requisition for CoinDCX gateway deposit address."
  },
  {
    id: "AUD-105",
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    analyst: "Dir. Cyber Operations",
    action: "status_change",
    actorId: "ACTOR-1405",
    caseNumber: "NTRO-CYBER-2026-177D",
    details: "Confirmed BrahmaLock SCADA intrusion correlation via hardcoded TLS SHA-256 cert fingerprint."
  },
  {
    id: "AUD-106",
    timestamp: new Date(Date.now() - 1000 * 60 * 720).toISOString(),
    analyst: "Analyst Pavan Kumar (NTRO-SEC-8924)",
    action: "status_change",
    actorId: "ACTOR-1993",
    caseNumber: "NTRO-CYBER-2026-302F",
    details: "Classified ByteRaider lead as Dismissed Lead: benign security research exploit broker."
  }
];

export function getStoredCaseStatus(actorId: string, defaultStatus: CaseStatus): CaseStatus {
  if (typeof window === "undefined") return defaultStatus;
  try {
    const raw = localStorage.getItem(CASE_STATUS_STORAGE_KEY);
    if (!raw) return defaultStatus;
    const map = JSON.parse(raw);
    return map[actorId] || defaultStatus;
  } catch {
    return defaultStatus;
  }
}

export function saveStoredCaseStatus(actorId: string, status: CaseStatus, actorAlias?: string, caseNumber?: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(CASE_STATUS_STORAGE_KEY);
    const map = raw ? JSON.parse(raw) : {};
    map[actorId] = status;
    localStorage.setItem(CASE_STATUS_STORAGE_KEY, JSON.stringify(map));

    // Also record audit log
    const statusLabel =
      status === "confirmed" ? "Confirmed Link" : status === "dismissed" ? "Dismissed Lead" : "Under Investigation";
    addAuditLogEntry({
      analyst: "Analyst Pavan Kumar (NTRO-SEC-8924)",
      action: "status_change",
      actorId,
      caseNumber: caseNumber || `CASE-${actorId}`,
      details: `Updated case status for ${actorAlias || actorId} to '${statusLabel}'`
    });
  } catch (err) {
    console.error("Failed to save case status", err);
  }
}

export function getStoredNotes(actorId: string, defaultNotes: CaseNote[]): CaseNote[] {
  if (typeof window === "undefined") return defaultNotes;
  try {
    const raw = localStorage.getItem(CASE_NOTES_STORAGE_KEY);
    if (!raw) return defaultNotes;
    const map = JSON.parse(raw);
    return map[actorId] !== undefined ? map[actorId] : defaultNotes;
  } catch {
    return defaultNotes;
  }
}

export function saveStoredNotes(actorId: string, notes: CaseNote[]): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(CASE_NOTES_STORAGE_KEY);
    const map = raw ? JSON.parse(raw) : {};
    map[actorId] = notes;
    localStorage.setItem(CASE_NOTES_STORAGE_KEY, JSON.stringify(map));
  } catch (err) {
    console.error("Failed to save notes", err);
  }
}

export function getAuditLog(): AuditAction[] {
  if (typeof window === "undefined") return INITIAL_AUDIT_LOG;
  try {
    const raw = localStorage.getItem(AUDIT_LOG_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(AUDIT_LOG_STORAGE_KEY, JSON.stringify(INITIAL_AUDIT_LOG));
      return INITIAL_AUDIT_LOG;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_AUDIT_LOG;
  }
}

export function addAuditLogEntry(entry: Omit<AuditAction, "id" | "timestamp">): AuditAction {
  const fullEntry: AuditAction = {
    ...entry,
    id: `AUD-${Date.now().toString().slice(-6)}`,
    timestamp: new Date().toISOString()
  };

  if (typeof window === "undefined") return fullEntry;
  try {
    const list = getAuditLog();
    const updated = [fullEntry, ...list].slice(0, 100); // keep last 100
    localStorage.setItem(AUDIT_LOG_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to record audit entry", err);
  }
  return fullEntry;
}
