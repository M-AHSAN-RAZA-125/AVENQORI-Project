import { useState } from 'react';
import { useApp } from '../context/AppContext';

const INITIAL_PLAN = [
  { day: 'Mon • Nov 17', topic: 'Algebra Basics – Practice Problems & Quadratic Equations', duration: '1h 00m', status: 'Completed' },
  { day: 'Tue • Nov 18', topic: 'Python Variables, Loops & Data Types Deep Dive', duration: '1h 30m', status: 'Pending' },
  { day: 'Wed • Nov 19', topic: 'Math Formulas Revision & Trigonometry Past Papers', duration: '1h 00m', status: 'Pending' },
  { day: 'Thu • Nov 20', topic: 'Web Development – HTML5, CSS Grid & Flexbox Practice', duration: '1h 30m', status: 'Pending' },
  { day: 'Fri • Nov 21', topic: 'Physics – Motion, Forces & Dynamics Numericals', duration: '1h 00m', status: 'Pending' }
];

export default function AIStudyPlannerPage() {
  const { toast } = useApp();
  const [subjects, setSubjects] = useState({
    Mathematics: true,
    Programming: true,
    Science: false,
    English: false
  });
  const [goal, setGoal] = useState('Complete Syllabus');
  const [hours, setHours] = useState(2);
  const [studyPlan, setStudyPlan] = useState(INITIAL_PLAN);
  const [isGenerating, setIsGenerating] = useState(false);

  // AI Chat state
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hello Ahmed! I am your AVENQORI AI Tutor. Ask me any question, ask for concept explanations, or let me quiz you on your subjects!' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const toggleSubject = (s) => setSubjects(prev => ({ ...prev, [s]: !prev[s] }));

  const generatePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast('Custom AI study roadmap updated for this week!', 'success');
    }, 800);
  };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const userMsg = { sender: 'user', text };
    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');

    setTimeout(() => {
      let reply = "That's a great question! Let's break it down step-by-step: first, identify the core principle, then apply the formula or code logic.";
      if (text.toLowerCase().includes('react') || text.toLowerCase().includes('hook')) {
        reply = "React Hooks (like useState & useEffect) let you use state and lifecycle features in functional components without writing classes! For example, useState stores dynamic values that trigger a re-render when updated.";
      } else if (text.toLowerCase().includes('plan')) {
        reply = `Here is your customized learning strategy for ${goal}: Dedicate 45 mins in the morning to theory, 45 mins in the afternoon to hands-on practice, and 30 mins before sleep to flashcard revision!`;
      } else if (text.toLowerCase().includes('math') || text.toLowerCase().includes('homework')) {
        reply = "For math problems, always write down your knowns, state the formula, substitute carefully, and double check units. Let me know the specific question you're working on!";
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  const toggleDayStatus = (index) => {
    setStudyPlan(prev => prev.map((item, i) => {
      if (i === index) {
        const nextStatus = item.status === 'Completed' ? 'Pending' : 'Completed';
        toast(`Task marked as ${nextStatus}!`, 'info');
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  return (
    <div className="ai-planner-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">🤖</div>
        <div className="banner-text">
          <span className="badge badge-purple mb-8" style={{ display: 'inline-block' }}>✨ POWERED BY AI</span>
          <h1>AI Study Planner & Learning Assistant</h1>
          <p>Your 24/7 personal study assistant. Generate adaptive study plans, get instant concept clarifications, and stay on track!</p>
          <div className="flex gap-12 mt-16">
            <span className="badge badge-purple" style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.2)', color: '#fff' }}>✨ Smart Study Plans</span>
            <span className="badge badge-blue" style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.2)', color: '#fff' }}>⚡ Instant Answers</span>
            <span className="badge badge-green" style={{ padding: '6px 14px', background: 'rgba(255,255,255,0.2)', color: '#fff' }}>🎯 Adaptive Tracking</span>
          </div>
        </div>
        <div className="banner-art">🧠</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Left Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Plan Generator Form */}
          <div className="card p">
            <h3 className="mb-16">📅 Create Your Study Plan</h3>
            <p className="text-sm text-muted mb-16">Tell us what you want to study and let AI tailor the optimal study schedule for you.</p>

            <div className="grid-3" style={{ gap: '16px' }}>
              {/* Subjects */}
              <div>
                <label className="form-label">Select Subjects</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {Object.keys(subjects).map(s => (
                    <label key={s} className="flex-c gap-8 text-sm" style={{ cursor: 'pointer' }}>
                      <input type="checkbox" checked={subjects[s]} onChange={() => toggleSubject(s)} />
                      <span>{s === 'Mathematics' ? '📐 Mathematics' : s === 'Programming' ? '</> Programming' : s === 'Science' ? '🧪 Science' : '📖 English'}</span>
                    </label>
                  ))}
                  <span className="text-xs text-purple font-bold mt-4" style={{ cursor: 'pointer' }} onClick={() => toast('All academic catalog subjects included!', 'info')}>
                    + Add More Subjects
                  </span>
                </div>
              </div>

              {/* Goal */}
              <div>
                <label className="form-label">Set Your Goal</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {['Complete Syllabus', 'Improve Skills', 'Prepare for Exam', 'Learn New Topic'].map(g => (
                    <label
                      key={g}
                      className="flex-c gap-8 text-sm"
                      style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        background: goal === g ? 'var(--bg2)' : 'transparent',
                        border: goal === g ? '1px solid var(--purple)' : '1px solid transparent',
                        cursor: 'pointer'
                      }}
                    >
                      <input type="radio" name="goal" checked={goal === g} onChange={() => setGoal(g)} />
                      <span className={goal === g ? 'text-purple font-bold' : ''}>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Study Hours */}
              <div>
                <label className="form-label">Study Hours Per Day</label>
                <div className="flex-c gap-8 mt-8">
                  <button className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '18px' }} onClick={() => setHours(Math.max(1, hours - 1))}>–</button>
                  <strong style={{ fontSize: '20px', minWidth: '80px', textAlign: 'center', color: 'var(--purple)' }}>{hours} Hours</strong>
                  <button className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '18px' }} onClick={() => setHours(hours + 1)}>+</button>
                </div>
                <small className="text-muted mt-8" style={{ display: 'block' }}>Recommended for your exam deadline</small>
              </div>
            </div>

            <button className="btn btn-primary btn-full mt-20" onClick={generatePlan} disabled={isGenerating}>
              {isGenerating ? '✦ Generating AI Schedule...' : '✦ Generate My Plan →'}
            </button>
          </div>

          {/* Generated Plan Table */}
          <div className="card p">
            <div className="flex-b mb-16">
              <h3>⭐ Your Personalized Study Plan</h3>
              <span className="text-sm text-purple font-bold" style={{ cursor: 'pointer' }} onClick={() => toast('Weekly plan exported to PDF', 'success')}>
                View Full Plan →
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {studyPlan.map((item, index) => (
                <div
                  key={index}
                  className="flex-b p-16"
                  style={{
                    background: 'var(--bg)',
                    borderRadius: '10px',
                    border: '1px solid var(--line)',
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleDayStatus(index)}
                >
                  <div className="flex-c gap-16">
                    <strong style={{ fontSize: '13px', minWidth: '95px', color: 'var(--purple)' }}>{item.day}</strong>
                    <span style={{ fontSize: '14px', textDecoration: item.status === 'Completed' ? 'line-through' : 'none', color: item.status === 'Completed' ? 'var(--muted)' : 'var(--text)' }}>
                      {item.topic}
                    </span>
                  </div>

                  <div className="flex-c gap-16">
                    <span className="badge badge-gray">{item.duration}</span>
                    <span className={`badge ${item.status === 'Completed' ? 'badge-green' : 'badge-yellow'}`}>
                      {item.status === 'Completed' ? '✓ Completed' : '○ Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive AI Chat */}
          <div className="card p" style={{ background: 'linear-gradient(135deg, #1e1052 0%, #2d1b6e 100%)', color: '#fff' }}>
            <div className="flex-b mb-16">
              <div className="flex-c gap-10">
                <span style={{ fontSize: '28px' }}>🤖</span>
                <div>
                  <h4 style={{ color: '#fff', margin: 0 }}>Ask AI Anything</h4>
                  <p style={{ color: '#c4b5fd', fontSize: '12px', margin: 0 }}>Instant homework help, concept summaries & quizzes</p>
                </div>
              </div>
              <span className="badge badge-green">● Online</span>
            </div>

            {/* Quick Chips */}
            <div className="flex gap-8 mb-12" style={{ flexWrap: 'wrap' }}>
              <button className="badge badge-purple" style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none' }} onClick={() => handleSendMessage('Explain React hooks in simple words')}>
                💡 Explain React hooks
              </button>
              <button className="badge badge-purple" style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none' }} onClick={() => handleSendMessage('Give me practice questions on algebra')}>
                📝 Practice algebra questions
              </button>
              <button className="badge badge-purple" style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none' }} onClick={() => handleSendMessage('Create a 7-day study plan for exams')}>
                📅 Create 7-day exam plan
              </button>
            </div>

            {/* Chat Output area */}
            <div style={{ maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px', paddingRight: '4px' }}>
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    background: msg.sender === 'user' ? 'var(--purple)' : 'rgba(255,255,255,0.12)',
                    color: '#fff',
                    padding: '8px 14px',
                    borderRadius: '12px',
                    maxWidth: '85%',
                    fontSize: '13px',
                    lineHeight: '1.5'
                  }}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input bar */}
            <div className="flex gap-8">
              <input
                type="text"
                className="form-input"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                placeholder="Ask your question here..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="btn btn-primary" onClick={() => handleSendMessage()}>
                Send →
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Study Streak */}
          <div className="card p" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '4px' }}>🔥</div>
            <h3>Your Study Streak</h3>
            <div style={{ fontSize: '38px', fontWeight: 900, color: 'var(--warn)', margin: '8px 0' }}>12 Days</div>
            <p className="text-sm text-muted">Keep going! You're on fire!</p>
            <div className="progress-bar mt-12">
              <div className="progress-fill yellow" style={{ width: '80%' }}></div>
            </div>
          </div>

          {/* Overall Progress Donut */}
          <div className="card p">
            <h4 className="mb-16">Overall Progress</h4>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '14px 0' }}>
              <div className="circle-progress">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg2)" strokeWidth="12" />
                  <circle
                    cx="60" cy="60" r="50" fill="none" stroke="var(--purple)" strokeWidth="12"
                    strokeDasharray="314.15" strokeDashoffset="100.5" strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="circle-label">68%</div>
              </div>
            </div>
            <div className="flex-b text-sm mt-8">
              <span className="flex-c gap-8"><span style={{ width: '10px', height: '10px', background: 'var(--purple)', borderRadius: '50%' }}></span> Completed</span>
              <strong>68%</strong>
            </div>
            <div className="flex-b text-sm mt-4">
              <span className="flex-c gap-8"><span style={{ width: '10px', height: '10px', background: 'var(--bg2)', borderRadius: '50%' }}></span> Remaining</span>
              <span className="text-muted">32%</span>
            </div>
          </div>

          {/* Upgrade Card */}
          <div className="upgrade-card">
            <div className="crown">👑</div>
            <h3>Upgrade to Premium</h3>
            <p>Unlimited AI study plans, 24/7 priority bot assistance, and personalized weak-area analytics.</p>
            <button className="upgrade-btn" onClick={() => toast('Redirecting to Premium Plan checkout...', 'info')}>
              Go Premium →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
