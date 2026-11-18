import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { TeacherAPI } from '../../services/api';

export default function TeacherResourcesPage() {
  const { toast } = useApp();
  const [resources, setResources] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadModal, setUploadModal] = useState(false);

  useEffect(() => {
    TeacherAPI.getResources().then(res => setResources(res));
  }, []);

  const filtered = resources.filter(r => {
    const matchesTab = activeTab === 'all' ||
      (activeTab === 'materials' && r.category === 'Material') ||
      (activeTab === 'guides' && r.category === 'Guide') ||
      (activeTab === 'templates' && r.category === 'Template') ||
      (activeTab === 'tools' && r.category === 'Tool');

    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.desc.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="teacher-resources-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">📦</div>
        <div className="banner-text">
          <h1>Teaching Resources, Templates & Guides</h1>
          <p>Access high-quality syllabus templates, class handouts, assessment sheets, and digital teaching tools.</p>
        </div>
        <div className="banner-art">📚</div>
      </div>

      {/* Tabs and Search Bar */}
      <div className="card p mb-16">
        <div className="flex-b gap-16" style={{ flexWrap: 'wrap' }}>
          <div className="tab-bar" style={{ margin: 0 }}>
            <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All Resources (24)</button>
            <button className={`tab-btn ${activeTab === 'materials' ? 'active' : ''}`} onClick={() => setActiveTab('materials')}>Teaching Materials (8)</button>
            <button className={`tab-btn ${activeTab === 'guides' ? 'active' : ''}`} onClick={() => setActiveTab('guides')}>Guides (6)</button>
            <button className={`tab-btn ${activeTab === 'templates' ? 'active' : ''}`} onClick={() => setActiveTab('templates')}>Templates (5)</button>
            <button className={`tab-btn ${activeTab === 'tools' ? 'active' : ''}`} onClick={() => setActiveTab('tools')}>Tools (3)</button>
          </div>

          <div className="flex-c gap-10">
            <div className="search-bar" style={{ maxWidth: '240px', padding: '6px 12px' }}>
              <span>🔍</span>
              <input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setUploadModal(true)}>
              + Upload Resource
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Resources Cards + Right Sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
        {/* Resources Grid */}
        <div className="grid-2" style={{ gap: '16px' }}>
          {filtered.map(item => (
            <div key={item.id} className="card p" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="flex-b mb-8">
                  <span className={`badge ${item.category === 'Guide' ? 'badge-purple' : item.category === 'Template' ? 'badge-blue' : item.category === 'Material' ? 'badge-green' : 'badge-yellow'}`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-muted font-bold">{item.fileType} • {item.size}</span>
                </div>

                <h4 style={{ fontSize: '15px', marginBottom: '6px' }}>{item.title}</h4>
                <p className="text-xs text-muted mb-16">{item.desc}</p>
              </div>

              <div className="flex-b" style={{ borderTop: '1px solid var(--line)', paddingTop: '10px' }}>
                <span className="text-xs text-muted">📁 {item.fileType} format</span>
                <button className="btn btn-outline btn-sm" onClick={() => toast(`Downloading ${item.title}...`, 'success')}>
                  📥 Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Quick Links */}
          <div className="card p">
            <h4 className="mb-12">⚡ Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={() => setUploadModal(true)}>
                ➕ Upload Resource
              </button>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={() => toast('Cloud storage directory opened', 'info')}>
                🗂️ Manage My Resources
              </button>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={() => toast('Resource permissions updated', 'info')}>
                🔒 Permissions & Access
              </button>
            </div>
          </div>

          {/* Storage Usage */}
          <div className="card p">
            <h4 className="mb-12">💾 Cloud Storage Usage</h4>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px 0' }}>
              <div className="circle-progress" style={{ width: '100px', height: '100px' }}>
                <svg width="100" height="100" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="48" fill="none" stroke="var(--bg2)" strokeWidth="12" />
                  <circle
                    cx="60" cy="60" r="48" fill="none" stroke="var(--purple)" strokeWidth="12"
                    strokeDasharray="301.6" strokeDashoffset="96.5" strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="circle-label" style={{ fontSize: '18px' }}>68%</div>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong>6.8 GB / 10 GB</strong>
              <small className="text-muted" style={{ display: 'block', marginTop: '2px' }}>Total Cloud Quota</small>
            </div>
            <button className="btn btn-ghost btn-sm btn-full mt-12" onClick={() => toast('Storage upgraded to 20 GB!', 'success')}>
              Manage Storage →
            </button>
          </div>

          {/* Share with community */}
          <div className="card p" style={{ background: 'var(--grad)', color: '#fff' }}>
            <h4 style={{ color: '#fff', marginBottom: '4px' }}>Share Resources</h4>
            <p style={{ color: '#e0d9ff', fontSize: '12px', marginBottom: '12px' }}>
              Publish your handouts to the global AVENQORI teacher library to earn badges and student reach!
            </p>
            <button className="btn btn-sm btn-full" style={{ background: '#fff', color: 'var(--purple)', border: 'none', fontWeight: 700 }} onClick={() => toast('Resource shared to global library', 'success')}>
              Share Now →
            </button>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {uploadModal && (
        <div className="modal-overlay" onClick={() => setUploadModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Upload Teaching Resource</h3>
              <button className="modal-close" onClick={() => setUploadModal(false)}>✕</button>
            </div>

            <div className="form-group">
              <label className="form-label">Resource Title</label>
              <input className="form-input" placeholder="e.g. Calculus Derivatives Cheat Sheet" />
            </div>

            <div className="grid-2" style={{ gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select">
                  <option>Teaching Material</option>
                  <option>Guide</option>
                  <option>Template</option>
                  <option>Tool</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Format</label>
                <select className="form-select">
                  <option>PDF Document</option>
                  <option>DOCX / Word</option>
                  <option>XLSX / Excel</option>
                  <option>ZIP Archive</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Select File to Upload</label>
              <input type="file" className="form-input" />
            </div>

            <div className="flex gap-12 mt-20">
              <button className="btn btn-ghost flex-1" onClick={() => setUploadModal(false)}>Cancel</button>
              <button className="btn btn-primary flex-1" onClick={() => { toast('Resource uploaded successfully to cloud library!', 'success'); setUploadModal(false); }}>
                Upload File →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
