import { useState, useCallback } from 'react';
import { useApp, PAGES } from '../context/AppContext';

const TUTORS = [
  { name: 'Ayesha Malik', subject: 'Mathematics', rating: 4.9, reviews: 128, online: true, initials: 'AM' },
  { name: 'Usman Ahmad', subject: 'Web Development', rating: 4.8, reviews: 95, online: true, initials: 'UA' },
  { name: 'Sarah Khan', subject: 'Python Programming', rating: 4.9, reviews: 214, online: true, initials: 'SK' },
  { name: 'Ahmed Raza', subject: 'English Speaking', rating: 4.7, reviews: 76, online: true, initials: 'AR' },
  { name: 'Fatima Noor', subject: 'Physics', rating: 4.8, reviews: 103, online: true, initials: 'FN' },
];

const TESTIMONIALS = [
  {
    name: 'Ali Hassan',
    role: 'Software Engineer',
    initials: 'AH',
    text: 'AVENQORI completely changed how I learn. The AI-powered study planner helped me finish my Python course in record time!',
    rating: 5,
  },
  {
    name: 'Zara Ahmed',
    role: 'University Student',
    initials: 'ZA',
    text: 'Finding a verified tutor was so easy. My math grades improved dramatically after just a few sessions with Ayesha.',
    rating: 5,
  },
  {
    name: 'Omar Farooq',
    role: 'Entrepreneur',
    initials: 'OF',
    text: 'The certificate programs are top-notch and recognized by employers. Best investment I made in my career!',
    rating: 5,
  },
];

const FEATURES = [
  { icon: '🎓', label: 'Smart Courses & Live Classes' },
  { icon: '✅', label: 'Verified Tutors' },
  { icon: '🤖', label: 'AI Study Planner' },
  { icon: '🔒', label: 'Secure & Trusted' },
  { icon: '🌐', label: 'Multi-Language Support' },
  { icon: '🏆', label: 'Certificates & Rewards' },
];

const STATS = [
  { value: '500K+', label: 'Active Learners' },
  { value: '50K+', label: 'Expert Tutors' },
  { value: '10K+', label: 'Premium Courses' },
  { value: '4.9/5', label: 'User Rating' },
  { value: '150+', label: 'Countries' },
];

const NAV_LINKS = ['Home', 'Courses', 'Find a Tutor', 'Features', 'Pricing', 'About', 'Contact'];

export default function LandingPage() {
  const { navigate, login } = useApp();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogin = useCallback(() => navigate(PAGES.login), [navigate]);
  const handleSignup = useCallback(() => navigate(PAGES.signup), [navigate]);
  const handleStartFree = useCallback(() => login(), [login]);
  const toggleTheme = useCallback(() => setDarkMode(d => !d), []);

  return (
    <div className={`landing-root${darkMode ? ' dark' : ''}`} style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh', background: darkMode ? '#0d0121' : '#f8f7ff', color: darkMode ? '#f1f0ff' : '#1a0533' }}>

      {/* ── NAVBAR ── */}
      <nav className="landing-nav" style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px', height: 64,
        background: darkMode ? '#1a0533' : '#fff',
        boxShadow: '0 2px 12px rgba(108,62,244,0.08)',
        gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 22, color: '#6c3ef4', letterSpacing: '-0.5px', whiteSpace: 'nowrap' }}>
          <span style={{ background: '#6c3ef4', color: '#fff', borderRadius: 8, padding: '2px 8px', fontSize: 16 }}>A</span>
          AVENQORI
        </div>

        <div style={{ display: 'flex', gap: 24, flex: 1, justifyContent: 'center' }}>
          {NAV_LINKS.map(link => (
            <a key={link} href="#" style={{ textDecoration: 'none', color: darkMode ? '#d4c8ff' : '#4b3a6b', fontSize: 14, fontWeight: 500, transition: 'color .2s' }}
              onMouseEnter={e => e.target.style.color = '#6c3ef4'}
              onMouseLeave={e => e.target.style.color = darkMode ? '#d4c8ff' : '#4b3a6b'}>
              {link}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={toggleTheme} style={{ background: 'none', border: '1.5px solid #6c3ef4', borderRadius: 20, padding: '4px 12px', cursor: 'pointer', fontSize: 16, color: '#6c3ef4' }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button onClick={handleLogin} style={{ background: 'none', border: '1.5px solid #6c3ef4', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontWeight: 600, fontSize: 14, color: '#6c3ef4' }}>
            Login
          </button>
          <button onClick={handleSignup} style={{ background: '#6c3ef4', border: 'none', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontWeight: 600, fontSize: 14, color: '#fff' }}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" style={{ textAlign: 'center', padding: '80px 48px 60px', maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#ede9ff,#f3f0ff)', border: '1px solid #c4b5fd', borderRadius: 20, padding: '6px 18px', fontSize: 13, fontWeight: 600, color: '#6c3ef4', marginBottom: 24 }}>
          🤖 AI-Powered Learning Platform
        </div>
        <h1 style={{ fontSize: 54, fontWeight: 900, lineHeight: 1.15, margin: '0 0 20px', color: darkMode ? '#f1f0ff' : '#1a0533' }}>
          Learn Smarter, Grow Bigger<br />with <span style={{ color: '#6c3ef4' }}>AVENQORI</span>
        </h1>
        <p style={{ fontSize: 18, color: darkMode ? '#c4b5fd' : '#6b5b8d', marginBottom: 36, lineHeight: 1.6 }}>
          Connect with verified expert tutors, take AI-curated courses, and accelerate your learning journey — all in one platform.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={handleStartFree} style={{ background: '#6c3ef4', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(108,62,244,0.35)' }}>
            Start Learning Free →
          </button>
          <button style={{ background: 'none', color: darkMode ? '#c4b5fd' : '#6c3ef4', border: '2px solid #6c3ef4', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            ▶ Watch Demo
          </button>
        </div>
        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', marginTop: 36, flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: darkMode ? '#c4b5fd' : '#4b3a6b', fontWeight: 600 }}>
            <span style={{ color: '#6c3ef4', fontSize: 20 }}>👥</span> 500K+ Learners
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: darkMode ? '#c4b5fd' : '#4b3a6b', fontWeight: 600 }}>
            <span style={{ color: '#f59e0b' }}>⭐</span> 4.9/5 Stars Rating
          </span>
        </div>
      </section>

      {/* ── FEATURE STRIP ── */}
      <section style={{ background: darkMode ? '#1a0533' : '#6c3ef4', padding: '20px 48px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 0, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 1200, margin: '0 auto' }}>
          {FEATURES.map((f, i) => (
            <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 24px', color: '#fff', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', borderRight: i < FEATURES.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none' }}>
              <span>{f.icon}</span> {f.label}
            </div>
          ))}
        </div>
      </section>

      {/* ── FIND YOUR PERFECT TUTOR ── */}
      <section style={{ padding: '72px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#6c3ef4', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Expert Instructors</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, margin: 0, color: darkMode ? '#f1f0ff' : '#1a0533' }}>Find Your Perfect Tutor</h2>
            <p style={{ color: darkMode ? '#c4b5fd' : '#6b5b8d', marginTop: 8, fontSize: 15 }}>Connect with verified experts ready to help you succeed</p>
          </div>
          <a href="#" style={{ color: '#6c3ef4', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>View All Tutors →</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 320px', gap: 20, alignItems: 'start' }}>
          {/* 5 Tutor Cards */}
          <div style={{ gridColumn: '1 / 6', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            {TUTORS.map(tutor => (
              <div key={tutor.name} style={{ background: darkMode ? '#1a0533' : '#fff', borderRadius: 16, padding: '24px 16px', textAlign: 'center', boxShadow: '0 2px 16px rgba(108,62,244,0.08)', border: `1px solid ${darkMode ? '#2d1a5e' : '#ede9ff'}` }}>
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: 12 }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'linear-gradient(135deg,#6c3ef4,#9b59f5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#fff' }}>
                    {tutor.initials}
                  </div>
                  {tutor.online && (
                    <span style={{ position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, background: '#22c55e', borderRadius: '50%', border: '2px solid #fff' }} />
                  )}
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: darkMode ? '#f1f0ff' : '#1a0533', marginBottom: 4 }}>{tutor.name}</div>
                <div style={{ fontSize: 12, color: '#6c3ef4', fontWeight: 600, marginBottom: 8 }}>{tutor.subject}</div>
                <div style={{ fontSize: 12, color: '#f59e0b', marginBottom: 4 }}>{'⭐'.repeat(5)} <span style={{ color: darkMode ? '#c4b5fd' : '#6b5b8d' }}>({tutor.reviews})</span></div>
                <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 600, marginBottom: 12 }}>● Online</div>
                <button style={{ background: '#6c3ef4', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
                  Book Now
                </button>
              </div>
            ))}
          </div>

          {/* Go Premium Card */}
          <div style={{ background: 'linear-gradient(160deg,#6c3ef4,#4c1d95)', borderRadius: 16, padding: 28, color: '#fff', textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>👑</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 12px' }}>Go Premium</h3>
            <p style={{ fontSize: 13, opacity: 0.85, marginBottom: 20, lineHeight: 1.6 }}>Unlock unlimited access to all tutors, courses, and AI tools</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', textAlign: 'left' }}>
              {['Unlimited sessions', 'Priority booking', 'AI Study Planner', 'Certificates', 'Offline access'].map(item => (
                <li key={item} style={{ fontSize: 13, padding: '4px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#a78bfa' }}>✓</span> {item}
                </li>
              ))}
            </ul>
            <button onClick={handleStartFree} style={{ background: '#fff', color: '#6c3ef4', border: 'none', borderRadius: 10, padding: '12px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer', width: '100%' }}>
              Upgrade Now →
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS ROW ── */}
      <section style={{ background: darkMode ? '#1a0533' : '#6c3ef4', padding: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 0, maxWidth: 1000, margin: '0 auto', flexWrap: 'wrap' }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center', padding: '0 48px', color: '#fff', borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none' }}>
              <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-1px' }}>{s.value}</div>
              <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '72px 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#6c3ef4', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Learner Stories</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, margin: 0, color: darkMode ? '#f1f0ff' : '#1a0533' }}>Trusted by Learners Worldwide</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 320px', gap: 20, alignItems: 'start' }}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} style={{ background: darkMode ? '#1a0533' : '#fff', borderRadius: 16, padding: 28, boxShadow: '0 2px 16px rgba(108,62,244,0.08)', border: `1px solid ${darkMode ? '#2d1a5e' : '#ede9ff'}` }}>
              <div style={{ color: '#f59e0b', fontSize: 18, marginBottom: 12 }}>{'⭐'.repeat(t.rating)}</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: darkMode ? '#c4b5fd' : '#4b3a6b', margin: '0 0 20px' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg,#6c3ef4,#9b59f5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: darkMode ? '#f1f0ff' : '#1a0533' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: darkMode ? '#a78bfa' : '#6c3ef4' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}

          {/* CTA Card */}
          <div style={{ background: 'linear-gradient(160deg,#6c3ef4,#4c1d95)', borderRadius: 16, padding: 32, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 12px' }}>Ready to Start Your Learning Journey?</h3>
            <p style={{ fontSize: 13, opacity: 0.85, marginBottom: 24, lineHeight: 1.6 }}>Join 500K+ learners already growing with AVENQORI</p>
            <button onClick={handleStartFree} style={{ background: '#fff', color: '#6c3ef4', border: 'none', borderRadius: 10, padding: '14px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              Create Free Account →
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0d0121', color: '#c4b5fd', padding: '56px 48px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 48, marginBottom: 48 }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 22, color: '#fff', marginBottom: 16 }}>
                <span style={{ background: '#6c3ef4', borderRadius: 8, padding: '2px 8px', fontSize: 16 }}>A</span> AVENQORI
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0, opacity: 0.7 }}>
                The AI-powered tutor marketplace connecting learners with expert instructors worldwide.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <div style={{ fontWeight: 700, color: '#fff', marginBottom: 16, fontSize: 15 }}>Quick Links</div>
              {['Home', 'Courses', 'Find a Tutor', 'Features', 'Pricing'].map(l => (
                <div key={l}><a href="#" style={{ color: '#c4b5fd', textDecoration: 'none', fontSize: 14, lineHeight: 2.2, opacity: 0.8 }}>{l}</a></div>
              ))}
            </div>

            {/* Support */}
            <div>
              <div style={{ fontWeight: 700, color: '#fff', marginBottom: 16, fontSize: 15 }}>Support</div>
              {['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact Us', 'FAQ'].map(l => (
                <div key={l}><a href="#" style={{ color: '#c4b5fd', textDecoration: 'none', fontSize: 14, lineHeight: 2.2, opacity: 0.8 }}>{l}</a></div>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <div style={{ fontWeight: 700, color: '#fff', marginBottom: 8, fontSize: 15 }}>Follow Us</div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                {['𝕏', 'in', 'f', '📷'].map(icon => (
                  <a key={icon} href="#" style={{ width: 36, height: 36, background: '#1a0533', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c4b5fd', textDecoration: 'none', fontSize: 15, border: '1px solid #2d1a5e' }}>{icon}</a>
                ))}
              </div>
              <div style={{ fontWeight: 700, color: '#fff', marginBottom: 10, fontSize: 15 }}>Newsletter</div>
              <div style={{ display: 'flex', gap: 0 }}>
                <input type="email" placeholder="Your email…" style={{ flex: 1, padding: '10px 14px', border: '1px solid #2d1a5e', background: '#1a0533', color: '#fff', borderRadius: '8px 0 0 8px', outline: 'none', fontSize: 13 }} />
                <button style={{ background: '#6c3ef4', color: '#fff', border: 'none', borderRadius: '0 8px 8px 0', padding: '10px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>Subscribe</button>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #2d1a5e', paddingTop: 24, textAlign: 'center', fontSize: 13, opacity: 0.5 }}>
            © 2024 AVENQORI. All rights reserved. Made with ❤️ for learners everywhere.
          </div>
        </div>
      </footer>
    </div>
  );
}
