import { useApp } from '../context/AppContext';

export default function RoleSelect() {
  const { pickRole } = useApp();
  return (
    <div className="role-page">
      <h1>Welcome to AVENQORI</h1>
      <p className="muted">Connecting students with the right teachers. Pick a role to start.</p>

      <div className="roles">
        <div className="card role" onClick={() => pickRole('student')}>
          <div className="em">🎓</div>
          <h2>Student</h2>
          <div className="muted">Find a teacher for your subject</div>
        </div>
        <div className="card role" onClick={() => pickRole('teacher')}>
          <div className="em">👩‍🏫</div>
          <h2>Teacher</h2>
          <div className="muted">Create a profile, teach and sell courses</div>
        </div>
      </div>

      <p className="muted tip-text">
        💡 Tip: Create a teacher profile first, then switch to Student, send a request, and switch back to see the notification.
      </p>
    </div>
  );
}
