// DeepDive — alternating image+text rows showcasing one app in depth.
const DeepDive = () => (
  <section style={{ padding: '120px 32px', background: 'var(--paper)' }}>
    <div style={{ maxWidth: 'var(--max-marketing)', margin: '0 auto' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center',
        marginBottom: 96,
      }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--paper-2)', padding: '6px 12px', borderRadius: 999,
            border: '1px solid var(--rule)', marginBottom: 20,
            fontSize: 12, fontWeight: 500, letterSpacing: '.04em',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#C0532A' }}/>
            Now in Kiln v2
          </div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: 48, lineHeight: 1.05,
            letterSpacing: '-0.02em', fontWeight: 400, margin: '0 0 20px',
            fontVariationSettings: '"opsz" 72, "SOFT" 40', textWrap: 'balance',
          }}>
            A timer that burns down, slowly.
          </h3>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--ink-2)', margin: '0 0 24px' }}>
            Kiln borrows from clay kilns, not from corporate sprints. Pick a
            session. Watch the ember fade. When it's out, you're done — no pings,
            no chime, no sticker.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['50-min default, 15- and 90-min alternates', 'No statistics page. It exists. We deleted it on purpose.', 'Offline. Your sessions never leave the device.'].map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, fontSize: 15, color: 'var(--ink)', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--honey)', fontWeight: 700 }}>·</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Mock device */}
        <div style={{
          background: '#1E1A17', borderRadius: 28, padding: 8, alignSelf: 'center',
          boxShadow: 'var(--shadow-3)',
        }}>
          <div style={{
            background: '#2A231E', borderRadius: 22, padding: '48px 32px',
            minHeight: 360, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 24,
          }}>
            <div style={{ fontSize: 11, color: '#8A7F72', letterSpacing: '.14em', textTransform: 'uppercase' }}>Kiln · deep work</div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 84, fontWeight: 500,
              color: '#F3EADB', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
            }}>
              24:32
            </div>
            <div className="breathe" style={{
              width: 120, height: 6, borderRadius: 999,
              background: 'linear-gradient(90deg, #C0532A, #E9873B 70%, #2A231E 70.1%)',
            }}/>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button style={{ background: 'rgba(243,234,219,.08)', color: '#F3EADB', border: 'none', padding: '10px 18px', borderRadius: 999, fontSize: 13 }}>Pause</button>
              <button style={{ background: '#E9873B', color: '#1E1A17', border: 'none', padding: '10px 18px', borderRadius: 999, fontSize: 13, fontWeight: 500 }}>End session</button>
            </div>
          </div>
        </div>
      </div>

      {/* The long row with illustration */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center',
      }}>
        <div style={{
          background: 'var(--paper-2)', borderRadius: 22, padding: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img src="../../assets/illustrations/reading-by-window.svg" style={{ width: '100%', maxWidth: 360 }}/>
        </div>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: 40, lineHeight: 1.1,
            letterSpacing: '-0.02em', fontWeight: 400, margin: '0 0 16px',
            fontVariationSettings: '"opsz" 60, "SOFT" 40', textWrap: 'balance',
          }}>
            You already know. Here's somewhere to put it.
          </h3>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>
            Mira is a two-minute journal that watches its own patterns. Over
            weeks, it notices what you may already suspect — the days that
            lift, the weeks that weigh. It tells you gently.
          </p>
        </div>
      </div>
    </div>
  </section>
);

window.DeepDive = DeepDive;
