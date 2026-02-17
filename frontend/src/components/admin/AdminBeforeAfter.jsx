import { useState, useEffect } from 'react';

const API_URL = '/api';

export default function AdminBeforeAfter() {
  const [cases, setCases] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ before_image_url: '', after_image_url: '', title: '', category: 'general', sort_order: 0 });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);

  const fetchCases = () => {
    fetch(`${API_URL}/admin/before_after.php`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => data.success && setCases(data.cases || []))
      .catch(() => setCases([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchCases(), []);

  const saveCase = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    const payload = { ...form };
    if (editing) payload.id = editing.id;
    try {
      const res = await fetch(`${API_URL}/before_after.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setEditing(null);
        setForm({ before_image_url: '', after_image_url: '', title: '', category: 'general', sort_order: 0 });
        fetchCases();
      } else setMessage({ type: 'error', text: data.message || 'Failed' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to save' });
    }
  };

  const editCase = (c) => {
    setEditing(c);
    setForm({
      before_image_url: c.before_image_url || '',
      after_image_url: c.after_image_url || '',
      title: c.title || '',
      category: c.category || 'general',
      sort_order: c.sort_order ?? 0
    });
  };

  const addNew = () => {
    setEditing(null);
    setForm({
      before_image_url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600',
      after_image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600',
      title: '',
      category: 'general',
      sort_order: cases.length
    });
  };

  const removeCase = async (id) => {
    if (!confirm('Remove this case?')) return;
    try {
      const res = await fetch(`${API_URL}/before_after.php?id=${id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      if (data.success) { setMessage({ type: 'success', text: data.message }); fetchCases(); }
      else setMessage({ type: 'error', text: data.message });
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to remove' });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-before-after">
      <h2>Before - After Cases</h2>
      {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}
      <div className="admin-before-after-grid">
        {cases.map((c) => (
          <div key={c.id} className="admin-ba-item">
            <div className="admin-ba-preview">
              <div className="admin-ba-preview-before" style={{ backgroundImage: `url(${c.before_image_url})` }} />
              <div className="admin-ba-preview-after" style={{ backgroundImage: `url(${c.after_image_url})` }} />
            </div>
            <p>{c.title || 'Untitled'}</p>
            <div>
              <button className="btn-outline" onClick={() => editCase(c)}>Edit</button>
              <button className="btn-outline" onClick={() => removeCase(c.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-primary" onClick={addNew}>Add New Case</button>

      {(editing || form.before_image_url) && (
        <form className="admin-form" onSubmit={saveCase}>
          <h3>{editing ? 'Edit Case' : 'New Case'}</h3>
          <label>Before Image URL</label>
          <input value={form.before_image_url} onChange={e => setForm({ ...form, before_image_url: e.target.value })} required />
          <label>After Image URL</label>
          <input value={form.after_image_url} onChange={e => setForm({ ...form, after_image_url: e.target.value })} required />
          <label>Title</label>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Dental Restoration" />
          <label>Category</label>
          <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
          <label>Sort Order</label>
          <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
          <div className="admin-form-actions">
            <button type="submit" className="btn-primary">Save</button>
            <button type="button" className="btn-outline" onClick={() => { setEditing(null); setForm({}); }}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
