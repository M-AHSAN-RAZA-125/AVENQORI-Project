import { useApp } from '../context/AppContext';
import { getInitials } from '../data/teachers';

function Stars({ rating }) {
  return <span className="star">★ {rating.toFixed(1)}</span>;
}

export default function TeacherModal() {
  const { modalTeacher, setModalTeacher, requests, sendRequest } = useApp();

  if (!modalTeacher) return null;
  const t = modalTeacher;
  const sent = requests.find(r => r.tid === t.id);

  return (
    <div id="modal" className="on" onClick={(e) => { if (e.target.id === 'modal') setModalTeacher(null); }}>
      <div className="sheet">
        <div className="row modal-header">
          <div className="av av-lg">{getInitials(t.name)}</div>
          <div>
            <h2 style={{ margin: 0 }}>{t.name}</h2>
            <div><Stars rating={t.rating} /> · {t.exp} yrs · ${t.rate}/hr</div>
          </div>
          <button className="close-btn sp" onClick={() => setModalTeacher(null)}>✕</button>
        </div>

        <h3>About</h3>
        <p>{t.about}</p>

        <h3>Expertise</h3>
        <div className="tags-row">
          {t.tags.map(x => <span key={x} className="tag">{x}</span>)}
        </div>

        <h3>Levels Taught</h3>
        <div className="tags-row">
          {t.levels.map(x => <span key={x} className="tag tag-green">{x}</span>)}
        </div>

        <h3>Courses</h3>
        {t.courses.length > 0 ? (
          t.courses.map((c, i) => (
            <div key={i} className="row course-row">
              <span>📖 {c.t}</span>
              <strong className="sp">${c.p}</strong>
            </div>
          ))
        ) : (
          <p className="muted">No courses yet.</p>
        )}

        <div className="row modal-actions">
          <button onClick={() => setModalTeacher(null)}>Close</button>
          <button
            className={sent ? '' : 'p sp'}
            disabled={!!sent}
            onClick={() => { sendRequest(t.id); setModalTeacher(null); }}
          >
            {sent ? '✓ Request Sent' : 'Send Request'}
          </button>
        </div>
      </div>
    </div>
  );
}
