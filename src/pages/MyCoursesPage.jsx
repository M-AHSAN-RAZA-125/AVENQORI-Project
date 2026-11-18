import { useState } from 'react';
import { useApp, PAGES } from '../context/AppContext';

/* ── Inline mock data ───────────────────────────────────────── */
const COURSES = [
  {
    id: 1,
    emoji: '🐍',
    title: 'Python Programming from Beginner to Advanced',
    tutor: 'Sarah Khan',
    tutorInitial: 'S',
    lessons: 24,
    duration: '12h 30m',
    description: 'Master Python from basics to advanced topics including OOP, data structures, and real-world projects.',
    pct: 68,
    status: 'inProgress',
    favorited: false,
    color: '#fef3c7',
  },
  {
    id: 2,
    emoji: '⚛️',
    title: 'React JS for Modern Web Development',
    tutor: 'Ali Raza',
    tutorInitial: 'A',
    lessons: 32,
    duration: '15h 20m',
    description: 'Learn React from scratch — components, hooks, state management, and deploying full-stack apps.',
    pct: 100,
    status: 'completed',
    favorited: true,
    color: '#dbeafe',
  },
  {
    id: 3,
    emoji: '➕',
    title: 'Mathematics Basics for Everyone',
    tutor: 'Fatima Noor',
    tutorInitial: 'F',
    lessons: 28,
    duration: '14h 10m',
    description: 'Build a strong foundation in mathematics: arithmetic, algebra, geometry and problem solving.',
    pct: 45,
    status: 'inProgress',
    favorited: false,
    color: '#d1fae5',
  },
  {
    id: 4,
    emoji: '🗣️',
    title: 'English Speaking Course',
    tutor: 'Usman Ahmed',
    tutorInitial: 'U',
    lessons: 20,
    duration: '10h 00m',
    description: 'Improve your spoken English with confidence through daily conversations, pronunciation, and grammar.',
    pct: 0,
    status: 'notStarted',
    favorited: false,
    color: '#fce7f3',
  },
];

const UPCOMING = [
  { emoji: '➕', name: 'Mathematics Live Class', tutor: 'Fatima Noor', time: 'Nov 16 · 07:00–08:00 PM' },
  { emoji: '🐍', name: 'Python Programming',     tutor: 'Sarah Khan',  time: 'Nov 17 · 08:00–09:00 PM' },
  { emoji: '⚛️', name: 'Web Development',         tutor: 'Ali Raza',    time: 'Nov 19 · 07:00–08:30 PM' },
];

const TABS = [
  { key: 'all',        label: 'All Courses',  count: 4 },
  { key: 'inProgress', label: 'In Progress',  count: 2 },
  { key: 'completed',  label: 'Completed',    count: 1 },
  { key: 'favorites',  label: 'Favorites',    count: 1 },
];

const PAGE_STATS = [
  { icon: '📚', value: '4',     label: 'Enrolled Courses',  iconBg: 'purple' },
  { icon: '⏱️', value: '32.5h', label: 'Learning Time',     iconBg: 'blue' },
  { icon: '📈', value: '75%',   label: 'Overall Progress',  iconBg: 'green' },
  { icon: '⭐', value: '4.8/5', label: 'Your Rating',       iconBg: 'yellow' },
];

/* ── Circular Progress SVG ──────────────────────────────────── */
function CircularProgress({ pct = 0, size = 36, stroke = 4 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const fill = circ - (pct / 100) * circ;
  return (
    <div className="circle-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ede9fe" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={pct === 100 ? '#10b981' : '#6c3ef4'} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={fill}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset .6s ease' }}
        />
      </svg>
    </div>
  );
}

/* ── Course Row ─────────────────────────────────────────────── */
function CourseRow({ course, onNavigate }) {
  const isCompleted = course.pct === 100;
  const isStarted   = course.pct > 0;

  return (
    <div className="card" style={{ display: 'flex', gap: 16, padding: 16, alignItems: 'flex-start', marginBottom: 12 }}>
      {/* Thumbnail */}
      <div style={{
        width: 100, height: 80, borderRadius: 10, background: course.color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 36, flexShrink: 0,
      }}>
        {course.emoji}
      </div>

      {/* Body */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
          <h3 style={{ flex: 1, marginBottom: 4 }}>{course.title}</h3>
          <span className={`badge ${isCompleted ? 'badge-green' : isStarted ? 'badge-purple' : 'badge-yellow'}`}>
            {isCompleted ? '✅ Completed' : isStarted ? 'In Progress' : 'Not Started'}
          </span>
        </div>

        {/* Tutor row */}
        <div className="flex-c gap-8 mb-8" style={{ marginBottom: 6 }}>
          <div className="av av-sm">{course.tutorInitial}</div>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>{course.tutor}</span>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>·</span>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>📗 {course.lessons} Lessons</span>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>·</span>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>⏱ {course.duration}</span>
        </div>

        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10, lineHeight: 1.5 }}>{course.description}</p>

        {/* Progress bar */}
        <div className="flex-c gap-8" style={{ marginBottom: 10 }}>
          <CircularProgress pct={course.pct} size={32} stroke={4} />
          <div style={{ flex: 1 }}>
            <div className="progress-bar">
              <div
                className={`progress-fill ${isCompleted ? 'green' : ''}`}
                style={{ width: `${course.pct}%` }}
              />
            </div>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: isCompleted ? 'var(--ok)' : 'var(--purple)', minWidth: 36 }}>
            {course.pct}%
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex-c gap-8">
          {isCompleted ? (
            <>
              <button className="btn btn-outline btn-sm" onClick={() => onNavigate(PAGES.myCourses)}>
                Review Course ★
              </button>
              <button className="btn btn-success btn-sm" onClick={() => onNavigate(PAGES.certificates)}>
                View Certificate 🏆
              </button>
            </>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={() => onNavigate(PAGES.myCourses)}>
              {isStarted ? 'Continue Learning →' : 'Start Course →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── My Courses Page ────────────────────────────────────────── */
export default function MyCoursesPage() {
  const { navigate } = useApp();
  const [activeTab, setActiveTab]   = useState('all');
  const [sortBy, setSortBy]         = useState('recent');
  const [goal, setGoal]             = useState('Complete at least 3 courses this month!');

  /* Filter courses by tab */
  const filtered = COURSES.filter(c => {
    if (activeTab === 'all')        return true;
    if (activeTab === 'inProgress') return c.status === 'inProgress';
    if (activeTab === 'completed')  return c.status === 'completed';
    if (activeTab === 'favorites')  return c.favorited;
    return true;
  });

  /* Sort */
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'progress') return b.pct - a.pct;
    if (sortBy === 'title')    return a.title.localeCompare(b.title);
    return 0; // 'recent' — keep insertion order
  });

  return (
    <div className="page-content">

      {/* ── Page Banner ───────────────────────────────────── */}
      <div className="page-banner" style={{ marginBottom: 24 }}>
        <span className="banner-icon">🎓</span>
        <div className="banner-text">
          <h1>My Courses</h1>
          <p>Continue learning and achieve your goals with AVENQORI</p>
        </div>
        <div className="banner-art">▶</div>
      </div>

      {/* ── Stats Row ─────────────────────────────────────── */}
      <div className="grid-4 mb-20">
        {PAGE_STATS.map(s => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.iconBg}`}>{s.icon}</div>
            <div className="stat-info">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── 2-column layout: list + sidebar ───────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 290px', gap: 20, alignItems: 'start' }}>

        {/* ── LEFT: Tab filter + course list ──────────────── */}
        <div>
          {/* Tab bar + sort */}
          <div className="flex-b" style={{ marginBottom: 16 }}>
            <div className="tab-bar" style={{ marginBottom: 0 }}>
              {TABS.map(t => (
                <button
                  key={t.key}
                  className={`tab-btn ${activeTab === t.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(t.key)}
                >
                  {t.label} ({t.count})
                </button>
              ))}
            </div>
            <select
              className="form-select"
              style={{ width: 'auto', padding: '8px 12px', fontSize: 13 }}
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="recent">Sort: Recent</option>
              <option value="progress">Sort: Progress</option>
              <option value="title">Sort: Title</option>
            </select>
          </div>

          {/* Course list */}
          {sorted.length === 0 ? (
            <div className="card p-20" style={{ textAlign: 'center', color: 'var(--muted)' }}>
              No courses found in this category.
            </div>
          ) : (
            sorted.map(c => <CourseRow key={c.id} course={c} onNavigate={navigate} />)
          )}
        </div>

        {/* ── RIGHT: Sidebar ──────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Learning Goals card */}
          <div className="card p-16">
            <div className="flex-c gap-8" style={{ marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>🎯</span>
              <h3>Your Learning Goals</h3>
            </div>
            <p style={{ fontSize: 13, marginBottom: 10 }}>{goal}</p>
            <div className="flex-c gap-8" style={{ marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '33%' }} />
                </div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--purple)' }}>1/3</span>
            </div>
            <button
              className="btn btn-outline btn-sm btn-full"
              onClick={() => setGoal(goal)}
              style={{ marginTop: 4 }}
            >
              Update Goal
            </button>
          </div>

          {/* Upcoming Classes mini list */}
          <div className="card p-16">
            <div className="flex-b" style={{ marginBottom: 12 }}>
              <h3>Upcoming Classes</h3>
              <button className="link-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--purple)', fontWeight: 600, fontSize: 12 }} onClick={() => navigate(PAGES.liveClasses)}>
                View All →
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {UPCOMING.map((u, i) => (
                <div key={i} className="flex-c gap-10" style={{ padding: '8px 10px', borderRadius: 8, background: 'var(--bg)' }}>
                  <span style={{ fontSize: 20 }}>{u.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{u.tutor} · {u.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade to Premium */}
          <div className="upgrade-card">
            <div className="crown">👑</div>
            <h3>Upgrade to Premium</h3>
            <p>Unlock all courses, live classes &amp; AI features!</p>
            <button className="upgrade-btn">⚡ Upgrade Now</button>
          </div>

        </div>
      </div>
    </div>
  );
}
