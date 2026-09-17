import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import './Header.css';

export default function Header({ onOpenContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Toggle compact header on scroll
      setIsScrolled(window.scrollY > 20);

      // Detect which section is currently active
      const sectionIds = ['services', 'solutions', 'work', 'industries', 'about', 'case-studies'];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let current = '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            current = id;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Our Work', href: '#work' },
    { label: 'Industries', href: '#industries' },
    { label: 'About Us', href: '#about' },
  ];

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        {/* Brand Logo */}
        <a href="#" className="brand-logo" aria-label="indiecode home">
          <img src="/logo.png" alt="indiecode logo" className="brand-logo-img" />
          <span className="brand-title">indiecode</span>
        </a>

        {/* Desktop Navigation Menu */}
        <nav className="desktop-nav" aria-label="Main Navigation" itemScope itemType="https://schema.org/SiteNavigationElement">
          <ul className="nav-menu">
            {navLinks.map((link, index) => {
              const linkId = link.href.replace('#', '');
              const isActive = activeSection === linkId || (activeSection === 'work' && linkId === 'case-studies');
              return (
                <li
                  key={index}
                  className="nav-item"
                  style={{ '--item-index': index }}
                >
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    itemProp="url"
                  >
                    <span itemProp="name">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Button */}
        <div className="header-actions">
          <button 
            type="button" 
            className="btn-cta" 
            onClick={onOpenContact}
            aria-label="Get in touch with us"
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={16} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {navLinks.map((link, index) => {
            const linkId = link.href.replace('#', '');
            const isActive = activeSection === linkId || (activeSection === 'work' && linkId === 'case-studies');
            return (
              <li key={index}>
                <a
                  href={link.href}
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          <li className="mobile-cta-wrapper">
            <button
              type="button"
              className="btn-cta mobile-cta-btn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onOpenContact) onOpenContact();
              }}
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={16} />
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
