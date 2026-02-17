import { useState } from 'react';
import { Link } from 'react-router-dom';
import BookAppointmentModal from '../components/BookAppointmentModal';
import Hero from '../components/sections/Hero';
import AboutSection from '../components/sections/AboutSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Services from '../components/sections/Services';
import Stats from '../components/sections/Stats';
import Team from '../components/sections/Team';
import GallerySection from '../components/sections/GallerySection';
import BlogPreview from '../components/sections/BlogPreview';
import BookCta from '../components/sections/BookCta';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Hero onBookClick={() => setShowModal(true)} />
      <AboutSection />
      <WhyChooseUs />
      <Services />
      <Stats />
      <Team />
      <GallerySection />
      <BlogPreview />
      <BookCta onBookClick={() => setShowModal(true)} />
      <BookAppointmentModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
