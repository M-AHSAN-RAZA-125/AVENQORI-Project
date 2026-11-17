# AVENQORI

A tutoring platform that connects students with the right teachers — built with React + Vite.

## Features

- 🎓 **Student role** — search for teachers by subject, level, budget and teaching mode; ranked match % scoring
- 👩‍🏫 **Teacher role** — create a profile with expertise, rate, and courses; manage incoming student requests
- 🌙 **Dark / Light theme** toggle
- 📱 **Responsive** — works on mobile and desktop
- 💬 **Request flow** — students send requests, teachers accept or decline with live notifications (toast)
- 🔍 **Smart matching** — teachers ranked by rating, budget fit, mode, and level compatibility

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Library | React 18 |
| Build Tool | Vite 5 |
| Styling | Plain CSS (CSS Variables, no framework) |
| State | React Context API |
| Language | JavaScript (JSX) |

## Project Structure

```
src/
├── App.jsx                  # Root component, view router
├── main.jsx                 # Entry point
├── index.css                # Global styles & theme
├── context/
│   └── AppContext.jsx       # Global state (view, role, teachers, requests)
├── data/
│   └── teachers.js          # Initial teacher data & helper functions
└── components/
    ├── Navbar.jsx           # Sticky header with nav links & theme toggle
    ├── RoleSelect.jsx       # Landing page — pick Student or Teacher
    ├── TeacherSetup.jsx     # Teacher profile creation/edit form
    ├── TeacherDashboard.jsx # Teacher's request inbox
    ├── StudentForm.jsx      # Student search form (subject/level/budget/mode)
    ├── StudentResults.jsx   # Ranked teacher results list
    ├── StudentRequests.jsx  # Student's sent requests tracker
    ├── TeacherModal.jsx     # Teacher detail modal/sheet
    └── Toast.jsx            # Bottom notification toast
```

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173)

## Build for Production

```bash
npm run build
npm run preview
```
