const galleryImages = [
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400',
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400',
  'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400',
  'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400',
  'https://images.unsplash.com/photo-1629909615782-3a4c1b24a8f2?w=400',
];

export default function GallerySection() {
  return (
    <section className="section gallery-section">
      <div className="container">
        <p className="section-subtitle">Our images</p>
        <h2 className="section-title">Gallery</h2>
        <p className="gallery-subtitle">Our Clinic Showcasing</p>
        <div className="gallery-grid">
          {galleryImages.map((img, i) => (
            <div key={i} className="gallery-item">
              <img src={img} alt={`Clinic ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
