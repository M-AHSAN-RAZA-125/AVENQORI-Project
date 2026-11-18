import { useState } from 'react';
import { useApp, PAGES } from '../context/AppContext';

/* ── Inline mock data ───────────────────────────────────────── */
const MY_COURSES = [
  { id: 1, emoji: '🐍', title: 'Python Programming', tutor: 'Sarah Khan', status: 'In Progress', pct: 68, color: '#fef3c7' },
  { id: 2, emoji: '⚛️', title: 'Web Development (React)', tutor: 'Usman Ahmad', status: 'In Progress', pct: 45, color: '#dbeafe' },
  { id: 3, emoji: '➕', title: 'Mathematics Basics', tutor: 'Ayesha Malik', status: 'Not Started', pct: 0, color: '#d1fae5' },
];

const UPCOMING = [
  { day: 'Nov 16', weekday: 'Sun', name: 'Mathematics Live Class', tutor: 'Sarah Khan', time: '07:00–08:00 PM' },
  { day: 'Nov 17', weekday: 'Mon', name: 'Python Programming', tutor: 'Usman Ahmad', time: '08:00–09:00 PM' },
  { day: 'Nov 19', weekday: 'Wed', name: 'Web Development', tutor: 'Ayesha Malik', time: '07:00–08:30 PM' },
];

const NOTIFICATIONS = [
  { icon: '📚', text: 'New lesson added in Python Programming', time: '2 hours ago', color: '#ede9fe' },
  { icon: '📅', text: 'Upcoming class: Mathematics Live — Today 7PM', time: '5 hours ago', color: '#dbeafe' },
  { icon: '🏆', text: 'You completed Week 3 of React course!', time: 'Yesterday', color: '#d1fae5' },
];

const AI_CHIPS = [
  'Explain React hooks in simple words',
  'Create a study plan for me',
  'Help me with Math homework',
];

const STATS = [
  { icon: '📚', label: '12 Enrolled Courses', change: '↑2%', iconBg: 'purple' },
  { icon: '👥', label: '3.5K+ Active Learners', change: '', iconBg: 'green' },
  { icon: '🎓', label: '500+ Expert Tutors', change: '', iconBg: 'yellow' },
  { icon: '⭐', label: '4.9/5 Platform Rating', change: '', iconBg: 'blue' },
];

/* ── Circular Progress SVG ──────────────────────────────────── */
function CircularProgress({ pct = 75, size = 100, stroke = 10 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const fill = circ - (pct / 100) * circ;
  return (
    <div className="circle-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ede9fe" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="#6c3ef4" strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={fill}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset .6s ease' }}
        />
      </svg>
      <span className="circle-label">{pct}%</span>
    </div>
  );
}

/* ── Course Card ────────────────────────────────────────────── */
function CourseCard({ course, onNavigate }) {
  const isStarted = course.pct > 0;
  const isCompleted = course.pct === 100;
  return (
    <div className="course-card">
      <div className="course-thumb" style={{ background: course.color }}>
        <span style={{ fontSize: 48 }}>{course.emoji}</span>
        <span className={`course-status-badge ${isCompleted ? 'status-completed' : isStarted ? 'status-progress' : 'status-not-started'}`}>
          {course.status}
        </span>
      </div>
      <div className="course-body">
        <div className="course-title">{course.title}</div>
        <div className="course-tutor">
          <span className="av av-sm">{course.tutor[0]}</span>
          {course.tutor}
        </div>
        <div className="progress-bar" style={{ marginBottom: 6 }}>
          <div className="progress-fill" style={{ width: `${course.pct}%` }} />
        </div>
        <div className="flex-b">
          <span className="course-pct">{course.pct}%</span>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onNavigate(PAGES.myCourses)}
          >
            {isStarted ? 'Continue Learning →' : 'Start Course →'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Dashboard Page ─────────────────────────────────────────── */
export default function DashboardPage() {
  const { navigate, user } = useApp();
  const [aiMsg, setAiMsg] = useState('');

  const userName = user?.name?.split(' ')[0] ?? 'Ahmed';

  return (
    <div className="page-content">

      {/* ── Welcome Banner ──────────────────────────────────── */}
      <div className="page-banner" style={{ marginBottom: 24, alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div className="banner-text">
          <h1>Welcome Back, {userName}! 👋</h1>
          <p style={{ marginBottom: 16 }}>Keep Learning, Achieve More</p>
          <div className="flex-c gap-8">
            <button className="btn btn-primary" onClick={() => navigate(PAGES.myCourses)}>
              Explore Courses →
            </button>
            <button className="btn" style={{ background: 'rgba(255,255,255,.18)', color: '#fff', borderColor: 'rgba(255,255,255,.35)' }}>
              ▶ Watch Video
            </button>
          </div>
        </div>

        {/* Learning Progress Card */}
        <div style={{
          background: 'rgba(255,255,255,.15)',
          borderRadius: 14,
          padding: '16px 20px',
          minWidth: 240,
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,.25)',
          position: 'relative', zIndex: 1,
        }}>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>📊 Your Learning Progress</div>
          <div className="flex-c gap-16">
            <CircularProgress pct={75} size={90} stroke={9} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ color: '#fff', fontSize: 12 }}>
                <div style={{ fontWeight: 700 }}>3/4</div>
                <div style={{ opacity: .75 }}>Courses Completed</div>
              </div>
              <div style={{ color: '#fff', fontSize: 12 }}>
                <div style={{ fontWeight: 700 }}>24.5 hrs</div>
                <div style={{ opacity: .75 }}>Learning Hours</div>
              </div>
              <div style={{ color: '#fff', fontSize: 12 }}>
                <div style={{ fontWeight: 700 }}>🔥 12 Days</div>
                <div style={{ opacity: .75 }}>Current Streak</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Row ───────────────────────────────────────── */}
      <div className="grid-4 mb-20">
        {STATS.map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.iconBg}`}>{s.icon}</div>
            <div className="stat-info">
              <strong style={{ fontSize: 15 }}>{s.label}</strong>
              <span>Platform metric</span>
            </div>
            {s.change && <span className="stat-change">{s.change}</span>}
          </div>
        ))}
      </div>

      {/* ── 3-Column Grid ───────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px 280px', gap: 20, alignItems: 'start' }}>

        {/* ── COLUMN 1: My Courses + Notifications ──────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* My Courses */}
          <section>
            <div className="section-header">
              <h2>My Courses</h2>
              <button className="link-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--purple)', fontWeight: 600, fontSize: 13 }} onClick={() => navigate(PAGES.myCourses)}>
                View All →
              </button>
            </div>
            <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
              {MY_COURSES.map(c => (
                <CourseCard key={c.id} course={c} onNavigate={navigate} />
              ))}
            </div>
          </section>

          {/* Recent Notifications */}
          <section>
            <div className="section-header">
              <h2>Recent Notifications</h2>
              <button className="link-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--purple)', fontWeight: 600, fontSize: 13 }} onClick={() => navigate(PAGES.notifications)}>
                View All →
              </button>
            </div>
            <div className="card p-16" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {NOTIFICATIONS.map((n, i) => (
                <div key={i} className="flex-c gap-12" style={{ padding: '10px 12px', borderRadius: 10, background: n.color }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{n.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{n.text}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── COLUMN 2: Upcoming Classes ────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <section>
            <div className="section-header">
              <h2>Upcoming Classes</h2>
            </div>
            <div className="card" style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {UPCOMING.map((u, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  paddingBottom: i < UPCOMING.length - 1 ? 12 : 0,
                  borderBottom: i < UPCOMING.length - 1 ? '1px solid var(--line)' : 'none',
                }}>
                  {/* Date badge */}
                  <div style={{
                    background: 'var(--grad)', color: '#fff', borderRadius: 10,
                    padding: '8px 10px', textAlign: 'center', flexShrink: 0, minWidth: 52,
                  }}>
                    <div style={{ fontSize: 15, fontWeight: 800 }}>{u.day.split(' ')[1]}</div>
                    <div style={{ fontSize: 10, opacity: .85 }}>{u.day.split(' ')[0]}</div>
                    <div style={{ fontSize: 10, opacity: .75 }}>{u.weekday}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{u.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', margin: '2px 0' }}>by {u.tutor}</div>
                    <div style={{ fontSize: 12, color: 'var(--purple)', fontWeight: 600 }}>🕐 {u.time}</div>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ marginTop: 6, padding: '5px 12px', fontSize: 12 }}
                      onClick={() => navigate(PAGES.liveClasses)}
                    >
                      Join Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── COLUMN 3: AI Assistant + Upgrade ─────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* AI Learning Assistant */}
          <section>
            <div className="ai-chat-box">
              <div className="ai-header">
                <span className="ai-avatar">🤖</span>
                <div>
                  <div className="ai-title">AI Learning Assistant</div>
                  <div className="ai-sub">Ask anything, get instant help!</div>
                </div>
              </div>
              <div className="ai-msgs">
                {AI_CHIPS.map((chip, i) => (
                  <div key={i} className="ai-bubble" onClick={() => setAiMsg(chip)}>
                    💬 {chip}
                  </div>
                ))}
              </div>
              <div className="ai-input-row">
                <input
                  value={aiMsg}
                  onChange={e => setAiMsg(e.target.value)}
                  placeholder="Ask a question…"
                  onKeyDown={e => e.key === 'Enter' && setAiMsg('')}
                />
                <button className="ai-send" onClick={() => setAiMsg('')}>➤</button>
              </div>
            </div>
          </section>

          {/* Upgrade to Premium */}
          <div className="upgrade-card">
            <div className="crown">👑</div>
            <h3>Upgrade to Premium</h3>
            <p>Unlock all courses, live classes, certificates &amp; AI features!</p>
            <button className="upgrade-btn">⚡ Upgrade Now</button>
          </div>
        </div>

      </div>
    </div>
  );
}
