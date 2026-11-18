# 🎓 AVENQORI — AI-Powered Global Tutor Marketplace & Learning Ecosystem

**AVENQORI** connects students with verified global tutors, interactive live classes, and an adaptive AI study assistant. Built with **React 18 + Vite** with high-fidelity visual styling, dark/light themes, and responsive design matching the full product specification.

🔗 **GitHub Repository:** [https://github.com/M-AHSAN-RAZA-125/AVENQORI-Project](https://github.com/M-AHSAN-RAZA-125/AVENQORI-Project)

---

## 🚀 Features & Complete Page Overview

The platform includes **15 complete views** categorized into Public Landing/Auth and the Student Portal:

### 🌐 1. Public & Authentication
- **Landing Page (`/`)**: Hero section, trust badges (500K+ learners, 4.9/5 stars), feature strip, top-rated tutors carousel, stats counter, student testimonials, and newsletter footer.
- **Login Page (`/login`)**: Role-based authentication (Student 🎓 vs. Tutor 👩‍🏫), remember me, forgot password, social logins (Google, Apple, Facebook).
- **Signup Page (`/signup`)**: Custom sign-up flows for Students and Tutors with professional title & certification fields.

### 🎒 2. Student Portal Experience
- **Dashboard (`/dashboard`)**: Welcome banner, circular progress gauge (75%), enrolled courses, upcoming classes, live chat assistant, notifications feed, and VIP upgrade card.
- **My Courses (`/myCourses`)**: Course progress tracker, active courses, completed reviews, and goal tracker.
- **Find a Tutor (`/findTutor`)**: Advanced search by subject, level, and price; tutor filter sidebar (rating, experience, mode); tutor cards with verified badges and instant 1-on-1 booking modals.
- **Live Classes (`/liveClasses`)**: Real-time interactive countdown timers for upcoming sessions, 1-click classroom simulator, stream participant counter, and calendar syncing.
- **AI Study Planner (`/aiPlanner`)**: AI-generated weekly study schedules, subject checkboxes, hours-per-day selector, interactive roadmap, 12-day study streak, and real-time AI tutor Q&A chat.
- **My Bookings (`/bookings`)**: Manage upcoming, completed, and cancelled bookings with reschedule options and wallet refund protection.
- **Certificates (`/certificates`)**: High-fidelity verified certificate showcase, credential ID verification, and instant PDF download simulators.
- **Progress & Analytics (`/progress`)**: Interactive SVG performance curves, monthly trajectory charts, and subject proficiency analytics (Mathematics 90%, Programming 76%, etc.).
- **Direct Messaging (`/messages`)**: 3-column messaging center with categorized inbox (Tutors, Support), live chat stream, attachment downloads, voice/video call buttons.
- **Notifications (`/notifications`)**: Categorized alert center (Class reminders, course milestones, bookings, promotions) with unread filter and notification settings.
- **Settings (`/settings`)**: Profile editor, language options (English, Urdu, Roman Urdu), time zone support, 2FA security, notification toggles, and data export.
- **Help & Support (`/help`)**: Interactive FAQ accordion, direct helpline (+92 300 123 4567), support ticket submission modal, and 24/7 AI support assistant.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, React Hooks (`useState`, `useEffect`, `useCallback`, `useContext`)
- **Build Tool:** Vite 5 (Lightning-fast HMR and optimized production build)
- **Styling:** Modern CSS (CSS Custom Properties, Flexbox, CSS Grid, Glassmorphism, Responsive Breakpoints)
- **State Management:** Custom React Context API (`AppContext.jsx`)

---

## 💻 Quick Start & Local Development

### 1. Clone the repository
```bash
git clone https://github.com/M-AHSAN-RAZA-125/AVENQORI-Project.git
cd AVENQORI-Project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 🗺️ Product Roadmap

- [x] **Phase 1 (MVP Launch):** Full 15-page UI suite, responsive layouts, smart matching filters, AI study assistant chat, verified certificates, and direct messaging.
- [ ] **Phase 2 (Growth & Monetization):** Live WebRTC audio/video calling, JazzCash / Easypaisa payment gateway integration, escrow transaction handling.
- [ ] **Phase 3 (Global Scale):** Multi-currency checkout, automated AI voice tutoring notes, parent dashboard, and accredited partner certificates.
