import { useEffect, useRef, useState } from 'react';

// ── Resume Data ──────────────────────────────────────────────────────────
const experience = {
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

const flagshipProjects = [
  {
    name: 'GoProxyX',
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
    stack: 'React (Vite) \u00b7 Node.js \u00b7 Express.js \u00b7 MongoDB Atlas \u00b7 REST API',
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
  period: 'May 2025 \u2013 Present',
  bullets: [
    'Delivered a session on Golang at Metamorphosis 2k26 (Docker & Golang), engaging 180+ participants.',
    'Conducted a session at LinuxDiary 5.0 promoting Linux and open-source culture; led 5+ hands-on workshops.',
    'Coordinated 3 flagship open-source events: Open Source Day 2k26, LinuxDiary 6.0, and Metamorphosis 2k26.',
    'Presented an episode of FOSS FILES Season 6 on Anycast and DNS routing in modern web architecture.',
  ],
};

const achievements = [
  'AWS Educate \u2014 Introduction to Cloud 101 certification badge.',
  '1st Place \u00b7 WCE ACM Hackathon 2025 (Novice Track) \u2014 AI-powered plant disease detection, ranked 1st among 20+ teams.',
  '1st Place \u00b7 TechFusion CodeDuet 2025 pair-programming contest.',
  'Finalist \u00b7 WCE ACM Hackathon 2026 (Expert Track) for the DSV project.',
  'Top 450 of 2,300+ participants \u00b7 ICPC AlgoQueen 2025.',
];

const education = {
  college: 'Walchand College of Engineering, Sangli, Maharashtra',
  degree: 'B.Tech in Computer Science and Engineering',
  period: '2023 \u2013 2027',
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

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const rotatingWords = ['backends', 'REST APIs', 'gateways', 'web apps', 'dev tools'];

const numbers = [
  { value: 8.69, decimals: 2, suffix: '', label: 'CGPA, B.Tech CSE' },
  { value: 750, decimals: 0, suffix: '+', label: 'LeetCode problems' },
  { value: 97, decimals: 0, suffix: '%', label: 'Test coverage at UBS' },
  { value: 180, decimals: 0, suffix: '+', label: 'People at my Go talk' },
];

const aboutText =
  "I'm a Computer Science student at Walchand College of Engineering who likes the unglamorous parts of software: clean service boundaries, honest tests and APIs that keep working under load. I interned at UBS on Spring Boot services, build Go and Redis tooling on the side, and run open-source events at WLUG.";

const allProjects = [...flagshipProjects, ...otherProjects];

function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function SplitWords({ text, delay = 0, step = 70 }) {
  return text.split(' ').map((w, i) => (
    <span className="mask" key={`${w}-${i}`}>
      <span className="word" style={{ animationDelay: `${delay + i * step}ms` }}>{w}</span>{' '}
    </span>
  ));
}

function CountUp({ value, decimals, suffix }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    let raf;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min((t - start) / 1400, 1);
        setN(value * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref}>{n.toFixed(decimals)}{suffix}</span>;
}

function SectionLabel({ index, children }) {
  return (
    <div className="label reveal">
      <span className="label-idx">({index})</span>
      <span>{children}</span>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [clock, setClock] = useState('');
  const aboutRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % rotatingWords.length), 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setClock(fmt());
    const id = setInterval(() => setClock(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } }),
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const words = aboutRef.current ? [...aboutRef.current.querySelectorAll('span')] : [];
    const onScroll = () => {
      const el = aboutRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0), 1);
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('lit', i < lit));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const dot = cursorRef.current;
    if (!dot || !window.matchMedia('(pointer: fine)').matches) return;
    let x = -100, y = -100, cx = -100, cy = -100, raf;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      dot.classList.toggle('big', !!e.target.closest('a, button'));
    };
    const loop = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      dot.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move);
    raf = requestAnimationFrame(loop);
    document.body.classList.add('has-cursor');
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); document.body.classList.remove('has-cursor'); };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileLinks.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profileLinks.email}`;
    }
  };

  const jobs = [
    { title: experience.role, org: experience.company, period: experience.period, tags: experience.stack, bullets: experience.bullets },
    { title: leadership.role, org: leadership.org, period: leadership.period, tags: ['Open Source', 'Public Speaking', 'Community'], bullets: leadership.bullets },
  ];

  const links = [
    { label: 'GitHub', href: profileLinks.github },
    { label: 'LinkedIn', href: profileLinks.linkedin },
    { label: 'LeetCode', href: profileLinks.leetcode },
    { label: 'Codolio', href: profileLinks.codolio },
  ];

  return (
    <div className="page">
      <div className="cursor" ref={cursorRef} aria-hidden="true" />

      <header className="top">
        <a href="#home" className="brand" onClick={() => setMenuOpen(false)}>Rameshwari Satpute</a>
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          {navItems.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} className="roll" onClick={() => setMenuOpen(false)}>
              <sup>0{i + 1}</sup><span data-text={n.label}>{n.label}</span>
            </a>
          ))}
        </nav>
        <div className="top-right">
          <span className="clock">Pune, IN \u00b7 {clock}</span>
          <button className="text-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle theme">
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          <button className="text-btn menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero wrap">
          <p className="hero-kicker"><span className="live-dot" />Available for SDE roles \u00b7 2027</p>
          <h1 className="hero-name">
            <span className="line"><SplitWords text="Rameshwari" /></span>
            <span className="line indent"><SplitWords text="Satpute" delay={120} /></span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-role">
              Software engineer who builds{' '}
              <span className="rotator">
                <span key={wordIndex} className="rot-word">{rotatingWords[wordIndex]}</span>
              </span>
              <br />that hold up in production.
            </p>
            <dl className="hero-facts">
              <div><dt>Now</dt><dd>SWE Intern, UBS</dd></div>
              <div><dt>Study</dt><dd>B.Tech CSE, WCE Sangli</dd></div>
              <div><dt>Based</dt><dd>Sangli / Pune, India</dd></div>
            </dl>
          </div>
          <a href="#about" className="scroll-hint" aria-label="Scroll down"><span /></a>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {Array.from({ length: 2 }).map((_, k) => (
              <span key={k}>
                Java <i>/</i> Spring Boot <i>/</i> Go <i>/</i> Redis <i>/</i> Docker <i>/</i> React <i>/</i> Node.js <i>/</i> MongoDB <i>/</i> PostgreSQL <i>/</i> Linux <i>/</i>{' '}
              </span>
            ))}
          </div>
        </div>

        <section id="about" className="wrap section grid-2">
          <SectionLabel index="01">About</SectionLabel>
          <div>
            <p className="about-text" ref={aboutRef}>
              {aboutText.split(' ').map((w, i) => <span key={i}>{w} </span>)}
            </p>
            <div className="numbers">
              {numbers.map((n, i) => (
                <div className="num reveal" style={{ transitionDelay: `${i * 90}ms` }} key={n.label}>
                  <strong><CountUp value={n.value} decimals={n.decimals} suffix={n.suffix} /></strong>
                  <span>{n.label}</span>
                </div>
              ))}
            </div>
            <div className="edu reveal">
              <div className="edu-row">
                <span>{education.period}</span>
                <span><b>{education.degree}</b><br />{education.college}</span>
                <span>CGPA {education.cgpa}</span>
              </div>
              {education.secondary.map((s) => (
                <div className="edu-row" key={s.name}>
                  <span>{s.year}</span>
                  <span><b>{s.name}</b></span>
                  <span>{s.details}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="wrap section grid-2">
          <SectionLabel index="02">Experience</SectionLabel>
          <div className="exp-cards">
            {jobs.map((j) => (
              <article className="exp-card reveal" key={j.title}>
                <div className="exp-card-header">
                  <span className="exp-period">{j.period}</span>
                  <h3 className="exp-title">{j.title}</h3>
                  <span className="exp-org">{j.org}</span>
                </div>
                <ul className="exp-bullets">
                  {j.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <p className="exp-tags">{j.tags.join('  \u00b7  ')}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="wrap section">
          <div className="grid-2 proj-head">
            <SectionLabel index="03">Selected projects</SectionLabel>
            <h2 className="big reveal">Things I&apos;ve designed, built and <em>shipped.</em></h2>
          </div>
          <div className="project-cards">
            {allProjects.map((p, i) => (
              <article className="pcard reveal" key={p.name}>
                <div className="pcard-top">
                  <span className="p-idx">{String(i + 1).padStart(2, '0')}</span>
                  {p.badge && <span className="badge">{p.badge}</span>}
                </div>
                <h3 className="pcard-name">{p.name}</h3>
                <p className="pcard-stack">{p.stack}</p>
                <ul className="pcard-bullets">
                  {p.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <div className="p-links">
                  <a href={p.github} target="_blank" rel="noreferrer" className="u-link">Source <Arrow /></a>
                  {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="u-link">Live site <Arrow /></a>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="wrap section grid-2">
          <SectionLabel index="04">Skills &amp; recognition</SectionLabel>
          <div>
            <div className="skills">
              {skillCategories.map((c, i) => (
                <div className="skill reveal" style={{ transitionDelay: `${(i % 2) * 80}ms` }} key={c.title}>
                  <h3>{c.title}</h3>
                  <p>{c.items.map((s) => <span key={s}>{s}</span>)}</p>
                </div>
              ))}
            </div>
            <ol className="awards">
              {achievements.map((a) => {
                const [title, desc] = a.split(' \u2014 ');
                return (
                  <li className="reveal" key={a}>
                    <span>{title}</span>
                    {desc && <small>{desc}</small>}
                  </li>
                );
              })}
            </ol>
            <div className="activity">
              <a className="activity-card reveal" href={profileLinks.github} target="_blank" rel="noreferrer">
                <span className="activity-head">GitHub activity <Arrow /></span>
                <img src={`https://ghchart.rshah.org/${theme === 'light' ? '1a1a1a' : 'e8e4da'}/RameshwariS`} alt="GitHub contributions chart" loading="lazy" />
              </a>
              <a className="activity-card reveal" href={profileLinks.leetcode} target="_blank" rel="noreferrer">
                <span className="activity-head">LeetCode \u00b7 rating 1745 \u00b7 top 10% <Arrow /></span>
                <img src={`https://leetcard.jacoblin.cool/shrutisatpute1112?theme=${theme}&font=Inter&ext=heatmap`} alt="LeetCode heatmap" loading="lazy" />
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="wrap section contact">
          <SectionLabel index="05">Contact</SectionLabel>
          <h2 className="contact-title reveal">
            Have a role or a project in mind? <a href={`mailto:${profileLinks.email}`} className="u-link">Let&apos;s talk.</a>
          </h2>
          <div className="contact-grid reveal">
            <div>
              <span className="k">Email</span>
              <button className="copy" onClick={copyEmail}>
                {profileLinks.email}
                <span className="copy-tip">{copied ? 'Copied' : 'Click to copy'}</span>
              </button>
            </div>
            <div>
              <span className="k">Phone</span>
              <a href={`tel:${profileLinks.phone.replace(/\s/g, '')}`} className="u-link">{profileLinks.phone}</a>
            </div>
            <div>
              <span className="k">Elsewhere</span>
              <p className="elsewhere">
                {links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="u-link">{l.label} <Arrow size={12} /></a>)}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap footer">
        <span>&copy; {new Date().getFullYear()} Rameshwari Satpute</span>
        <button className="text-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top \u2191</button>
      </footer>
    </div>
  );
}

export default App;
