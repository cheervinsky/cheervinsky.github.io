// KilnScreen — slow-burning focus timer.
const KilnScreen = () => {
  const [running, setRunning] = React.useState(true);
  const [seconds, setSeconds] = React.useState(24 * 60 + 32);
  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);

  const pct = seconds / (50 * 60);
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');

  return (
    <div style={{
      padding: 24, minHeight: '100%', background: '#201A16', color: '#F3EADB',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8A7F72', marginBottom: 6 }}>
        Kiln · deep work
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 400, marginBottom: 48, fontVariationSettings: '"opsz" 40, "SOFT" 40' }}>
        Finish the second draft.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, flex: 1, justifyContent: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 96, fontWeight: 500,
          letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', lineHeight: 1,
        }}>
          {m}:{s}
        </div>

        {/* Ember bar */}
        <div style={{ width: '100%', maxWidth: 260, height: 8, background: 'rgba(243,234,219,.08)', borderRadius: 999, overflow: 'hidden' }}>
          <div className="breathe" style={{
            width: `${pct * 100}%`, height: '100%',
            background: 'linear-gradient(90deg, #C0532A, #E9873B, #FADFB9)',
            borderRadius: 999,
          }}/>
        </div>
        <div style={{ fontSize: 12, color: '#8A7F72', fontVariantNumeric: 'tabular-nums' }}>
          50m session · {Math.round(pct * 100)}% remaining
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <button onClick={() => setRunning(r => !r)} style={{
          flex: 1, background: 'rgba(243,234,219,.08)', color: '#F3EADB',
          border: '1px solid rgba(243,234,219,.12)', padding: '14px',
          borderRadius: 999, fontSize: 15, fontWeight: 500, cursor: 'pointer',
          fontFamily: 'var(--font-body)',
        }}>{running ? 'Pause' : 'Resume'}</button>
        <button style={{
          flex: 1, background: '#E9873B', color: '#1E1A17', border: 'none',
          padding: '14px', borderRadius: 999, fontSize: 15, fontWeight: 500, cursor: 'pointer',
          fontFamily: 'var(--font-body)',
        }}>End session</button>
      </div>
    </div>
  );
};

window.KilnScreen = KilnScreen;
