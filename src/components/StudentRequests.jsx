import { useApp } from '../context/AppContext';
import { getInitials } from '../data/teachers';

export default function StudentRequests() {
  const { requests, teachers } = useApp();

  if (requests.length === 0) {
    return (
      <div>
        <h1>My Requests</h1>
        <div className="card muted center-text">
          You haven't sent any requests yet. Find a teacher first!
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>My Requests</h1>
      <p className="muted">{requests.length} request{requests.length !== 1 ? 's' : ''} sent</p>

      {requests.map(r => {
        const t = teachers.find(x => x.id === r.tid);
        if (!t) return null;
        return (
          <div key={r.id} className="card request-card">
            <div className="row">
              <div className="av">{getInitials(t.name)}</div>
              <div>
                <strong>{t.name}</strong>
                <div className="muted small">{r.subject} · {r.level}</div>
              </div>
              <span className={`st ${r.status} sp`}>{r.status}</span>
            </div>

            {r.status === 'accepted' && (
              <p className="muted accepted-note">
                🎉 Accepted! In the full app, a chat session would open here.
              </p>
            )}
            {r.status === 'declined' && (
              <p className="muted accepted-note">
                Unfortunately this teacher is unavailable. Try another one!
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
