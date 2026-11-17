import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUBJECTS } from '../data/teachers';

export default function StudentForm() {
  const { query, setQuery, go } = useApp();

  const defaults = query || { name: 'Hamza', subject: 'Mathematics', level: 'O/A-Level', budget: 20, mode: 'any' };
  const [form, setForm] = useState({ ...defaults });

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleFind = (e) => {
    e.preventDefault();
    setQuery({
      name: form.name.trim() || 'Student',
      subject: form.subject,
      level: form.level,
      budget: Number(form.budget) || 1,
      mode: form.mode,
    });
    go('sRes');
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-icon">🔍</div>
        <div>
          <h1>What do you want to learn?</h1>
          <p className="muted">Answer a few questions and we'll match you with the best teachers.</p>
        </div>
      </div>

      <form className="card" onSubmit={handleFind}>
        <label>Your Name</label>
        <input value={form.name} onChange={update('name')} placeholder="Enter your name" />

        <label>Subject</label>
        <div className="subject-grid">
          {SUBJECTS.map(s => (
            <button
              key={s}
              type="button"
              className={`subject-pill ${form.subject === s ? 'active' : ''}`}
              onClick={() => setForm(f => ({ ...f, subject: s }))}
            >
              {subjectIcon(s)} {s}
            </button>
          ))}
        </div>

        <div className="two">
          <div>
            <label>Level</label>
            <select value={form.level} onChange={update('level')}>
              {['School', 'O/A-Level', 'University', 'Professional'].map(x => <option key={x}>{x}</option>)}
            </select>
          </div>
          <div>
            <label>Max Budget (USD/hr)</label>
            <input type="number" min="1" value={form.budget} onChange={update('budget')} />
          </div>
        </div>

        <label>Preferred Mode</label>
        <div className="mode-group">
          {['any', 'online', 'in-person'].map(m => (
            <button
              key={m}
              type="button"
              className={`mode-btn ${form.mode === m ? 'active' : ''}`}
              onClick={() => setForm(f => ({ ...f, mode: m }))}
            >
              {modeIcon(m)} {m === 'any' ? 'Any Mode' : m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        <div className="form-actions" style={{ marginTop: '20px' }}>
          <button type="submit" className="p find-btn">Find Teachers →</button>
        </div>
      </form>
    </div>
  );
}

function subjectIcon(s) {
  const map = { Mathematics: '➗', Physics: '⚛️', Chemistry: '🧪', English: '📝', Programming: '💻', Biology: '🧬' };
  return map[s] || '📚';
}

function modeIcon(m) {
  const map = { any: '🌐', online: '💻', 'in-person': '🏫' };
  return map[m] || '';
}
