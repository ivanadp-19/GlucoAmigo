# GlucoAmigo

Demo web mobile-first de una app educativa para pacientes con diabetes. Frontend only, sin backend.

Ver también: [README](./README.md), [SPEC](./docs/SPEC.md).

## Design Context

### Users

**Primary audience:** People living with diabetes (type 1 and type 2) in Mexico, using the app on their phone in everyday life—not clinicians, payers, or investors as the main persona.

**Context:** Short, frequent check-ins (glucose log, quick lesson, emotional check-in, food ideas). They may feel tired of clinical jargon, guilt about “bad numbers,” or overwhelm from traditional health tools. The product is a **demo** (mock data, no real PHI); copy and UX should still respect how real patients think and feel.

**Job to be done:** Understand how they’re doing, log or review glucose in plain language, learn one small thing, stay motivated without shame—and feel that caring for diabetes can be steady and human, not scary or bureaucratic.

### Brand Personality

**Three words:** Human · Playful · Clear

**Voice:** Mexican Spanish (MX)—warm, direct, “tú,” simple words. Motivating without toxic positivity; never alarmist or punitive about glucose. Educational disclaimers stay visible; the app does not pose as a doctor.

**Emotional goals (dual):**

1. **Motivated and playful** — streaks, small wins, light gamification (Duolingo-inspired energy, not Duolingo branding).
2. **Empowered and capable** — clear status, goals, and progress so numbers feel informative, not judgmental.

**Tagline tone (in-app):** “Tu compañero de cuidado” — companion, not coach or clinic.

### Aesthetic Direction

**Visual tone:** Warm health app that feels **native on mobile** (~430px shell), not a responsive website or corporate wellness portal. Friendly, colorful, didactic; **salud cálida y humana**.

**References (spirit, not copy):**

- Duolingo-like: big rounded cards, bottom nav, microinteractions, progress rings, confetti on success.
- Consumer health apps that feel approachable, not hospital-grade.

**Anti-references — explicitly avoid:**

- Cold clinical / EMR dashboards (dense tables, gray bureaucracy).
- Generic SaaS / corporate wellness (stock illustrations, neutral blue-gray enterprise UI).
- Alarmist health UX (panic red, shame copy, “danger” framing for normal variation).
- Duolingo clone (no mascot knockoff, no identical green/yellow system presented as “our brand”).

**Theme:** Light mode only. Soft gradient backdrop on larger viewports; in-shell background `#f7f9fc`.

**Palette (tokens in `app/globals.css`):**

| Role | Token / hex | Use |
|------|-------------|-----|
| Primary | `#58cc02` / `primary` | Success, streaks, main CTAs |
| Secondary | `#1cb0f6` | Links, info chips |
| Accent | `#ffc800` | Achievements, highlights |
| Warning / high glucose | `#ff9600`, `#ff4b4b` | Alerts—inform, don’t scare |
| Surface / background | `#ffffff`, `#f7f9fc` | Cards and page |
| Text / muted | `#1f2937`, `#6b7280` | Body and secondary |

**Typography:** Plus Jakarta Sans (400–800). Headlines extrabold; UI labels semibold; generous tracking on hero lines.

**Shape & motion:** Cards `1.25rem` radius, buttons `1rem`, subtle **pressable** scale on tap, `fade-in` / `bounce-in` / streak animations. Confetti sparingly for milestones. Hide scrollbars in the mobile shell.

**Iconography:** Emoji acceptable for emotions and delight in a demo; prefer consistent sizing in cards and nav.

### Design Principles

1. **Human first, clinical never** — Plain Spanish (MX), supportive microcopy, disclaimers without breaking warmth. Glucose “fuera de objetivo” = guidance, not failure.

2. **Play with purpose** — Gamification (rachas, quizzes, retos familiares) serves habit and learning, not distraction. Every reward ties to a real self-care action.

3. **Clarity over density** — One primary action per screen; big type for the number that matters; charts and badges scannable at a glance.

4. **Empower, don’t alarm** — Color encodes status (verde / ámbar / rojo suave) with copy that explains next steps; avoid panic UI and shame language.

5. **Mobile-native frame** — Design inside the `MobileShell` (max-width 430px, bottom nav, safe areas). Desktop is a preview frame, not the primary layout.

6. **Demo honesty** — Mock user (e.g. Ana), visible educational disclaimer, no fake medical authority. Visual polish is high; medical claims are low.

### Implementation notes

- **Stack:** Next.js App Router, TypeScript, Tailwind v4 (`@theme inline` tokens), Recharts for glucose charts.
- **Accessibility:** Demo scope—keep readable contrast and tap targets by default; no formal WCAG program unless the product graduates beyond demo.
- **Locale:** `lang="es"`; strings and examples tuned for Mexico (units mg/dL, familiar meal/emotion labels).
