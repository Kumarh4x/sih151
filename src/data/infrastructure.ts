// infrastructure.ts — OpSec Leaks, TLS SHA-256, JARM, and Clearnet Origin Candidates

import { OpSecFinding } from "@/types";
import { getTodayIso } from "@/lib/dateUtils";

export const INFRASTRUCTURE_FINDINGS: OpSecFinding[] = [
  {
    id: "OPS-101",
    actorId: "ACTOR-0941",
    actorAlias: "ViperKavach",
    leakType: "tls_cert_reuse",
    severity: "critical",
    title: "TLS Certificate SHA-256 Reused across Onion C2 & Clearnet Proxy",
    description:
      "The custom self-signed SSL certificate on Vaultmart vendor relay exactly matches certificate deployed on public clearnet IP in Netherlands.",
    clearnetOriginIp: "185.220.101.45",
    jarmFingerprint: "27d40d40d29d40d1dc42d43d40d41d46dc7573fa00958a2d10331902264871",
    tlsSha256: "9a:4f:88:21:bb:03:9c:88:fa:21:40:99:ee:12:34:56:78:90:ab:cd:ef:12:34:56:78:90:ab:cd:ef:12:34:56",
    asnOrg: "Hostkey B.V. (AS20984)",
    location: "Amsterdam, Netherlands",
    shodanScore: 92,
    censysTag: "darknet-relay-node",
    crtShMatch: "api.kavach-gateway.net",
    detectedAt: getTodayIso(-14),
    remediationStatus: "investigating"
  },
  {
    id: "OPS-102",
    actorId: "ACTOR-1102",
    actorAlias: "DesiCipher",
    leakType: "timezone_leak",
    severity: "high",
    title: "HTTP Response Header Exposing Asia/Kolkata IST Timezone (+05:30)",
    description:
      "Server timestamp header clock skew indicates system time synchronized precisely with Asia/Kolkata NTP pool.",
    clearnetOriginIp: "194.26.29.114",
    jarmFingerprint: "29d29d15d29d29d00042d42d000000fa0f576e1a499b9032128522e803e05a",
    tlsSha256: "33:bb:12:90:ff:44:aa:10:99:22:bb:cc:44:55:66:77:88:99:00:11:22:33:44:55:66:77:88:99:aa:bb:cc:dd",
    asnOrg: "Verdina Hosting S.A. (AS44034)",
    location: "Victoria, Seychelles",
    shodanScore: 88,
    censysTag: "c2-access-broker",
    crtShMatch: "*.desicipher-gateway.is",
    detectedAt: getTodayIso(-28),
    remediationStatus: "open"
  },
  {
    id: "OPS-103",
    actorId: "ACTOR-1405",
    actorAlias: "BrahmaLock",
    leakType: "ssh_banner_leak",
    severity: "critical",
    title: "OpenSSH 8.9p1 Banner Leak on SCADA Command Proxy",
    description:
      "SSH daemon banner identifies customized Ubuntu build with specific hostname 'brahma-node-master' in hostkey debug comment.",
    clearnetOriginIp: "185.220.101.99",
    jarmFingerprint: "27d40d40d29d40d1dc42d43d40d41d46dc7573fa00958a2d10331902264871",
    tlsSha256: "ee:11:44:77:88:99:aa:bb:cc:dd:ee:ff:00:11:22:33:44:55:66:77:88:99:aa:bb:cc:dd:ee:ff:00:11:22:33",
    asnOrg: "Hostkey B.V. Bulletproof",
    location: "Moscow, Russia",
    shodanScore: 95,
    censysTag: "scada-c2-implant",
    detectedAt: getTodayIso(-10),
    remediationStatus: "investigating"
  },
  {
    id: "OPS-104",
    actorId: "ACTOR-0824",
    actorAlias: "PhantomKolkata",
    leakType: "origin_ip_exposure",
    severity: "high",
    title: "Node.js Express Origin IP on Port 8443",
    description:
      "API error stack traces during simulated invalid token submissions leaked internal clearnet IP and Docker container subnet.",
    clearnetOriginIp: "178.62.204.89",
    jarmFingerprint: "2ad2ad0002ad2ad00042d42d000000c0f576e1a499b9032128522e803e05a88",
    tlsSha256: "88:22:33:44:55:66:77:88:99:00:11:22:33:44:55:66:77:88:99:aa:bb:cc:dd:ee:ff:00:11:22:33:44:55:66",
    asnOrg: "DigitalOcean (AS14061)",
    location: "Amsterdam, Netherlands",
    shodanScore: 78,
    censysTag: "carding-api-backend",
    detectedAt: getTodayIso(-40),
    remediationStatus: "open"
  }
];
