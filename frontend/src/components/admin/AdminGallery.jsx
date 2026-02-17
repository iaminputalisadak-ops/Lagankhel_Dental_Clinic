import { useState, useEffect } from 'react';

const API_URL = '/api';

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ image_url: '', title: '', category: 'clinic', sort_order: 0 });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);

  const fetchImages = () => {
    fetch(`${API_URL}/admin/gallery.php`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => data.success && setImages(data.images || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchImages(), []);

  const saveImage = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    const payload = { ...form };
    if (editing) payload.id = editing.id;
    try {
      const res = await fetch(`${API_URL}/gallery.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setEditing(null);
        setForm({ image_url: '', title: '', category: 'clinic', sort_order: 0 });
        fetchImages();
      } else setMessage({ type: 'error', text: data.message || 'Failed' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to save' });
    }
  };

  const editImage = (img) => {
    setEditing(img);
    setForm({
      image_url: img.image_url || '',
      title: img.title || '',
      category: img.category || 'clinic',
      sort_order: img.sort_order ?? 0
    });
  };

  const addNew = () => {
    setEditing(null);
    setForm({
      image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600',
      title: '',
      category: 'clinic',
      sort_order: images.length
    });
  };

  const removeImage = async (id) => {
    if (!confirm('Remove this image?')) return;
    try {
      const res = await fetch(`${API_URL}/gallery.php?id=${id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      if (data.success) { setMessage({ type: 'success', text: data.message }); fetchImages(); }
      else setMessage({ type: 'error', text: data.message });
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to remove' });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-gallery">
      <h2>Gallery Images</h2>
      {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}
      <div className="admin-gallery-grid">
        {images.map((img) => (
          <div key={img.id} className="admin-gallery-item">
            <div className="admin-gallery-preview" style={{ backgroundImage: `url(${img.image_url})` }} />
            <p>{img.title || 'Untitled'}</p>
            <div>
              <button className="btn-outline" onClick={() => editImage(img)}>Edit</button>
              <button className="btn-outline" onClick={() => removeImage(img.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-primary" onClick={addNew}>Add New Image</button>

      {(editing || form.image_url) && (
        <form className="admin-form" onSubmit={saveImage}>
          <h3>{editing ? 'Edit Image' : 'New Image'}</h3>
          <label>Image URL</label>
          <input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} required />
          <label>Title</label>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
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
