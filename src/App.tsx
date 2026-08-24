/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import BackgroundVideoScrub from './components/BackgroundVideoScrub';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ShowcaseOrbitSection from './components/ShowcaseOrbitSection';
import ReviewSection from './components/ReviewSection';
import ContactSection from './components/ContactSection';
import ShowcaseModal from './components/ShowcaseModal';
import ServiceModal from './components/ServiceModal';
import CostEstimatorModal from './components/CostEstimatorModal';
import { ShowcaseItem, ServiceItem } from './types';

export default function App() {
  const [selectedShowcase, setSelectedShowcase] = useState<ShowcaseItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen bg-brand-dark text-neutral-100 selection:bg-brand-blue/30 selection:text-brand-yellow">
      {/* Scroll-Driven Scrubbing Video Background */}
      <BackgroundVideoScrub />

      {/* Navigation Bar (Desktop fixed floating glass bar, hidden on mobile) */}
      <Navbar />

      {/* Main Content Sections (Strictly ordered: Home, About, Services, Showcase, Review, Contact) */}
      <main className="relative z-10">
        {/* 1. Home Section */}
        <HeroSection onOpenEstimator={() => setIsEstimatorOpen(true)} />

        {/* 2. About Section (With Scroll-Driven Video & Company Details) */}
        <AboutSection />

        {/* 3. Services Section (Grid with scroll fade-in and dynamic screen size adjustment) */}
        <ServicesSection onSelectService={(s) => setSelectedService(s)} />

        {/* 4. Showcase Section (3D Circular Orbit Gallery rotating on scroll) */}
        <ShowcaseOrbitSection onSelectItem={(item) => setSelectedShowcase(item)} />

        {/* 5. Review Section (Floating review cards drifting gently) */}
        <ReviewSection />

        {/* 6. Contact Section (Standard contact layout + Strong Closing Slogan: "Jahit Karya, Dukung Lokal.") */}
        <ContactSection />
      </main>

      {/* Modals & Overlays */}
      <ShowcaseModal
        item={selectedShowcase}
        onClose={() => setSelectedShowcase(null)}
      />

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

      <CostEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
      />
    </div>
  );
}
