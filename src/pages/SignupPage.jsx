import { useState, useCallback } from 'react';
import { useApp, PAGES } from '../context/AppContext';

const STUDENT_PERKS = [
  'Access expert tutors anytime',
  'Join live interactive classes',
  'Get certified & recognized',
  'Track your progress daily',
];

const TEACHER_PERKS = [
  'Teach Online to global students',
  'Earn Online on your schedule',
  'Grow Your Profile & reputation',
  'Reach Global Students worldwide',
];

export default function SignupPage() {
  const { navigate, login } = useApp();
  const [role, setRole] = useState('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [proTitle, setProTitle] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSignup = useCallback((e) => {
    e.preventDefault();
    if (!agreed) return;
    login();
  }, [login, agreed]);

  const handleLogin = useCallback(() => navigate(PAGES.login), [navigate]);

  const isStudent = role === 'student';
  const perks = isStudent ? STUDENT_PERKS : TEACHER_PERKS;
  const leftTitle = isStudent
    ? 'Join AVENQORI and Start Your Learning Journey'
    : 'Become a Tutor and Make an Impact';

  return (
    <div className="auth-page" style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* ── LEFT PANEL ── */}
      <div className="auth-side auth-side--left" style={{
        flex: '0 0 42%', background: 'linear-gradient(160deg,#1a0533 0%,#3b0f7a 60%,#6c3ef4 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '56px 48px', color: '#fff', position: 'relative', overflow: 'hidden',
      }}>
        {/* Background decorations */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(108,62,244,0.15)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(108,62,244,0.1)', pointerEvents: 'none' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
          <span style={{ background: '#fff', color: '#6c3ef4', borderRadius: 10, padding: '4px 10px', fontWeight: 900, fontSize: 18 }}>A</span>
          <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.5px' }}>AVENQORI</span>
        </div>

        {/* Dynamic title */}
        <h2 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.3, margin: '0 0 20px' }}>
          {leftTitle}
        </h2>
        <p style={{ fontSize: 14, opacity: 0.8, lineHeight: 1.6, marginBottom: 36 }}>
          {isStudent
            ? 'Connect with the best tutors and AI-curated courses to reach your full potential.'
            : 'Share your expertise with students around the world and build a thriving online teaching career.'}
        </p>

        {/* Perks */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {perks.map((perk, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 28, height: 28, background: 'rgba(255,255,255,0.2)', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, flexShrink: 0,
              }}>
                ✓
              </div>
              <span style={{ fontSize: 14, lineHeight: 1.5 }}>{perk}</span>
            </div>
          ))}
        </div>

        {/* Illustration placeholder */}
        <div style={{ marginTop: 40, background: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: '20px 24px', textAlign: 'center' }}>
          <span style={{ fontSize: 48 }}>{isStudent ? '📚' : '🎓'}</span>
          <div style={{ fontSize: 13, opacity: 0.7, marginTop: 8 }}>
            {isStudent ? 'Start learning today — it\'s free!' : 'Start teaching today and earn!'}
          </div>
        </div>
      </div>

      {/* ── RIGHT FORM ── */}
      <div className="auth-side auth-side--right" style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#fff', padding: '48px 32px', overflowY: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 6px', color: '#1a0533' }}>Create Your Account 🚀</h1>
          <p style={{ fontSize: 14, color: '#6b5b8d', marginBottom: 24 }}>Join 500K+ learners and tutors on AVENQORI</p>

          {/* Role Tabs */}
          <div style={{ display: 'flex', background: '#f3f0ff', borderRadius: 10, padding: 4, marginBottom: 24, gap: 4 }}>
            {[{ id: 'student', label: 'Student', icon: '🎓' }, { id: 'teacher', label: 'Tutor', icon: '👩‍🏫' }].map(r => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                style={{
                  flex: 1, padding: '10px', border: 'none', borderRadius: 8, cursor: 'pointer',
                  fontWeight: 700, fontSize: 14, transition: 'all .2s',
                  background: role === r.id ? '#6c3ef4' : 'transparent',
                  color: role === r.id ? '#fff' : '#6b5b8d',
                }}
              >
                {r.icon} {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSignup}>
            {/* Full Name */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1a0533', marginBottom: 6 }}>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
                style={{
                  width: '100%', padding: '12px 14px', border: '1.5px solid #e0d9f5',
                  borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#1a0533',
                }}
                onFocus={e => e.target.style.borderColor = '#6c3ef4'}
                onBlur={e => e.target.style.borderColor = '#e0d9f5'}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1a0533', marginBottom: 6 }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  width: '100%', padding: '12px 14px', border: '1.5px solid #e0d9f5',
                  borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#1a0533',
                }}
                onFocus={e => e.target.style.borderColor = '#6c3ef4'}
                onBlur={e => e.target.style.borderColor = '#e0d9f5'}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1a0533', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  style={{
                    width: '100%', padding: '12px 44px 12px 14px', border: '1.5px solid #e0d9f5',
                    borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#1a0533',
                  }}
                  onFocus={e => e.target.style.borderColor = '#6c3ef4'}
                  onBlur={e => e.target.style.borderColor = '#e0d9f5'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#9b59f5' }}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Professional Title (Tutor only) */}
            {!isStudent && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1a0533', marginBottom: 6 }}>
                  Professional Title <span style={{ fontWeight: 400, color: '#9b8fad' }}>(optional)</span>
                </label>
                <input
                  type="text"
                  value={proTitle}
                  onChange={e => setProTitle(e.target.value)}
                  placeholder="e.g. Senior Math Tutor, Python Expert"
                  style={{
                    width: '100%', padding: '12px 14px', border: '1.5px solid #e0d9f5',
                    borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box', color: '#1a0533',
                  }}
                  onFocus={e => e.target.style.borderColor = '#6c3ef4'}
                  onBlur={e => e.target.style.borderColor = '#e0d9f5'}
                />
              </div>
            )}

            {/* Terms & Conditions */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: '#4b3a6b', cursor: 'pointer', lineHeight: 1.5 }}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  style={{ accentColor: '#6c3ef4', marginTop: 2, flexShrink: 0 }}
                  required
                />
                <span>
                  I agree to the{' '}
                  <a href="#" style={{ color: '#6c3ef4', fontWeight: 600, textDecoration: 'none' }}>Terms & Conditions</a>
                  {' '}and{' '}
                  <a href="#" style={{ color: '#6c3ef4', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</a>
                </span>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={!agreed}
              style={{
                width: '100%', background: agreed ? 'linear-gradient(135deg,#6c3ef4,#9b59f5)' : '#c4b5fd',
                color: '#fff', border: 'none', borderRadius: 10, padding: '14px',
                fontSize: 15, fontWeight: 700, cursor: agreed ? 'pointer' : 'not-allowed',
                marginBottom: 20, boxShadow: agreed ? '0 4px 20px rgba(108,62,244,0.35)' : 'none',
                transition: 'all .2s',
              }}
            >
              {isStudent ? 'Create Student Account →' : 'Join as Tutor →'}
            </button>
          </form>

          {/* Login Link */}
          <p style={{ textAlign: 'center', fontSize: 14, color: '#6b5b8d', margin: 0 }}>
            Already have an account?{' '}
            <button onClick={handleLogin} style={{ background: 'none', border: 'none', color: '#6c3ef4', fontWeight: 700, fontSize: 14, cursor: 'pointer', padding: 0 }}>
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
