# Muscle Intelligence ⚡

> **A research-informed bodyweight training analysis, planning and optimisation platform**  
> *Next.js • React Native (Expo) • Supabase • PostgreSQL*

Muscle Intelligence turns a comprehensive bodyweight exercise library (22 original strength rounds, 3 mobility flows, and an accessory muscle-balance collection) and a user's logged training into an **explainable model** of muscular coverage, weekly training dose, exercise overlap, progression, and potential gaps.

---

## 📚 Product & Engineering Documentation

The complete specifications and blueprints are available in the `/docs` directory:

1. **[Architecture Specification](docs/architecture/ARCHITECTURE.md)**  
   *Cross-platform monorepo architecture, Next.js web, React Native Expo mobile app, Supabase PostgreSQL data layer, Row Level Security, offline synchronization, and deployment workflows.*

2. **[Product Requirements & Scientific Models](docs/product/PRODUCT_SPECIFICATION.md)**  
   *Core product vision, 26 round exercise inventory, anatomical taxonomy, exercise-to-muscle mapping, scientific formulas (fractional sets, RIR, asymmetry, biomechanics), and implementation roadmap.*

3. **[UX & Product Experience Blueprint](docs/ux/UX_BLUEPRINT.md)**  
   *User interface specifications, front/back interactive anatomy maps, exercise comparison engine, workout builder, live logger, and coverage gap detection workflows.*

---

## 🏗 System Architecture & Repository Layout

The project is organised as a clean TypeScript monorepo where the Web application and Mobile application share canonical exercise data, anatomy definitions, domain types, and calculation engines:

```
muscle-intelligence/
├── apps/
│   ├── mobile/               # React Native + Expo mobile application
│   └── web/                  # Next.js web application
├── packages/
│   ├── domain/               # Domain models, entities and types
│   ├── calculations/         # Deterministic exposure, RIR, comparison engine
│   ├── exercise-data/        # Canonical exercises (Rounds 1-26) & anatomy taxonomy
│   └── design-tokens/        # Shared color tokens, spacing, typography
├── supabase/
│   ├── migrations/           # PostgreSQL schema & RLS policies
│   └── seed.sql              # Idempotent seed data for canonical library
├── docs/                     # Full system specifications
└── README.md
```

---

## 📱 Mobile Application (React Native / Expo)

The mobile application prioritises training in the moment with offline-first logging, interactive anatomical exploration, and instant volume calculations:

- **Interactive Muscle Explorer:** Interactive front/back anatomical body map to visualize direct and indirect training load.
- **Exercise Library & Side-by-Side Comparison:** Deep-dive into biomechanics, joint actions, and evidence confidence for all 26 rounds.
- **Live Workout Logger:** Rapid 1-tap set completion with auto-rest timers, RIR tracking, and offline persistence.
- **Muscle Coverage & Gap Analysis:** Instant feedback highlighting underrepresented muscle groups and suggested bodyweight accessories.

---

## 🚀 Quick Start (Mobile App)

### Prerequisites
- Node.js >= 18 (Node 20+ recommended)
- npm or pnpm

### Running the Mobile App
```bash
# Navigate to mobile app
cd apps/mobile

# Install dependencies
npm install

# Start the Expo development server
npx expo start
```
From the Expo CLI, you can scan the QR code with **Expo Go** (Android / iOS) or press `w` to open in a web browser.

---

## 🔬 Scientific Core & Explainability Principle

Every training exposure score is calculated deterministically through the shared `@muscle-intelligence/calculations` engine:

$$\text{WeeklyExposure}[m] = \sum_{e \in \text{exercises}} \left( \text{hard\_sets}[e] \times \text{coefficient}[e, m] \right)$$

Scores are clearly labelled with their classification: `measured`, `user_reported`, `evidence_derived`, `modelled`, or `assumed`, strictly avoiding false precision.
