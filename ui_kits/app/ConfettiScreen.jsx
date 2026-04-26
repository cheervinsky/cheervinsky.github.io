// ConfettiScreen — grab-bag of small utilities.
const ConfettiScreen = () => {
  const [tab, setTab] = React.useState('coin');
  const [coin, setCoin] = React.useState('heads');
  const [dice, setDice] = React.useState(4);
  const [tipBill, setTipBill] = React.useState(48.50);
  const [tipPct, setTipPct] = React.useState(18);
  const tabs = [
    { id: 'coin',  label: 'Coin'  },
    { id: 'dice',  label: 'Dice'  },
    { id: 'tip',   label: 'Tip'   },
    { id: 'spin',  label: 'Spin'  },
  ];

  return (
    <div style={{ padding: '20px 24px 40px', minHeight: '100%' }}>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: 30, lineHeight: 1.1,
        fontWeight: 400, margin: '8px 0 4px',
        fontVariationSettings: '"opsz" 48, "SOFT" 40', letterSpacing: '-0.015em',
      }}>A small delight.</h2>
      <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '0 0 20px' }}>
        Pick one.
      </p>

      <div style={{
        display: 'flex', gap: 4, padding: 4, background: 'var(--paper-2)',
        border: '1px solid var(--rule)', borderRadius: 999, marginBottom: 24,
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, background: tab === t.id ? 'var(--paper)' : 'transparent',
            color: 'var(--ink)', border: 'none', padding: '8px 0', borderRadius: 999,
            fontSize: 13, fontWeight: tab === t.id ? 600 : 500,
            cursor: 'pointer', fontFamily: 'var(--font-body)',
            boxShadow: tab === t.id ? 'var(--shadow-1)' : 'none',
            transition: 'all 220ms var(--ease-soft)',
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{
        background: 'var(--paper-2)', borderRadius: 22, padding: 28,
        minHeight: 280, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 20,
      }}>
        {tab === 'coin' && (
          <>
            <div style={{
              width: 160, height: 160, borderRadius: 999,
              background: 'radial-gradient(circle at 35% 30%, #F6D773, #E8C547 60%, #A88A1C)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: 36, color: '#5A4608',
              fontWeight: 500, fontVariationSettings: '"opsz" 60, "SOFT" 40',
              boxShadow: '0 12px 24px -10px rgba(168,138,28,.4)',
            }}>{coin === 'heads' ? 'H' : 'T'}</div>
            <button onClick={() => setCoin(Math.random() < 0.5 ? 'heads' : 'tails')} style={{
              background: 'var(--honey)', color: 'var(--paper)', border: 'none',
              padding: '12px 28px', borderRadius: 999, fontWeight: 500,
              fontSize: 15, cursor: 'pointer',
            }}>Flip it</button>
          </>
        )}
        {tab === 'dice' && (
          <>
            <div style={{
              width: 140, height: 140, borderRadius: 22,
              background: 'var(--paper)', border: '1px solid var(--rule)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', fontSize: 72, fontWeight: 500,
              color: 'var(--ink)', boxShadow: 'var(--shadow-1)',
            }}>{dice}</div>
            <button onClick={() => setDice(1 + Math.floor(Math.random() * 6))} style={{
              background: 'var(--honey)', color: 'var(--paper)', border: 'none',
              padding: '12px 28px', borderRadius: 999, fontWeight: 500,
              fontSize: 15, cursor: 'pointer',
            }}>Roll</button>
          </>
        )}
        {tab === 'tip' && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em' }}>Bill</label>
              <input type="number" value={tipBill} onChange={e => setTipBill(+e.target.value)}
                     style={{ width: '100%', marginTop: 6, padding: '12px 14px', background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 10, fontSize: 16, fontFamily: 'var(--font-mono)', outline: 'none', boxSizing: 'border-box' }}/>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: 'var(--ink-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', fontSize: 12 }}>Tip</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink)' }}>{tipPct}%</span>
              </div>
              <input type="range" min="10" max="25" value={tipPct} onChange={e => setTipPct(+e.target.value)} style={{ width: '100%', accentColor: '#E9873B' }}/>
            </div>
            <div style={{
              background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 14,
              padding: 14, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)',
            }}>
              <span style={{ color: 'var(--ink-3)' }}>Total</span>
              <span style={{ fontSize: 20, color: 'var(--ink)', fontWeight: 500 }}>${(tipBill * (1 + tipPct / 100)).toFixed(2)}</span>
            </div>
          </div>
        )}
        {tab === 'spin' && (
          <div style={{ textAlign: 'center', color: 'var(--ink-2)', fontSize: 14, padding: '40px 20px' }}>
            Decision spinner — add 2–6 options, tap to spin.<br/>
            <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>(mock placeholder)</span>
          </div>
        )}
      </div>
    </div>
  );
};

window.ConfettiScreen = ConfettiScreen;
