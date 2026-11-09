import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { ArrowRight } from 'lucide-react';
import './Solutions.css';

const solutionsData = [
  {
    id: 'internal-platforms',
    title: 'Internal Platforms',
    image: '/assets/solutions/internal-platforms.jpg?v=4'
  },
  {
    id: 'hr-workforce',
    title: 'HR & Workforce Management',
    image: '/assets/solutions/hr-workforce.jpg?v=4'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Solutions',
    image: '/assets/solutions/ecommerce.jpg?v=4'
  },
  {
    id: 'automation',
    title: 'Business Automation',
    image: '/assets/solutions/automation.jpg?v=4'
  },
  {
    id: 'saas',
    title: 'SaaS Products',
    image: '/assets/solutions/saas.jpg?v=4'
  },
  {
    id: 'client-portals',
    title: 'Client Portals',
    image: '/assets/solutions/client-portals.jpg?v=4'
  },
  {
    id: 'api-integrations',
    title: 'API Integrations',
    image: '/assets/solutions/api-integrations.jpg?v=4'
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Applications',
    image: '/assets/solutions/mobile-apps.jpg?v=4'
  },
  {
    id: 'data-reporting',
    title: 'Data & Reporting',
    image: '/assets/solutions/data-reporting.jpg?v=4'
  }
];

export default function Solutions({ onOpenContact }) {
  const [sectionRef, isRevealed] = useScrollReveal({ threshold: 0.15 });

  return (
    <section 
      id="solutions" 
      ref={sectionRef} 
      className={`solutions-section ${isRevealed ? 'is-revealed' : ''}`} 
      aria-label="Solutions Section"
    >
      {/* Background architectural image layer */}
      <div className="solutions-bg" />

      {/* Subtle overlay for visual harmony with palette */}
      <div className="solutions-overlay" />

      {/* Solutions Container */}
      <div className="container solutions-container">
        {/* Header Block */}
        <div className="solutions-header reveal-init">
          <span className="solutions-eyebrow">SOLUTIONS</span>
          <h2 className="solutions-title">
            For every need.
          </h2>
        </div>

        {/* 3x3 Solutions Card Grid */}
        <div className="solutions-grid" role="list">
          {solutionsData.map((item, index) => {
            return (
              <div 
                key={item.id} 
                className="solution-card reveal-init" 
                style={{ 
                  transitionDelay: `${0.04 * index}s`, 
                  animationDelay: `${0.04 * index}s` 
                }}
                role="listitem"
                onClick={onOpenContact}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onOpenContact(); }}
              >
                {/* Left Side: Portrait Image Vignette */}
                <div className="solution-portrait-wrap">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="solution-portrait-img" 
                    loading="lazy" 
                  />
                  <div className="solution-portrait-overlay" />
                </div>

                {/* Right Side: Meta, Title & Action */}
                <div className="solution-card-content">
                  <div className="solution-card-meta">
                    <span className="solution-card-num">{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <h3 className="solution-card-title">{item.title}</h3>

                  <div className="solution-card-action">
                    <span className="solution-explore-label">Explore</span>
                    <button
                      type="button"
                      className="solution-arrow-btn"
                      aria-label={`Explore ${item.title}`}
                      tabIndex={-1}
                    >
                      <ArrowRight size={14} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
