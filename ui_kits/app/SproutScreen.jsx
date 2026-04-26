// SproutScreen — tiny daily habits.
const SproutScreen = () => {
  const [habits, setHabits] = React.useState([
    { id: 1, name: 'Make the bed',       done: true,  streak: 42 },
    { id: 2, name: 'Drink a glass of water on waking', done: true, streak: 18 },
    { id: 3, name: 'Walk ten minutes after lunch', done: false, streak: 7 },
    { id: 4, name: 'Write one sentence',  done: false, streak: 23 },
    { id: 5, name: 'Read before sleeping', done: false, streak: 3 },
  ]);
  const toggle = (id) => setHabits(hs => hs.map(h => h.id === id ? { ...h, done: !h.done } : h));
  const done = habits.filter(h => h.done).length;

  return (
    <div style={{ padding: '20px 24px 40px', minHeight: '100%' }}>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: 30, lineHeight: 1.1,
        fontWeight: 400, margin: '8px 0 4px',
        fontVariationSettings: '"opsz" 48, "SOFT" 40', letterSpacing: '-0.015em',
      }}>Today's tiny things.</h2>
      <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '0 0 20px' }}>
        {done} of {habits.length} · a good start
      </p>

      {/* Growth bar */}
      <div style={{ height: 6, background: 'var(--paper-3)', borderRadius: 999, marginBottom: 24, overflow: 'hidden' }}>
        <div style={{
          width: `${(done / habits.length) * 100}%`, height: '100%',
          background: '#7FA27E', borderRadius: 999, transition: 'width 420ms var(--ease-soft)',
        }}/>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {habits.map(h => (
          <button key={h.id} onClick={() => toggle(h.id)} style={{
            display: 'flex', alignItems: 'center', gap: 14, width: '100%',
            padding: '14px 16px', background: 'var(--paper-2)', border: '1px solid var(--rule)',
            borderRadius: 14, cursor: 'pointer', textAlign: 'left',
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 7,
              background: h.done ? '#7FA27E' : 'transparent',
              border: h.done ? '2px solid #7FA27E' : '2px solid var(--rule)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--paper)', fontSize: 13, fontWeight: 700, flexShrink: 0,
            }}>{h.done ? '✓' : ''}</div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 15, fontWeight: 500, color: 'var(--ink)',
                textDecoration: h.done ? 'line-through' : 'none',
                textDecorationColor: 'var(--ink-3)',
              }}>{h.name}</div>
            </div>
            <div style={{
              fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--ink-3)',
              background: 'var(--paper-3)', padding: '3px 8px', borderRadius: 999,
            }}>{h.streak}d</div>
          </button>
        ))}
      </div>

      <div style={{
        marginTop: 24, padding: 16, background: 'var(--paper-2)',
        borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <img src="../../assets/illustrations/sprout-in-cup.svg" style={{ width: 56, flexShrink: 0 }}/>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink-2)' }}>
          <b style={{ color: 'var(--ink)' }}>Missed yesterday?</b> That's fine. Today counts on its own.
        </div>
      </div>
    </div>
  );
};

window.SproutScreen = SproutScreen;
