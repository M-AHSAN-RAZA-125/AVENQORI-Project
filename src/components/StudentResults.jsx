import { useApp } from '../context/AppContext';
import { getInitials, scoreTeacher } from '../data/teachers';

function Stars({ rating }) {
  return <span className="star">★ {rating.toFixed(1)}</span>;
}

export default function StudentResults() {
  const { query, teachers, requests, sendRequest, go, setModalTeacher } = useApp();

  const list = teachers
    .filter(t => t.subject === query.subject)
    .map(t => ({ t, s: scoreTeacher(t, query) }))
    .sort((a, b) => b.s - a.s);

  return (
    <div>
      <div className="results-header">
        <button className="back-btn" onClick={() => go('sForm')}>← Change answers</button>
        <div>
          <h1>{list.length} Teacher{list.length !== 1 ? 's' : ''} for {query.subject}</h1>
          <p className="muted">Ranked by rating, budget, level and mode fit.</p>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="card muted center-text">
          No teachers yet for this subject. Try another one.
        </div>
      ) : (
        list.map(({ t, s }) => {
          const sent = requests.find(r => r.tid === t.id);
          const pct = Math.min(99, Math.round(s / 17 * 100));

          return (
            <div key={t.id} className="card teacher-card">
              <div className="row">
                <div className="av">{getInitials(t.name)}</div>
                <div className="teacher-info">
                  <div className="teacher-name">
                    <strong>{t.name}</strong> <Stars rating={t.rating} />
                  </div>
                  <div className="muted small">{t.exp} yrs experience · ${t.rate}/hr · {t.mode}</div>
                </div>
                <span className="match-tag sp">{pct}% match</span>
              </div>

              <p className="teacher-about">{t.about}</p>

              <div className="tags-row">
                {t.tags.map(x => <span key={x} className="tag">{x}</span>)}
              </div>

              {t.courses.length > 0 && (
                <div className="muted small course-list">
                  📖 Courses: {t.courses.map(c => c.t).join(', ')}
                </div>
              )}

              <div className="row card-actions">
                <button onClick={() => setModalTeacher(t)}>See Details</button>
                <button
                  className={sent ? '' : 'p'}
                  disabled={!!sent}
                  onClick={() => sendRequest(t.id)}
                >
                  {sent ? '✓ Request Sent' : 'Send Request'}
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
