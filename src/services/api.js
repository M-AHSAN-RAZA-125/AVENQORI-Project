/**
 * AVENQORI API Service Layer
 * -------------------------------------------------------------
 * All data across the platform is routed through this service.
 * When your backend server is running, set VITE_API_URL in your .env file:
 * VITE_API_URL=http://localhost:5000/api
 *
 * If backend is not connected yet, it automatically provides structured
 * fallback data so you can test and demonstrate the UI seamlessly.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper for fetch with fallback
async function fetchWithFallback(endpoint, fallbackData, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    // Graceful fallback to initial schema if backend server is not running
    return fallbackData;
  }
}

/* ============================================================
   TEACHER API SERVICES
   ============================================================ */

export const TeacherAPI = {
  // 1. Teacher Dashboard Metrics & Overview
  getDashboardData: async () => {
    return fetchWithFallback('/teacher/dashboard', {
      teacher: {
        name: 'Dr. Ahmed Khan',
        role: 'Teacher',
        avatar: '👨‍🏫',
        rating: 4.9,
        totalStudents: 892,
        totalEarnings: 3250.00,
        thisMonthEarnings: 1280.00,
        upcomingClassesCount: 12
      },
      schedule: [
        { id: 1, title: 'Mathematics Fundamentals', time: '10:00 AM - 11:00 AM', date: 'Nov 16, Sun', color: '#10b981' },
        { id: 2, title: 'Python Programming', time: '08:00 PM - 09:00 PM', date: 'Nov 17, Mon', color: '#6c3ef4' },
        { id: 3, title: 'Web Development Basics', time: '07:00 PM - 08:00 PM', date: 'Nov 19, Wed', color: '#3b82f6' }
      ],
      recentStudents: [
        { id: 1, name: 'Ayesha Malik', subject: 'Mathematics', status: 'Active', avatar: '👩‍🎓' },
        { id: 2, name: 'Usman Ahmed', subject: 'Python', status: 'Active', avatar: '👨‍🎓' },
        { id: 3, name: 'Fatima Noor', subject: 'Web Dev', status: 'Active', avatar: '👩‍💼' },
        { id: 4, name: 'Ali Raza', subject: 'Data Science', status: 'Active', avatar: '👨‍💻' },
        { id: 5, name: 'Sana Khan', subject: 'English', status: 'Active', avatar: '👩‍🏫' }
      ],
      topCourses: [
        { id: 1, title: 'Python Programming', students: 450, pct: 95, icon: '🐍' },
        { id: 2, title: 'Web Development with React', students: 380, pct: 88, icon: '⚛️' },
        { id: 3, title: 'Mathematics Basics', students: 320, pct: 76, icon: '📐' }
      ]
    });
  },

  // 2. Classes & Sessions
  getClasses: async () => {
    return fetchWithFallback('/teacher/classes', [
      {
        id: 1,
        title: 'Python Programming – Basics to Advanced',
        level: 'Beginner',
        duration: '2.5 Hours',
        mode: 'Online',
        enrolled: 48,
        capacity: 100,
        nextClass: 'Nov 17, 2025 • 04:00 PM',
        status: 'Upcoming',
        isLiveClass: true,
        icon: '🐍'
      },
      {
        id: 2,
        title: 'Web Development with React',
        level: 'Intermediate',
        duration: '3 Hours',
        mode: 'Online',
        enrolled: 32,
        capacity: 50,
        nextClass: 'Nov 18, 2025 • 06:00 PM',
        status: 'Upcoming',
        isLiveClass: false,
        icon: '🌐'
      },
      {
        id: 3,
        title: 'Data Science with Python',
        level: 'Advanced',
        duration: '3 Hours',
        mode: 'Online',
        enrolled: 62,
        capacity: 80,
        nextClass: 'Nov 19, 2025 • 05:00 PM',
        status: 'Ongoing',
        isLiveClass: true,
        icon: '📊'
      },
      {
        id: 4,
        title: 'Mathematics – Board Exam Preparation',
        level: 'Intermediate',
        duration: '2 Hours',
        mode: 'Online',
        enrolled: 75,
        capacity: 75,
        nextClass: 'Nov 20, 2025 • 03:00 PM',
        status: 'Completed',
        isLiveClass: false,
        icon: '📐'
      }
    ]);
  },

  // 3. Students List & Performance
  getStudents: async () => {
    return fetchWithFallback('/teacher/students', [
      { id: 1, name: 'Ahmad Raza', email: 'ahmadraza@gmail.com', courses: 3, progress: 85, status: 'Active', joined: 'Nov 10, 2025', avatar: '👨‍🎓' },
      { id: 2, name: 'Ayesha Khan', email: 'ayesha.khan@gmail.com', courses: 2, progress: 72, status: 'Active', joined: 'Nov 12, 2025', avatar: '👩‍🎓' },
      { id: 3, name: 'Muhammad Ali', email: 'mali@gmail.com', courses: 4, progress: 91, status: 'Active', joined: 'Nov 08, 2025', avatar: '👨‍💼' },
      { id: 4, name: 'Sami Ullah', email: 'samiullah@gmail.com', courses: 1, progress: 45, status: 'Inactive', joined: 'Nov 05, 2025', avatar: '👨‍💻' },
      { id: 5, name: 'Fatima Noor', email: 'fatima.noor@gmail.com', courses: 2, progress: 67, status: 'Active', joined: 'Nov 11, 2025', avatar: '👩‍💼' },
      { id: 6, name: 'Daniyal Khan', email: 'daniyal.khan@gmail.com', courses: 3, progress: 78, status: 'Active', joined: 'Nov 09, 2025', avatar: '👨‍🎓' },
      { id: 7, name: 'Hassan Ali', email: 'hassan.ali@gmail.com', courses: 1, progress: 33, status: 'Inactive', joined: 'Oct 28, 2025', avatar: '👨‍🔬' }
    ]);
  },

  // 4. Earnings & Transactions
  getEarnings: async () => {
    return fetchWithFallback('/teacher/earnings', {
      totalEarnings: 2845.50,
      availableBalance: 1750.25,
      thisMonth: 620.75,
      totalPayouts: 1095.25,
      transactions: [
        { id: 1, type: 'Course Earnings', desc: 'Web Development Course', amount: 420.00, date: 'Nov 16, 2025', status: 'Completed', isCredit: true },
        { id: 2, type: 'Course Earnings', desc: 'Python Programming Course', amount: 380.50, date: 'Nov 14, 2025', status: 'Completed', isCredit: true },
        { id: 3, type: 'Withdrawal', desc: 'Bank Transfer (JazzCash)', amount: 1000.00, date: 'Nov 10, 2025', status: 'Processed', isCredit: false },
        { id: 4, type: 'Course Earnings', desc: 'Data Science Course', amount: 510.75, date: 'Nov 08, 2025', status: 'Completed', isCredit: true }
      ]
    });
  },

  // 5. Schedule & Calendar Events
  getSchedule: async () => {
    return fetchWithFallback('/teacher/schedule', {
      events: [
        { day: 3, title: 'Math Class', time: '10:00 AM', color: '#6c3ef4' },
        { day: 5, title: 'Python Class', time: '02:00 PM', color: '#10b981' },
        { day: 7, title: 'Web Dev Class', time: '04:00 PM', color: '#3b82f6' },
        { day: 10, title: 'Data Science', time: '11:00 AM', color: '#8b5cf6' },
        { day: 12, title: 'Programming', time: '03:00 PM', color: '#6c3ef4' },
        { day: 14, title: 'Math Class', time: '10:00 AM', color: '#10b981' },
        { day: 17, title: 'Web Dev Class', time: '02:00 PM', color: '#3b82f6' },
        { day: 19, title: 'Python Class', time: '11:00 AM', color: '#8b5cf6' },
        { day: 27, title: 'Data Science', time: '01:00 PM', color: '#10b981' }
      ]
    });
  },

  // 6. Messages & Chats
  getChats: async () => {
    return fetchWithFallback('/teacher/chats', [
      { id: 1, name: 'Ahmad Raza', role: 'Student • Online', avatar: '👨‍🎓', lastMsg: 'Sir, can you share the notes?', time: '2m ago', unread: 2, online: true },
      { id: 2, name: 'Ayesha Khan', role: 'Student', avatar: '👩‍🎓', lastMsg: 'Thank you so much! 😊', time: '8m ago', unread: 0, online: true },
      { id: 3, name: 'Muhammad Ali', role: 'Student', avatar: '👨‍💼', lastMsg: 'When will the next class be?', time: '15m ago', unread: 1, online: false },
      { id: 4, name: 'Fatima Noor', role: 'Student', avatar: '👩‍💼', lastMsg: 'I have a problem with login...', time: '1h ago', unread: 0, online: false },
      { id: 5, name: 'Sami Ullah', role: 'Student', avatar: '👨‍💻', lastMsg: 'Okay sir, thanks!', time: '2h ago', unread: 0, online: false },
      { id: 6, name: 'AVENQORI Support', role: 'Helpdesk', avatar: '🎧', lastMsg: 'Your ticket #SUP-2025 has been resolved.', time: '5h ago', unread: 1, online: true }
    ]);
  },

  // 7. Teaching Resources
  getResources: async () => {
    return fetchWithFallback('/teacher/resources', [
      { id: 1, title: 'Online Teaching Best Practices', category: 'Guide', fileType: 'PDF', size: '2.5 MB', desc: 'Learn the best strategies for engaging online students.' },
      { id: 2, title: 'Lesson Plan Template', category: 'Template', fileType: 'DOCX', size: '850 KB', desc: 'A ready-to-use structured lesson plan template for teachers.' },
      { id: 3, title: 'Python Course Notes', category: 'Material', fileType: 'PDF', size: '3.1 MB', desc: 'Complete conceptual notes & code for Python programming.' },
      { id: 4, title: 'Canva Design Templates', category: 'Tool', fileType: 'ZIP', size: '5.2 MB', desc: 'Beautiful customizable presentation templates for materials.' },
      { id: 5, title: 'Live Class Setup Guide', category: 'Guide', fileType: 'PDF', size: '1.8 MB', desc: 'Step-by-step technical guide to start virtual audio/video classes.' },
      { id: 6, title: 'Quiz & Exam Template', category: 'Template', fileType: 'DOCX', size: '620 KB', desc: 'Create multiple-choice quizzes and tests for your students.' },
      { id: 7, title: 'Student Progress Tracker', category: 'Material', fileType: 'XLSX', size: '320 KB', desc: 'Track and analyze weekly student performance spreadsheets.' },
      { id: 8, title: 'Teaching Tips & Tricks', category: 'Other', fileType: 'PDF', size: '1.2 MB', desc: 'Proven pedagogic tips to improve student retention & ratings.' }
    ]);
  },

  // 8. Certificates & Templates
  getCertificates: async () => {
    return fetchWithFallback('/teacher/certificates', {
      stats: { total: 124, thisMonth: 28, issued: 98, topCourse: 'Python Programming' },
      templates: [
        { id: 1, name: 'Modern Blue', type: 'Completion', border: '#3b82f6' },
        { id: 2, name: 'Elegant Purple', type: 'Completion', border: '#6c3ef4' },
        { id: 3, name: 'Premium Gold', type: 'Achievement', border: '#f59e0b' },
        { id: 4, name: 'Clean Minimal', type: 'Completion', border: '#94a3b8' },
        { id: 5, name: 'Classic Gold', type: 'Excellence', border: '#d97706' },
        { id: 6, name: 'Academic Dark', type: 'Completion', border: '#1e1b4b' }
      ],
      recentIssued: [
        { id: 1, student: 'Ayesha Khan', course: 'Python Programming', date: 'Nov 16, 2025', avatar: '👩‍🎓' },
        { id: 2, student: 'Muhammad Ali', course: 'Data Science', date: 'Nov 15, 2025', avatar: '👨‍💼' },
        { id: 3, student: 'Fatima Noor', course: 'Web Development', date: 'Nov 14, 2025', avatar: '👩‍💼' }
      ]
    });
  },

  // 9. Teacher Profile
  getProfile: async () => {
    return fetchWithFallback('/teacher/profile', {
      name: 'Dr. Ahmed Khan',
      role: 'Teacher',
      email: 'ahmed.khan@avenqori.com',
      phone: '+92 300 1234567',
      location: 'Karachi, Pakistan',
      joined: 'Nov 15, 2025',
      bio: 'Experienced Python Developer and Programming Instructor. Passionate about teaching and helping students grow into full-time engineers.',
      expertise: ['Python', 'Data Science', 'Web Development', 'AI & Machine Learning'],
      experience: '5+ Years',
      education: 'MS in Computer Science',
      languages: 'English, Urdu',
      teachingStyle: 'Interactive & Practical Learning',
      rating: 4.8,
      totalClasses: 12,
      totalStudents: 892
    });
  }
};
