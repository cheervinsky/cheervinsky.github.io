// Blog list, single post, Products page, Contacts page, Admin page

function BlogPage() {
  const store = useStore();
  const posts = window.cheerStore.getPosts();
  return (
    <div className="page">
      <section className="blog-hero">
        <h1>Blog</h1>
        <p>Letters from the studio — releases, design notes, and the occasional thought about what we're trying to make.</p>
      </section>
      <div className="blog-toolbar">
        <span style={{ fontFamily: "'Vollkorn SC', serif", letterSpacing: '0.08em', fontSize: 13, color: 'var(--ink-2)' }}>
          {posts.length} {posts.length === 1 ? 'POST' : 'POSTS'}
        </span>
      </div>
      <div className="blog-grid">
        {posts.map(p => (
          <a key={p.id} className="post-card" href={'#post/' + p.id}>
            <div className="post-cover">
              {p.cover ? <img src={p.cover} alt="" /> : <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', fontFamily: "'Vollkorn SC', serif", fontSize: 48, color: 'rgba(0,0,0,0.2)' }}>{p.title[0]}</div>}
            </div>
            <div className="body">
              <div className="meta">
                {p.pinned && <span className="pinned">PINNED</span>}
                <span>{formatDate(p.date)}</span>
                <span>·</span>
                <span>{p.author}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <span className="read-more">Read more →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function PostPage({ id }) {
  const store = useStore();
  const post = store.posts.find(p => p.id === id);
  if (!post) {
    return (
      <div className="page post-page">
        <a href="#blog" className="back-link">← Back to blog</a>
        <h1>Not found</h1>
        <p>We can't find that post. It may have been removed.</p>
      </div>
    );
  }
  // Render simple markdown-ish: ## heading, paragraphs separated by blank lines
  const blocks = (post.body || '').split(/\n\s*\n/).map((b, i) => {
    const trim = b.trim();
    if (trim.startsWith('## ')) return <h2 key={i}>{trim.slice(3)}</h2>;
    if (trim.startsWith('# ')) return <h2 key={i}>{trim.slice(2)}</h2>;
    return <p key={i}>{trim}</p>;
  });
  return (
    <div className="page post-page">
      <a href="#blog" className="back-link">← Back to blog</a>
      {post.cover ? <div className="post-cover"><img src={post.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} /></div> : null}
      <h1>{post.title}</h1>
      <div className="meta">{formatDate(post.date)} · {post.author}{post.pinned ? ' · PINNED' : ''}</div>
      <div className="post-body">{blocks}</div>
    </div>
  );
}

function ProductsPage() {
  const store = useStore();
  return (
    <div className="page">
      <section className="blog-hero">
        <h1>Products</h1>
        <p>Five small apps under one warm roof. Each does one thing, slowly, and well.</p>
      </section>
      <div className="products-grid">
        {store.products.map(p => (
          <div key={p.id} className="product-card">
            <div className="phone-stage" style={{ height: 320, width: '100%' }}>
              <PhoneMockup src={p.hero} alt={p.name} className="product-phone" />
            </div>
            <div style={{ height: 12 }} />
            <p style={{ fontFamily: "'Vollkorn SC', serif", fontSize: 12, letterSpacing: '0.16em', color: 'var(--honey-deep)', margin: '0 0 4px' }}>{p.eyebrow}</p>
            <h3>{p.name}</h3>
            <p>{p.tagline}</p>
            <div className="stores">
              <StoreButton kind="apple" href={p.appStore} />
              <StoreButton kind="google" href={p.googlePlay} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactsPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="page">
      <div className="contacts-page">
        <div>
          <h1>Hello.</h1>
          <p className="lede">We're a small studio in Lisbon, two people who answer their own email. We'd love to hear from you — whether it's a question, an idea, or a quiet hello.</p>
          <ul className="contact-list">
            <li><span className="label">EMAIL</span><span className="value">hello@cheervinsky.studio</span></li>
            <li><span className="label">PRESS</span><span className="value">press@cheervinsky.studio</span></li>
            <li><span className="label">SUPPORT</span><span className="value">support@cheervinsky.studio</span></li>
            <li><span className="label">STUDIO</span><span className="value">Rua das Flores 12, Lisboa</span></li>
            <li><span className="label">HOURS</span><span className="value">Mon–Fri, 09:00–17:00 WET</span></li>
          </ul>
        </div>
        <form className="contact-form" onSubmit={e => { e.preventDefault(); setSent(true); }}>
          <div>
            <label>NAME</label>
            <input type="text" required placeholder="Your name" />
          </div>
          <div>
            <label>EMAIL</label>
            <input type="email" required placeholder="you@somewhere.com" />
          </div>
          <div>
            <label>MESSAGE</label>
            <textarea required placeholder="Say a little hello, or tell us what's on your mind." />
          </div>
          <button type="submit" className="btn dark" style={{ alignSelf: 'flex-start' }}>
            {sent ? 'Sent — thank you.' : 'Send a note →'}
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminPage() {
  const store = useStore();
  const posts = window.cheerStore.getPosts();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', excerpt: '', cover: '', author: 'The Cheervinsky Studio', body: '', pinned: false, date: new Date().toISOString().slice(0, 10) });
  const fileRef = useRef(null);

  function reset() {
    setEditingId(null);
    setForm({ title: '', excerpt: '', cover: '', author: 'The Cheervinsky Studio', body: '', pinned: false, date: new Date().toISOString().slice(0, 10) });
  }
  function startEdit(p) {
    setEditingId(p.id);
    setForm({ title: p.title, excerpt: p.excerpt, cover: p.cover, author: p.author, body: p.body, pinned: !!p.pinned, date: p.date });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function submit(e) {
    e.preventDefault();
    if (editingId) {
      window.cheerStore.updatePost(editingId, form);
    } else {
      window.cheerStore.addPost(form);
    }
    reset();
  }
  function onFile(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setForm(s => ({ ...s, cover: reader.result }));
    reader.readAsDataURL(f);
  }

  return (
    <div className="page admin-page">
      <h1>Manage posts</h1>
      <p className="lede">Add new blog entries, edit existing ones, and choose which post appears on the homepage. Everything is saved to your browser — no server, no account.</p>

      <div className="admin-grid">
        <form className="admin-form" onSubmit={submit}>
          <h2>{editingId ? 'Edit post' : 'New post'}</h2>

          <div className="field">
            <label>TITLE</label>
            <input value={form.title} onChange={e => setForm(s => ({ ...s, title: e.target.value }))} placeholder="A short, gentle title" required />
          </div>

          <div className="field">
            <label>EXCERPT (1–2 sentences)</label>
            <textarea value={form.excerpt} onChange={e => setForm(s => ({ ...s, excerpt: e.target.value }))} placeholder="A short summary that appears on the home page and the blog list." style={{ minHeight: 70 }} required />
          </div>

          <div className="field">
            <label>COVER IMAGE</label>
            <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{ padding: 8 }} />
            {form.cover && <div className="preview-thumb" style={{ backgroundImage: `url(${form.cover})` }} />}
          </div>

          <div className="field">
            <label>AUTHOR</label>
            <input value={form.author} onChange={e => setForm(s => ({ ...s, author: e.target.value }))} />
          </div>

          <div className="field">
            <label>DATE</label>
            <input type="date" value={form.date} onChange={e => setForm(s => ({ ...s, date: e.target.value }))} />
          </div>

          <div className="field">
            <label>BODY (use blank lines between paragraphs, ## for headings)</label>
            <textarea value={form.body} onChange={e => setForm(s => ({ ...s, body: e.target.value }))} placeholder={"## A small heading\n\nA paragraph of plain, warm prose."} style={{ minHeight: 160 }} />
          </div>

          <div className="checkbox-row">
            <input id="pin" type="checkbox" checked={form.pinned} onChange={e => setForm(s => ({ ...s, pinned: e.target.checked }))} />
            <label htmlFor="pin">📌 Pin to homepage (replaces the current pinned post)</label>
          </div>

          <div className="row">
            <button type="submit" className="btn dark">{editingId ? 'Save changes' : 'Publish post'}</button>
            {editingId && <button type="button" className="btn ghost" onClick={reset}>Cancel</button>}
          </div>
        </form>

        <div className="admin-list">
          <h2>All posts ({posts.length})</h2>
          {posts.length === 0 && <p style={{ color: 'var(--ink-3)' }}>Nothing yet. Add your first post on the left.</p>}
          {posts.map(p => (
            <div key={p.id} className={'admin-post-row ' + (p.pinned ? 'pinned' : '')}>
              <div className="thumb" style={p.cover ? { backgroundImage: `url(${p.cover})` } : {}} />
              <div className="info">
                <h4>{p.pinned ? '📌 ' : ''}{p.title}</h4>
                <p className="excerpt">{p.excerpt}</p>
              </div>
              <div className="actions">
                <button
                  className={'icon-btn pin ' + (p.pinned ? 'active' : '')}
                  onClick={() => window.cheerStore.setPinned(p.pinned ? '' : p.id)}
                  aria-label="Pin to homepage"
                  title={p.pinned ? 'Unpin' : 'Pin to homepage'}
                ><IconPin /></button>
                <button className="icon-btn" onClick={() => startEdit(p)} aria-label="Edit" title="Edit"><IconEdit /></button>
                <button className="icon-btn danger" onClick={() => { if (confirm('Delete this post?')) window.cheerStore.deletePost(p.id); }} aria-label="Delete" title="Delete"><IconTrash /></button>
              </div>
            </div>
          ))}
          <button className="btn ghost" style={{ marginTop: 16 }} onClick={() => { if (confirm('Reset all posts and products to defaults?')) window.cheerStore.reset(); }}>Reset to defaults</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BlogPage, PostPage, ProductsPage, ContactsPage, AdminPage, formatDate });
