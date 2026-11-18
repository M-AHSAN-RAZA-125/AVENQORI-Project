import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function TeacherNotificationsPage() {
  const { toast } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Class Scheduled', body: 'Your Python Programming class is scheduled for Nov 20, 2025 at 03:00 PM.', time: '2 min ago', unread: true, icon: '📅', type: 'classes' },
    { id: 2, title: 'Student Enrolled', body: 'A new student Ahmad Raza has joined your Web Development course.', time: '15 min ago', unread: true, icon: '👥', type: 'students' },
    { id: 3, title: 'Earnings Update', body: 'You earned $120.50 from recent classes completed this morning.', time: '1 hour ago', unread: true, icon: '💰', type: 'earnings' },
    { id: 4, title: 'New Message', body: 'Ayesha Khan sent you a message regarding homework problem 4.', time: '2 hours ago', unread: false, icon: '💬', type: 'messages' },
    { id: 5, title: 'Live Class Reminder', body: 'Your Python class is starting in 1 hour (at 03:00 PM).', time: '3 hours ago', unread: false, icon: '📹', type: 'classes' },
    { id: 6, title: 'Certificate Issued', body: 'A completion certificate has been issued for your Data Science course.', time: '1 day ago', unread: false, icon: '🏆', type: 'classes' },
    { id: 7, title: 'Special Platform Offer', body: 'Get 50% OFF on all teacher promotional campaigns. Limited time offer!', time: '1 day ago', unread: false, icon: '🎁', type: 'promotions' }
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    toast('All notifications marked as read', 'success');
  };

  const filtered = notifications.filter(n => {
    if (activeTab === 'classes') return n.type === 'classes';
    if (activeTab === 'earnings') return n.type === 'earnings';
    if (activeTab === 'messages') return n.type === 'messages';
    return true;
  });

  return (
    <div className="teacher-notifications-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">🔔</div>
        <div className="banner-text">
          <h1>Teacher Notifications & Student Activity</h1>
          <p>Never Miss Important Updates! Stay updated with student enrollments, earnings deposits, and class reminders.</p>
        </div>
        <div className="banner-art">📢</div>
      </div>

      {/* Categories Tabs Bar */}
      <div className="card p mb-16 flex-b" style={{ flexWrap: 'wrap', gap: '10px' }}>
        <div className="tab-bar" style={{ margin: 0 }}>
          <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All Notifications (20)</button>
          <button className={`tab-btn ${activeTab === 'classes' ? 'active' : ''}`} onClick={() => setActiveTab('classes')}>Class Updates (6)</button>
          <button className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>Messages (5)</button>
          <button className={`tab-btn ${activeTab === 'earnings' ? 'active' : ''}`} onClick={() => setActiveTab('earnings')}>Earnings (3)</button>
        </div>

        <button className="btn btn-ghost btn-sm" onClick={markAllRead}>
          ✓ Mark All as Read
        </button>
      </div>

      {/* Main Grid: List + Sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
        {/* Notifications List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(item => (
            <div
              key={item.id}
              className="card p flex-b"
              style={{
                alignItems: 'flex-start',
                borderLeft: item.unread ? '4px solid var(--purple)' : '1px solid var(--line)',
                background: item.unread ? '#faf8ff' : '#fff'
              }}
            >
              <div className="flex gap-14" style={{ alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px', background: 'var(--bg)', padding: '8px', borderRadius: '10px' }}>
                  {item.icon}
                </span>
                <div>
                  <div className="flex-c gap-8">
                    <strong style={{ fontSize: '14px' }}>{item.title}</strong>
                    {item.unread && <span className="badge badge-purple" style={{ fontSize: '9px' }}>● Unread</span>}
                  </div>
                  <p className="text-xs text-muted" style={{ margin: '4px 0' }}>{item.body}</p>
                  <span className="text-xs text-muted">🕒 {item.time}</span>
                </div>
              </div>
              <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px' }}>⋮</button>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex-b p-12 mt-8">
            <span className="text-xs text-muted">Showing 1-7 of 20 notifications</span>
            <div className="flex gap-4">
              <button className="btn btn-primary btn-sm" style={{ padding: '4px 10px' }}>1</button>
              <button className="btn btn-ghost btn-sm" style={{ padding: '4px 10px' }}>2</button>
              <button className="btn btn-ghost btn-sm" style={{ padding: '4px 10px' }}>3</button>
              <button className="btn btn-ghost btn-sm">›</button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Summary */}
          <div className="card p">
            <h4 className="mb-12">Notification Summary</h4>
            <div className="grid-2" style={{ gap: '8px' }}>
              <div className="stat-card" style={{ padding: '10px' }}>
                <div className="stat-info">
                  <strong>20</strong>
                  <span style={{ fontSize: '11px' }}>Total</span>
                </div>
              </div>
              <div className="stat-card" style={{ padding: '10px' }}>
                <div className="stat-info">
                  <strong className="text-purple">3</strong>
                  <span style={{ fontSize: '11px' }}>Unread</span>
                </div>
              </div>
              <div className="stat-card" style={{ padding: '10px' }}>
                <div className="stat-info">
                  <strong>17</strong>
                  <span style={{ fontSize: '11px' }}>Read</span>
                </div>
              </div>
              <div className="stat-card" style={{ padding: '10px' }}>
                <div className="stat-info">
                  <strong className="text-ok">5</strong>
                  <span style={{ fontSize: '11px' }}>Important</span>
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="card p">
            <h4 className="mb-12">Notification Settings</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="flex-b text-sm">
                <span>📧 Email Alerts</span>
                <span className="badge badge-green">ON</span>
              </div>
              <div className="flex-b text-sm">
                <span>🔔 Push Alerts</span>
                <span className="badge badge-green">ON</span>
              </div>
              <div className="flex-b text-sm">
                <span>💰 Earnings Alerts</span>
                <span className="badge badge-green">ON</span>
              </div>
              <div className="flex-b text-sm">
                <span>🎁 Special Offers</span>
                <span className="badge badge-gray">OFF</span>
              </div>
            </div>
          </div>

          {/* Stay Connected CTA */}
          <div className="card p" style={{ background: 'var(--grad)', color: '#fff' }}>
            <h4 style={{ color: '#fff', marginBottom: '4px' }}>Stay Connected!</h4>
            <p style={{ color: '#e0d9ff', fontSize: '12px', marginBottom: '12px' }}>
              Get instant alerts about your students and class starts directly on your device.
            </p>
            <button className="btn btn-sm btn-full" style={{ background: '#fff', color: 'var(--purple)', border: 'none', fontWeight: 700 }} onClick={() => toast('Browser push notifications enabled!', 'success')}>
              Enable Notifications →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
