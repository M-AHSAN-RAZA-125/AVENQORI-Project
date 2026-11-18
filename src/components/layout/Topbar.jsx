import { useState } from 'react';
import { useApp, PAGES } from '../../context/AppContext';

export default function Topbar() {
  const { user, userRole, switchRole, navigate } = useApp();
  const [search, setSearch] = useState('');

  const isTeacher = userRole === 'teacher';

  const ini = (name = isTeacher ? 'Dr. Ahmed Khan' : 'Ahmed Raza') =>
    name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <header className="topbar">
      {/* Search */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={isTeacher ? "Search classes, students, or anything..." : "Search courses, tutors, or anything..."}
        />
        <span className="search-kbd">Ctrl + K</span>
      </div>

      <div className="topbar-actions">
        {/* Role Switcher Pill */}
        <div style={{ display: 'flex', background: 'var(--bg2)', borderRadius: '99px', padding: '3px', border: '1px solid var(--line)' }}>
          <button
            onClick={() => switchRole('student')}
            style={{
              border: 'none',
              background: !isTeacher ? 'var(--purple)' : 'transparent',
              color: !isTeacher ? '#fff' : 'var(--text2)',
              borderRadius: '99px',
              padding: '5px 12px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            🎓 Student
          </button>
          <button
            onClick={() => switchRole('teacher')}
            style={{
              border: 'none',
              background: isTeacher ? 'var(--purple)' : 'transparent',
              color: isTeacher ? '#fff' : 'var(--text2)',
              borderRadius: '99px',
              padding: '5px 12px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            👨‍🏫 Teacher
          </button>
        </div>

        {/* Theme toggle */}
        <button className="icon-btn" title="Toggle theme">🌙</button>

        {/* Notifications */}
        <button
          className="icon-btn"
          onClick={() => navigate(isTeacher ? PAGES.teacherNotifications : PAGES.notifications)}
          title="Notifications"
        >
          🔔
          <span className="dot"></span>
        </button>

        {/* User Card */}
        <div
          className="topbar-user"
          onClick={() => navigate(isTeacher ? PAGES.teacherProfile : PAGES.settings)}
        >
          <div className="av av-sm">{ini(user?.name)}</div>
          <div>
            <strong>{user?.name || (isTeacher ? 'Dr. Ahmed Khan' : 'Ahmed Raza')}</strong>
            <small>{isTeacher ? 'Teacher' : 'Student'}</small>
          </div>
          <span>⌄</span>
        </div>
      </div>
    </header>
  );
}
