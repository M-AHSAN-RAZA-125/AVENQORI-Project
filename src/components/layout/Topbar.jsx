import { useState } from 'react';
import { useApp, PAGES } from '../../context/AppContext';

export default function Topbar() {
  const { user, navigate } = useApp();
  const [search, setSearch] = useState('');

  const ini = (name = 'Ahmed Raza') =>
    name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <header className="topbar">
      {/* Search */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search courses, tutors, or anything..."
        />
        <span className="search-kbd">Ctrl + K</span>
      </div>

      <div className="topbar-actions">
        {/* Theme toggle placeholder */}
        <button className="icon-btn" title="Toggle theme">🌙</button>

        {/* Notifications */}
        <button className="icon-btn" onClick={() => navigate(PAGES.notifications)} title="Notifications">
          🔔
          <span className="dot"></span>
        </button>

        {/* User */}
        <div className="topbar-user" onClick={() => navigate(PAGES.settings)}>
          <div className="av av-sm">{ini(user?.name)}</div>
          <div>
            <strong>{user?.name || 'Ahmed Raza'}</strong>
            <small>{user?.role || 'Student'}</small>
          </div>
          <span>⌄</span>
        </div>
      </div>
    </header>
  );
}
