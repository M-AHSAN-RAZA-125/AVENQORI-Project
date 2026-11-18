import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function TeacherCertificatesPage() {
  const { toast } = useApp();
  const [selectedCourse, setSelectedCourse] = useState('Python Programming');
  const [selectedStudentScope, setSelectedStudentScope] = useState('All Students (98)');
  const [templateModal, setTemplateModal] = useState(null);

  const templates = [
    { id: 1, name: 'Modern Blue', type: 'Certificate of Completion', bg: '#f0f7ff', border: '#3b82f6', accent: '#1d4ed8' },
    { id: 2, name: 'Elegant Purple', type: 'Certificate of Completion', bg: '#f5f3ff', border: '#7c3aed', accent: '#6d28d9' },
    { id: 3, name: 'Premium Gold', type: 'Certificate of Achievement', bg: '#fffbeb', border: '#f59e0b', accent: '#b45309' },
    { id: 4, name: 'Clean Minimal', type: 'Certificate of Completion', bg: '#f8fafc', border: '#94a3b8', accent: '#334155' },
    { id: 5, name: 'Classic Gold', type: 'Certificate of Excellence', bg: '#fffdf5', border: '#d97706', accent: '#92400e' },
    { id: 6, name: 'Academic Dark', type: 'Certificate of Completion', bg: '#1e1b4b', border: '#818cf8', accent: '#c7d2fe', isDark: true }
  ];

  const recentIssued = [
    { id: 1, student: 'Ayesha Khan', course: 'Python Programming', date: 'Nov 16, 2025', avatar: '👩‍🎓' },
    { id: 2, student: 'Muhammad Ali', course: 'Data Science', date: 'Nov 15, 2025', avatar: '👨‍💼' },
    { id: 3, student: 'Fatima Noor', course: 'Web Development', date: 'Nov 14, 2025', avatar: '👩‍💼' }
  ];

  const handleIssueCertificates = () => {
    toast(`Issued verified certificates for ${selectedCourse} to ${selectedStudentScope}!`, 'success');
  };

  return (
    <div className="teacher-certificates-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">🏆</div>
        <div className="banner-text">
          <h1>Student Certificate Creator & Issuance Center</h1>
          <p>Reward Your Students! Create, manage, and digitally sign accredited certificates of completion.</p>
        </div>
        <div className="banner-art">🎖️</div>
      </div>

      {/* Top 4 Stats */}
      <div className="grid-4 mb-20">
        <div className="stat-card">
          <div className="stat-icon purple">🏆</div>
          <div className="stat-info">
            <strong>124</strong>
            <span>Total Certificates</span>
          </div>
          <span className="stat-change">↑12%</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">📅</div>
          <div className="stat-info">
            <strong>28</strong>
            <span>This Month</span>
          </div>
          <span className="stat-change">↑8%</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">🎓</div>
          <div className="stat-info">
            <strong>98</strong>
            <span>Issued to Students</span>
          </div>
          <span className="stat-change">↑10%</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">⭐</div>
          <div className="stat-info">
            <strong style={{ fontSize: '15px' }}>Python Mastery</strong>
            <span>Top Performing Course</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Template Gallery + Issue Sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Certificate Templates Grid */}
        <div>
          <div className="flex-b mb-16">
            <div>
              <h3>🎨 Certificate Design Templates</h3>
              <p className="text-xs text-muted" style={{ margin: 0 }}>Choose an approved design template or customize your branding.</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => toast('Certificate customizer designer opened', 'info')}>
              + Create Custom Template
            </button>
          </div>

          <div className="grid-3" style={{ gap: '16px' }}>
            {templates.map(tpl => (
              <div key={tpl.id} className="card p" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {/* Visual Certificate Graphic */}
                <div
                  style={{
                    background: tpl.bg,
                    border: `2px solid ${tpl.border}`,
                    borderRadius: '8px',
                    padding: '14px 10px',
                    textAlign: 'center',
                    marginBottom: '12px',
                    color: tpl.isDark ? '#fff' : 'var(--text)',
                    boxShadow: 'inset 0 0 0 3px #fff, inset 0 0 0 4px #e2e8f0',
                    minHeight: '120px'
                  }}
                >
                  <div style={{ fontSize: '10px', fontWeight: 900, color: tpl.accent, letterSpacing: '0.08em' }}>AVENQORI</div>
                  <div style={{ fontSize: '9px', textTransform: 'uppercase', color: tpl.isDark ? '#cbd5e1' : '#64748b', margin: '2px 0' }}>{tpl.type}</div>
                  <div style={{ fontSize: '9px', fontStyle: 'italic', margin: '4px 0' }}>This is to certify that</div>
                  <strong style={{ fontSize: '11px', display: 'block' }}>{'{{student_name}}'}</strong>
                  <div style={{ fontSize: '8px', opacity: 0.8, marginTop: '2px' }}>has successfully completed the course</div>
                  <div style={{ fontSize: '9px', fontWeight: 700, color: tpl.accent }}>{'{{course_name}}'}</div>
                </div>

                <div className="flex-b">
                  <strong style={{ fontSize: '13px' }}>{tpl.name}</strong>
                  <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => { setTemplateModal(tpl); toast(`Template "${tpl.name}" selected!`, 'info'); }}>
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Issue Panel & Recent Certificates */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Issue Certificate Form */}
          <div className="card p">
            <h4 className="mb-14">⚡ Issue Certificate</h4>

            <div className="form-group">
              <label className="form-label">Select Course</label>
              <select className="form-select" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
                <option>Python Programming</option>
                <option>Web Development with React</option>
                <option>Data Science with Python</option>
                <option>Mathematics – Board Exam Prep</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Select Students</label>
              <select className="form-select" value={selectedStudentScope} onChange={e => setSelectedStudentScope(e.target.value)}>
                <option>All Students (98)</option>
                <option>Top Scorers (&gt;90% Score)</option>
                <option>Individual Student...</option>
              </select>
            </div>

            <button className="btn btn-primary btn-full mt-12" onClick={handleIssueCertificates}>
              🎓 Generate & Issue Certificates
            </button>
          </div>

          {/* Recent Issued Certificates */}
          <div className="card p">
            <div className="flex-b mb-12">
              <h4>Recent Certificates</h4>
              <span className="text-xs text-purple font-bold" style={{ cursor: 'pointer' }} onClick={() => toast('All issued credentials listed', 'info')}>View All →</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentIssued.map(item => (
                <div key={item.id} className="flex-b p-8" style={{ background: 'var(--bg)', borderRadius: '8px' }}>
                  <div className="flex-c gap-8">
                    <span style={{ fontSize: '20px' }}>{item.avatar}</span>
                    <div>
                      <strong className="text-xs" style={{ display: 'block' }}>{item.student}</strong>
                      <span className="text-xs text-muted">{item.course} • {item.date}</span>
                    </div>
                  </div>
                  <span className="badge badge-green" style={{ fontSize: '10px' }}>Issued</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
