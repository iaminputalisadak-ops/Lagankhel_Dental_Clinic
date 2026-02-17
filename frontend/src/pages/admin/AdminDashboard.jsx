import { useState, useEffect } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import AdminHero from '../../components/admin/AdminHero';
import AdminGallery from '../../components/admin/AdminGallery';

const API_URL = '/api/admin';

export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/login.php`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setLoggedIn(data.logged_in))
      .catch(() => setLoggedIn(false));
  }, []);

  const handleLogout = async () => {
    await fetch(`${API_URL}/logout.php`, { credentials: 'include' });
    setLoggedIn(false);
    navigate('/admin/login');
  };

  if (loggedIn === null) return <div className="admin-loading">Loading...</div>;
  if (loggedIn === false) return <Navigate to="/admin/login" replace />;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-header-actions">
          <Link to="/" className="btn-outline">View Site</Link>
          <button onClick={handleLogout} className="btn-outline">Logout</button>
        </div>
      </header>
      <nav className="admin-tabs">
        <button className={activeTab === 'hero' ? 'active' : ''} onClick={() => setActiveTab('hero')}>Hero Banner</button>
        <button className={activeTab === 'gallery' ? 'active' : ''} onClick={() => setActiveTab('gallery')}>Gallery</button>
      </nav>
      <main className="admin-content">
        {activeTab === 'hero' && <AdminHero />}
        {activeTab === 'gallery' && <AdminGallery />}
      </main>
    </div>
  );
}
