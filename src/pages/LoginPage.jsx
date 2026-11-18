import { useState, useCallback } from 'react';
import { useApp, PAGES } from '../context/AppContext';

export default function LoginPage() {
  const { navigate, login } = useApp();
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleLogin = useCallback((e) => {
    e.preventDefault();
    login();
  }, [login]);

  const handleSignup = useCallback(() => navigate(PAGES.signup), [navigate]);

  return (
    <div className="auth-page" style={{
      display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif',
    }}>
      {/* ── LEFT PANEL ── */}
      <div className="auth-side auth-side--left" style={{
        flex: '0 0 42%', background: 'linear-gradient(160deg,#1a0533 0%,#3b0f7a 60%,#6c3ef4 100%)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '56px 48px', color: '#fff', position: 'relative', overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(108,62,244,0.15)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(108,62,244,0.1)', pointerEvents: 'none' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
          <span style={{ background: '#fff', color: '#6c3ef4', borderRadius: 10, padding: '4px 10px', fontWeight: 900, fontSize: 18 }}>A</span>
          <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.5px' }}>AVENQORI</span>
        </div>

        <h2 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.3, margin: '0 0 16px' }}>
          Smarter Learning<br />for a Brighter Future
        </h2>
        <p style={{ fontSize: 15, opacity: 0.8, lineHeight: 1.7, marginBottom: 48 }}>
          Join millions of learners and expert tutors on the most trusted AI-powered education platform.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { icon: '👥', value: '500K+', label: 'Active Learners' },
            { icon: '🎓', value: '50K+', label: 'Expert Tutors' },
            { icon: '🌍', value: '150+', label: 'Countries' },
          ].map(stat => (
            <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, background: 'rgba(255,255,255,0.12)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                {stat.icon}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 20 }}>{stat.value}</div>
                <div style={{ fontSize: 13, opacity: 0.75 }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT FORM ── */}
      <div className="auth-side auth-side--right" style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#fff', padding: '48px 32px',
      }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 6px', color: '#1a0533' }}>Welcome Back! 👋</h1>
          <p style={{ fontSize: 14, color: '#6b5b8d', marginBottom: 28 }}>Sign in to continue your learning journey</p>

          {/* Role Tabs */}
          <div style={{ display: 'flex', background: '#f3f0ff', borderRadius: 10, padding: 4, marginBottom: 28, gap: 4 }}>
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

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1a0533', marginBottom: 6 }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  width: '100%', padding: '12px 14px', border: '1.5px solid #e0d9f5',
                  borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color .2s', color: '#1a0533',
                }}
                onFocus={e => e.target.style.borderColor = '#6c3ef4'}
                onBlur={e => e.target.style.borderColor = '#e0d9f5'}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1a0533', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{
                    width: '100%', padding: '12px 44px 12px 14px', border: '1.5px solid #e0d9f5',
                    borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box',
                    transition: 'border-color .2s', color: '#1a0533',
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

            {/* Remember me + Forgot */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#4b3a6b', cursor: 'pointer' }}>
                <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ accentColor: '#6c3ef4' }} />
                Remember me
              </label>
              <a href="#" style={{ fontSize: 13, color: '#6c3ef4', textDecoration: 'none', fontWeight: 600 }}>Forgot password?</a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              style={{
                width: '100%', background: 'linear-gradient(135deg,#6c3ef4,#9b59f5)', color: '#fff',
                border: 'none', borderRadius: 10, padding: '14px', fontSize: 15, fontWeight: 700,
                cursor: 'pointer', marginBottom: 20, boxShadow: '0 4px 20px rgba(108,62,244,0.35)',
              }}
            >
              Login →
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: '#e0d9f5' }} />
            <span style={{ fontSize: 12, color: '#9b8fad', whiteSpace: 'nowrap' }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: '#e0d9f5' }} />
          </div>

          {/* Social Buttons */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
            {[
              { icon: 'G', label: 'Google', bg: '#fff', color: '#1a0533', border: '1.5px solid #e0d9f5' },
              { icon: '🍎', label: 'Apple', bg: '#000', color: '#fff', border: 'none' },
              { icon: 'f', label: 'Facebook', bg: '#1877f2', color: '#fff', border: 'none' },
            ].map(social => (
              <button
                key={social.label}
                style={{
                  flex: 1, padding: '11px 8px', border: social.border || 'none', borderRadius: 10,
                  background: social.bg, color: social.color, fontSize: 15, fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}
              >
                <span>{social.icon}</span>
                <span style={{ fontSize: 12 }}>{social.label}</span>
              </button>
            ))}
          </div>

          {/* Sign Up Link */}
          <p style={{ textAlign: 'center', fontSize: 14, color: '#6b5b8d', margin: 0 }}>
            Don't have an account?{' '}
            <button onClick={handleSignup} style={{ background: 'none', border: 'none', color: '#6c3ef4', fontWeight: 700, fontSize: 14, cursor: 'pointer', padding: 0 }}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
