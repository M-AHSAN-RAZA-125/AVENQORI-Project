import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function TeacherSchedulePage() {
  const { toast } = useApp();
  const [viewMode, setViewMode] = useState('Month'); // Month | Week | Day
  const [scheduleModal, setScheduleModal] = useState(false);

  // Calendar cells mapping
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarEvents = {
    3:  [{ title: 'Math Class', time: '10:00 AM', color: '#6c3ef4' }],
    5:  [{ title: 'Python Class', time: '02:00 PM', color: '#10b981' }],
    7:  [{ title: 'Web Dev Class', time: '04:00 PM', color: '#3b82f6' }],
    10: [{ title: 'Data Science', time: '11:00 AM', color: '#6c3ef4' }],
    12: [{ title: 'Programming', time: '03:00 PM', color: '#6c3ef4' }],
    14: [{ title: 'Math Class', time: '10:00 AM', color: '#10b981' }],
    17: [{ title: 'Web Dev Class', time: '02:00 PM', color: '#3b82f6' }],
    19: [{ title: 'Python Class', time: '11:00 AM', color: '#8b5cf6' }],
    27: [{ title: 'Data Science', time: '01:00 PM', color: '#10b981' }]
  };

  // Calendar dates 1 to 30 with offset
  const calendarCells = [];
  // Oct padding: 26 to 31
  for (let i = 26; i <= 31; i++) {
    calendarCells.push({ date: i, isCurrentMonth: false });
  }
  // Nov 1 to 30
  for (let i = 1; i <= 30; i++) {
    calendarCells.push({ date: i, isCurrentMonth: true, events: calendarEvents[i] || [] });
  }
  // Dec padding: 1 to 5
  for (let i = 1; i <= 6; i++) {
    calendarCells.push({ date: i, isCurrentMonth: false });
  }

  return (
    <div className="teacher-schedule-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">📅</div>
        <div className="banner-text">
          <h1>My Schedule & Class Calendar</h1>
          <p>Plan smart, manage your teaching calendar, and never miss a live interactive session!</p>
        </div>
        <div className="banner-art">🗓️</div>
      </div>

      {/* Top 4 Stats */}
      <div className="grid-4 mb-20">
        <div className="stat-card">
          <div className="stat-icon purple">📅</div>
          <div className="stat-info">
            <strong>24</strong>
            <span>Total Classes</span>
          </div>
          <span className="stat-change">↑12%</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">⏱️</div>
          <div className="stat-info">
            <strong>6</strong>
            <span>This Week</span>
          </div>
          <span className="stat-change">↑1</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">👥</div>
          <div className="stat-info">
            <strong>892</strong>
            <span>Total Students</span>
          </div>
          <span className="stat-change">↑8%</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">🎯</div>
          <div className="stat-info">
            <strong>94%</strong>
            <span>Completion Rate</span>
          </div>
          <span className="stat-change">↑2%</span>
        </div>
      </div>

      {/* Main Layout: Calendar + Right Sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Interactive Calendar Card */}
        <div className="card p">
          {/* Header Controls */}
          <div className="flex-b mb-16">
            <div className="flex-c gap-12">
              <h3>📅 Calendar View</h3>
              <div className="flex-c gap-8">
                <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px' }}>‹</button>
                <strong style={{ fontSize: '15px' }}>November 2025</strong>
                <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px' }}>›</button>
              </div>
            </div>

            <div className="flex gap-4">
              {['Month', 'Week', 'Day'].map(mode => (
                <button
                  key={mode}
                  className={`tab-btn btn-sm ${viewMode === mode ? 'active' : ''}`}
                  style={{ padding: '4px 12px', fontSize: '12px' }}
                  onClick={() => setViewMode(mode)}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Weekday Headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '8px', fontWeight: 600, fontSize: '12px', color: 'var(--muted)' }}>
            {daysOfWeek.map(d => (
              <div key={d} style={{ padding: '6px' }}>{d}</div>
            ))}
          </div>

          {/* Calendar Grid Cells */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
            {calendarCells.map((cell, idx) => (
              <div
                key={idx}
                style={{
                  minHeight: '75px',
                  background: cell.isCurrentMonth ? 'var(--bg)' : '#fcfcfd',
                  borderRadius: '8px',
                  padding: '6px',
                  border: '1px solid var(--line)',
                  opacity: cell.isCurrentMonth ? 1 : 0.45,
                  cursor: cell.isCurrentMonth ? 'pointer' : 'default'
                }}
                onClick={() => {
                  if (cell.events && cell.events.length) {
                    toast(`Classes on Nov ${cell.date}: ${cell.events.map(e => e.title).join(', ')}`, 'info');
                  }
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, color: cell.isCurrentMonth ? 'var(--text)' : 'var(--muted)' }}>
                  {cell.date}
                </span>

                {cell.events && cell.events.map((ev, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#fff',
                      borderLeft: `3px solid ${ev.color}`,
                      borderRadius: '4px',
                      padding: '2px 4px',
                      marginTop: '4px',
                      fontSize: '10px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                    }}
                  >
                    <div style={{ fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {ev.title}
                    </div>
                    <div style={{ color: 'var(--muted)', fontSize: '9px' }}>{ev.time}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Upcoming Classes & Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Upcoming Classes List */}
          <div className="card p">
            <div className="flex-b mb-12">
              <h4>Upcoming Classes</h4>
              <span className="text-xs text-purple font-bold" style={{ cursor: 'pointer' }} onClick={() => toast('All upcoming sessions shown', 'info')}>View All →</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="flex-b p-10" style={{ background: 'var(--bg)', borderRadius: '10px' }}>
                <div className="flex-c gap-10">
                  <span style={{ fontSize: '24px' }}>🐍</span>
                  <div>
                    <strong className="text-xs" style={{ display: 'block' }}>Python Programming</strong>
                    <span className="text-xs text-muted">Beginner Level</span>
                    <div className="text-xs text-muted">Nov 12, 2025 • 03:00 PM</div>
                  </div>
                </div>
                <span className="badge badge-purple">Today</span>
              </div>

              <div className="flex-b p-10" style={{ background: 'var(--bg)', borderRadius: '10px' }}>
                <div className="flex-c gap-10">
                  <span style={{ fontSize: '24px' }}>📊</span>
                  <div>
                    <strong className="text-xs" style={{ display: 'block' }}>Data Science</strong>
                    <span className="text-xs text-muted">Intermediate</span>
                    <div className="text-xs text-muted">Nov 14, 2025 • 01:00 PM</div>
                  </div>
                </div>
                <span className="badge badge-blue">In 2 Days</span>
              </div>

              <div className="flex-b p-10" style={{ background: 'var(--bg)', borderRadius: '10px' }}>
                <div className="flex-c gap-10">
                  <span style={{ fontSize: '24px' }}>💻</span>
                  <div>
                    <strong className="text-xs" style={{ display: 'block' }}>Web Development</strong>
                    <span className="text-xs text-muted">Advanced</span>
                    <div className="text-xs text-muted">Nov 15, 2025 • 04:00 PM</div>
                  </div>
                </div>
                <span className="badge badge-green">In 3 Days</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="card p">
            <h4 className="mb-12">⚡ Quick Actions</h4>
            <div className="grid-2" style={{ gap: '8px' }}>
              <button className="btn btn-primary btn-sm btn-full" style={{ padding: '12px' }} onClick={() => toast('Starting live broadcast room...', 'success')}>
                🎥 Start Class (Go Live)
              </button>
              <button className="btn btn-ghost btn-sm btn-full" style={{ padding: '12px' }} onClick={() => setScheduleModal(true)}>
                ➕ Schedule Class
              </button>
              <button className="btn btn-ghost btn-sm btn-full" style={{ padding: '12px' }} onClick={() => toast('Opening student attendance list', 'info')}>
                👥 Manage Students
              </button>
              <button className="btn btn-ghost btn-sm btn-full" style={{ padding: '12px' }} onClick={() => toast('Exporting teaching report...', 'info')}>
                📊 View Reports
              </button>
            </div>
          </div>

          {/* Schedule Insights */}
          <div className="card p" style={{ background: 'var(--bg2)' }}>
            <div className="flex-b">
              <div>
                <strong className="text-xs text-purple">Schedule Insights</strong>
                <div className="text-sm font-bold mt-2">92% on track this month!</div>
                <span className="text-xs text-muted">6 classes scheduled for this week.</span>
              </div>
              <span style={{ fontSize: '28px' }}>🏆</span>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {scheduleModal && (
        <div className="modal-overlay" onClick={() => setScheduleModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Schedule New Class Session</h3>
              <button className="modal-close" onClick={() => setScheduleModal(false)}>✕</button>
            </div>

            <div className="form-group">
              <label className="form-label">Select Course / Subject</label>
              <select className="form-select">
                <option>Python Programming – Basics to Advanced</option>
                <option>Web Development with React</option>
                <option>Data Science with Python</option>
                <option>Mathematics – Board Exam Prep</option>
              </select>
            </div>

            <div className="grid-2" style={{ gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input type="date" className="form-input" defaultValue="2026-11-20" />
              </div>
              <div className="form-group">
                <label className="form-label">Time</label>
                <input type="time" className="form-input" defaultValue="15:00" />
              </div>
            </div>

            <div className="flex gap-12 mt-20">
              <button className="btn btn-ghost flex-1" onClick={() => setScheduleModal(false)}>Cancel</button>
              <button className="btn btn-primary flex-1" onClick={() => { toast('Class session scheduled on your calendar!', 'success'); setScheduleModal(false); }}>
                Save Schedule →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
