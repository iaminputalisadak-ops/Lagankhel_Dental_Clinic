import { Link } from 'react-router-dom';

const blogPosts = [
  { title: 'Jaw Alignment in Children for a Healthy Smile – Procedure & Benefits', date: 'February 15, 2026', category: 'Dental Braces', excerpt: 'A child\'s oral development plays a crucial role in their overall health, facial growth, and confidence. Jaw alignment is an important aspect that affects not just the smile but overall facial harmony.' },
  { title: 'Full Mouth Dental Implants for a Youthful Facial Appearance', date: 'February 15, 2026', category: 'Dental Implants', excerpt: 'A beautiful smile is more than just aesthetics—it plays a major role in defining facial structure, confidence, and overall personality. Full mouth implants can restore both function and appearance.' },
  { title: 'Bleeding Gums vs Periodontitis: Key Differences, Symptoms & Treatment', date: 'February 15, 2026', category: 'Gum Treatment', excerpt: 'Gum health is a crucial part of overall oral hygiene, yet it is often ignored until symptoms become severe. Understanding the difference between bleeding gums and periodontitis is essential.' },
  { title: 'Benefits of Regular Dental Checkups', date: 'January 10, 2026', category: 'General Dentistry', excerpt: 'Regular dental checkups can prevent serious problems and save you time and money in the long run. Learn why bi-annual visits matter.' },
];

export default function Blog() {
  return (
    <div className="page blog-page">
      <section className="page-hero">
        <div className="container">
          <h1>Blog</h1>
          <p>Our Top Articles on Dental Health</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="blog-list">
            {blogPosts.map((post, i) => (
              <article key={i} className="blog-card-full">
                <h3>{post.title}</h3>
                <p className="blog-meta">{post.date} | {post.category}</p>
                <p className="blog-excerpt">{post.excerpt}</p>
                <Link to="/contact" className="blog-link">Learn more →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
