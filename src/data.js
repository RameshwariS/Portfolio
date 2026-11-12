// ── Resume Data ──────────────────────────────────────────────────────────
export const experience = {
  company: 'UBS, Pune',
  role: 'Software Engineering Intern',
  period: 'Jun 2026 \u2013 Jul 2026',
  location: 'Pune, India',
  stack: ['Java', 'Spring Boot', 'REST APIs', 'JUnit', 'Mockito', 'CI/CD', 'Agile/Scrum'],
  bullets: [
    'Refactored and developed scalable REST APIs in Java using Spring Boot for a modular multi-tier service architecture following controller-service-repository design principles.',
    'Developed comprehensive unit and integration tests using JUnit and Mockito, achieving 97% code coverage while improving software quality and maintainability.',
    'Debugged, optimized and enhanced production data-service endpoints, improving performance, reliability, scalability, fault tolerance and code maintainability.',
    'Collaborated in an Agile/Scrum environment through sprint planning, design discussions, peer code reviews and continuous software delivery using automated CI/CD pipelines.',
  ],
};

export const flagshipProjects = [
  {
    name: 'GoProxyX',
    flow: ['Client', 'JWT auth', 'Token bucket', 'Reverse proxy', 'Services'],
    stack: 'Go \u00b7 Redis \u00b7 Docker \u00b7 Reverse Proxy \u00b7 REST API',
    github: 'https://github.com/RameshwariS',
    bullets: [
      'Built a production-grade API Gateway serving as a scalable entry point for distributed microservices and client requests.',
      'Implemented JWT authentication with middleware chaining to enable secure request processing and modular software design.',
      'Designed a Redis-backed Token Bucket rate limiter to improve scalability and protect distributed systems from abusive traffic.',
      'Implemented dynamic reverse proxy routing for distributed multi-tier services, enabling efficient request forwarding.',
      'Containerized services using Docker with isolated networking and gateway exposure for scalable deployment.',
    ],
  },
  {
    name: 'DSV \u2014 Dataset Versioning System',
    flow: ['Dataset', 'Snapshot', 'Run', 'Metrics', 'Compare'],
    stack: 'Python \u00b7 CLI \u00b7 ML Experiment Tracking',
    badge: 'Finalist \u00b7 WCE ACM Hackathon 2026',
    github: 'https://github.com/RameshwariS',
    bullets: [
      'Engineered a lightweight, file-first toolkit to improve reproducibility in machine learning workflows.',
      'Built a mechanism to track and version experiment inputs, workflows and outputs including datasets, parameters and model artifacts.',
      'Delivered run-level tracking with full context to ensure reproducibility, simplify comparisons and support auditability.',
      'Structured metadata, metrics and artifacts consistently to streamline debugging and performance evaluation.',
    ],
  },
  {
    name: 'Movie Booking Site',
    flow: ['Browse', 'Showtime', 'Seats', 'Payment', 'Review'],
    stack: 'React (Vite) \u00b7 Node.js \u00b7 Express.js \u00b7 MongoDB Atlas \u00b7 REST API',
    github: 'https://github.com/RameshwariS/MOVIE_BOOKING',
    bullets: [
      'Built a full-stack movie booking platform supporting movies, theatres, showtimes, seat booking, payments and reviews.',
      'Designed a RESTful API across 6 resource domains with role-based authorization for USER, ADMIN, and THEATER_OWNER roles using JWT.',
      'Integrated Google OAuth 2.0 via Google Identity Services with secure server-side ID token verification.',
      'Architected a modular MVC backend with separated controllers, services, routes and middleware layers.',
    ],
  },
];

export const otherProjects = [
  {
    name: 'AgriSeva',
    stack: 'React.js \u00b7 Express.js \u00b7 TensorFlow.js \u00b7 NVIDIA APIs',
    badge: '1st Place \u00b7 WCE ACM 2025',
    github: 'https://github.com/Nandinipatil1410/WCEHackathon2025_TeamAnvesha',
    live: 'https://agriseva.vercel.app/',
    bullets: [
      'AI-powered plant disease detection processing 1,200+ images across 12 crop diseases.',
      'Integrated crop suggestions using soil input and live weather signals.',
      'Added multilingual government scheme explorer and chatbot assistance.',
    ],
  },
  {
    name: 'Blogify',
    stack: 'Node.js \u00b7 Express.js \u00b7 MongoDB \u00b7 EJS',
    github: 'https://github.com/RameshwariS/Blog',
    live: 'https://blogify-oz95.onrender.com/',
    bullets: [
      'Full-featured blog platform with user auth, post creation, editing and deletion.',
      'Server-side rendering with EJS for fast initial page loads.',
    ],
  },
  {
    name: 'URL Shortener',
    stack: 'Node.js \u00b7 Express.js \u00b7 MongoDB \u00b7 EJS',
    github: 'https://github.com/RameshwariS/URL-Shortner',
    bullets: [
      'Short-link generation with fast and reliable redirection logic.',
      'Input validation, error handling and MongoDB persistence for reliable link mappings.',
    ],
  },
];

export const skillCategories = [
  { title: 'Languages', items: ['Java', 'C++', 'JavaScript', 'Python', 'Go', 'SQL'] },
  { title: 'Backend', items: ['Spring Boot', 'Node.js', 'Express.js', 'REST APIs', 'Microservices', 'Redis'] },
  { title: 'Frontend', items: ['HTML5', 'CSS3', 'React.js', 'EJS'] },
  { title: 'Databases', items: ['MongoDB', 'MySQL', 'PostgreSQL'] },
  { title: 'Tools & Platforms', items: ['Git', 'GitHub', 'Linux', 'Docker', 'Firebase'] },
  {
    title: 'Coursework',
    items: ['DSA', 'OOP', 'Software Engineering', 'OS', 'DBMS', 'Networks', 'ML', 'Cloud'],
  },
];

export const leadership = {
  role: 'Main Program Director',
  org: "Walchand Linux Users' Group (WLUG)",
  period: 'May 2025 \u2013 Present',
  bullets: [
    'Delivered a session on Golang at Metamorphosis 2k26 (Docker & Golang), engaging 180+ participants.',
    'Conducted a session at LinuxDiary 5.0 promoting Linux and open-source culture; led 5+ hands-on workshops.',
    'Coordinated 3 flagship open-source events: Open Source Day 2k26, LinuxDiary 6.0, and Metamorphosis 2k26.',
    'Presented an episode of FOSS FILES Season 6 on Anycast and DNS routing in modern web architecture.',
  ],
};

export const achievements = [
  'AWS Educate \u2014 Introduction to Cloud 101 certification badge.',
  '1st Place \u00b7 WCE ACM Hackathon 2025 (Novice Track) \u2014 AI-powered plant disease detection, ranked 1st among 20+ teams.',
  '1st Place \u00b7 TechFusion CodeDuet 2025 pair-programming contest.',
  'Finalist \u00b7 WCE ACM Hackathon 2026 (Expert Track) for the DSV project.',
  'Top 450 of 2,300+ participants \u00b7 ICPC AlgoQueen 2025.',
];

export const education = {
  college: 'Walchand College of Engineering, Sangli, Maharashtra',
  degree: 'B.Tech in Computer Science and Engineering',
  period: '2023 \u2013 2027',
  cgpa: '8.69 / 10',
  secondary: [
    { name: 'LGRPKP College', details: 'HSC: 88.3% | MHT-CET: 99.65 Percentile', year: '2023' },
    { name: 'RSK School', details: 'SSC: 92.4%', year: '2021' },
  ],
};

export const profileLinks = {
  email: 'rameshwaris1112@gmail.com',
  phone: '+91 7875743747',
  linkedin: 'https://www.linkedin.com/in/rameshwari-satpute-8068322a6/',
  github: 'https://github.com/RameshwariS',
  leetcode: 'https://leetcode.com/u/shrutisatpute1112/',
  codolio: 'https://codolio.com/profile/shruti1',
};

export const navItems = [
  { id: 'about', label: 'About', method: 'GET' },
  { id: 'work', label: 'Work', method: 'GET' },
  { id: 'projects', label: 'Projects', method: 'GET' },
  { id: 'skills', label: 'Skills', method: 'GET' },
  { id: 'contact', label: 'Contact', method: 'POST' },
];

export const rotatingWords = ['backends', 'REST APIs', 'gateways', 'web apps', 'dev tools'];

export const numbers = [
  { value: 8.69, decimals: 2, suffix: '', label: 'CGPA, B.Tech CSE' },
  { value: 750, decimals: 0, suffix: '+', label: 'LeetCode problems' },
  { value: 97, decimals: 0, suffix: '%', label: 'Test coverage at UBS' },
  { value: 180, decimals: 0, suffix: '+', label: 'People at my Go talk' },
];

export const aboutText =
  "I'm a Computer Science student at Walchand College of Engineering who likes the unglamorous parts of software: clean service boundaries, honest tests and APIs that keep working under load. I interned at UBS on Spring Boot services, build Go and Redis tooling on the side, and run open-source events at WLUG.";

// Career timeline drawn as trace spans (fractional years; end: null = ongoing).
export const spans = [
  { label: 'B.Tech CSE', org: 'WCE Sangli', when: '2023 \u2013 2027', start: 2023.5, end: 2027.5 },
  { label: 'Main Program Director', org: 'WLUG', when: 'May 2025 \u2013 now', start: 2025.33, end: null },
  { label: 'SWE Intern', org: 'UBS', when: 'Jun \u2013 Jul 2026', start: 2026.42, end: 2026.58 },
];
