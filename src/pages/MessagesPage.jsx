import { useState } from 'react';
import { useApp, PAGES } from '../context/AppContext';

const CHATS_LIST = [
  {
    id: 1,
    name: 'Sara Khan',
    role: 'Professional Tutor • Online',
    avatar: '👩‍🏫',
    lastMsg: "Sure! I'll share the notes and video...",
    time: '10:24 AM',
    unread: 2,
    online: true,
    type: 'tutor'
  },
  {
    id: 2,
    name: 'Usman Ahmed',
    role: 'Programming Tutor',
    avatar: '👨‍💻',
    lastMsg: 'Your class is confirmed for Sunday.',
    time: 'Yesterday',
    unread: 1,
    online: false,
    type: 'tutor'
  },
  {
    id: 3,
    name: 'AVENQORI Support',
    role: 'Help Desk 24/7',
    avatar: '🎧',
    lastMsg: 'How can we help you today, Ahmed?',
    time: 'Yesterday',
    unread: 0,
    online: true,
    type: 'support'
  },
  {
    id: 4,
    name: 'Fatima Noor',
    role: 'English Specialist',
    avatar: '👩‍💼',
    lastMsg: 'Thank you! Great speaking practice.',
    time: 'Nov 14',
    unread: 0,
    online: false,
    type: 'tutor'
  },
  {
    id: 5,
    name: 'Muhammad Ali',
    role: 'Classmate',
    avatar: '👨‍🎓',
    lastMsg: 'Can you explain this homework question?',
    time: 'Nov 13',
    unread: 0,
    online: false,
    type: 'other'
  }
];

export default function MessagesPage() {
  const { navigate, toast } = useApp();
  const [activeTab, setActiveTab] = useState('all');
  const [activeChatId, setActiveChatId] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'them', text: 'Hello Ahmed! 👋 How are you doing with the Python course?', time: '10:12 AM' },
    { id: 2, sender: 'me', text: "Hi Sara! I'm good, but I have some doubts in loops and recursion functions.", time: '10:15 AM' },
    { id: 3, sender: 'them', text: "Sure! I'll share the comprehensive notes and a short code breakdown on that topic. Let me know if you need any clarification.", time: '10:18 AM' },
    { id: 4, sender: 'me', text: 'Thank you so much! 🙏', time: '10:20 AM' },
    { id: 5, sender: 'them', text: 'Here are the lecture slides and practice problems:', file: 'Python_Loops_Notes.pdf', fileSize: '2.4 MB', time: '10:22 AM' }
  ]);

  const activeChat = CHATS_LIST.find(c => c.id === activeChatId) || CHATS_LIST[0];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'me',
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
          sender: 'them',
          text: `Thanks for your message, Ahmed! I have reviewed it and will explain it in detail during our next session.`,
          time: 'Just now'
        }
      ]);
    }, 900);
  };

  const filteredChats = CHATS_LIST.filter(c => {
    if (activeTab === 'tutor') return c.type === 'tutor';
    if (activeTab === 'support') return c.type === 'support';
    if (activeTab === 'other') return c.type === 'other';
    return true;
  });

  return (
    <div className="messages-page-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">💬</div>
        <div className="banner-text">
          <h1>Direct Messaging & Tutor Communication</h1>
          <p>Connect with your teachers, clarify doubts, exchange study files, and get instant answers.</p>
        </div>
        <div className="banner-art">✉️</div>
      </div>

      {/* 3-Column Chat Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 280px', gap: '16px', height: '640px' }}>
        {/* Left: Chat List */}
        <div className="card p" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '16px' }}>
          {/* Chat Category Tabs */}
          <div className="flex gap-4 mb-12" style={{ flexWrap: 'wrap' }}>
            <button className={`tab-btn btn-sm ${activeTab === 'all' ? 'active' : ''}`} style={{ padding: '4px 10px', fontSize: '12px' }} onClick={() => setActiveTab('all')}>All (5)</button>
            <button className={`tab-btn btn-sm ${activeTab === 'tutor' ? 'active' : ''}`} style={{ padding: '4px 10px', fontSize: '12px' }} onClick={() => setActiveTab('tutor')}>Tutors (3)</button>
            <button className={`tab-btn btn-sm ${activeTab === 'support' ? 'active' : ''}`} style={{ padding: '4px 10px', fontSize: '12px' }} onClick={() => setActiveTab('support')}>Support (1)</button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {filteredChats.map(chat => (
              <div
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  background: activeChatId === chat.id ? 'var(--bg2)' : 'transparent',
                  border: activeChatId === chat.id ? '1px solid #c4b5fd' : '1px solid transparent'
                }}
              >
                <div style={{ position: 'relative', fontSize: '24px' }}>
                  {chat.avatar}
                  {chat.online && <span className="online-dot" style={{ position: 'absolute', bottom: '0', right: '0' }}></span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex-b">
                    <strong style={{ fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.name}</strong>
                    <span className="text-xs text-muted">{chat.time}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--muted)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {chat.lastMsg}
                  </p>
                </div>
                {chat.unread > 0 && <span className="badge badge-purple">{chat.unread}</span>}
              </div>
            ))}
          </div>

          {/* Premium banner at bottom of chat list */}
          <div style={{ marginTop: '12px', padding: '10px', background: 'var(--grad)', borderRadius: '10px', color: '#fff', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '2px' }}>Upgrade to Premium</div>
            <p style={{ fontSize: '10px', opacity: 0.9, margin: '0 0 6px 0' }}>Get priority messaging & audio voice notes.</p>
            <button className="upgrade-btn" style={{ padding: '4px 8px', fontSize: '11px' }} onClick={() => toast('Direct messaging upgrade options...', 'info')}>
              Go Premium →
            </button>
          </div>
        </div>

        {/* Center: Active Conversation */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          {/* Active Chat Header */}
          <div className="flex-b p-16" style={{ borderBottom: '1px solid var(--line)', background: '#fff' }}>
            <div className="flex-c gap-12">
              <div style={{ fontSize: '32px' }}>{activeChat.avatar}</div>
              <div>
                <h4 style={{ margin: 0 }}>{activeChat.name} <span className="text-ok">✓</span></h4>
                <div className="text-xs text-muted">{activeChat.role}</div>
              </div>
            </div>

            <div className="flex-c gap-8">
              <button className="icon-btn" title="Start Video Call" onClick={() => toast(`Starting video call with ${activeChat.name}...`, 'info')}>📹</button>
              <button className="icon-btn" title="Start Audio Call" onClick={() => toast(`Calling ${activeChat.name}...`, 'info')}>📞</button>
              <button className="icon-btn" title="Chat Options">⋮</button>
            </div>
          </div>

          {/* Message Stream */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg)' }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                  maxWidth: '70%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'me' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    background: msg.sender === 'me' ? 'var(--purple)' : '#fff',
                    color: msg.sender === 'me' ? '#fff' : 'var(--text)',
                    padding: '10px 16px',
                    borderRadius: '14px',
                    borderBottomRightRadius: msg.sender === 'me' ? '2px' : '14px',
                    borderBottomLeftRadius: msg.sender === 'them' ? '2px' : '14px',
                    boxShadow: 'var(--shadow-sm)',
                    fontSize: '14px',
                    lineHeight: '1.5'
                  }}
                >
                  {msg.text}

                  {msg.file && (
                    <div
                      style={{
                        marginTop: '8px',
                        background: msg.sender === 'me' ? 'rgba(255,255,255,0.2)' : 'var(--bg)',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer'
                      }}
                      onClick={() => toast(`Downloading ${msg.file}...`, 'success')}
                    >
                      <span style={{ fontSize: '20px' }}>📄</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '12px' }}>{msg.file}</div>
                        <div style={{ fontSize: '10px', opacity: 0.8 }}>{msg.fileSize} • Click to Download</div>
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-xs text-muted mt-4" style={{ fontSize: '10px' }}>{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Bottom input area */}
          <div className="p-16" style={{ borderTop: '1px solid var(--line)', background: '#fff' }}>
            <div className="flex gap-8">
              <button className="icon-btn" style={{ width: '38px', height: '38px' }} onClick={() => toast('Select file to upload (PDF, code, image)', 'info')}>📎</button>
              <button className="icon-btn" style={{ width: '38px', height: '38px' }}>😊</button>
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

        {/* Right: Quick Actions & Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="card p">
            <h4 className="mb-12">⚡ Quick Actions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={() => navigate(PAGES.findTutor)}>
                🎓 Start New Chat with a Tutor
              </button>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={() => navigate(PAGES.help)}>
                🎧 Contact Official Support
              </button>
              <button className="btn btn-ghost btn-sm btn-full" style={{ justifyContent: 'flex-start' }} onClick={() => navigate(PAGES.notifications)}>
                🔔 View Unread Notifications
              </button>
            </div>
          </div>

          <div className="card p" style={{ background: 'linear-gradient(135deg, #2d1b6e, #1e1052)', color: '#fff' }}>
            <h4 style={{ color: '#fff', marginBottom: '6px' }}>Need Instant Help?</h4>
            <p style={{ color: '#c4b5fd', fontSize: '12px', marginBottom: '12px' }}>
              Ask our AI Assistant for instant homework guidance or course recommendations.
            </p>
            <button className="btn btn-sm btn-full" style={{ background: 'var(--purple)', color: '#fff', border: 'none' }} onClick={() => navigate(PAGES.aiPlanner)}>
              Chat with AI →
            </button>
          </div>

          <div className="card p">
            <h4 className="mb-8">Message Activity</h4>
            <div className="flex-b text-sm mb-4">
              <span>Total Messages</span>
              <strong>24</strong>
            </div>
            <div className="flex-b text-sm">
              <span>Unread</span>
              <strong className="text-purple">3</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
