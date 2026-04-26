// AppSwitcher — home launcher grid of the five apps.
const SWITCHER_APPS = [
  { id: 'dawn',     name: 'Dawn',     tint: '#F2B8A2', onTint: '#1E1A17',  blurb: 'Morning companion' },
  { id: 'kiln',     name: 'Kiln',     tint: '#C0532A', onTint: '#F3EADB',  blurb: 'Slow focus timer' },
  { id: 'mira',     name: 'Mira',     tint: '#6E7F5C', onTint: '#F3EADB',  blurb: 'Two-minute journal' },
  { id: 'sprout',   name: 'Sprout',   tint: '#7FA27E', onTint: '#F3EADB',  blurb: 'Tiny habits' },
  { id: 'confetti', name: 'Confetti', tint: '#E8C547', onTint: '#1E1A17',  blurb: 'Small delights' },
];

const AppSwitcher = ({ onOpen }) => (
  <div style={{ padding: '24px 24px 48px' }}>
    <div style={{
      fontSize: 13, fontWeight: 600, letterSpacing: '.08em',
      textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 8,
    }}>Tuesday, April 24</div>
    <h1 style={{
      fontFamily: 'var(--font-display)', fontSize: 40, lineHeight: 1.05,
      fontWeight: 400, letterSpacing: '-0.02em', margin: '0 0 4px',
      fontVariationSettings: '"opsz" 60, "SOFT" 40',
    }}>Good morning.</h1>
    <p style={{ color: 'var(--ink-2)', fontSize: 15, lineHeight: 1.5, margin: '0 0 28px' }}>
      Five small rooms. Open one.
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      {SWITCHER_APPS.map(app => (
        <button key={app.id} onClick={() => onOpen(app.id)} style={{
          background: 'var(--paper-2)', border: 'none', borderRadius: 18,
          padding: 18, cursor: 'pointer', textAlign: 'left',
          display: 'flex', flexDirection: 'column', gap: 14, minHeight: 128,
          boxShadow: 'var(--shadow-1)',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: app.tint, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img src={`../../assets/marks/${app.id}.svg`} width={24} height={24}
                 style={{ filter: app.onTint === '#F3EADB' ? 'invert(95%) sepia(10%) saturate(200%)' : 'none' }}/>
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.1,
              fontWeight: 500, fontVariationSettings: '"opsz" 36, "SOFT" 30',
            }}>{app.name}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{app.blurb}</div>
          </div>
        </button>
      ))}
    </div>

    <div style={{
      marginTop: 24, padding: 18, background: 'var(--paper-2)',
      border: '1px dashed var(--rule)', borderRadius: 18,
      fontSize: 13, lineHeight: 1.5, color: 'var(--ink-2)',
    }}>
      <span style={{ color: 'var(--honey-ink)', fontWeight: 600 }}>Today's suggestion · </span>
      Three breaths in Dawn, then 50 minutes in Kiln.
    </div>
  </div>
);

window.AppSwitcher = AppSwitcher;
