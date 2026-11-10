# MUSCLE INTELLIGENCE
## UX & PRODUCT EXPERIENCE BLUEPRINT
**What the user wants to see, understand, compare, decide and improve**

This document defines the actual user experience of the Muscle Intelligence platform. It translates the product objective into screens, information hierarchy, visualisations, interactions, workflows and expected outputs. It is intentionally focused on what appears on screen and how a user works with it—not just the underlying code or database.

**Core product promise:** Show the user what their training is doing across the whole body, reveal what is missing or overemphasised, explain why, and help them make a better training plan using transparent evidence and calculations.

---

## 1. The user's objective — the central product truth

The user is not trying to build a basic workout tracker. The objective is to build a bodyweight-training intelligence system that can analyse a large collection of exercises and training rounds, understand the muscles and movement patterns involved, compare exercises, calculate a sensible training dose, identify gaps and help design a balanced programme.

### 1.1 The questions the product must answer
1. Which muscles and muscle subdivisions am I training with each exercise?
2. Which muscles are the main targets, which assist, and which mainly stabilise?
3. How do two similar exercises differ? What does an archer pull-up add compared with a standard pull-up? What changes between normal, decline, diamond, pike or pseudo-planche push-ups?
4. Across my selected rounds and completed workouts, which muscles receive meaningful work and which receive very little?
5. Am I repeatedly training the same muscles while neglecting other important muscles or movement functions?
6. How many challenging sets, repetitions or seconds should I aim for, given my current ability and the difficulty of the variation?
7. How much weekly work have I accumulated for each muscle group, including direct and indirect work?
8. What should I add, remove, replace or progress to improve balance and reach my selected goal?
9. How reliable is each answer, what evidence supports it, and what is estimated rather than measured?

### 1.2 The user's desired end result

| The user wants to see | The interface must provide |
| :--- | :--- |
| **The whole-body picture** | Front/back anatomical map with selectable muscle groups and clear coverage states. |
| **Exercise-level detail** | A muscle contribution breakdown, role labels, movement mechanics, difficulty and technique assumptions. |
| **Exercise differences** | Side-by-side comparison that explains what changes, not just a similarity percentage. |
| **Training dose** | Weekly sets, reps, holds, effort and direct/indirect exposure by muscle. |
| **Missing work** | Underrepresented muscles and movement patterns with evidence-aware suggestions. |
| **A practical plan** | An editable weekly schedule with exercises, sets, reps/holds, rest and progression targets. |
| **Scientific credibility** | Sources, evidence quality, assumptions, confidence and clear warnings against false precision. |

---

## 2. UX principles and product personality

- **Analysis before prescription:** Show what is happening before telling the user what to do.
- **Whole body before isolated numbers:** Make muscle coverage and movement balance easy to understand at a glance.
- **Explain every score:** Clicking a result should reveal its inputs, formula, evidence and uncertainty.
- **Separate facts from estimates:** Measured, user-reported, evidence-derived, modelled and assumed data must look different.
- **Actionable, not decorative:** Every chart should answer a question or support a decision.
- **User control:** The user can edit rounds, exclude exercises, change goals and override suggestions.
- **Progressive disclosure:** Simple summary first; technical detail on demand.
- **Bodyweight-aware:** Variation, leverage, assistance, range of motion and technique matter—not just the exercise name.

---

## 3. Navigation and information architecture

| Primary navigation | Purpose | Most important content |
| :--- | :--- | :--- |
| **Overview** | Answer: how is my training going? | Coverage summary, weekly workload, progress and priority gaps. |
| **Muscles** | Answer: what is trained? | Front/back body map, muscle details and muscle-specific history. |
| **Exercises** | Answer: what does each movement do? | Library, filters, exercise detail and comparison. |
| **My Training** | Answer: what am I doing? | Rounds, workout builder, weekly plan and session log. |
| **Analysis** | Answer: what is missing or excessive? | Volume accounting, exercise overlap, movement balance and recommendations. |
| **Research** | Answer: why should I trust this? | Studies, evidence mapping, confidence and limitations. |

On mobile, use a compact bottom navigation for the core destinations (`Overview`, `Muscles`, `Exercises`, `Workouts`, `Analysis`).

---

## 4. Global visual language

### 4.1 Visual direction
The experience feels like a modern scientific performance dashboard: dark graphite/navy surfaces, restrained accent colours, crisp typography, clean anatomical illustrations and data visualisations that remain readable.

| Element | UX direction |
| :--- | :--- |
| **Background** | Dark graphite/slate theme (`#0F172A`, `#1E293B`). |
| **Cards** | Quiet surfaces, subtle borders, consistent spacing and clear grouping. |
| **Typography** | Strong hierarchy: large page title, concise section titles, compact data labels. |
| **Primary accent** | One consistent accent for selected controls and primary actions (`#38BDF8` or `#6366F1`). |
| **Coverage states** | Low coverage, In target range, High exposure, Not assessed. |
| **Charts** | Clean progress bars and exposure totals without misleading decimals. |
| **Anatomy map** | Front/back SVG with selectable regions, state highlighting and legend. |

---

## 5. Screen 1 — Overview dashboard

```
┌──────────────────────────────────────────────────────────┐
│ MUSCLE INTELLIGENCE                 Week ▾   Profile     │
│ Overview                                                 │
│ Your training at a glance                                │
├──────────────┬──────────────┬──────────────┬─────────────┤
│ Sessions     │ Working sets │ Active days  │ Plan prog.  │
│     3        │      42      │      4       │     75%     │
├──────────────────────────────┬───────────────────────────┤
│ WHOLE-BODY COVERAGE          │ THIS WEEK EXPOSURE        │
│ [Front body map] [Back map]  │ Muscle exposure bars      │
│                              │ Chest       ███████       │
│ Tap a muscle to inspect      │ Back        █████         │
│                              │ Quads       ███           │
│                              │ Hamstrings  ██            │
├──────────────────────────────┼───────────────────────────┤
│ PRIORITIES                   │ RECENT SESSIONS           │
│ • Review hamstring coverage  │ Round 4 • Yesterday       │
│ • Add lateral shoulder work  │ Round 1 • 3 days ago      │
│ • Check push/pull balance    │                           │
└──────────────────────────────────────────────────────────┘
```

---

## 6. Screen 2 — Muscle Explorer

```
┌──────────────────────────────────────────────────────────┐
│ MUSCLES                                                  │
│ Explore muscle groups                                    │
│ [Front] [Back] [Major groups ▾] [Show coverage ▾]        │
│                                                          │
│       [Interactive anatomical body illustration]         │
│       Selectable chest, delts, arms, core, glutes,       │
│       thighs, calves, back and smaller subdivisions      │
│                                                          │
│ Legend: Below target | In target range | Higher exposure │
├──────────────────────────────────────────────────────────┤
│ SELECTED: Latissimus dorsi                               │
│ Weekly exposure: 5.5 fractional sets (estimated)         │
│ Direct: 4 sets   Indirect: 1.5 set-equivalents           │
│ Coverage status: In target range                         │
│ [View exercises] [View history] [Compare]                │
└──────────────────────────────────────────────────────────┘
```

---

## 7. Screen 3 — Exercise Library & Detail

Browse, search, and filter exercises by:
- Muscle or subdivision
- Movement pattern (vertical pull, horizontal push, squat, hinge, etc.)
- Difficulty (Beginner, Intermediate, Advanced)
- Equipment (None, Pull-up bar, Wall, Stable chair)
- Round template (Rounds 1–22, Mobility 23–25, Accessory 26)

---

## 8. Screen 4 — Exercise Comparison

Side-by-side comparison of two exercises (e.g. Standard Pull-up vs. Archer Pull-up):
- Movement pattern and joint actions
- Muscle roles (Primary, Synergists, Stabilisers)
- Real differences that matter (unilateral bias, skill demand, leverage)
- Prerequisites and safety cautions

---

## 9. Screen 5 — My Training & Live Workout Logger

- **Round templates:** 22 strength rounds, 3 mobility flows, 1 accessory balance round.
- **Workout Builder:** Customise sets, reps, holds, rest, and sides.
- **Live Workout Logger:** Rapid 1-tap set completion with auto-rest timer, RIR tracking, technique quality, and offline local caching.

---

## 10. Screen 6 — Analysis & Muscle Coverage Gaps

- Explains what muscles have low exposure based on logged work.
- Surfaces actionable recommendations (e.g., Hamstring walkouts for knee flexion gap).
- Explains the reasoning behind every suggested substitution or addition.
