import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { TeacherAPI } from '../../services/api';

export default function TeacherStudentsPage() {
  const { toast } = useApp();
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentModal, setSelectedStudentModal] = useState(null);

  useEffect(() => {
    TeacherAPI.getStudents().then(res => setStudents(res));
  }, []);

  const filtered = students.filter(st => {
    const matchesTab = activeTab === 'all' ||
      (activeTab === 'active' && st.status === 'Active') ||
      (activeTab === 'inactive' && st.status === 'Inactive') ||
      (activeTab === 'top' && st.progress >= 85);

    const matchesSearch = st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          st.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="teacher-students-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">👥</div>
        <div className="banner-text">
          <h1>My Students Directory & Progress Tracker</h1>
          <p>Monitor your enrolled students, analyze individual curriculum completion, and send direct feedback.</p>
        </div>
        <div className="banner-art">🎓</div>
      </div>

      {/* Top 4 Stats */}
      <div className="grid-4 mb-20">
        <div className="stat-card">
          <div className="stat-icon purple">👥</div>
          <div className="stat-info">
            <strong>892</strong>
            <span>Total Students</span>
          </div>
          <span className="stat-change">↑12%</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">✅</div>
          <div className="stat-info">
            <strong>761</strong>
            <span>Active Students</span>
          </div>
          <span className="stat-change">↑8%</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">⭐</div>
          <div className="stat-info">
            <strong>128</strong>
            <span>Top Performers</span>
          </div>
          <span className="stat-change">↑15%</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">📊</div>
          <div className="stat-info">
            <strong>78%</strong>
            <span>Average Progress</span>
          </div>
          <span className="stat-change">↑5%</span>
        </div>
      </div>

      {/* Search and Tabs Bar */}
      <div className="card p mb-16">
        <div className="flex-b gap-16" style={{ flexWrap: 'wrap' }}>
          <div className="tab-bar" style={{ margin: 0 }}>
            <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
              All Students (892)
            </button>
            <button className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>
              Active (761)
            </button>
            <button className={`tab-btn ${activeTab === 'inactive' ? 'active' : ''}`} onClick={() => setActiveTab('inactive')}>
              Inactive (89)
            </button>
            <button className={`tab-btn ${activeTab === 'top' ? 'active' : ''}`} onClick={() => setActiveTab('top')}>
              Top Students
            </button>
          </div>

          <div className="flex-c gap-10">
            <div className="search-bar" style={{ maxWidth: '240px', padding: '6px 12px' }}>
              <span>🔍</span>
              <input
                placeholder="Search students..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => toast('Inviting student modal...', 'info')}>
              + Add Student
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Student Table + Right Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
        {/* Table Card */}
        <div className="card p" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)', color: 'var(--muted)' }}>
                <th style={{ padding: '10px 12px' }}>Student</th>
                <th style={{ padding: '10px 12px' }}>Email</th>
                <th style={{ padding: '10px 12px' }}>Enrolled Courses</th>
                <th style={{ padding: '10px 12px' }}>Progress</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
                <th style={{ padding: '10px 12px' }}>Joined On</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(st => (
                <tr key={st.id} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '12px' }}>
                    <div className="flex-c gap-8">
                      <span style={{ fontSize: '24px' }}>{st.avatar}</span>
                      <strong>{st.name}</strong>
                    </div>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--muted)' }}>{st.email}</td>
                  <td style={{ padding: '12px' }}>{st.courses} Courses</td>
                  <td style={{ padding: '12px', minWidth: '120px' }}>
                    <div className="flex-c gap-8">
                      <div className="progress-bar flex-1" style={{ height: '6px' }}>
                        <div className="progress-fill" style={{ width: `${st.progress}%` }}></div>
                      </div>
                      <span className="font-bold text-xs">{st.progress}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span className={`badge ${st.status === 'Active' ? 'badge-green' : 'badge-red'}`}>
                      {st.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--muted)' }}>{st.joined}</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setSelectedStudentModal(st)}>
                      👁 View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex-b mt-16 pt-12" style={{ borderTop: '1px solid var(--line)' }}>
            <span className="text-xs text-muted">Showing 1 to {filtered.length} of 892 students</span>
            <div className="flex gap-4">
              <button className="btn btn-ghost btn-sm">‹</button>
              <button className="btn btn-primary btn-sm" style={{ padding: '4px 10px' }}>1</button>
              <button className="btn btn-ghost btn-sm" style={{ padding: '4px 10px' }}>2</button>
              <button className="btn btn-ghost btn-sm" style={{ padding: '4px 10px' }}>3</button>
              <span style={{ padding: '4px 8px' }}>...</span>
              <button className="btn btn-ghost btn-sm" style={{ padding: '4px 10px' }}>128</button>
              <button className="btn btn-ghost btn-sm">›</button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Overview Donut */}
          <div className="card p" style={{ textAlign: 'center' }}>
            <h4 className="mb-12">Student Overview</h4>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '14px 0' }}>
              <div className="circle-progress" style={{ width: '120px', height: '120px' }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="48" fill="none" stroke="#fee2e2" strokeWidth="12" />
                  <circle
                    cx="60" cy="60" r="48" fill="none" stroke="#10b981" strokeWidth="12"
                    strokeDasharray="301.6" strokeDashoffset="45" strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="circle-label" style={{ fontSize: '18px' }}>
                  892
                  <span style={{ fontSize: '10px', display: 'block', color: 'var(--muted)', fontWeight: 500 }}>Total</span>
                </div>
              </div>
            </div>

            <div className="flex-b text-xs mb-4">
              <span className="flex-c gap-6"><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> Active</span>
              <strong>761</strong>
            </div>
            <div className="flex-b text-xs mb-4">
              <span className="flex-c gap-6"><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span> Inactive</span>
              <strong>89</strong>
            </div>
            <div className="flex-b text-xs">
              <span className="flex-c gap-6"><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span> Pending</span>
              <strong>42</strong>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p">
            <h4 className="mb-12">⚡ Quick Actions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={() => toast('Add student dialog opened', 'info')}>
                ➕ Add New Student
              </button>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={() => toast('Bulk announcement composer opened', 'info')}>
                ✉️ Broadcast Message
              </button>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={() => toast('Exporting student CSV list...', 'success')}>
                📥 Export Student List (CSV)
              </button>
            </div>
          </div>

          {/* Top Students Leaderboard */}
          <div className="card p">
            <h4 className="mb-12">🏆 Top Students</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="flex-b p-8" style={{ background: 'var(--bg)', borderRadius: '8px' }}>
                <div className="flex-c gap-8">
                  <span>🥇</span>
                  <strong className="text-xs">Ahmad Raza</strong>
                </div>
                <strong className="text-ok text-xs">98%</strong>
              </div>
              <div className="flex-b p-8" style={{ background: 'var(--bg)', borderRadius: '8px' }}>
                <div className="flex-c gap-8">
                  <span>🥈</span>
                  <strong className="text-xs">Ayesha Khan</strong>
                </div>
                <strong className="text-ok text-xs">96%</strong>
              </div>
              <div className="flex-b p-8" style={{ background: 'var(--bg)', borderRadius: '8px' }}>
                <div className="flex-c gap-8">
                  <span>🥉</span>
                  <strong className="text-xs">Muhammad Ali</strong>
                </div>
                <strong className="text-ok text-xs">94%</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudentModal && (
        <div className="modal-overlay" onClick={() => setSelectedStudentModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Student Profile & Progress</h3>
              <button className="modal-close" onClick={() => setSelectedStudentModal(null)}>✕</button>
            </div>
            <div className="flex gap-16 mb-16">
              <div style={{ fontSize: '48px' }}>{selectedStudentModal.avatar}</div>
              <div>
                <h4>{selectedStudentModal.name}</h4>
                <div className="text-sm text-muted">{selectedStudentModal.email}</div>
                <div className="flex-c gap-8 mt-4">
                  <span className="badge badge-green">{selectedStudentModal.status}</span>
                  <span className="text-xs text-muted">Enrolled: {selectedStudentModal.courses} Courses</span>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <label className="form-label">Overall Completion</label>
              <div className="progress-bar mb-4">
                <div className="progress-fill" style={{ width: `${selectedStudentModal.progress}%` }}></div>
              </div>
              <small className="text-muted">{selectedStudentModal.progress}% of assigned modules completed</small>
            </div>

            <div className="flex gap-12 mt-20">
              <button className="btn btn-ghost flex-1" onClick={() => setSelectedStudentModal(null)}>Close</button>
              <button className="btn btn-primary flex-1" onClick={() => { toast(`Opened direct chat with ${selectedStudentModal.name}`, 'success'); setSelectedStudentModal(null); }}>
                Send Direct Message 💬
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
