import { Link } from 'react-router-dom';

export default function Hero({ onBookClick }) {
  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <p className="hero-subtitle">YOUR SMILE IS OUR PRIDE</p>
        <h1 className="hero-title">Lagankhel Dental Clinic</h1>
        <p className="hero-tagline">Best Dental Clinic in Lalitpur</p>
        <div className="hero-btns">
          <button className="btn-primary btn-lg" onClick={onBookClick}>Book Appointment</button>
          <Link to="/about" className="btn-outline btn-lg">Learn More</Link>
        </div>
      </div>
    </section>
  );
}
