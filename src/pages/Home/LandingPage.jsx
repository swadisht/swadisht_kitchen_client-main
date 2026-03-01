import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/* ============================================
   SWADISHT — Homemade Indian Tiffin Service
   Classical, smooth, SEO-optimised landing
   ============================================ */

// ——— Intersection-Observer reveal hook ———
function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

// Small reusable component for reveal wrappers
const Reveal = ({ children, className = '', delay = 0, style = {} }) => {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal-on-scroll ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
};

// ==========================================
// LANDING PAGE
// ==========================================

const LandingPage = () => {
  const navigate = useNavigate();
  const { owner, loading } = useAuth();

  // smooth scroll polyfill for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const handleGetStarted = useCallback(() => {
    if (loading) return;
    if (owner?.username) {
      navigate(`/${owner.username}/dashboard`);
    } else {
      navigate('/login');
    }
  }, [loading, owner, navigate]);

  // ——— Features data ———
  const features = [
    {
      icon: '🍱',
      title: 'Daily Fresh Tiffins',
      description:
        'Freshly prepared homemade Indian meals delivered to your doorstep every day — just like maa ke haath ka khaana.',
    },
    {
      icon: '🌿',
      title: 'Pure & Hygienic',
      description:
        'Made with farm-fresh ingredients, zero preservatives, and cooked in a certified, spotless kitchen.',
    },
    {
      icon: '🚚',
      title: 'On-Time Delivery',
      description:
        'Never miss a meal. We deliver on schedule so your lunch and dinner are always on time.',
    },
    {
      icon: '📋',
      title: 'Flexible Subscriptions',
      description:
        'Weekly, monthly, or custom plans — choose what works for you and change anytime.',
    },
  ];

  return (
    <>
      {/* ——— Scoped styles (no external CSS file needed) ——— */}
      <style>{`
        /* ---------- Typography ---------- */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

        .swadisht-landing {
          --clr-primary: #2563eb;
          --clr-primary-light: #3b82f6;
          --clr-accent: #0ea5e9;
          --clr-accent-light: #38bdf8;
          --clr-dark: #0f172a;
          --clr-dark-soft: #1e293b;
          --clr-cream: #f0f5ff;
          --clr-white: #ffffff;
          --clr-text: #3b3b3b;
          --clr-text-light: #6b6b6b;
          --font-display: 'Playfair Display', Georgia, serif;
          --font-body: 'Inter', system-ui, sans-serif;

          font-family: var(--font-body);
          color: var(--clr-text);
          overflow-x: hidden;
        }

        /* ---------- Reveal animation ---------- */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.8s cubic-bezier(.22,1,.36,1),
                      transform 0.8s cubic-bezier(.22,1,.36,1);
        }
        .reveal-on-scroll.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        /* ---------- Hero ---------- */
        .hero-bg {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }
        .hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('/background.jpg') center/cover no-repeat;
          filter: blur(4px);
          transform: scale(1.05);
          z-index: 0;
        }
        .hero-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(15,23,42,0.75) 0%,
            rgba(15,23,42,0.55) 50%,
            rgba(15,23,42,0.82) 100%
          );
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 820px;
          padding: 2rem 1.5rem;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          border-radius: 999px;
          background: rgba(14,165,233,0.15);
          border: 1px solid rgba(14,165,233,0.35);
          color: #7dd3fc;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          animation: fadeDown 1s ease forwards;
        }
        .hero-badge .dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--clr-accent);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:.5; transform:scale(1.4); }
        }
        @keyframes fadeDown {
          from { opacity:0; transform:translateY(-16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.6rem, 6vw, 4.8rem);
          font-weight: 800;
          color: var(--clr-white);
          line-height: 1.15;
          margin-bottom: 1.25rem;
          animation: fadeDown 1.1s .15s ease both;
        }
        .hero-title .highlight {
          background: linear-gradient(135deg, var(--clr-accent-light), var(--clr-accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: rgba(255,255,255,0.75);
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto 2.5rem;
          font-weight: 300;
          animation: fadeDown 1.2s .3s ease both;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          animation: fadeDown 1.3s .45s ease both;
        }

        /* ---------- Buttons ---------- */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all .35s cubic-bezier(.22,1,.36,1);
          border: none;
          text-decoration: none;
        }
        .btn-primary {
          background: linear-gradient(135deg, var(--clr-primary), var(--clr-primary-light));
          color: var(--clr-white);
          box-shadow: 0 4px 20px rgba(37,99,235,0.35);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(37,99,235,0.45);
        }
        .btn-outline {
          background: transparent;
          color: var(--clr-white);
          border: 1.5px solid rgba(255,255,255,0.35);
        }
        .btn-outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.6);
          transform: translateY(-2px);
        }

        /* ---------- Navbar ---------- */
        .landing-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          justify-content: center;
          padding: 1.25rem 1.5rem;
          transition: all .4s ease;
        }
        .landing-nav.scrolled .nav-pill {
          background: rgba(15,23,42,0.92);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 4px 30px rgba(0,0,0,0.25);
        }
        .nav-pill {
          display: flex;
          align-items: center;
          gap: 2rem;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          padding: 10px 28px;
          transition: all .4s ease;
        }
        .nav-brand {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--clr-white);
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .nav-brand-icon {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: var(--clr-accent);
          box-shadow: 0 0 12px rgba(14,165,233,0.5);
        }
        .nav-links {
          display: none;
          gap: 1.5rem;
          list-style: none;
          margin: 0; padding: 0;
        }
        @media(min-width:768px) { .nav-links { display:flex; } }
        .nav-links a {
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: color .25s;
        }
        .nav-links a:hover { color: var(--clr-accent-light); }
        .nav-signin {
          padding: 8px 22px;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--clr-white);
          background: var(--clr-primary);
          cursor: pointer;
          transition: all .3s ease;
          border: none;
        }
        .nav-signin:hover {
          background: var(--clr-primary-light);
          box-shadow: 0 4px 16px rgba(37,99,235,0.3);
        }

        /* ---------- Section base ---------- */
        .section-padding {
          padding: 6rem 1.5rem;
        }
        @media(min-width:768px) {
          .section-padding { padding: 8rem 3rem; }
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: var(--clr-dark);
          text-align: center;
          margin-bottom: 0.75rem;
        }
        .section-title .accent {
          color: var(--clr-primary);
        }
        .section-desc {
          text-align: center;
          color: var(--clr-text-light);
          max-width: 600px;
          margin: 0 auto 3.5rem;
          font-size: 1.05rem;
          line-height: 1.7;
        }

        /* ---------- About Section ---------- */
        .about-section {
          background: var(--clr-cream);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          max-width: 1100px;
          margin: 0 auto;
          align-items: center;
        }
        @media(min-width:768px) {
          .about-grid { grid-template-columns: 1fr 1fr; }
        }
        .about-img-wrapper {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }
        .about-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .7s cubic-bezier(.22,1,.36,1);
        }
        .about-img-wrapper:hover img {
          transform: scale(1.04);
        }
        .about-img-badge {
          position: absolute;
          bottom: 16px; right: 16px;
          background: var(--clr-primary);
          color: var(--clr-white);
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          box-shadow: 0 4px 16px rgba(37,99,235,0.3);
        }
        .about-text h2 {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.5vw, 2.6rem);
          font-weight: 700;
          color: var(--clr-dark);
          line-height: 1.25;
          margin-bottom: 1rem;
        }
        .about-text h2 .accent { color: var(--clr-primary); }
        .about-text p {
          color: var(--clr-text-light);
          font-size: 1.05rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
        .about-stats {
          display: flex;
          gap: 1rem;
        }
        .stat-card {
          flex: 1;
          background: var(--clr-white);
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 16px;
          padding: 1.25rem;
          text-align: center;
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .stat-number {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--clr-primary);
        }
        .stat-label {
          font-size: 0.75rem;
          color: var(--clr-text-light);
          font-weight: 500;
          margin-top: 4px;
        }

        /* ---------- Features ---------- */
        .features-section {
          background: var(--clr-white);
        }
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media(min-width:640px) {
          .features-grid { grid-template-columns: 1fr 1fr; }
        }
        @media(min-width:1024px) {
          .features-grid { grid-template-columns: repeat(4,1fr); }
        }
        .feature-card {
          background: var(--clr-cream);
          border: 1px solid rgba(0,0,0,0.05);
          border-radius: 20px;
          padding: 2rem 1.5rem;
          text-align: center;
          transition: transform .35s ease, box-shadow .35s ease;
          cursor: default;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.08);
        }
        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .feature-card h3 {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--clr-dark);
          margin-bottom: 0.6rem;
        }
        .feature-card p {
          color: var(--clr-text-light);
          font-size: 0.9rem;
          line-height: 1.65;
        }

        /* ---------- Showcase / Gallery ---------- */
        .showcase-section {
          background: var(--clr-cream);
        }
        .showcase-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }
        @media(min-width:768px) {
          .showcase-grid { grid-template-columns: 1fr 1fr; }
        }
        .showcase-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
          cursor: default;
        }
        .showcase-card img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          display: block;
          transition: transform .7s cubic-bezier(.22,1,.36,1);
        }
        .showcase-card:hover img {
          transform: scale(1.06);
        }
        .showcase-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(15,23,42,0.7) 0%, transparent 60%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
        }
        .showcase-overlay h3 {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--clr-white);
          margin-bottom: 4px;
        }
        .showcase-overlay p {
          color: rgba(255,255,255,0.75);
          font-size: 0.85rem;
        }

        /* ---------- CTA ---------- */
        .cta-section {
          background: linear-gradient(135deg, var(--clr-dark) 0%, var(--clr-dark-soft) 100%);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%);
          top: -150px; right: -100px;
          pointer-events: none;
        }
        .cta-section h2 {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 700;
          color: var(--clr-white);
          margin-bottom: 1rem;
          position: relative;
        }
        .cta-section h2 .accent {
          background: linear-gradient(135deg, var(--clr-accent-light), var(--clr-accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cta-section p {
          color: rgba(255,255,255,0.6);
          font-size: 1.1rem;
          max-width: 550px;
          margin: 0 auto 2.5rem;
          line-height: 1.7;
          position: relative;
        }

        /* ---------- Footer ---------- */
        .landing-footer {
          background: var(--clr-white);
          border-top: 1px solid rgba(0,0,0,0.06);
          padding: 2.5rem 1.5rem;
        }
        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
        }
        @media(min-width:768px) {
          .footer-inner { flex-direction: row; justify-content: space-between; }
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-brand-dot {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--clr-primary), var(--clr-accent));
          box-shadow: 0 2px 10px rgba(37,99,235,0.25);
        }
        .footer-brand span {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--clr-dark);
        }
        .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .footer-links a {
          color: var(--clr-text-light);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: color .25s;
        }
        .footer-links a:hover { color: var(--clr-primary); }
        .footer-copy {
          text-align: center;
          color: var(--clr-text-light);
          font-size: 0.78rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(0,0,0,0.05);
          max-width: 1100px;
          margin: 0 auto;
        }
      `}</style>

      <div className="swadisht-landing">

        {/* ═══════════ NAVBAR ═══════════ */}
        <NavBar navigate={navigate} />

        {/* ═══════════ HERO ═══════════ */}
        <header className="hero-bg" role="banner" id="hero">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="dot" />
              Homemade Indian Tiffin Service
            </div>

            <h1 className="hero-title">
              Ghar Jaisa Khaana,{' '}
              <span className="highlight">Delivered Daily.</span>
            </h1>

            <p className="hero-subtitle">
              Swadisht brings the warmth of a home-cooked Indian meal right to your door.
              Fresh, hygienic, and made with love — every single day.
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={handleGetStarted}
                disabled={loading}
                id="hero-cta"
              >
                {loading ? 'Loading…' : 'Get Started'} →
              </button>
              <a href="#about" className="btn btn-outline">
                Learn More ↓
              </a>
            </div>
          </div>
        </header>

        {/* ═══════════ ABOUT ═══════════ */}
        <section className="about-section section-padding" id="about" aria-label="About Swadisht">
          <Reveal>
            <div className="section-title">
              Why Choose <span className="accent">Swadisht?</span>
            </div>
            <p className="section-desc">
              We believe everyone deserves a warm, home-cooked meal — no matter how busy life gets.
            </p>
          </Reveal>

          <div className="about-grid">
            <Reveal delay={100}>
              <div className="about-img-wrapper">
                <img
                  src="/download.jpg"
                  alt="Delicious homemade Indian tiffin meal prepared by Swadisht kitchen"
                  loading="lazy"
                />
                <span className="about-img-badge">100% Homemade</span>
              </div>
            </Reveal>

            <Reveal delay={250}>
              <div className="about-text">
                <h2>
                  Taste the Love in <span className="accent">Every Bite.</span>
                </h2>
                <p>
                  At Swadisht, every meal is crafted with the finest ingredients and traditional
                  Indian recipes passed down through generations. No shortcuts, no preservatives —
                  just pure, wholesome food that reminds you of home.
                </p>
                <p>
                  Whether it's a comforting dal-chawal or a rich paneer sabzi, we pour love into
                  every tiffin.
                </p>

                <div className="about-stats">
                  <div className="stat-card">
                    <div className="stat-number">500+</div>
                    <div className="stat-label">Happy Customers</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">30+</div>
                    <div className="stat-label">Daily Dishes</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">4.9★</div>
                    <div className="stat-label">Avg. Rating</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ FEATURES ═══════════ */}
        <section className="features-section section-padding" id="features" aria-label="Our Features">
          <Reveal>
            <div className="section-title">
              What Makes Us <span className="accent">Special</span>
            </div>
            <p className="section-desc">
              From carefully curated menus to reliable delivery — here's why families trust Swadisht.
            </p>
          </Reveal>

          <div className="features-grid">
            {features.map((f, i) => (
              <Reveal key={i} delay={i * 120}>
                <article className="feature-card" id={`feature-${i}`}>
                  <div className="feature-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══════════ SHOWCASE ═══════════ */}
        <section className="showcase-section section-padding" id="showcase" aria-label="Food Showcase">
          <Reveal>
            <div className="section-title">
              A Glimpse of Our <span className="accent">Kitchen</span>
            </div>
            <p className="section-desc">
              Real food, real flavours — see what's cooking at Swadisht today.
            </p>
          </Reveal>

          <div className="showcase-grid">
            <Reveal delay={100}>
              <figure className="showcase-card">
                <img
                  src="/download.jpg"
                  alt="Traditional Indian thali with dal, sabzi, roti and rice by Swadisht"
                  loading="lazy"
                />
                <figcaption className="showcase-overlay">
                  <h3>Traditional Thali</h3>
                  <p>A balanced meal with dal, sabzi, roti & rice</p>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={250}>
              <figure className="showcase-card">
                <img
                  src="/images.jpg"
                  alt="Fresh homemade Indian food ready for delivery by Swadisht"
                  loading="lazy"
                />
                <figcaption className="showcase-overlay">
                  <h3>Made Fresh Daily</h3>
                  <p>Prepared with love, packed with care</p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ═══════════ CTA ═══════════ */}
        <section className="cta-section section-padding" aria-label="Call to Action">
          <Reveal>
            <h2>
              Ready to Taste{' '}
              <span className="accent">Home?</span>
            </h2>
            <p>
              Subscribe to Swadisht today and never worry about cooking again. Fresh meals,
              delivered daily.
            </p>
          </Reveal>
        </section>

        {/* ═══════════ FOOTER ═══════════ */}
        <footer className="landing-footer" role="contentinfo">
          <div className="footer-inner">
            <div className="footer-brand">
              <div className="footer-brand-dot" />
              <span>Swadisht</span>
            </div>
            <nav className="footer-links" aria-label="Footer Navigation">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/about">About Us</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
            </nav>
          </div>
          <div className="footer-copy">
            © {new Date().getFullYear()} Swadisht Kitchen. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

// ==========================================
// NAVBAR (extracted for clarity)
// ==========================================
const NavBar = ({ navigate }) => {
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 60) {
        navRef.current.classList.add('scrolled');
      } else {
        navRef.current.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="landing-nav" ref={navRef} aria-label="Main Navigation">
      <div className="nav-pill">
        <a href="#hero" className="nav-brand">
          <span className="nav-brand-icon" />
          Swadisht
        </a>
        <button
          className="nav-signin"
          onClick={() => navigate('/login')}
        >
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default LandingPage;
