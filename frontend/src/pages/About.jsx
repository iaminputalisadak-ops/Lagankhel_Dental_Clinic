import { useState } from 'react';
import BookAppointmentModal from '../components/BookAppointmentModal';

const team = [
  { name: 'Dr. Jinesh Babu R', qual: 'BDS, MDS Orthodontics and Dentofacial Orthopaedics', bio: 'Specialist in braces and aligners with years of experience in creating beautiful smiles.' },
  { name: 'Dr. Sushritha Sricharan', qual: 'BDS, MDS Conservative Dentistry and Endodontics', bio: 'Expert in root canal and re-root canal treatments. Specializes in aesthetic dentistry and smile makeovers.' },
  { name: 'Dr. Sajan Shetty', qual: 'BDS, MDS Prosthodontics & Implantologist', bio: 'Specialist in dental implants and prosthetics with expertise in full mouth rehabilitation.' },
  { name: 'Dr. Faizuddin Imran', qual: 'BDS, MDS Periodontology & Implantology', bio: 'Over 13 years of experience in periodontal diseases, implantology and cosmetic periodontal procedures.' },
  { name: 'Dr. Sibikar P', qual: 'BDS, MDS Pedodontics and Preventive Dentistry', bio: 'Pedodontist specializing in children\'s dental health and preventive care.' },
];

export default function About() {
  const [showModal, setShowModal] = useState(false);
  const [expandedMember, setExpandedMember] = useState(null);

  return (
    <div className="page about-page">
      <section className="page-hero">
        <div className="container">
          <h1>About Lagankhel Dental Clinic</h1>
          <p>Your smile is our pride. Meet the team behind your dental care.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2>Welcome to Lagankhel Dental Clinic</h2>
          <p>
            Where your journey to optimal oral health and a confident smile begins. Our team of 
            experienced dentists is committed to providing personalized care in a warm and welcoming 
            environment. We combine expertise with compassion to ensure every visit is comfortable.
          </p>
        </div>
      </section>
      <section className="section team-page">
        <div className="container">
          <h2>Our Team</h2>
          <div className="team-list">
            {team.map((m, i) => (
              <div key={i} className="team-member-expanded" onClick={() => setExpandedMember(expandedMember === i ? null : i)}>
                <div className="team-member-header">
                  <div className="team-avatar">{m.name.charAt(0)}</div>
                  <div>
                    <h3>{m.name}</h3>
                    <p className="qual">{m.qual}</p>
                  </div>
                </div>
                {expandedMember === i && <p className="team-bio">{m.bio}</p>}
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>Book Appointment</button>
        </div>
      </section>
      <BookAppointmentModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
