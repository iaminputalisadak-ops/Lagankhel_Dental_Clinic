const features = [
  {
    title: 'Comfort and Convenience',
    desc: 'Your comfort and convenience are our top priorities. From our warm and inviting office environment to our flexible scheduling options.'
  },
  {
    title: 'Affordable Service',
    desc: 'We believe high-quality dentistry shouldn\'t break the bank. We offer competitive rates and transparent pricing.'
  },
  {
    title: 'Customized Treatment Plans',
    desc: 'We understand your smile is unique. We take the time to listen and craft a personalized treatment plan for your desired results.'
  },
  {
    title: 'Premium Dental Care',
    desc: 'We use top-of-the-line materials and equipment to deliver exceptional results and a comfortable experience.'
  },
  {
    title: 'Modern Technology',
    desc: 'Modern technology in dentistry has revolutionized patient care through advancements such as digital imaging for precise visuals.'
  },
  {
    title: '10,000+ Happy Clients',
    desc: 'Our commitment to exceptional care has earned the trust of over 10,000 satisfied patients. Join our growing community of happy smiles!'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="section why-choose">
      <div className="container">
        <p className="section-subtitle">what we do</p>
        <h2 className="section-title">Why Choose Us?</h2>
        <p className="why-intro">
          At Lagankhel Dental Clinic, we believe in providing our patients with treatments 
          which include their involvement at all times. Our patients are the stars where we 
          have set a standard in providing dental care with a feeling of being at home.
        </p>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
