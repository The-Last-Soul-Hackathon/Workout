# MUSCLE INTELLIGENCE
## CROSS-PLATFORM PRODUCT & ENGINEERING ARCHITECTURE
**Next.js • React Native / Expo • Supabase • PostgreSQL • Supabase CLI • Vercel**

This document updates the previous UX and product specification with the technology choices the user has selected. It defines a shared architecture for a web platform and a mobile application, including code organisation, data ownership, authentication, deployment, CLI workflow, security, testing and implementation order.

**Product objective remains unchanged:** an explainable bodyweight-training intelligence platform that maps exercises to muscles, compares variations, analyses actual training exposure, identifies potential gaps and supports an editable, evidence-aware training plan.

---

## 1. Recommended architecture at a glance

```
                 ┌───────────────────────────────┐
                 │          Shared backend       │
                 │ Supabase Auth + PostgreSQL     │
                 │ Storage + Edge Functions       │
                 └───────────────┬───────────────┘
                                 │
                  ┌──────────────┴──────────────┐
                  │                             │
       ┌──────────▼──────────┐       ┌──────────▼──────────┐
       │ Web application     │       │ Mobile application  │
       │ Next.js + TypeScript│       │ React Native + Expo │
       │ Deployed on Vercel  │       │ Android / iOS       │
       └──────────┬──────────┘       └──────────┬──────────┘
                  │                             │
                  └──────────────┬──────────────┘
                                 │
                  ┌──────────────▼──────────────┐
                  │ Shared TypeScript packages  │
                  │ domain types, calculations, │
                  │ validation, exercise data   │
                  └─────────────────────────────┘
```

The web and mobile apps should be two interfaces over the same product domain. **Do not build two separate databases, two exercise libraries or two independent calculation engines.**

---

## 2. Technology stack and responsibility

| Technology | Responsibility | Recommendation |
| :--- | :--- | :--- |
| **Next.js + TypeScript** | Web application: dashboard, detailed analysis, research library, administration and desktop workflows. | Use App Router; deploy to Vercel. |
| **React Native + Expo + TypeScript** | Mobile application: workout logging, exercise browsing, anatomy exploration and progress views. | Use Expo development builds when native modules or advanced integrations are needed. |
| **Supabase** | Hosted backend: PostgreSQL, Auth, Storage, Row Level Security and optional Edge Functions. | One Supabase project can serve web and mobile. |
| **Supabase CLI** | Local Supabase stack, migrations, type generation, seed data and linked project management. | Commit migrations and seed scripts to Git. |
| **Vercel** | Build and deploy the Next.js web app; preview deployments for branches. | Do not use Vercel as the database. |
| **PostgreSQL** | Relational source of truth for canonical exercise, anatomy, evidence and user training data. | Use migrations and constraints. |
| **TypeScript shared packages** | Shared schemas, domain types and deterministic calculations. | Keep UI components platform-specific where needed. |
| **GitHub** | Source control, pull requests, issues and CI workflows. | Protect main branch and review database migrations. |

---

## 3. Monorepo layout

A monorepo is recommended because web and mobile share domain types, calculation functions and canonical exercise data. Use pnpm workspaces and Turborepo only if the project benefits from task caching; do not add tooling complexity before it is needed.

```
muscle-intelligence/
├── apps/
│   ├── web/                  # Next.js web application
│   └── mobile/               # React Native + Expo app
├── packages/
│   ├── domain/               # Core domain models and business rules
│   ├── calculations/         # Volume, mapping, comparison, progression
│   ├── validation/           # Zod schemas and input validation
│   ├── exercise-data/        # Seed/import source data
│   ├── supabase-client/      # Shared typed client helpers
│   └── design-tokens/        # Shared colours, spacing, typography tokens
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   ├── config.toml
│   └── functions/
├── docs/
│   ├── product/
│   ├── ux/
│   ├── science/
│   └── architecture/
├── scripts/
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

## 4. Product responsibilities by platform

| Product area | Web app | Mobile app |
| :--- | :--- | :--- |
| **Dashboard** | Full analytical dashboard, larger charts and multi-panel overview. | Compact summary, quick status and shortcuts. |
| **Muscle Explorer** | Detailed front/back anatomy, filters and deep-dive evidence. | Touch-friendly anatomy map, zoom, searchable muscle list. |
| **Exercise library** | Advanced filtering, detailed exercise pages and bulk review. | Browse, search, save favourites and inspect exercise details. |
| **Exercise comparison** | Best surface for detailed side-by-side comparison. | Simplified comparison cards and key differences. |
| **Workout builder** | Full weekly plan and round editing. | Create/edit sessions and rearrange exercises with touch controls. |
| **Live workout** | Can log workouts, but not the primary focus. | Primary fast logging experience; set completion, rest timer and offline queue. |
| **Research library** | Full citations, study notes, filters and source review. | Concise evidence summary with links to full details. |
| **Administration** | Review exercise mappings, evidence and canonical data. | No admin tooling in initial release. |

The mobile app should prioritise training in the moment. The web app should prioritise deep analysis, configuration and research. Both must show the same underlying results.

---

## 5. Shared domain logic

The most important shared code is not the UI. It is the domain and calculation layer. A workout entered on mobile must produce the same weekly exposure result as the same workout entered on web.

| Shared package | Contains |
| :--- | :--- |
| `domain` | Muscle, exercise, variation, round, plan, workout session and set-log types; canonical identifiers; domain rules. |
| `calculations` | Direct/indirect exposure, exercise comparison, movement coverage, progression rules and transparent model outputs. |
| `validation` | Schemas for exercise definitions, workout logs, user settings and calculation inputs. |
| `exercise-data` | Canonical anatomy and exercise definitions, mappings and seed import definitions. |
| `supabase-client` | Typed database client construction and safe shared query helpers. |
| `design-tokens` | Colour, typography, spacing and component tokens; not platform-specific UI components. |

### 5.1 Calculation contract

```typescript
type ModelOutput<T> = {
  model: string;
  version: string;
  value: T;
  unit: string;
  confidence: "high" | "moderate" | "low" | "unknown";
  classification: "measured" | "user_reported" | "evidence_derived"
                | "modelled" | "assumed";
  assumptions: string[];
  sourceIds: string[];
  generatedAt: string;
};
```

The shared calculation package should be deterministic and unit-tested. Never place scientific formulas directly inside React components.

---

## 6. Supabase database design

Use PostgreSQL as the canonical data store. Separate canonical reference data from user-owned data. Canonical exercises and muscles are maintained centrally; users own their rounds, plans, sessions, logs and preferences.

| Schema / table group | Core tables |
| :--- | :--- |
| **Reference anatomy** | `muscle_groups`, `muscles`, `muscle_heads`, `movement_patterns`, `joints` (optional). |
| **Exercise library** | `exercises`, `exercise_variations`, `exercise_muscles`, `equipment`, `exercise_prerequisites`, `exercise_regressions`. |
| **Evidence** | `research_studies`, `study_findings`, `mapping_evidence`, `model_versions`. |
| **User training** | `profiles`, `user_preferences`, `round_templates`, `round_exercises`, `workout_plans`, `plan_days`, `workout_sessions`, `set_logs`. |
| **Analytics** | `muscle_targets`, `model_outputs`, `muscle_exposure_snapshots`, `performance_measurements`. |
| **Operations** | `audit_events`, `import_jobs`, `data_review_queue`. |

### 6.1 Data ownership
- **Canonical reference data:** readable by all authenticated users; writable only by trusted admin/review processes.
- **Personal training records:** every row carries `user_id` and is protected by Row Level Security.
- **Public research metadata:** readable to users; editing is restricted to administrators.
- **Model outputs:** user-specific outputs must be scoped to the owning user and tied to a model version.
- **Do not store service-role credentials in either web or mobile clients.**

### 6.2 Security requirements
- Enable Row Level Security on every user-owned table.
- Use `auth.uid()` policies to enforce ownership.
- Never expose the Supabase `service_role` key to browsers, mobile bundles or public repositories.
- Use publishable/anon keys only with correctly configured RLS.
- Validate all writes on the server or database boundary; client-side validation is not security.
- Use database constraints and foreign keys to prevent invalid exercise logs.
- Keep private user measurements and training data inaccessible to other users by default.

---

## 7. Supabase CLI workflow

Supabase CLI should be part of the project workflow from the beginning. Schema changes should be migrations, not manual dashboard-only edits.

```bash
# Install / initialise according to the current Supabase CLI guide
supabase init

# Start local Supabase services
supabase start

# Create a migration
supabase migration new create_core_training_schema

# Apply migrations locally
supabase db reset

# Generate TypeScript database types
supabase gen types typescript --local > packages/supabase-client/src/database.types.ts

# Link to hosted Supabase project
supabase link --project-ref YOUR_PROJECT_REF

# Push committed migrations to hosted project
supabase db push

# Inspect migration state
supabase migration list
```

### 7.1 Seed data strategy
- Store canonical anatomy and exercise data in version-controlled seed files.
- Use stable UUIDs or stable slugs for canonical muscles and exercises.
- Keep user-specific round templates out of global seed data.
- Seed the original exercise rounds and the accessory movements as editable templates.
- Include provenance and confidence metadata with each muscle mapping.
- Make seed scripts idempotent so rerunning them does not create duplicates.

---

## 8. Vercel web deployment

Vercel deploys the Next.js web application. Supabase remains the backend and database provider.

```bash
# Typical workflow
git push origin main
# Git integration triggers a Vercel production deployment.
# Preview deployments are created for branches / pull requests.
# Configure environment variables in Vercel project settings.
```

| Environment | Purpose |
| :--- | :--- |
| **Local** | Next.js development server and local Supabase or development Supabase project. |
| **Preview** | Branch-based web previews connected to a non-production Supabase project where possible. |
| **Production** | Public web application connected to production Supabase. |

Use separate Supabase projects for development/staging and production if feasible. Never test destructive migrations against production data. Add the required public Supabase URL and publishable key to Vercel environment variables. Keep service-role secrets server-only and avoid them unless a server-side privileged operation is genuinely required.

---

## 9. React Native / Expo mobile architecture

```
apps/mobile/
├── app/                      # Expo Router routes
├── src/
│   ├── features/
│   │   ├── dashboard/
│   │   ├── muscles/
│   │   ├── exercises/
│   │   ├── comparison/
│   │   ├── workouts/
│   │   ├── analysis/
│   │   └── profile/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   ├── navigation/
│   └── theme/
├── assets/
└── app.config.ts
```

### 9.1 Mobile-specific requirements
- Use Expo Router or a consistent React Navigation setup; do not mix routing patterns casually.
- Use a secure session persistence approach compatible with the current Supabase React Native guidance.
- Support offline workout logging: queue set logs locally and sync when connectivity returns.
- Handle conflict resolution explicitly if a user edits the same plan on two devices.
- Make rest timers reliable across app backgrounding; test platform behaviour.
- Support deep links from exercise links and plan notifications.
- Use native build profiles for development, preview and production.
- Test on a physical Android device early; emulator-only testing is insufficient.
- Do not assume the mobile app is automatically deployed by Vercel. Mobile binaries are built and distributed through the Expo/EAS and app-store workflows. Vercel is for the web app.

---

## 10. API and data access strategy

For the first release, web and mobile can use the Supabase client directly for user-scoped reads/writes under strict RLS. Put privileged or multi-step server operations behind Edge Functions or a trusted server route.

| Operation | Recommended path |
| :--- | :--- |
| **Read exercise and anatomy catalogue** | Supabase client; read-only policies for canonical data. |
| **Save user workout set** | Supabase client with RLS; validate schema and constraints. |
| **Calculate weekly exposure** | Shared TypeScript calculation package using fetched user logs and mappings; later move expensive or authoritative aggregation server-side. |
| **Admin update of muscle mapping** | Trusted admin workflow / server-side operation; never expose service role to client. |
| **Import bulk exercise data** | Controlled script or protected server process with validation and audit log. |
| **Generate report** | Server-side function or web server route if it requires private aggregation or export. |

---

## 11. Offline-first workout experience

A mobile workout may happen in a gym, park or area with poor connectivity. Logging should not fail just because the network drops.

```
User completes set
      ↓
Validate locally
      ↓
Save to local persistent queue
      ↓
Show set as saved on device
      ↓
When online: sync to Supabase
      ↓
Confirm server acknowledgement
      ↓
Mark queue item as synced
```

Use unique client-generated IDs for queued log entries to support idempotent sync. A retry must not create duplicate sets. Show a visible sync state: **Saved on device**, **Syncing**, **Synced** or **Sync failed**.

---

## 12. Authentication and user onboarding

- Support email/password or magic link initially; choose OAuth providers only when needed.
- On successful sign-in, load user preferences and personal training data.
- First-time setup asks for training goal, available days, equipment and preferred session length.
- Allow the user to import/select the supplied rounds and accessory library.
- Do not force body measurements or sensitive profile details to use the app.
- Provide account export and deletion workflows as the product matures.

---

## 13. Testing and quality assurance

| Test layer | What to test |
| :--- | :--- |
| **Unit tests** | Volume accounting, side handling, RIR parsing, comparison logic, formula units and edge cases. |
| **Database tests** | Migrations, foreign keys, constraints, RLS policies and user data isolation. |
| **Web component tests** | Navigation, filters, forms, charts and responsive layouts. |
| **Mobile tests** | Workout logging, app background/foreground, offline queue, deep links and session persistence. |
| **Integration tests** | Same input logs produce same analysis on web and mobile. |
| **End-to-end tests** | Onboard → build plan → log workout → sync → view analysis. |
| **Security tests** | Unauthorised access to another user's plan/logs; ensure no privileged key in client bundle. |

A critical acceptance test: create a session on mobile, sync it, open the web dashboard and verify the same session and muscle-exposure calculation. Then edit the plan on web and verify the mobile app receives the updated version.

---

## 14. CI/CD and Git workflow

- Use feature branches and pull requests.
- Run formatting, linting, TypeScript checks and unit tests on every pull request.
- Run database migration checks before merging schema changes.
- Create Vercel preview deployments for web changes.
- Use Expo development builds for mobile QA and EAS Build for distributable binaries.
- Promote tested changes to production; do not auto-run destructive database migrations without review.
- Tag releases and record the calculation-engine version included in each release.

---

## 15. Recommended build sequence

| Phase | Build | Exit criteria |
| :--- | :--- | :--- |
| **1. Repository foundation** | Monorepo, TypeScript, Next.js, Expo app, shared domain package and Git workflow. | Both apps start; shared package imports work. |
| **2. Supabase foundation** | Local CLI, migrations, seed data, Auth, RLS and generated types. | A user can sign in and safely access their own data. |
| **3. Canonical library** | Muscle taxonomy, exercise catalogue, variations, evidence metadata and original rounds. | Web and mobile show the same catalogue. |
| **4. Core UX** | Web dashboard, anatomy explorer, exercise library and comparison; mobile exercise browser. | User can inspect and compare exercises on both platforms. |
| **5. Training workflow** | Round builder, weekly plan, mobile workout logger and offline queue. | User can plan and log a session on mobile. |
| **6. Analysis engine** | Shared exposure calculation, coverage analysis and gap explanations. | Same logs yield same web/mobile analysis. |
| **7. Research & optimisation** | Research library, evidence review, explainable suggestions and progression. | Recommendations have reasons, sources and editable controls. |
| **8. Production readiness** | Monitoring, backups, security review, accessibility, performance and release pipeline. | Reliable web and mobile releases. |

---

## 16. What not to build too early

- Do not begin with machine learning or AI recommendations. Build trustworthy data and deterministic calculations first.
- Do not build a complex 3D anatomy engine before the 2D interactive SVG explorer proves useful.
- Do not duplicate business logic in the web and mobile codebases.
- Do not put all database queries into UI components.
- Do not make every calculation a Supabase Edge Function; use the shared package for deterministic client-side analysis where safe.
- Do not add microservices. One well-structured Supabase/Postgres backend is enough for the initial product.
- Do not make a custom admin app before the canonical data review workflow is understood.

---

## 17. Recommended repository and deployment ownership

| Asset | Source of truth | Deployment / execution |
| :--- | :--- | :--- |
| **Web app** | `apps/web` in Git repository | Vercel |
| **Mobile app** | `apps/mobile` in Git repository | Expo EAS Build / app distribution |
| **Database schema** | `supabase/migrations` in Git repository | Supabase CLI |
| **Seed reference data** | `supabase/seed.sql` and `packages/exercise-data` | Supabase CLI / controlled import |
| **Exercise calculation logic** | `packages/calculations` | Consumed by web and mobile |
| **Canonical training data** | Supabase PostgreSQL | Supabase |
| **User workout logs** | Supabase PostgreSQL; local queue on mobile until synced | Supabase + mobile sync |

---

## 18. Final architecture recommendation

Use a TypeScript monorepo with Next.js for the web product, React Native with Expo for the mobile product, and Supabase/PostgreSQL as the shared backend. Use Supabase CLI for migrations, local development and seed management. Deploy the web app through Vercel and build/distribute mobile apps through Expo's native build and store workflows.

This structure supports the user's actual objective: **one consistent training intelligence system that can be explored deeply on desktop and used conveniently during workouts on mobile.**

---

## 19. Immediate implementation checklist

- [x] Create Git repository and monorepo structure.
- [ ] Create Next.js web app and Expo React Native app.
- [ ] Create shared TypeScript domain and calculation packages.
- [ ] Initialise Supabase locally with CLI.
- [ ] Design and commit the first PostgreSQL migrations.
- [ ] Add RLS policies before connecting personal data screens.
- [ ] Import canonical anatomy, exercise variations and original round templates.
- [ ] Build the Muscle Explorer and Exercise Comparison UX.
- [ ] Connect both clients to the same Supabase project.
- [ ] Deploy the web app to Vercel preview and production environments.
- [ ] Set up Expo development build and test workout logging on Android.
- [ ] Add shared calculation tests to ensure web/mobile consistency.

### Reference documentation to consult during implementation
- Supabase documentation: https://supabase.com/docs
- Supabase CLI: https://supabase.com/docs/guides/cli
- Supabase React Native quickstart: https://supabase.com/docs/guides/auth/quickstarts/react-native
- Next.js documentation: https://nextjs.org/docs
- Expo documentation: https://docs.expo.dev/
- Expo EAS Build: https://docs.expo.dev/build/introduction/
- Vercel documentation: https://vercel.com/docs
- pnpm workspaces: https://pnpm.io/workspaces
