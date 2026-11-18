import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function SettingsPage() {
  const { user, toast } = useApp();

  // Profile state
  const [name, setName] = useState(user?.name || 'Ahmed Raza');
  const [email, setEmail] = useState(user?.email || 'ahmedraza@gmail.com');
  const [country, setCountry] = useState(user?.country || 'Pakistan');
  const [language, setLanguage] = useState('English');
  const [themeMode, setThemeMode] = useState('Light Mode');
  const [timezone, setTimezone] = useState('(GMT+5:00) Pakistan Time');

  // Toggles
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [marketingEmail, setMarketingEmail] = useState(false);
  const [showOnline, setShowOnline] = useState(true);

  // Checkboxes
  const [notifCourse, setNotifCourse] = useState(true);
  const [notifClass, setNotifClass] = useState(true);
  const [notifBooking, setNotifBooking] = useState(true);
  const [notifPromos, setNotifPromos] = useState(false);

  const handleSaveSettings = () => {
    toast('Profile and preferences updated successfully!', 'success');
  };

  return (
    <div className="settings-page-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">⚙️</div>
        <div className="banner-text">
          <h1>Account Settings & Preferences</h1>
          <p>Customize your profile, notification rules, learning time zone, and privacy controls.</p>
        </div>
        <div className="banner-art">🛡️</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
        {/* Main Settings Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Account Profile Card */}
          <div className="card p">
            <div className="flex-b mb-16">
              <h3 style={{ margin: 0 }}>👤 Account Profile</h3>
              <button className="btn btn-ghost btn-sm" onClick={handleSaveSettings}>Save Profile →</button>
            </div>

            <div className="flex gap-20" style={{ alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <div className="av av-xl">AR</div>
                <button
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'var(--purple)',
                    color: '#fff',
                    border: '2px solid #fff',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                  title="Change avatar"
                  onClick={() => toast('Avatar upload dialog opened', 'info')}
                >
                  📷
                </button>
              </div>

              <div style={{ flex: 1 }}>
                <div className="grid-2" style={{ gap: '12px' }}>
                  <div>
                    <label className="form-label">Full Name</label>
                    <input className="form-input" value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input className="form-input" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                </div>

                <div className="flex-c gap-16 text-xs text-muted mt-12">
                  <span>🎓 Role: <strong>Student</strong></span>
                  <span>📍 Country: <strong>{country}</strong></span>
                  <span>📅 Member Since: <strong>Nov 14, 2025</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="card p">
            <h3 className="mb-16">🎨 Preferences</h3>
            <div className="grid-3" style={{ gap: '14px' }}>
              <div>
                <label className="form-label">Language</label>
                <select className="form-select" value={language} onChange={e => setLanguage(e.target.value)}>
                  <option>English</option>
                  <option>Urdu (اردو)</option>
                  <option>Roman Urdu</option>
                  <option>Arabic</option>
                </select>
              </div>

              <div>
                <label className="form-label">Theme Mode</label>
                <select className="form-select" value={themeMode} onChange={e => setThemeMode(e.target.value)}>
                  <option>Light Mode</option>
                  <option>Dark Mode</option>
                  <option>System Default</option>
                </select>
              </div>

              <div>
                <label className="form-label">Time Zone</label>
                <select className="form-select" value={timezone} onChange={e => setTimezone(e.target.value)}>
                  <option>(GMT+5:00) Pakistan Time</option>
                  <option>(GMT+0:00) UTC / London</option>
                  <option>(GMT+4:00) Dubai / UAE</option>
                  <option>(GMT-5:00) Eastern Time (US)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Account Settings Toggles */}
          <div className="card p">
            <h3 className="mb-16">🔔 Account & Notification Preferences</h3>
            <div className="grid-2" style={{ gap: '16px' }}>
              <div className="flex-b p-12" style={{ background: 'var(--bg)', borderRadius: '10px' }}>
                <div>
                  <strong className="text-sm">Email Notifications</strong>
                  <p className="text-xs text-muted" style={{ margin: 0 }}>Receive class reminders and updates via email</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="flex-b p-12" style={{ background: 'var(--bg)', borderRadius: '10px' }}>
                <div>
                  <strong className="text-sm">Push Notifications</strong>
                  <p className="text-xs text-muted" style={{ margin: 0 }}>Instant alerts on your browser and mobile device</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" checked={pushNotif} onChange={() => setPushNotif(!pushNotif)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="flex-b p-12" style={{ background: 'var(--bg)', borderRadius: '10px' }}>
                <div>
                  <strong className="text-sm">Marketing & Offers</strong>
                  <p className="text-xs text-muted" style={{ margin: 0 }}>Receive discount vouchers and course recommendations</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" checked={marketingEmail} onChange={() => setMarketingEmail(!marketingEmail)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="flex-b p-12" style={{ background: 'var(--bg)', borderRadius: '10px' }}>
                <div>
                  <strong className="text-sm">Show Online Status</strong>
                  <p className="text-xs text-muted" style={{ margin: 0 }}>Allow assigned tutors to see when you are active</p>
                </div>
                <label className="toggle">
                  <input type="checkbox" checked={showOnline} onChange={() => setShowOnline(!showOnline)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="card p">
            <h3 className="mb-14">🔒 Privacy & Security</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { title: 'Change Password', desc: 'Last updated 3 months ago', icon: '🔑' },
                { title: 'Two-Factor Authentication (2FA)', desc: 'Extra security for your login credentials', icon: '🛡️' },
                { title: 'Privacy Settings', desc: 'Control who can view your certificates and progress', icon: '👁️' },
                { title: 'Blocked Users & Tutors', desc: 'Manage your restricted accounts list', icon: '🚫' }
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex-b p-12"
                  style={{ background: 'var(--bg)', borderRadius: '10px', cursor: 'pointer' }}
                  onClick={() => toast(`Opening ${item.title}...`, 'info')}
                >
                  <div className="flex-c gap-12">
                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                    <div>
                      <strong className="text-sm">{item.title}</strong>
                      <p className="text-xs text-muted" style={{ margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                  <span className="text-muted">➔</span>
                </div>
              ))}
            </div>
          </div>

          {/* Data & Account Management */}
          <div className="card p">
            <h4 className="mb-12">Data & Account Management</h4>
            <div className="flex-b">
              <div>
                <strong className="text-sm">Export Data Copy</strong>
                <p className="text-xs text-muted" style={{ margin: 0 }}>Download all your progress, certificates, and chat archives in a ZIP bundle.</p>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => toast('Exporting your full student data package...', 'success')}>
                📥 Download My Data
              </button>
            </div>

            <hr className="divider" />

            <div className="flex-b">
              <div>
                <strong className="text-sm" style={{ color: 'var(--bad)' }}>Delete Account</strong>
                <p className="text-xs text-muted" style={{ margin: 0 }}>Permanently close your AVENQORI account and erase your personal records.</p>
              </div>
              <button className="btn btn-ghost btn-sm" style={{ color: 'var(--bad)', borderColor: 'var(--bad)' }} onClick={() => toast('Account deletion requires email confirmation', 'error')}>
                🗑 Delete My Account
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Quick Actions */}
          <div className="card p">
            <h4 className="mb-12">⚡ Quick Actions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={() => toast('Password reset link sent to your email', 'success')}>
                🔑 Change Password
              </button>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={handleSaveSettings}>
                👤 Update Profile
              </button>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={() => toast('Downloading offline backup...', 'info')}>
                📥 Download Data
              </button>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start', color: 'var(--bad)' }} onClick={() => toast('Account deactivation paused', 'info')}>
                ⚠️ Deactivate Account
              </button>
            </div>
          </div>

          {/* Account Security Badge */}
          <div className="card p" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
            <div className="flex-c gap-10 mb-8">
              <span style={{ fontSize: '24px' }}>🛡️</span>
              <strong style={{ color: '#065f46' }}>Your Account is Secure!</strong>
            </div>
            <p style={{ fontSize: '12px', color: '#047857', margin: 0 }}>
              Last automated security check completed successfully on Nov 16, 2025 at 10:24 AM. No suspicious activity detected.
            </p>
          </div>

          {/* AI Helper */}
          <div className="card p" style={{ background: 'linear-gradient(135deg, #1e1052, #2d1b6e)', color: '#fff' }}>
            <h4 style={{ color: '#fff', marginBottom: '6px' }}>Need Assistance?</h4>
            <p style={{ color: '#c4b5fd', fontSize: '12px', marginBottom: '12px' }}>
              Have questions about your subscription, payments, or security?
            </p>
            <button className="btn btn-sm btn-full" style={{ background: 'var(--purple)', color: '#fff', border: 'none' }} onClick={() => toast('Connecting to customer care...', 'info')}>
              Contact Support →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
