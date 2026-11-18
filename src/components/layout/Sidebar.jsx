import { useApp, PAGES } from '../../context/AppContext';

const STUDENT_NAV_ITEMS = [
  { icon: '🏠', label: 'Dashboard',        page: PAGES.dashboard,     id: 'dashboard' },
  { icon: '📚', label: 'My Courses',       page: PAGES.myCourses,     id: 'myCourses' },
  { icon: '👩‍🏫', label: 'Find a Tutor',    page: PAGES.findTutor,     id: 'findTutor' },
  { icon: '📡', label: 'Live Classes',     page: PAGES.liveClasses,   id: 'liveClasses', live: true },
  { icon: '🤖', label: 'AI Study Planner', page: PAGES.aiPlanner,     id: 'aiPlanner' },
  { icon: '📅', label: 'My Bookings',      page: PAGES.bookings,      id: 'bookings' },
  { icon: '🏆', label: 'Certificates',     page: PAGES.certificates,  id: 'certificates' },
  { icon: '📊', label: 'Progress',         page: PAGES.progress,      id: 'progress' },
  { icon: '💬', label: 'Messages',         page: PAGES.messages,      id: 'messages', badge: 3 },
  { icon: '🔔', label: 'Notifications',    page: PAGES.notifications, id: 'notifications', badge: 2 },
  { icon: '⚙️', label: 'Settings',         page: PAGES.settings,      id: 'settings' },
  { icon: '❓', label: 'Help & Support',   page: PAGES.help,          id: 'help' },
];

const TEACHER_NAV_ITEMS = [
  { icon: '🏠', label: 'Dashboard',        page: PAGES.teacherDashboard,     id: 't_dashboard' },
  { icon: '📚', label: 'My Classes',       page: PAGES.teacherClasses,       id: 't_classes', badge: 3 },
  { icon: '👥', label: 'Students',         page: PAGES.teacherStudents,      id: 't_students', badge: 24 },
  { icon: '💰', label: 'Earnings',         page: PAGES.teacherEarnings,      id: 't_earnings', badge: 3 },
  { icon: '📅', label: 'Schedule',         page: PAGES.teacherSchedule,      id: 't_schedule' },
  { icon: '💬', label: 'Messages',         page: PAGES.teacherMessages,      id: 't_messages', badge: 2 },
  { icon: '🔔', label: 'Notifications',    page: PAGES.teacherNotifications, id: 't_notifications', badge: 3 },
  { icon: '📦', label: 'Resources',        page: PAGES.teacherResources,     id: 't_resources', badge: 2 },
  { icon: '🏆', label: 'Certificates',     page: PAGES.teacherCertificates,  id: 't_certificates', badge: 1 },
  { icon: '👤', label: 'Profile',          page: PAGES.teacherProfile,       id: 't_profile', badge: 2 },
  { icon: '⚙️', label: 'Settings',         page: PAGES.teacherSettings,      id: 't_settings', badge: 1 },
  { icon: '❓', label: 'Help & Support',   page: PAGES.teacherHelp,          id: 't_help' },
];

export default function Sidebar() {
  const { page, navigate, user, userRole, logout } = useApp();

  const isTeacher = userRole === 'teacher';
  const navItems = isTeacher ? TEACHER_NAV_ITEMS : STUDENT_NAV_ITEMS;

  const ini = (name = isTeacher ? 'Dr. Ahmed Khan' : 'Ahmed Raza') =>
    name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo" onClick={() => navigate(PAGES.landing)}>
        <div className="logo-icon">A</div>
        <div className="logo-text">
          <strong>AVENQORI</strong>
          <span>{isTeacher ? 'Teach · Inspire · Grow' : 'Learn · Grow · Achieve'}</span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${page === item.page ? 'active' : ''}`}
            onClick={() => navigate(item.page)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
            {item.live && <span className="nav-live">LIVE</span>}
          </div>
        ))}
      </nav>

      {/* Bottom info */}
      <div className="sidebar-bottom">
        <div className="premium-card">
          <div className="crown">👑</div>
          <h4>Go Premium</h4>
          <p>{isTeacher ? 'Unlock more features & grow your impact!' : 'Unlock all courses & learn faster!'}</p>
          <button>Upgrade Now →</button>
        </div>

        <div
          className="sidebar-user"
          onClick={() => navigate(isTeacher ? PAGES.teacherProfile : PAGES.settings)}
        >
          <div className="user-av">{ini(user?.name)}</div>
          <div className="user-info">
            <strong>{user?.name || (isTeacher ? 'Dr. Ahmed Khan' : 'Ahmed Raza')}</strong>
            <span>{isTeacher ? 'Teacher' : 'Student'}</span>
            <span className="user-plan">{user?.plan || (isTeacher ? 'Verified Tutor' : 'Premium Plan')}</span>
          </div>
        </div>

        <div className="sidebar-logout" onClick={logout}>
          <span>⬅️</span>
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
}
