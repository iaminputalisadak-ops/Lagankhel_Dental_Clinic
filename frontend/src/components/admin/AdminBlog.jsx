import { useState, useEffect } from 'react';

const API_URL = '/api';

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', category: '', image_url: '', author: 'Lagankhel Dental Clinic', published: 1 });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);

  const fetchPosts = () => {
    fetch(`${API_URL}/admin/blog.php`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => data.success && setPosts(data.posts || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchPosts(), []);

  const generateSlug = (title) => title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';

  const savePost = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    const payload = { ...form, slug: form.slug || generateSlug(form.title) };
    if (editing) payload.id = editing.id;
    try {
      const res = await fetch(`${API_URL}/blog.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setEditing(null);
        setForm({ title: '', slug: '', excerpt: '', content: '', category: '', image_url: '', author: 'Lagankhel Dental Clinic', published: 1 });
        fetchPosts();
      } else setMessage({ type: 'error', text: data.message || 'Failed' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to save' });
    }
  };

  const editPost = (p) => {
    setEditing(p);
    setForm({
      title: p.title || '',
      slug: p.slug || '',
      excerpt: p.excerpt || '',
      content: p.content || '',
      category: p.category || '',
      image_url: p.image_url || '',
      author: p.author || 'Lagankhel Dental Clinic',
      published: p.published ?? 1
    });
  };

  const addNew = () => {
    setEditing(null);
    setForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: 'Dental Braces',
      image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600',
      author: 'Lagankhel Dental Clinic',
      published: 1
    });
  };

  const removePost = async (id) => {
    if (!confirm('Remove this post?')) return;
    try {
      const res = await fetch(`${API_URL}/blog.php?id=${id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      if (data.success) { setMessage({ type: 'success', text: data.message }); fetchPosts(); }
      else setMessage({ type: 'error', text: data.message });
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to remove' });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-blog">
      <h2>Blog Posts</h2>
      {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}
      <div className="admin-blog-list">
        {posts.map((p) => (
          <div key={p.id} className="admin-blog-item">
            <div className="admin-blog-preview" style={{ backgroundImage: `url(${p.image_url})` }} />
            <div>
              <strong>{p.title}</strong>
              <p className="admin-blog-meta">{p.category} • {new Date(p.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <button className="btn-outline" onClick={() => editPost(p)}>Edit</button>
              <button className="btn-outline" onClick={() => removePost(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-primary" onClick={addNew}>Add New Post</button>

      {(editing || form.title || form.image_url) && (
        <form className="admin-form admin-blog-form" onSubmit={savePost}>
          <h3>{editing ? 'Edit Post' : 'New Post'}</h3>
          <label>Title</label>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value, slug: form.slug || generateSlug(e.target.value) })} required />
          <label>Slug (URL)</label>
          <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated from title" />
          <label>Category</label>
          <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g. Dental Braces" />
          <label>Featured Image URL</label>
          <input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} />
          <label>Excerpt</label>
          <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows="2" />
          <label>Content</label>
          <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows="6" />
          <label>Author</label>
          <input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
          <label><input type="checkbox" checked={!!form.published} onChange={e => setForm({ ...form, published: e.target.checked ? 1 : 0 })} /> Published</label>
          <div className="admin-form-actions">
            <button type="submit" className="btn-primary">Save</button>
            <button type="button" className="btn-outline" onClick={() => { setEditing(null); setForm({}); }}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
