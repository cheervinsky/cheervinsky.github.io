// AppsGrid — the five apps in one ecosystem.
const APPS = [
  { id: 'dawn',     name: 'Dawn',     domain: 'Wellness',            tint: '#F2B8A2', onTint: 'var(--ink)',   blurb: 'A gentle morning companion. Three breaths, one intention, natural light.' },
  { id: 'kiln',     name: 'Kiln',     domain: 'Focus',               tint: '#C0532A', onTint: 'var(--paper)', blurb: 'A slow-burning timer for deep work. No ticking, no streaks, just 50 minutes.' },
  { id: 'mira',     name: 'Mira',     domain: 'Self-understanding',  tint: '#6E7F5C', onTint: 'var(--paper)', blurb: 'Two minutes at night. How was today? Patterns surface on their own.' },
  { id: 'sprout',   name: 'Sprout',   domain: 'Habits',              tint: '#7FA27E', onTint: 'var(--paper)', blurb: 'Tiny daily habits that grow. Skip a day — it still loves you.' },
  { id: 'confetti', name: 'Confetti', domain: 'Playful utility',     tint: '#E8C547', onTint: 'var(--ink)',   blurb: 'A grab-bag of small delights. Tip jar, coin flip, dice, decision spinner.' },
];

const AppsGrid = ({ onOpen }) => (
  <section id="apps" style={{ padding: '96px 32px', background: 'var(--paper)' }}>
    <div style={{ maxWidth: 'var(--max-marketing)', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 64, lineHeight: 1.02,
          letterSpacing: '-0.02em', fontWeight: 400, margin: 0,
          fontVariationSettings: '"opsz" 96, "SOFT" 40', textWrap: 'balance',
        }}>
          Five apps. One small studio.
        </h2>
        <div style={{ fontSize: 14, color: 'var(--ink-3)', maxWidth: 280 }}>
          Made by the same hands, in the same house. Use one, or all of them.
        </div>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
        gap: 20,
      }}>
        {APPS.map(app => <AppCard key={app.id} app={app} onOpen={onOpen}/>)}
      </div>
    </div>
  </section>
);

window.AppsGrid = AppsGrid;
window.APPS = APPS;
