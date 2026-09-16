import React from 'react';
import './Hero.css';

export default function Hero({ onOpenContact }) {
  return (
    <section id="hero" className="hero-section" aria-label="Hero Section">
      {/* Flipped background image layer */}
      <div className="hero-bg" />

      {/* Subtle overlay for gradient and palette harmony */}
      <div className="hero-overlay" />
      
      {/* Diagonal capabilities line running from bottom-left to top-right at 324deg */}
      <div className="hero-diagonal-ribbon" aria-hidden="true">
        <div className="hero-diagonal-track">
          {[1, 2, 3, 4].map((groupNum) => (
            <div key={groupNum} className="hero-diagonal-group" aria-hidden={groupNum > 1}>
              <span className="capability-item">Software</span>
              <span className="capability-dot">•</span>
              <span className="capability-item">Automation</span>
              <span className="capability-dot">•</span>
              <span className="capability-item">Integrations</span>
              <span className="capability-dot">•</span>
              <span className="capability-item">Web Apps</span>
              <span className="capability-dot">•</span>
              <span className="capability-item">Business Software</span>
              <span className="capability-dot">•</span>
              <span className="capability-item">Digital Products</span>
              <span className="capability-dot">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Left-aligned hero content */}
      <div className="container hero-container">
        <div className="hero-content-left">
          <h1 className="hero-title">
            <span className="hero-title-line">Custom softwares&nbsp;—</span>
            <span className="hero-title-highlight">shipped in weeks.</span>
          </h1>

          <p className="hero-description">
            We architect and build high-performance web apps, enterprise software, and scalable digital products tailored to your business goals.
          </p>

          <div className="hero-cta-group">
            <button 
              type="button" 
              className="hero-btn-primary" 
              onClick={onOpenContact}
              aria-label="Start a Project"
            >
              <span>Start a Project</span>
              <span className="hero-btn-arrow">→</span>
            </button>
            <a href="#work" className="hero-btn-secondary">
              See Our Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
