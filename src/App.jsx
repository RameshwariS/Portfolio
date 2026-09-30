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

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
];

const stats = [
  { value: '8.69', label: 'CGPA at WCE Sangli' },
  { value: '750+', label: 'LeetCode problems solved' },
  { value: '97%', label: 'Test coverage shipped at UBS' },
  { value: '180+', label: 'Attendees at my Golang session' },
];

const heroChips = ['Java · Spring Boot', 'Go · Redis', 'React · Node', 'Docker'];

const techStream = Array.from(
  new Set(skillCategories.filter((c) => c.title !== 'Coursework').flatMap((c) => c.items))
);

const brandPaths = {
  github:
    'M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z',
  linkedin:
    'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z',
};

const strokeIcons = {
  mail: (<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></>),
  phone: (<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />),
  arrowRight: (<path d="M5 12h14M12 5l7 7-7 7" />),
  arrowUpRight: (<path d="M7 17 17 7M7 7h10v10" />),
  arrowUp: (<path d="M12 19V5M5 12l7-7 7 7" />),
  code: (<path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />),
  sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></>),
  moon: (<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />),
  menu: (<path d="M4 6h16M4 12h16M4 18h16" />),
  x: (<path d="M18 6 6 18M6 6l12 12" />),
  copy: (<><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>),
  check: (<path d="M20 6 9 17l-5-5" />),
  trophy: (<><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" /><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" /></>),
  star: (<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />),
  cap: (<><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>),
  briefcase: (<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>),
  users: (<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>),
  pin: (<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>),
  chevron: (<path d="m6 9 6 6 6-6" />),
};

function Icon({ name, size = 18 }) {
  if (brandPaths[name]) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={brandPaths[name]} />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {strokeIcons[name]}
    </svg>
  );
}

function SectionHead({ eyebrow, title, sub }) {
  return (
    <div className="section-head reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [progress, setProgress] = useState(0);
  const [projectTab, setProjectTab] = useState('featured');
  const [expanded, setExpanded] = useState({});
  const [copied, setCopied] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    document.querySelectorAll('section[id]').forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal:not(.in-view)').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [projectTab]);

  useEffect(() => {
    const phrase = typingPhrases[phraseIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = phrase.slice(0, typedText.length + 1);
        setTypedText(next);
        if (next === phrase) setTimeout(() => setIsDeleting(true), 1400);
      } else {
        const next = phrase.slice(0, Math.max(typedText.length - 1, 0));
        setTypedText(next);
        if (next.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((p) => (p + 1) % typingPhrases.length);
        }
      }
    }, isDeleting ? 22 : 45);
    return () => clearTimeout(timer);
  }, [typedText, phraseIndex, isDeleting]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileLinks.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profileLinks.email}`;
    }
  };

  const projects = projectTab === 'featured' ? flagshipProjects : [...flagshipProjects, ...otherProjects];

  const timeline = [
    { icon: 'briefcase', title: experience.role, org: experience.company, period: experience.period, tags: experience.stack, bullets: experience.bullets },
    { icon: 'users', title: leadership.role, org: leadership.org, period: leadership.period, tags: ['Open Source', 'Public Speaking', 'Community', 'Event Leadership'], bullets: leadership.bullets },
  ];

  const socials = [
    { icon: 'github', href: profileLinks.github, label: 'GitHub' },
    { icon: 'linkedin', href: profileLinks.linkedin, label: 'LinkedIn' },
    { icon: 'code', href: profileLinks.leetcode, label: 'LeetCode' },
    { icon: 'mail', href: `mailto:${profileLinks.email}`, label: 'Email' },
  ];

  return (
    <div className="page">
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      <div className="mesh" aria-hidden="true">
        <span className="blob b1" /><span className="blob b2" /><span className="blob b3" />
      </div>

      <header className="nav-wrap">
        <nav className="nav">
          <a href="#home" className="logo" onClick={() => setMenuOpen(false)}>
            <span className="logo-mark">RS</span>
            <span className="logo-text">Rameshwari</span>
          </a>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className={active === n.id ? 'active' : ''} onClick={() => setMenuOpen(false)}>{n.label}</a>
              </li>
            ))}
          </ul>
          <div className="nav-right">
            <button className="icon-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle theme">
              <Icon name={theme === 'light' ? 'moon' : 'sun'} />
            </button>
            <a href="#contact" className="btn btn-dark nav-cta">Let's talk</a>
            <button className="icon-btn menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <Icon name={menuOpen ? 'x' : 'menu'} />
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="hero container">
          <div className="hero-copy reveal">
            <span className="pill"><span className="pulse-dot" />Open to SDE internships &amp; full-time roles</span>
            <h1 className="hero-title">
              Hi, I'm <span className="grad-text">Rameshwari</span>.
              <span className="sub">I build reliable backends &amp; delightful web apps.</span>
            </h1>
            <p className="hero-typed"><span>{typedText}</span><span className="caret" /></p>
            <p className="hero-lead">
              B.Tech Computer Science student at Walchand College of Engineering with industry experience at UBS,
              building modular Spring Boot REST APIs, Go/Redis microservices and full-stack products.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-grad">View my work <Icon name="arrowRight" size={16} /></a>
              <button className="btn btn-ghost" onClick={copyEmail}>
                <Icon name={copied ? 'check' : 'copy'} size={16} />{copied ? 'Email copied!' : 'Copy email'}
              </button>
            </div>
            <div className="socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social" aria-label={s.label} title={s.label}>
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="profile-card">
              <div className="avatar"><span>RS</span></div>
              <h3>Rameshwari Satpute</h3>
              <p className="muted">Software Engineering Intern · UBS</p>
              <p className="profile-meta"><Icon name="pin" size={14} /> Sangli · Pune, India</p>
              <div className="mini-stats">
                <div><strong>8.69</strong><span>CGPA</span></div>
                <div><strong>1745</strong><span>LC rating</span></div>
                <div><strong>Top 10%</strong><span>LeetCode</span></div>
              </div>
            </div>
            {heroChips.map((c, i) => (
              <span key={c} className={`float-chip c${i + 1}`}><i />{c}</span>
            ))}
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...techStream, ...techStream].map((t, i) => <span key={`${t}-${i}`}>{t}</span>)}
          </div>
        </div>

        <section id="about" className="container section">
          <SectionHead eyebrow="About" title="A quick snapshot" sub="Engineer by training, builder by habit, community lead by choice." />
          <div className="bento">
            <div className="card bento-intro reveal">
              <h3>Backend-first, product-minded engineer who loves clean architecture and well-tested code.</h3>
              <p>
                I enjoy designing scalable services, from API gateways with rate limiting to reproducible ML tooling,
                and I share what I learn by leading open-source events at WLUG.
              </p>
              <div className="chips">
                {['Distributed Systems', 'REST APIs', 'Testing', 'Open Source'].map((c) => <span className="chip" key={c}>{c}</span>)}
              </div>
            </div>
            {stats.map((s) => (
              <div className="card stat reveal" key={s.label}>
                <span className="stat-value grad-text">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
            <div className="card bento-edu reveal">
              <div className="edu-icon"><Icon name="cap" size={24} /></div>
              <div>
                <h3>{education.degree}</h3>
                <p className="muted">{education.college} · {education.period} · CGPA {education.cgpa}</p>
              </div>
              <div className="edu-sec">
                {education.secondary.map((s) => (
                  <span key={s.name}><strong>{s.name}</strong> · {s.details} · {s.year}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="container section">
          <SectionHead eyebrow="Experience" title="Where I've made an impact" />
          <div className="timeline">
            {timeline.map((t) => (
              <article className="tl-item reveal" key={t.title}>
                <div className="tl-icon"><Icon name={t.icon} size={22} /></div>
                <div className="card tl-card">
                  <div className="tl-head">
                    <div>
                      <h3>{t.title}</h3>
                      <p className="tl-org">{t.org}</p>
                    </div>
                    <span className="date-pill">{t.period}</span>
                  </div>
                  <ul className="dot-list">{t.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  <div className="chips sm">{t.tags.map((tag) => <span className="chip" key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="container section">
          <div className="head-row">
            <SectionHead eyebrow="Projects" title="Things I've built" sub="From API gateways to hackathon-winning AI apps." />
            <div className="tabs reveal" role="tablist">
              <button className={`tab ${projectTab === 'featured' ? 'active' : ''}`} onClick={() => setProjectTab('featured')}>Featured</button>
              <button className={`tab ${projectTab === 'all' ? 'active' : ''}`} onClick={() => setProjectTab('all')}>All projects</button>
            </div>
          </div>
          <div className="proj-grid">
            {projects.map((p, i) => {
              const open = expanded[p.name];
              const shown = open ? p.bullets : p.bullets.slice(0, 2);
              return (
                <article className={`card proj reveal g${i % 6}`} key={p.name}>
                  <div className="proj-cover">
                    <span className="proj-num">{String(i + 1).padStart(2, '0')}</span>
                    {p.badge && <span className="proj-badge"><Icon name="trophy" size={13} />{p.badge}</span>}
                    <span className="proj-word">{p.name.split(' — ')[0]}</span>
                  </div>
                  <div className="proj-body">
                    <h3>{p.name}</h3>
                    <div className="chips sm">{p.stack.split(' · ').map((s) => <span className="chip" key={s}>{s}</span>)}</div>
                    <ul className="dot-list">{shown.map((b) => <li key={b}>{b}</li>)}</ul>
                    {p.bullets.length > 2 && (
                      <button className={`link-btn ${open ? 'open' : ''}`} onClick={() => setExpanded({ ...expanded, [p.name]: !open })}>
                        {open ? 'Show less' : `+${p.bullets.length - 2} more`} <Icon name="chevron" size={14} />
                      </button>
                    )}
                    <div className="proj-links">
                      <a href={p.github} target="_blank" rel="noreferrer"><Icon name="github" size={15} /> Code</a>
                      {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="primary">Live <Icon name="arrowUpRight" size={15} /></a>}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="skills" className="container section">
          <SectionHead eyebrow="Skills" title="My toolkit" sub="Languages, frameworks and platforms I use to ship." />
          <div className="skills-grid">
            {skillCategories.map((cat) => (
              <div className="card skill-card reveal" key={cat.title}>
                <div className="skill-top">
                  <h3>{cat.title}</h3>
                  <span className="skill-count">{String(cat.items.length).padStart(2, '0')}</span>
                </div>
                <div className="chips">{cat.items.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
              </div>
            ))}
          </div>
          <div className="activity">
            <div className="card activity-card reveal">
              <div className="activity-head">
                <span>GitHub contributions</span>
                <a href={profileLinks.github} target="_blank" rel="noreferrer">@RameshwariS <Icon name="arrowUpRight" size={14} /></a>
              </div>
              <img src="https://ghchart.rshah.org/a855f7/RameshwariS" alt="GitHub contributions chart" loading="lazy" />
            </div>
            <div className="card activity-card reveal">
              <div className="activity-head">
                <span>LeetCode activity</span>
                <a href={profileLinks.leetcode} target="_blank" rel="noreferrer">@shrutisatpute1112 <Icon name="arrowUpRight" size={14} /></a>
              </div>
              <img src={`https://leetcard.jacoblin.cool/shrutisatpute1112?theme=${theme}&font=Inter&ext=heatmap`} alt="LeetCode heatmap" loading="lazy" />
            </div>
          </div>
        </section>

        <section id="awards" className="container section">
          <SectionHead eyebrow="Awards" title="Wins &amp; recognition" />
          <div className="awards">
            {achievements.map((a, i) => {
              const [title, desc] = a.split(' — ');
              return (
                <div className="card award reveal" key={a}>
                  <div className="award-icon"><Icon name={i === 0 ? 'star' : 'trophy'} size={22} /></div>
                  <h3>{title}</h3>
                  {desc && <p>{desc}</p>}
                </div>
              );
            })}
          </div>
        </section>

        <section id="contact" className="container section">
          <div className="contact-panel reveal">
            <span className="eyebrow">Contact</span>
            <h2>Let's build something great together.</h2>
            <p>Open to internships, full-time SDE roles and open-source collaborations. My inbox is always open.</p>
            <div className="contact-actions">
              <a className="btn btn-light" href={`mailto:${profileLinks.email}`}><Icon name="mail" size={16} /> Say hello</a>
              <button className="btn btn-outline-light" onClick={copyEmail}>
                <Icon name={copied ? 'check' : 'copy'} size={16} />{copied ? 'Copied!' : profileLinks.email}
              </button>
            </div>
            <div className="contact-links">
              <a href={`tel:${profileLinks.phone.replace(/\s/g, '')}`}><Icon name="phone" size={15} />{profileLinks.phone}</a>
              <a href={profileLinks.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" size={15} />LinkedIn</a>
              <a href={profileLinks.github} target="_blank" rel="noreferrer"><Icon name="github" size={15} />GitHub</a>
              <a href={profileLinks.leetcode} target="_blank" rel="noreferrer"><Icon name="code" size={15} />LeetCode</a>
              <a href={profileLinks.codolio} target="_blank" rel="noreferrer"><Icon name="arrowUpRight" size={15} />Codolio</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="container footer">
        <span>© {new Date().getFullYear()} Rameshwari Satpute</span>
        <span>Designed &amp; built with React + Vite</span>
      </footer>

      {progress > 0.12 && (
        <button className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          <Icon name="arrowUp" />
        </button>
      )}
    </div>
  );
}

export default App;
