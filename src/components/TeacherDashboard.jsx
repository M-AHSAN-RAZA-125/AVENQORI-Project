import { useApp } from '../context/AppContext';
import { getInitials } from '../data/teachers';

function StatusBadge({ status }) {
  return <span className={`st ${status}`}>{status}</span>;
}

export default function TeacherDashboard() {
  const { me, requests, respondRequest, go } = useApp();
  const myRequests = requests.filter(r => r.tid === me.id);
  const pending = myRequests.filter(r => r.status === 'pending').length;

  return (
    <div>
      <h1>Hi, {me.name} 👋</h1>
      <p className="muted">Your teacher dashboard</p>

      {/* Profile card */}
      <div className="card profile-card">
        <div className="row">
          <div className="av">{getInitials(me.name)}</div>
          <div className="profile-info">
            <strong>{me.subject}</strong> · {me.exp} yrs · <strong>${me.rate}/hr</strong>
            <div className="tags-row">
              {me.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
          <button className="sp" onClick={() => go('tSetup')}>Edit Profile</button>
        </div>

        {me.courses.length > 0 && (
          <div className="courses-section">
            <div className="muted small-label">Courses</div>
            {me.courses.map((c, i) => (
              <div key={i} className="row course-row">
                <span>📖 {c.t}</span>
                <strong className="sp">${c.p}</strong>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Requests */}
      <div className="section-header">
        <h2>Student Requests</h2>
        {pending > 0 && <span className="badge">{pending} new</span>}
      </div>

      {myRequests.length === 0 ? (
        <div className="card muted center-text">
          No requests yet. Switch to Student role and send one to see it here.
        </div>
      ) : (
        myRequests.map(r => (
          <div key={r.id} className="card request-card">
            <div className="row">
              <div className="av">{getInitials(r.sname)}</div>
              <div>
                <strong>{r.sname}</strong> wants to learn <strong>{r.subject}</strong>
                <div className="muted small">{r.level} · {r.mode} · budget ${r.budget}/hr</div>
              </div>
              <StatusBadge status={r.status} />
            </div>

            {r.status === 'pending' && (
              <div className="row action-row">
                <button className="ok" onClick={() => respondRequest(r.id, 'accepted')}>✓ Accept</button>
                <button className="no" onClick={() => respondRequest(r.id, 'declined')}>✕ Decline</button>
              </div>
            )}

            {r.status === 'accepted' && (
              <p className="muted accepted-note">🎉 Accepted! In the full app, a chat session would open here.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
