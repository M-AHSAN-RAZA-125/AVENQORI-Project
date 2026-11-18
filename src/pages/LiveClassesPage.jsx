import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const CLASSES_DATA = [
  {
    id: 1,
    title: 'Python Programming – Complete Guide',
    subtitle: 'Learn Python from Basics to Advanced with live debugging and real scripts.',
    tutor: 'Usman Ahmad',
    rating: 4.9,
    reviews: '12k reviews',
    dateText: 'Today, Nov 16 • 08:00 PM',
    duration: '1h 30m',
    level: 'Beginner',
    subject: 'Programming',
    icon: '🐍',
    secondsLeft: 9917, // 02:45:17
    type: 'upcoming'
  },
  {
    id: 2,
    title: 'React JS – Modern Development',
    subtitle: 'Build Amazing Web Apps with React 18, Custom Hooks, and State Management.',
    tutor: 'Fatima Noor',
    rating: 4.8,
    reviews: '8k reviews',
    dateText: 'Today, Nov 16 • 09:30 PM',
    duration: '1h 45m',
    level: 'Intermediate',
    subject: 'Programming',
    icon: '⚛️',
    secondsLeft: 15317, // 04:15:17
    type: 'upcoming'
  },
  {
    id: 3,
    title: 'Mathematics – Practice & Problem Solving',
    subtitle: 'Solve Complex Past Paper Problems with Easy Visual Techniques.',
    tutor: 'Ali Raza',
    rating: 4.7,
    reviews: '6k reviews',
    dateText: 'Tomorrow, Nov 17 • 07:00 PM',
    duration: '1h 30m',
    level: 'All Levels',
    subject: 'Mathematics',
    icon: '📐',
    secondsLeft: 81917, // 22:45:17
    type: 'upcoming'
  },
  {
    id: 4,
    title: 'English Conversation Practice & Accent Reduction',
    subtitle: 'Live interactive speaking room with live feedback on pronunciation.',
    tutor: 'Sara Khan',
    rating: 4.9,
    reviews: '14k reviews',
    dateText: 'Streaming Right Now',
    duration: '60 mins',
    level: 'All Levels',
    subject: 'Languages',
    icon: '🎙️',
    secondsLeft: 0,
    type: 'ongoing',
    watching: '2.8k'
  }
];

export default function LiveClassesPage() {
  const { toast } = useApp();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [timers, setTimers] = useState({
    1: 9917,
    2: 15317,
    3: 81917
  });
  const [liveStreamModal, setLiveStreamModal] = useState(null);

  // Countdown timer tick effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => ({
        1: Math.max(0, prev[1] - 1),
        2: Math.max(0, prev[2] - 1),
        3: Math.max(0, prev[3] - 1)
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, '0');
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleJoinClass = (cls) => {
    setLiveStreamModal(cls);
  };

  const filteredClasses = CLASSES_DATA.filter(c => {
    if (activeTab === 'upcoming') return c.type === 'upcoming';
    if (activeTab === 'ongoing') return c.type === 'ongoing';
    return true;
  });

  return (
    <div className="live-classes-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">📡</div>
        <div className="banner-text">
          <span className="badge badge-red mb-8" style={{ display: 'inline-block' }}>● LIVE STREAMING</span>
          <h1>Live Classes & Interactive Workshops</h1>
          <p>Join interactive live classrooms, ask questions in real-time, and learn directly from top global tutors!</p>
          <div className="flex gap-12 mt-16">
            <button className="btn btn-primary" onClick={() => handleJoinClass(CLASSES_DATA[3])}>Join Active Live Stream ▶</button>
            <button className="btn btn-ghost" onClick={() => toast('Weekly live schedule synced', 'info')}>📅 View Schedule</button>
          </div>
        </div>
        <div className="banner-art">🎥</div>
      </div>

      {/* Stats bar */}
      <div className="grid-4 mb-20">
        <div className="stat-card">
          <div className="stat-icon purple">📹</div>
          <div className="stat-info">
            <strong>12</strong>
            <span>Upcoming This Week</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">👥</div>
          <div className="stat-info">
            <strong>8.5K+</strong>
            <span>Total Attendees</span>
          </div>
          <span className="stat-change">↑12%</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">⭐</div>
          <div className="stat-info">
            <strong>4.8 / 5</strong>
            <span>Live Class Rating</span>
          </div>
          <span className="stat-change">↑0.2</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">⏱️</div>
          <div className="stat-info">
            <strong>45+ hrs</strong>
            <span>Live Learning Content</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-bar mb-20">
        <button className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>
          📅 Upcoming Classes ({CLASSES_DATA.filter(c => c.type === 'upcoming').length})
        </button>
        <button className={`tab-btn ${activeTab === 'ongoing' ? 'active' : ''}`} onClick={() => setActiveTab('ongoing')}>
          🔴 Ongoing Classes ({CLASSES_DATA.filter(c => c.type === 'ongoing').length})
        </button>
        <button className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`} onClick={() => setActiveTab('past')}>
          📼 Past Recordings (18)
        </button>
        <button className={`tab-btn ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}>
          ❤️ Saved Classes
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Left Class Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredClasses.map(cls => (
            <div key={cls.id} className="card p" style={{ display: 'grid', gridTemplateColumns: '120px 1fr 180px', gap: '16px', alignItems: 'center' }}>
              <div style={{ height: '100px', background: 'var(--grad)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '42px', position: 'relative' }}>
                {cls.icon}
                <span className="badge badge-red" style={{ position: 'absolute', top: '6px', left: '6px', fontSize: '10px' }}>
                  {cls.type === 'ongoing' ? 'LIVE NOW' : 'LIVE'}
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>{cls.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '8px' }}>{cls.subtitle}</p>

                <div className="flex-c gap-12" style={{ fontSize: '13px', color: 'var(--muted)' }}>
                  <span>👨‍🏫 <strong>{cls.tutor}</strong></span>
                  <span>⭐ {cls.rating} ({cls.reviews})</span>
                </div>

                <div className="flex-c gap-12 mt-8" style={{ fontSize: '12px' }}>
                  <span className="badge badge-purple">{cls.dateText}</span>
                  <span className="badge badge-gray">⏳ {cls.duration}</span>
                  <span className="badge badge-blue">🎯 {cls.level}</span>
                </div>
              </div>

              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {cls.type === 'upcoming' ? (
                  <>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>STARTS IN</div>
                    <div className="countdown" style={{ justifyContent: 'center', fontSize: '16px', padding: '6px 12px' }}>
                      {formatCountdown(timers[cls.id] || 0)}
                    </div>
                    <button className="btn btn-primary btn-sm btn-full" onClick={() => handleJoinClass(cls)}>
                      Join Class ▶
                    </button>
                    <button className="btn btn-ghost btn-sm btn-full" onClick={() => toast('Added to your calendar!', 'success')}>
                      📅 Add to Calendar
                    </button>
                  </>
                ) : (
                  <>
                    <span className="badge badge-red font-bold" style={{ padding: '6px 10px', fontSize: '12px' }}>
                      ● {cls.watching} watching
                    </span>
                    <button className="btn btn-danger btn-sm btn-full" style={{ padding: '10px' }} onClick={() => handleJoinClass(cls)}>
                      Join Live Stream Now ▶
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Join Live Now Card */}
          <div className="card p" style={{ background: 'linear-gradient(135deg, #1e1052, #2d1b6e)', color: '#fff' }}>
            <div className="flex-b mb-12">
              <span className="badge badge-red">🔴 LIVE NOW</span>
              <span style={{ fontSize: '12px', color: '#c4b5fd' }}>2.8K Watching</span>
            </div>
            <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '6px' }}>English Conversation Practice</h4>
            <p style={{ color: '#d8b4fe', fontSize: '13px', marginBottom: '12px' }}>
              Sara Khan is running an open English accent & speech mastery workshop.
            </p>
            <button className="btn btn-primary btn-full" onClick={() => handleJoinClass(CLASSES_DATA[3])}>
              Join Live Class Now →
            </button>
          </div>

          {/* Class Categories */}
          <div className="card p">
            <h4 className="mb-12">Class Categories</h4>
            <div className="grid-2" style={{ gap: '8px' }}>
              <div className="badge badge-purple" style={{ padding: '10px', textAlign: 'center', cursor: 'pointer' }}>💻 Programming</div>
              <div className="badge badge-blue" style={{ padding: '10px', textAlign: 'center', cursor: 'pointer' }}>📐 Mathematics</div>
              <div className="badge badge-green" style={{ padding: '10px', textAlign: 'center', cursor: 'pointer' }}>🧪 Science</div>
              <div className="badge badge-yellow" style={{ padding: '10px', textAlign: 'center', cursor: 'pointer' }}>🗣️ Languages</div>
              <div className="badge badge-gray" style={{ padding: '10px', textAlign: 'center', cursor: 'pointer' }}>💼 Business</div>
              <div className="badge badge-purple" style={{ padding: '10px', textAlign: 'center', cursor: 'pointer' }}>🎨 Design</div>
            </div>
          </div>

          {/* Upgrade Card */}
          <div className="upgrade-card">
            <div className="crown">👑</div>
            <h3>Upgrade to Premium</h3>
            <p>Get unlimited access to all live classes, recordings, and direct Q&A priority.</p>
            <button className="upgrade-btn" onClick={() => toast('Opening subscription checkout...', 'info')}>
              Go Premium →
            </button>
          </div>
        </div>
      </div>

      {/* Live Stream Simulation Modal */}
      {liveStreamModal && (
        <div className="modal-overlay" onClick={() => setLiveStreamModal(null)}>
          <div className="modal-box" style={{ maxWidth: '680px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex-c gap-8">
                <span className="badge badge-red">● LIVE STREAM</span>
                <h3 style={{ margin: 0 }}>{liveStreamModal.title}</h3>
              </div>
              <button className="modal-close" onClick={() => setLiveStreamModal(null)}>✕</button>
            </div>

            {/* Video Player simulator */}
            <div style={{ height: '320px', background: '#0a0a14', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff', position: 'relative' }}>
              <div style={{ fontSize: '64px', marginBottom: '8px' }}>{liveStreamModal.icon}</div>
              <h4 style={{ color: '#fff' }}>Interactive Virtual Classroom</h4>
              <p style={{ color: '#9ca3af', fontSize: '13px' }}>Tutor: {liveStreamModal.tutor} • Audio/Video High Definition Stream</p>

              <div style={{ position: 'absolute', bottom: '16px', display: 'flex', gap: '12px' }}>
                <button className="btn btn-sm btn-ghost" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>🎤 Mute</button>
                <button className="btn btn-sm btn-ghost" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>📹 Video On</button>
                <button className="btn btn-sm btn-ghost" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>✋ Raise Hand</button>
                <button className="btn btn-sm btn-danger" onClick={() => setLiveStreamModal(null)}>Leave Room</button>
              </div>
            </div>

            <div className="flex-b mt-16">
              <div className="flex-c gap-8">
                <span style={{ fontSize: '20px' }}>💬</span>
                <span style={{ fontSize: '13px', color: 'var(--text2)' }}>Live student chat and questions are enabled for this session.</span>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => toast('Question submitted to tutor!', 'success')}>
                Ask Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
