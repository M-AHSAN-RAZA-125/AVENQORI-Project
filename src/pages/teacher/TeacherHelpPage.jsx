import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function TeacherHelpPage() {
  const { toast } = useApp();
  const [openFaq, setOpenFaq] = useState(0);
  const [ticketSubject, setTicketSubject] = useState('Select a topic...');
  const [ticketMessage, setTicketMessage] = useState('');

  const faqs = [
    {
      q: 'How can I start a live class?',
      a: 'Go to "My Classes" or "Dashboard" and click the "Start Class ▶" button next to any scheduled session. Our WebRTC virtual room opens instantly with crystal-clear audio, HD video, screen sharing, and live whiteboard tools.'
    },
    {
      q: 'Where can I check my earnings and request payout?',
      a: 'Navigate to "Earnings" in your sidebar. You can view cleared student payments, your available balance, and click "Request Withdrawal" to transfer funds to JazzCash, Easypaisa, or your Pakistani bank account.'
    },
    {
      q: 'How to issue certificates for my students?',
      a: 'Open "Certificates" from the sidebar, select your preferred template design (Modern Blue, Elegant Purple, Classic Gold, etc.), choose your course and student list, and click "Generate Certificates". Verified digital credentials are sent directly to students.'
    },
    {
      q: 'Can I change my teaching schedule or availability?',
      a: 'Yes, head over to the "Schedule" tab. You can click on any date on the calendar to add, modify, or block out hours. Enrolled students are automatically notified of any timing adjustments.'
    },
    {
      q: 'What should I do if I face technical issues during streaming?',
      a: 'Ensure you are using Google Chrome or Microsoft Edge. Click the "Refresh Stream" button in the room header or test your camera/mic permissions. If problems persist, tap "Live Chat" to reach our 24/7 technical team immediately.'
    },
    {
      q: 'Is there any mobile app for AVENQORI?',
      a: 'Yes! AVENQORI is fully progressive (PWA) and can be installed directly onto your Android and iOS devices with full notification and live class support.'
    }
  ];

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!ticketMessage.trim()) {
      toast('Please enter your query description', 'error');
      return;
    }
    toast('Support ticket #TCH-8921 submitted! Response time: < 2 hours.', 'success');
    setTicketMessage('');
  };

  return (
    <div className="teacher-help-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">🎧</div>
        <div className="banner-text">
          <h1>Tutor Help Desk & Support Center</h1>
          <p>Your Success is Our Priority! Access teaching guides, submit support tickets, or chat with our tutor success team.</p>
        </div>
        <div className="banner-art">💬</div>
      </div>

      {/* Quick Support Options Row (6 items) */}
      <div className="grid-3 mb-20" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
        {[
          { title: 'Tutorials & Guides', icon: '📖', desc: 'Learn how to use all features' },
          { title: 'FAQs', icon: '❓', desc: 'Find answers to common questions' },
          { title: 'Live Chat', icon: '💬', desc: 'Chat with our support team' },
          { title: 'Submit a Ticket', icon: '✉️', desc: 'Get detailed help via support ticket' },
          { title: 'Video Help', icon: '🎥', desc: 'Watch helpful video tutorials' },
          { title: 'Platform Updates', icon: '📢', desc: 'See latest features & updates' }
        ].map((item, i) => (
          <div
            key={i}
            className="card p text-center"
            style={{ cursor: 'pointer', padding: '16px 10px', background: 'var(--bg)' }}
            onClick={() => toast(`Opening ${item.title}...`, 'info')}
          >
            <div style={{ fontSize: '26px', marginBottom: '6px' }}>{item.icon}</div>
            <strong style={{ fontSize: '13px', display: 'block' }}>{item.title}</strong>
            <span className="text-xs text-muted">{item.desc}</span>
          </div>
        ))}
      </div>

      {/* Main Grid: Ticket Form + FAQs + Right Sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Left: Ticket Form + FAQs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Submit Support Ticket Form */}
          <div className="card p">
            <h3 className="mb-4">✉️ Submit a Support Ticket</h3>
            <p className="text-xs text-muted mb-16">Describe your issue and our team will get back to you soon.</p>

            <form onSubmit={handleSubmitTicket}>
              <div className="form-group">
                <label className="form-label">Subject *</label>
                <select className="form-select" value={ticketSubject} onChange={e => setTicketSubject(e.target.value)}>
                  <option>Select a topic...</option>
                  <option>Live Classroom & Streaming Issue</option>
                  <option>Payout / Withdrawal Questions (JazzCash/Bank)</option>
                  <option>Student Dispute or Attendance</option>
                  <option>Course Verification & Certificates</option>
                  <option>General Platform Feedback</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  className="form-textarea"
                  placeholder="Please describe your issue in detail..."
                  value={ticketMessage}
                  onChange={e => setTicketMessage(e.target.value)}
                  style={{ minHeight: '110px' }}
                />
              </div>

              <div className="flex-b mt-12">
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => toast('Attach screenshot or log file dialog', 'info')}>
                  📎 Attach File (Optional)
                </button>
                <button type="submit" className="btn btn-primary">
                  ✈️ Submit Ticket
                </button>
              </div>
            </form>
          </div>

          {/* FAQ Accordion */}
          <div className="card p">
            <h3 className="mb-16">❓ Frequently Asked Questions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  style={{
                    background: 'var(--bg)',
                    borderRadius: '10px',
                    border: '1px solid var(--line)',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    className="flex-b p-14"
                    style={{ cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  >
                    <span>{faq.q}</span>
                    <span style={{ color: 'var(--purple)', transform: openFaq === index ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                      ❯
                    </span>
                  </div>

                  {openFaq === index && (
                    <div style={{ padding: '0 14px 14px', fontSize: '13px', color: 'var(--text2)', lineHeight: '1.6', borderTop: '1px dashed var(--line)', paddingTop: '10px' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Contact Info & AI Bot */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Contact Information */}
          <div className="card p">
            <h4 className="mb-14">📞 Contact Information</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div className="flex-c gap-10">
                <span style={{ fontSize: '18px' }}>✉️</span>
                <div>
                  <strong style={{ display: 'block' }}>Email Support</strong>
                  <span className="text-xs text-muted">support@avenqori.com</span>
                </div>
              </div>

              <div className="flex-c gap-10">
                <span style={{ fontSize: '18px' }}>📞</span>
                <div>
                  <strong style={{ display: 'block' }}>Phone Support</strong>
                  <span className="text-xs text-muted">+92 300 1234567</span>
                </div>
              </div>

              <div className="flex-c gap-10">
                <span style={{ fontSize: '18px' }}>🕒</span>
                <div>
                  <strong style={{ display: 'block' }}>Support Hours</strong>
                  <span className="text-xs text-muted">Mon - Sat, 9AM - 11PM (PK Time)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Need More Help AI Card */}
          <div className="card p" style={{ background: 'linear-gradient(135deg, #1e1052, #2d1b6e)', color: '#fff', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '6px' }}>🤖</div>
            <h4 style={{ color: '#fff', marginBottom: '4px' }}>Need More Help?</h4>
            <p style={{ color: '#e0d9ff', fontSize: '12px', marginBottom: '14px' }}>
              Our dedicated tutor AI bot is ready to assist you 24/7 with instant answers.
            </p>
            <button className="btn btn-sm btn-full" style={{ background: 'var(--purple)', color: '#fff', border: 'none', fontWeight: 700 }} onClick={() => toast('AI Tutor Assistant connected', 'success')}>
              Chat with AI →
            </button>
          </div>

          {/* Average response time badge */}
          <div className="card p flex-c gap-12" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
            <span style={{ fontSize: '24px' }}>⚡</span>
            <div>
              <strong style={{ color: '#065f46', fontSize: '13px', display: 'block' }}>Average Response Time</strong>
              <span style={{ color: '#047857', fontSize: '12px' }}>Less than 2 hours guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
