import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, ChevronDown } from 'lucide-react';
import './Header.css';

export default function Header({ onOpenContact, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Toggle compact header on scroll
      setIsScrolled(window.scrollY > 20);

      // Detect which section is currently active
      const sectionIds = ['solutions', 'industries', 'about'];
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

  const productsList = [
    {
      name: 'Indiecode HRMS',
      tagline: 'Workforce, payroll & attendance platform',
      href: 'https://hrms.indiecode.in',
      badge: 'In-house'
    },
    {
      name: 'Indiecode CRM',
      tagline: 'Client relationships & sales pipeline automation',
      href: 'https://crm.indiecode.in',
      badge: 'In-house'
    }
  ];

  const handleLinkClick = (e, link) => {
    if (link.isRoute) {
      e.preventDefault();
      if (onNavigate) {
        onNavigate(link.href);
      } else {
        window.location.assign(link.href);
      }
    }
  };

  return (
    <>
      {/* Hidden SVG Filter for Liquid Glass Refraction */}
      <svg
        className="liquid-glass-svg-defs"
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
      >
        <defs>
          <filter id="liquid-glass-filter" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="3" result="smoothed" />
            <feDisplacementMap in="SourceGraphic" in2="smoothed" scale="24" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        {/* Optical Liquid Glass Backdrop Layer */}
        <div className="site-header-glass" aria-hidden="true" />

        <div className="container header-container">
        {/* Brand Logo */}
        <a 
          href="#" 
          className="brand-logo" 
          aria-label="indiecode home"
          onClick={(e) => {
            if (window.location.pathname !== '/' && onNavigate) {
              e.preventDefault();
              onNavigate('/');
            }
          }}
        >
          <img src="/logo.png" alt="indiecode logo" className="brand-logo-img" />
          <span className="brand-title">indiecode</span>
        </a>

        {/* Desktop Navigation Menu */}
        <nav className="desktop-nav" aria-label="Main Navigation" itemScope itemType="https://schema.org/SiteNavigationElement">
          <ul className="nav-menu">
            {/* Products Dropdown Menu (First Tab) */}
            <li 
              className={`nav-item nav-dropdown ${isProductsDropdownOpen ? 'open' : ''}`}
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <button
                type="button"
                className="nav-link nav-dropdown-trigger"
                onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                aria-expanded={isProductsDropdownOpen}
                aria-haspopup="true"
              >
                <span>Products</span>
                <ChevronDown size={13} className="nav-chevron" />
              </button>

              {/* Frosted Dropdown Menu */}
              <div className="nav-dropdown-menu" role="menu">
                <div className="nav-dropdown-inner">
                  <div className="nav-dropdown-header">
                    <span className="nav-dropdown-eyebrow">IN-HOUSE PLATFORMS</span>
                  </div>
                  {productsList.map((prod, pIdx) => (
                    <a
                      key={pIdx}
                      href={prod.href}
                      className="nav-dropdown-item"
                      role="menuitem"
                      target={prod.href.startsWith('http') ? '_blank' : undefined}
                      rel={prod.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={() => setIsProductsDropdownOpen(false)}
                    >
                      <div className="nav-dropdown-item-body">
                        <div className="nav-dropdown-item-title-row">
                          <span className="nav-dropdown-item-name">{prod.name}</span>
                          <span className="nav-dropdown-badge">{prod.badge}</span>
                          <ArrowUpRight size={13} className="nav-dropdown-item-arrow" />
                        </div>
                        <span className="nav-dropdown-item-desc">{prod.tagline}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </li>

            {/* Solutions Link */}
            <li className="nav-item">
              <a
                href="#solutions"
                className={`nav-link ${activeSection === 'solutions' ? 'active' : ''}`}
                aria-current={activeSection === 'solutions' ? 'page' : undefined}
                itemProp="url"
              >
                <span itemProp="name">Solutions</span>
              </a>
            </li>

            {/* Industries Link */}
            <li className="nav-item">
              <a
                href="#industries"
                className={`nav-link ${activeSection === 'industries' ? 'active' : ''}`}
                aria-current={activeSection === 'industries' ? 'page' : undefined}
                itemProp="url"
              >
                <span itemProp="name">Industries</span>
              </a>
            </li>

            {/* About Us Link */}
            <li className="nav-item">
              <a
                href="#about"
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                aria-current={activeSection === 'about' ? 'page' : undefined}
                itemProp="url"
              >
                <span itemProp="name">About Us</span>
              </a>
            </li>

            {/* Blog Link */}
            <li className="nav-item">
              <a
                href="/blog"
                className="nav-link"
                itemProp="url"
                onClick={(e) => handleLinkClick(e, { label: 'Blog', href: '/blog', isRoute: true })}
              >
                <span itemProp="name">Blog</span>
              </a>
            </li>
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
          {/* Mobile Products Accordion (First Tab) */}
          <li className="mobile-nav-group">
            <button
              type="button"
              className="mobile-nav-link mobile-group-trigger"
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
            >
              <span>Products</span>
              <ChevronDown size={16} className={`mobile-chevron ${mobileProductsOpen ? 'rotate' : ''}`} />
            </button>
            {mobileProductsOpen && (
              <ul className="mobile-sublinks">
                {productsList.map((prod, pIdx) => (
                  <li key={pIdx}>
                    <a
                      href={prod.href}
                      className="mobile-sublink"
                      onClick={() => setIsMobileMenuOpen(false)}
                      target={prod.href.startsWith('http') ? '_blank' : undefined}
                      rel={prod.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <span className="mobile-sublink-name">{prod.name}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <a href="#solutions" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Solutions
            </a>
          </li>

          <li>
            <a href="#industries" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              Industries
            </a>
          </li>
          <li>
            <a href="#about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </a>
          </li>
          <li>
            <a
              href="/blog"
              className="mobile-nav-link"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleLinkClick(e, { label: 'Blog', href: '/blog', isRoute: true });
              }}
            >
              Blog
            </a>
          </li>
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
    </>
  );
}
