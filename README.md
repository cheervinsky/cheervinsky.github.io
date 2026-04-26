# Cheervinsky Design System

A design system for **Cheervinsky** — a studio that builds small, warm, thoughtful apps for wellness, focus, creativity, and everyday utility.

Cheervinsky's apps live under one roof. They are tools that help people **relax, focus, understand themselves, improve their habits, and make life a little more playful.** The design system reflects that: warm, unhurried, a little analog, subtly animated, never slick or cold.

## Sources

_No existing assets, codebase, or Figma files were provided at the time this system was authored._ The brand language below was derived from the company description:

> Cheervinsky — a studio of building wellness, focus, creativity, and utility apps. The site should present all applications as part of one ecosystem: tools that help people relax, focus, understand themselves, improve habits, and make life more playful. The design should be modern and cool and will have animation effects.

If/when the studio shares logos, existing product screens, Figma files, or a codebase, this system should be re-derived against those sources. Until then, the foundations here are an opinionated first draft.

## The ecosystem

Cheervinsky presents its apps as a single, related family rather than isolated products. Each app is a little room inside the same warm house. The current (illustrative) family in this system:

| App | Domain | One-liner |
|---|---|---|
| **Dawn** | Wellness | A gentle morning companion — breath, intentions, light. |
| **Kiln** | Focus | Deep-work sessions with a slow-burning timer. |
| **Mira** | Self-understanding | Mood, journal, and patterns over time. |
| **Sprout** | Habits | Tiny daily habits that grow into something. |
| **Confetti** | Playful utility | A grab-bag of small delights — tip calculator, coin flip, dice, decision spinner. |

These names are placeholders until the studio confirms its actual product lineup.

## Index

- `README.md` — this file. Brand, content, visual, iconography fundamentals.
- `colors_and_type.css` — tokens: colors, typography, spacing, radii, shadows, motion.
- `fonts/` — web fonts. **Substitution flagged**: Fraunces, Inter, and JetBrains Mono are pulled from Google Fonts via `@import` inside `colors_and_type.css`. No custom font files were provided. If the studio has bespoke faces, drop ttf/woff2 files in this folder and add `@font-face` entries.
- `assets/` — logos, product marks, textures, illustrations.
  - `cheervinsky-wordmark.svg` — the studio wordmark with honey dot sigil.
  - `cheervinsky-sigil.svg` — circular avatar mark.
  - `marks/{dawn,kiln,mira,sprout,confetti}.svg` — per-app glyphs.
  - `paper-grain.svg` — 3–6% grain texture.
  - `illustrations/*.svg` — hand-drawn line scenes.
- `preview/` — 26 small HTML cards that populate the Design System tab. Each one exercises a token or component at the smallest meaningful scale.
- `ui_kits/site/` — marketing homepage (8 JSX components + index.html).
- `ui_kits/app/` — phone prototype (7 JSX components + index.html). Click any app card to enter; back arrow returns to the launcher.
- `SKILL.md` — machine-readable entry point for agents using this system.

---

## CONTENT FUNDAMENTALS

Cheervinsky sounds like **a thoughtful friend who has read a few good books and isn't trying to sell you anything.** Writing is plain, warm, specific. Never hyped. Never therapized.

### Voice

- **First-person plural for the studio** ("we made this"), **second-person for the reader** ("you'll notice"). Never "users."
- **Calm, declarative sentences.** Short. Specific. A clause, a comma, a thing.
- **Lowercase-leaning but grammatical.** Sentence case in UI and marketing. Never ALL CAPS for emphasis — use weight or color. Title Case is reserved for app names and proper nouns.
- **Concrete nouns over abstractions.** "A five-minute timer" beats "a focused productivity session."
- **Gentle humor, never jokes-as-content.** A wink in a microcopy string is fine. A whole page of puns is not.
- **No marketing adverbs.** Strike: _seamlessly, effortlessly, powerful, revolutionary, beautifully, simply._
- **No therapy speak.** Strike: _journey, mindfulness, wellness journey, self-care, transformation._ We name the thing: _breath, notice, write, rest._

### Examples

**Yes:**
- "A quiet place to write, five minutes a day."
- "Sprout keeps your streak honest. Skip a day, it still loves you."
- "Kiln is a timer. That's mostly it."
- "You already know. Here's somewhere to put it."
- "Five apps. One small studio."

**No:**
- "Unlock your full potential with Cheervinsky's transformative wellness journey."
- "Supercharge your productivity!"
- "Revolutionary AI-powered mindfulness."

### Casing & mechanics

- **Sentence case** for buttons, menus, headings, toasts. ("Start a session," not "Start A Session.")
- **Oxford comma**, en dashes for ranges, em dashes — like this — for asides.
- **Numerals** for quantities ≥ 2 ("5 min", "12 days"), **spelled** for one ("one breath").
- **Units**: space between number and unit in long form ("5 minutes"), no space in compact UI ("5m", "12d").
- **Ampersand** only in logos/titles, never in body.

### Emoji

- **Sparingly, never as bullets or decoration.** A single emoji at the end of a sentence can work as tone ("See you tomorrow. 🌱"). Never three.
- Each app has a single signature glyph (an SVG mark, not an emoji) that plays emoji's role.

### Error & empty states

Errors are apologetic but brief. Empty states are invitations, not instructions.

- Empty: "Nothing here yet. Want to add one?"
- Error: "That didn't go through. Try again?"
- Offline: "You're offline. We'll catch up when you're back."

---

## VISUAL FOUNDATIONS

The look is **warm paper, dark ink, one honeyed accent.** It sits halfway between a well-loved notebook and a 1970s Swiss poster. Modern layout, analog texture, deliberate pace.

### Palette

**Neutrals (the canvas).**
- `--paper`: `#F3EADB` — warm cream, the default background. Reads as paper, not as white.
- `--paper-2`: `#EADFCB` — raised surface (cards, menus).
- `--paper-3`: `#E0D3B8` — sunken/inset.
- `--ink`: `#1E1A17` — primary text. Warm black, never pure `#000`.
- `--ink-2`: `#4B423A` — secondary text.
- `--ink-3`: `#8A7F72` — tertiary text, captions, placeholders.
- `--rule`: `#D6C8AF` — hairlines, 1px borders.

**Primary accent (the honey).**
- `--honey`: `#E9873B` — the single brand accent. Used for one thing at a time on a screen. Buttons, active states, brand marks.
- `--honey-ink`: `#7A3E10` — honey on paper, text-sized.
- `--honey-wash`: `#FADFB9` — honey tinted pastel for fills and hover washes.

**Product tints (each app has one).** Used only in that app's chrome and its card on the ecosystem page. Never more than one per screen.
- `--dawn`: `#F2B8A2` (soft coral — morning light)
- `--kiln`: `#C0532A` (ember — slow burn)
- `--mira`: `#6E7F5C` (sage — reflective)
- `--sprout`: `#7FA27E` (moss — growing)
- `--confetti`: `#E8C547` (marigold — playful)

**Semantic.**
- `--ok`: `#5E8C4C`
- `--warn`: `#C98A2B`
- `--danger`: `#B4432B`
- `--info`: `#4E6B7F`

Everything in the palette has a slight warm cast. Cool greys and pure blues are avoided.

### Typography

- **Display:** `Fraunces` (variable, opsz + soft axis). Serif with soft, friendly terminals. Used for hero, H1, and occasional pull quotes. _Substitution note: if a custom serif is commissioned later, drop it in at the same role._
- **Body & UI:** `Inter` (variable). Clean grotesque, wide x-height, excellent at small sizes.
- **Mono:** `JetBrains Mono` for numbers in timers, counters, and code.

> Per project guidance, Inter is a common choice — we're using it here because no bespoke sans was provided. **Ask the studio: is there a preferred body face?** (Suggested alternates: National 2, GT Planar, Söhne.)

Type scale (rem, 16px root):
`12 / 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64 / 80`

Line heights: 1.15 for display, 1.5 for body, 1.35 for UI.

Tracking: -2% on display ≥ 36px, 0 on body, +2% on small caps and labels.

### Spacing

8-pt base with half-steps where we need breathing room: `2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128`.

**Breathing room is a feature.** Prefer more whitespace than you think. When in doubt, 24 → 32.

### Radii

`--r-xs: 4` (chips, tags)
`--r-sm: 8` (inputs, small buttons)
`--r-md: 14` (cards, menus)
`--r-lg: 22` (hero cards, modal)
`--r-pill: 999` (capsules)

Everything is rounded. Hard 90° corners are reserved for rules and the page itself.

### Shadows

Shadows are **low, warm, short.** Never the generic grey blur.

- `--shadow-1`: `0 1px 0 rgba(30,26,23,.04), 0 2px 6px rgba(30,26,23,.06)` — rest
- `--shadow-2`: `0 2px 0 rgba(30,26,23,.05), 0 10px 24px -8px rgba(30,26,23,.14)` — hover / raised card
- `--shadow-3`: `0 3px 0 rgba(30,26,23,.06), 0 24px 48px -16px rgba(30,26,23,.22)` — modals
- `--shadow-inset`: `inset 0 1px 0 rgba(255,247,230,.9), inset 0 -1px 0 rgba(30,26,23,.06)` — printed/pressed inset

Cards use `--shadow-1` at rest, `--shadow-2` on hover, and `translateY(-1px)`.

### Borders

Hairlines only, `1px solid var(--rule)`. Never 2px. Dividers prefer space over strokes.

### Backgrounds

- Default: flat `--paper`. No gradient.
- **Paper texture** is available as `assets/paper-grain.svg` at 3–6% opacity, multiply-blended, to add a whisper of grain. Use it on large surfaces (hero, section intros), never on small cards.
- **Soft honey wash** (`radial-gradient(ellipse at top, var(--honey-wash), transparent 60%)`) is allowed **once** per long page, as an ambient glow behind the hero.
- Full-bleed photography is rare. When used, photos are warm, desaturated, with a slight film grain. Black & white is fine. Cool/bluish imagery is not.

### Imagery

- **Hand-drawn line illustrations** in ink on paper — a consistent motif. Loose, imperfect. One or two per long page, never a grid of them.
- **App marks**: each app has a small geometric glyph (not an emoji) — a sun for Dawn, a flame for Kiln, an eye for Mira, a sprout for Sprout, a confetti dot-cluster for Confetti. Simple, recognizable at 16px.

### Motion

Motion is **slow, soft, intentional.** Nothing bounces aggressively. Things breathe.

- **Easing:** `cubic-bezier(0.22, 0.61, 0.36, 1)` is the house curve (call it `--ease-soft`). For entry: `cubic-bezier(0.16, 1, 0.3, 1)` (`--ease-out-soft`).
- **Durations:** 120ms (micro — focus ring), 220ms (UI — hover, menu), 420ms (scene — page section), 900ms+ (ambient — breathing, drifting).
- **Signature animation:** a slow _breathing_ scale on idle hero elements (1.00 → 1.015 → 1.00 over 6s).
- **Stagger** on list entries: 40ms per item, max 6 items.
- **No parallax,** no scroll-hijacking, no physics-heavy springs. One tasteful magnet cursor on the homepage is allowed.
- **Reduced motion:** all ambient loops pause; entry animations collapse to 120ms fades.

### Hover & press

- **Hover (buttons):** fill deepens by ~6% luminance, `--shadow-2`, `translateY(-1px)`. 220ms.
- **Hover (cards):** same lift, plus a 1px inner highlight via `--shadow-inset`.
- **Hover (links):** underline thickens; no color change.
- **Press:** `translateY(0)`, scale `0.985`, shadow collapses to `--shadow-1`. 120ms.
- **Focus:** 2px offset ring in `--honey` at 40% opacity. Always visible for keyboard.

### Layout

- **Max content width** 1200px for marketing, 960px for reading surfaces, 640px for prose.
- **Grid:** 12-col with 24px gutters ≥ 1024px, 8-col at 768–1023, 4-col below.
- **Fixed elements are rare.** The site header is static until scroll-up reveals a slim sticky version. App chrome uses a fixed left rail on desktop and a bottom tab bar on mobile.
- **Alignment:** mostly left-aligned. Centered layouts are reserved for hero moments and empty states.

### Transparency & blur

- Blur is used **once per screen, max** — the slim sticky header uses `backdrop-filter: blur(12px) saturate(120%)` over `--paper` at 72% opacity. Modals use a `--paper` scrim at 72%, no blur.
- Translucent surfaces are always over a warm base, never over pure white.

### Cards

The canonical card:
- `--paper-2` fill
- `--r-md` radius (14px)
- `--shadow-1` at rest
- 24–32px padding
- No border on `--paper` background; a hairline `--rule` border only when on same-color surface
- Hover: `--shadow-2`, `translateY(-1px)`, 220ms soft

### Buttons

- **Primary:** `--honey` fill, `--paper` text, 44px tall, 16px horizontal padding, `--r-pill` when short, `--r-md` when wide.
- **Secondary:** `--paper-2` fill, `--ink` text, 1px `--rule` border.
- **Ghost:** transparent fill, `--ink` text, underline on hover.
- **Destructive:** `--danger` text on `--paper-2`, no fill. Fill only on confirm.

Minimum touch target: 44px.

### "Protection gradients" vs capsules

- For text over imagery, prefer a **capsule** (pill-shaped paper chip) over a gradient scrim. When a gradient is unavoidable, it fades to `--paper` at 88% opacity, never to black.

---

## ICONOGRAPHY

Cheervinsky uses **line icons drawn in ink on paper.** They feel hand-set but are precise.

- **Source:** [Lucide](https://lucide.dev) icons at **1.75px stroke, 24×24 viewBox, rounded caps and joins.** Lucide is linked from CDN and documented in every UI kit's README.
- **Why Lucide:** no bespoke icon set was provided. Lucide's proportions and friendliness match the brand better than Heroicons' mechanical feel or Tabler's thin stroke. _Substitution flagged — ask the studio if they'd like a custom set later._
- **Size ramp:** 16 / 20 / 24 / 32 / 48. Below 16 we switch to monochrome glyph marks (the app logos).
- **Color:** icons inherit `currentColor` and sit at `--ink-2` unless they're the focal action (then `--honey`).
- **Never filled, never duotone, never gradient.**

### Product marks

Each app has a **monogram glyph** in SVG, inked at 1.75px. These live in `assets/marks/`:

- `dawn.svg` — a rising semicircle over a horizon line.
- `kiln.svg` — a flame shape with two inner tongues.
- `mira.svg` — an eye-shaped lozenge with a centered dot.
- `sprout.svg` — two leaves on a stem.
- `confetti.svg` — a scatter of four dots.

The Cheervinsky master logo is a **lowercase wordmark** in Fraunces, with a small honey-colored dot over the `i` that acts as the studio's sigil. It's stored as `assets/cheervinsky-wordmark.svg`.

### Emoji & unicode

- Emoji: not used in UI. Allowed once in a blue moon in marketing microcopy (see Content Fundamentals).
- Unicode glyphs (→, ↗, ·, —, ×) are used freely in typography. They're preferred over SVG icons for inline punctuation.

---

