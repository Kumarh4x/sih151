# NTRO Intel-Flow: Dark Web Threat Actor De-Anonymization Platform
### Smart India Hackathon 2026 — Problem Statement ID: SIH26151

An enterprise cyber intelligence and forensic de-anonymization prototype designed for the **National Technical Research Organisation (NTRO)**. The portal demonstrates multi-marketplace persona correlation, on-chain cryptocurrency wallet clustering, PGP subkey web-of-trust verification, multilingual (Hindi/Hinglish/English) stylometric analysis, and court-admissible forensic evidence management.

---

## 🧭 Investigation Routes & Modules

| Route | Module Name | Description & Capabilities |
| :--- | :--- | :--- |
| `/` | **Dashboard Overview** | Executive intelligence overview, 7-day ingestion trends, confidence distribution, live activity feed linking directly to target actors. |
| `/actors` | **Threat Actors Registry** | Multi-faceted filtering (category, confidence, date, source, language, case status), real-time search, multi-column sorting. |
| `/actors/[id]` | **Actor Profile Dossier** | Comprehensive intelligence dossier, interactive **"Adjust Weights"** scoring sliders, case status & investigator notes persisted in `localStorage`. |
| `/stylometry` | **Stylometry Linguistic Compare** | Real client-side TF-IDF char n-gram cosine similarity, highlighted shared n-grams, Hinglish code-switching ratio, 24x7 posting cadence diurnal heatmap. |
| `/blockchain` | **Blockchain & UTXO Graph** | UTXO clustering heuristics, multi-hop peel chains, mixer flags (Wasabi CoinJoin), VASP identification, interactive **FIU-IND PMLA Section 12 Requisition Generator**. |
| `/infrastructure` | **Infrastructure & OpSec Findings** | OpSec leaks, JARM TLS active probe fingerprints, TLS certificate SHA-256 reuse, ranked clearnet origin IP candidates with Shodan/Censys/crt.sh labels. |
| `/offband` | **Off-Band & PGP Keyserver** | Telegram, Jabber (XMPP), Tox, Session handles table + mock **HKP SKS keyserver lookup** (`keys.openpgp.org`) with UID, email, key date, and "Pivot to Graph" actions. |
| `/vault` | **Forensic Evidence Vault** | Client-side **Web Crypto SHA-256** hashing (`crypto.subtle.digest`), interactive **"Verify Integrity"** engine, live **Tamper Simulation Demo**, chain-of-custody log, and real PDF/CSV/JSON exports. |
| `/timeline` | **Persona Migration Timeline** | Cross-actor persona hopping timeline with date-range filters and cryptographic continuity vectors. |
| `/cases` | **Case Management & Audit Log** | Investigation case list, status transitions synced to `localStorage`, immutable analyst activity audit stream. |
| `/graph` | **Relationship & Topology Graph** | Interactive **Cytoscape.js** network graph supporting Actor, Handle, Wallet, PGP, Infra, Source, Off-Band, Clearnet, and VASP node types, dashed vouch/trust edges, edge category filters, and **A* Shortest Path Solver**. |
| `/sources` | **Autonomous Crawler Scans** | Continuous darknet ingestion monitor across fictional darknet markets (Nightbazaar, Vaultmart, DarkAgora, ZeroDayNexus), latency telemetry, and manual scan triggers. |
| `/export` | **Dossier Export Engine** | Real file generation for **CSV**, structured **JSON**, and formal court-admissible **PDF Dossiers** via `jsPDF`. |

---

## 🧮 What is Computed vs. What is Simulated

### 1. Real Client-Side Computation
- **Confidence Scoring Engine (`src/lib/scoring.ts`)**: Normalized multi-vector formula (`Wallet 35%`, `Off-band/PGP 25%`, `Stylometry 20%`, `Infra 20%`) with live dynamic weight adjustment.
- **Stylometric NLP (`src/lib/stylometry.ts`)**: Real character tri/quad-gram extraction, TF-IDF vectorization, dot-product cosine similarity, Hinglish token dictionary detection, and 24x7 temporal cadence overlap calculation.
- **Cryptographic Hashing (`src/lib/cryptoUtils.ts`)**: In-browser **Web Crypto API** (`window.crypto.subtle.digest("SHA-256")`) hashing raw evidence payloads in real time.
- **Shortest Path Calculation (`src/components/RelationshipGraph.tsx`)**: Cytoscape A* graph traversal algorithm computing optimal multi-hop connection chains.
- **State Persistence (`src/lib/caseStore.ts`)**: LocalStorage persistence for case statuses, investigator notes, and analyst audit actions.
- **Document Generation (`src/app/export/page.tsx` & `/vault`)**: Real client-side file compilation and download for CSV, JSON, and PDF (via `jsPDF`).

### 2. Synthetic Seed Dataset
- **Marketplaces & Venues**: All marketplaces use synthetic names (*Nightbazaar*, *Vaultmart*, *DarkAgora*, *ZeroDayNexus*, *CipherVault*, *ShadowPort*, *BreachArchive*).
- **Actors & Wallets**: Synthetic threat actor personas, dummy Bitcoin/Monero addresses, and simulated HKP PGP public key records.
- **Network Telemetry**: Simulated onion socket latency, JARM fingerprints, and Shodan/Censys labels.

---

## ⌨️ Global Shortcuts & Features

- **Cmd+K / Ctrl+K**: Instant Command Palette searching threat actors, wallets, PGP fingerprints, handles, and jumping to any investigation tool.
- **Light / Dark Mode**: Theme toggle located in the navigation header.
- **Copyable Artifacts**: Hashes and addresses rendered with tabular-nums and 1-click clipboard copy buttons.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Typecheck and verify build
npx tsc --noEmit
npm run build

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
