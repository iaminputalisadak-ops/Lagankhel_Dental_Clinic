const stats = [
  { number: '15+', label: 'Years Dental Experience' },
  { number: '10,000+', label: 'Patients Treated' },
  { number: '7,200+', label: 'Root Canals Treated' },
  { number: '1,000+', label: 'Braces And Aligner Treated' },
];

export default function Stats() {
  return (
    <section className="section stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <span className="stat-number">{s.number}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
