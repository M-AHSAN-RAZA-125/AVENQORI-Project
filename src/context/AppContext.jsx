import { createContext, useContext, useState, useCallback } from 'react';
import { INITIAL_TEACHERS } from '../data/teachers';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [view, setView] = useState('role');
  const [role, setRole] = useState(null);
  const [me, setMe] = useState(null);         // logged-in teacher profile
  const [query, setQuery] = useState(null);    // student search query
  const [requests, setRequests] = useState([]); // all tutor requests
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [toast, setToast] = useState({ msg: '', visible: false });
  const [modalTeacher, setModalTeacher] = useState(null);
  const [theme, setTheme] = useState('system'); // 'light' | 'dark' | 'system'

  const showToast = useCallback((msg) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 2200);
  }, []);

  const go = useCallback((v) => setView(v), []);

  const pickRole = useCallback((r) => {
    setRole(r);
    if (r === 'teacher') {
      setView(me ? 'tDash' : 'tSetup');
    } else {
      setView('sForm');
    }
  }, [me]);

  const saveTeacher = useCallback((profile) => {
    const updated = { ...profile, id: 99, rating: 5.0, levels: ['School', 'O/A-Level', 'University'] };
    setMe(updated);
    setTeachers(prev => [...prev.filter(t => t.id !== 99), updated]);
    showToast('Profile saved. Students can now find you.');
    setView('tDash');
  }, [showToast]);

  const sendRequest = useCallback((teacherId) => {
    if (!query) return;
    if (requests.find(r => r.tid === teacherId)) return;
    setRequests(prev => [...prev, {
      id: Date.now(),
      tid: teacherId,
      sname: query.name,
      subject: query.subject,
      level: query.level,
      mode: query.mode,
      budget: query.budget,
      status: 'pending'
    }]);
    setModalTeacher(null);
    showToast('Request sent! The teacher has been notified.');
  }, [query, requests, showToast]);

  const respondRequest = useCallback((reqId, status) => {
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status } : r));
    showToast('Student notified: ' + status);
  }, [showToast]);

  const pendingCount = me ? requests.filter(r => r.tid === me.id && r.status === 'pending').length : 0;

  return (
    <AppContext.Provider value={{
      view, go, role, pickRole,
      me, saveTeacher,
      query, setQuery,
      requests, sendRequest, respondRequest,
      teachers,
      toast, showToast,
      modalTeacher, setModalTeacher,
      pendingCount,
      theme, setTheme,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
