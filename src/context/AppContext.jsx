import { createContext, useContext, useState, useCallback, useRef } from 'react';

const AppContext = createContext(null);

export const PAGES = {
  // Public
  landing: 'landing',
  login:   'login',
  signup:  'signup',

  // Student portal pages
  dashboard:    'dashboard',
  myCourses:    'myCourses',
  findTutor:    'findTutor',
  liveClasses:  'liveClasses',
  aiPlanner:    'aiPlanner',
  bookings:     'bookings',
  certificates: 'certificates',
  progress:     'progress',
  messages:     'messages',
  notifications:'notifications',
  settings:     'settings',
  help:         'help',

  // Teacher portal pages
  teacherDashboard:    't_dashboard',
  teacherClasses:      't_classes',
  teacherStudents:     't_students',
  teacherEarnings:     't_earnings',
  teacherSchedule:     't_schedule',
  teacherMessages:     't_messages',
  teacherNotifications:'t_notifications',
  teacherResources:    't_resources',
  teacherCertificates: 't_certificates',
  teacherProfile:      't_profile',
  teacherSettings:     't_settings',
  teacherHelp:         't_help',
};

const MOCK_STUDENT = {
  name: 'Ahmed Raza',
  role: 'Student',
  email: 'ahmedraza@gmail.com',
  plan: 'Premium Plan',
  country: 'Pakistan',
  memberSince: 'Nov 14, 2025',
};

const MOCK_TEACHER = {
  name: 'Dr. Ahmed Khan',
  role: 'Teacher',
  email: 'ahmed.khan@avenqori.com',
  plan: 'Verified Tutor',
  country: 'Pakistan',
  memberSince: 'Nov 15, 2025',
};

export function AppProvider({ children }) {
  const [page, setPage] = useState(PAGES.landing);
  const [userRole, setUserRole] = useState('student'); // 'student' | 'teacher'
  const [user, setUser] = useState(null);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  const navigate = useCallback((p) => {
    setPage(p);
    window.scrollTo(0, 0);
  }, []);

  const login = useCallback((role = 'student') => {
    setUserRole(role);
    setUser(role === 'teacher' ? MOCK_TEACHER : MOCK_STUDENT);
    setPage(role === 'teacher' ? PAGES.teacherDashboard : PAGES.dashboard);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setPage(PAGES.landing);
  }, []);

  const switchRole = useCallback((newRole) => {
    setUserRole(newRole);
    setUser(newRole === 'teacher' ? MOCK_TEACHER : MOCK_STUDENT);
    setPage(newRole === 'teacher' ? PAGES.teacherDashboard : PAGES.dashboard);
  }, []);

  const toast = useCallback((msg, type = 'default') => {
    const id = ++toastId.current;
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2500);
  }, []);

  return (
    <AppContext.Provider value={{
      page,
      navigate,
      userRole,
      setUserRole,
      switchRole,
      user,
      login,
      logout,
      toast,
      toasts
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() { return useContext(AppContext); }
