// DawnScreen — morning breath + intention.
const DawnScreen = () => {
  const [intention, setIntention] = React.useState('Move slowly. Notice the light.');
  const [breathing, setBreathing] = React.useState(false);

  return (
    <div style={{
      padding: '20px 24px 40px', minHeight: '100%',
      background: 'radial-gradient(ellipse at 50% -10%, #F2B8A2AA, transparent 60%), var(--paper)',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: 30, lineHeight: 1.1,
        fontWeight: 400, letterSpacing: '-0.015em', margin: '8px 0 4px',
        fontVariationSettings: '"opsz" 48, "SOFT" 40',
      }}>Three breaths.</h2>
      <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '0 0 28px', lineHeight: 1.5 }}>
        Then a single intention for the day.
      </p>

      <div style={{
        background: 'var(--paper-2)', borderRadius: 22, padding: '32px 20px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
      }}>
        <div
          onClick={() => setBreathing(b => !b)}
          className={breathing ? 'breathe' : ''}
          style={{
            width: 180, height: 180, borderRadius: 999,
            background: 'radial-gradient(circle at 38% 35%, #FFE6C2, #F2B8A2 60%, #C0532A 120%)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 20px 40px -20px rgba(192,83,42,.55)',
          }}
        >
          <div style={{ color: '#4B2A1E', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 500 }}>
            {breathing ? 'inhale…' : 'tap to start'}
          </div>
        </div>
        <div style={{ fontSize: 13, color: 'var(--ink-3)', fontVariantNumeric: 'tabular-nums' }}>
          Breath 1 of 3 · 4-7-8
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <label style={{
          fontSize: 12, fontWeight: 600, letterSpacing: '.08em',
          textTransform: 'uppercase', color: 'var(--ink-3)',
        }}>Today's intention</label>
        <input
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          style={{
            width: '100%', marginTop: 8,
            padding: '14px 16px', background: 'var(--paper-2)',
            border: '1px solid var(--rule)', borderRadius: 14,
            fontFamily: 'var(--font-display)', fontSize: 19,
            color: 'var(--ink)', fontVariationSettings: '"opsz" 28, "SOFT" 30',
            outline: 'none', boxSizing: 'border-box',
          }}
        />
      </div>

      <button style={{
        marginTop: 20, width: '100%', background: 'var(--honey)', color: 'var(--paper)',
        border: 'none', padding: '14px', borderRadius: 999,
        fontSize: 15, fontWeight: 500, fontFamily: 'var(--font-body)', cursor: 'pointer',
      }}>Save and begin the day</button>
    </div>
  );
};

window.DawnScreen = DawnScreen;
