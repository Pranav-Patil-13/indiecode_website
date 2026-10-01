import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Search, X, Sparkles, Send, Check } from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../data/blogPosts';
import './Blog.css';

export default function BlogList({ onNavigate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const searchInputRef = useRef(null);

  const showToast = (message) => {
    setToastMsg(message);
    if (window._blogListToastTimeout) clearTimeout(window._blogListToastTimeout);
    window._blogListToastTimeout = setTimeout(() => {
      setToastMsg(null);
    }, 2800);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    const subscribers = JSON.parse(localStorage.getItem('indiecode_subscribers') || '[]');
    if (!subscribers.includes(newsletterEmail)) {
      subscribers.push(newsletterEmail);
      localStorage.setItem('indiecode_subscribers', JSON.stringify(subscribers));
    }
    setIsSubscribed(true);
    setNewsletterEmail('');
    showToast('Subscribed to the Engineering Digest!');
  };

  // Keyboard shortcut listener: Cmd/Ctrl+K or '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const POSTS_PER_PAGE = 5;

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      post.title.toLowerCase().includes(query) || 
      post.excerpt.toLowerCase().includes(query) ||
      post.author.name.toLowerCase().includes(query) ||
      (post.keywords && post.keywords.some(k => k.toLowerCase().includes(query)));
    return matchesCategory && matchesQuery;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const displayedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchInput = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  useEffect(() => {
    document.title = 'Insights for Builders, Businesses & Dreamers | indiecode Blog';
    
    // Dynamic Meta Tags Helper
    const setMetaTag = (attrName, attrVal, content) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
      return el;
    };

    const setLinkTag = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
      return el;
    };

    // Primary SEO Meta Tags
    setMetaTag(
      'name',
      'description',
      'In-depth technical guides, software architecture insights, UI/UX engineering principles, and enterprise modernization case studies by indiecode Software Solutions.'
    );
    setMetaTag(
      'name',
      'keywords',
      'custom software blog, software development insights, web application architecture, enterprise ERP case studies, UI UX principles, mobile vs web apps, indiecode tech blog'
    );
    setMetaTag('name', 'author', 'indiecode Software Solutions');
    setLinkTag('canonical', 'https://indiecode.in/blog');

    // OpenGraph Tags
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:title', 'Insights for Builders, Businesses & Dreamers | indiecode Blog');
    setMetaTag('property', 'og:description', 'In-depth technical guides, software architecture insights, UI/UX engineering principles, and enterprise modernization case studies.');
    setMetaTag('property', 'og:url', 'https://indiecode.in/blog');
    setMetaTag('property', 'og:image', 'https://indiecode.in/assets/blog/blog_hero_overlay.jpg');
    setMetaTag('property', 'og:site_name', 'indiecode Software Solutions');

    // Twitter / X Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', 'Insights for Builders, Businesses & Dreamers | indiecode Blog');
    setMetaTag('name', 'twitter:description', 'In-depth technical guides, software architecture insights, UI/UX engineering principles, and enterprise modernization case studies.');
    setMetaTag('name', 'twitter:image', 'https://indiecode.in/assets/blog/blog_hero_overlay.jpg');

    // Structured JSON-LD Data for CollectionPage & ItemList
    const scriptId = 'blog-list-schema';
    let existingScript = document.getElementById(scriptId);
    if (!existingScript) {
      existingScript = document.createElement('script');
      existingScript.id = scriptId;
      existingScript.type = 'application/ld+json';
      document.head.appendChild(existingScript);
    }

    const listSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': 'https://indiecode.in/blog#collection',
          'url': 'https://indiecode.in/blog',
          'name': 'indiecode Engineering & Strategy Blog',
          'description': 'Ideas, guides, and real-world learnings on custom software development, architecture, UI/UX design, and digital transformation.',
          'publisher': {
            '@type': 'Organization',
            'name': 'indiecode Software Solutions',
            'url': 'https://indiecode.in/',
            'logo': 'https://indiecode.in/logo.png'
          }
        },
        {
          '@type': 'ItemList',
          'itemListElement': BLOG_POSTS.map((post, idx) => ({
            '@type': 'ListItem',
            'position': idx + 1,
            'url': `https://indiecode.in/blog/${post.slug}`,
            'name': post.title,
            'image': `https://indiecode.in${post.image}`,
            'description': post.excerpt
          }))
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://indiecode.in/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Blog',
              'item': 'https://indiecode.in/blog'
            }
          ]
        }
      ]
    };

    existingScript.textContent = JSON.stringify(listSchema);
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, []);

  const handlePostClick = (e, slug) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(`/blog/${slug}`);
    } else {
      window.location.assign(`/blog/${slug}`);
    }
  };

  const handleNav = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.assign(path);
    }
  };

  return (
    <div className="blog-root">
      {/* Blog Top Header with Logo & Search Action */}
      <header className="blog-top-header">
        <div className="blog-top-header-inner">
          <button 
            type="button" 
            className="blog-header-brand"
            onClick={() => handleNav('/')}
            aria-label="Return to indiecode homepage"
          >
            <img src="/logo.png" alt="indiecode logo" className="blog-header-logo" />
            <span className="blog-header-brand-name">indiecode</span>
          </button>

          <div className="blog-header-actions">
            <div className="blog-header-search-wrap" onClick={() => searchInputRef.current?.focus()}>
              <Search size={15} className="blog-header-search-icon" />
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="Search articles, topics..." 
                value={searchQuery}
                onChange={(e) => handleSearchInput(e.target.value)}
                className="blog-header-search-input"
                aria-label="Search articles (Press ⌘K or /)"
              />
              {!searchQuery ? (
                <kbd className="blog-header-search-kbd" title="Press ⌘K or / to search">⌘K</kbd>
              ) : (
                <button 
                  type="button" 
                  className="blog-header-search-clear"
                  onClick={(e) => { e.stopPropagation(); handleSearchInput(''); }}
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <button 
              type="button" 
              className="blog-header-nav-btn"
              onClick={() => handleNav('/')}
            >
              Home
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Warm Architectural Backdrop */}
      <section className="blog-hero-wrap" aria-label="Blog Header">
        <div className="blog-hero-overlay-bg" aria-hidden="true" />
        <div className="blog-hero-content">
          <span className="blog-eyebrow">BLOG</span>
          <h1 className="blog-main-title">
            Insights for builders,<br />
            businesses and dreamers.
          </h1>
          <p className="blog-main-subtitle">
            Ideas, guides and real-world learnings on software, design, technology and building digital products.
          </p>
        </div>
      </section>

      {/* Category Filter Toolbar */}
      <div className="blog-filter-section">
        <div className="blog-categories-pills" role="tablist" aria-label="Article categories">
          {BLOG_CATEGORIES.map((cat) => {
            const count = cat === 'All' 
              ? BLOG_POSTS.length 
              : BLOG_POSTS.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length;

            return (
              <button
                key={cat}
                type="button"
                className={`blog-category-pill ${selectedCategory.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
                onClick={() => handleCategorySelect(cat)}
                role="tab"
                aria-selected={selectedCategory.toLowerCase() === cat.toLowerCase()}
              >
                <span>{cat}</span>
                <span className="blog-pill-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Horizontal Cards Feed */}
      <main className="blog-feed-container">
        {filteredPosts.length === 0 ? (
          <div className="blog-empty-state">
            <h3 className="blog-empty-title">No articles found</h3>
            <p className="blog-empty-desc">
              We couldn't find any articles matching "{searchQuery}". Try searching for another topic or clear the filter.
            </p>
            <button 
              type="button" 
              className="blog-cta-btn"
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="blog-feed">
            {displayedPosts.map((post) => (
              <article 
                key={post.slug} 
                className="blog-card"
                onClick={(e) => handlePostClick(e, post.slug)}
              >
                <div className="blog-card-thumb-wrap">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="blog-card-thumb"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="338"
                  />
                </div>

                <div className="blog-card-content">
                  <div className="blog-card-meta-row">
                    <div className="blog-card-category-read">
                      <span className="blog-card-category">{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <time dateTime={post.isoDate} className="blog-card-date">{post.date}</time>
                  </div>

                  <h2 className="blog-card-title">
                    {post.title}
                  </h2>

                  <p className="blog-card-excerpt">
                    {post.excerpt}
                  </p>

                  <div className="blog-card-bottom-row">
                    <span className="blog-card-action">
                      Read Article →
                    </span>
                    <div className="blog-card-social-counts">
                      <span className="blog-card-count-item">👏 {post.claps}</span>
                      <span className="blog-card-count-item">💬 {post.comments?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Architecture Digest Newsletter Box */}
        <div className="blog-newsletter-card" style={{ margin: '4rem 0 2rem' }}>
          <div className="blog-newsletter-content">
            <span className="blog-newsletter-eyebrow">ENGINEERING DIGEST</span>
            <h3 className="blog-newsletter-title">Receive our software blueprints &amp; architecture playbooks</h3>
            <p className="blog-newsletter-desc">
              Bi-weekly deep dives into custom software engineering, scalable cloud infrastructure, and AI automation. No spam, ever.
            </p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="blog-newsletter-form">
            <input 
              type="email" 
              placeholder={isSubscribed ? "You're already subscribed!" : "Enter your work email..."}
              className="blog-newsletter-input" 
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              disabled={isSubscribed}
              required
            />
            <button type="submit" className={`blog-newsletter-btn ${isSubscribed ? 'subscribed' : ''}`} disabled={isSubscribed}>
              {isSubscribed ? (
                <>
                  <span>Subscribed</span>
                  <Check size={14} />
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <Send size={14} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Real Dynamic Centered Pagination */}
        {totalPages > 1 && (
          <nav className="blog-pagination" aria-label="Pagination Navigation">
            <button 
              type="button" 
              className="blog-page-btn nav-arrow"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ArrowLeft size={14} />
            </button>

            {Array.from({ length: totalPages }, (_, idx) => {
              const pageNum = idx + 1;
              return (
                <button 
                  key={pageNum}
                  type="button" 
                  className={`blog-page-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                  aria-label={`Page ${pageNum}`}
                  aria-current={currentPage === pageNum ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              );
            })}

            <button 
              type="button" 
              className="blog-page-btn nav-arrow"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ArrowRight size={14} />
            </button>
          </nav>
        )}
      </main>

      {/* Clean Minimalist Footer */}
      <footer className="blog-footer">
        <div className="blog-footer-inner">
          <span className="blog-footer-copy">© 2026 indiecode Software Solutions. All rights reserved.</span>
          <div className="blog-footer-links">
            <button 
              type="button" 
              className="blog-footer-link-btn"
              onClick={() => handleNav('/')}
            >
              Home
            </button>
            <button 
              type="button" 
              className="blog-footer-link-btn"
              onClick={() => handleNav('/privacy')}
            >
              Privacy Policy
            </button>
            <button 
              type="button" 
              className="blog-footer-link-btn"
              onClick={() => handleNav('/terms')}
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="blog-praise-toast" role="status" aria-live="polite">
          <span className="blog-toast-icon">✨</span>
          <span className="blog-toast-text">{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
