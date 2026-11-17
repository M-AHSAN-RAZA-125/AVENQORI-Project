import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { role, go, view, requests, pendingCount, setTheme, theme } = useApp();

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <header className="top">
      <span className="brand" onClick={() => go('role')} style={{ cursor: 'pointer' }}>AVENQORI</span>

      <nav className="nav-links">
        {role === 'student' && (
          <>
            <button className={view === 'sForm' ? 'nav-btn active' : 'nav-btn'} onClick={() => go('sForm')}>
              Find Tutor
            </button>
            <button className={view === 'sReqs' ? 'nav-btn active' : 'nav-btn'} onClick={() => go('sReqs')}>
              My Requests
              {requests.length > 0 && <span className="badge">{requests.length}</span>}
            </button>
          </>
        )}

        {role === 'teacher' && (
          <button className={view === 'tDash' ? 'nav-btn active' : 'nav-btn'} onClick={() => go('tDash')}>
            Dashboard
            {pendingCount > 0 && <span className="badge">{pendingCount}</span>}
          </button>
        )}

        {role && (
          <button className="nav-btn" onClick={() => go('role')}>
            Switch Role
          </button>
        )}
      </nav>

      <button className="theme-btn" onClick={toggleTheme} title="Toggle theme">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </header>
  );
}
