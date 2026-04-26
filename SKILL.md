---
name: cheervinsky-design
description: Use this skill to generate well-branded interfaces and assets for Cheervinsky, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map

- `README.md` — brand voice, content fundamentals, visual foundations, iconography.
- `colors_and_type.css` — the tokens file. Import in every HTML artifact.
- `fonts/` — Google Fonts (Fraunces, Inter, JetBrains Mono) are loaded via `@import` from `colors_and_type.css`; no local ttf files needed.
- `assets/` — `cheervinsky-wordmark.svg`, `cheervinsky-sigil.svg`, `marks/{dawn,kiln,mira,sprout,confetti}.svg`, `paper-grain.svg`, `illustrations/*.svg`.
- `preview/` — small cards that render in the Design System tab. Read these to see each token in use.
- `ui_kits/site/` — marketing homepage with 8 React/JSX components.
- `ui_kits/app/` — phone prototype covering Dawn / Kiln / Mira / Sprout / Confetti.

## Non-negotiables

- **One accent per screen.** The honey `#E9873B` is the single action color.
- **Warm paper canvas**, never pure white.
- **Fraunces** for display, **Inter** for body, **JetBrains Mono** for numbers.
- **Lucide** icons, 1.75px stroke, inherit currentColor.
- **No emoji as decoration.** No bluish-purple gradients. No colored-left-border cards.
- Copy is plain, specific, and kind. Never marketing-adverb-slop.
