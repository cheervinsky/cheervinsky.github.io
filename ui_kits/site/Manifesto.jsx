// Manifesto — wide "What we believe" block with hand-drawn accent.
const Manifesto = () => (
  <section id="believe" style={{ padding: '120px 32px', background: 'var(--paper-2)' }}>
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <div style={{
        fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase',
        color: 'var(--ink-3)', marginBottom: 24,
      }}>
        What we believe
      </div>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)',
        lineHeight: 1.2, letterSpacing: '-0.015em', color: 'var(--ink)',
        fontVariationSettings: '"opsz" 72, "SOFT" 40', textWrap: 'pretty',
      }}>
        Software can be <em style={{ fontStyle: 'italic' }}>kind.</em> It doesn't
        have to buzz, pulse, or ask for your attention. It can be a small room
        you visit for a few minutes, and then leave better than you found it.
        <span style={{ display: 'block', marginTop: 24, color: 'var(--ink-2)' }}>
          Cheervinsky is five of those rooms.
        </span>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 40, marginTop: 72,
      }}>
        {[
          { t: 'No streaks to break.',        d: 'Miss a day. Come back when you want. We still like you.' },
          { t: 'No notifications by default.', d: 'You decide when to open an app. The app does not decide for you.' },
          { t: 'One accent at a time.',        d: 'A quiet interface puts one thing forward. The rest waits.' },
          { t: 'Made by a small team.',        d: 'You can write to us. A human writes back, usually within a week.' },
        ].map((p, i) => (
          <div key={i}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.2,
              fontWeight: 500, marginBottom: 8,
              fontVariationSettings: '"opsz" 36, "SOFT" 30',
            }}>{p.t}</div>
            <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>{p.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

window.Manifesto = Manifesto;
