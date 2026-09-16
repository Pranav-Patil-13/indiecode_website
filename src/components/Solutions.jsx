import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import {
  Building2,
  Users,
  ShoppingCart,
  BarChart3,
  Layers,
  User,
  Link2,
  Smartphone,
  Database,
  ArrowRight
} from 'lucide-react';
import './Solutions.css';

const solutionsData = [
  {
    id: 'internal-platforms',
    icon: Building2,
    title: 'Internal Platforms',
    description: 'Custom portals, dashboards and tools to streamline your operations.'
  },
  {
    id: 'hr-workforce',
    icon: Users,
    title: 'HR & Workforce Management',
    description: 'HRMS, attendance, leave, payroll and employee self-service systems.'
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    description: 'Scalable online stores with custom features and integrations.'
  },
  {
    id: 'automation',
    icon: BarChart3,
    title: 'Business Automation',
    description: 'Automate repetitive tasks and complex workflows to save time and cost.'
  },
  {
    id: 'saas',
    icon: Layers,
    title: 'SaaS Products',
    description: 'MVPs and full-scale SaaS platforms built for growth.'
  },
  {
    id: 'client-portals',
    icon: User,
    title: 'Client Portals',
    description: 'Secure portals for your clients, partners or vendors.'
  },
  {
    id: 'api-integrations',
    icon: Link2,
    title: 'API Integrations',
    description: 'Connect your systems with third-party tools and services.'
  },
  {
    id: 'mobile-apps',
    icon: Smartphone,
    title: 'Mobile Applications',
    description: 'Cross-platform mobile apps for your business needs.'
  },
  {
    id: 'data-reporting',
    icon: Database,
    title: 'Data & Reporting',
    description: 'Custom reporting tools and data dashboards for better decisions.'
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
            Built for <span className="solutions-title-highlight">real businesses.</span>
          </h2>
          <p className="solutions-subtitle">
            Custom software solutions designed around your industry, team and goals.
          </p>
        </div>

        {/* 3x3 Solutions Card Grid */}
        <div className="solutions-grid" role="list">
          {solutionsData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={item.id} 
                className="solution-card reveal-init" 
                style={{ 
                  transitionDelay: `${0.04 * index}s`, 
                  animationDelay: `${0.04 * index}s` 
                }}
                role="listitem"
              >
                <div className="solution-card-top">
                  <div className="solution-icon-wrap" aria-hidden="true">
                    <IconComponent size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="solution-card-title">{item.title}</h3>
                </div>

                <div className="solution-card-bottom">
                  <p className="solution-card-desc">{item.description}</p>
                  <button
                    className="solution-arrow-btn"
                    aria-label={`Explore ${item.title}`}
                  >
                    <ArrowRight size={16} strokeWidth={2} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Tagline & CTA Bar */}
        <div className="solutions-bottom-bar reveal-init reveal-delay-3">
          <div className="solutions-tagline-group">
            <span className="solutions-accent-line" aria-hidden="true" />
            <span className="solutions-tagline">TECHNOLOGY FOR A BRIGHTER TOMORROW</span>
          </div>

          <button 
            type="button" 
            onClick={onOpenContact} 
            className="solutions-cta-btn" 
            aria-label="Start a Project"
          >
            <span>Start a Project</span>
            <span className="solutions-cta-arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
