import { Link } from 'react-router-dom';

export default function AboutSection() {
  return (
    <section className="section about-section">
      <div className="container">
        <p className="section-subtitle">about our clinic</p>
        <h2 className="section-title">Welcome to Lagankhel Dental Clinic</h2>
        <p className="about-intro">
          Welcome to Lagankhel Dental Clinic where your journey to optimal oral health 
          and a confident smile begins. Our team of experienced dentists is committed to 
          providing personalized care in a warm and welcoming environment.
        </p>
        <div className="about-cards">
          <div className="about-card">
            <h3>Expert Care</h3>
            <p>Our team of skilled dental professionals is dedicated to providing expert care tailored to your individual needs.</p>
          </div>
          <div className="about-card">
            <h3>Personalized Approach</h3>
            <p>We understand that every patient is unique, which is why we take a personalized approach to your dental care.</p>
          </div>
        </div>
        <Link to="/about" className="btn-primary">Read More</Link>
      </div>
    </section>
  );
}
