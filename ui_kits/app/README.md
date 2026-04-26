# Cheervinsky — App UI Kit

A unified mobile-style prototype that switches between the five apps in the Cheervinsky ecosystem. All apps live inside the same "phone" shell so you can feel the shared visual system.

## Structure

- `index.html` — the launcher. Shows a home grid, lets you open any app.
- `PhoneShell.jsx` — device bezel, status bar, home indicator; wraps every screen.
- `AppSwitcher.jsx` — home grid of five apps.
- `DawnScreen.jsx` — morning breath + intention.
- `KilnScreen.jsx` — slow-burning focus timer.
- `MiraScreen.jsx` — two-minute journal + mood check.
- `SproutScreen.jsx` — tiny habits list.
- `ConfettiScreen.jsx` — grab-bag of small utilities.

## How to run

Open `index.html`. Tap any app card to enter; tap the back arrow in the status bar to return.

## Notes

- Icons via Lucide CDN (1.75px stroke).
- Tokens come from `../../colors_and_type.css`.
- Each app picks up its product tint only in its own chrome — the rest of the screen stays on paper.
