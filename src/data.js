// ── Resume Data ──────────────────────────────────────────────────────────
// All site content lives here. Anything marked TODO is a placeholder to fill in.

// A link whose URL hasn't been provided yet. The UI shows these as a dashed
// "add link" marker while developing (npm run dev) and hides them in production.
export const TODO_LINK = null;

export const profile = {
  first: 'Rameshwari',
  last: 'Satpute',
  role: 'Software Engineer',
  status: 'Available for SDE roles · 2027',
  based: 'Sangli / Pune, India',
};

export const profileLinks = {
  email: 'rameshwaris1112@gmail.com',
  altEmail: 'shrutisatpute1112@gmail.com',
  phone: '+91 7875743747',
  linkedin: 'https://www.linkedin.com/in/rameshwari-satpute-8068322a6/',
  github: 'https://github.com/RameshwariS',
  leetcode: 'https://leetcode.com/u/shrutisatpute1112/',
  codolio: 'https://codolio.com/profile/shruti1',
};

export const navItems = [
  { id: 'about', label: 'About', method: 'GET', status: '200 OK' },
  { id: 'work', label: 'Experience', method: 'GET', status: '200 OK' },
  { id: 'projects', label: 'Projects', method: 'GET', status: '200 OK' },
  { id: 'skills', label: 'Skills', method: 'GET', status: '200 OK' },
  { id: 'contact', label: 'Contact', method: 'POST', status: '202 Accepted' },
];

export const rotatingWords = ['backends', 'REST APIs', 'gateways', 'web apps', 'dev tools'];

export const heroFacts = [
  { k: 'Interned at', v: 'UBS, Pune' },
  { k: 'Study', v: 'B.Tech CSE, WCE Sangli' },
  { k: 'Based', v: 'Sangli / Pune, India' },
  { k: 'Open source', v: 'Meshery (CNCF)' },
];

export const aboutText =
  "I'm a Computer Science student at Walchand College of Engineering who likes the unglamorous parts of software: clean service boundaries, honest tests and APIs that keep working under load. I interned at UBS on Spring Boot services, build Go and Redis tooling on the side, and run open-source events at WLUG.";

export const numbers = [
  { value: 8.69, decimals: 2, suffix: '', label: 'CGPA, B.Tech CSE' },
  { value: 750, decimals: 0, suffix: '+', label: 'LeetCode problems' },
  { value: 97, decimals: 0, suffix: '%', label: 'Test coverage at UBS' },
  { value: 180, decimals: 0, suffix: '+', label: 'People at my Go talk' },
];

export const education = {
  college: 'Walchand College of Engineering, Sangli, Maharashtra',
  degree: 'B.Tech in Computer Science and Engineering',
  period: '2023 – 2027',
  cgpa: '8.69 / 10',
  secondary: [
    { name: 'LGRPKP College', details: 'HSC: 88.3% | MHT-CET: 99.65 Percentile', year: '2023' },
    { name: 'RSK School', details: 'SSC: 92.4%', year: '2021' },
  ],
};

// ── Experience ───────────────────────────────────────────────────────────
export const jobs = [
  {
    title: 'Software Engineering Intern',
    org: 'UBS, Pune',
    period: 'Jun 2026 – Jul 2026',
    note: '2 months',
    tags: ['Java', 'Spring Boot', 'REST APIs', 'JUnit', 'Mockito', 'CI/CD', 'Agile/Scrum'],
    links: [{ label: 'Certificate', href: TODO_LINK }],
    bullets: [
      'Refactored and developed REST APIs in Java and Spring Boot for a modular microservice architecture, following controller-service-repository design.',
      'Wrote unit and integration tests with JUnit and Mockito, reaching 97% code coverage.',
      'Debugged and optimized production data-service endpoints, improving performance and reliability.',
      'Worked in an Agile/Scrum team: sprint planning, design discussions, peer code reviews, and delivery through automated CI/CD pipelines.',
    ],
  },
  {
    title: 'Main Program Director',
    org: "Walchand Linux Users' Group (WLUG)",
    period: 'May 2025 – Present',
    note: 'Leadership',
    tags: ['Open Source', 'Public Speaking', 'Community'],
    links: [
      { label: 'CTF platform', href: TODO_LINK },
      { label: 'Watch FOSS FILES', href: TODO_LINK },
    ],
    bullets: [
      'Coordinated 3 flagship open-source events (Open Source Day 2k26, LinuxDiary 6.0, Metamorphosis 2k26) and built a CTF platform for them.',
      'Delivered a Golang session at Metamorphosis 2k26 (Docker and Golang) to 180+ participants; also conducted a session at LinuxDiary 5.0 and led 5+ hands-on workshops.',
      'Presented an episode of FOSS FILES Season 6 on Anycast and DNS routing in modern web architecture.',
    ],
  },
  {
    title: 'Open Source Contributor',
    org: 'Meshery (Layer5) · CNCF',
    period: 'Open source',
    note: 'Contributions',
    tags: ['CNCF', 'Cloud Native'],
    links: [{ label: 'GitHub', href: TODO_LINK }],
    bullets: [
      'Raised 3+ issues and opened 4 pull requests (under review) on Meshery, a CNCF cloud-native management platform.',
    ],
  },
];

// ── Projects ─────────────────────────────────────────────────────────────
// `demo: 'limiter'` shows the live token bucket instead of a screenshot.
// Projects without `demo` show a placeholder visual until `image` is set
// (put the file in /public and use e.g. image: '/dsvx.png').
export const flagshipProjects = [
  {
    name: 'GoProxyX',
    stack: ['Go', 'PostgreSQL', 'Redis', 'Docker', 'Microservices', 'REST API'],
    demo: 'limiter',
    flow: ['Client', 'JWT auth', 'Token bucket', 'Reverse proxy', 'Services'],
    links: [{ label: 'GitHub', href: 'https://github.com/RameshwariS' }],
    bullets: [
      'Built an open-source API gateway in Go as the single entry point for dynamic path-based reverse proxy routing, JWT authentication, and rate limiting across independent microservices.',
      'Added an Item microservice on PostgreSQL with a concurrency-safe, transactional purchase workflow that prevents double-selling under simultaneous buy requests.',
      'Implemented a chained middleware stack (request ID, logging, panic recovery, auth, rate limiting) and a Redis token-bucket rate limiter using atomic Lua scripts to avoid race conditions under bursty traffic.',
      'Containerized the gateway, services, cache, and database with Docker Compose, using isolated networking and a persistent data layer.',
    ],
  },
  {
    name: 'DSVX',
    sub: 'Dataset Versioning System',
    stack: ['Python', 'CLI', 'ML Experiment Tracking'],
    badge: 'Finalist · WCE ACM Hackathon 2026',
    image: null, // TODO: screenshot
    flow: ['Raw data', 'Preprocess', 'SHA-256 ID', 'Snapshot / delta', 'Lineage'],
    links: [
      { label: 'GitHub', href: 'https://github.com/RameshwariS' },
      { label: 'Blog', href: TODO_LINK },
      { label: 'PyPI', href: TODO_LINK },
    ],
    bullets: [
      'Built a Git-inspired dataset versioning system, published on PyPI (dsvx), with content-addressable SHA-256 version IDs derived from raw data plus preprocessing config, so identical inputs always produce the same version.',
      'Engineered a hybrid snapshot/delta storage engine with checkpoints every 5 versions that reconstructs every historical version exactly; 73.5% smaller than full-copy versioning in a small 5-version test (23.9 KB vs. 90.5 KB).',
      'Designed a deterministic 6-stage preprocessing pipeline and implemented dataset comparison, lineage tracking, and branching version DAGs to trace how preprocessing changes affect experiments.',
      'Delivered a CLI, lineage dashboard, file-watch auto-retraining, typed Python API, and optional AI-powered insights.',
    ],
  },
  {
    // ​ = optional line-break point for narrow screens
    name: 'OpenSource​Companion',
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Docker'],
    image: null, // TODO: screenshot
    flow: ['GitHub OAuth', 'Skill profile', 'Issue ranking', 'Contributions', 'Notifications'],
    links: [
      { label: 'GitHub', href: 'https://github.com/RameshwariS' },
      { label: 'Live', href: TODO_LINK },
    ],
    bullets: [
      'Built and deployed a full-stack platform that helps developers find beginner-friendly open-source issues, track contributions, and showcase verified GitHub activity.',
      'Developed a personalized issue recommendation system that ranks issues by user skills, languages, labels, and recency.',
      'Integrated the GitHub REST API; secured access with GitHub OAuth 2.0, JWT, encrypted tokens, and role-based authorization.',
      'Added real-time notifications (Socket.io), background jobs, and idempotent event handling; wrote 250+ backend tests with CI on GitHub Actions and containerized the app with Docker.',
    ],
  },
];

export const otherProjects = [
  {
    name: 'AgriSeva',
    stack: ['React.js', 'Express.js', 'TensorFlow.js', 'NVIDIA APIs'],
    badge: '1st Place · WCE ACM 2025',
    links: [
      { label: 'GitHub', href: 'https://github.com/Nandinipatil1410/WCEHackathon2025_TeamAnvesha' },
      { label: 'Live', href: 'https://agriseva.vercel.app/' },
    ],
    bullets: [
      'AI-powered plant disease detection processing 1,200+ images across 12 crop diseases.',
      'Integrated crop suggestions using soil input and live weather signals.',
      'Added multilingual government scheme explorer and chatbot assistance.',
    ],
  },
  {
    name: 'Movie Booking Site',
    stack: ['React (Vite)', 'Node.js', 'Express.js', 'MongoDB Atlas', 'REST API'],
    links: [{ label: 'GitHub', href: 'https://github.com/RameshwariS/MOVIE_BOOKING' }],
    bullets: [
      'Built a full-stack movie booking platform supporting movies, theatres, showtimes, seat booking, payments and reviews.',
      'Designed a RESTful API across 6 resource domains with role-based authorization for USER, ADMIN, and THEATER_OWNER roles using JWT.',
      'Integrated Google OAuth 2.0 via Google Identity Services with secure server-side ID token verification.',
      'Architected a modular MVC backend with separated controllers, services, routes and middleware layers.',
    ],
  },
  {
    name: 'Blogify',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'EJS'],
    links: [
      { label: 'GitHub', href: 'https://github.com/RameshwariS/Blog' },
      { label: 'Live', href: 'https://blogify-oz95.onrender.com/' },
    ],
    bullets: [
      'Full-featured blog platform with user auth, post creation, editing and deletion.',
      'Server-side rendering with EJS for fast initial page loads.',
    ],
  },
  {
    name: 'URL Shortener',
    stack: ['Node.js', 'Express.js', 'MongoDB', 'EJS'],
    links: [{ label: 'GitHub', href: 'https://github.com/RameshwariS/URL-Shortner' }],
    bullets: [
      'Short-link generation with fast and reliable redirection logic.',
      'Input validation, error handling and MongoDB persistence for reliable link mappings.',
    ],
  },
];

// ── Skills & recognition ─────────────────────────────────────────────────
export const skillCategories = [
  { title: 'Languages', items: ['Go', 'Java', 'C++', 'JavaScript', 'Python', 'SQL', 'PL/SQL'] },
  { title: 'Backend', items: ['Spring Boot', 'Node.js', 'Express.js', 'REST APIs', 'Microservices', 'Redis'] },
  { title: 'Frontend', items: ['HTML5', 'CSS3', 'React.js', 'EJS'] },
  { title: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { title: 'Testing', items: ['JUnit', 'Mockito', 'Unit & integration testing'] },
  {
    title: 'Cloud & DevOps',
    items: ['Docker', 'Docker Compose', 'GitHub Actions', 'CI/CD', 'Kubernetes (fundamentals)', 'AWS (fundamentals)', 'Linux'],
  },
  { title: 'GenAI & AI tools', items: ['GitHub Copilot', 'Claude', 'LLM APIs', 'Prompt engineering'] },
  {
    title: 'Coursework',
    small: true,
    items: [
      'Data Structures and Algorithms',
      'Object-Oriented Programming',
      'Operating Systems',
      'Database Management Systems',
      'Computer Networks',
      'Software Engineering',
      'Cloud Computing',
      'Machine Learning',
      'Generative AI',
    ],
  },
  { title: 'Spoken', small: true, items: ['English — CEFR C1 (Advanced)'] },
];

export const achievements = [
  { kind: '1st place', title: 'WCE ACM Hackathon 2025 (Novice Track)', detail: 'AI-powered plant disease detection solution, ranked 1st among 20+ teams.' },
  { kind: '1st place', title: 'TechFusion CodeDuet 2025', detail: 'Pair-programming contest.' },
  { kind: 'Finalist', title: 'WCE ACM Hackathon 2026', detail: 'For DSVX, the dataset versioning system.' },
  { kind: 'Top 450', title: 'ICPC AlgoQueen 2025', detail: 'Of 2,300+ participants.' },
  { kind: 'Mentee', title: 'Microsoft Code Without Barriers', detail: 'Competitive machine learning mentorship focused on responsible AI practices.' },
  { kind: 'Certified', title: 'Introduction to Kubernetes (LFS158)', detail: '', link: { label: 'Certificate', href: TODO_LINK } },
  { kind: 'Certified', title: 'AWS Educate — Introduction to Cloud 101', detail: '' },
];

export const leetcode = { solved: '750+', rating: '1745', ratingNote: 'peak', rank: 'Top 10%' };
