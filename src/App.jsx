import { useEffect, useState } from 'react';

// ── Resume Data ──────────────────────────────────────────────────────────
const experience = {
  company: 'UBS, Pune',
  role: 'Software Engineering Intern',
  period: 'Jun 2026 – Jul 2026',
  location: 'Pune, India',
  stack: ['Java', 'Spring Boot', 'REST APIs', 'JUnit', 'Mockito', 'CI/CD', 'Agile/Scrum'],
  metrics: [
    { label: 'Test Coverage', value: '97%', progress: 97 },
    { label: 'Architecture', value: 'Controller-Service-Repo', progress: 95 },
  ],
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
    stack: 'Go · Redis · Docker · Reverse Proxy · REST API',
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
    name: 'DSV — Dataset Versioning System',
    stack: 'Python · CLI · ML Experiment Tracking',
    badge: 'Finalist · WCE ACM Hackathon 2026',
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
    stack: 'React (Vite) · Node.js · Express.js · MongoDB Atlas · REST API',
    github: 'https://github.com/RameshwariS/MOVIE_BOOKING',
    live: 'https://github.com/RameshwariS/MOVIE_BOOKING',
    bullets: [
      'Built a full-stack movie booking platform supporting movies, theatres, showtimes, seat booking, payments and reviews.',
      'Designed a RESTful API across 6 resource domains with role-based authorization for USER, ADMIN, and THEATER_OWNER roles using JWT.',
      'Integrated Google OAuth 2.0 via Google Identity Services with secure server-side ID token verification.',
      'Architected a modular MVC backend with separated controllers, services, routes and middleware layers.',
    ],
  },
];

const otherProjects = [
  {
    name: 'AgriSeva',
    stack: 'React.js · Express.js · TensorFlow.js · NVIDIA APIs',
    badge: '1st Place · WCE ACM 2025',
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
    stack: 'Node.js · Express.js · MongoDB · EJS',
    github: 'https://github.com/RameshwariS/Blog',
    live: 'https://blogify-oz95.onrender.com/',
    bullets: [
      'Full-featured blog platform with user auth, post creation, editing and deletion.',
      'Server-side rendering with EJS for fast initial page loads.',
    ],
  },
  {
    name: 'URL Shortener',
    stack: 'Node.js · Express.js · MongoDB · EJS',
    github: 'https://github.com/RameshwariS/URL-Shortner',
    bullets: [
      'Short-link generation with fast and reliable redirection logic.',
      'Input validation, error handling and MongoDB persistence for reliable link mappings.',
    ],
  },
];

const skillCategories = [
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

const leadership = {
  role: 'Main Program Director',
  org: "Walchand Linux Users' Group (WLUG)",
  period: 'May 2025 – Present',
  bullets: [
    'Delivered a session on Golang at Metamorphosis 2k26 (Docker & Golang), engaging 180+ participants.',
    'Conducted a session at LinuxDiary 5.0 promoting Linux and open-source culture; led 5+ hands-on workshops.',
    'Coordinated 3 flagship open-source events: Open Source Day 2k26, LinuxDiary 6.0, and Metamorphosis 2k26.',
    'Presented an episode of FOSS FILES Season 6 on Anycast and DNS routing in modern web architecture.',
  ],
};

const achievements = [
  'AWS Educate — Introduction to Cloud 101 certification badge.',
  '1st Place · WCE ACM Hackathon 2025 (Novice Track) — AI-powered plant disease detection, ranked 1st among 20+ teams.',
  '1st Place · TechFusion CodeDuet 2025 pair-programming contest.',
  'Finalist · WCE ACM Hackathon 2026 (Expert Track) for the DSV project.',
  'Top 450 of 2,300+ participants · ICPC AlgoQueen 2025.',
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
  'B.Tech CSE @ Walchand College of Engineering.',
  'Main Program Director at WLUG.',
  '750+ LeetCode problems solved (Rating 1745, Top 10%).',
  'Building backend APIs, distributed systems & web apps.',
];

// ── App ──────────────────────────────────────────────────────────────────
function App() {
  const [projectTab, setProjectTab] = useState('featured');
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cliOpen, setCliOpen] = useState(false);
  const [cliInput, setCliInput] = useState('');
  const [cliLogs, setCliLogs] = useState([
    'Rameshwari Satpute — Portfolio Terminal',
    'Type "help" to see available commands.',
  ]);

  const particles = Array.from({ length: 12 }, (_, i) => i);

  // Mouse spotlight
  useEffect(() => {
    const onMove = (e) => {
      document.documentElement.style.setProperty('--mx', `${(e.clientX / window.innerWidth) * 100}%`);
      document.documentElement.style.setProperty('--my', `${(e.clientY / window.innerHeight) * 100}%`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Typing effect
  useEffect(() => {
    const phrase = typingPhrases[phraseIndex];
    const speed = isDeleting ? 22 : 48;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = phrase.slice(0, typedText.length + 1);
        setTypedText(next);
        if (next === phrase) setTimeout(() => setIsDeleting(true), 1200);
      } else {
        const next = phrase.slice(0, Math.max(typedText.length - 1, 0));
        setTypedText(next);
        if (next.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((p) => (p + 1) % typingPhrases.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [typedText, phraseIndex, isDeleting]);

  // ` key opens CLI
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '`') { e.preventDefault(); setCliOpen((p) => !p); }
      if (e.key === 'Escape') setCliOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Scroll reveals
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [projectTab]);

  // CLI submit
  const handleCliSubmit = (e) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;
    const logs = [...cliLogs, `$ ${cliInput.trim()}`];
    if (cmd === 'help') {
      logs.push('Commands: cat resume | experience | projects | skills | leadership | achievements | contact | clear | exit');
    } else if (cmd === 'cat resume' || cmd === 'resume') {
      logs.push('Rameshwari Rajendra Satpute', '• B.Tech CSE @ WCE Sangli (CGPA 8.69)', '• SWE Intern @ UBS Pune (Jun–Jul 2026)', '• GoProxyX · DSV · Movie Booking Site', '• LeetCode 750+, Rating 1745 (Top 10%)', '• WLUG Main Program Director');
    } else if (cmd === 'experience') {
      logs.push('UBS, Pune — SWE Intern (Jun–Jul 2026)', '• Spring Boot REST APIs (controller-service-repo pattern)', '• 97% test coverage via JUnit & Mockito', '• Agile/Scrum, CI/CD delivery');
    } else if (cmd === 'projects') {
      logs.push('1. GoProxyX — API Gateway (Go, Redis, Docker, JWT)', '2. DSV — Dataset Versioning (Python, CLI)', '3. Movie Booking Site (React, Node, Express, MongoDB)');
    } else if (cmd === 'skills') {
      logs.push('Languages: Java, C++, JS, Python, Go, SQL', 'Backend: Spring Boot, Node.js, Express.js, REST, Redis', 'Frontend: HTML5, CSS3, React.js', 'DB: MongoDB, MySQL, PostgreSQL', 'Tools: Git, Docker, Linux');
    } else if (cmd === 'leadership') {
      logs.push("Main Program Director, WLUG (May 2025–Present)", '• Metamorphosis 2k26 — Golang session (180+ attendees)', '• LinuxDiary 5.0 speaker + 5 workshops', '• FOSS FILES S6: Anycast & DNS routing');
    } else if (cmd === 'achievements') {
      logs.push('• AWS Educate Cloud 101', '• 1st Place WCE ACM 2025', '• 1st Place TechFusion CodeDuet 2025', '• Finalist WCE ACM 2026 (Expert Track)', '• Top 450 ICPC AlgoQueen 2025');
    } else if (cmd === 'contact') {
      logs.push(`Email: ${profileLinks.email}`, `Phone: ${profileLinks.phone}`, `LinkedIn: ${profileLinks.linkedin}`, `GitHub: ${profileLinks.github}`);
    } else if (cmd === 'clear') {
      setCliLogs([]); setCliInput(''); return;
    } else if (cmd === 'exit') {
      setCliOpen(false); setCliInput(''); return;
    } else {
      logs.push(`Unknown: "${cmd}". Type "help" for commands.`);
    }
    setCliLogs(logs);
    setCliInput('');
  };

  return (
    <div className="app-shell">
      {/* Background */}
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow" aria-hidden="true" />
      <div className="particles-layer" aria-hidden="true">
        {particles.map((i) => <span key={i} className="particle" />)}
      </div>

      {/* Navbar */}
      <nav className="top-nav">
        <div className="nav-brand">
          <span className="live-dot-wrap">
            <span className="live-dot" />
            <span className="live-ring" />
          </span>
          <span className="brand-name">Rameshwari Satpute</span>
          <span className="brand-sep">/</span>
          <span className="brand-role">Portfolio</span>
        </div>
        <div className="nav-actions">
          <button className="nav-btn cli-btn" onClick={() => setCliOpen(!cliOpen)} title="Open terminal (press `)">
            &gt;_ Terminal
          </button>
        </div>
      </nav>

      <main className="main-content">

        {/* HERO */}
        <section className="card reveal">
          <div className="card-bar">
            <div className="win-dots">
              <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
            </div>
            <span className="card-bar-title">about.txt</span>
            <span className="bar-badge">Available</span>
          </div>
          <div className="card-body hero-body">
            <h1 className="hero-name">Rameshwari Rajendra Satpute</h1>
            <div className="typing-wrap">
              <span className="typing-gt">&gt;</span>
              <span className="typed-text">{typedText}</span>
              <span className="caret" />
            </div>
            <p className="hero-summary">
              B.Tech Computer Science student at <strong>Walchand College of Engineering</strong> with industry
              experience at <strong>UBS</strong> building modular Spring Boot REST APIs with 97% test coverage.
              Experienced in distributed backend services, Go/Redis microservices, and leading open-source
              community events as Main Program Director at WLUG.
            </p>

            <div className="metric-row">
              <div className="metric-card">
                <span className="metric-label">CGPA</span>
                <strong className="metric-value hi">8.69 / 10</strong>
                <div className="metric-bar"><div className="metric-fill" style={{ width: '86.9%' }} /></div>
                <span className="metric-sub">Walchand College of Engg</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">EXPERIENCE</span>
                <strong className="metric-value">SWE Intern</strong>
                <div className="metric-bar"><div className="metric-fill" style={{ width: '97%' }} /></div>
                <span className="metric-sub">UBS, Pune · Summer 2026</span>
              </div>
              <div className="metric-card">
                <span className="metric-label">LEETCODE</span>
                <strong className="metric-value hi">750+ Solved</strong>
                <div className="metric-bar"><div className="metric-fill" style={{ width: '88%' }} /></div>
                <span className="metric-sub">Rating 1745 · Top 10%</span>
              </div>
            </div>

            <div className="links-row">
              <a href={`mailto:${profileLinks.email}`} className="btn btn-primary">Email</a>
              <a href={`tel:${profileLinks.phone}`} className="btn">Phone</a>
              <a href={profileLinks.github} target="_blank" rel="noreferrer" className="btn">GitHub</a>
              <a href={profileLinks.linkedin} target="_blank" rel="noreferrer" className="btn">LinkedIn</a>
              <a href={profileLinks.leetcode} target="_blank" rel="noreferrer" className="btn">LeetCode</a>
              <a href={profileLinks.codolio} target="_blank" rel="noreferrer" className="btn">Codolio</a>
            </div>
          </div>
        </section>

        {/* TICKER */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {['Java','Spring Boot','Go','Redis','Docker','React.js','Node.js','Express.js','MongoDB','Python','Linux','REST APIs','JUnit','Mockito','CI/CD','Git',
              'Java','Spring Boot','Go','Redis','Docker','React.js','Node.js','Express.js','MongoDB','Python','Linux','REST APIs'].map((t, i) => (
              <span key={i} className={i % 2 === 1 ? 'tick-sep' : ''}>{t}</span>
            ))}
          </div>
        </div>

        {/* EXPERIENCE */}
        <section className="card reveal">
          <div className="card-bar">
            <div className="win-dots">
              <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
            </div>
            <span className="card-bar-title">experience.log</span>
          </div>
          <div className="card-body">
            <div className="exp-header">
              <div>
                <h2 className="sec-title">{experience.role}</h2>
                <h3 className="sec-company">{experience.company}</h3>
              </div>
              <div className="exp-meta">
                <span className="badge">{experience.period}</span>
                <span className="meta-loc">{experience.location}</span>
              </div>
            </div>
            <div className="tag-list">
              {experience.stack.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
            <ul className="bullet-list">
              {experience.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="card reveal">
          <div className="card-bar">
            <div className="win-dots">
              <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
            </div>
            <span className="card-bar-title">projects/</span>
            <div className="tab-group">
              <button className={`tab ${projectTab === 'featured' ? 'tab-active' : ''}`} onClick={() => setProjectTab('featured')}>Featured</button>
              <button className={`tab ${projectTab === 'all' ? 'tab-active' : ''}`} onClick={() => setProjectTab('all')}>All</button>
            </div>
          </div>
          <div className="card-body">
            <div className="proj-grid">
              {flagshipProjects.map((p) => (
                <div key={p.name} className="proj-card">
                  <div className="beam" />
                  <div className="proj-top">
                    <h3 className="proj-name">{p.name}</h3>
                    {p.badge && <span className="small-badge">{p.badge}</span>}
                  </div>
                  <p className="proj-stack">{p.stack}</p>
                  <div className="proj-links">
                    {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-sm">GitHub</a>}
                    {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Live</a>}
                  </div>
                  <ul className="bullet-list proj-bullets">
                    {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              ))}
              {projectTab === 'all' && otherProjects.map((p) => (
                <div key={p.name} className="proj-card">
                  <div className="beam" />
                  <div className="proj-top">
                    <h3 className="proj-name">{p.name}</h3>
                    {p.badge && <span className="small-badge">{p.badge}</span>}
                  </div>
                  <p className="proj-stack">{p.stack}</p>
                  <div className="proj-links">
                    {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-sm">GitHub</a>}
                    {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Live</a>}
                  </div>
                  <ul className="bullet-list proj-bullets">
                    {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="card reveal">
          <div className="card-bar">
            <div className="win-dots">
              <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
            </div>
            <span className="card-bar-title">skills.json</span>
          </div>
          <div className="card-body">
            <div className="skills-grid">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="skill-group">
                  <h3 className="skill-title">{cat.title}</h3>
                  <div className="tag-list">
                    {cat.items.map((item) => <span key={item} className="tag">{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="card reveal">
          <div className="card-bar">
            <div className="win-dots">
              <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
            </div>
            <span className="card-bar-title">leadership.md</span>
          </div>
          <div className="card-body">
            <div className="exp-header">
              <div>
                <h2 className="sec-title">{leadership.role}</h2>
                <h3 className="sec-company">{leadership.org}</h3>
              </div>
              <span className="badge">{leadership.period}</span>
            </div>
            <ul className="bullet-list">
              {leadership.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        </section>

        {/* CODING PROFILE */}
        <section className="card reveal">
          <div className="card-bar">
            <div className="win-dots">
              <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
            </div>
            <span className="card-bar-title">coding-profile.log</span>
          </div>
          <div className="card-body">
            <div className="metric-row" style={{ marginBottom: '20px' }}>
              <div className="metric-card">
                <span className="metric-label">LEETCODE</span>
                <strong className="metric-value hi">750+ Solved</strong>
                <span className="metric-sub">Rating: 1745 (Top 10%)</span>
                <a href={profileLinks.leetcode} target="_blank" rel="noreferrer" className="text-link">View Profile →</a>
              </div>
              <div className="metric-card">
                <span className="metric-label">CODOLIO</span>
                <strong className="metric-value">Competitive Profile</strong>
                <span className="metric-sub">Verified problem record</span>
                <a href={profileLinks.codolio} target="_blank" rel="noreferrer" className="text-link">View Profile →</a>
              </div>
              <div className="metric-card">
                <span className="metric-label">GITHUB</span>
                <strong className="metric-value hi">Repositories</strong>
                <span className="metric-sub">Open source & microservices</span>
                <a href={profileLinks.github} target="_blank" rel="noreferrer" className="text-link">View Profile →</a>
              </div>
            </div>
            <div className="heatmap-row">
              <div className="heatmap-card">
                <div className="heatmap-title">
                  <span>GitHub Contributions</span>
                  <a href={profileLinks.github} target="_blank" rel="noreferrer" className="text-link">@RameshwariS</a>
                </div>
                <div className="chart-wrap">
                  <img src="https://ghchart.rshah.org/404040/RameshwariS" alt="GitHub Contributions" className="chart-img" loading="lazy" />
                </div>
              </div>
              <div className="heatmap-card">
                <div className="heatmap-title">
                  <span>LeetCode Activity</span>
                  <a href={profileLinks.leetcode} target="_blank" rel="noreferrer" className="text-link">@shrutisatpute1112</a>
                </div>
                <div className="chart-wrap">
                  <img src="https://leetcard.jacoblin.cool/shrutisatpute1112?theme=light&font=Inter&ext=heatmap" alt="LeetCode Heatmap" className="chart-img" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="card reveal">
          <div className="card-bar">
            <div className="win-dots">
              <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
            </div>
            <span className="card-bar-title">achievements.txt</span>
          </div>
          <div className="card-body">
            <ul className="bullet-list">
              {achievements.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="card reveal">
          <div className="card-bar">
            <div className="win-dots">
              <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
            </div>
            <span className="card-bar-title">education.txt</span>
          </div>
          <div className="card-body">
            <div className="exp-header">
              <div>
                <h2 className="sec-title">{education.degree}</h2>
                <h3 className="sec-company">{education.college}</h3>
              </div>
              <div className="exp-meta">
                <span className="badge">{education.period}</span>
                <span className="badge badge-hi">CGPA: {education.cgpa}</span>
              </div>
            </div>
            <div className="secondary-edu">
              {education.secondary.map((s, i) => (
                <div key={i} className="sec-edu-row">
                  <strong>{s.name}</strong> ({s.year}) — {s.details}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="card reveal">
          <div className="card-bar">
            <div className="win-dots">
              <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
            </div>
            <span className="card-bar-title">contact.sh</span>
          </div>
          <div className="card-body">
            <h2 className="sec-title">Contact</h2>
            <p className="contact-sub">Open to software engineering roles, backend development and collaborations.</p>
            <div className="contact-grid">
              <a href={`mailto:${profileLinks.email}`} className="contact-card">
                <span className="contact-type">Email</span>
                <strong className="contact-val">{profileLinks.email}</strong>
              </a>
              <a href={`tel:${profileLinks.phone}`} className="contact-card">
                <span className="contact-type">Phone</span>
                <strong className="contact-val">{profileLinks.phone}</strong>
              </a>
              <a href={profileLinks.linkedin} target="_blank" rel="noreferrer" className="contact-card">
                <span className="contact-type">LinkedIn</span>
                <strong className="contact-val">linkedin.com/in/rameshwari-satpute</strong>
              </a>
              <a href={profileLinks.github} target="_blank" rel="noreferrer" className="contact-card">
                <span className="contact-type">GitHub</span>
                <strong className="contact-val">github.com/RameshwariS</strong>
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
          <div className="modal-win" onClick={(e) => e.stopPropagation()}>
            <div className="card-bar">
              <div className="win-dots">
                <span className="dot dot-r" onClick={() => setCliOpen(false)} style={{ cursor: 'pointer' }} />
                <span className="dot dot-y" /><span className="dot dot-g" />
              </div>
              <span className="card-bar-title">terminal.sh</span>
              <button className="close-x" onClick={() => setCliOpen(false)}>✕</button>
            </div>
            <div className="cli-body">
              <div className="cli-output">
                {cliLogs.map((log, i) => <div key={i} className="cli-line">{log}</div>)}
              </div>
              <form className="cli-form" onSubmit={handleCliSubmit}>
                <span className="cli-prompt">&gt;</span>
                <input
                  type="text"
                  className="cli-input"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder="help, cat resume, experience, projects..."
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
