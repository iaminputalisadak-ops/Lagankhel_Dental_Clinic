import { Link } from 'react-router-dom';

const blogPosts = [
  { 
    title: 'Jaw Alignment in Children for a Healthy Smile – Procedure & Benefits', 
    date: 'February 15, 2026', 
    category: 'Dental Braces',
    excerpt: 'A child\'s oral development plays a crucial role in their overall health, facial growth, and confidence. Jaw alignment is an important aspect...'
  },
  { 
    title: 'Full Mouth Dental Implants for a Youthful Facial Appearance', 
    date: 'February 15, 2026', 
    category: 'Dental Implants',
    excerpt: 'A beautiful smile is more than just aesthetics—it plays a major role in defining facial structure, confidence, and overall personality...'
  },
  { 
    title: 'Bleeding Gums vs Periodontitis: Key Differences, Symptoms & Treatment', 
    date: 'February 15, 2026', 
    category: 'Gum Treatment',
    excerpt: 'Gum health is a crucial part of overall oral hygiene, yet it is often ignored until symptoms become severe. Understanding the difference...'
  },
];

export default function BlogPreview() {
  return (
    <section className="section blog-section">
      <div className="container">
        <p className="section-subtitle">Our Top Articles</p>
        <h2 className="section-title">Blog</h2>
        <div className="blog-grid">
          {blogPosts.map((post, i) => (
            <article key={i} className="blog-card">
              <h3>{post.title}</h3>
              <p className="blog-meta">{post.date} | {post.category}</p>
              <p className="blog-excerpt">{post.excerpt}</p>
              <Link to="/blog" className="blog-link">Learn more →</Link>
            </article>
          ))}
        </div>
        <Link to="/blog" className="btn-outline">View All Posts</Link>
      </div>
    </section>
  );
}
