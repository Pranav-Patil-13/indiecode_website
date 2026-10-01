import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, Mail, Phone, MapPin, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import './ContactModal.css';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: 'Web & Mobile Apps',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Close on Escape key & manage body scroll locking
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and project message.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message. Please try again.');
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        projectType: 'Web & Mobile Apps',
        message: '',
      });

      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2800);
    } catch (err) {
      setErrorMessage(err.message || 'Unable to send message right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="contact-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      {/* Slide-out Drawer Panel */}
      <div 
        className="contact-modal-drawer" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="modal-drawer-header">
          <div className="modal-header-text">
            <span className="modal-eyebrow">GET IN TOUCH</span>
            <h2 className="modal-title">Start a conversation.</h2>
            <p className="modal-subtitle">
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
          </div>

          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close contact drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <div className="modal-drawer-body">
          {isSubmitted ? (
            <div className="modal-success-state">
              <CheckCircle2 size={44} className="success-icon" />
              <h3>Inquiry Received!</h3>
              <p>Thank you for reaching out. An engineering lead will review your requirements and respond shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="modal-form" noValidate>
              <div className="modal-form-row">
                <div className="modal-input-field">
                  <label htmlFor="modal-name">Your Name *</label>
                  <input
                    id="modal-name"
                    type="text"
                    name="name"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="modal-input-field">
                  <label htmlFor="modal-company">Company Name</label>
                  <input
                    id="modal-company"
                    type="text"
                    name="company"
                    placeholder="e.g. Acme Corp"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="modal-form-row">
                <div className="modal-input-field">
                  <label htmlFor="modal-email">Email Address *</label>
                  <input
                    id="modal-email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="modal-input-field">
                  <label htmlFor="modal-phone">Phone (Optional)</label>
                  <input
                    id="modal-phone"
                    type="tel"
                    name="phone"
                    placeholder="+91 91563 67501"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="modal-input-field">
                <label htmlFor="modal-type">What are you looking to build?</label>
                <select
                  id="modal-type"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="modal-select"
                >
                  <option value="Web & Mobile Apps">Custom Web or Mobile Application</option>
                  <option value="Internal Operations Platform">Internal Operations Platform / Portal</option>
                  <option value="Enterprise SaaS">Enterprise SaaS Product</option>
                  <option value="Workflow Automation">Workflow Automation & Integrations</option>
                  <option value="Other Custom Solution">Other Custom Solution</option>
                </select>
              </div>

              <div className="modal-input-field">
                <label htmlFor="modal-message">Tell us about your project *</label>
                <textarea
                  id="modal-message"
                  name="message"
                  placeholder="Share a brief overview of your goals, timeline, and requirements..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {errorMessage && (
                <div className="modal-alert-error" role="alert">
                  <AlertCircle size={15} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button type="submit" className={`modal-submit-btn ${isSubmitting ? 'is-loading' : ''}`} disabled={isSubmitting}>
                <span>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
                {isSubmitting
                  ? <Loader2 size={16} className="modal-btn-spinner" />
                  : <ArrowUpRight size={16} className="modal-btn-arrow" />}
              </button>

              <p className="modal-microcopy">
                Direct engineer response. No sales spam.
              </p>
            </form>
          )}
        </div>

        {/* Drawer Footer Contact Dock */}
        <div className="modal-drawer-footer">
          <a href="mailto:hello@indiecode.in" className="modal-footer-item">
            <Mail size={15} />
            <span>hello@indiecode.in</span>
          </a>
          <span className="modal-footer-sep" aria-hidden="true" />
          <a href="tel:+919156367501" className="modal-footer-item">
            <Phone size={15} />
            <span>+91 91563 67501</span>
          </a>
          <span className="modal-footer-sep" aria-hidden="true" />
          <div className="modal-footer-item">
            <MapPin size={15} />
            <span>Nashik, India</span>
          </div>
        </div>
      </div>
    </div>
  );
}
