import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Solutions from './components/Solutions';
import OurWork from './components/OurWork';
import Industries from './components/Industries';
import About from './components/About';
import ContactModal from './components/ContactModal';

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleOpenContact = () => setIsContactModalOpen(true);

  return (
    <div className="app-root">
      <Header onOpenContact={handleOpenContact} />
      <main>
        <Hero onOpenContact={handleOpenContact} />
        <Services onOpenContact={handleOpenContact} />
        <Solutions onOpenContact={handleOpenContact} />
        <OurWork onOpenContact={handleOpenContact} />
        <Industries onOpenContact={handleOpenContact} />
        <About />
      </main>

      {/* Slide-out Contact Drawer Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}
