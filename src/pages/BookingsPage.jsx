import { useState } from 'react';
import { useApp, PAGES } from '../context/AppContext';

const INITIAL_BOOKINGS = [
  {
    id: 1,
    title: 'English Conversation Practice',
    tutor: 'Sara Khan',
    avatar: '👩‍🏫',
    rating: 4.9,
    reviews: '12k reviews',
    type: '1-on-1 Session',
    duration: '60 Mins',
    date: 'Nov 17, 2025',
    time: 'Mon • 10:00 AM',
    status: 'Upcoming',
    description: 'Improve your English speaking skills with confidence and real conversation practice.'
  },
  {
    id: 2,
    title: 'Python Programming',
    tutor: 'Usman Ahmad',
    avatar: '👨‍💻',
    rating: 4.8,
    reviews: '8k reviews',
    type: 'Live Class',
    duration: '90 Mins',
    date: 'Nov 16, 2025',
    time: 'Sun • 08:00 PM',
    status: 'In Progress',
    description: 'Learn Python from basics to advanced level with real project implementation.'
  },
  {
    id: 3,
    title: 'Mathematics Basics',
    tutor: 'Fatima Noor',
    avatar: '👩‍💼',
    rating: 4.9,
    reviews: '10k reviews',
    type: '1-on-1 Session',
    duration: '60 Mins',
    date: 'Nov 14, 2025',
    time: 'Fri • 07:00 PM',
    status: 'Completed',
    description: 'Get a strong foundation in high school algebra, geometry and mathematical problem solving.'
  },
  {
    id: 4,
    title: 'Web Development',
    tutor: 'Ali Raza',
    avatar: '👨‍💼',
    rating: 4.7,
    reviews: '6k reviews',
    type: 'Live Class',
    duration: '90 Mins',
    date: 'Nov 12, 2025',
    time: 'Wed • 09:00 PM',
    status: 'Cancelled',
    description: 'Build modern responsive websites and web applications with React and Tailwind.'
  }
];

export default function BookingsPage() {
  const { navigate, toast } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [detailsModal, setDetailsModal] = useState(null);

  const handleCancel = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b));
    toast('Booking cancelled. Refund issued to your AVENQORI wallet.', 'info');
  };

  const handleReschedule = (b) => {
    toast(`Reschedule request sent to ${b.tutor}. They will confirm shortly!`, 'success');
  };

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'upcoming') return b.status === 'Upcoming' || b.status === 'In Progress';
    if (activeTab === 'completed') return b.status === 'Completed';
    if (activeTab === 'cancelled') return b.status === 'Cancelled';
    return true;
  });

  return (
    <div className="bookings-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">📅</div>
        <div className="banner-text">
          <h1>My Bookings & Class Schedules</h1>
          <p>Manage your 1-on-1 tutor bookings, live group sessions, and reschedule easily.</p>
        </div>
        <div className="banner-art">🗓️</div>
      </div>

      {/* Tabs */}
      <div className="flex-b mb-20" style={{ flexWrap: 'wrap', gap: '12px' }}>
        <div className="tab-bar" style={{ margin: 0 }}>
          <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
            All Bookings ({bookings.length})
          </button>
          <button className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>
            Upcoming ({bookings.filter(b => b.status === 'Upcoming' || b.status === 'In Progress').length})
          </button>
          <button className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`} onClick={() => setActiveTab('completed')}>
            Completed ({bookings.filter(b => b.status === 'Completed').length})
          </button>
          <button className={`tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`} onClick={() => setActiveTab('cancelled')}>
            Cancelled ({bookings.filter(b => b.status === 'Cancelled').length})
          </button>
        </div>

        <select className="form-select" style={{ width: 'auto', padding: '8px 14px' }}>
          <option>Sort: Latest First</option>
          <option>Sort: Oldest First</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Bookings List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredBookings.map(b => (
            <div key={b.id} className="card p" style={{ display: 'grid', gridTemplateColumns: '80px 1fr 180px 170px', gap: '16px', alignItems: 'center' }}>
              <div style={{ fontSize: '48px', textAlign: 'center' }}>{b.avatar}</div>

              <div>
                <div className="flex-c gap-8 mb-4">
                  <span className={`badge ${b.status === 'Upcoming' ? 'badge-green' : b.status === 'In Progress' ? 'badge-purple' : b.status === 'Completed' ? 'badge-blue' : 'badge-red'}`}>
                    {b.status}
                  </span>
                  <h4 style={{ margin: 0, fontSize: '16px' }}>{b.title}</h4>
                </div>

                <div className="flex-c gap-8 text-sm text-muted mb-4">
                  <span>👨‍🏫 <strong>{b.tutor}</strong> ✓</span>
                  <span>⭐ {b.rating} ({b.reviews})</span>
                </div>

                <div className="flex-c gap-12 text-xs text-muted">
                  <span>📹 {b.type}</span>
                  <span>⏱️ {b.duration}</span>
                </div>

                <p className="text-xs text-muted mt-8" style={{ margin: 0 }}>
                  {b.description}
                </p>
              </div>

              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>📅 {b.date}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>{b.time}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {b.status === 'Upcoming' || b.status === 'In Progress' ? (
                  <>
                    <button className="btn btn-primary btn-sm btn-full" onClick={() => toast(`Entering virtual room for ${b.title}...`, 'success')}>
                      Join Class ▶
                    </button>
                    <button className="btn btn-ghost btn-sm btn-full" onClick={() => handleReschedule(b)}>
                      📅 Reschedule
                    </button>
                    <button className="btn btn-ghost btn-sm btn-full" style={{ color: 'var(--bad)' }} onClick={() => handleCancel(b.id)}>
                      🗑 Cancel Booking
                    </button>
                  </>
                ) : b.status === 'Completed' ? (
                  <>
                    <button className="btn btn-primary btn-sm btn-full" onClick={() => navigate(PAGES.certificates)}>
                      🏆 View Certificate
                    </button>
                    <button className="btn btn-ghost btn-sm btn-full" onClick={() => toast(`Rebooking session with ${b.tutor}...`, 'info')}>
                      🔄 Book Again
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-ghost btn-sm btn-full" onClick={() => setDetailsModal(b)}>
                      View Details
                    </button>
                    <span className="badge badge-red" style={{ textAlign: 'center', padding: '6px' }}>
                      Cancelled & Refunded
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Booking Stats */}
          <div className="card p">
            <h4 className="mb-16">Booking Stats</h4>
            <div className="grid-2" style={{ gap: '10px' }}>
              <div className="stat-card" style={{ padding: '12px' }}>
                <div className="stat-icon purple" style={{ width: '36px', height: '36px', fontSize: '16px' }}>📅</div>
                <div className="stat-info">
                  <strong>4</strong>
                  <span style={{ fontSize: '11px' }}>Total</span>
                </div>
              </div>
              <div className="stat-card" style={{ padding: '12px' }}>
                <div className="stat-icon green" style={{ width: '36px', height: '36px', fontSize: '16px' }}>✅</div>
                <div className="stat-info">
                  <strong>3</strong>
                  <span style={{ fontSize: '11px' }}>Completed</span>
                </div>
              </div>
              <div className="stat-card" style={{ padding: '12px' }}>
                <div className="stat-icon yellow" style={{ width: '36px', height: '36px', fontSize: '16px' }}>⏳</div>
                <div className="stat-info">
                  <strong>1</strong>
                  <span style={{ fontSize: '11px' }}>Upcoming</span>
                </div>
              </div>
              <div className="stat-card" style={{ padding: '12px' }}>
                <div className="stat-icon pink" style={{ width: '36px', height: '36px', fontSize: '16px' }}>❌</div>
                <div className="stat-info">
                  <strong>1</strong>
                  <span style={{ fontSize: '11px' }}>Cancelled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Class Spotlight */}
          <div className="card p" style={{ background: 'var(--grad)', color: '#fff' }}>
            <span className="badge badge-red mb-8">🔴 NEXT CLASS</span>
            <h4 style={{ color: '#fff', marginBottom: '4px' }}>English Conversation Practice</h4>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', marginBottom: '12px' }}>
              Sara Khan • Tomorrow at 10:00 AM
            </p>
            <button className="btn btn-sm" style={{ background: '#fff', color: 'var(--purple)', border: 'none', width: '100%', fontWeight: 700 }} onClick={() => toast('Room opens 5 minutes before scheduled start', 'info')}>
              Join Class ▶
            </button>
          </div>

          {/* Need help */}
          <div className="card p">
            <h4 className="mb-8">Need Help with Bookings?</h4>
            <p className="text-xs text-muted mb-12">Our 24/7 student support can reschedule, issue refunds, or help you change tutors.</p>
            <button className="btn btn-outline btn-sm btn-full" onClick={() => navigate(PAGES.help)}>
              Contact Support →
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {detailsModal && (
        <div className="modal-overlay" onClick={() => setDetailsModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Booking Details</h3>
              <button className="modal-close" onClick={() => setDetailsModal(null)}>✕</button>
            </div>
            <h4>{detailsModal.title}</h4>
            <p className="text-sm text-muted mt-4">Tutor: {detailsModal.tutor} • {detailsModal.date} ({detailsModal.time})</p>
            <div className="badge badge-gray mt-12 mb-16">{detailsModal.status}</div>
            <p className="text-sm">{detailsModal.description}</p>
            <button className="btn btn-primary btn-full mt-20" onClick={() => setDetailsModal(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
