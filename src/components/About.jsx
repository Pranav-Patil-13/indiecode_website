import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { ArrowUpRight, Mail, Phone, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import './About.css';

export default function About() {
  const [sectionRef, isRevealed] = useScrollReveal({ threshold: 0.15 });
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
    </section>
  );
}
