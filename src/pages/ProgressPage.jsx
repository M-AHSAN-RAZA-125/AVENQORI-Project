import { useState } from 'react';
import { useApp, PAGES } from '../context/AppContext';

export default function ProgressPage() {
  const { navigate, toast } = useApp();
  const [timeRange, setTimeRange] = useState('30days');

  const subjectProgress = [
    { name: 'Mathematics', pct: 90, icon: '📐', color: '#4f46e5' },
    { name: 'Python Programming', pct: 76, icon: '🐍', color: '#8b5cf6' },
    { name: 'Web Development', pct: 62, icon: '⚛️', color: '#10b981' },
    { name: 'Science', pct: 48, icon: '🧪', color: '#f59e0b' },
    { name: 'English', pct: 85, icon: '📖', color: '#06b6d4' }
  ];

  const courseProgressList = [
    { title: 'Python Programming', status: 'Completed', pct: 100, icon: '🐍', action: 'View Certificate 🏆', target: PAGES.certificates },
    { title: 'Web Development', status: 'In Progress', pct: 65, icon: '💻', action: 'Continue Learning →', target: PAGES.myCourses },
    { title: 'Mathematics Basics', status: 'In Progress', pct: 45, icon: '📐', action: 'Continue Learning →', target: PAGES.myCourses },
    { title: 'Science Fundamentals', status: 'Not Started', pct: 0, icon: '🧪', action: 'Start Course →', target: PAGES.myCourses }
  ];

  return (
    <div className="progress-page-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">📊</div>
        <div className="banner-text">
          <h1>My Learning Growth & Performance Analytics</h1>
          <p>Track your study consistency, subject proficiencies, and learning velocity with AI analytics.</p>
        </div>
        <div className="banner-art">📈</div>
      </div>

      {/* Top 4 Stats */}
      <div className="grid-4 mb-20">
        <div className="stat-card">
          <div className="stat-icon purple">📚</div>
          <div className="stat-info">
            <strong>5</strong>
            <span>Enrolled Courses</span>
          </div>
          <span className="stat-change">+1 this month</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">⏱️</div>
          <div className="stat-info">
            <strong>36.5 hrs</strong>
            <span>Learning Hours</span>
          </div>
          <span className="stat-change">+4.2 hrs</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">🎯</div>
          <div className="stat-info">
            <strong>68%</strong>
            <span>Overall Progress</span>
          </div>
          <span className="stat-change">+12%</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">🔥</div>
          <div className="stat-info">
            <strong>12 Days</strong>
            <span>Learning Streak</span>
          </div>
          <span className="stat-change">Keep it up!</span>
        </div>
      </div>

      {/* Analytics Chart Row */}
      <div className="grid-2 mb-20" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
        {/* Progress Curve Chart */}
        <div className="card p">
          <div className="flex-b mb-16">
            <h3>📈 Your Learning Progress Curve</h3>
            <select
              className="form-select"
              style={{ width: 'auto', padding: '6px 12px', fontSize: '13px' }}
              value={timeRange}
              onChange={e => setTimeRange(e.target.value)}
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 3 Months</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '20px', alignItems: 'center' }}>
            {/* Donut progress */}
            <div style={{ textAlign: 'center' }}>
              <div className="circle-progress" style={{ width: '110px', height: '110px' }}>
                <svg width="110" height="110" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg2)" strokeWidth="12" />
                  <circle
                    cx="60" cy="60" r="50" fill="none" stroke="var(--purple)" strokeWidth="12"
                    strokeDasharray="314.15" strokeDashoffset="100.5" strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="circle-label" style={{ fontSize: '20px' }}>68%</div>
              </div>
              <strong style={{ fontSize: '14px', display: 'block', marginTop: '6px' }}>Overall Progress</strong>
              <span className="text-xs text-ok font-bold">▲ +12% from last month</span>
            </div>

            {/* SVG Interactive Line Chart */}
            <div>
              <svg width="100%" height="160" viewBox="0 0 400 160">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                <line x1="40" y1="20" x2="380" y2="20" stroke="#f1f5f9" strokeDasharray="3" />
                <line x1="40" y1="60" x2="380" y2="60" stroke="#f1f5f9" strokeDasharray="3" />
                <line x1="40" y1="100" x2="380" y2="100" stroke="#f1f5f9" strokeDasharray="3" />
                <line x1="40" y1="140" x2="380" y2="140" stroke="#f1f5f9" strokeDasharray="3" />

                {/* Y labels */}
                <text x="10" y="25" fontSize="10" fill="#94a3b8">100%</text>
                <text x="10" y="65" fontSize="10" fill="#94a3b8">75%</text>
                <text x="10" y="105" fontSize="10" fill="#94a3b8">50%</text>
                <text x="10" y="145" fontSize="10" fill="#94a3b8">25%</text>

                {/* Area under curve */}
                <path
                  d="M 50 135 Q 90 120 130 110 T 210 95 T 290 65 T 370 50 L 370 140 L 50 140 Z"
                  fill="url(#chartGrad)"
                />

                {/* Line */}
                <path
                  d="M 50 135 Q 90 120 130 110 T 210 95 T 290 65 T 370 50"
                  fill="none"
                  stroke="#6c3ef4"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Data Points */}
                <circle cx="50" cy="135" r="4" fill="#6c3ef4" stroke="#fff" strokeWidth="2" />
                <circle cx="130" cy="110" r="4" fill="#6c3ef4" stroke="#fff" strokeWidth="2" />
                <circle cx="210" cy="95" r="4" fill="#6c3ef4" stroke="#fff" strokeWidth="2" />
                <circle cx="290" cy="65" r="4" fill="#6c3ef4" stroke="#fff" strokeWidth="2" />
                <circle cx="370" cy="50" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />

                {/* Current node callout */}
                <rect x="330" y="18" width="55" height="22" rx="4" fill="#1e1052" />
                <text x="357" y="33" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="bold">68%</text>

                {/* X labels */}
                <text x="50" y="155" fontSize="9" fill="#94a3b8" textAnchor="middle">Oct 18</text>
                <text x="130" y="155" fontSize="9" fill="#94a3b8" textAnchor="middle">Oct 27</text>
                <text x="210" y="155" fontSize="9" fill="#94a3b8" textAnchor="middle">Nov 02</text>
                <text x="290" y="155" fontSize="9" fill="#94a3b8" textAnchor="middle">Nov 08</text>
                <text x="370" y="155" fontSize="9" fill="#94a3b8" textAnchor="middle">Nov 14</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Subject-wise Progress */}
        <div className="card p">
          <div className="flex-b mb-16">
            <h3>📊 Subject-wise Proficiency</h3>
            <span className="text-xs text-purple font-bold" style={{ cursor: 'pointer' }} onClick={() => toast('All syllabus metrics up to date', 'info')}>
              View Details →
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {subjectProgress.map(subj => (
              <div key={subj.name}>
                <div className="flex-b text-sm mb-4">
                  <span className="flex-c gap-8">
                    <span>{subj.icon}</span>
                    <strong>{subj.name}</strong>
                  </span>
                  <strong style={{ color: subj.color }}>{subj.pct}%</strong>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${subj.pct}%`, background: subj.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Progress Cards Grid */}
      <h3 className="mb-16">📚 Course Completion Status</h3>
      <div className="grid-4 mb-24">
        {courseProgressList.map((c, i) => (
          <div key={i} className="card p" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="flex-b mb-12">
                <span style={{ fontSize: '32px' }}>{c.icon}</span>
                <span className={`badge ${c.status === 'Completed' ? 'badge-green' : c.status === 'In Progress' ? 'badge-purple' : 'badge-gray'}`}>
                  {c.status}
                </span>
              </div>
              <h4 style={{ fontSize: '15px', marginBottom: '6px' }}>{c.title}</h4>
              <div className="text-xs text-muted mb-8">{c.pct}% Complete</div>
              <div className="progress-bar mb-16">
                <div className={`progress-fill ${c.pct === 100 ? 'green' : ''}`} style={{ width: `${c.pct}%` }}></div>
              </div>
            </div>

            <button className="btn btn-outline btn-sm btn-full" onClick={() => navigate(c.target)}>
              {c.action}
            </button>
          </div>
        ))}
      </div>

      {/* Learning Insights card */}
      <div className="card p" style={{ background: 'linear-gradient(135deg, #1e1052 0%, #2d1b6e 100%)', color: '#fff' }}>
        <div className="flex-b">
          <div className="flex-c gap-16">
            <span style={{ fontSize: '42px' }}>💡</span>
            <div>
              <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '4px' }}>AI Learning Insights & Velocity</h4>
              <p style={{ color: '#c4b5fd', fontSize: '13px', margin: 0 }}>
                You're 68% towards your monthly goal. By maintaining your current 1.8 hrs/day pace, you will complete the Python mastery track 4 days ahead of schedule!
              </p>
            </div>
          </div>
          <button className="btn btn-sm" style={{ background: 'var(--purple)', color: '#fff', border: 'none', minWidth: '130px' }} onClick={() => toast('Goal target updated to 2 hrs/day', 'success')}>
            Set New Goal →
          </button>
        </div>
      </div>
    </div>
  );
}
