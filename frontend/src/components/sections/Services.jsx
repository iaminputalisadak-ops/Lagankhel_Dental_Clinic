import { Link } from 'react-router-dom';

const services = [
  { title: 'Orthodontics', desc: 'Braces and aligners for a straighter smile', link: '/treatments' },
  { title: 'Root Canal', desc: 'Pain-free root canal treatment', link: '/treatments' },
  { title: 'Dental Oral Surgery', desc: 'Extractions and oral surgery', link: '/treatments' },
  { title: 'Cosmetic Dentistry', desc: 'Veneers and smile designing', link: '/treatments' },
  { title: 'Dental Implant & Prosthetics', desc: 'Implants and prosthetics', link: '/treatments' },
  { title: 'Restorative Dentistry', desc: 'Root canal and fillings', link: '/treatments' },
];

export default function Services() {
  return (
    <section className="section services-section">
      <div className="container">
        <p className="section-subtitle">Services</p>
        <h2 className="section-title">Our Dental Services</h2>
        <div className="services-grid">
          {services.map((s, i) => (
            <Link to={s.link} key={i} className="service-card">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="service-link">Learn More →</span>
            </Link>
          ))}
        </div>
        <p className="services-footer">
          Welcome to Lagankhel Dental Clinic where your journey to optimal oral health and a confident smile begins.
        </p>
        <Link to="/contact" className="btn-primary">Book Appointment</Link>
      </div>
    </section>
  );
}
