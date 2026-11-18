import { useState, useEffect } from 'react';
import { useApp, PAGES } from '../../context/AppContext';
import { TeacherAPI } from '../../services/api';

export default function TeacherDashboardPage() {
  const { navigate, toast } = useApp();
  const [data, setData] = useState(null);
  const [timeFilter, setTimeFilter] = useState('30D');

  useEffect(() => {
    TeacherAPI.getDashboardData().then(res => setData(res));
  }, []);

  if (!data) return <div className="card p text-center text-muted">Loading Teacher Dashboard...</div>;

  return (
    <div className="teacher-dashboard-container">
      {/* Welcome Banner */}
      <div className="page-banner" style={{ minHeight: '160px' }}>
        <div className="banner-icon">👩‍🏫</div>
        <div className="banner-text">
          <h1>Welcome back, {data.teacher.name}! 👋</h1>
          <p>Keep inspiring students and help them achieve their academic goals worldwide.</p>
          <div className="flex gap-12 mt-16">
            <button className="btn btn-primary" onClick={() => navigate(PAGES.teacherProfile)}>
              View My Profile →
            </button>
            <button className="btn btn-ghost" onClick={() => navigate(PAGES.teacherClasses)}>
              Manage Classes
            </button>
          </div>
        </div>

        {/* Banner Stats Pill */}
        <div className="flex gap-20 banner-art" style={{ opacity: 1, fontSize: 'inherit' }}>
          <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.12)', padding: '10px 16px', borderRadius: '12px' }}>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#fff' }}>{data.teacher.totalStudents}+</div>
            <div style={{ fontSize: '11px', color: '#e0d9ff' }}>Total Students</div>
          </div>
          <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.12)', padding: '10px 16px', borderRadius: '12px' }}>
            <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--warn)' }}>★ {data.teacher.rating}</div>
            <div style={{ fontSize: '11px', color: '#e0d9ff' }}>Rating</div>
          </div>
          <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.12)', padding: '10px 16px', borderRadius: '12px' }}>
            <div style={{ fontSize: '20px', fontWeight: 900, color: '#10b981' }}>${data.teacher.totalEarnings}</div>
            <div style={{ fontSize: '11px', color: '#e0d9ff' }}>Total Earnings</div>
          </div>
        </div>
      </div>

      {/* Top 4 Metric Cards */}
      <div className="grid-4 mb-20">
        <div className="stat-card">
          <div className="stat-icon purple">📹</div>
          <div className="stat-info">
            <strong>12</strong>
            <span>Upcoming Classes</span>
          </div>
          <span className="stat-change">↑20%</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">👥</div>
          <div className="stat-info">
            <strong>892</strong>
            <span>Total Students</span>
          </div>
          <span className="stat-change">↑15%</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">💰</div>
          <div className="stat-info">
            <strong>$1,280</strong>
            <span>This Month Earnings</span>
          </div>
          <span className="stat-change">↑28%</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">⭐</div>
          <div className="stat-info">
            <strong>4.9 / 5</strong>
            <span>Your Rating</span>
          </div>
        </div>
      </div>

      {/* Earnings Overview + Class Schedule */}
      <div className="grid-2 mb-20" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
        {/* Earnings Chart Card */}
        <div className="card p">
          <div className="flex-b mb-12">
            <div>
              <h3>📈 Earnings Overview</h3>
              <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--purple)', marginTop: '4px' }}>
                $1,280 <span className="text-xs text-ok font-bold">↑ 28%</span>
              </div>
              <small className="text-muted">This Month Earnings</small>
            </div>

            <div className="flex gap-4">
              {['7D', '30D', '3M', '1Y'].map(f => (
                <button
                  key={f}
                  className={`tab-btn btn-sm ${timeFilter === f ? 'active' : ''}`}
                  style={{ padding: '4px 10px', fontSize: '11px' }}
                  onClick={() => setTimeFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Chart */}
          <div style={{ marginTop: '16px' }}>
            <svg width="100%" height="150" viewBox="0 0 380 150">
              <defs>
                <linearGradient id="tGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <line x1="30" y1="20" x2="360" y2="20" stroke="#f1f5f9" strokeDasharray="3" />
              <line x1="30" y1="60" x2="360" y2="60" stroke="#f1f5f9" strokeDasharray="3" />
              <line x1="30" y1="100" x2="360" y2="100" stroke="#f1f5f9" strokeDasharray="3" />

              <path
                d="M 40 125 Q 80 110 120 100 T 200 85 T 280 60 T 350 45 L 350 130 L 40 130 Z"
                fill="url(#tGrad)"
              />
              <path
                d="M 40 125 Q 80 110 120 100 T 200 85 T 280 60 T 350 45"
                fill="none"
                stroke="#6c3ef4"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="350" cy="45" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
              <rect x="305" y="14" width="60" height="20" rx="4" fill="#1e1052" />
              <text x="335" y="28" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="bold">$1,280</text>

              <text x="40" y="145" fontSize="9" fill="#94a3b8">Nov 1</text>
              <text x="120" y="145" fontSize="9" fill="#94a3b8">Nov 7</text>
              <text x="200" y="145" fontSize="9" fill="#94a3b8">Nov 14</text>
              <text x="280" y="145" fontSize="9" fill="#94a3b8">Nov 21</text>
              <text x="350" y="145" fontSize="9" fill="#94a3b8">Nov 30</text>
            </svg>
          </div>
        </div>

        {/* My Classes Schedule */}
        <div className="card p">
          <div className="flex-b mb-14">
            <h3>📅 My Classes Schedule</h3>
            <span className="text-xs text-purple font-bold" style={{ cursor: 'pointer' }} onClick={() => navigate(PAGES.teacherSchedule)}>
              View All →
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.schedule.map(cls => (
              <div key={cls.id} className="flex-b p-12" style={{ background: 'var(--bg)', borderRadius: '10px', borderLeft: `4px solid ${cls.color}` }}>
                <div>
                  <div className="flex-c gap-8">
                    <span className="text-xs text-muted font-bold">{cls.date}</span>
                    <strong style={{ fontSize: '13px' }}>{cls.title}</strong>
                  </div>
                  <span className="text-xs text-muted" style={{ display: 'block', marginTop: '2px' }}>🕒 {cls.time}</span>
                </div>

                <button className="btn btn-primary btn-sm" onClick={() => toast(`Entering virtual live class for ${cls.title}...`, 'success')}>
                  Join Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="card p mb-20">
        <h4 className="mb-12">⚡ Quick Actions</h4>
        <div className="grid-4" style={{ gap: '12px' }}>
          <button className="btn btn-ghost btn-full" style={{ padding: '14px', flexDirection: 'column', gap: '6px' }} onClick={() => toast('Starting live WebRTC stream room...', 'success')}>
            <span style={{ fontSize: '24px' }}>📹</span>
            <strong>Start Live Class</strong>
          </button>
          <button className="btn btn-ghost btn-full" style={{ padding: '14px', flexDirection: 'column', gap: '6px' }} onClick={() => toast('Course creation wizard opened', 'info')}>
            <span style={{ fontSize: '24px' }}>➕</span>
            <strong>Add New Course</strong>
          </button>
          <button className="btn btn-ghost btn-full" style={{ padding: '14px', flexDirection: 'column', gap: '6px' }} onClick={() => navigate(PAGES.teacherSchedule)}>
            <span style={{ fontSize: '24px' }}>📅</span>
            <strong>Update Schedule</strong>
          </button>
          <button className="btn btn-ghost btn-full" style={{ padding: '14px', flexDirection: 'column', gap: '6px' }} onClick={() => toast('Referral link copied! Share with students to earn 0% commission.', 'success')}>
            <span style={{ fontSize: '24px' }}>🎁</span>
            <strong>Share Referral Link</strong>
          </button>
        </div>
      </div>

      {/* Recent Students & Top Courses */}
      <div className="grid-2 mb-20">
        {/* Recent Students */}
        <div className="card p">
          <div className="flex-b mb-14">
            <h3>👥 Recent Enrolled Students</h3>
            <span className="text-xs text-purple font-bold" style={{ cursor: 'pointer' }} onClick={() => navigate(PAGES.teacherStudents)}>
              View All →
            </span>
          </div>

          <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '12px', textAlign: 'center' }}>
            {data.recentStudents.map(st => (
              <div key={st.id} style={{ background: 'var(--bg)', padding: '10px 6px', borderRadius: '10px' }}>
                <div style={{ fontSize: '28px', marginBottom: '4px' }}>{st.avatar}</div>
                <strong style={{ fontSize: '11px', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{st.name}</strong>
                <span className="text-xs text-muted" style={{ fontSize: '10px' }}>{st.subject}</span>
                <span className="badge badge-green mt-4" style={{ fontSize: '9px', padding: '1px 6px' }}>Active</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Courses */}
        <div className="card p">
          <div className="flex-b mb-14">
            <h3>🏆 Your Top Courses</h3>
            <span className="text-xs text-purple font-bold" style={{ cursor: 'pointer' }} onClick={() => navigate(PAGES.teacherClasses)}>
              View All →
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data.topCourses.map(course => (
              <div key={course.id}>
                <div className="flex-b text-sm mb-4">
                  <span className="flex-c gap-8">
                    <span>{course.icon}</span>
                    <strong>{course.title}</strong>
                    <span className="text-xs text-muted">({course.students} students)</span>
                  </span>
                  <strong className="text-purple">{course.pct}%</strong>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${course.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
