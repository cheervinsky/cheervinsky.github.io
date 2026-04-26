// Newsletter — a letter, once a month.
const Newsletter = () => {
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  return (
    <section id="letter" style={{ padding: '96px 32px', background: 'var(--paper)' }}>
      <div style={{
        maxWidth: 720, margin: '0 auto', textAlign: 'center',
      }}>
        <img src="../../assets/illustrations/sprout-in-cup.svg" style={{ width: 140, opacity: .9, marginBottom: 12 }}/>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 48, lineHeight: 1.05,
          letterSpacing: '-0.02em', fontWeight: 400, margin: '0 0 12px',
          fontVariationSettings: '"opsz" 72, "SOFT" 40',
        }}>
          A letter, once a month.
        </h3>
        <p style={{ fontSize: 18, color: 'var(--ink-2)', lineHeight: 1.5, margin: '0 0 32px' }}>
          What we're making, what we're reading, and what's new in the apps.
          No tracking, no pixels. Unsubscribe in one click.
        </p>

        {sent ? (
          <div style={{
            background: 'rgba(94,140,76,.16)', color: '#3E5D33',
            padding: '14px 22px', borderRadius: 999, display: 'inline-block',
            fontSize: 15, fontWeight: 500,
          }}>
            ✓ Saved. See you next month.
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                style={{
                  display: 'flex', gap: 8, padding: 6, background: 'var(--paper-2)',
                  border: '1px solid var(--rule)', borderRadius: 999,
                  maxWidth: 460, margin: '0 auto',
                }}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@somewhere.co"
              required
              style={{
                flex: 1, background: 'transparent', border: 'none',
                padding: '10px 14px', fontSize: 15, fontFamily: 'var(--font-body)',
                color: 'var(--ink)', outline: 'none',
              }}
            />
            <button type="submit" style={{
              background: 'var(--honey)', color: 'var(--paper)', border: 'none',
              padding: '10px 20px', borderRadius: 999, fontWeight: 500,
              fontFamily: 'var(--font-body)', fontSize: 14, cursor: 'pointer',
            }}>Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
};

window.Newsletter = Newsletter;
