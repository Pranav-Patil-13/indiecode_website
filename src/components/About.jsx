import React, { useState, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { 
  ArrowUpRight, 
  Mail, 
  Phone, 
  MapPin, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  FileText,
  Lock,
  X
} from 'lucide-react';
import './About.css';

const LEGAL_DOCS = {
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'How indiecode collects, protects, and manages confidential client & project data.',
    sections: [
      {
        heading: '1. Information We Collect',
        content: 'We collect information provided directly by clients and partners, including business contact details (name, email, phone), company specifications, and project scope details submitted through our contact forms or discovery sessions.'
      },
      {
        heading: '2. Use of Information',
        content: 'Information is utilized strictly to evaluate technical feasibility, prepare architectural proposals, fulfill contractual engineering obligations, and communicate sprint progress. We never sell, rent, or monetize your information.'
      },
      {
        heading: '3. Intellectual Property & Confidentiality',
        content: 'All discovery documents, proprietary source code, wireframes, and architectural schematics shared with indiecode are protected under strict mutual non-disclosure agreements (NDAs) and role-based access protocols.'
      },
      {
        heading: '4. Data Retention & Deletion Rights',
        content: 'Clients may request the full export or permanent deletion of their correspondence and staging assets from our systems at any time by contacting hello@indiecode.in.'
      }
    ]
  },
  terms: {
    title: 'Terms & Conditions',
    subtitle: 'Standard commercial and engineering agreements governing engagements with indiecode.',
    sections: [
      {
        heading: '1. Engagement Scope',
        content: 'All custom software development, UI/UX design, and cloud architecture engagements are executed under mutually agreed Statements of Work (SOW) specifying deliverables, sprint milestones, and acceptance criteria.'
      },
      {
        heading: '2. Intellectual Property Ownership',
        content: 'Upon full settlement of agreed invoice milestones, all custom source code, repositories, design assets, and database schemas created for the engagement are assigned 100% to the client with unrestricted ownership.'
      },
      {
        heading: '3. Warranty & Quality Assurance',
        content: 'We offer a 30-day post-delivery bug-fixing warranty on custom deliverables to resolve unforeseen defects or deviations from approved acceptance criteria without added cost.'
      },
      {
        heading: '4. Governing Law & Jurisdiction',
        content: 'These terms are governed by and construed in accordance with the laws of India, subject to the jurisdiction of the competent courts in Nashik, Maharashtra.'
      }
    ]
  },
  security: {
    title: 'Security & Trust',
    subtitle: 'Our technical, architectural, and organizational commitments to enterprise security.',
    sections: [
      {
        heading: '1. Secure Engineering Lifecycle',
        content: 'We design software aligned with OWASP Top 10 guidelines. Every production release undergoes automated linting, vulnerability scanning (SAST), and mandatory peer code reviews.'
      },
      {
        heading: '2. Environment & Credential Isolation',
        content: 'Production infrastructure and staging environments are strictly decoupled. API keys, database credentials, and secrets are managed via encrypted secret vaults with zero hardcoding in source control.'
      },
      {
        heading: '3. Infrastructure Resilience',
        content: 'We employ automated CI/CD deployment pipelines, zero-downtime rolling updates, cloud database replication, and encrypted daily snapshots across cloud infrastructure.'
      },
      {
        heading: '4. Team Vetting & Bilateral NDAs',
        content: 'All indiecode engineers and designers undergo background verification and sign legally binding bilateral confidentiality agreements before touching client repositories.'
      }
    ]
  }
};

export default function About() {
  const [sectionRef, isRevealed] = useScrollReveal({ threshold: 0.15 });
  const [legalDoc, setLegalDoc] = useState(null); // 'privacy' | 'terms' | 'security' | null
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Handle ESC key and scroll locking when legal modal is active
  useEffect(() => {
    if (!legalDoc) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLegalDoc(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [legalDoc]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in your name, email, and project message.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message. Please try again or email us directly.');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
      });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 7000);
    } catch (err) {
      console.error('Contact form submission error:', err);
      setSubmitStatus('error');
      setErrorMessage(err.message || 'Unable to send message right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className={`about-section ${isRevealed ? 'is-revealed' : ''}`} 
      aria-label="About Us Section"
    >
      {/* Background architectural image layer */}
      <div className="about-bg" />

      {/* Subtle overlay layer for harmony with warm palette */}
      <div className="about-overlay" />

      {/* Main two-part split container */}
      <div className="about-container">
        {/* Left Part: Editorial Statement & Footer */}
        <div className="about-col about-col-left">
          <div className="about-content reveal-init">
            <span className="about-eyebrow">ABOUT US</span>
            <h2 className="about-headline">
              We believe great software comes from <span className="about-highlight">ownership</span> —
              <span className="about-headline-sub">that’s why every product we build is treated like our own.</span>
            </h2>
          </div>

          {/* Bottom Left Footer: Founders, Socials & Copyright */}
          <div className="about-left-footer reveal-init reveal-delay-2">
            {/* Founders Showcase */}
            <div className="about-founders-row" aria-label="indiecode leadership">
              <div className="about-founder-chip">
                <div className="about-founder-avatar-wrap">
                  <img
                    src="/assets/founder.png"
                    alt="Pranav Patil - Founder"
                    className="about-founder-avatar"
                    loading="lazy"
                  />
                </div>
                <div className="about-founder-meta">
                  <span className="about-founder-name">Pranav Patil</span>
                  <span className="about-founder-role">Founder</span>
                </div>
              </div>

              <div className="about-founder-chip">
                <div className="about-founder-avatar-wrap">
                  <img
                    src="/assets/co-founder.png"
                    alt="Rohan Baviskar - Founding Director"
                    className="about-founder-avatar"
                    loading="lazy"
                  />
                </div>
                <div className="about-founder-meta">
                  <span className="about-founder-name">Rohan Baviskar</span>
                  <span className="about-founder-role">Founding Director</span>
                </div>
              </div>

              <div className="about-team-pill" aria-label="35+ team members" title="35+ specialists & engineers">
                <span className="about-team-pill-count">+35</span>
              </div>
            </div>

            <div className="about-socials" aria-label="indiecode social links">
              <a
                href="https://x.com/hello_indiecode"
                target="_blank"
                rel="noopener noreferrer"
                className="about-social-link"
                aria-label="indiecode on X"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              <a
                href="https://www.instagram.com/indiecode.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-social-link"
                aria-label="indiecode on Instagram"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61574703957734"
                target="_blank"
                rel="noopener noreferrer"
                className="about-social-link"
                aria-label="indiecode on Facebook"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/indiecode-software-solutions-1854143bb/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-social-link"
                aria-label="indiecode on LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>

            <p className="about-copyright">
              © 2026 indiecode. All rights reserved.
            </p>
          </div>
        </div>

        {/* Subtle divider in between */}
        <div className="about-divider reveal-init reveal-delay-2" aria-hidden="true" />

        {/* Right Part: Contact Form */}
        <div className="about-col about-col-right">
          <div className="contact-wrapper">
            {/* Contact Header */}
            <div className="contact-header reveal-init reveal-delay-1">
              <span className="contact-eyebrow">LET'S TALK</span>
              <h3 className="contact-title">Have something<br />in mind?</h3>
              <p className="contact-subtitle">
                Tell us about your idea, and we'll help you turn it into the right solution.
              </p>
            </div>

            {/* Recessed Neumorphic Form Container */}
            <div className="contact-form-recessed reveal-init reveal-delay-2">
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="contact-form-row">
                  <div className="contact-input-field">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact-input-field">
                    <input
                      type="text"
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-input-field">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="contact-input-field">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number (Optional)"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact-form-row full-width">
                  <div className="contact-input-field textarea-field">
                    <textarea
                      name="message"
                      placeholder="Tell us about your project..."
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {submitStatus === 'error' && (
                  <div className="contact-alert contact-alert-error" role="alert">
                    <AlertCircle size={16} className="contact-alert-icon" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {submitStatus === 'success' && (
                  <div className="contact-alert contact-alert-success" role="status">
                    <CheckCircle2 size={16} className="contact-alert-icon" />
                    <span>Thank you! Your message has been sent to our team. We'll be in touch shortly.</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  className={`contact-submit-btn ${isSubmitting ? 'is-loading' : ''} ${submitStatus === 'success' ? 'is-success' : ''}`}
                  disabled={isSubmitting}
                >
                  <span>
                    {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Message Sent!' : 'Send Message'}
                  </span>
                  {isSubmitting ? (
                    <Loader2 size={15} className="contact-btn-spinner" />
                  ) : (
                    <ArrowUpRight size={15} className="contact-btn-arrow" />
                  )}
                </button>

                <p className="contact-microcopy">
                  We usually respond within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Three horizontal tabs attached to bottom left edge */}
      <div className="about-bottom-tabs about-bottom-tabs-left reveal-init reveal-delay-3" aria-label="Legal and compliance links">
        <button 
          type="button" 
          onClick={() => setLegalDoc('privacy')} 
          className="about-tab-item"
          aria-label="View Privacy Policy"
        >
          <span className="about-tab-icon">
            <ShieldCheck size={15} />
          </span>
          <div className="about-tab-text">
            <span className="about-tab-label">Privacy Policy</span>
            <span className="about-tab-desc">Data & privacy</span>
          </div>
        </button>

        <button 
          type="button" 
          onClick={() => setLegalDoc('terms')} 
          className="about-tab-item"
          aria-label="View Terms and Conditions"
        >
          <span className="about-tab-icon">
            <FileText size={15} />
          </span>
          <div className="about-tab-text">
            <span className="about-tab-label">Terms & Conditions</span>
            <span className="about-tab-desc">Client agreements</span>
          </div>
        </button>

        <button 
          type="button" 
          onClick={() => setLegalDoc('security')} 
          className="about-tab-item"
          aria-label="View Security and Trust details"
        >
          <span className="about-tab-icon">
            <Lock size={15} />
          </span>
          <div className="about-tab-text">
            <span className="about-tab-label">Security & Trust</span>
            <span className="about-tab-desc">Enterprise standards</span>
          </div>
        </button>
      </div>

      {/* Three horizontal tabs attached to bottom right edge */}
      <div className="about-bottom-tabs reveal-init reveal-delay-3">
        <a href="mailto:hello@indiecode.in" className="about-tab-item">
          <span className="about-tab-icon">
            <Mail size={15} />
          </span>
          <div className="about-tab-text">
            <span className="about-tab-label">hello@indiecode.in</span>
            <span className="about-tab-desc">Drop us an email</span>
          </div>
        </a>

        <a href="tel:+919156367501" className="about-tab-item">
          <span className="about-tab-icon">
            <Phone size={15} />
          </span>
          <div className="about-tab-text">
            <span className="about-tab-label">+91 91563 67501</span>
            <span className="about-tab-desc">Give us a call</span>
          </div>
        </a>

        <div className="about-tab-item">
          <span className="about-tab-icon">
            <MapPin size={15} />
          </span>
          <div className="about-tab-text">
            <span className="about-tab-label">Nashik, India</span>
            <span className="about-tab-desc">Our base</span>
          </div>
        </div>
      </div>

      {/* Legal & Compliance Modal Drawer */}
      {legalDoc && (
        <div 
          className="legal-modal-backdrop" 
          onClick={() => setLegalDoc(null)}
          role="presentation"
        >
          <div 
            className="legal-modal-container" 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="legal-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="legal-modal-header">
              <div className="legal-modal-tabs">
                <button 
                  type="button" 
                  className={`legal-tab-btn ${legalDoc === 'privacy' ? 'is-active' : ''}`}
                  onClick={() => setLegalDoc('privacy')}
                >
                  <ShieldCheck size={14} />
                  <span>Privacy Policy</span>
                </button>
                <button 
                  type="button" 
                  className={`legal-tab-btn ${legalDoc === 'terms' ? 'is-active' : ''}`}
                  onClick={() => setLegalDoc('terms')}
                >
                  <FileText size={14} />
                  <span>Terms & Conditions</span>
                </button>
                <button 
                  type="button" 
                  className={`legal-tab-btn ${legalDoc === 'security' ? 'is-active' : ''}`}
                  onClick={() => setLegalDoc('security')}
                >
                  <Lock size={14} />
                  <span>Security & Trust</span>
                </button>
              </div>

              <button 
                type="button" 
                className="legal-modal-close" 
                onClick={() => setLegalDoc(null)} 
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="legal-modal-body">
              <div className="legal-modal-intro">
                <span className="legal-tag">Legal & Compliance</span>
                <h3 id="legal-modal-title" className="legal-title">{LEGAL_DOCS[legalDoc]?.title}</h3>
                <p className="legal-subtitle">{LEGAL_DOCS[legalDoc]?.subtitle}</p>
              </div>

              <div className="legal-modal-content">
                {LEGAL_DOCS[legalDoc]?.sections.map((sec, idx) => (
                  <div key={idx} className="legal-section-block">
                    <h4 className="legal-section-heading">{sec.heading}</h4>
                    <p className="legal-section-text">{sec.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="legal-modal-footer">
              <span className="legal-footer-note">Effective 2026 • indiecode Software Solutions</span>
              <button 
                type="button" 
                className="legal-footer-close-btn"
                onClick={() => setLegalDoc(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
