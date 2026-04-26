# Cheervinsky — Marketing Site UI Kit

A high-fidelity recreation of the Cheervinsky studio website — the homepage that introduces all five apps as one ecosystem.

## Structure

- `index.html` — stitched homepage: header → hero → apps grid → manifesto → app deep-dive → newsletter → footer.
- `SiteHeader.jsx` — slim top nav that tightens on scroll.
- `Hero.jsx` — wordmark + tagline + signature breathing sigil + primary CTA.
- `AppsGrid.jsx` — five product cards in one ecosystem. Hover lifts, app-tint accent on hover only.
- `AppCard.jsx` — single product card (used by grid).
- `Manifesto.jsx` — wide "What we believe" text block.
- `DeepDive.jsx` — alternating image/text rows showcasing one app in depth.
- `Newsletter.jsx` — low-key email capture ("A letter, once a month.").
- `SiteFooter.jsx` — colophon, sitemap, small print.

## How to run

Open `index.html`. It's a Babel-standalone React prototype — every component is a `<script type="text/babel">` file sharing globals via `window`.

## Notes

- Icons via Lucide CDN (1.75px stroke) — substitution flagged until studio ships a custom set.
- All type + color tokens come from `../../colors_and_type.css`.
- Interactions are live: scrolling tightens the header; hovering an app card lifts it and surfaces the app tint; clicking the hero CTA scrolls to the grid.
