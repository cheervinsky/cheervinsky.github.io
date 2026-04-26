// SiteHeader — slim top nav that tightens on scroll.
const SiteHeader = () => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      padding: scrolled ? '10px 32px' : '22px 32px',
      background: scrolled ? 'rgba(243, 234, 219, 0.78)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px) saturate(120%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(120%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent',
      transition: 'all 220ms cubic-bezier(.22,.61,.36,1)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 2, textDecoration: 'none', position: 'relative' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: scrolled ? 22 : 28,
          fontWeight: 400,
          letterSpacing: '-0.03em',
          color: 'var(--ink)',
          fontVariationSettings: '"opsz" 96, "SOFT" 60',
          lineHeight: 1,
          transition: 'font-size 220ms var(--ease-soft)',
        }}>cheervinsky</span>
        <span aria-hidden style={{
          position: 'absolute',
          top: scrolled ? -3 : -4,
          left: scrolled ? '56%' : '56%',
          width: scrolled ? 5 : 6,
          height: scrolled ? 5 : 6,
          background: 'var(--honey)',
          borderRadius: 999,
          transition: 'all 220ms var(--ease-soft)',
        }}/>
      </a>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 28, fontFamily: 'var(--font-body)', fontSize: 14 }}>
        <a href="#apps" style={{ textDecoration: 'none', color: 'var(--ink)' }}>Apps</a>
        <a href="#believe" style={{ textDecoration: 'none', color: 'var(--ink)' }}>Studio</a>
        <a href="#letter" style={{ textDecoration: 'none', color: 'var(--ink)' }}>Letter</a>
        <a href="#" style={{
          textDecoration: 'none', color: 'var(--paper)', background: 'var(--honey)',
          padding: '8px 16px', borderRadius: 999, fontWeight: 500,
        }}>Try one</a>
      </nav>
    </header>
  );
};

window.SiteHeader = SiteHeader;
