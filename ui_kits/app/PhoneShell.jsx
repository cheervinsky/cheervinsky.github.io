// PhoneShell — iPhone-ish frame that wraps every screen.
const PhoneShell = ({ children, tint, onBack, title }) => (
  <div style={{
    width: 390, height: 780,
    background: '#1E1A17',
    borderRadius: 52,
    padding: 10,
    boxShadow: 'var(--shadow-3)',
    margin: '0 auto',
  }}>
    <div style={{
      width: '100%', height: '100%',
      background: 'var(--paper)',
      borderRadius: 44,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Status bar */}
      <div style={{
        height: 44,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px 0 24px', fontSize: 14, fontWeight: 600,
        color: 'var(--ink)', fontFamily: 'var(--font-body)',
        flexShrink: 0,
      }}>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>9:41</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
          <span>●●●●</span>
          <span>􀙇</span>
          <span>100%</span>
        </div>
      </div>

      {/* Dynamic island placeholder */}
      <div style={{
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
        width: 110, height: 34, background: '#1E1A17', borderRadius: 999,
      }}/>

      {/* Optional nav bar */}
      {onBack && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '6px 20px 10px', flexShrink: 0,
        }}>
          <button onClick={onBack} style={{
            background: 'var(--paper-2)', border: '1px solid var(--rule)',
            width: 36, height: 36, borderRadius: 999, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }} aria-label="Back">
            <span style={{ fontSize: 18, color: 'var(--ink)' }}>←</span>
          </button>
          <div style={{
            fontSize: 13, color: 'var(--ink-3)', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '.08em',
          }}>{title}</div>
          <div style={{ width: 36 }}/>
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        {children}
      </div>

      {/* Home indicator */}
      <div style={{
        position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
        width: 140, height: 5, background: 'var(--ink)', borderRadius: 999, opacity: 0.6,
      }}/>
    </div>
  </div>
);

window.PhoneShell = PhoneShell;
