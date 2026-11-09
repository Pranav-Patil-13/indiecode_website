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
        {/* Top Header */}
        <div className="industries-top-bar reveal-init">
          <div className="industries-header">
            <span className="industries-eyebrow">INDUSTRIES</span>
            <h2 className="industries-title">
              For every industry.
            </h2>
          </div>
        </div>

        {/* 3x3 Grid of 9 Industry Cards + 1 Full-Width Spotlight Card */}
        <div className="industries-grid" role="list">
          {industriesData.map((item, index) => {
            const IconComponent = item.icon;
            const isSpotlight = index === 9;

            if (isSpotlight) {
              return (
                <article
                  key={item.id}
                  className="industry-card industry-card-spotlight reveal-init"
                  style={{
                    transitionDelay: `${0.035 * index}s`,
                    animationDelay: `${0.035 * index}s`
                  }}
                  role="listitem"
                >
                  <div className="industry-spotlight-inner">
                    <div className="industry-spotlight-content">
                      <div className="industry-spotlight-tag-row">
                        <span className="industry-number">010</span>
                        <span className="industry-spotlight-pill">Custom Engineering</span>
                      </div>
                      <h3 className="industry-spotlight-title">
                        Got a unique use case or emerging domain?
                      </h3>
                      <p className="industry-spotlight-desc">
                        We build bespoke, production-ready systems tailored around proprietary workflows, deep-tech integrations, and novel operational requirements.
                      </p>
                      <button
                        type="button"
                        className="industry-spotlight-cta"
                        onClick={onOpenContact}
                        aria-label="Start a Project for Custom Domains"
                      >
                        <span>Start a Project</span>
                        <span className="industry-spotlight-arrow">→</span>
                      </button>
                    </div>

                    <div className="industry-spotlight-media">
                      <img
                        src={item.image}
                        alt="Custom domain preview"
                        className="industry-spotlight-img"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </article>
              );
            }

            return (
              <article 
                key={item.id} 
                className="industry-card reveal-init" 
                style={{ 
                  transitionDelay: `${0.035 * index}s`, 
                  animationDelay: `${0.035 * index}s` 
                }}
                role="listitem"
                onClick={onOpenContact}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onOpenContact(); }}
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
      </div>
    </section>
  );
}
