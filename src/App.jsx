import { AppProvider, useApp, PAGES } from './context/AppContext';
import Toast from './components/ui/Toast';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Student Portal Pages
import DashboardPage from './pages/DashboardPage';
import MyCoursesPage from './pages/MyCoursesPage';
import FindTutorPage from './pages/FindTutorPage';
import LiveClassesPage from './pages/LiveClassesPage';
import AIStudyPlannerPage from './pages/AIStudyPlannerPage';
import BookingsPage from './pages/BookingsPage';
import CertificatesPage from './pages/CertificatesPage';
import ProgressPage from './pages/ProgressPage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';

// Teacher Portal Pages
import TeacherDashboardPage from './pages/teacher/TeacherDashboardPage';
import TeacherClassesPage from './pages/teacher/TeacherClassesPage';
import TeacherStudentsPage from './pages/teacher/TeacherStudentsPage';
import TeacherEarningsPage from './pages/teacher/TeacherEarningsPage';
import TeacherSchedulePage from './pages/teacher/TeacherSchedulePage';
import TeacherMessagesPage from './pages/teacher/TeacherMessagesPage';
import TeacherNotificationsPage from './pages/teacher/TeacherNotificationsPage';
import TeacherResourcesPage from './pages/teacher/TeacherResourcesPage';
import TeacherCertificatesPage from './pages/teacher/TeacherCertificatesPage';
import TeacherProfilePage from './pages/teacher/TeacherProfilePage';
import TeacherSettingsPage from './pages/teacher/TeacherSettingsPage';
import TeacherHelpPage from './pages/teacher/TeacherHelpPage';

const PUBLIC_PAGES = [PAGES.landing, PAGES.login, PAGES.signup];

function Router() {
  const { page } = useApp();

  if (PUBLIC_PAGES.includes(page)) {
    return (
      <>
        {page === PAGES.landing && <LandingPage />}
        {page === PAGES.login && <LoginPage />}
        {page === PAGES.signup && <SignupPage />}
      </>
    );
  }

  const pageMap = {
    // Student Portal
    [PAGES.dashboard]:     <DashboardPage />,
    [PAGES.myCourses]:     <MyCoursesPage />,
    [PAGES.findTutor]:     <FindTutorPage />,
    [PAGES.liveClasses]:   <LiveClassesPage />,
    [PAGES.aiPlanner]:     <AIStudyPlannerPage />,
    [PAGES.bookings]:      <BookingsPage />,
    [PAGES.certificates]:  <CertificatesPage />,
    [PAGES.progress]:      <ProgressPage />,
    [PAGES.messages]:      <MessagesPage />,
    [PAGES.notifications]: <NotificationsPage />,
    [PAGES.settings]:      <SettingsPage />,
    [PAGES.help]:          <HelpPage />,

    // Teacher Portal
    [PAGES.teacherDashboard]:     <TeacherDashboardPage />,
    [PAGES.teacherClasses]:       <TeacherClassesPage />,
    [PAGES.teacherStudents]:      <TeacherStudentsPage />,
    [PAGES.teacherEarnings]:      <TeacherEarningsPage />,
    [PAGES.teacherSchedule]:      <TeacherSchedulePage />,
    [PAGES.teacherMessages]:      <TeacherMessagesPage />,
    [PAGES.teacherNotifications]: <TeacherNotificationsPage />,
    [PAGES.teacherResources]:     <TeacherResourcesPage />,
    [PAGES.teacherCertificates]:  <TeacherCertificatesPage />,
    [PAGES.teacherProfile]:       <TeacherProfilePage />,
    [PAGES.teacherSettings]:      <TeacherSettingsPage />,
    [PAGES.teacherHelp]:          <TeacherHelpPage />,
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Topbar />
        <div className="page-content">
          {pageMap[page] || <DashboardPage />}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router />
      <Toast />
    </AppProvider>
  );
}
