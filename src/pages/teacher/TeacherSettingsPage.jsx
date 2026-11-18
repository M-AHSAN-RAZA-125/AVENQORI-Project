import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function TeacherSettingsPage() {
  const { toast } = useApp();
  const [themeMode, setThemeMode] = useState('Light'); // Light | Dark | Auto
  const [language, setLanguage] = useState('English');
  const [timezone, setTimezone] = useState('(GMT+5:00) Pakistan Time');

  // Notification toggles
  const [enableAll, setEnableAll] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [studentActivities, setStudentActivities] = useState(true);
  const [earningsNotif, setEarningsNotif] = useState(true);
  const [promoNotif, setPromoNotif] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);

  const handleSave = () => {
    toast('Teacher settings & preferences saved successfully!', 'success');
  };

  return (
    <div className="teacher-settings-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">⚙️</div>
        <div className="banner-text">
          <h1>Teacher Settings & Account Preferences</h1>
          <p>Customize Your Experience! Configure your notifications, 2FA security, time zone, and teaching tools.</p>
        </div>
        <div className="banner-art">🛠️</div>
      </div>

      {/* Account Profile Card */}
      <div className="card p mb-20 flex-b" style={{ flexWrap: 'wrap', gap: '16px' }}>
        <div className="flex-c gap-16">
          <div className="av av-lg">AK</div>
          <div>
            <div className="flex-c gap-8">
              <h3 style={{ margin: 0 }}>Dr. Ahmed Khan</h3>
              <span className="text-ok font-bold">✓</span>
              <span className="badge badge-purple">Teacher</span>
            </div>
            <div className="text-xs text-muted mt-4">ahmed.khan@avenqori.com • Karachi, Pakistan</div>
            <span className="badge badge-green mt-6">Account Verified ✓</span>
          </div>
        </div>

        <button className="btn btn-ghost btn-sm" onClick={() => toast('Profile editor opened', 'info')}>
          View Profile →
        </button>
      </div>

      {/* 2-Column Settings Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '20px' }}>
        {/* Left Column: General & Quick Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* General Settings */}
          <div className="card p">
            <h3 className="mb-14">⚙️ General Settings</h3>

            <div className="form-group">
              <label className="form-label">Language</label>
              <select className="form-select" value={language} onChange={e => setLanguage(e.target.value)}>
                <option>English</option>
                <option>Urdu (اردو)</option>
                <option>Roman Urdu</option>
                <option>Arabic</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Theme Mode</label>
              <div className="flex gap-4">
                {['Light', 'Dark', 'Auto'].map(mode => (
                  <button
                    key={mode}
                    className={`tab-btn flex-1 ${themeMode === mode ? 'active' : ''}`}
                    style={{ padding: '8px', fontSize: '12px' }}
                    onClick={() => setThemeMode(mode)}
                  >
                    {mode === 'Light' ? '☀️ Light' : mode === 'Dark' ? '🌙 Dark' : '💻 Auto'}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Timezone</label>
              <select className="form-select" value={timezone} onChange={e => setTimezone(e.target.value)}>
                <option>(GMT+5:00) Pakistan Time</option>
                <option>(GMT+0:00) UTC / London</option>
                <option>(GMT+4:00) Dubai / UAE</option>
                <option>(GMT-5:00) Eastern Time (US)</option>
              </select>
            </div>
          </div>

          {/* Quick Settings Links */}
          <div className="card p">
            <h4 className="mb-12">⚡ Quick Settings</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                'Update Profile Information',
                'Change Password',
                'Manage Notifications',
                'Privacy Settings',
                'Language & Region',
                'Help & Support'
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex-b p-8"
                  style={{ background: 'var(--bg)', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}
                  onClick={() => toast(`Opening ${item}...`, 'info')}
                >
                  <span>{item}</span>
                  <span className="text-muted">➔</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Notification Preferences & Security */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Notification Preferences */}
          <div className="card p">
            <div className="flex-b mb-16">
              <div>
                <h3 style={{ margin: 0 }}>🔔 Notification Preferences</h3>
                <small className="text-muted">Choose what notifications you want to receive</small>
              </div>
              <div className="flex-c gap-8">
                <span className="text-xs text-muted">Enable All</span>
                <label className="toggle">
                  <input type="checkbox" checked={enableAll} onChange={() => setEnableAll(!enableAll)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="grid-2" style={{ gap: '12px' }}>
              <div className="flex-b p-10" style={{ background: 'var(--bg)', borderRadius: '8px' }}>
                <span className="text-sm">📧 Email Notifications</span>
                <label className="toggle">
                  <input type="checkbox" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="flex-b p-10" style={{ background: 'var(--bg)', borderRadius: '8px' }}>
                <span className="text-sm">👥 Student Activities</span>
                <label className="toggle">
                  <input type="checkbox" checked={studentActivities} onChange={() => setStudentActivities(!studentActivities)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="flex-b p-10" style={{ background: 'var(--bg)', borderRadius: '8px' }}>
                <span className="text-sm">🔔 Push Notifications</span>
                <label className="toggle">
                  <input type="checkbox" checked={pushNotif} onChange={() => setPushNotif(!pushNotif)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="flex-b p-10" style={{ background: 'var(--bg)', borderRadius: '8px' }}>
                <span className="text-sm">💰 Earnings & Payouts</span>
                <label className="toggle">
                  <input type="checkbox" checked={earningsNotif} onChange={() => setEarningsNotif(!earningsNotif)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="flex-b p-10" style={{ background: 'var(--bg)', borderRadius: '8px' }}>
                <span className="text-sm">📚 Course Updates</span>
                <label className="toggle">
                  <input type="checkbox" checked={courseUpdates} onChange={() => setCourseUpdates(!courseUpdates)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="flex-b p-10" style={{ background: 'var(--bg)', borderRadius: '8px' }}>
                <span className="text-sm">🎁 Promotions & Offers</span>
                <label className="toggle">
                  <input type="checkbox" checked={promoNotif} onChange={() => setPromoNotif(!promoNotif)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="card p">
            <h3 className="mb-14">🛡️ Privacy & Security</h3>

            <div className="flex-b p-12 mb-10" style={{ background: 'var(--bg)', borderRadius: '8px' }}>
              <div>
                <strong className="text-sm">Two-Factor Authentication (2FA)</strong>
                <p className="text-xs text-muted" style={{ margin: 0 }}>Add an extra layer of SMS or Authenticator security to your account.</p>
              </div>
              <label className="toggle">
                <input type="checkbox" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="flex-b p-12" style={{ background: 'var(--bg)', borderRadius: '8px' }}>
              <div>
                <strong className="text-sm">Active Login Sessions</strong>
                <p className="text-xs text-muted" style={{ margin: 0 }}>Manage and log out from unknown devices or browsers.</p>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => toast('Active sessions: Chrome on Windows (Current)', 'info')}>
                View Sessions →
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex-b">
            <span className="text-xs text-muted">All preferences automatically sync with your account cloud profile.</span>
            <button className="btn btn-primary" onClick={handleSave}>
              💾 Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
