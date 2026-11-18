import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function TeacherMessagesPage() {
  const { toast } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  const [activeChatId, setActiveChatId] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'student', text: 'Sir, can you share the notes?', time: '10:24 AM' },
    { id: 2, sender: 'teacher', text: 'Sure! Here are the notes for loops and arrays:', file: 'Python_Notes.pdf', fileSize: '2.5 MB', time: '10:26 AM' },
    { id: 3, sender: 'student', text: 'Thank you so much sir! ❤️', time: '10:27 AM' },
    { id: 4, sender: 'teacher', text: "You're welcome! Keep practicing and let me know if you need any help. 😊", time: '10:28 AM' }
  ]);

  const chatsList = [
    { id: 1, name: 'Ahmad Raza', role: 'Student • Online', avatar: '👨‍🎓', lastMsg: 'Sir, can you share the notes?', time: '2m ago', unread: 2, online: true, type: 'student' },
    { id: 2, name: 'Ayesha Khan', role: 'Student', avatar: '👩‍🎓', lastMsg: 'Thank you so much! 😊', time: '8m ago', unread: 0, online: true, type: 'student' },
    { id: 3, name: 'Muhammad Ali', role: 'Student', avatar: '👨‍💼', lastMsg: 'When will the next class be?', time: '15m ago', unread: 1, online: false, type: 'student' },
    { id: 4, name: 'Fatima Noor', role: 'Student', avatar: '👩‍💼', lastMsg: 'I have a problem with login...', time: '1h ago', unread: 0, online: false, type: 'student' },
    { id: 5, name: 'Sami Ullah', role: 'Student', avatar: '👨‍💻', lastMsg: 'Okay sir, thanks!', time: '2h ago', unread: 0, online: false, type: 'student' },
    { id: 6, name: 'Daniyal Khan', role: 'Student', avatar: '👨‍🎓', lastMsg: 'Can you explain this topic?', time: '3h ago', unread: 0, online: false, type: 'student' },
    { id: 7, name: 'AVENQORI Support', role: 'Platform Support', avatar: '🎧', lastMsg: 'Your ticket #SUP-2025 has been resolved.', time: '5h ago', unread: 1, online: true, type: 'support' }
  ];

  const activeChat = chatsList.find(c => c.id === activeChatId) || chatsList[0];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'teacher',
      text: messageText,
      time: 'Just now'
    };
    setMessages(prev => [...prev, newMsg]);
    setMessageText('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'student',
          text: 'Understood sir, thanks for guiding me!',
          time: 'Just now'
        }
      ]);
    }, 1000);
  };

  const filteredChats = chatsList.filter(c => {
    if (activeTab === 'student') return c.type === 'student';
    if (activeTab === 'support') return c.type === 'support';
    return true;
  });

  return (
    <div className="teacher-messages-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">💬</div>
        <div className="banner-text">
          <h1>Student Communication & In-App Chat</h1>
          <p>Better Communication, Better Learning! Clarify questions, send course materials, and mentor your students.</p>
        </div>
        <div className="banner-art">✉️</div>
      </div>

      {/* 3-Column Chat Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 280px', gap: '16px', height: '640px' }}>
        {/* Left: Chats List */}
        <div className="card p" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '14px' }}>
          {/* Tabs */}
          <div className="flex gap-4 mb-10" style={{ flexWrap: 'wrap' }}>
            <button className={`tab-btn btn-sm ${activeTab === 'all' ? 'active' : ''}`} style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => setActiveTab('all')}>All (24)</button>
            <button className={`tab-btn btn-sm ${activeTab === 'student' ? 'active' : ''}`} style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => setActiveTab('student')}>Students (18)</button>
            <button className={`tab-btn btn-sm ${activeTab === 'support' ? 'active' : ''}`} style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => setActiveTab('support')}>Support (4)</button>
          </div>

          <div className="search-bar mb-10" style={{ padding: '6px 10px', fontSize: '12px' }}>
            <span>🔍</span>
            <input placeholder="Search conversations..." />
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {filteredChats.map(c => (
              <div
                key={c.id}
                onClick={() => setActiveChatId(c.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  background: activeChatId === c.id ? 'var(--bg2)' : 'transparent',
                  border: activeChatId === c.id ? '1px solid #c4b5fd' : '1px solid transparent'
                }}
              >
                <div style={{ position: 'relative', fontSize: '24px' }}>
                  {c.avatar}
                  {c.online && <span className="online-dot" style={{ position: 'absolute', bottom: '0', right: '0' }}></span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex-b">
                    <strong style={{ fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</strong>
                    <span className="text-xs text-muted">{c.time}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {c.lastMsg}
                  </p>
                </div>
                {c.unread > 0 && <span className="badge badge-purple">{c.unread}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Center: Active Conversation */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          {/* Header */}
          <div className="flex-b p-16" style={{ borderBottom: '1px solid var(--line)', background: '#fff' }}>
            <div className="flex-c gap-12">
              <div style={{ fontSize: '32px' }}>{activeChat.avatar}</div>
              <div>
                <h4 style={{ margin: 0 }}>{activeChat.name} <span className="text-ok">✓</span></h4>
                <div className="text-xs text-muted">{activeChat.role}</div>
              </div>
            </div>

            <div className="flex-c gap-8">
              <button className="icon-btn" title="Video Call" onClick={() => toast(`Starting 1-on-1 video call with ${activeChat.name}...`, 'info')}>📹</button>
              <button className="icon-btn" title="Audio Call" onClick={() => toast(`Calling ${activeChat.name}...`, 'info')}>📞</button>
              <button className="icon-btn" title="Options">⋮</button>
            </div>
          </div>

          {/* Messages stream */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg)' }}>
            <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--muted)', margin: '4px 0' }}>Today, Nov 16, 2025</div>
            {messages.map(m => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.sender === 'teacher' ? 'flex-end' : 'flex-start',
                  maxWidth: '70%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.sender === 'teacher' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    background: m.sender === 'teacher' ? 'var(--purple)' : '#fff',
                    color: m.sender === 'teacher' ? '#fff' : 'var(--text)',
                    padding: '10px 16px',
                    borderRadius: '14px',
                    borderBottomRightRadius: m.sender === 'teacher' ? '2px' : '14px',
                    borderBottomLeftRadius: m.sender === 'student' ? '2px' : '14px',
                    boxShadow: 'var(--shadow-sm)',
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}
                >
                  {m.text}

                  {m.file && (
                    <div
                      style={{
                        marginTop: '8px',
                        background: 'rgba(255,255,255,0.2)',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer'
                      }}
                      onClick={() => toast(`Opening file: ${m.file}`, 'info')}
                    >
                      <span style={{ fontSize: '20px' }}>📄</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '12px' }}>{m.file}</div>
                        <div style={{ fontSize: '10px', opacity: 0.85 }}>{m.fileSize} • Click to Download</div>
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-xs text-muted mt-4" style={{ fontSize: '10px' }}>{m.time}</span>
              </div>
            ))}
          </div>

          {/* Input bar */}
          <div className="p-16" style={{ borderTop: '1px solid var(--line)', background: '#fff' }}>
            <div className="flex gap-8">
              <button className="icon-btn" style={{ width: '36px', height: '36px' }} onClick={() => toast('Attach file or document', 'info')}>📎</button>
              <button className="icon-btn" style={{ width: '36px', height: '36px' }}>😊</button>
              <button className="icon-btn" style={{ width: '36px', height: '36px' }} onClick={() => toast('Voice recording...', 'info')}>🎙️</button>
              <input
                type="text"
                className="form-input flex-1"
                placeholder="Type your message..."
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="btn btn-primary" onClick={handleSendMessage}>
                Send ✈️
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Quick Actions & Chat Tips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="card p">
            <h4 className="mb-12">⚡ Quick Actions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={() => toast('New conversation composer', 'info')}>
                ✉️ New Message
              </button>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={() => toast('Tutor support helpline', 'info')}>
                🎧 Contact Support
              </button>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={() => toast('Viewing unread activity', 'info')}>
                🔔 View Notifications
              </button>
            </div>
          </div>

          <div className="card p" style={{ background: 'linear-gradient(135deg, #2d1b6e, #1e1052)', color: '#fff' }}>
            <h4 style={{ color: '#fff', marginBottom: '4px' }}>Need help?</h4>
            <p style={{ color: '#c4b5fd', fontSize: '12px', marginBottom: '12px' }}>
              Ask our AI Teaching Assistant for lesson prep ideas or quiz drafts.
            </p>
            <button className="btn btn-sm btn-full" style={{ background: 'var(--purple)', color: '#fff', border: 'none' }} onClick={() => toast('AI Tutor Co-Pilot enabled', 'success')}>
              Chat with AI →
            </button>
          </div>

          <div className="card p">
            <h4 className="mb-8">💡 Chat Tips</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--text2)' }}>
              <div>✅ Be respectful and professional</div>
              <div>✅ Share relevant lesson materials</div>
              <div>✅ Use file attachments for homework</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
