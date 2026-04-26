// SiteFooter — colophon and small print.
const SiteFooter = () => (
  <footer style={{
    padding: '64px 32px 40px', background: 'var(--paper-2)',
    borderTop: '1px solid var(--rule)',
  }}>
    <div style={{ maxWidth: 'var(--max-marketing)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 32 }}>
      <div>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 26, fontWeight: 400, letterSpacing: '-0.03em',
            color: 'var(--ink)', fontVariationSettings: '"opsz" 96, "SOFT" 60',
            lineHeight: 1,
          }}>cheervinsky</span>
          <span aria-hidden style={{
            position: 'absolute', top: -4, left: '56%',
            width: 6, height: 6, background: 'var(--honey)', borderRadius: 999,
          }}/>
        </div>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.5, maxWidth: 320, margin: 0 }}>
          A small studio making small apps. Warm and made in the open.
        </p>
      </div>
      {[
        { t: 'Apps', links: ['Dawn', 'Kiln', 'Mira', 'Sprout', 'Confetti'] },
        { t: 'Studio', links: ['What we believe', 'Letter', 'Press', 'Contact'] },
        { t: 'Small print', links: ['Privacy', 'Terms', 'Colophon', 'Accessibility'] },
      ].map(col => (
        <div key={col.t}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: 12 }}>{col.t}</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {col.links.map(l => (
              <li key={l}><a href="#" style={{ color: 'var(--ink)', textDecoration: 'none', fontSize: 14 }}>{l}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div style={{ maxWidth: 'var(--max-marketing)', margin: '48px auto 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--ink-3)' }}>
      <div>© Cheervinsky · made by humans</div>
      <div>Set in Fraunces & Inter</div>
    </div>
  </footer>
);

window.SiteFooter = SiteFooter;
