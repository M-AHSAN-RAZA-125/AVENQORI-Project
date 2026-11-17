import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SUBJECTS } from '../data/teachers';

export default function TeacherSetup() {
  const { me, saveTeacher, go } = useApp();

  const defaults = me || {
    name: 'Your Name', subject: 'Mathematics', rate: 14, exp: 5,
    mode: 'both', about: '', tags: [], courses: []
  };

  const [form, setForm] = useState({
    name: defaults.name,
    subject: defaults.subject,
    exp: defaults.exp,
    rate: defaults.rate,
    mode: defaults.mode,
    tags: defaults.tags.join(', '),
    about: defaults.about,
    courseTitle: defaults.courses[0]?.t || '',
    coursePrice: defaults.courses[0]?.p || 30,
  });

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    const courses = form.courseTitle.trim()
      ? [{ t: form.courseTitle.trim(), p: Number(form.coursePrice) || 0 }]
      : [];
    saveTeacher({
      name: form.name.trim() || 'Teacher',
      subject: form.subject,
      exp: Number(form.exp) || 0,
      rate: Number(form.rate) || 1,
      mode: form.mode,
      tags: form.tags.split(',').map(x => x.trim()).filter(Boolean),
      about: form.about.trim() || 'New teacher on AVENQORI.',
      courses,
    });
  };

  return (
    <div>
      <h1>Teacher Profile</h1>
      <p className="muted">Like a freelancing profile — students see this when they search.</p>

      <form className="card" onSubmit={handleSave}>
        <div className="two">
          <div>
            <label>Full Name</label>
            <input value={form.name} onChange={update('name')} placeholder="Your full name" />
          </div>
          <div>
            <label>Main Subject</label>
            <select value={form.subject} onChange={update('subject')}>
              {SUBJECTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="two">
          <div>
            <label>Experience (years)</label>
            <input type="number" min="0" value={form.exp} onChange={update('exp')} />
          </div>
          <div>
            <label>Rate (USD per hour)</label>
            <input type="number" min="1" value={form.rate} onChange={update('rate')} />
          </div>
        </div>

        <label>Teaching Mode</label>
        <select value={form.mode} onChange={update('mode')}>
          {['both', 'online', 'in-person'].map(x => <option key={x}>{x}</option>)}
        </select>

        <label>Expertise (comma separated)</label>
        <input value={form.tags} onChange={update('tags')} placeholder="Algebra, Calculus" />

        <label>About You</label>
        <textarea value={form.about} onChange={update('about')} placeholder="Tell students about your teaching style..." />

        <div className="section-title">📚 Course (optional)</div>
        <div className="two">
          <div>
            <label>Course Title</label>
            <input value={form.courseTitle} onChange={update('courseTitle')} placeholder="e.g. A-Level Crash Course" />
          </div>
          <div>
            <label>Course Price (USD)</label>
            <input type="number" min="0" value={form.coursePrice} onChange={update('coursePrice')} />
          </div>
        </div>

        <p className="muted small-note">📹 Video upload and certificates would go here in the full app.</p>

        <div className="form-actions">
          {me && <button type="button" onClick={() => go('tDash')}>Cancel</button>}
          <button type="submit" className="p">Save Profile</button>
        </div>
      </form>
    </div>
  );
}
