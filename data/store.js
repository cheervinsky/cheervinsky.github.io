// Tiny store with localStorage persistence + GitHub sync.
//
// Reads:
//   - On load, immediately renders from localStorage (so the UI is never blank).
//   - In the background, fetches the latest posts.json from GitHub. If newer
//     data is found, replaces state and broadcasts a change.
//
// Writes (admin only):
//   - Updates state, writes to localStorage, AND pushes posts.json back to GitHub
//     using the PAT held by window.cheerSync. Also externalises any newly-uploaded
//     image (data: URLs and 'media:<id>' IndexedDB refs) by committing it to the
//     repo and rewriting the post field to 'ghmedia/<filename>'.
//
// Exposes window.cheerStore.{get, getPosts, getProducts, getPinnedPost,
//   addPost, updatePost, deletePost, setPinned, reset, exportData, importData,
//   refreshFromRemote}.
(function () {
  const KEY = 'cheervinsky_v1';
  const D = window.CHEERVINSKY_DEFAULTS;
  const SYNC = window.cheerSync;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return clone(D);
      const parsed = JSON.parse(raw);
      const posts = (parsed.posts || clone(D.posts)).map(p => ({
        published: true,
        status: 'blog',
        coverPosition: '50% 0%',
        coverZoom: 100,
        homeImage: '',
        homeImagePosition: '50% 50%',
        homeImageZoom: 100,
        productIconSize: 34,
        productIconGap: 8,
        productIconShiftX: 0,
        productIconShiftY: 0,
        ...p,
      }));
      return {
        products: parsed.products || clone(D.products),
        posts,
      };
    } catch (e) {
      return clone(D);
    }
  }
  function saveLocal(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      const isQuota = e && (e.name === 'QuotaExceededError' || /quota/i.test(String(e.message || '')));
      // If we have a disk destination (local dev server or GitHub PAT),
      // localStorage failure is non-fatal — the on-disk push is the real
      // source of truth. Just log; don't disrupt the user.
      const haveDiskDest = !!localApi || (SYNC && SYNC.hasToken && SYNC.hasToken());
      if (haveDiskDest && isQuota) {
        console.warn('[cheerStore] localStorage cache full; relying on disk save instead.');
        return false;
      }
      const message = isQuota
        ? 'This post is too large for browser storage. Start the local dev server (node serve.js) so changes can be saved to disk instead.'
        : 'The post could not be saved in browser storage.';
      alert(message);
      window.dispatchEvent(new CustomEvent('cheer-store-save-error', { detail: { message } }));
      return false;
    }
  }
  function broadcast() {
    window.dispatchEvent(new CustomEvent('cheer-store-changed'));
  }
  function clone(x) { return JSON.parse(JSON.stringify(x)); }

  let state = load();
  let inFlightSync = null;

  // ---- Local dev-server detection ----
  // When the page is served from http://localhost:* (or 127.0.0.1), check for
  // serve.js's /api/save endpoint. If it's there, all writes go to disk via
  // the local server (no PAT needed) — the workflow is then "edit → git push".
  let localApi = null;
  let localApiProbe = null;
  function probeLocalApi() {
    if (localApiProbe) return localApiProbe;
    const proto = (window.location && window.location.protocol) || '';
    const host = (window.location && window.location.hostname) || '';
    if (proto !== 'http:' || (host !== 'localhost' && host !== '127.0.0.1')) {
      localApi = false;
      return Promise.resolve(false);
    }
    localApiProbe = fetch('/api/status', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(j => { localApi = !!(j && j.ok); return localApi; })
      .catch(() => { localApi = false; return false; });
    return localApiProbe;
  }
  probeLocalApi();

  // ---- Background pull from GitHub (or local /data/posts.json on the dev server) ----
  // Fires once on page load, then again when admin token becomes available.
  async function refreshFromRemote() {
    // If the local dev server is up, prefer its on-disk posts.json — that's
    // the source of truth in the local-edit workflow.
    await probeLocalApi();
    if (localApi) {
      try {
        const res = await fetch('/data/posts.json?t=' + Date.now(), { cache: 'no-store' });
        if (res.ok) {
          const remote = await res.json();
          state = normalizeRemoteState(remote);
          saveLocal(state);
          broadcast();
        }
      } catch (e) { /* keep local state */ }
      return;
    }
    if (!SYNC) return;
    try {
      const remote = await SYNC.fetchPosts();
      if (!remote) return; // 404 or fetch failed — keep current state
      state = normalizeRemoteState(remote);
      saveLocal(state); // cache for next offline open
      broadcast();
    } catch (e) {
      // Stay quiet — the UI keeps working from localStorage
    }
  }
  function normalizeRemoteState(remote) {
    return {
      products: Array.isArray(remote.products) ? remote.products : [],
      posts: Array.isArray(remote.posts) ? remote.posts.map(p => ({
        published: true,
        status: 'blog',
        coverPosition: '50% 0%',
        coverZoom: 100,
        homeImage: '',
        homeImagePosition: '50% 50%',
        homeImageZoom: 100,
        productIconSize: 34,
        productIconGap: 8,
        productIconShiftX: 0,
        productIconShiftY: 0,
        ...p,
      })) : [],
    };
  }

  // Kick off initial pull (don't await — UI renders from localStorage immediately).
  if (SYNC) {
    inFlightSync = refreshFromRemote();
  }
  window.addEventListener('cheer-admin-token-changed', () => {
    inFlightSync = refreshFromRemote();
  });

  // ---- Local-server media upload ----
  // Uploads a blob via /api/upload, which writes data/media/<filename> to disk.
  // Returns 'data/media/<filename>' (a relative path the static site can serve).
  async function uploadMediaLocal(filenameHint, blob) {
    const ext = mimeExt(blob && blob.type) || '';
    const safeBase = (filenameHint || 'asset')
      .replace(/\.[^.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 32) || 'asset';
    const stamp = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
    const filename = safeBase + '-' + stamp + ext;
    const base64 = await blobToBase64(blob);
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, base64 }),
    });
    const j = await res.json().catch(() => ({}));
    if (!res.ok || !j.ok) throw new Error(j.message || ('Upload failed (' + res.status + ')'));
    return j.ref; // 'data/media/<filename>'
  }
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = String(reader.result || '');
        const comma = result.indexOf(',');
        resolve(comma >= 0 ? result.slice(comma + 1) : result);
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  }

  // ---- Externalising images before commit ----
  // Walks a post object and replaces any 'data:' URL or 'media:<id>' reference
  // with either:
  //   - 'data/media/<filename>' (local server mode) — committable as a regular file
  //   - 'ghmedia/<filename>'    (GitHub PAT mode)   — pushed via Contents API
  async function externaliseImages(post) {
    const useLocal = !!localApi;
    const useGh = !useLocal && SYNC && SYNC.hasToken();
    if (!useLocal && !useGh) return post;
    const fields = ['cover', 'homeImage', 'productIcon'];
    const next = { ...post };
    for (const field of fields) {
      const value = next[field];
      if (!value || typeof value !== 'string') continue;

      // Already a GitHub-committed asset? skip.
      if (value.startsWith('ghmedia/')) continue;
      // External URL? skip.
      if (/^https?:\/\//i.test(value)) continue;

      let blob = null;
      let hint = field;
      if (value.startsWith('data:')) {
        blob = dataUrlToBlob(value);
        hint = field + (mimeExt(blob.type) || '');
      } else if (value.startsWith('media:')) {
        const id = value.slice(6);
        try {
          const asset = await window.cheerMedia.get(id);
          if (asset && asset.blob) {
            blob = asset.blob;
            hint = (asset.name || (field + mimeExt(blob.type) || '')) || field;
          }
        } catch (e) {}
      }
      if (!blob) continue;
      try {
        const ref = useLocal ? await uploadMediaLocal(hint, blob) : await SYNC.uploadMedia(hint, blob);
        next[field] = ref;
      } catch (e) {
        throw new Error('Could not upload ' + field + ': ' + (e && e.message ? e.message : e));
      }
    }

    // Also walk the body for {{image:data:...}} or {{image:media:...}} refs
    if (typeof next.body === 'string') {
      next.body = await externaliseBodyMedia(next.body);
    }

    return next;
  }
  async function externaliseBodyMedia(body) {
    // Match {{type:src|...}} blocks. src is the part between : and |.
    const re = /\{\{(image|video|gallery|youtube):([^|}]+)([^}]*)\}\}/g;
    let out = '';
    let i = 0;
    let match;
    while ((match = re.exec(body)) !== null) {
      out += body.slice(i, match.index);
      const [_, type, srcRaw, rest] = match;
      // gallery uses comma-separated URI-encoded items
      let newSrc = srcRaw;
      if (type === 'gallery') {
        const items = srcRaw.split(',').map(decodeURIComponent);
        const replaced = [];
        for (const item of items) {
          replaced.push(await maybeExternaliseSingle(item));
        }
        newSrc = replaced.map(encodeURIComponent).join(',');
      } else {
        newSrc = await maybeExternaliseSingle(srcRaw);
      }
      out += '{{' + type + ':' + newSrc + (rest || '') + '}}';
      i = re.lastIndex;
    }
    return out + body.slice(i);
  }
  async function maybeExternaliseSingle(src) {
    if (!src) return src;
    if (src.startsWith('ghmedia/')) return src;
    if (src.startsWith('data/media/')) return src;
    if (/^https?:\/\//i.test(src)) return src;
    let blob = null;
    let hint = 'asset';
    if (src.startsWith('data:')) {
      blob = dataUrlToBlob(src);
      hint = 'body' + (mimeExt(blob.type) || '');
    } else if (src.startsWith('media:')) {
      const id = src.slice(6);
      try {
        const asset = await window.cheerMedia.get(id);
        if (asset && asset.blob) {
          blob = asset.blob;
          hint = asset.name || 'body';
        }
      } catch (e) {}
    }
    if (!blob) return src;
    try {
      return localApi ? await uploadMediaLocal(hint, blob) : await SYNC.uploadMedia(hint, blob);
    } catch (e) {
      throw e;
    }
  }
  function dataUrlToBlob(dataUrl) {
    const comma = dataUrl.indexOf(',');
    const meta = dataUrl.slice(5, comma); // strip 'data:'
    const isBase64 = /;base64$/.test(meta);
    const mime = meta.replace(/;base64$/, '') || 'application/octet-stream';
    const data = dataUrl.slice(comma + 1);
    if (isBase64) {
      const bin = atob(data);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      return new Blob([arr], { type: mime });
    }
    return new Blob([decodeURIComponent(data)], { type: mime });
  }
  function mimeExt(mime) {
    switch (mime) {
      case 'image/png': return '.png';
      case 'image/jpeg': return '.jpg';
      case 'image/gif': return '.gif';
      case 'image/webp': return '.webp';
      case 'image/svg+xml': return '.svg';
      case 'video/mp4': return '.mp4';
      case 'video/webm': return '.webm';
      default: return '';
    }
  }

  // ---- Push the whole state to disk/GitHub (admin only) ----
  // Returns { ok, message }. Quietly no-ops when there's no destination.
  // Preference order:
  //   1. Local dev server (serve.js) → writes data/posts.json on disk
  //   2. GitHub Contents API via PAT → commits straight to the repo
  async function pushToRemote() {
    await probeLocalApi();
    if (localApi) {
      try {
        const res = await fetch('/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state),
        });
        const j = await res.json().catch(() => ({}));
        if (!res.ok || !j.ok) return { ok: false, message: j.message || 'Local save failed (' + res.status + ')' };
        return { ok: true, message: j.message || 'Saved to data/posts.json' };
      } catch (e) {
        return { ok: false, message: 'Local save failed: ' + (e && e.message || e) };
      }
    }
    if (!SYNC || !SYNC.hasToken()) return { ok: true, message: '' };
    return SYNC.savePosts(state);
  }

  function notifySaveError(message) {
    window.dispatchEvent(new CustomEvent('cheer-store-save-error', { detail: { message } }));
    alert(message);
  }
  function notifyRemoteSync(detail) {
    window.dispatchEvent(new CustomEvent('cheer-store-remote-sync', { detail }));
  }

  // Wraps a mutation with: optimistic broadcast -> externalise images to disk
  // -> persist slim state to localStorage -> push posts.json to disk/GitHub.
  //
  // Important ordering note:
  //   We do externalise BEFORE writing to localStorage, because data: URLs
  //   for big images (or videos pasted as base64) blow past the ~5MB
  //   localStorage quota. After externalisation the post only carries a tiny
  //   "data/media/<filename>" or "ghmedia/<filename>" reference, which fits
  //   comfortably.
  async function commitMutation(mutator, opts = {}) {
    const previous = clone(state);
    let mutated;
    try {
      mutated = mutator(state); // mutates `state` in place; returns whatever caller wants
    } catch (e) {
      state = previous;
      notifySaveError('Could not apply this change.');
      return null;
    }

    // Optimistic UI update first — components re-render against in-memory state
    // immediately, even before disk uploads finish.
    broadcast();

    await probeLocalApi();
    const canExternalise = !!localApi || (SYNC && SYNC.hasToken());

    // Step 1: upload any inline images BEFORE we touch localStorage. This
    // prevents the "post too large for browser storage" alert on big images.
    if (canExternalise && opts.externaliseId) {
      try {
        const idx = state.posts.findIndex(p => p.id === opts.externaliseId);
        if (idx >= 0) {
          const externalised = await externaliseImages(state.posts[idx]);
          if (externalised !== state.posts[idx]) {
            state.posts[idx] = externalised;
            broadcast();
          }
        }
      } catch (e) {
        notifyRemoteSync({ ok: false, message: 'Could not upload images: ' + (e && e.message ? e.message : e) });
        // Keep going — text changes still need to land somewhere.
      }
    }

    // Step 2: persist the (now slim) state to localStorage as a cache.
    if (!saveLocal(state)) {
      // localStorage write failed (likely quota even after externalisation —
      // could happen if the user has many huge posts already cached, OR if
      // they're not running the local server and the post still has data: URLs).
      // Don't roll back: the disk push below is the source of truth.
      // saveLocal already alert()ed the user.
    }

    // Step 3: push the slim posts.json to disk (local server) or repo (PAT).
    if (canExternalise) {
      const result = await pushToRemote();
      notifyRemoteSync(result);
    } else {
      // No local server, no PAT — there's literally nowhere to put it but
      // localStorage, and that just failed if we got here from the saveLocal
      // failure path. Surface a nudge.
      notifyRemoteSync({ ok: false, message: 'Save was kept only in browser memory. Start the local dev server (node serve.js) to write changes to disk.' });
    }
    return mutated;
  }

  const api = {
    get() { return state; },
    exportData() { return clone(state); },
    importData(payload) {
      if (!payload || typeof payload !== 'object') return false;
      const nextState = {
        products: Array.isArray(payload.products) ? payload.products : [],
        posts: Array.isArray(payload.posts) ? payload.posts : [],
      };
      const previousState = clone(state);
      state = nextState;
      if (!saveLocal(state)) { state = previousState; return false; }
      broadcast();
      // Push to disk (local server) or GitHub (PAT).
      probeLocalApi().then(() => {
        if (localApi || (SYNC && SYNC.hasToken())) pushToRemote().then(notifyRemoteSync);
      });
      return true;
    },
    getPosts() { return state.posts.slice().sort((a, b) => (b.date || '').localeCompare(a.date || '')); },
    getProducts() { return state.products; },
    getPinnedPost() { return state.posts.find(p => p.pinned) || null; },
    refreshFromRemote,

    addPost(post) {
      const id = post.id || ('post-' + Date.now().toString(36));
      const newPost = {
        id,
        title: post.title || 'Untitled',
        excerpt: post.excerpt || '',
        cover: post.cover || '',
        coverPosition: post.coverPosition || '50% 0%',
        coverZoom: post.coverZoom || 100,
        homeImage: post.homeImage || '',
        homeImagePosition: post.homeImagePosition || '50% 50%',
        homeImageZoom: post.homeImageZoom || 100,
        productIcon: post.productIcon || '',
        productIconSize: post.productIconSize || 34,
        productIconGap: post.productIconGap || 8,
        productIconShiftX: post.productIconShiftX || 0,
        productIconShiftY: post.productIconShiftY || 0,
        appStore: post.appStore || '',
        googlePlay: post.googlePlay || '',
        includeInCarousel: !!post.includeInCarousel,
        author: post.author || 'Cheervinsky',
        date: post.date || new Date().toISOString().slice(0, 10),
        pinned: !!post.pinned,
        published: post.published !== false,
        status: post.status === 'product' ? 'product' : 'blog',
        tags: post.tags || [],
        body: post.body || '',
      };
      if (newPost.status === 'product') newPost.pinned = false;
      if (!newPost.published) newPost.pinned = false;

      commitMutation(s => {
        if (newPost.pinned && newPost.published) s.posts.forEach(p => p.pinned = false);
        s.posts.unshift(newPost);
        return newPost;
      }, { externaliseId: id });
      return newPost;
    },
    updatePost(id, patch) {
      const idx = state.posts.findIndex(p => p.id === id);
      if (idx < 0) return null;
      if (patch.status === 'product') patch.pinned = false;
      if (patch.published === false) patch.pinned = false;
      commitMutation(s => {
        if (patch.pinned && patch.published !== false) s.posts.forEach(p => p.pinned = false);
        s.posts[idx] = { ...s.posts[idx], ...patch };
        return s.posts[idx];
      }, { externaliseId: id });
      return state.posts[idx];
    },
    deletePost(id) {
      commitMutation(s => { s.posts = s.posts.filter(p => p.id !== id); });
    },
    setPinned(id) {
      commitMutation(s => {
        s.posts.forEach(p => p.pinned = (p.id === id && p.published !== false && p.status !== 'product'));
      });
    },
    reset() {
      const fresh = clone(D);
      commitMutation(s => { s.products = fresh.products; s.posts = fresh.posts; });
    },
  };

  window.cheerStore = api;
})();
