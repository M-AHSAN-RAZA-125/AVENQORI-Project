import { useState } from 'react';
import { useApp } from '../context/AppContext';

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Live Class Reminder',
    badge: 'LIVE',
    icon: '📹',
    body: 'Your Python Programming live class with Usman Ahmad is starting in 1 hour! Prepare your questions.',
    time: 'Nov 17, 2025 • 09:00 AM',
    unread: true,
    category: 'classes'
  },
  {
    id: 2,
    title: 'Course Progress Update',
    badge: 'PROGRESS',
    icon: '🎓',
    body: 'Congratulations! You have successfully completed 80% of Web Development Basics!',
    time: 'Nov 16, 2025 • 06:45 PM',
    unread: true,
    category: 'course'
  },
  {
    id: 3,
    title: 'Booking Confirmed',
    badge: 'BOOKING',
    icon: '📅',
    body: 'Your 1-on-1 speaking session with Sara Khan is confirmed for Nov 18, 2025 at 10:00 AM.',
    time: 'Nov 16, 2025 • 04:20 PM',
    unread: false,
    category: 'booking'
  },
  {
    id: 4,
    title: 'Special Offer & Discount',
    badge: 'PROMO',
    icon: '🎁',
    body: 'Get 50% OFF on AVENQORI Annual Premium Plan! Upgrade this week to unlock unlimited courses & mentor chat.',
    time: 'Nov 15, 2025 • 12:30 PM',
    unread: false,
    category: 'promo'
  },
  {
    id: 5,
    title: 'New Message from Tutor',
    badge: 'MESSAGE',
    icon: '💬',
    body: 'Sara Khan sent you lecture notes: "Python_Loops_Notes.pdf". Click to review and download.',
    time: 'Nov 14, 2025 • 08:15 PM',
    unread: false,
    category: 'messages'
  }
];

export default function NotificationsPage() {
  const { toast } = useApp();
  const [activeFilter, setActiveFilter] = useState('all'); // all | unread | read
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Settings state
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [promoOffers, setPromoOffers] = useState(false);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    toast('All notifications marked as read', 'success');
  };

  const clearAll = () => {
    setNotifications([]);
    toast('All notifications cleared', 'info');
  };

  const filtered = notifications.filter(n => {
    const matchesCategory = selectedCategory === 'all' || n.category === selectedCategory;
    if (activeFilter === 'unread') return matchesCategory && n.unread;
    if (activeFilter === 'read') return matchesCategory && !n.unread;
    return matchesCategory;
  });

  const unreadCount = notifications.filter(n => n.unread).length;
  const readCount = notifications.filter(n => !n.unread).length;

  return (
    <div className="notifications-page-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">🔔</div>
        <div className="banner-text">
          <h1>Notifications & Alerts</h1>
          <p>Never miss important updates regarding your courses, scheduled sessions, and tutor feedback.</p>
        </div>
        <div className="banner-art">📢</div>
      </div>

      {/* 3-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 280px', gap: '20px' }}>
        {/* Left Categories Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card p">
            <h4 className="mb-12">Notification Categories</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { id: 'all', label: 'All Notifications', count: notifications.length, icon: '🔔' },
                { id: 'course', label: 'Course Updates', count: 3, icon: '📚' },
                { id: 'classes', label: 'Class Reminders', count: 2, icon: '📅' },
                { id: 'booking', label: 'Booking Updates', count: 2, icon: '🎟️' },
                { id: 'messages', label: 'Messages', count: 1, icon: '💬' },
                { id: 'promo', label: 'Promotions', count: 2, icon: '🎁' }
              ].map(cat => (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="flex-b p-8"
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: selectedCategory === cat.id ? 'var(--bg2)' : 'transparent',
                    color: selectedCategory === cat.id ? 'var(--purple)' : 'var(--text)',
                    fontWeight: selectedCategory === cat.id ? 700 : 500,
                    fontSize: '13px'
                  }}
                >
                  <span className="flex-c gap-8">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </span>
                  <span className="badge badge-purple" style={{ fontSize: '10px' }}>{cat.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p" style={{ background: 'var(--grad)', color: '#fff' }}>
            <h4 style={{ color: '#fff', marginBottom: '4px' }}>Stay Informed!</h4>
            <p style={{ color: '#e0d9ff', fontSize: '12px', margin: 0 }}>
              Turn on SMS and WhatsApp alerts to get instant notifications when a teacher accepts your booking.
            </p>
          </div>
        </div>

        {/* Center: Notification List */}
        <div>
          {/* Controls Bar */}
          <div className="card p mb-16 flex-b" style={{ padding: '12px 18px' }}>
            <div className="flex gap-8">
              <button className={`tab-btn btn-sm ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All ({notifications.length})</button>
              <button className={`tab-btn btn-sm ${activeFilter === 'unread' ? 'active' : ''}`} onClick={() => setActiveFilter('unread')}>Unread ({unreadCount})</button>
              <button className={`tab-btn btn-sm ${activeFilter === 'read' ? 'active' : ''}`} onClick={() => setActiveFilter('read')}>Read ({readCount})</button>
            </div>

            <div className="flex gap-8">
              <button className="btn btn-ghost btn-sm" onClick={markAllRead}>✓ Mark All as Read</button>
              <button className="btn btn-ghost btn-sm" style={{ color: 'var(--bad)' }} onClick={clearAll} title="Clear all">🗑</button>
            </div>
          </div>

          {/* List items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.length === 0 ? (
              <div className="card p text-center text-muted" style={{ padding: '40px' }}>
                No notifications in this category.
              </div>
            ) : (
              filtered.map(item => (
                <div
                  key={item.id}
                  className="card p"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    borderLeft: item.unread ? '4px solid var(--purple)' : '1px solid var(--line)',
                    background: item.unread ? '#faf8ff' : '#fff'
                  }}
                >
                  <div style={{ fontSize: '24px', padding: '8px', background: 'var(--bg)', borderRadius: '10px' }}>
                    {item.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div className="flex-b mb-4">
                      <div className="flex-c gap-8">
                        <strong style={{ fontSize: '15px' }}>{item.title}</strong>
                        {item.badge && <span className="badge badge-purple" style={{ fontSize: '10px' }}>{item.badge}</span>}
                      </div>
                      {item.unread && <span className="badge badge-purple">● Unread</span>}
                    </div>

                    <p style={{ fontSize: '13px', color: 'var(--text2)', margin: '4px 0 8px' }}>
                      {item.body}
                    </p>

                    <span className="text-xs text-muted">🕒 {item.time}</span>
                  </div>
                </div>
              ))
            )}
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
                  <strong>{notifications.length}</strong>
                  <span style={{ fontSize: '11px' }}>Total</span>
                </div>
              </div>
              <div className="stat-card" style={{ padding: '10px' }}>
                <div className="stat-info">
                  <strong className="text-purple">{unreadCount}</strong>
                  <span style={{ fontSize: '11px' }}>Unread</span>
                </div>
              </div>
              <div className="stat-card" style={{ padding: '10px' }}>
                <div className="stat-info">
                  <strong>{readCount}</strong>
                  <span style={{ fontSize: '11px' }}>Read</span>
                </div>
              </div>
              <div className="stat-card" style={{ padding: '10px' }}>
                <div className="stat-info">
                  <strong className="text-ok">2</strong>
                  <span style={{ fontSize: '11px' }}>Important</span>
                </div>
              </div>
            </div>
          </div>

          {/* Settings toggles */}
          <div className="card p">
            <h4 className="mb-14">Notification Settings</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="flex-b">
                <span className="text-sm">📧 Email Notifications</span>
                <label className="toggle">
                  <input type="checkbox" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="flex-b">
                <span className="text-sm">🔔 Push Notifications</span>
                <label className="toggle">
                  <input type="checkbox" checked={pushNotif} onChange={() => setPushNotif(!pushNotif)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="flex-b">
                <span className="text-sm">📚 Course Updates</span>
                <label className="toggle">
                  <input type="checkbox" checked={courseUpdates} onChange={() => setCourseUpdates(!courseUpdates)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="flex-b">
                <span className="text-sm">🎁 Special Offers</span>
                <label className="toggle">
                  <input type="checkbox" checked={promoOffers} onChange={() => setPromoOffers(!promoOffers)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
