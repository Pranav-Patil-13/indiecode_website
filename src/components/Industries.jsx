import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import {
  Home,
  ShoppingCart,
  Factory,
  GraduationCap,
  SquarePlus,
  Briefcase,
  Truck,
  Coins,
  ConciergeBell,
  LayoutGrid
} from 'lucide-react';
import './Industries.css';

const industriesData = [
  {
    id: 'real-estate',
    number: '01',
    title: 'Real Estate',
    description: 'Property management platforms, broker portals, client dashboards and more.',
    icon: Home,
    image: '/assets/industry1.png'
  },
  {
    id: 'retail-ecommerce',
    number: '02',
    title: 'Retail & E-commerce',
    description: 'Custom online stores, inventory systems, order management and more.',
    icon: ShoppingCart,
    image: '/assets/industry2.png'
  },
  {
    id: 'manufacturing',
    number: '03',
    title: 'Manufacturing',
    description: 'Production tracking, inventory management, dealer portals and internal tools.',
    icon: Factory,
    image: '/assets/industry3.png'
  },
  {
    id: 'education',
    number: '04',
    title: 'Education',
    description: 'Learning management systems, student portals, exam platforms and more.',
    icon: GraduationCap,
    image: '/assets/industry4.png'
  },
  {
    id: 'healthcare',
    number: '05',
    title: 'Healthcare',
    description: 'Patient management systems, appointment scheduling, telemedicine platforms and more.',
    icon: SquarePlus,
    image: '/assets/industry5.png'
  },
  {
    id: 'professional-services',
    number: '06',
    title: 'Professional Services',
    description: 'Client portals, project tracking, team collaboration tools and workflow automation.',
    icon: Briefcase,
    image: '/assets/industry6.png'
  },
  {
    id: 'logistics-transportation',
    number: '07',
    title: 'Logistics & Transportation',
    description: 'Fleet management, shipment tracking, driver apps and real-time dashboards.',
    icon: Truck,
    image: '/assets/industry7.png'
  },
  {
    id: 'finance',
    number: '08',
    title: 'Finance',
    description: 'Custom fintech solutions, customer portals, reporting tools and automation.',
    icon: Coins,
    image: '/assets/industry8.png'
  },
  {
    id: 'hospitality',
    number: '09',
    title: 'Hospitality',
    description: 'Booking systems, guest management, staff tools and customer apps.',
    icon: ConciergeBell,
    image: '/assets/industry9.png'
  },
  {
    id: 'other-businesses',
    number: '10',
    title: 'Other Businesses',
    description: 'Got a unique use case? We love building for new challenges.',
    icon: LayoutGrid,
    image: '/assets/industry10.png'
  }
];

export default function Industries({ onOpenContact }) {
  const [sectionRef, isRevealed] = useScrollReveal({ threshold: 0.15 });

  return (
    <section 
      id="industries" 
      ref={sectionRef} 
      className={`industries-section ${isRevealed ? 'is-revealed' : ''}`} 
      aria-label="Industries Section"
    >
      {/* Background architectural image layer flipped upside down */}
      <div className="industries-bg" />

      {/* Subtle overlay layer for harmony with warm palette */}
      <div className="industries-overlay" />

      <div className="container industries-container">
        {/* Top Bar: Header (Left) and Value Statement (Right) */}
        <div className="industries-top-bar reveal-init">
          <div className="industries-header">
            <span className="industries-eyebrow">INDUSTRIES</span>
            <h2 className="industries-title">
              Software built around <span className="industries-title-highlight">your industry.</span>
            </h2>
          </div>

          <div className="industries-statement-minimal">
            <p className="industries-statement-lead">
              Every industry has unique challenges.
            </p>
            <p className="industries-statement-sub">
              We build custom software, web and mobile applications that solve real problems and create real value.
            </p>
          </div>
        </div>

        {/* 2x5 Grid of 10 Industry Cards */}
        <div className="industries-grid" role="list">
          {industriesData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <article 
                key={item.id} 
                className="industry-card reveal-init" 
                style={{ 
                  transitionDelay: `${0.035 * index}s`, 
                  animationDelay: `${0.035 * index}s` 
                }}
                role="listitem"
              >
                {/* Top content block */}
                <div className="industry-card-body">
                  <div className="industry-card-header">
                    <div className="industry-title-row">
                      <div className="industry-icon-wrap" aria-hidden="true">
                        <IconComponent size={18} strokeWidth={2} />
                      </div>
                      <h3 className="industry-title">{item.title}</h3>
                    </div>
                    <span className="industry-number">{item.number}</span>
                  </div>
                </div>

                {/* Bottom thumbnail image with hover description overlay */}
                {item.image ? (
                  <div className="industry-thumbnail-wrap">
                    <img
                      src={item.image}
                      alt={`${item.title} industry preview`}
                      className="industry-thumbnail-img"
                      loading="lazy"
                    />
                    <div className="industry-desc-overlay">
                      <p className="industry-hover-desc">{item.description}</p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="industry-thumbnail-placeholder"
                    aria-label={`${item.title} preview placeholder`}
                  >
                    <div className="industry-placeholder-canvas" />
                    <div className="industry-desc-overlay">
                      <p className="industry-hover-desc">{item.description}</p>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Floating Bottom Banner with CTA & Key Metrics */}
        <div className="industries-bottom-banner reveal-init reveal-delay-3">
          {/* Part 1: Copy + CTA Action */}
          <div className="industries-banner-left">
            <div className="industries-banner-copy">
              <h3 className="industries-banner-heading">Don't see your industry?</h3>
              <p className="industries-banner-subtext">
                We work with businesses of all sizes. Tell us about your idea — we'll help you build the right solution.
              </p>
            </div>

            <div className="industries-banner-action">
              <button 
                type="button" 
                onClick={onOpenContact} 
                className="industries-cta-btn" 
                aria-label="Discuss Your Project"
              >
                <span>Discuss Your Project</span>
                <span className="industries-cta-arrow">→</span>
              </button>
            </div>
          </div>

          {/* Divider between Part 1 and Part 2 */}
          <span className="industries-banner-divider" aria-hidden="true" />

          {/* Part 2: Key Metrics Stats */}
          <div className="industries-banner-stats">
            <div className="industry-stat-item">
              <span className="industry-stat-number">50+</span>
              <span className="industry-stat-label">Happy Clients</span>
            </div>
            <div className="industry-stat-item">
              <span className="industry-stat-number">10+</span>
              <span className="industry-stat-label">Industries</span>
            </div>
            <div className="industry-stat-item">
              <span className="industry-stat-number">100%</span>
              <span className="industry-stat-label">Custom Solutions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
