import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function TeacherProfilePage() {
  const { toast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Dr. Ahmed Khan',
    email: 'ahmed.khan@avenqori.com',
    phone: '+92 300 1234567',
    location: 'Karachi, Pakistan',
    bio: 'Experienced Python Developer and Programming Instructor. Passionate about teaching and helping students grow into industry-ready engineers.'
  });

  const handleSave = () => {
    setIsEditing(false);
    toast('Public teacher profile updated successfully!', 'success');
  };

  return (
    <div className="teacher-profile-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">👤</div>
        <div className="banner-text">
          <h1>My Public Tutor Profile & Credentials</h1>
          <p>Keep Inspiring Your Students! Manage your bio, rates, teaching style, and verified academic credentials.</p>
        </div>
        <div className="banner-art">🎓</div>
      </div>

      {/* Profile Overview Card */}
      <div className="card p mb-20">
        <div className="flex-b mb-16">
          <h3 style={{ margin: 0 }}>Profile Overview</h3>
          <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel Edit' : '✎ Edit Profile'}
          </button>
        </div>

        <div className="flex gap-20" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <div className="av av-xl">AK</div>
            <button
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--purple)',
                color: '#fff',
                border: '2px solid #fff',
                cursor: 'pointer',
                fontSize: '12px'
              }}
              title="Change Photo"
              onClick={() => toast('Upload photo dialog opened', 'info')}
            >
              📷
            </button>
          </div>

          <div style={{ flex: 1, minWidth: '240px' }}>
            <div className="flex-c gap-8">
              <h2 style={{ margin: 0 }}>{profile.name}</h2>
              <span className="text-ok font-bold">✓</span>
              <span className="badge badge-purple">Teacher</span>
            </div>

            <div className="flex-c gap-16 text-xs text-muted mt-6">
              <span>✉️ {profile.email}</span>
              <span>📍 {profile.location}</span>
              <span>📅 Joined: Nov 15, 2025</span>
            </div>

            <div className="flex gap-20 mt-14 pt-12" style={{ borderTop: '1px solid var(--line)' }}>
              <div>
                <strong style={{ fontSize: '18px', color: 'var(--purple)' }}>12</strong>
                <small className="text-muted" style={{ display: 'block', fontSize: '11px' }}>Total Classes</small>
              </div>
              <div>
                <strong style={{ fontSize: '18px', color: 'var(--ok)' }}>892</strong>
                <small className="text-muted" style={{ display: 'block', fontSize: '11px' }}>Total Students</small>
              </div>
              <div>
                <strong style={{ fontSize: '18px', color: 'var(--warn)' }}>★ 4.8</strong>
                <small className="text-muted" style={{ display: 'block', fontSize: '11px' }}>Tutor Rating</small>
              </div>
              <div>
                <strong style={{ fontSize: '18px', color: '#f59e0b' }}>#1</strong>
                <small className="text-muted" style={{ display: 'block', fontSize: '11px' }}>Top Teacher</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Personal Information + Professional Information */}
      <div className="grid-2 mb-20">
        {/* Personal Info */}
        <div className="card p">
          <h3 className="mb-14">Personal Information</h3>

          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label className="form-label">Full Name</label>
                <input className="form-input" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input className="form-input" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
              </div>
              <div>
                <label className="form-label">Phone Number</label>
                <input className="form-input" value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
              </div>
              <div>
                <label className="form-label">Location</label>
                <input className="form-input" value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })} />
              </div>
              <div>
                <label className="form-label">Bio</label>
                <textarea className="form-textarea" value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} />
              </div>
              <button className="btn btn-primary btn-sm mt-8" onClick={handleSave}>Save Changes</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div className="flex-b">
                <span className="text-muted">Full Name:</span>
                <strong>{profile.name}</strong>
              </div>
              <div className="flex-b">
                <span className="text-muted">Email Address:</span>
                <strong>{profile.email}</strong>
              </div>
              <div className="flex-b">
                <span className="text-muted">Phone Number:</span>
                <strong>{profile.phone}</strong>
              </div>
              <div className="flex-b">
                <span className="text-muted">Location:</span>
                <strong>{profile.location}</strong>
              </div>
              <div>
                <span className="text-muted" style={{ display: 'block', marginBottom: '4px' }}>Bio:</span>
                <p className="text-xs" style={{ background: 'var(--bg)', padding: '10px', borderRadius: '8px' }}>
                  {profile.bio}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Professional Information */}
        <div className="card p">
          <h3 className="mb-14">Professional Information</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
            <div>
              <span className="text-muted" style={{ display: 'block', marginBottom: '6px' }}>Subject Expertise:</span>
              <div className="flex gap-6" style={{ flexWrap: 'wrap' }}>
                <span className="tag">Python</span>
                <span className="tag">Data Science</span>
                <span className="tag">Web Development</span>
                <span className="tag">AI & Machine Learning</span>
              </div>
            </div>

            <div className="flex-b">
              <span className="text-muted">Experience:</span>
              <strong>5+ Years</strong>
            </div>

            <div className="flex-b">
              <span className="text-muted">Education:</span>
              <strong>MS in Computer Science</strong>
            </div>

            <div className="flex-b">
              <span className="text-muted">Languages:</span>
              <strong>English, Urdu</strong>
            </div>

            <div className="flex-b">
              <span className="text-muted">Teaching Style:</span>
              <strong>Interactive & Practical Learning</strong>
            </div>

            {/* Impact badge */}
            <div className="card p mt-8 flex-b" style={{ background: 'var(--bg2)', padding: '12px' }}>
              <div>
                <strong className="text-xs text-purple">Your Teaching Impact</strong>
                <p className="text-xs text-muted" style={{ margin: 0 }}>Inspiring 892 learners across 4 continents!</p>
              </div>
              <span style={{ fontSize: '32px' }}>🏆</span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings Links */}
      <div className="card p">
        <h3 className="mb-14">⚙️ Account Settings</h3>
        <div className="grid-2" style={{ gap: '10px' }}>
          {[
            { label: 'Change Password', icon: '🔑' },
            { label: 'Update Email Address', icon: '✉️' },
            { label: 'Update Phone Number', icon: '📞' },
            { label: 'Notification Preferences', icon: '🔔' },
            { label: 'Privacy & Security Settings', icon: '🛡️' }
          ].map((item, i) => (
            <div
              key={i}
              className="flex-b p-12"
              style={{ background: 'var(--bg)', borderRadius: '10px', cursor: 'pointer' }}
              onClick={() => toast(`Opening ${item.label}...`, 'info')}
            >
              <div className="flex-c gap-10">
                <span>{item.icon}</span>
                <strong className="text-sm">{item.label}</strong>
              </div>
              <span className="text-muted">➔</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
