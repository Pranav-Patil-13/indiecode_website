import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Services.css';

export default function Services({ onOpenContact }) {
  const [sectionRef, isRevealed] = useScrollReveal({ threshold: 0.15 });

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className={`services-section ${isRevealed ? 'is-revealed' : ''}`} 
      aria-label="Services Section"
    >
      {/* Background architectural image layer */}
      <div className="services-bg" />

      {/* Subtle overlay for visual harmony with palette */}
      <div className="services-overlay" />

      {/* Container: Top header spanning full width, bottom split into description + services */}
      <div className="container services-container">
        <div className="services-header-top reveal-init">
          <span className="services-eyebrow">WHAT WE DO</span>
          <h2 className="services-title">
            Engineering software that scales with your ambition.
          </h2>
        </div>

        <div className="services-body-row">
          <div className="services-description-col reveal-init reveal-delay-1">
            <p className="services-description">
              From initial product architecture to high-load deployments, we craft robust, bespoke systems engineered for velocity, security, and enterprise performance.
            </p>

            {/* 3-Step Process Flow: 01 DISCOVER → 02 BUILD → 03 LAUNCH */}
            <div className="services-workflow-row" aria-label="Our Delivery Process">
              <div className="workflow-step">
                <span className="workflow-num">01</span>
                <span className="workflow-name">DISCOVER</span>
              </div>
              <span className="workflow-divider">→</span>
              <div className="workflow-step">
                <span className="workflow-num">02</span>
                <span className="workflow-name">BUILD</span>
              </div>
              <span className="workflow-divider">→</span>
              <div className="workflow-step">
                <span className="workflow-num">03</span>
                <span className="workflow-name">LAUNCH</span>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="services-action-wrap">
              <button 
                type="button" 
                onClick={onOpenContact} 
                className="services-cta-primary"
                aria-label="Start a Project"
              >
                <span>Start a Project</span>
                <span className="services-cta-arrow">→</span>
              </button>
            </div>
          </div>

          {/* Right side services list matching screenshot */}
        <div className="services-list-right" aria-label="Our Core Services">
          <div className="service-item reveal-init reveal-delay-1">
            <span className="service-number">01</span>
            <div className="service-content">
              <h3 className="service-name">Custom Software Development</h3>
              <p className="service-detail">
                Web applications, internal tools and digital products built around your workflow.
              </p>
            </div>
            <button className="service-arrow-btn" aria-label="Learn more about Custom Software Development">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          <div className="service-item reveal-init reveal-delay-2">
            <span className="service-number">02</span>
            <div className="service-content">
              <h3 className="service-name">Automation & Integrations</h3>
              <p className="service-detail">
                Streamline operations with intelligent automations and seamless third-party integrations.
              </p>
            </div>
            <button className="service-arrow-btn" aria-label="Learn more about Automation & Integrations">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          <div className="service-item reveal-init reveal-delay-3">
            <span className="service-number">03</span>
            <div className="service-content">
              <h3 className="service-name">Cloud & Scalable Infrastructure</h3>
              <p className="service-detail">
                Secure, high-performance infrastructure designed to grow with your business.
              </p>
            </div>
            <button className="service-arrow-btn" aria-label="Learn more about Cloud & Scalable Infrastructure">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          <div className="service-item reveal-init reveal-delay-4">
            <span className="service-number">04</span>
            <div className="service-content">
              <h3 className="service-name">AI & Intelligent Systems</h3>
              <p className="service-detail">
                Bespoke AI solutions, data workflows and intelligent agents to help you do more with less.
              </p>
            </div>
            <button className="service-arrow-btn" aria-label="Learn more about AI & Intelligent Systems">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
