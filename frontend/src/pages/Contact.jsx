import { useState } from 'react';
import BookAppointmentModal from '../components/BookAppointmentModal';

const API_URL = '/api';

export default function Contact() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const res = await fetch(`${API_URL}/contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Something went wrong' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to connect. Please check if the backend server is running.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page contact-page">
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with our team</p>
        </div>
      </section>
      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <div className="contact-details">
              <p><strong>Our Location</strong><br />Lagankhel, Lalitpur, Nepal</p>
              <p><strong>Call Today</strong><br /><a href="tel:+9779800000000">+977 9800000000</a></p>
              <p><strong>Landline</strong><br />01-1234567</p>
              <p><strong>Opening Hours</strong><br />Sunday - Friday<br />10:00 AM - 7:00 PM</p>
            </div>
          </div>
          <div className="contact-form-wrap">
            <h3>Send us a Message</h3>
            {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}
            <form onSubmit={handleContactSubmit}>
              <input type="text" name="name" placeholder="Name *" required value={formData.name} onChange={handleChange} />
              <input type="email" name="email" placeholder="Email *" required value={formData.email} onChange={handleChange} />
              <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
              <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
              <textarea name="message" placeholder="Message *" rows="5" required value={formData.message} onChange={handleChange}></textarea>
              <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
            </form>
            <p className="or-book">or</p>
            <button className="btn-outline" onClick={() => setShowModal(true)}>Book Appointment</button>
          </div>
        </div>
      </section>
      <BookAppointmentModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
