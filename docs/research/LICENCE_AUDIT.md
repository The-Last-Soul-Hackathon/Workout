# Comprehensive Intellectual Property & Licence Audit
**Muscle Intelligence — Legal, Commercial & Open-Source Compliance**
*Audited: November 2026*

This document establishes legal boundaries, commercial licensing rights, and compliance procedures for all open-source software, datasets, 3D anatomical models, and scientific publications integrated into Muscle Intelligence.

---

## 1. Executive Summary & Legal Guardrails

Muscle Intelligence is a commercial-grade, cross-platform product comprising a proprietary user-facing application (Next.js web and React Native mobile), a shared calculation engine, and a PostgreSQL database.

> [!CAUTION]
> **Strict Non-Contamination Rule:**
> No code licensed under copyleft regimes (specifically **GNU AGPL-3.0** or **GNU GPL-3.0**) may be statically or dynamically linked into `@muscle-intelligence/domain`, `@muscle-intelligence/calculations`, the Next.js web application, the React Native mobile application, or any Supabase Edge Function.
> 
> Doing so would create a derivative work and could legally mandate open-sourcing the entire Muscle Intelligence proprietary codebase under reciprocal copyleft terms.

---

## 2. Licence Matrix by Resource & Asset Type

| Resource | Component Audited | Licence | Commercial Use? | Reciprocal / Viral? | Attribution Required? | Safe Integration Strategy |
|---|---|---|---|---|---|---|
| **Kinetic DB** | Exercise database (`@kinetic-place/exercises-db`) | **MIT** | Yes | No | Yes (preserve copyright notice) | **Direct Import:** Permissible for direct inclusion and modification in the canonical database. |
| **Three.js** | 3D rendering library | **MIT** | Yes | No | Yes | **Direct Bundle:** Standard npm package dependency. |
| **OpenAlex** | Scholarly metadata index | **CC0 1.0** (Public Domain) | Yes | No | No (Good academic practice) | **Unencumbered:** Direct API querying, caching, and database storage. |
| **Crossref** | DOI metadata API | **CC0 / Open Metadata** | Yes | No | Recommended | **Unencumbered:** REST API ingestion with polite `mailto:` identification. |
| **OpenSim Core** | Musculoskeletal engine | **Apache-2.0** | Yes | No | Yes (NOTICE file) | **Offline Isolated Runner:** Executed in separate offline research workstation; only calculated mathematical curve coefficients are stored. |
| **OpenCap Core** | Video mocap engine | **Apache-2.0** | Yes | No | Yes | **Offline Research Tool:** Offline data collection; never embedded in app bundles. |
| **EPIC Lab Data** | Camargo 2021 Biomechanics Dataset | **CC-BY 4.0** | Yes | No | Yes (Cite DOI & authors) | **Data Ingestion:** Store aggregated kinematic/kinetic reference values with citation foreign keys. |
| **MyoNeuroLink** | AIST sEMG Dataset | **CC-BY 4.0** | Yes | No | Yes | **Data Ingestion:** Store activation ranges with citation attribution. |
| **AddBiomechanics** | 1.0 Core Dataset | **CC-BY 4.0** | Yes | No | Yes | **Data Ingestion:** Extract joint angle and GRF benchmarks with citation attribution. |
| **wger (Data)** | Exercise descriptions & muscle names | **CC-BY-SA 3.0** | Yes | **Yes (Data-level ShareAlike)** | Yes | **Data Isolation:** Derivative exercise text must be shared under CC-BY-SA if redistributed as raw data. Do not intermingle proprietary algorithmic weights into raw wger exports. |
| **wger (Software)** | Django backend / Vue app | **AGPL-3.0** | Restricted | **Extreme (Network Copyleft)** | Yes | **STRICT AIRGAP:** Never import wger Python/Vue code. Never fork or host wger as an internal microservice without legal review. Use purely clean-room ETL scripts to fetch public JSON data. |
| **OpenExerciseDB** | Markdown & JSON exercises | **GPL-3.0** | Restricted | **Yes (Code & Data mixed)** | Yes | **Reference Only:** Do not copy verbatim text dumps. Use clean-room extraction for progression structure. |
| **Z-Anatomy** | 3D Blender models & meshes | **CC-BY-SA 4.0** | Yes | **Yes (Asset-level ShareAlike)** | Yes | **Asset Isolation:** Any modified 3D meshes distributed to users must be released under CC-BY-SA 4.0. Textual anatomical hierarchy (FMA terms) is public anatomical fact and not subject to mesh copyright. |
| **BodyParts3D** | Polygon anatomical meshes | **CC-BY-SA 2.1 Japan** | Yes | **Yes (Asset-level ShareAlike)** | Yes | **Reference Taxonomy:** FMA identifiers and hierarchy are public domain medical facts. Do not embed raw 3D OBJ meshes in the mobile app without ShareAlike compliance. |
| **PubMed / PMC** | OA Full-Text Articles | **CC-BY / CC0** (OA subset) | Yes | Varies (CC-BY vs CC-BY-NC) | Yes | **OA Verification Gate:** Filter PMC queries to strictly ingest articles tagged with Open Access licenses permitting commercial reuse. Exclude `CC-BY-NC` from commercial derivation. |

---

## 3. Deep-Dive Compliance Analysis

### 3.1 GNU AGPL-3.0 & GPL-3.0 Boundary Defense
- **The Threat:** Section 13 of the AGPL-3.0 specifies that if a modified program is executed on a server and accessed by users remotely through a computer network, the entire source code of that modified program must be made available to those remote users.
- **The Defense:**
  1. The Muscle Intelligence API backend is written entirely from scratch using Supabase PostgreSQL, TypeScript, and Edge Functions.
  2. No code from `wger` or `AddBiomechanics` platform repositories is copied, imported, or executed in Muscle Intelligence.
  3. All data obtained from wger is extracted via public read-only HTTP GET requests against its REST API or independent ETL scripts operating on standard JSON representations of factual fitness concepts.

### 3.2 Creative Commons ShareAlike (CC-BY-SA 4.0 & 2.1 Japan) for Anatomy
- **The Threat:** Z-Anatomy and BodyParts3D distribute 3D anatomical polygon meshes under CC-BY-SA. The ShareAlike clause dictates that if a licensee creates a derivative work of the 3D model (e.g., decimating meshes, combining organs, adding texture maps) and distributes it, the licensee must license that derivative work under CC-BY-SA.
- **The Defense & Architecture Decision:**
  1. **Phase 1-7 (2D SVG Anatomy):** The core product will render muscle groups using custom 2D vector SVGs authored independently or licensed under commercial terms. This completely eliminates 3D mesh ShareAlike risk during MVP and mobile launch.
  2. **Anatomical Facts vs Copyrightable Expression:** Standard medical terminology, muscle names, origins, insertions, innervations, and functional actions are uncopyrightable scientific facts. Storing `pectoralis_major` with origin at `clavicular head` and action `horizontal adduction` in PostgreSQL does not trigger CC-BY-SA ShareAlike obligations.
  3. **Future 3D Module (Phase 8):** If 3D glTF models from Z-Anatomy are rendered in Three.js, the 3D model assets will be hosted on a separate CDN with an explicit CC-BY-SA 4.0 attribution notice, decoupled from the proprietary application source code.

### 3.3 Research Paper Fair Use vs Open Access Text Mining
- **The Threat:** Scraping copyrighted scientific journal articles (e.g., paywalled papers from Elsevier, Springer, or Wiley) violates publisher terms of service and copyright law.
- **The Defense:**
  1. Muscle Intelligence only stores bibliographic metadata (title, authors, year, journal, DOI) for paywalled studies via OpenAlex and Crossref APIs, which is explicitly legal and public under CC0.
  2. Full-text mining is strictly gated to the **PubMed Central Open Access (PMC OA) Subset** and Europe PMC OA articles bearing **CC-BY** or **CC0** licenses.
  3. Any article carrying a `Non-Commercial` restriction (`CC-BY-NC`) is flagged in the database with `commercial_redistribution_permitted = FALSE`, preventing the full text from being republished in user-facing views while permitting factual citation.

---

## 4. Compliance Checklist for Data Ingestion Pipeline

Every automated or manual ingestion script must enforce this automated checklist:

- [x] **Source Verification:** The external source must have an active entry in `external_sources` and `source_licenses`.
- [x] **License Tagging:** Every imported record stores its `licence_type` and `licence_url`.
- [x] **Commercial Check:** If `is_commercial_allowed == FALSE`, the record is routed to research review and quarantined from public customer exports.
- [x] **Attribution Generator:** The system auto-generates mandatory legal attribution strings (e.g. *"Exercise metadata enriched with data from Kinetic Exercises DB under MIT License"*).
- [x] **Clean-Room Verification:** Code review confirms zero dependencies on AGPL-3.0 or GPL-3.0 npm packages.
