# 🎓 AVENQORI — AI-Powered Global Tutor Marketplace & Learning Ecosystem

**AVENQORI** connects students with verified global tutors, interactive live classes, and an adaptive AI study assistant. Built with **React 18 + Vite** featuring high-fidelity visual styling, dark/light themes, and responsive design matching the full product specification for both **Student** and **Teacher** roles.

🔗 **GitHub Repository:** [https://github.com/M-AHSAN-RAZA-125/AVENQORI-Project](https://github.com/M-AHSAN-RAZA-125/AVENQORI-Project)

---

## ⚡ Role Switching in 1 Click

The platform includes a dedicated **Role Switcher** right in the top navigation bar:
- 🎓 **Student Portal** (12 complete screens)
- 👨‍🏫 **Teacher Portal** (12 complete screens)

---

## 🔌 Backend Integration & API Architecture (`src/services/api.js`)

**No data is hardcoded into views.** All application data flows through a centralized **API Service Layer** (`src/services/api.js`):
- To connect your backend (e.g. Node.js/Express, Python/FastAPI/Django, Laravel, etc.), simply create a `.env` file in the root:
  ```env
  VITE_API_URL=http://localhost:5000/api
  ```
- If the backend server is not running yet, the API service automatically supplies structured fallback data so all UI features, graphs, charts, and flows remain fully interactable and demo-ready.

---

## 🚀 Features & Complete Page Overview

### 🌐 1. Public & Authentication
- **Landing Page (`/`)**: Hero section, trust badges (500K+ learners, 4.9/5 stars), feature strip, top-rated tutors carousel, stats counter, student testimonials, and newsletter footer.
- **Login Page (`/login`)**: Role-based authentication (Student 🎓 vs. Tutor 👩‍🏫), remember me, forgot password, social logins (Google, Apple, Facebook).
- **Signup Page (`/signup`)**: Custom sign-up flows for Students and Tutors with professional title & certification fields.

### 🎒 2. Student Portal Experience (Photos f-1 to f-14)
1. **Dashboard (`/dashboard`)**: Welcome banner, circular progress gauge (75%), enrolled courses, upcoming classes, live chat assistant, notifications feed, and VIP upgrade card.
2. **My Courses (`/myCourses`)**: Course progress tracker, active courses, completed reviews, and goal tracker.
3. **Find a Tutor (`/findTutor`)**: Advanced search by subject, level, and price; tutor filter sidebar (rating, experience, mode); tutor cards with verified badges and instant 1-on-1 booking modals.
4. **Live Classes (`/liveClasses`)**: Real-time interactive countdown timers for upcoming sessions, 1-click classroom simulator, stream participant counter, and calendar syncing.
5. **AI Study Planner (`/aiPlanner`)**: AI-generated weekly study schedules, subject checkboxes, hours-per-day selector, interactive roadmap, 12-day study streak, and real-time AI tutor Q&A chat.
6. **My Bookings (`/bookings`)**: Manage upcoming, completed, and cancelled bookings with reschedule options and wallet refund protection.
7. **Certificates (`/certificates`)**: High-fidelity verified certificate showcase, credential ID verification, and instant PDF download simulators.
8. **Progress & Analytics (`/progress`)**: Interactive SVG performance curves, monthly trajectory charts, and subject proficiency analytics (Mathematics 90%, Programming 76%, etc.).
9. **Direct Messaging (`/messages`)**: 3-column messaging center with categorized inbox (Tutors, Support), live chat stream, attachment downloads, voice/video call buttons.
10. **Notifications (`/notifications`)**: Categorized alert center (Class reminders, course milestones, bookings, promotions) with unread filter and notification settings.
11. **Settings (`/settings`)**: Profile editor, language options (English, Urdu, Roman Urdu), time zone support, 2FA security, notification toggles, and data export.
12. **Help & Support (`/help`)**: Interactive FAQ accordion, direct helpline (+92 300 123 4567), support ticket submission modal, and 24/7 AI support assistant.

### 👨‍🏫 3. Teacher Portal Experience (Tutor Reference Screens)
1. **Teacher Dashboard (`/t_dashboard`)**: Teacher metrics ($3,250 Total Earnings, 892 Students, 4.9 Rating), monthly earnings growth curve, scheduled classes, recent enrolled students, and top performing courses.
2. **My Classes (`/t_classes`)**: Batch management (Python Basics, Web Dev, Data Science), capacity meters, 1-click "Start Live Class" triggers, and new class creation modal.
3. **My Students (`/t_students`)**: Student directory with progress bars, status badges (Active/Inactive), joined dates, student overview donut chart, and student detail inspect modals.
4. **My Earnings & Wallet (`/t_earnings`)**: Revenue analytics, transaction ledger, and **Withdrawal Modal supporting JazzCash, Easypaisa, Bank Transfer, and Payoneer**.
5. **Schedule & Calendar (`/t_schedule`)**: Full monthly/weekly interactive calendar with color-coded session tags (Math, Python, Web Dev), upcoming sessions, and session scheduler modal.
6. **Teacher Messages (`/t_messages`)**: 3-column student chat center with file attachments, lecture slides sharing, audio/video calling simulation, and teaching conduct tips.
7. **Teacher Notifications (`/t_notifications`)**: Real-time alerts for student enrollment, payout deposits, live class starts, and notification toggles.
8. **Teaching Resources (`/t_resources`)**: Resource repository (lesson plan templates, cheat sheets, Canva decks, quiz templates), download links, cloud storage usage gauge (6.8 GB / 10 GB), and upload resource modal.
9. **Certificates Issuance (`/t_certificates`)**: 6 design templates (Modern Blue, Elegant Purple, Premium Gold, Classic Gold, Academic Dark, Clean Minimal), bulk student certificate generation, and recent issued registry.
10. **Tutor Profile (`/t_profile`)**: Public profile management (Bio, teaching style, education, subject tags, experience, rating, and verified teacher crest).
11. **Teacher Settings (`/t_settings`)**: Account verification status, theme modes (Light/Dark/Auto), timezone selector, granular notification preferences, and 2FA security.
12. **Teacher Help & Support (`/t_help`)**: Comprehensive tutor FAQ, quick tutorials, support ticket submission form, and 24/7 dedicated AI tutor desk.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, React Hooks (`useState`, `useEffect`, `useCallback`, `useContext`)
- **Build Tool:** Vite 5 (Lightning-fast HMR and optimized production build)
- **Styling:** Pure CSS (CSS Variables, Flexbox, CSS Grid, Responsive Breakpoints)
- **Architecture:** Centralized Service Layer (`src/services/api.js`) for seamless backend API plug & play

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
