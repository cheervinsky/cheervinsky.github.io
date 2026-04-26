// MiraScreen — two-minute journal + mood.
const MiraScreen = () => {
  const moods = [
    { k: 1, label: 'Heavy',   emoji: '○' },
    { k: 2, label: 'Low',     emoji: '◔' },
    { k: 3, label: 'Level',   emoji: '◑' },
    { k: 4, label: 'Warm',    emoji: '◕' },
    { k: 5, label: 'Bright',  emoji: '●' },
  ];
  const [mood, setMood] = React.useState(3);
  const [note, setNote] = React.useState('Slow morning. Finished the draft. Walked at 4.');

  return (
    <div style={{ padding: '20px 24px 40px', minHeight: '100%' }}>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: 30, lineHeight: 1.1,
        fontWeight: 400, margin: '8px 0 4px',
        fontVariationSettings: '"opsz" 48, "SOFT" 40', letterSpacing: '-0.015em',
      }}>How was today?</h2>
      <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '0 0 24px', lineHeight: 1.5 }}>
        Two minutes. No wrong answer.
      </p>

      <div style={{
        display: 'flex', justifyContent: 'space-between',
        background: 'var(--paper-2)', padding: 12, borderRadius: 16, marginBottom: 24,
      }}>
        {moods.map(mo => (
          <button key={mo.k} onClick={() => setMood(mo.k)} style={{
            flex: 1, background: mood === mo.k ? '#6E7F5C' : 'transparent',
            color: mood === mo.k ? 'var(--paper)' : 'var(--ink-2)',
            border: 'none', padding: '10px 4px', borderRadius: 12,
            cursor: 'pointer', display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 4,
            transition: 'all 220ms var(--ease-soft)',
          }}>
            <span style={{ fontSize: 22, lineHeight: 1 }}>{mo.emoji}</span>
            <span style={{ fontSize: 11, fontWeight: 500 }}>{mo.label}</span>
          </button>
        ))}
      </div>

      <label style={{
        fontSize: 12, fontWeight: 600, letterSpacing: '.08em',
        textTransform: 'uppercase', color: 'var(--ink-3)',
      }}>A few words</label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={5}
        style={{
          width: '100%', marginTop: 8,
          padding: '14px 16px', background: 'var(--paper-2)',
          border: '1px solid var(--rule)', borderRadius: 14,
          fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.55,
          color: 'var(--ink)', outline: 'none', resize: 'none',
          boxSizing: 'border-box',
        }}
      />

      {/* Pattern snippet */}
      <div style={{
        marginTop: 22, padding: 16, background: 'var(--paper-2)',
        borderRadius: 14, border: '1px solid var(--rule)',
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: '#4E6B7F', marginBottom: 8 }}>
          Noticed this week
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink)' }}>
          Wednesdays have been warmer than Mondays, four weeks running.
        </div>
      </div>

      <button style={{
        marginTop: 20, width: '100%', background: 'var(--honey)', color: 'var(--paper)',
        border: 'none', padding: '14px', borderRadius: 999,
        fontSize: 15, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)',
      }}>Save entry</button>
    </div>
  );
};

window.MiraScreen = MiraScreen;
