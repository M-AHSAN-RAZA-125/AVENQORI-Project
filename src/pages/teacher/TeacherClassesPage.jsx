import { useState, useEffect } from 'react';
import { useApp, PAGES } from '../../context/AppContext';
import { TeacherAPI } from '../../services/api';

export default function TeacherClassesPage() {
  const { navigate, toast } = useApp();
  const [classes, setClasses] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('This Month');
  const [createModal, setCreateModal] = useState(false);

  useEffect(() => {
    TeacherAPI.getClasses().then(res => setClasses(res));
  }, []);

  const filtered = classes.filter(c => {
    if (activeTab === 'upcoming') return c.status === 'Upcoming';
    if (activeTab === 'ongoing') return c.status === 'Ongoing';
    if (activeTab === 'completed') return c.status === 'Completed';
    return true;
  });

  return (
    <div className="teacher-classes-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">📚</div>
        <div className="banner-text">
          <h1>My Classes & Interactive Batches</h1>
          <p>Manage your batches, launch live WebRTC classrooms, and track enrolled student progress.</p>
        </div>
        <div className="banner-art">🎓</div>
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
          <div className="stat-icon blue">👥</div>
          <div className="stat-info">
            <strong>892</strong>
            <span>Total Students</span>
          </div>
          <span className="stat-change">↑8%</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">▶️</div>
          <div className="stat-info">
            <strong>3</strong>
            <span>Active Classes</span>
          </div>
          <span className="stat-change">Live Now</span>
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

      {/* Filter Tabs Bar */}
      <div className="flex-b mb-20" style={{ flexWrap: 'wrap', gap: '12px' }}>
        <div className="tab-bar" style={{ margin: 0 }}>
          <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
            All Classes (24)
          </button>
          <button className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>
            Upcoming (3)
          </button>
          <button className={`tab-btn ${activeTab === 'ongoing' ? 'active' : ''}`} onClick={() => setActiveTab('ongoing')}>
            Ongoing (1)
          </button>
          <button className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`} onClick={() => setActiveTab('completed')}>
            Completed (18)
          </button>
        </div>

        <div className="flex gap-12">
          <select
            className="form-select"
            style={{ width: 'auto', padding: '8px 14px' }}
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
          >
            <option>This Month</option>
            <option>Last Month</option>
            <option>All Time</option>
          </select>
          <button className="btn btn-primary" onClick={() => setCreateModal(true)}>
            + Create New Class
          </button>
        </div>
      </div>

      {/* Main Grid: Class Items + Right Sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>
        {/* Classes List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filtered.map(cls => (
            <div key={cls.id} className="card p" style={{ display: 'grid', gridTemplateColumns: '70px 1fr 140px 180px', gap: '16px', alignItems: 'center' }}>
              <div style={{ fontSize: '38px', textAlign: 'center', background: 'var(--bg)', borderRadius: '12px', padding: '12px 6px' }}>
                {cls.icon}
              </div>

              <div>
                <div className="flex-c gap-8 mb-4">
                  <h4 style={{ margin: 0, fontSize: '15px' }}>{cls.title}</h4>
                  <span className="text-ok font-bold" style={{ fontSize: '13px' }}>✓</span>
                  <span className={`badge ${cls.status === 'Ongoing' ? 'badge-blue' : cls.status === 'Completed' ? 'badge-green' : 'badge-yellow'}`}>
                    ● {cls.status}
                  </span>
                </div>

                <div className="flex-c gap-10 text-xs text-muted mb-4">
                  <span>{cls.level}</span>
                  <span>• {cls.duration}</span>
                  <span>• {cls.mode}</span>
                </div>

                <div className="flex-c gap-8 text-xs text-muted">
                  <span>📅 Next Class: <strong>{cls.nextClass}</strong></span>
                  {cls.isLiveClass && <span className="badge badge-purple">◆ Live Class</span>}
                </div>
              </div>

              <div>
                <div className="flex-c gap-6">
                  <span style={{ fontSize: '16px' }}>👥</span>
                  <strong style={{ fontSize: '14px' }}>{cls.enrolled}/{cls.capacity}</strong>
                </div>
                <small className="text-muted" style={{ fontSize: '11px' }}>Enrolled Students</small>
                <div className="progress-bar mt-4" style={{ height: '5px' }}>
                  <div className="progress-fill" style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}></div>
                </div>
              </div>

              <div className="flex gap-8">
                {cls.status === 'Completed' ? (
                  <button className="btn btn-outline btn-sm flex-1" onClick={() => toast(`Opening student exam analytics for ${cls.title}...`, 'info')}>
                    View Results
                  </button>
                ) : (
                  <button className="btn btn-primary btn-sm flex-1" onClick={() => toast(`Starting live virtual class for ${cls.title}...`, 'success')}>
                    {cls.status === 'Ongoing' ? 'Join Now ▶' : 'Start Class ▶'}
                  </button>
                )}
                <button className="btn btn-ghost btn-sm" onClick={() => toast(`Opening details for ${cls.title}`, 'info')}>
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Quick Actions */}
          <div className="card p">
            <h4 className="mb-12">⚡ Quick Actions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={() => setCreateModal(true)}>
                ➕ Create New Class
              </button>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={() => navigate(PAGES.teacherSchedule)}>
                📅 Schedule Class
              </button>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={() => navigate(PAGES.teacherStudents)}>
                👥 Manage Students
              </button>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={() => navigate(PAGES.teacherEarnings)}>
                💰 View Earnings
              </button>
            </div>
          </div>

          {/* Upcoming Schedule */}
          <div className="card p">
            <div className="flex-b mb-12">
              <h4>Upcoming Schedule</h4>
              <span className="text-xs text-purple font-bold" style={{ cursor: 'pointer' }} onClick={() => navigate(PAGES.teacherSchedule)}>View All →</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="flex-b p-8" style={{ background: 'var(--bg)', borderRadius: '8px' }}>
                <div>
                  <strong className="text-xs" style={{ display: 'block' }}>Nov 17, 2025</strong>
                  <span className="text-xs text-muted">04:00 PM • Python Basics</span>
                </div>
                <span className="badge badge-purple">● Live</span>
              </div>

              <div className="flex-b p-8" style={{ background: 'var(--bg)', borderRadius: '8px' }}>
                <div>
                  <strong className="text-xs" style={{ display: 'block' }}>Nov 18, 2025</strong>
                  <span className="text-xs text-muted">06:00 PM • Web Development</span>
                </div>
                <span className="badge badge-blue">Scheduled</span>
              </div>

              <div className="flex-b p-8" style={{ background: 'var(--bg)', borderRadius: '8px' }}>
                <div>
                  <strong className="text-xs" style={{ display: 'block' }}>Nov 19, 2025</strong>
                  <span className="text-xs text-muted">05:00 PM • Data Science</span>
                </div>
                <span className="badge badge-purple">● Live</span>
              </div>
            </div>
          </div>

          {/* Help box */}
          <div className="card p" style={{ background: 'linear-gradient(135deg, #1e1052, #2d1b6e)', color: '#fff' }}>
            <h4 style={{ color: '#fff', marginBottom: '4px' }}>Need Help?</h4>
            <p style={{ color: '#c4b5fd', fontSize: '12px', marginBottom: '12px' }}>
              Contact our dedicated tutor support desk for technical or billing inquiries.
            </p>
            <button className="btn btn-sm btn-full" style={{ background: 'var(--purple)', color: '#fff', border: 'none' }} onClick={() => navigate(PAGES.teacherHelp)}>
              Get Help →
            </button>
          </div>
        </div>
      </div>

      {/* Create Class Modal */}
      {createModal && (
        <div className="modal-overlay" onClick={() => setCreateModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Class / Batch</h3>
              <button className="modal-close" onClick={() => setCreateModal(false)}>✕</button>
            </div>

            <div className="form-group">
              <label className="form-label">Class Title</label>
              <input className="form-input" placeholder="e.g. Full-Stack Web Development Masterclass" defaultValue="Machine Learning & AI Practical Course" />
            </div>

            <div className="grid-2" style={{ gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <select className="form-select">
                  <option>Programming</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>Languages</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Skill Level</label>
                <select className="form-select">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>All Levels</option>
                </select>
              </div>
            </div>

            <div className="grid-2" style={{ gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Duration (Hours)</label>
                <input className="form-input" type="number" defaultValue="2" />
              </div>
              <div className="form-group">
                <label className="form-label">Max Student Capacity</label>
                <input className="form-input" type="number" defaultValue="50" />
              </div>
            </div>

            <div className="flex gap-12 mt-20">
              <button className="btn btn-ghost flex-1" onClick={() => setCreateModal(false)}>Cancel</button>
              <button className="btn btn-primary flex-1" onClick={() => { toast('New batch created & published to marketplace!', 'success'); setCreateModal(false); }}>
                Publish Class →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
