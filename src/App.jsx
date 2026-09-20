import { useEffect, useState } from 'react';

// Resume Data
const experience = {
  company: 'UBS, Pune',
  role: 'Software Engineering Intern',
  period: 'Jun 2026 – Jul 2026 (2 months)',
  location: 'Pune, India',
  stack: ['Java', 'Spring Boot', 'REST APIs', 'JUnit', 'Mockito', 'CI/CD', 'Agile/Scrum'],
  bullets: [
    'Refactored and developed scalable REST APIs in Java using Spring Boot for a modular multi-tier service architecture following controller-service-repository design principles.',
    'Developed comprehensive unit and integration tests using JUnit and Mockito, achieving 97% code coverage while improving software quality and maintainability.',
    'Debugged, optimized and enhanced production data-service endpoints, improving performance, reliability, scalability, fault tolerance and code maintainability.',
    'Collaborated in an Agile/Scrum environment through sprint planning, design discussions, peer code reviews and continuous software delivery using automated CI/CD pipelines.',
  ],
};

const flagshipProjects = [
  {
    name: 'GoProxyX',
    stack: 'Go, Redis, Docker, Reverse Proxy, REST API',
    github: 'https://github.com/RameshwariS',
    bullets: [
      'Built a production-grade API Gateway serving as a scalable entry point for distributed microservices and client requests.',
      'Implemented JWT authentication with middleware chaining to enable secure request processing and modular software design.',
      'Designed a Redis-backed Token Bucket rate limiter to improve scalability, optimize throughput and protect distributed systems from abusive traffic.',
      'Implemented dynamic reverse proxy routing for distributed multi-tier services, enabling efficient request forwarding and service communication.',
      'Integrated centralized logging, validation, and error handling to improve observability, debugging, and software reliability.',
      'Containerized services using Docker with isolated networking and gateway exposure for scalable deployment.',
    ],
  },
  {
    name: 'DSV (Dataset Versioning System)',
    stack: 'Python, CLI, ML Experiment Tracking',
    badge: 'Finalist, WCE ACM Hackathon 2026',
    github: 'https://github.com/RameshwariS',
    bullets: [
      'Engineered a lightweight, file-first toolkit to improve reproducibility in machine learning workflows without heavy infrastructure.',
      'Built a mechanism to track and version experiment inputs, workflows and outputs, including datasets, preprocessing steps, parameters and model artifacts.',
      'Delivered run-level tracking with full context to ensure reproducibility, simplify comparisons, and support auditability.',
      'Structured metadata, metrics, and artifacts consistently to streamline debugging and performance evaluation.',
      'Improved experiment management and collaboration through a clear and traceable development history.',
    ],
  },
  {
    name: 'Movie Booking Site',
    stack: 'React (Vite), Node.js, Express.js, MongoDB Atlas, RESTful API',
    github: 'https://github.com/RameshwariS/MOVIE_BOOKING',
    live: 'https://github.com/RameshwariS/MOVIE_BOOKING',
    bullets: [
      'Built a full-stack movie booking platform using React (Vite), Node.js/Express, and MongoDB Atlas, supporting movies, theatres, showtimes, seat booking, payments, and reviews.',
      'Designed a RESTful API across 6 resource domains with role-based authorization for USER, ADMIN, and THEATER_OWNER roles using JWT.',
      'Integrated Google OAuth 2.0 via Google Identity Services (GIS) with secure server-side ID token verification using google-auth-library.',
      'Architected a modular MVC backend with separated controllers, services, routes, and middleware layers (verifyToken, requireAdmin, requireOwner).',
    ],
  },
];

const otherProjects = [
  {
    name: 'AgriSeva',
    stack: 'React.js, Express.js, TensorFlow.js, NVIDIA APIs',
    badge: '1st Place, WCE ACM Hackathon 2025',
    github: 'https://github.com/Nandinipatil1410/WCEHackathon2025_TeamAnvesha',
    live: 'https://agriseva.vercel.app/',
    bullets: [
      'Built AI-powered plant disease detection processing 1,200+ images across 12 crop diseases.',
      'Integrated crop suggestions using soil input and live weather signals.',
      'Added multilingual government scheme explorer and chatbot assistance.',
    ],
  },
  {
    name: 'Blogify',
    stack: 'Node.js, Express.js, MongoDB, EJS',
    github: 'https://github.com/RameshwariS/Blog',
    live: 'https://blogify-oz95.onrender.com/',
    bullets: [
      'Built and deployed a full-stack blogging platform with auth, image uploads, and comments.',
      'Implemented secure password hashing and a responsive mobile interface.',
      'Hosted live deployment on Render.',
    ],
  },
  {
    name: 'Paste - Notes App',
    stack: 'React.js, Redux Toolkit, LocalStorage',
    github: 'https://github.com/RameshwariS/PasteApp',
    live: 'https://paste-app-one-lime.vercel.app/',
    bullets: [
      'Built a responsive note management app with create, edit, search, and copy workflows.',
      'Used Redux Toolkit for centralized state and predictable updates.',
      'Enabled local persistence through localStorage.',
    ],
  },
  {
    name: 'URL Shortener',
    stack: 'Node.js, Express.js, MongoDB, EJS',
    github: 'https://github.com/RameshwariS/URL-Shortner',
    bullets: [
      'Developed short-link generation with fast and reliable redirection logic.',
      'Added input validation and error handling for stable user experience.',
      'Integrated MongoDB persistence for reliable link mappings.',
    ],
  },
];

const skillCategories = [
  {
    title: 'Programming Languages',
    items: ['Java', 'C++', 'JavaScript', 'Python', 'Go', 'SQL'],
  },
  {
    title: 'Backend Development',
    items: ['Spring Boot', 'Node.js', 'Express.js', 'REST APIs', 'Microservices', 'Redis'],
  },
  {
    title: 'Frontend Development',
    items: ['HTML5', 'CSS3', 'React.js', 'EJS'],
  },
  {
    title: 'Databases',
    items: ['MongoDB', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'Tools & Platforms',
    items: ['Git', 'GitHub', 'Linux', 'Docker', 'Firebase'],
  },
  {
    title: 'Coursework',
    items: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Software Engineering',
      'Operating Systems',
      'DBMS',
      'Computer Networks',
      'Machine Learning',
      'Cloud Computing',
    ],
  },
];

const leadership = {
  role: 'Main Program Director',
  org: "Walchand Linux Users' Group (WLUG)",
  period: 'May 2025 – Present',
  bullets: [
    'Delivered a session on Golang at Metamorphosis 2k26, a two-day event focused on Docker and Golang, engaging 180+ participants.',
    'Conducted a session at LinuxDiary 5.0, a two-day event promoting Linux and open-source culture, and led 5+ hands-on workshops and community initiatives.',
    'Coordinated 3 flagship open-source events: Open Source Day 2k26, LinuxDiary 6.0, and Metamorphosis 2k26.',
    'Presented an episode of FOSS FILES Season 6 on Anycast and DNS routing in modern web architecture.',
  ],
};

const achievements = [
  'Earned the AWS Educate – Introduction to Cloud 101 certification badge.',
  'Won 1st place in WCE ACM Hackathon 2025 (Novice Track): engineered an AI-powered plant disease detection solution, ranking 1st among 20+ teams.',
  'Won 1st place in TechFusion CodeDuet 2025 pair-programming contest, demonstrating teamwork and algorithmic problem-solving under time pressure.',
  'Named a finalist in WCE ACM Hackathon 2026 (Expert Track) for the DSV (Dataset Versioning System) project.',
  'Ranked in the top 450 of 2,300+ participants in ICPC AlgoQueen 2025.',
];

const education = {
  college: 'Walchand College of Engineering, Sangli, Maharashtra',
  degree: 'B.Tech in Computer Science and Engineering',
  period: '2023 – 2027',
  cgpa: '8.69 / 10',
  secondary: [
    { name: 'LGRPKP College', details: 'HSC: 88.3% | MHT-CET: 99.65 Percentile', year: '2023' },
    { name: 'RSK School', details: 'SSC: 92.4%', year: '2021' },
  ],
};

const profileLinks = {
  email: 'rameshwaris1112@gmail.com',
  phone: '+91 7875743747',
  linkedin: 'https://www.linkedin.com/in/rameshwari-satpute-8068322a6/',
  github: 'https://github.com/RameshwariS',
  leetcode: 'https://leetcode.com/u/shrutisatpute1112/',
  codolio: 'https://codolio.com/profile/shruti1',
};

const typingPhrases = [
  'Software Engineering Intern at UBS.',
  'B.Tech CSE at Walchand College of Engineering (CGPA 8.69).',
  'Main Program Director at Walchand Linux Users\' Group (WLUG).',
  'Solved 750+ problems on LeetCode (Rating 1745, Top 10%).',
  'Building backend APIs, distributed systems, and web apps.',
];

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('retro-theme') || 'cyber-neon';
  });
  const [scanlines, setScanlines] = useState(true);
  const [projectTab, setProjectTab] = useState('featured'); // 'featured' | 'all'

  // Typing effect
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // CLI modal
  const [cliOpen, setCliOpen] = useState(false);
  const [cliInput, setCliInput] = useState('');
  const [cliLogs, setCliLogs] = useState([
    'Rameshwari Satpute — Portfolio Terminal',
    'Type "help" to see commands, or "cat resume" for summary.',
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('retro-theme', theme);
  }, [theme]);

  // Typing effect loop
  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];
    const speed = isDeleting ? 25 : 50;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = currentPhrase.slice(0, typedText.length + 1);
        setTypedText(next);
        if (next === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        const next = currentPhrase.slice(0, Math.max(typedText.length - 1, 0));
        setTypedText(next);
        if (next.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [typedText, phraseIndex, isDeleting]);

  // Keyboard shortcut `~` to toggle CLI
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '`') {
        e.preventDefault();
        setCliOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setCliOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Intersection observer for section reveals
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projectTab]);

  const handleCliSubmit = (e) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...cliLogs, `$ ${cliInput.trim()}`];

    if (cmd === 'help') {
      newLogs.push(
        'Available commands:',
        '  cat resume    - View summary resume details',
        '  experience    - View UBS internship experience',
        '  projects      - List key projects',
        '  skills        - List technical skills',
        '  leadership    - View WLUG leadership details',
        '  achievements  - View awards and achievements',
        '  contact       - View contact info',
        '  theme <name>  - Switch theme (cyber, matrix, amber, synthwave)',
        '  clear         - Clear terminal screen',
        '  exit          - Close terminal'
      );
    } else if (cmd === 'cat resume' || cmd === 'resume') {
      newLogs.push(
        'Rameshwari Rajendra Satpute',
        '• Education: B.Tech CSE @ Walchand College of Engg (CGPA: 8.69/10)',
        '• Experience: Software Engineering Intern @ UBS, Pune (Jun 2026 – Jul 2026)',
        '• Projects: GoProxyX (Go/Redis), DSV (Python/CLI), Movie Booking Site',
        '• LeetCode: 750+ Solved, Rating 1745 (Top 10%)',
        '• Leadership: Main Program Director @ WLUG'
      );
    } else if (cmd === 'experience') {
      newLogs.push(
        'UBS, Pune — Software Engineering Intern (Jun 2026 – Jul 2026)',
        '• Refactored & developed scalable REST APIs in Java using Spring Boot (controller-service-repository).',
        '• Wrote unit/integration tests with JUnit & Mockito (97% code coverage).',
        '• Optimized production data-service endpoints in Agile/Scrum with CI/CD delivery.'
      );
    } else if (cmd === 'projects') {
      newLogs.push(
        '1. GoProxyX — API Gateway & Reverse Proxy (Go, Redis, Docker, JWT)',
        '2. DSV — Dataset Versioning System (Python, CLI, ML Experiment Tracking)',
        '3. Movie Booking Site — Full-Stack Booking Platform (React, Node, Express, MongoDB)'
      );
    } else if (cmd === 'skills') {
      newLogs.push(
        'Languages: Java, C++, JavaScript, Python, Go, SQL',
        'Backend: Spring Boot, Node.js, Express.js, REST APIs, Microservices, Redis',
        'Frontend: HTML5, CSS3, React.js, EJS',
        'Databases: MongoDB, MySQL, PostgreSQL',
        'Tools: Git, GitHub, Linux, Docker, Firebase'
      );
    } else if (cmd === 'leadership') {
      newLogs.push(
        'Main Program Director, Walchand Linux Users\' Group (WLUG)',
        '• Speaker at Metamorphosis 2k26 (Golang & Docker, 180+ participants)',
        '• Speaker at LinuxDiary 5.0 & coordinator of 3 flagship events',
        '• Featured on FOSS FILES Season 6 (Anycast & DNS routing)'
      );
    } else if (cmd === 'achievements') {
      newLogs.push(
        '• AWS Educate — Introduction to Cloud 101 certification badge',
        '• 1st Place: WCE ACM Hackathon 2025 (Novice Track)',
        '• 1st Place: TechFusion CodeDuet 2025',
        '• Finalist: WCE ACM Hackathon 2026 (Expert Track) for DSV',
        '• Top 450: ICPC AlgoQueen 2025'
      );
    } else if (cmd === 'contact') {
      newLogs.push(
        'Email: rameshwaris1112@gmail.com',
        'Phone: +91 7875743747',
        'LinkedIn: https://www.linkedin.com/in/rameshwari-satpute-8068322a6/',
        'GitHub: https://github.com/RameshwariS',
        'LeetCode: https://leetcode.com/u/shrutisatpute1112/'
      );
    } else if (cmd.startsWith('theme ')) {
      const t = cmd.split(' ')[1];
      const valid = {
        cyber: 'cyber-neon',
        matrix: 'matrix-green',
        amber: 'amber-crt',
        synthwave: 'synthwave',
      };
      if (valid[t]) {
        setTheme(valid[t]);
        newLogs.push(`Theme changed to ${valid[t]}`);
      } else {
        newLogs.push('Available: cyber, matrix, amber, synthwave');
      }
    } else if (cmd === 'clear') {
      setCliLogs([]);
      setCliInput('');
      return;
    } else if (cmd === 'exit') {
      setCliOpen(false);
      setCliInput('');
      return;
    } else {
      newLogs.push(`Unknown command: "${cmd}". Type "help" for a list of commands.`);
    }

    setCliLogs(newLogs);
    setCliInput('');
  };

  return (
    <div className={`app-shell ${scanlines ? 'has-scanlines' : ''}`}>
      {/* Background Ambience */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-perspective" aria-hidden="true">
        <div className="perspective-plane" />
      </div>

      {scanlines && <div className="scanlines-layer" aria-hidden="true" />}

      {/* Top Navbar / HUD */}
      <nav className="top-nav">
        <div className="nav-title">
          <span className="live-dot" />
          <span>RAMESHWARI SATPUTE</span>
          <span className="nav-sep">/</span>
          <span className="nav-role">PORTFOLIO</span>
        </div>

        <div className="nav-controls">
          <button
            className="control-btn"
            onClick={() => setScanlines(!scanlines)}
            title="Toggle CRT scanline overlay"
          >
            CRT: {scanlines ? 'ON' : 'OFF'}
          </button>

          <button
            className="control-btn cli-btn"
            onClick={() => setCliOpen(!cliOpen)}
            title="Open terminal CLI (press `)"
          >
            &gt;_ CLI
          </button>

          <div className="theme-toggle">
            <button
              className={`theme-btn ${theme === 'cyber-neon' ? 'active' : ''}`}
              onClick={() => setTheme('cyber-neon')}
            >
              Cyber
            </button>
            <button
              className={`theme-btn ${theme === 'matrix-green' ? 'active' : ''}`}
              onClick={() => setTheme('matrix-green')}
            >
              Matrix
            </button>
            <button
              className={`theme-btn ${theme === 'amber-crt' ? 'active' : ''}`}
              onClick={() => setTheme('amber-crt')}
            >
              Amber
            </button>
            <button
              className={`theme-btn ${theme === 'synthwave' ? 'active' : ''}`}
              onClick={() => setTheme('synthwave')}
            >
              Synth
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {/* HERO WINDOW */}
        <section className="window hero-window reveal">
          <div className="window-bar">
            <div className="window-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="bar-title">about.txt</span>
            <span className="bar-status">STATUS: AVAILABLE</span>
          </div>

          <div className="window-inner hero-inner">
            <h1 className="hero-name">Rameshwari Rajendra Satpute</h1>

            <div className="typing-container">
              <span className="typing-prompt">&gt;</span>
              <span className="typing-text">{typedText}</span>
              <span className="typing-caret" />
            </div>

            <p className="hero-summary">
              B.Tech Computer Science student at <strong>Walchand College of Engineering</strong> with industry experience
              at <strong>UBS</strong> developing modular Spring Boot REST APIs with 97% test coverage. Experienced in building
              distributed backend services, Go/Redis microservices, and leading 180+ developers as Main Program Director at WLUG.
            </p>

            {/* Quick Metrics Bar */}
            <div className="metrics-row">
              <div className="metric-box">
                <span className="metric-title">CGPA</span>
                <strong className="metric-data accent">8.69 / 10</strong>
                <span className="metric-sub">Walchand College of Engg</span>
              </div>
              <div className="metric-box">
                <span className="metric-title">EXPERIENCE</span>
                <strong className="metric-data">SWE Intern</strong>
                <span className="metric-sub">UBS, Pune (Summer 2026)</span>
              </div>
              <div className="metric-box">
                <span className="metric-title">LEETCODE</span>
                <strong className="metric-data accent">750+ Solved</strong>
                <span className="metric-sub">Rating: 1745 (Top 10%)</span>
              </div>
              <div className="metric-box">
                <span className="metric-title">LEADERSHIP</span>
                <strong className="metric-data">Director</strong>
                <span className="metric-sub">Walchand Linux Users' Group</span>
              </div>
            </div>

            {/* Contact & Profile Links */}
            <div className="links-row">
              <a href={`mailto:${profileLinks.email}`} className="btn btn-primary">
                Email
              </a>
              <a href={`tel:${profileLinks.phone}`} className="btn">
                Phone
              </a>
              <a href={profileLinks.github} target="_blank" rel="noreferrer" className="btn">
                GitHub
              </a>
              <a href={profileLinks.linkedin} target="_blank" rel="noreferrer" className="btn">
                LinkedIn
              </a>
              <a href={profileLinks.leetcode} target="_blank" rel="noreferrer" className="btn">
                LeetCode
              </a>
              <a href={profileLinks.codolio} target="_blank" rel="noreferrer" className="btn">
                Codolio
              </a>
            </div>
          </div>
        </section>

        {/* MARQUEE BANNER */}
        <div className="ticker-container" aria-hidden="true">
          <div className="ticker-track">
            <span>Java</span>
            <span className="sep">•</span>
            <span>Spring Boot</span>
            <span className="sep">•</span>
            <span>Go</span>
            <span className="sep">•</span>
            <span>Redis</span>
            <span className="sep">•</span>
            <span>Docker</span>
            <span className="sep">•</span>
            <span>React.js</span>
            <span className="sep">•</span>
            <span>Node.js</span>
            <span className="sep">•</span>
            <span>Express.js</span>
            <span className="sep">•</span>
            <span>MongoDB</span>
            <span className="sep">•</span>
            <span>Python</span>
            <span className="sep">•</span>
            <span>Linux</span>
            <span className="sep">•</span>
            <span>REST APIs</span>
            <span className="sep">•</span>
            <span>Java</span>
            <span className="sep">•</span>
            <span>Spring Boot</span>
            <span className="sep">•</span>
            <span>Go</span>
            <span className="sep">•</span>
            <span>Redis</span>
            <span className="sep">•</span>
            <span>Docker</span>
            <span className="sep">•</span>
            <span>React.js</span>
            <span className="sep">•</span>
            <span>Node.js</span>
            <span className="sep">•</span>
            <span>Express.js</span>
            <span className="sep">•</span>
            <span>MongoDB</span>
            <span className="sep">•</span>
            <span>Python</span>
            <span className="sep">•</span>
            <span>Linux</span>
            <span className="sep">•</span>
            <span>REST APIs</span>
          </div>
        </div>

        {/* EXPERIENCE SECTION */}
        <section className="window reveal">
          <div className="window-bar">
            <div className="window-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="bar-title">experience.log</span>
          </div>

          <div className="window-inner">
            <div className="exp-top">
              <div>
                <h2 className="section-heading">{experience.role}</h2>
                <h3 className="company-heading">{experience.company}</h3>
              </div>
              <div className="exp-meta">
                <span className="meta-badge">{experience.period}</span>
                <span className="meta-loc">{experience.location}</span>
              </div>
            </div>

            <div className="tag-list">
              {experience.stack.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>

            <ul className="bullet-list">
              {experience.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section className="window reveal">
          <div className="window-bar">
            <div className="window-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="bar-title">projects/</span>
            <div className="tab-group">
              <button
                className={`tab-link ${projectTab === 'featured' ? 'active' : ''}`}
                onClick={() => setProjectTab('featured')}
              >
                Featured Projects
              </button>
              <button
                className={`tab-link ${projectTab === 'all' ? 'active' : ''}`}
                onClick={() => setProjectTab('all')}
              >
                All Projects
              </button>
            </div>
          </div>

          <div className="window-inner">
            <div className="cards-grid">
              {flagshipProjects.map((p) => (
                <div key={p.name} className="project-card">
                  <div className="card-top">
                    <h3 className="project-title">{p.name}</h3>
                    {p.badge && <span className="small-badge">{p.badge}</span>}
                  </div>
                  <p className="project-stack">{p.stack}</p>

                  <div className="card-links">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-sm">
                        GitHub
                      </a>
                    )}
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
                        Live Demo
                      </a>
                    )}
                  </div>

                  <ul className="bullet-list project-bullets">
                    {p.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {projectTab === 'all' &&
                otherProjects.map((p) => (
                  <div key={p.name} className="project-card">
                    <div className="card-top">
                      <h3 className="project-title">{p.name}</h3>
                      {p.badge && <span className="small-badge">{p.badge}</span>}
                    </div>
                    <p className="project-stack">{p.stack}</p>

                    <div className="card-links">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-sm">
                          GitHub
                        </a>
                      )}
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">
                          Live Demo
                        </a>
                      )}
                    </div>

                    <ul className="bullet-list project-bullets">
                      {p.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* TECHNICAL SKILLS */}
        <section className="window reveal">
          <div className="window-bar">
            <div className="window-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="bar-title">skills.json</span>
          </div>

          <div className="window-inner">
            <div className="skills-grid">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="skill-group">
                  <h3 className="skill-cat-title">{cat.title}</h3>
                  <div className="tag-list">
                    {cat.items.map((item) => (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEADERSHIP SECTION */}
        <section className="window reveal">
          <div className="window-bar">
            <div className="window-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="bar-title">leadership.md</span>
          </div>

          <div className="window-inner">
            <div className="exp-top">
              <div>
                <h2 className="section-heading">{leadership.role}</h2>
                <h3 className="company-heading">{leadership.org}</h3>
              </div>
              <span className="meta-badge">{leadership.period}</span>
            </div>

            <ul className="bullet-list">
              {leadership.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* CODING PROFILE & HEATMAPS */}
        <section className="window reveal">
          <div className="window-bar">
            <div className="window-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="bar-title">coding-profile.log</span>
          </div>

          <div className="window-inner">
            <div className="metrics-row coding-metrics">
              <div className="metric-box">
                <span className="metric-title">LEETCODE</span>
                <strong className="metric-data accent">750+ Solved</strong>
                <span className="metric-sub">Rating: 1745 (Top 10%)</span>
                <a href={profileLinks.leetcode} target="_blank" rel="noreferrer" className="text-link">
                  View LeetCode Profile ↗
                </a>
              </div>
              <div className="metric-box">
                <span className="metric-title">CODOLIO</span>
                <strong className="metric-data">Competitive Profile</strong>
                <span className="metric-sub">Verified problem record</span>
                <a href={profileLinks.codolio} target="_blank" rel="noreferrer" className="text-link">
                  View Codolio Profile ↗
                </a>
              </div>
              <div className="metric-box">
                <span className="metric-title">GITHUB</span>
                <strong className="metric-data accent">Repositories</strong>
                <span className="metric-sub">Open source & microservices</span>
                <a href={profileLinks.github} target="_blank" rel="noreferrer" className="text-link">
                  View GitHub Profile ↗
                </a>
              </div>
            </div>

            <div className="heatmaps-container">
              <div className="heatmap-card">
                <div className="heatmap-title-row">
                  <span>GitHub Contributions</span>
                  <a href={profileLinks.github} target="_blank" rel="noreferrer" className="text-link">
                    @RameshwariS
                  </a>
                </div>
                <div className="chart-wrapper">
                  <img
                    src="https://ghchart.rshah.org/00f0ff/RameshwariS"
                    alt="GitHub Contributions"
                    className="chart-img"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="heatmap-card">
                <div className="heatmap-title-row">
                  <span>LeetCode Activity</span>
                  <a href={profileLinks.leetcode} target="_blank" rel="noreferrer" className="text-link">
                    @shrutisatpute1112
                  </a>
                </div>
                <div className="chart-wrapper">
                  <img
                    src="https://leetcard.jacoblin.cool/shrutisatpute1112?theme=dark&font=Share%20Tech%20Mono&ext=heatmap"
                    alt="LeetCode Heatmap"
                    className="chart-img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="window reveal">
          <div className="window-bar">
            <div className="window-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="bar-title">achievements.txt</span>
          </div>

          <div className="window-inner">
            <ul className="bullet-list">
              {achievements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="window reveal">
          <div className="window-bar">
            <div className="window-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="bar-title">education.txt</span>
          </div>

          <div className="window-inner">
            <div className="edu-block">
              <div className="exp-top">
                <div>
                  <h2 className="section-heading">{education.degree}</h2>
                  <h3 className="company-heading">{education.college}</h3>
                </div>
                <div className="exp-meta">
                  <span className="meta-badge">{education.period}</span>
                  <span className="meta-badge accent-badge">CGPA: {education.cgpa}</span>
                </div>
              </div>

              <div className="secondary-edu">
                {education.secondary.map((s, i) => (
                  <div key={i} className="sec-edu-item">
                    <strong>{s.name}</strong> ({s.year}) — <span>{s.details}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="window footer-window reveal">
          <div className="window-bar">
            <div className="window-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="bar-title">contact.sh</span>
          </div>

          <div className="window-inner">
            <h2 className="section-heading">Contact</h2>
            <p className="contact-subtitle">
              Feel free to connect for software engineering opportunities, backend development, or collaborations.
            </p>

            <div className="contact-grid">
              <a href={`mailto:${profileLinks.email}`} className="contact-card">
                <span className="contact-type">Email</span>
                <strong className="contact-detail">{profileLinks.email}</strong>
              </a>
              <a href={`tel:${profileLinks.phone}`} className="contact-card">
                <span className="contact-type">Phone</span>
                <strong className="contact-detail">{profileLinks.phone}</strong>
              </a>
              <a href={profileLinks.linkedin} target="_blank" rel="noreferrer" className="contact-card">
                <span className="contact-type">LinkedIn</span>
                <strong className="contact-detail">linkedin.com/in/rameshwari-satpute</strong>
              </a>
              <a href={profileLinks.github} target="_blank" rel="noreferrer" className="contact-card">
                <span className="contact-type">GitHub</span>
                <strong className="contact-detail">github.com/RameshwariS</strong>
              </a>
            </div>

            <div className="footer-bar">
              <span>© {new Date().getFullYear()} Rameshwari Rajendra Satpute</span>
              <span>Walchand College of Engineering, Sangli</span>
            </div>
          </div>
        </section>
      </main>

      {/* CLI MODAL */}
      {cliOpen && (
        <div className="modal-backdrop" onClick={() => setCliOpen(false)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="window-bar">
              <div className="window-dots">
                <span className="dot red" onClick={() => setCliOpen(false)} />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="bar-title">terminal.sh</span>
              <button className="close-btn" onClick={() => setCliOpen(false)}>
                ✕
              </button>
            </div>

            <div className="cli-body">
              <div className="cli-output">
                {cliLogs.map((log, index) => (
                  <div key={index} className="cli-line">
                    {log}
                  </div>
                ))}
              </div>

              <form className="cli-form" onSubmit={handleCliSubmit}>
                <span className="cli-prompt">&gt;</span>
                <input
                  type="text"
                  className="cli-input"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder="Type a command (help, cat resume, experience, projects)..."
                  autoFocus
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

