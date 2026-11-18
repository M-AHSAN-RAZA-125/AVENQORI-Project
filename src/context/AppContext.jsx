import { createContext, useContext, useState, useCallback, useRef } from 'react';

const AppContext = createContext(null);

export const PAGES = {
  // Public
  landing: 'landing',
  login:   'login',
  signup:  'signup',
  // Student portal
  dashboard:   'dashboard',
  myCourses:   'myCourses',
  findTutor:   'findTutor',
  liveClasses: 'liveClasses',
  aiPlanner:   'aiPlanner',
  bookings:    'bookings',
  certificates:'certificates',
  progress:    'progress',
  messages:    'messages',
  notifications:'notifications',
  settings:    'settings',
  help:        'help',
};

const MOCK_USER = {
  name: 'Ahmed Raza',
  role: 'Student',
  email: 'ahmedraza@gmail.com',
  plan: 'Premium Plan',
  country: 'Pakistan',
  memberSince: 'Nov 14, 2025',
};

export function AppProvider({ children }) {
  const [page, setPage] = useState(PAGES.landing);
  const [user, setUser] = useState(null);
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  const navigate = useCallback((p) => { setPage(p); window.scrollTo(0, 0); }, []);

  const login = useCallback((role = 'student') => {
    setUser({ ...MOCK_USER, role });
    setPage(PAGES.dashboard);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setPage(PAGES.landing);
  }, []);

  const toast = useCallback((msg, type = 'default') => {
    const id = ++toastId.current;
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2500);
  }, []);

  return (
    <AppContext.Provider value={{ page, navigate, user, login, logout, toast, toasts }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() { return useContext(AppContext); }
