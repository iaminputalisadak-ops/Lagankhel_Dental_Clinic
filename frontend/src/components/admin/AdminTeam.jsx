import { useState, useEffect } from 'react';

const API_URL = '/api';

export default function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', qualification: '', image_url: '', bio: '', sort_order: 0 });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);

  const fetchMembers = () => {
    fetch(`${API_URL}/admin/team.php`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => data.success && setMembers(data.members || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchMembers(), []);

  const saveMember = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    const payload = { ...form };
    if (editing) payload.id = editing.id;
    try {
      const res = await fetch(`${API_URL}/team.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setEditing(null);
        setForm({ name: '', qualification: '', image_url: '', bio: '', sort_order: 0 });
        fetchMembers();
      } else setMessage({ type: 'error', text: data.message || 'Failed' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to save' });
    }
  };

  const editMember = (m) => {
    setEditing(m);
    setForm({
      name: m.name || '',
      qualification: m.qualification || '',
      image_url: m.image_url || '',
      bio: m.bio || '',
      sort_order: m.sort_order ?? 0
    });
  };

  const addNew = () => {
    setEditing(null);
    setForm({
      name: '',
      qualification: '',
      image_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
      bio: '',
      sort_order: members.length
    });
  };

  const removeMember = async (id) => {
    if (!confirm('Remove this team member?')) return;
    try {
      const res = await fetch(`${API_URL}/team.php?id=${id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      if (data.success) { setMessage({ type: 'success', text: data.message }); fetchMembers(); }
      else setMessage({ type: 'error', text: data.message });
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to remove' });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-team">
      <h2>Team Members</h2>
      {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}
      <div className="admin-team-grid">
        {members.map((m) => (
          <div key={m.id} className="admin-team-item">
            <div className="admin-team-preview" style={{ backgroundImage: `url(${m.image_url})` }} />
            <p><strong>{m.name}</strong></p>
            <p className="admin-team-qual">{m.qualification}</p>
            <div>
              <button className="btn-outline" onClick={() => editMember(m)}>Edit</button>
              <button className="btn-outline" onClick={() => removeMember(m.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-primary" onClick={addNew}>Add New Member</button>

      {(editing || form.image_url) && (
        <form className="admin-form" onSubmit={saveMember}>
          <h3>{editing ? 'Edit Member' : 'New Member'}</h3>
          <label>Name</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <label>Qualification</label>
          <input value={form.qualification} onChange={e => setForm({ ...form, qualification: e.target.value })} />
          <label>Image URL</label>
          <input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} required />
          <label>Bio (optional)</label>
          <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} rows="2" />
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
