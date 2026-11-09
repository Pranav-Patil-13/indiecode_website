import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Solutions from './components/Solutions';
import Industries from './components/Industries';
import About from './components/About';
import ContactModal from './components/ContactModal';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname.toLowerCase();
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname.toLowerCase());
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path.toLowerCase());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => setIsContactModalOpen(true);

  // Check if current route is Blog List (/blog)
  if (currentPath === '/blog' || currentPath === '/blog/') {
    return (
      <div className="app-root">
        <BlogList 
          onOpenContact={handleOpenContact} 
          onNavigate={navigate} 
        />
        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)} 
        />
      </div>
    );
  }

  // Check if current route is an Individual Blog Post (/blog/:slug)
  if (currentPath.startsWith('/blog/')) {
    const slug = currentPath.replace(/^\/blog\//, '').replace(/\/$/, '');
    return (
      <div className="app-root">
        <BlogPost 
          slug={slug} 
          onOpenContact={handleOpenContact} 
          onNavigate={navigate} 
        />
        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)} 
        />
      </div>
    );
  }

  // Check if current route is Privacy Policy
  if (currentPath === '/privacy' || currentPath === '/privacy-policy') {
    return (
      <div className="app-root">
        <PrivacyPolicy 
          onOpenContact={handleOpenContact} 
          onNavigate={navigate} 
        />
        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)} 
        />
      </div>
    );
  }

  // Check if current route is Terms & Conditions
  if (currentPath === '/terms' || currentPath === '/terms-and-conditions' || currentPath === '/terms-of-service') {
    return (
      <div className="app-root">
        <Terms 
          onOpenContact={handleOpenContact} 
          onNavigate={navigate} 
        />
        <ContactModal 
          isOpen={isContactModalOpen} 
          onClose={() => setIsContactModalOpen(false)} 
        />
      </div>
    );
  }

  // Default: Main Landing Page
  return (
    <div className="app-root">
      <Header onOpenContact={handleOpenContact} onNavigate={navigate} />
      <main>
        <Hero onOpenContact={handleOpenContact} />
        <Solutions onOpenContact={handleOpenContact} />
        <Industries onOpenContact={handleOpenContact} />
        <About onNavigate={navigate} />
      </main>

      {/* Slide-out Contact Drawer Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}

