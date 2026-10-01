import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Heart, MessageSquare, Send, Sparkles, Link2, Share2, BookOpen, Copy, ArrowUp, Search, Check } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import './Blog.css';

export default function BlogPost({ slug, onOpenContact, onNavigate }) {
  const post = BLOG_POSTS.find(p => p.slug === slug);
  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 2);

  // Reading Progress & Back to Top State
  const [readingProgress, setReadingProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(() => {
    try {
      return (JSON.parse(localStorage.getItem('indiecode_subscribers') || '[]')).length > 0;
    } catch {
      return false;
    }
  });
  const [copiedCodeIdx, setCopiedCodeIdx] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max((window.scrollY / totalHeight) * 100, 0), 100);
        setReadingProgress(progress);
        setShowBackToTop(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Claps & Likes State
  const [claps, setClaps] = useState(() => {
    if (!post) return 0;
    const stored = localStorage.getItem(`indiecode_claps_${slug}`);
    return stored ? parseInt(stored, 10) : post.claps || 48;
  });
  const [userClaps, setUserClaps] = useState(() => {
    const stored = localStorage.getItem(`indiecode_user_clapped_${slug}`);
    return stored ? parseInt(stored, 10) : 0;
  });
  const [clapAnim, setClapAnim] = useState(false);

  // Comments State
  const [comments, setComments] = useState(() => {
    if (!post) return [];
    const localComments = localStorage.getItem(`indiecode_comments_${slug}`);
    const parsedLocal = localComments ? JSON.parse(localComments) : [];
    return [...(post.comments || []), ...parsedLocal];
  });

  const [commentForm, setCommentForm] = useState({
    name: '',
    role: '',
    text: ''
  });
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (message) => {
    setToastMsg(message);
    if (window._indieToastTimeout) clearTimeout(window._indieToastTimeout);
    window._indieToastTimeout = setTimeout(() => {
      setToastMsg(null);
    }, 2800);
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        showToast('Link copied to clipboard!');
      }).catch(() => {
        showToast('Link copied: ' + url);
      });
    } else {
      showToast('Link copied: ' + url);
    }
  };

  const handleCopyCode = (idx, code) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(code).then(() => {
        setCopiedCodeIdx(idx);
        showToast('Code snippet copied to clipboard!');
        setTimeout(() => setCopiedCodeIdx(null), 2200);
      });
    }
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(post ? `${post.title} via @hello_indiecode` : 'indiecode Blog');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const handleNav = (path) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.assign(path);
    }
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

  const headings = post?.content
    ? post.content
        .filter(b => b.type === 'heading')
        .map(b => ({
          text: b.text,
          id: b.text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        }))
    : [];

  const renderFormattedText = (text) => {
    if (!text) return null;
    const regex = /\[(.*?)\]\((.*?)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const label = match[1];
      const url = match[2];
      parts.push(
        <a 
          key={match.index} 
          href={url} 
          className="blog-inline-link"
          onClick={(e) => {
            if (url.startsWith('/')) {
              e.preventDefault();
              handleNav(url);
            }
          }}
        >
          {label}
        </a>
      );
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  useEffect(() => {
    if (!post) return;

    // Document Title
    document.title = post.metaTitle || `${post.title} | indiecode Engineering & Custom Software`;

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

    // Canonical Tag Helper
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
    setMetaTag('name', 'description', post.metaDescription || post.excerpt);
    if (post.keywords && post.keywords.length > 0) {
      setMetaTag('name', 'keywords', post.keywords.join(', '));
    }
    setMetaTag('name', 'author', post.author.name);
    setLinkTag('canonical', `https://indiecode.in/blog/${post.slug}`);

    // OpenGraph Meta Tags
    setMetaTag('property', 'og:type', 'article');
    setMetaTag('property', 'og:title', post.metaTitle || post.title);
    setMetaTag('property', 'og:description', post.metaDescription || post.excerpt);
    setMetaTag('property', 'og:url', `https://indiecode.in/blog/${post.slug}`);
    setMetaTag('property', 'og:image', `https://indiecode.in${post.image}`);
    setMetaTag('property', 'og:site_name', 'indiecode Software Solutions');
    setMetaTag('property', 'article:published_time', post.isoDate);
    setMetaTag('property', 'article:author', post.author.name);
    setMetaTag('property', 'article:section', post.category);

    // Twitter / X Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', post.metaTitle || post.title);
    setMetaTag('name', 'twitter:description', post.metaDescription || post.excerpt);
    setMetaTag('name', 'twitter:image', `https://indiecode.in${post.image}`);

    // Google Rich JSON-LD Schemas (BlogPosting + BreadcrumbList)
    const scriptId = 'blog-post-schema';
    let existingScript = document.getElementById(scriptId);
    if (!existingScript) {
      existingScript = document.createElement('script');
      existingScript.id = scriptId;
      existingScript.type = 'application/ld+json';
      document.head.appendChild(existingScript);
    }

    const wordCount = post.content ? post.content.reduce((acc, b) => {
      if (b.text) return acc + b.text.split(/\s+/).length;
      if (b.items) return acc + b.items.join(' ').split(/\s+/).length;
      if (b.code) return acc + b.code.split(/\s+/).length;
      return acc;
    }, 0) : 1000;

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['BlogPosting', 'TechArticle'],
          '@id': `https://indiecode.in/blog/${post.slug}#article`,
          'isPartOf': {
            '@type': 'Blog',
            '@id': 'https://indiecode.in/blog#blog',
            'name': 'indiecode Engineering & Strategy Blog',
            'publisher': {
              '@type': 'Organization',
              'name': 'indiecode Software Solutions',
              'url': 'https://indiecode.in/'
            }
          },
          'headline': post.title,
          'description': post.metaDescription || post.excerpt,
          'datePublished': post.isoDate,
          'dateModified': post.isoDate,
          'inLanguage': 'en-US',
          'wordCount': wordCount,
          'mainEntityOfPage': `https://indiecode.in/blog/${post.slug}`,
          'speakable': {
            '@type': 'SpeakableSpecification',
            'cssSelector': ['.blog-article-title', '.blog-article-lead', '.blog-heading-anchor']
          },
          'image': {
            '@type': 'ImageObject',
            'url': `https://indiecode.in${post.image}`,
            'caption': post.title
          },
          'author': {
            '@type': 'Person',
            'name': post.author.name,
            'jobTitle': post.author.role,
            'worksFor': {
              '@type': 'Organization',
              'name': 'indiecode Software Solutions',
              'url': 'https://indiecode.in/'
            }
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'indiecode Software Solutions',
            'url': 'https://indiecode.in/',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://indiecode.in/logo.png'
            }
          },
          'keywords': post.keywords ? post.keywords.join(', ') : post.category,
          'articleSection': post.category,
          'about': [
            {
              '@type': 'Thing',
              'name': 'Custom Software Development',
              'url': 'https://indiecode.in/#services'
            },
            {
              '@type': 'Thing',
              'name': 'Enterprise Software Solutions',
              'url': 'https://indiecode.in/#solutions'
            }
          ],
          'interactionStatistic': [
            {
              '@type': 'InteractionCounter',
              'interactionType': 'https://schema.org/LikeAction',
              'userInteractionCount': claps
            },
            {
              '@type': 'InteractionCounter',
              'interactionType': 'https://schema.org/CommentAction',
              'userInteractionCount': comments.length
            }
          ]
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `https://indiecode.in/blog/${post.slug}#breadcrumbs`,
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
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': post.title,
              'item': `https://indiecode.in/blog/${post.slug}`
            }
          ]
        }
      ]
    };

    existingScript.textContent = JSON.stringify(schemaData);
    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [post, slug, claps, comments.length]);

  const handleClap = () => {
    if (userClaps >= 1) {
      showToast('You have already praised this article');
      return;
    }

    const newClaps = claps + 1;
    const newUserClaps = 1;

    setClaps(newClaps);
    setUserClaps(newUserClaps);
    setClapAnim(true);
    setTimeout(() => setClapAnim(false), 600);

    localStorage.setItem(`indiecode_claps_${slug}`, newClaps.toString());
    localStorage.setItem(`indiecode_user_clapped_${slug}`, newUserClaps.toString());
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentForm.name.trim() || !commentForm.text.trim()) return;

    setIsSubmittingComment(true);

    const newComment = {
      id: `local-${Date.now()}`,
      author: commentForm.name.trim(),
      role: commentForm.role.trim() || 'Software Practitioner',
      avatarBg: '#A88447',
      date: 'Just now',
      claps: 1,
      userLiked: true,
      text: commentForm.text.trim()
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    // Save only user added comments to localStorage
    const storedUserComments = localStorage.getItem(`indiecode_comments_${slug}`);
    const parsedUserComments = storedUserComments ? JSON.parse(storedUserComments) : [];
    parsedUserComments.push(newComment);
    localStorage.setItem(`indiecode_comments_${slug}`, JSON.stringify(parsedUserComments));

    setCommentForm({ name: '', role: '', text: '' });
    setIsSubmittingComment(false);
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 4000);
  };

  const handleCommentClap = (commentId) => {
    const targetComment = comments.find(c => c.id === commentId);
    if (targetComment?.userLiked) {
      showToast('You have already upvoted this response');
      return;
    }

    const updated = comments.map(c => {
      if (c.id === commentId) {
        return { ...c, claps: (c.claps || 0) + 1, userLiked: true };
      }
      return c;
    });
    setComments(updated);
  };

  const handleReplyClap = (commentId, replyId) => {
    const targetComment = comments.find(c => c.id === commentId);
    const targetReply = targetComment?.replies?.find(r => r.id === replyId);
    if (targetReply?.userLiked) {
      showToast('You have already upvoted this reply');
      return;
    }

    const updated = comments.map(c => {
      if (c.id === commentId && c.replies) {
        const updatedReplies = c.replies.map(r => {
          if (r.id === replyId) {
            return { ...r, claps: (r.claps || 0) + 1, userLiked: true };
          }
          return r;
        });
        return { ...c, replies: updatedReplies };
      }
      return c;
    });
    setComments(updated);
  };

  if (!post) {
    return (
      <div className="blog-article-root">
        <button 
          type="button" 
          className="blog-fixed-brand"
          onClick={() => handleNav('/')}
        >
          <img src="/logo.png" alt="indiecode logo" className="blog-fixed-logo" />
          <span>indiecode</span>
        </button>

        <main className="blog-article-container" style={{ textAlign: 'center', paddingTop: '6rem' }}>
          <h1 className="blog-main-title">Article Not Found</h1>
          <p className="blog-main-subtitle">
            The requested article could not be located or may have been moved.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <button 
              type="button" 
              className="blog-cta-btn"
              onClick={() => handleNav('/blog')}
            >
              <ArrowLeft size={15} />
              <span>Back to all articles</span>
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="blog-article-root">
      {/* Top Reading Progress Bar */}
      <div 
        className="blog-reading-progress-bar" 
        style={{ width: `${readingProgress}%` }} 
        aria-hidden="true" 
      />

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
            <button 
              type="button" 
              className="blog-header-search-btn"
              onClick={() => handleNav('/blog')}
              aria-label="Search all articles"
            >
              <Search size={14} />
              <span>All Articles</span>
            </button>

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

      {/* Main Centered Reading Container */}
      <main className="blog-article-container">
        <article>
          {/* Article Header */}
          <header className="blog-article-header">
            <button 
              type="button" 
              className="blog-article-back"
              onClick={() => handleNav('/blog')}
            >
              <ArrowLeft size={14} />
              <span>Back to all articles</span>
            </button>

            {/* Article Cover Image with Core Web Vitals attributes */}
            {post.image && (
              <div className="blog-article-hero-img-wrap">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="blog-article-hero-img"
                  loading="eager"
                  decoding="async"
                  width="800"
                  height="450"
                />
              </div>
            )}

            <span className="blog-article-category-badge">{post.category}</span>
            <h1 className="blog-article-title">{post.title}</h1>

            <div className="blog-article-byline">
              <div className="blog-author-box">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name}
                  className="blog-author-avatar"
                />
                <div className="blog-author-info">
                  <span className="blog-author-name">{post.author.name}</span>
                  <span className="blog-author-role">{post.author.role}</span>
                </div>
              </div>

              <div className="blog-article-stats">
                <time dateTime={post.isoDate}>{post.date}</time>
                <span className="blog-meta-dot" style={{ margin: '0 0.5rem' }}>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Claps, Comments & 1-Click Social Share Bar */}
            <div className="blog-reactions-bar">
              <div className="blog-reactions-left">
                <button 
                  type="button" 
                  className={`blog-reaction-btn ${userClaps > 0 ? 'active' : ''} ${clapAnim ? 'animating' : ''}`}
                  onClick={handleClap}
                  aria-label={`Clap for article (${claps} claps)`}
                >
                  <span className="blog-clap-icon">👏</span>
                  <span className="blog-reaction-count">{claps}</span>
                  {clapAnim && <span className="blog-clap-bubble">+1</span>}
                </button>

                <a href="#comments" className="blog-reaction-btn">
                  <MessageSquare size={16} />
                  <span className="blog-reaction-count">{comments.length}</span>
                </a>
              </div>

              <div className="blog-share-toolbar" aria-label="Share article">
                <button 
                  type="button" 
                  className="blog-share-btn" 
                  onClick={handleCopyLink}
                  aria-label="Copy article link"
                  title="Copy Link"
                >
                  <Link2 size={15} />
                  <span className="blog-share-label">Copy Link</span>
                </button>

                <button 
                  type="button" 
                  className="blog-share-icon-btn" 
                  onClick={handleShareLinkedIn}
                  aria-label="Share on LinkedIn"
                  title="Share on LinkedIn"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                  </svg>
                </button>

                <button 
                  type="button" 
                  className="blog-share-icon-btn" 
                  onClick={handleShareTwitter}
                  aria-label="Share on X (Twitter)"
                  title="Share on X"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Interactive Table of Contents for Google Rich Sitelinks */}
            {headings.length >= 2 && (
              <nav className="blog-toc-box" aria-label="Table of contents">
                <div className="blog-toc-header">
                  <BookOpen size={14} className="blog-toc-icon" />
                  <span className="blog-toc-title">In this article</span>
                </div>
                <ol className="blog-toc-list">
                  {headings.map((h, hIdx) => (
                    <li key={hIdx} className="blog-toc-item">
                      <a href={`#${h.id}`} className="blog-toc-link">
                        <span className="blog-toc-num">0{hIdx + 1}.</span>
                        <span className="blog-toc-text">{h.text}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </header>

          {/* Centered Editorial Prose */}
          <div className="blog-prose">
            {post.content.map((block, idx) => {
              if (block.type === 'heading') {
                const headingId = block.text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return <h2 key={idx} id={headingId} className="blog-heading-anchor">{block.text}</h2>;
              }
              if (block.type === 'paragraph') {
                return <p key={idx}>{renderFormattedText(block.text)}</p>;
              }
              if (block.type === 'code') {
                const isCopied = copiedCodeIdx === idx;
                return (
                  <div key={idx} className="blog-code-panel">
                    <div className="blog-code-header">
                      <span className="blog-code-filename">{block.filename || block.language || 'Code Snippet'}</span>
                      <button 
                        type="button" 
                        className={`blog-code-copy-btn ${isCopied ? 'copied' : ''}`}
                        onClick={() => handleCopyCode(idx, block.code)}
                        aria-label="Copy code to clipboard"
                      >
                        {isCopied ? (
                          <>
                            <Check size={13} />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="blog-code-pre">
                      <code className={`language-${block.language || 'typescript'}`}>{block.code}</code>
                    </pre>
                  </div>
                );
              }
              if (block.type === 'callout') {
                return (
                  <aside key={idx} className="blog-callout">
                    <div className="blog-callout-title">{block.title}</div>
                    <p className="blog-callout-text">{renderFormattedText(block.text)}</p>
                  </aside>
                );
              }
              if (block.type === 'list') {
                return (
                  <ul key={idx}>
                    {block.items.map((item, itemIdx) => (
                      <li key={itemIdx}>{renderFormattedText(item)}</li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </div>

          {/* Bottom Interactive Clapping Section */}
          <div className="blog-bottom-reactions">
            <div className="blog-clap-cta-wrap">
              <button 
                type="button" 
                className={`blog-large-clap-btn ${userClaps > 0 ? 'has-clapped' : ''} ${clapAnim ? 'animating' : ''}`}
                onClick={handleClap}
                aria-label="Applaud this article"
              >
                <span className="blog-large-clap-icon">👏</span>
                <span className="blog-large-clap-count">{claps} claps</span>
                {clapAnim && <span className="blog-clap-float-bubble">+1</span>}
              </button>
              <p className="blog-clap-note">
                {userClaps > 0 ? `You clapped ${userClaps} times. Thank you!` : 'Found this insightful? Give it a clap.'}
              </p>
            </div>
          </div>

          {/* Article Consultation CTA */}
          <footer className="blog-article-footer">
            <div className="blog-cta-box">
              <h3 className="blog-cta-title">Building custom software for your business?</h3>
              <p className="blog-cta-desc">
                We help founders, product leaders, and enterprises engineer custom platforms, AI automations, and scalable cloud systems.
              </p>
              <button 
                type="button" 
                className="blog-cta-btn"
                onClick={onOpenContact}
              >
                <span>Discuss Your Project</span>
                <ArrowUpRight size={15} />
              </button>
            </div>
          </footer>

          {/* Recommended Reading / Read Next Section */}
          {relatedPosts.length > 0 && (
            <section className="blog-read-next-section" aria-label="Recommended Reading">
              <div className="blog-read-next-header">
                <span className="blog-read-next-eyebrow">CONTINUE READING</span>
                <h3 className="blog-read-next-title">Recommended Articles</h3>
              </div>

              <div className="blog-read-next-grid">
                {relatedPosts.map((relPost) => (
                  <article 
                    key={relPost.slug} 
                    className="blog-read-next-card"
                    onClick={() => handleNav(`/blog/${relPost.slug}`)}
                  >
                    <div className="blog-read-next-thumb-wrap">
                      <img 
                        src={relPost.image} 
                        alt={relPost.title} 
                        className="blog-read-next-thumb"
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="225"
                      />
                      <span className="blog-read-next-badge">{relPost.category}</span>
                    </div>

                    <div className="blog-read-next-content">
                      <span className="blog-read-next-time">{relPost.readTime}</span>
                      <h4 className="blog-read-next-card-title">{relPost.title}</h4>
                      <p className="blog-read-next-desc">{relPost.excerpt}</p>
                      <div className="blog-read-next-footer">
                        <span className="blog-read-next-link">Read article <ArrowUpRight size={13} /></span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Architecture Digest Newsletter Box */}
          <div className="blog-newsletter-card">
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

          {/* Comments & Discussion Section */}
          <section id="comments" className="blog-comments-section" aria-label="Article discussions and comments">
            <div className="blog-comments-header">
              <h3 className="blog-comments-title">
                Responses <span className="blog-comments-count">({comments.length})</span>
              </h3>
              <p className="blog-comments-subtitle">
                Join the discussion with developers, founders, and system architects.
              </p>
            </div>

            {/* Leave a Comment Form */}
            <form onSubmit={handleCommentSubmit} className="blog-comment-form">
              <div className="blog-comment-form-row">
                <input 
                  type="text" 
                  className="blog-comment-input" 
                  placeholder="Your Name *"
                  value={commentForm.name}
                  onChange={(e) => setCommentForm(prev => ({ ...prev, author: e.target.value, name: e.target.value }))}
                  required
                />
                <input 
                  type="text" 
                  className="blog-comment-input" 
                  placeholder="Your Role / Company (optional)"
                  value={commentForm.role}
                  onChange={(e) => setCommentForm(prev => ({ ...prev, role: e.target.value }))}
                />
              </div>

              <textarea 
                className="blog-comment-textarea"
                placeholder="What are your thoughts on this architecture or approach?..."
                rows={3}
                value={commentForm.text}
                onChange={(e) => setCommentForm(prev => ({ ...prev, text: e.target.value }))}
                required
              />

              <div className="blog-comment-form-actions">
                {commentSubmitted && (
                  <span className="blog-comment-success-msg">
                    <Sparkles size={14} /> Response posted!
                  </span>
                )}
                <button 
                  type="submit" 
                  className="blog-comment-submit-btn"
                  disabled={isSubmittingComment}
                >
                  <span>Publish Response</span>
                  <Send size={14} />
                </button>
              </div>
            </form>

            {/* List of Comments */}
            <div className="blog-comments-list">
              {comments.slice(0, visibleCount).map((comment) => {
                const initials = comment.author
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .substring(0, 2)
                  .toUpperCase();

                return (
                  <div key={comment.id} className="blog-comment-card">
                    <div className="blog-comment-top">
                      <div className="blog-comment-author-wrap">
                        <div 
                          className="blog-comment-avatar"
                          style={{ backgroundColor: comment.avatarBg || '#A88447' }}
                        >
                          {initials}
                        </div>
                        <div className="blog-comment-meta">
                          <span className="blog-comment-name">{comment.author}</span>
                          <span className="blog-comment-role">{comment.role}</span>
                        </div>
                      </div>

                      <time className="blog-comment-date">{comment.date}</time>
                    </div>

                    <p className="blog-comment-body">
                      {comment.text}
                    </p>

                    <div className="blog-comment-footer">
                      <button 
                        type="button" 
                        className={`blog-comment-clap-btn ${comment.userLiked ? 'active' : ''}`}
                        onClick={() => handleCommentClap(comment.id)}
                        aria-label="Upvote response"
                      >
                        <Heart size={13} fill={comment.userLiked ? 'currentColor' : 'none'} />
                        <span>{comment.claps || 0}</span>
                      </button>
                    </div>

                    {/* Official Author & Team Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="blog-comment-replies">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="blog-reply-card">
                            <div className="blog-comment-top">
                              <div className="blog-comment-author-wrap">
                                {reply.avatar ? (
                                  <img 
                                    src={reply.avatar} 
                                    alt={reply.author} 
                                    className="blog-reply-avatar" 
                                  />
                                ) : (
                                  <div 
                                    className="blog-comment-avatar"
                                    style={{ backgroundColor: '#A88447' }}
                                  >
                                    {reply.author.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                  </div>
                                )}
                                <div className="blog-comment-meta">
                                  <div className="blog-reply-author-line">
                                    <span className="blog-comment-name">{reply.author}</span>
                                    {reply.isAuthor && (
                                      <span className="blog-author-tag">Author</span>
                                    )}
                                  </div>
                                  <span className="blog-comment-role">{reply.role}</span>
                                </div>
                              </div>
                              <time className="blog-comment-date">{reply.date}</time>
                            </div>

                            <p className="blog-comment-body blog-reply-body">
                              {reply.text}
                            </p>

                            <div className="blog-comment-footer">
                              <button 
                                type="button" 
                                className={`blog-comment-clap-btn ${reply.userLiked ? 'active' : ''}`}
                                onClick={() => handleReplyClap(comment.id, reply.id)}
                                aria-label="Upvote reply"
                              >
                                <Heart size={13} fill={reply.userLiked ? 'currentColor' : 'none'} />
                                <span>{reply.claps || 0}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Load More Responses Button */}
            {visibleCount < comments.length && (
              <div className="blog-comments-load-more">
                <button 
                  type="button" 
                  className="blog-load-more-btn"
                  onClick={() => setVisibleCount(prev => Math.min(prev + 15, comments.length))}
                >
                  <span>Load more responses ({comments.length - visibleCount} remaining)</span>
                </button>
              </div>
            )}
          </section>
        </article>
      </main>

      {/* Clean Minimal Footer */}
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
              onClick={() => handleNav('/blog')}
            >
              All Articles
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

      {/* Floating Toast Notification for Already Praised / Liked */}
      {toastMsg && (
        <div className="blog-praise-toast" role="status" aria-live="polite">
          <span className="blog-toast-icon">👏</span>
          <span className="blog-toast-text">{toastMsg}</span>
        </div>
      )}

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button 
          type="button" 
          className="blog-back-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll back to top"
          title="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      )}
    </div>
  );
}
