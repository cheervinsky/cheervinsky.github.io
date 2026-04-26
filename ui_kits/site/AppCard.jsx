// AppCard — single product in the ecosystem.
const AppCard = ({ app, onOpen }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen && onOpen(app)}
      style={{
        background: 'var(--paper-2)',
        borderRadius: 22,
        padding: 28,
        cursor: 'pointer',
        transition: 'transform 220ms var(--ease-soft), box-shadow 220ms var(--ease-soft)',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hover ? 'var(--shadow-2)' : 'var(--shadow-1)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 260,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}
    >
      {/* Soft tint wash that shows only on hover */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 80% -20%, ${app.tint}55, transparent 60%)`,
        opacity: hover ? 1 : 0,
        transition: 'opacity 420ms var(--ease-soft)',
        pointerEvents: 'none',
      }}/>
      <div style={{ position: 'relative' }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14,
          background: app.tint, color: app.onTint,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20,
        }}>
          <img src={`../../assets/marks/${app.id}.svg`} width="28" height="28"
               style={{ filter: app.onTint === 'var(--paper)' ? 'invert(95%) sepia(10%) saturate(200%)' : 'none' }}/>
        </div>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 32,
          fontVariationSettings: '"opsz" 48, "SOFT" 40', fontWeight: 400,
          lineHeight: 1.05, marginBottom: 6,
        }}>{app.name}</div>
        <div style={{ fontSize: 13, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600, marginBottom: 16 }}>
          {app.domain}
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--ink-2)', margin: 0 }}>{app.blurb}</p>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        marginTop: 24, fontSize: 14, color: 'var(--ink)', fontWeight: 500,
        position: 'relative',
      }}>
        Open {app.name}
        <span style={{
          transition: 'transform 220ms var(--ease-soft)',
          transform: hover ? 'translateX(4px)' : 'translateX(0)',
        }}>→</span>
      </div>
    </div>
  );
};

window.AppCard = AppCard;
