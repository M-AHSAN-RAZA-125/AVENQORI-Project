import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import TeacherModal from './components/TeacherModal';
import RoleSelect from './components/RoleSelect';
import TeacherSetup from './components/TeacherSetup';
import TeacherDashboard from './components/TeacherDashboard';
import StudentForm from './components/StudentForm';
import StudentResults from './components/StudentResults';
import StudentRequests from './components/StudentRequests';

function Main() {
  const { view } = useApp();

  const views = {
    role: <RoleSelect />,
    tSetup: <TeacherSetup />,
    tDash: <TeacherDashboard />,
    sForm: <StudentForm />,
    sRes: <StudentResults />,
    sReqs: <StudentRequests />,
  };

  return (
    <>
      <Navbar />
      <main id="app">
        {views[view] || <RoleSelect />}
      </main>
      <TeacherModal />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}
