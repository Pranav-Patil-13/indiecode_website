import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { ArrowRight } from 'lucide-react';
import './OurWork.css';

const projectsData = [
  {
    id: 'hrms-platform',
    number: '01',
    title: 'HRMS Platform',
    description: 'A complete HR and workforce management system for modern teams.',
    image: '/assets/card1.png'
  },
  {
    id: 'ecommerce-platform',
    number: '02',
    title: 'E-commerce Platform',
    description: 'A scalable online store with custom features and third-party integrations.',
    image: '/assets/card2.png'
  },
  {
    id: 'lms-platform',
    number: '03',
    title: 'Learning Management System',
    description: 'An interactive LMS built for seamless learning and course delivery.',
    image: '/assets/card3.png'
  },
  {
    id: 'client-portal',
    number: '04',
    title: 'Client Portal',
    description: 'A secure client portal for project tracking, file sharing and communication.',
    image: '/assets/card4.png'
  },
  {
    id: 'business-automation',
    number: '05',
    title: 'Business Automation Tools',
    description: 'Custom automation tools to streamline daily operations and reduce manual work.',
    image: '/assets/card5.png'
  },
  {
    id: 'custom-web-app',
    number: '06',
    title: 'Custom Web Application',
    description: 'A tailored solution built around unique business requirements.',
    image: '/assets/card6.png'
  }
];

export default function OurWork({ onOpenContact }) {
  const [sectionRef, isRevealed] = useScrollReveal({ threshold: 0.15 });

  return (
    <section 
      id="work" 
      ref={sectionRef} 
      className={`work-section ${isRevealed ? 'is-revealed' : ''}`} 
      aria-label="Our Work Section"
    >
      {/* Anchor for case-studies navigation */}
      <span id="case-studies" className="section-anchor" aria-hidden="true" />

      {/* Background architectural image layer */}
      <div className="work-bg" />

      {/* Subtle overlay for visual harmony with palette */}
      <div className="work-overlay" />

      <div className="container work-container">
        <div className="work-split-layout">
          {/* Left Column: Header Block & 6 Project Cards */}
          <div className="work-split-left">
            <div className="work-header-block reveal-init">
              <span className="work-eyebrow">OUR WORK</span>
              <h2 className="work-title">
                Software <span className="work-title-highlight">that makes</span> an impact.
              </h2>
            </div>

            {/* 3x2 Project Cards Grid */}
            <div className="work-grid" role="list">
              {projectsData.map((project, index) => (
                <div 
                  key={project.id} 
                  className="work-card reveal-init" 
                  style={{ 
                    transitionDelay: `${0.05 * index}s`, 
                    animationDelay: `${0.05 * index}s` 
                  }}
                  role="listitem"
                >
                  {/* Card Thumbnail Image */}
                  <div className="work-card-thumbnail">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.title} Preview`}
                        className="work-thumbnail-img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="thumbnail-empty-surface" />
                    )}
                  </div>

                  {/* Card Details Area */}
                  <div className="work-card-body">
                    <span className="work-card-number">{project.number}</span>

                    <div className="work-card-info">
                      <h3 className="work-card-title">{project.title}</h3>
                      <p className="work-card-desc">{project.description}</p>
                    </div>

                    <button
                      className="work-arrow-btn"
                      aria-label={`View details for ${project.title}`}
                    >
                      <ArrowRight size={14} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Big Quote & Bottom Footer CTA */}
          <div className="work-split-right reveal-init reveal-delay-2">
            <div className="work-quote-card">
              <blockquote className="work-big-quote">
                <span className="quote-glyph quote-glyph-start" aria-hidden="true">“</span>
                A selection of projects we've built for startups, growing businesses and enterprises — turning ideas into real, working solutions.
                <span className="quote-glyph quote-glyph-end" aria-hidden="true">”</span>
              </blockquote>
              <div className="quote-meta">
                <span className="quote-line-dash" aria-hidden="true" />
                <span className="quote-badge">TECHNOLOGY FOR A BRIGHTER TOMORROW</span>
              </div>
            </div>

            {/* Bottom Conversion CTA in Start a Project Button Theme */}
            <div className="work-right-footer">
              <button
                type="button"
                onClick={onOpenContact}
                className="work-cta-banner-btn"
                aria-label="Have a project in mind? Let's build something great together."
              >
                <div className="cta-banner-content">
                  <div className="cta-banner-eyebrow-row">
                    <span className="cta-banner-dash" aria-hidden="true" />
                    <span className="cta-banner-eyebrow">HAVE A PROJECT IN MIND?</span>
                  </div>
                  <h3 className="cta-banner-headline">Let's build something great together.</h3>
                </div>

                <div className="cta-banner-action">
                  <span className="cta-banner-arrow" aria-hidden="true">→</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
