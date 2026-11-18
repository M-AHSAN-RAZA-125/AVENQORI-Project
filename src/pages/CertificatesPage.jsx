import { useState } from 'react';
import { useApp, PAGES } from '../context/AppContext';

const CERTIFICATES_DATA = [
  {
    id: 1,
    title: 'Python Programming',
    type: 'Course Certificate',
    recipient: 'Ahmed Raza',
    date: 'Nov 16, 2025',
    hours: '32 Hours',
    level: 'Advanced',
    credentialId: 'AVEN-PY-2025-9981',
    verified: true,
    accent: '#4f46e5'
  },
  {
    id: 2,
    title: 'React JS Development',
    type: 'Course Certificate',
    recipient: 'Ahmed Raza',
    date: 'Nov 10, 2025',
    hours: '28 Hours',
    level: 'Intermediate',
    credentialId: 'AVEN-RCT-2025-7734',
    verified: true,
    accent: '#06b6d4'
  },
  {
    id: 3,
    title: 'Web Development Basics (Live Class)',
    type: 'Live Class Certificate',
    recipient: 'Ahmed Raza',
    date: 'Nov 05, 2025',
    hours: '2 Hours',
    level: 'Beginner',
    credentialId: 'AVEN-WEB-2025-1102',
    verified: true,
    accent: '#8b5cf6'
  },
  {
    id: 4,
    title: 'Mathematics Basics',
    type: 'Course Certificate',
    recipient: 'Ahmed Raza',
    date: 'Oct 28, 2025',
    hours: '26 Hours',
    level: 'Beginner',
    credentialId: 'AVEN-MTH-2025-4421',
    verified: true,
    accent: '#10b981'
  }
];

export default function CertificatesPage() {
  const { navigate, toast } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);

  const filteredCerts = CERTIFICATES_DATA.filter(c => {
    if (activeTab === 'course') return c.type === 'Course Certificate';
    if (activeTab === 'live') return c.type === 'Live Class Certificate';
    return true;
  });

  const handleDownload = (cert) => {
    toast(`Downloading PDF Certificate: ${cert.title}...`, 'success');
  };

  return (
    <div className="certificates-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">🏆</div>
        <div className="banner-text">
          <span className="badge badge-yellow mb-8" style={{ display: 'inline-block' }}>🏅 ACCREDITED CREDENTIALS</span>
          <h1>My Certificates & Verified Achievements</h1>
          <p>Showcase your verified certificates, share directly to LinkedIn, and celebrate your learning milestones!</p>
        </div>
        <div className="banner-art">🎖️</div>
      </div>

      {/* Tabs */}
      <div className="flex-b mb-20" style={{ flexWrap: 'wrap', gap: '12px' }}>
        <div className="tab-bar" style={{ margin: 0 }}>
          <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
            All Certificates ({CERTIFICATES_DATA.length})
          </button>
          <button className={`tab-btn ${activeTab === 'course' ? 'active' : ''}`} onClick={() => setActiveTab('course')}>
            Course Certificates (3)
          </button>
          <button className={`tab-btn ${activeTab === 'live' ? 'active' : ''}`} onClick={() => setActiveTab('live')}>
            Live Class Certificates (1)
          </button>
        </div>

        <select className="form-select" style={{ width: 'auto', padding: '8px 14px' }}>
          <option>Sort: Latest First</option>
          <option>Sort: Oldest First</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>
        {/* Certificate Cards Grid */}
        <div className="grid-2" style={{ gap: '16px' }}>
          {filteredCerts.map(cert => (
            <div key={cert.id} className="card p" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {/* Visual Certificate Graphic */}
              <div
                style={{
                  background: '#fcfcfd',
                  border: '2px solid #e0e7ff',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  marginBottom: '14px',
                  boxShadow: 'inset 0 0 0 6px #fff, inset 0 0 0 7px #d1d5db',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', top: '10px', right: '12px', fontSize: '11px', color: 'var(--ok)', fontWeight: 700 }}>
                  ✓ VERIFIED
                </div>

                <div className="flex-c gap-8" style={{ justifyContent: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 900, color: 'var(--purple)' }}>AVENQORI</span>
                </div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', fontWeight: 600 }}>
                  Certificate of Completion
                </div>

                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '8px' }}>This certifies that</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text)', margin: '4px 0' }}>{cert.recipient}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>has successfully completed the specialized course</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: cert.accent, margin: '6px 0' }}>{cert.title}</div>
                <div style={{ fontSize: '11px', color: 'var(--muted)', borderTop: '1px dashed var(--line)', paddingTop: '6px', marginTop: '8px' }}>
                  Issued on: {cert.date} • ID: {cert.credentialId}
                </div>
              </div>

              {/* Meta details */}
              <div>
                <div className="flex-b mb-8">
                  <span className="badge badge-green">✓ Verified</span>
                  <span className="text-xs text-muted">ID: {cert.credentialId}</span>
                </div>

                <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>{cert.title}</h4>
                <div className="text-xs text-muted mb-12">Completed on: {cert.date}</div>

                <div className="flex-c gap-12 text-xs mb-16">
                  <span className="badge badge-purple">⏱️ {cert.hours}</span>
                  <span className="badge badge-blue">🎯 {cert.level}</span>
                </div>

                <div className="flex gap-8">
                  <button className="btn btn-primary btn-sm flex-1" onClick={() => handleDownload(cert)}>
                    Download Certificate ▼
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setSelectedCert(cert)}>
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Achievement stats */}
          <div className="card p">
            <h4 className="mb-16">Your Achievement Stats</h4>
            <div className="grid-2" style={{ gap: '10px' }}>
              <div className="stat-card" style={{ padding: '12px' }}>
                <div className="stat-icon purple" style={{ width: '36px', height: '36px', fontSize: '16px' }}>🏆</div>
                <div className="stat-info">
                  <strong>4</strong>
                  <span style={{ fontSize: '11px' }}>Certificates</span>
                </div>
              </div>
              <div className="stat-card" style={{ padding: '12px' }}>
                <div className="stat-icon green" style={{ width: '36px', height: '36px', fontSize: '16px' }}>✅</div>
                <div className="stat-info">
                  <strong>3</strong>
                  <span style={{ fontSize: '11px' }}>Courses</span>
                </div>
              </div>
              <div className="stat-card" style={{ padding: '12px' }}>
                <div className="stat-icon yellow" style={{ width: '36px', height: '36px', fontSize: '16px' }}>⭐</div>
                <div className="stat-info">
                  <strong>4.8</strong>
                  <span style={{ fontSize: '11px' }}>Avg Rating</span>
                </div>
              </div>
              <div className="stat-card" style={{ padding: '12px' }}>
                <div className="stat-icon blue" style={{ width: '36px', height: '36px', fontSize: '16px' }}>⏱️</div>
                <div className="stat-info">
                  <strong>120+</strong>
                  <span style={{ fontSize: '11px' }}>Hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Banner */}
          <div className="card p" style={{ background: 'var(--grad)', color: '#fff', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '8px' }}>🤖</div>
            <h4 style={{ color: '#fff', marginBottom: '6px' }}>Keep Learning, Keep Growing!</h4>
            <p style={{ color: '#e0d9ff', fontSize: '12px', marginBottom: '14px' }}>
              Complete 1 more course this month to unlock the prestigious "AVENQORI Scholar" badge on your public profile!
            </p>
            <button className="btn btn-sm" style={{ background: '#fff', color: 'var(--purple)', border: 'none', width: '100%', fontWeight: 700 }} onClick={() => navigate(PAGES.myCourses)}>
              Explore Courses →
            </button>
          </div>
        </div>
      </div>

      {/* How to get certificate banner */}
      <div className="card p mt-20" style={{ background: 'var(--bg2)', border: '1.5px dashed var(--purple)' }}>
        <h4 className="mb-12">ℹ️ How to Earn Accredited Certificates on AVENQORI?</h4>
        <div className="grid-3" style={{ gap: '16px' }}>
          <div className="flex-c gap-12">
            <span style={{ fontSize: '24px' }}>1️⃣</span>
            <div>
              <strong>Finish Course Lessons</strong>
              <p className="text-xs text-muted">Complete 100% of required video lessons and code exercises.</p>
            </div>
          </div>
          <div className="flex-c gap-12">
            <span style={{ fontSize: '24px' }}>2️⃣</span>
            <div>
              <strong>Pass Knowledge Check</strong>
              <p className="text-xs text-muted">Score 80%+ on the end-of-module assessment quizzes.</p>
            </div>
          </div>
          <div className="flex-c gap-12">
            <span style={{ fontSize: '24px' }}>3️⃣</span>
            <div>
              <strong>Instant Digital Verification</strong>
              <p className="text-xs text-muted">Download PDF, generate QR-code credential, and share on LinkedIn.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cert Modal */}
      {selectedCert && (
        <div className="modal-overlay" onClick={() => setSelectedCert(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Certificate Verification</h3>
              <button className="modal-close" onClick={() => setSelectedCert(null)}>✕</button>
            </div>
            <h4>{selectedCert.title}</h4>
            <p className="text-sm text-muted mt-4">Issued to: {selectedCert.recipient}</p>
            <p className="text-sm text-muted">Date of issue: {selectedCert.date} • Duration: {selectedCert.hours}</p>
            <div className="badge badge-green mt-8 mb-16">Cryptographically Signed & Verified</div>
            <p className="text-sm">This credential certifies that the student has fulfilled all course obligations, practical labs, and live mentoring hours in accordance with AVENQORI quality standards.</p>
            <div className="flex gap-12 mt-20">
              <button className="btn btn-primary flex-1" onClick={() => handleDownload(selectedCert)}>Download PDF</button>
              <button className="btn btn-ghost flex-1" onClick={() => { toast('Share link copied to clipboard!', 'success'); setSelectedCert(null); }}>Copy Public Link</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
