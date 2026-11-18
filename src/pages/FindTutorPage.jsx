import { useState } from 'react';
import { useApp, PAGES } from '../context/AppContext';

const TUTORS_DATA = [
  {
    id: 1,
    name: 'Ayesha Malik',
    title: 'Mathematics Expert',
    rating: 4.9,
    reviews: '12k',
    students: '25k+',
    rate: 15,
    mode: 'Online',
    online: true,
    avatar: '👩‍🏫',
    subject: 'Mathematics',
    tags: ['Math', 'Algebra', 'Geometry'],
    experience: '6+ years',
    about: 'Passionate math educator specializing in making complex calculus and algebra intuitive and engaging.'
  },
  {
    id: 2,
    name: 'Usman Ahmad',
    title: 'Programming Tutor',
    rating: 4.8,
    reviews: '8k',
    students: '18k+',
    rate: 20,
    mode: 'Online',
    online: true,
    avatar: '👨‍💻',
    subject: 'Programming',
    tags: ['Python', 'JavaScript', 'React'],
    experience: '5+ years',
    about: 'Senior Software Engineer mentoring aspiring developers with real-world hands-on projects.'
  },
  {
    id: 3,
    name: 'Fatima Noor',
    title: 'English Specialist',
    rating: 4.9,
    reviews: '7k',
    students: '15k+',
    rate: 14,
    mode: 'Online',
    online: true,
    avatar: '👩‍💼',
    subject: 'Languages',
    tags: ['English', 'Grammar', 'IELTS'],
    experience: '8+ years',
    about: 'Certified IELTS coach helping students achieve Band 8+ with personalized speaking & essay feedback.'
  },
  {
    id: 4,
    name: 'Ahmed Khan',
    title: 'Web Development Expert',
    rating: 4.8,
    reviews: '11k',
    students: '14k+',
    rate: 22,
    mode: 'Online',
    online: true,
    avatar: '👨‍🏫',
    subject: 'Programming',
    tags: ['Web Dev', 'React', 'Next.js'],
    experience: '7+ years',
    about: 'Full-stack specialist teaching modern frontend architecture and high-performance web systems.'
  },
  {
    id: 5,
    name: 'Dr. Farhan Ali',
    title: 'Chemistry Specialist',
    rating: 4.9,
    reviews: '9k',
    students: '19k+',
    rate: 18,
    mode: 'Online',
    online: true,
    avatar: '👨‍🔬',
    subject: 'Science',
    tags: ['Chemistry', 'Organic', 'MDCAT'],
    experience: '10+ years',
    about: 'PhD in Chemistry. Step-by-step clarity for college and competitive entrance exams.'
  },
  {
    id: 6,
    name: 'Sara Khan',
    title: 'Physics & Science Coach',
    rating: 4.9,
    reviews: '10k',
    students: '21k+',
    rate: 16,
    mode: 'Online',
    online: true,
    avatar: '👩‍🔬',
    subject: 'Science',
    tags: ['Physics', 'Mechanics', 'Waves'],
    experience: '6+ years',
    about: 'Visual physics mentor making formulas simple through real-life demonstrations and past papers.'
  }
];

const TOP_RATED = [
  { name: 'Sana Khan', rating: 5.0, students: '28k+ students', avatar: '👩‍🏫' },
  { name: 'Ali Raza', rating: 5.0, students: '32k+ students', avatar: '👨‍💼' },
  { name: 'Zainab Fatima', rating: 4.9, students: '20k+ students', avatar: '👩‍🎓' },
  { name: 'Muhammad Usman', rating: 4.9, students: '18k+ students', avatar: '👨‍🎓' },
  { name: 'Hira Sheikh', rating: 4.8, students: '16k+ students', avatar: '👩‍💻' }
];

export default function FindTutorPage() {
  const { navigate, toast } = useApp();
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedTutors, setLikedTutors] = useState({});
  const [bookingModal, setBookingModal] = useState(null);

  const subjects = ['All', 'Programming', 'Mathematics', 'Science', 'Languages', 'Business', 'Design'];

  const filteredTutors = TUTORS_DATA.filter(tutor => {
    const matchesSubject = selectedSubject === 'All' || tutor.subject === selectedSubject || tutor.tags.includes(selectedSubject);
    const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tutor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tutor.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    let matchesPrice = true;
    if (selectedPrice === 'under15') matchesPrice = tutor.rate <= 15;
    else if (selectedPrice === '15to20') matchesPrice = tutor.rate > 15 && tutor.rate <= 20;
    else if (selectedPrice === 'above20') matchesPrice = tutor.rate > 20;
    return matchesSubject && matchesSearch && matchesPrice;
  });

  const toggleLike = (id) => {
    setLikedTutors(prev => {
      const isLiked = !prev[id];
      toast(isLiked ? 'Saved tutor to favorites' : 'Removed tutor from favorites', 'info');
      return { ...prev, [id]: isLiked };
    });
  };

  const handleBookNow = (tutor) => {
    setBookingModal(tutor);
  };

  const confirmBooking = () => {
    toast(`Session request sent to ${bookingModal.name}! Check My Bookings.`, 'success');
    setBookingModal(null);
  };

  return (
    <div className="find-tutor-container">
      {/* Banner */}
      <div className="page-banner">
        <div className="banner-icon">👩‍🏫</div>
        <div className="banner-text">
          <span className="badge badge-purple mb-8" style={{ display: 'inline-block' }}>Find the Best Tutor</span>
          <h1>Find Your Perfect Tutor</h1>
          <p>Learn from verified experts and achieve your academic and career goals with AVENQORI.</p>
          <div className="flex gap-12 mt-16">
            <button className="btn btn-primary" onClick={() => setSelectedSubject('All')}>Browse All Tutors →</button>
            <button className="btn btn-ghost" onClick={() => toast('Loading demo preview video...', 'info')}>▶ Watch How It Works</button>
          </div>
        </div>
        <div className="banner-art">🎓</div>
      </div>

      {/* Subject Filter Pills Bar */}
      <div className="card p mb-20">
        <div className="flex-b gap-16" style={{ flexWrap: 'wrap' }}>
          <div className="tab-bar" style={{ margin: 0 }}>
            {subjects.map(subj => (
              <button
                key={subj}
                className={`tab-btn ${selectedSubject === subj ? 'active' : ''}`}
                onClick={() => setSelectedSubject(subj)}
              >
                {subj === 'All' ? '🌐 All Subjects' : subj === 'Programming' ? '</> Programming' : subj === 'Mathematics' ? '📐 Mathematics' : subj === 'Science' ? '🧪 Science' : subj === 'Languages' ? '🗣️ Languages' : subj === 'Business' ? '💼 Business' : '🎨 Design'}
              </button>
            ))}
          </div>

          <div className="flex-c gap-12">
            <div className="search-bar" style={{ maxWidth: '240px', padding: '6px 12px' }}>
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search tutor name or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="form-select"
              style={{ width: 'auto', padding: '8px 12px' }}
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
            >
              <option value="all">Sort: All Prices</option>
              <option value="under15">Under $15/hr</option>
              <option value="15to20">$15 - $20/hr</option>
              <option value="above20">$20+/hr</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px' }}>
        {/* Left Filter Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card p">
            <h3 className="mb-16">Filters</h3>

            <div className="form-group">
              <label className="form-label">Price Range</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <label className="flex-c gap-8" style={{ cursor: 'pointer' }}>
                  <input type="radio" name="price" checked={selectedPrice === 'all'} onChange={() => setSelectedPrice('all')} />
                  <span>All Prices</span>
                </label>
                <label className="flex-c gap-8" style={{ cursor: 'pointer' }}>
                  <input type="radio" name="price" checked={selectedPrice === 'under15'} onChange={() => setSelectedPrice('under15')} />
                  <span>$5 – $15 / hr</span>
                </label>
                <label className="flex-c gap-8" style={{ cursor: 'pointer' }}>
                  <input type="radio" name="price" checked={selectedPrice === '15to20'} onChange={() => setSelectedPrice('15to20')} />
                  <span>$15 – $20 / hr</span>
                </label>
                <label className="flex-c gap-8" style={{ cursor: 'pointer' }}>
                  <input type="radio" name="price" checked={selectedPrice === 'above20'} onChange={() => setSelectedPrice('above20')} />
                  <span>$20+ / hr</span>
                </label>
              </div>
            </div>

            <hr className="divider" />

            <div className="form-group">
              <label className="form-label">Tutor Type</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <label className="flex-c gap-8"><input type="checkbox" defaultChecked /> Online 1-on-1</label>
                <label className="flex-c gap-8"><input type="checkbox" defaultChecked /> Live Group Classes</label>
                <label className="flex-c gap-8"><input type="checkbox" /> In-Person Tutors</label>
              </div>
            </div>

            <hr className="divider" />

            <div className="form-group">
              <label className="form-label">Rating</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                <label className="flex-c gap-8"><input type="radio" name="rating" defaultChecked /> ⭐ 4.5 & above</label>
                <label className="flex-c gap-8"><input type="radio" name="rating" /> ⭐ 4.0 & above</label>
                <label className="flex-c gap-8"><input type="radio" name="rating" /> ⭐ 3.5 & above</label>
              </div>
            </div>

            <button className="btn btn-primary btn-full mt-8" onClick={() => toast('Filters applied successfully!', 'success')}>
              Apply Filters
            </button>
          </div>

          {/* AI Helper Box */}
          <div className="card p" style={{ background: 'linear-gradient(135deg, #2d1b6e, #1e1052)', color: '#fff' }}>
            <div className="flex-c gap-10 mb-8">
              <span style={{ fontSize: '24px' }}>🤖</span>
              <div>
                <h4 style={{ color: '#fff', margin: 0 }}>Need Help?</h4>
                <p style={{ color: '#c4b5fd', fontSize: '12px', margin: 0 }}>AI matches you in 1 click</p>
              </div>
            </div>
            <p style={{ fontSize: '13px', color: '#e0d9ff', marginBottom: '12px' }}>
              Tell our AI what you want to learn, and it finds the exact matching teacher for you!
            </p>
            <button className="btn btn-sm btn-full" style={{ background: 'var(--purple)', color: '#fff', border: 'none' }} onClick={() => navigate(PAGES.aiPlanner)}>
              Match with AI →
            </button>
          </div>

          {/* Why choose AVENQORI */}
          <div className="card p">
            <h4 className="mb-12">Why Choose AVENQORI?</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text2)' }}>
              <div className="flex-c gap-8"><span>✅</span> <span>Verified & Certified Experts</span></div>
              <div className="flex-c gap-8"><span>✅</span> <span>Flexible Live Scheduling</span></div>
              <div className="flex-c gap-8"><span>✅</span> <span>Secure Escrow Protection</span></div>
              <div className="flex-c gap-8"><span>✅</span> <span>Free Trial Demo Available</span></div>
            </div>
          </div>
        </div>

        {/* Right Tutors Grid */}
        <div>
          <div className="grid-2 mb-24">
            {filteredTutors.map(tutor => (
              <div key={tutor.id} className="card tutor-card">
                <div className="tutor-card-img" style={{ fontSize: '48px' }}>
                  {tutor.avatar}
                  <div className="tutor-status">
                    <span className="online-dot" style={{ width: '8px', height: '8px' }}></span>
                    Online
                  </div>
                </div>

                <div className="tutor-card-body">
                  <div className="flex-b">
                    <div>
                      <div className="tutor-name">
                        {tutor.name}
                        <span className="verified-icon" title="Verified Tutor">✓</span>
                      </div>
                      <div className="tutor-title">{tutor.title}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="rating-row">
                        <span className="stars">★</span>
                        <span className="rating-num">{tutor.rating}</span>
                        <span className="rating-cnt">({tutor.reviews})</span>
                      </div>
                      <small className="text-muted">{tutor.students} students</small>
                    </div>
                  </div>

                  <p style={{ fontSize: '13px', margin: '8px 0', color: 'var(--text2)', minHeight: '38px' }}>
                    {tutor.about}
                  </p>

                  <div className="tutor-tags">
                    {tutor.tags.map(tag => (
                      <span key={tag} className="tutor-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="flex-b mt-12" style={{ borderTop: '1px solid var(--line)', paddingTop: '10px' }}>
                    <div className="tutor-price" style={{ margin: 0 }}>
                      ${tutor.rate}<span>/hr</span>
                    </div>

                    <div className="flex gap-8">
                      <button
                        className="btn btn-ghost btn-sm"
                        style={{ padding: '6px 10px', color: likedTutors[tutor.id] ? 'var(--bad)' : 'var(--muted)' }}
                        onClick={() => toggleLike(tutor.id)}
                        title="Save to favorites"
                      >
                        {likedTutors[tutor.id] ? '❤️' : '🤍'}
                      </button>
                      <button className="btn btn-primary btn-sm" onClick={() => handleBookNow(tutor)}>
                        Book Now →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Top Rated Tutors Strip */}
          <div className="card p">
            <div className="flex-b mb-16">
              <h3>🔥 Top Rated Tutors</h3>
              <span className="text-sm text-purple font-bold" style={{ cursor: 'pointer' }} onClick={() => toast('Showing top rated tutors', 'info')}>View All Top Tutors →</span>
            </div>
            <div className="grid-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
              {TOP_RATED.map((t, idx) => (
                <div key={idx} style={{ textAlign: 'center', padding: '12px 8px', background: 'var(--bg)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '28px', marginBottom: '4px' }}>{t.avatar}</div>
                  <strong style={{ fontSize: '13px', display: 'block' }}>{t.name}</strong>
                  <div className="flex-c gap-4" style={{ justifyContent: 'center', fontSize: '12px', margin: '2px 0' }}>
                    <span className="stars">★</span>
                    <strong>{t.rating.toFixed(1)}</strong>
                  </div>
                  <small className="text-muted" style={{ fontSize: '11px' }}>{t.students}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {bookingModal && (
        <div className="modal-overlay" onClick={() => setBookingModal(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Book Session with {bookingModal.name}</h3>
              <button className="modal-close" onClick={() => setBookingModal(null)}>✕</button>
            </div>
            <div className="flex gap-16 mb-16">
              <div style={{ fontSize: '42px' }}>{bookingModal.avatar}</div>
              <div>
                <h4>{bookingModal.name}</h4>
                <div className="text-sm text-muted">{bookingModal.title} · {bookingModal.experience}</div>
                <div className="text-purple font-bold mt-4">${bookingModal.rate} USD / Hour</div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Date & Time</label>
              <input type="datetime-local" className="form-input" defaultValue="2026-11-20T10:00" />
            </div>

            <div className="form-group">
              <label className="form-label">Session Topic / Notes</label>
              <textarea className="form-textarea" placeholder="E.g., I need help preparing for exam calculus..." defaultValue="Looking forward to practicing and clarifying problem areas!"></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Booking Type</label>
              <div className="flex gap-12">
                <label className="flex-c gap-4"><input type="radio" name="btype" defaultChecked /> 15-min Free Trial</label>
                <label className="flex-c gap-4"><input type="radio" name="btype" /> Full 1-Hour Session</label>
              </div>
            </div>

            <div className="flex gap-12 mt-20">
              <button className="btn btn-ghost flex-1" onClick={() => setBookingModal(null)}>Cancel</button>
              <button className="btn btn-primary flex-1" onClick={confirmBooking}>Confirm Booking →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
