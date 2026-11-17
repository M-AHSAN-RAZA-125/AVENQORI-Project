export const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'English', 'Programming', 'Biology'];

export const INITIAL_TEACHERS = [
  {
    id: 1, name: 'Ayesha Khan', subject: 'Mathematics', rate: 15, rating: 4.9, exp: 8,
    mode: 'both', levels: ['O/A-Level', 'University'],
    about: 'Math teacher with 8 years of O/A-Level and SAT coaching. I focus on concepts first, then exam technique.',
    tags: ['Calculus', 'Algebra', 'SAT Math'],
    courses: [{ t: 'A-Level Maths Crash Course', p: 40 }]
  },
  {
    id: 2, name: 'Bilal Ahmed', subject: 'Programming', rate: 20, rating: 4.8, exp: 6,
    mode: 'online', levels: ['University', 'Professional'],
    about: 'Full-stack developer who mentors beginners into their first job. Project-based learning.',
    tags: ['Python', 'JavaScript', 'React'],
    courses: [{ t: 'Python from Zero', p: 35 }, { t: 'Web Dev Bootcamp', p: 60 }]
  },
  {
    id: 3, name: 'Sara Malik', subject: 'Physics', rate: 12, rating: 4.6, exp: 5,
    mode: 'both', levels: ['School', 'O/A-Level'],
    about: 'Physics made visual. Lots of diagrams, numericals and past-paper practice.',
    tags: ['Mechanics', 'Waves', 'Electricity'],
    courses: [{ t: 'O-Level Physics Revision', p: 25 }]
  },
  {
    id: 4, name: 'Usman Raza', subject: 'Mathematics', rate: 9, rating: 4.4, exp: 3,
    mode: 'in-person', levels: ['School', 'O/A-Level'],
    about: 'Patient and friendly tutor for school maths. Weekly progress reports for parents.',
    tags: ['Arithmetic', 'Geometry'],
    courses: []
  },
  {
    id: 5, name: 'Hina Tariq', subject: 'English', rate: 11, rating: 4.7, exp: 7,
    mode: 'online', levels: ['School', 'University', 'Professional'],
    about: 'IELTS and academic writing coach. Clear feedback on every essay.',
    tags: ['IELTS', 'Essay Writing', 'Speaking'],
    courses: [{ t: 'IELTS 7+ Plan', p: 45 }]
  },
  {
    id: 6, name: 'Dr. Farhan Ali', subject: 'Chemistry', rate: 18, rating: 4.9, exp: 12,
    mode: 'both', levels: ['O/A-Level', 'University'],
    about: 'PhD in chemistry. Organic and physical chemistry explained step by step.',
    tags: ['Organic', 'Physical', 'MDCAT'],
    courses: [{ t: 'MDCAT Chemistry', p: 50 }]
  },
  {
    id: 7, name: 'Zainab Noor', subject: 'Biology', rate: 10, rating: 4.5, exp: 4,
    mode: 'online', levels: ['School', 'O/A-Level'],
    about: 'Biology with mnemonics and mind maps that actually stick.',
    tags: ['Genetics', 'Human Body'],
    courses: []
  }
];

export function getInitials(name) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

export function scoreTeacher(teacher, query) {
  let s = teacher.rating * 2;
  if (teacher.rate <= query.budget) s += 3; else s -= 1;
  if (query.mode === 'any' || teacher.mode === 'both' || teacher.mode === query.mode) s += 2;
  if (teacher.levels.includes(query.level)) s += 2;
  return s;
}
