import React from 'react';
import './Hero.css';

export default function Hero({ onOpenContact }) {
  return (
    <section id="hero" className="hero-section" aria-label="Hero Section">
      {/* 3D Fluted Slat background layer */}
      <div className="hero-bg" />

      {/* Luminous centered radial spotlight for optimal typography contrast */}
      <div className="hero-overlay" />

      {/* Centered Minimal Architectural Hero Content */}
      <div className="container hero-container">
        <div className="hero-content-center">
          {/* Display Headline */}
          <h1 className="hero-title">
            <span className="hero-title-line">We build production software</span>
            <span className="hero-title-highlight">
              and ship in{' '}
              <span className="hero-strike" aria-label="not months">
                months
              </span>{' '}
              weeks.
            </span>
          </h1>

          {/* Value Proposition Description */}
          <p className="hero-description">
            We architect and build high-performance web apps, enterprise software, and scalable digital products tailored to your business goals.
          </p>

          {/* Dual Action CTAs */}
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
            <a href="#solutions" className="hero-btn-secondary">
              Explore Solutions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
