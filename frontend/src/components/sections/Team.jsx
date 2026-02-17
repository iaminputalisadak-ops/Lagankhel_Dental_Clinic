import { Link } from 'react-router-dom';

const team = [
  { name: 'Dr. Jinesh Babu R', qualification: 'BDS, MDS Orthodontics and Dentofacial Orthopaedics' },
  { name: 'Dr. Sushritha Sricharan', qualification: 'BDS, MDS Conservative Dentistry and Endodontics' },
  { name: 'Dr. Sajan Shetty', qualification: 'BDS, MDS Prosthodontics & Implantologist' },
  { name: 'Dr. Faizuddin Imran', qualification: 'BDS, MDS Periodontology & Implantology' },
  { name: 'Dr. Sibikar P', qualification: 'BDS, MDS Pedodontics and Preventive Dentistry' },
  { name: 'Dr. Saurabh Pillai', qualification: 'BDS, MDS Oral and Maxillofacial Surgery' },
];

export default function Team() {
  return (
    <section className="section team-section">
      <div className="container">
        <p className="section-subtitle">Team</p>
        <h2 className="section-title">Our Team</h2>
        <div className="team-grid">
          {team.map((member, i) => (
            <div key={i} className="team-card">
              <div className="team-avatar">{member.name.charAt(0)}</div>
              <h3>{member.name}</h3>
              <p>{member.qualification}</p>
            </div>
          ))}
        </div>
        <Link to="/about" className="btn-outline">Meet Our Team</Link>
      </div>
    </section>
  );
}
