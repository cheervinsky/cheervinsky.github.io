// Tiny store with localStorage persistence.
// Exposes window.cheerStore.{get,setPosts,addPost,updatePost,deletePost,setPinned,reset}
(function () {
  const KEY = 'cheervinsky_v1';
  const D = window.CHEERVINSKY_DEFAULTS;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return clone(D);
      const parsed = JSON.parse(raw);
      // Backfill missing keys
      return {
        products: parsed.products || clone(D.products),
        posts: parsed.posts || clone(D.posts),
      };
    } catch (e) {
      return clone(D);
    }
  }
  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('cheer-store-changed'));
  }
  function clone(x) { return JSON.parse(JSON.stringify(x)); }

  let state = load();

  const api = {
    get() { return state; },
    getPosts() { return state.posts.slice().sort((a, b) => (b.date || '').localeCompare(a.date || '')); },
    getProducts() { return state.products; },
    getPinnedPost() { return state.posts.find(p => p.pinned) || null; },
    addPost(post) {
      const id = post.id || ('post-' + Date.now().toString(36));
      const newPost = {
        id,
        title: post.title || 'Untitled',
        excerpt: post.excerpt || '',
        cover: post.cover || '',
        author: post.author || 'Cheervinsky',
        date: post.date || new Date().toISOString().slice(0, 10),
        pinned: !!post.pinned,
        tags: post.tags || [],
        body: post.body || '',
      };
      if (newPost.pinned) {
        // Unpin all others first
        state.posts.forEach(p => p.pinned = false);
      }
      state.posts.unshift(newPost);
      save(state);
      return newPost;
    },
    updatePost(id, patch) {
      const idx = state.posts.findIndex(p => p.id === id);
      if (idx < 0) return null;
      if (patch.pinned) {
        state.posts.forEach(p => p.pinned = false);
      }
      state.posts[idx] = { ...state.posts[idx], ...patch };
      save(state);
      return state.posts[idx];
    },
    deletePost(id) {
      state.posts = state.posts.filter(p => p.id !== id);
      save(state);
    },
    setPinned(id) {
      state.posts.forEach(p => p.pinned = (p.id === id));
      save(state);
    },
    reset() {
      state = clone(D);
      save(state);
    },
  };

  window.cheerStore = api;
})();
