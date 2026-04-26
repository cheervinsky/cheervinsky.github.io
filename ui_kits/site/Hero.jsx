// Hero — wordmark, tagline, signature breathing sigil, primary CTA.
const Hero = () => (
  <section id="top" style={{
    position: 'relative',
    padding: '80px 32px 120px',
    background: 'radial-gradient(ellipse at 60% -10%, var(--honey-wash), transparent 55%), var(--paper)',
    overflow: 'hidden',
  }}>
    <div style={{ maxWidth: 'var(--max-marketing)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center' }}>
      <div>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--ink-3)',
          marginBottom: 24,
        }}>
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 999, background: 'var(--honey)', marginRight: 10, verticalAlign: 'middle' }}/>
          A small studio · est. since
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(56px, 7vw, 104px)',
          lineHeight: 1.02, letterSpacing: '-0.03em', fontWeight: 400,
          margin: '0 0 24px', fontVariationSettings: '"opsz" 144, "SOFT" 60', textWrap: 'balance',
        }}>
          Tools for a<br/>
          <em style={{ fontStyle: 'italic', fontVariationSettings: '"opsz" 144, "SOFT" 100' }}>calmer&nbsp;</em>
          day.
        </h1>
        <p style={{ fontSize: 22, lineHeight: 1.45, color: 'var(--ink-2)', maxWidth: 520, margin: '0 0 36px' }}>
          Five small apps from Cheervinsky — to relax, focus, notice, grow,
          and make the ordinary a little more playful.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="#apps" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--honey)', color: 'var(--paper)',
            padding: '14px 26px', borderRadius: 999,
            textDecoration: 'none', fontWeight: 500, fontSize: 16,
            boxShadow: 'var(--shadow-1)',
          }}>
            See the five apps <span aria-hidden>→</span>
          </a>
          <a href="#believe" style={{
            color: 'var(--ink)', textDecoration: 'underline',
            textUnderlineOffset: 4, fontSize: 16,
          }}>What we believe</a>
        </div>
      </div>

      {/* Sigil — breathing */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="breathe" style={{
          width: 280, height: 280, borderRadius: 999,
          background: 'radial-gradient(circle at 38% 35%, #FFE6C2, #E9873B 70%, #C0532A 110%)',
          boxShadow: '0 40px 80px -30px rgba(192,83,42,.45), inset 0 2px 0 rgba(255,247,230,.5)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 24, borderRadius: 999,
            border: '1px dashed rgba(255,247,230,.4)',
          }}/>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            fontFamily: 'var(--font-display)', color: 'var(--paper)', fontSize: 88,
            lineHeight: 1, fontVariationSettings: '"opsz" 144, "SOFT" 80',
          }}>c</div>
        </div>
      </div>
    </div>
  </section>
);

window.Hero = Hero;
