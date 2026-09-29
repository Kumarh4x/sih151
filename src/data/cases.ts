// cases.ts — Case Records Seed Data

import { CaseStatus } from "@/types";
import { getTodayOffsetDays } from "@/lib/dateUtils";

export interface CaseRecord {
  caseNumber: string;
  actorId: string;
  actorAlias: string;
  category: string;
  status: CaseStatus;
  priority: "critical" | "high" | "elevated" | "moderate";
  assignedInvestigator: string;
  dateOpened: string;
  lastActivity: string;
  notesCount: number;
}

export const SEED_CASES: CaseRecord[] = [
  {
    caseNumber: "NTRO-CYBER-2026-089A",
    actorId: "ACTOR-0941",
    actorAlias: "ViperKavach",
    category: "Narcotics & Weaponized Exploits",
    status: "under_investigation",
    priority: "critical",
    assignedInvestigator: "Analyst Pavan Kumar (NTRO-SEC-8924)",
    dateOpened: "2026-01-10",
    lastActivity: getTodayOffsetDays(-1),
    notesCount: 2
  },
  {
    caseNumber: "NTRO-CYBER-2026-112B",
    actorId: "ACTOR-1102",
    actorAlias: "DesiCipher",
    category: "Ransomware Access Broker",
    status: "confirmed",
    priority: "critical",
    assignedInvestigator: "Lead Investigator Verma",
    dateOpened: "2026-02-01",
    lastActivity: getTodayOffsetDays(-1),
    notesCount: 1
  },
  {
    caseNumber: "NTRO-CYBER-2026-044C",
    actorId: "ACTOR-0824",
    actorAlias: "PhantomKolkata",
    category: "Financial Fraud & Carding",
    status: "under_investigation",
    priority: "elevated",
    assignedInvestigator: "Analyst Pavan Kumar (NTRO-SEC-8924)",
    dateOpened: "2026-02-18",
    lastActivity: getTodayOffsetDays(-2),
    notesCount: 1
  },
  {
    caseNumber: "NTRO-CYBER-2026-177D",
    actorId: "ACTOR-1405",
    actorAlias: "BrahmaLock",
    category: "Industrial Control / SCADA Exploits",
    status: "confirmed",
    priority: "critical",
    assignedInvestigator: "Dir. Cyber Operations",
    dateOpened: "2026-01-08",
    lastActivity: getTodayOffsetDays(-1),
    notesCount: 1
  },
  {
    caseNumber: "NTRO-CYBER-2026-019E",
    actorId: "ACTOR-0619",
    actorAlias: "OpiumPrince",
    category: "Narcotics Logistics Syndicate",
    status: "under_investigation",
    priority: "high",
    assignedInvestigator: "Analyst Pavan Kumar",
    dateOpened: "2026-02-20",
    lastActivity: getTodayOffsetDays(-3),
    notesCount: 1
  },
  {
    caseNumber: "NTRO-CYBER-2026-302F",
    actorId: "ACTOR-1993",
    actorAlias: "ByteRaider",
    category: "Zero-Day Exploit Broker",
    status: "dismissed",
    priority: "moderate",
    assignedInvestigator: "Analyst Pavan Kumar (NTRO-SEC-8924)",
    dateOpened: "2026-03-01",
    lastActivity: getTodayOffsetDays(0),
    notesCount: 1
  }
];
