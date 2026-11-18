import { useState } from 'react';
import { useApp, PAGES } from '../context/AppContext';

const FAQS_DATA = [
  {
    q: 'How do I book a tutor on AVENQORI?',
    a: 'Browse verified teachers using the "Find a Tutor" tab or use our AI Study Planner to get recommended matches. Click "Book Now" on any tutor profile, choose your preferred date and time, and confirm your booking. You can also select a 15-minute free demo trial!'
  },
  {
    q: 'Can I get a refund for a cancelled class?',
    a: 'Yes! If you or the teacher cancels a class at least 2 hours before the scheduled time, 100% of your payment is instantly refunded to your AVENQORI wallet. Our escrow payment protection ensures you only pay for completed sessions.'
  },
  {
    q: 'How to download my certificate?',
    a: 'Once you finish 100% of a course lessons and quizzes, navigate to the "Certificates" tab in your sidebar. Click "Download Certificate" to save your high-resolution PDF with verifiable cryptographic credential ID.'
  },
  {
    q: 'What should I do if I face technical issues during live class?',
    a: 'Our live classrooms run on WebRTC. If you experience lag or audio issues, click the "Refresh Stream" button or switch video quality to 720p. If the issue persists, message our 24/7 Live Chat support and we will reschedule your class at no extra charge.'
  },
  {
    q: 'How to reset my password?',
    a: 'Go to Settings > Privacy & Security > Change Password, or on the login page click "Forgot password?". We will email you a secure verification link to choose a new password.'
  },
  {
    q: 'Is AVENQORI free to use?',
    a: 'Students can sign up, explore courses, use the AI study planner, and browse tutors for free. You only pay for individual tutor bookings or when subscribing to the All-Access Premium plan.'
  }
];

const SUPPORT_CATEGORIES = [
  { name: 'Course Support', icon: '🎓', desc: 'Syllabus, videos, quizzes' },
  { name: 'Booking Support', icon: '📅', desc: 'Rescheduling & schedules' },
  { name: 'Payment & Escrow', icon: '💳', desc: 'JazzCash, Easypaisa, cards' },
  { name: 'Technical Issues', icon: '⚙️', desc: 'Live video, browser lag' },
  { name: 'Account Help', icon: '🛡️', desc: 'Login, 2FA, password' },
  { name: 'Premium Features', icon: '🎁', desc: 'Discounts & VIP access' }
];

export default function HelpPage() {
  const { navigate, toast } = useApp();
  const [openFaq, setOpenFaq] = useState(0);
  const [contactModal, setContactModal] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <div className="help-page-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">🎧</div>
        <div className="banner-text">
          <h1>Help, Documentation & Student Support</h1>
          <p>We are here for you 24/7! Find instant answers in our FAQ or connect directly with our support team.</p>
        </div>
        <div className="banner-art">💬</div>
      </div>

      {/* Quick Action Cards Bar */}
      <div className="grid-4 mb-20">
        <div className="card p flex-c gap-12" style={{ cursor: 'pointer' }} onClick={() => toast('Scrolling to FAQs...', 'info')}>
          <span style={{ fontSize: '24px' }}>📖</span>
          <div>
            <strong>Browse FAQs →</strong>
            <p className="text-xs text-muted" style={{ margin: 0 }}>Find answers quickly</p>
          </div>
        </div>

        <div className="card p flex-c gap-12" style={{ cursor: 'pointer' }} onClick={() => setContactModal(true)}>
          <span style={{ fontSize: '24px' }}>💬</span>
          <div>
            <strong>Contact Support →</strong>
            <p className="text-xs text-muted" style={{ margin: 0 }}>Get help from our team</p>
          </div>
        </div>

        <div className="card p flex-c gap-12" style={{ cursor: 'pointer' }} onClick={() => toast('Loading video tutorial guides...', 'info')}>
          <span style={{ fontSize: '24px' }}>🎥</span>
          <div>
            <strong>Watch Tutorials →</strong>
            <p className="text-xs text-muted" style={{ margin: 0 }}>Learn step by step</p>
          </div>
        </div>

        <div className="card p flex-c gap-12" style={{ cursor: 'pointer' }} onClick={() => setContactModal(true)}>
          <span style={{ fontSize: '24px' }}>📢</span>
          <div>
            <strong>Report an Issue →</strong>
            <p className="text-xs text-muted" style={{ margin: 0 }}>Let us know the problem</p>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Left Column: FAQs & Support Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* FAQ Accordion */}
          <div className="card p">
            <h3 className="mb-16">❓ Frequently Asked Questions</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {FAQS_DATA.map((faq, index) => (
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
                    className="flex-b p-16"
                    style={{ cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.q}</span>
                    <span style={{ color: 'var(--purple)', transform: openFaq === index ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                      ❯
                    </span>
                  </div>

                  {openFaq === index && (
                    <div style={{ padding: '0 16px 16px', fontSize: '13px', color: 'var(--text2)', lineHeight: '1.6', borderTop: '1px dashed var(--line)', paddingTop: '10px' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Support Categories */}
          <div className="card p">
            <h3 className="mb-14">📂 Support Categories</h3>
            <div className="grid-3" style={{ gap: '12px' }}>
              {SUPPORT_CATEGORIES.map((cat, i) => (
                <div
                  key={i}
                  className="card p flex-c gap-10"
                  style={{ cursor: 'pointer', padding: '12px', background: 'var(--bg)' }}
                  onClick={() => setContactModal(true)}
                >
                  <span style={{ fontSize: '24px' }}>{cat.icon}</span>
                  <div>
                    <strong style={{ fontSize: '13px', display: 'block' }}>{cat.name}</strong>
                    <span className="text-xs text-muted">{cat.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Still Need Help Banner */}
          <div className="card p" style={{ background: 'var(--bg2)', border: '1.5px solid #c4b5fd' }}>
            <div className="flex-b">
              <div className="flex-c gap-16">
                <span style={{ fontSize: '36px' }}>✉️</span>
                <div>
                  <h4>Still Need Help?</h4>
                  <p className="text-xs text-muted" style={{ margin: 0 }}>Can't find what you're looking for? Send us a ticket and our team will get back to you within 15 minutes.</p>
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => setContactModal(true)}>
                Send a Message →
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Direct Contacts & AI Assistant */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Contact Support Direct Channels */}
          <div className="card p">
            <h4 className="mb-14">📞 Contact Support Directly</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div
                className="flex-b p-12"
                style={{ background: 'var(--bg)', borderRadius: '10px', cursor: 'pointer' }}
                onClick={() => toast('Opening email client to support@avenqori.com...', 'info')}
              >
                <div className="flex-c gap-10">
                  <span style={{ fontSize: '20px' }}>✉️</span>
                  <div>
                    <strong className="text-sm">Email Support</strong>
                    <div className="text-xs text-muted">support@avenqori.com</div>
                  </div>
                </div>
                <span className="text-muted">➔</span>
              </div>

              <div
                className="flex-b p-12"
                style={{ background: 'var(--bg)', borderRadius: '10px', cursor: 'pointer' }}
                onClick={() => toast('Connecting to Live Chat Agent...', 'success')}
              >
                <div className="flex-c gap-10">
                  <span style={{ fontSize: '20px' }}>💬</span>
                  <div>
                    <strong className="text-sm">Live Chat</strong>
                    <div className="text-xs text-ok font-bold">● Online Now</div>
                  </div>
                </div>
                <span className="text-muted">➔</span>
              </div>

              <div
                className="flex-b p-12"
                style={{ background: 'var(--bg)', borderRadius: '10px', cursor: 'pointer' }}
                onClick={() => toast('Calling helpline +92 300 123 4567...', 'info')}
              >
                <div className="flex-c gap-10">
                  <span style={{ fontSize: '20px' }}>📞</span>
                  <div>
                    <strong className="text-sm">Direct Phone</strong>
                    <div className="text-xs text-muted">+92 300 123 4567</div>
                  </div>
                </div>
                <span className="text-muted">➔</span>
              </div>
            </div>
          </div>

          {/* AI Support Assistant */}
          <div className="card p" style={{ background: 'linear-gradient(135deg, #1e1052, #2d1b6e)', color: '#fff' }}>
            <div className="flex-b mb-8">
              <span className="badge badge-purple" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>BETA</span>
              <span style={{ fontSize: '11px', color: '#c4b5fd' }}>Instant 24/7 AI</span>
            </div>
            <div style={{ fontSize: '32px', marginBottom: '4px' }}>🤖</div>
            <h4 style={{ color: '#fff', marginBottom: '6px' }}>AI Support Assistant</h4>
            <p style={{ color: '#e0d9ff', fontSize: '12px', marginBottom: '14px' }}>
              Ask anything! Our trained AI support bot resolves 90% of student queries instantly.
            </p>
            <button className="btn btn-sm btn-full" style={{ background: 'var(--purple)', color: '#fff', border: 'none' }} onClick={() => navigate(PAGES.aiPlanner)}>
              Chat with AI →
            </button>
          </div>
        </div>
      </div>

      {/* Contact Support Modal */}
      {contactModal && (
        <div className="modal-overlay" onClick={() => setContactModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Send Support Ticket</h3>
              <button className="modal-close" onClick={() => setContactModal(false)}>✕</button>
            </div>

            <div className="form-group">
              <label className="form-label">Subject Category</label>
              <select className="form-select">
                <option>Booking Issue</option>
                <option>Payment & Wallet</option>
                <option>Live Classroom Technical</option>
                <option>Certificate Verification</option>
                <option>General Feedback</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Describe your query or issue</label>
              <textarea className="form-textarea" placeholder="Please provide details so we can assist you promptly..."></textarea>
            </div>

            <div className="flex gap-12 mt-20">
              <button className="btn btn-ghost flex-1" onClick={() => setContactModal(false)}>Cancel</button>
              <button className="btn btn-primary flex-1" onClick={() => { toast('Support ticket #7821 created! Our team will respond shortly.', 'success'); setContactModal(false); }}>
                Submit Ticket →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
