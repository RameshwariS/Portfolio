import { Fragment, useEffect, useRef, useState } from 'react';
import {
  experience,
  flagshipProjects,
  otherProjects,
  skillCategories,
  leadership,
  achievements,
  education,
  profileLinks,
  navItems,
  rotatingWords,
  numbers,
  aboutText,
  spans,
} from './data.js';

// ── Small pieces ─────────────────────────────────────────────────────────
function Arrow({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function ThemeIcon({ theme }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {theme === 'light'
        ? <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>}
    </svg>
  );
}

function Letters({ text, delay = 0 }) {
  return [...text].map((c, i) => (
    <span className="ch" key={i} style={{ animationDelay: `${delay + i * 45}ms` }}>{c}</span>
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

function SectionHead({ id, method = 'GET', status = '200 OK', children }) {
  return (
    <header className="sec-head reveal">
      <p className="endpoint">
        <span className="method">{method}</span>
        <span className="path">/{id}</span>
        <span className="status">{status}</span>
      </p>
      <h2 className="sec-title">{children}</h2>
    </header>
  );
}

function Chips({ items }) {
  return (
    <ul className="chips">
      {items.map((s) => <li key={s}>{s}</li>)}
    </ul>
  );
}

function ProjectLinks({ project }) {
  return (
    <div className="p-links">
      <a href={project.github} target="_blank" rel="noreferrer" className="u-link">Source <Arrow /></a>
      {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="u-link">Live site <Arrow /></a>}
    </div>
  );
}

// Request path of a project, with a packet travelling along it.
function Pipeline({ flow }) {
  return (
    <div className="pipeline" role="img" aria-label={`Flow: ${flow.join(', then ')}`}>
      {flow.map((node, i) => (
        <Fragment key={node}>
          {i > 0 && <span className="pipe-link" style={{ '--i': i - 1 }} />}
          <span className="pipe-node">{node}</span>
        </Fragment>
      ))}
    </div>
  );
}

// ── Token bucket playground ──────────────────────────────────────────────
const BUCKET_CAP = 8;
const BURST = 12;

function RateLimiter() {
  const [tokens, setTokens] = useState(BUCKET_CAP);
  const [log, setLog] = useState([]);
  const [stats, setStats] = useState({ ok: 0, limited: 0 });
  const bucket = useRef(BUCKET_CAP);
  const seq = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      bucket.current = Math.min(BUCKET_CAP, bucket.current + 1);
      setTokens(bucket.current);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const send = (count) => {
    const entries = [];
    let ok = 0;
    for (let i = 0; i < count; i += 1) {
      const allowed = bucket.current > 0;
      if (allowed) { bucket.current -= 1; ok += 1; }
      seq.current += 1;
      entries.push({ id: seq.current, ok: allowed, ms: 2 + Math.floor(Math.random() * 9) });
    }
    setTokens(bucket.current);
    setLog((l) => [...l, ...entries].slice(-5));
    setStats((s) => ({ ok: s.ok + ok, limited: s.limited + count - ok }));
  };

  return (
    <div className="limiter card spot">
      <div className="limiter-bar">
        <span className="limiter-file">token_bucket.go</span>
        <span>cap {BUCKET_CAP} &middot; refill 1/s</span>
      </div>
      <div className="tokens" role="img" aria-label={`${tokens} of ${BUCKET_CAP} tokens available`}>
        {Array.from({ length: BUCKET_CAP }).map((_, i) => (
          <span key={i} className={i < tokens ? 'token full' : 'token'} />
        ))}
      </div>
      <ol className="limiter-log" aria-live="polite">
        {log.length === 0 && <li className="idle">{'// no traffic yet. send a request, then try to get rate-limited.'}</li>}
        {log.map((r) => (
          <li key={r.id} className={r.ok ? 'ok' : 'limited'}>
            <span className="req-id">#{String(r.id).padStart(3, '0')}</span>
            <span>GET /api/hire</span>
            <b>{r.ok ? '200 OK' : '429 Too Many Requests'}</b>
            {r.ok && <span className="req-ms">{r.ms}ms</span>}
          </li>
        ))}
      </ol>
      <div className="limiter-actions">
        <button className="btn primary" onClick={() => send(1)}>Send request</button>
        <button className="btn" onClick={() => send(BURST)}>Burst &times;{BURST}</button>
        <span className="limiter-stats">
          <b>{stats.ok}</b> served &middot; <b className="limited">{stats.limited}</b> limited
        </span>
      </div>
      <p className="limiter-note">
        A live token bucket, the same idea behind the Redis rate limiter in <a href="#projects" className="u-link">GoProxyX</a>.
      </p>
    </div>
  );
}

// ── Career as a trace waterfall ──────────────────────────────────────────
const TRACE_START = 2023;
const TRACE_END = 2028;
const tracePct = (year) => ((Math.min(Math.max(year, TRACE_START), TRACE_END) - TRACE_START) / (TRACE_END - TRACE_START)) * 100;

function Trace() {
  const today = new Date();
  const now = today.getFullYear() + today.getMonth() / 12;
  const years = Array.from({ length: TRACE_END - TRACE_START }, (_, i) => TRACE_START + i);
  return (
    <div className="trace card reveal">
      <div className="trace-row trace-axis" aria-hidden="true">
        <span className="trace-id">trace: career</span>
        <div className="trace-track">
          {years.map((y) => <span key={y} className="tick" style={{ left: `${tracePct(y)}%` }}>{y}</span>)}
        </div>
      </div>
      {spans.map((s, i) => {
        const end = s.end ?? now;
        return (
          <div className="trace-row" key={s.label}>
            <span className="trace-label"><b>{s.label}</b> {s.org}<small>{s.when}</small></span>
            <div className="trace-track">
              <span
                className={`span-bar ${s.end ? '' : 'open'}`}
                style={{ left: `${tracePct(s.start)}%`, width: `${tracePct(end) - tracePct(s.start)}%`, transitionDelay: `${200 + i * 160}ms` }}
              />
            </div>
          </div>
        );
      })}
      <div className="trace-row trace-now" aria-hidden="true">
        <span />
        <div><span className="now-line" style={{ left: `${tracePct(now)}%` }}><i>now</i></span></div>
      </div>
    </div>
  );
}

// ── Command palette ──────────────────────────────────────────────────────
function Palette({ commands, onClose }) {
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const q = query.trim().toLowerCase();
  const list = commands.filter((c) => `${c.label} ${c.hint}`.toLowerCase().includes(q));
  const run = (c) => { onClose(); c.run(); };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => (s + 1) % Math.max(list.length, 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => (s - 1 + list.length) % Math.max(list.length, 1)); }
    else if (e.key === 'Enter' && list[sel]) run(list[sel]);
  };

  return (
    <div className="palette-backdrop" onMouseDown={onClose}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(e) => e.stopPropagation()}>
        <div className="palette-input">
          <span aria-hidden="true">&gt;</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSel(0); }}
            onKeyDown={onKeyDown}
            placeholder="Type a command or search…"
            aria-label="Command"
          />
          <kbd>esc</kbd>
        </div>
        <ul className="palette-list">
          {list.map((c, i) => (
            <li key={c.label}>
              <button className={i === sel ? 'sel' : ''} onMouseEnter={() => setSel(i)} onClick={() => run(c)}>
                <span>{c.label}</span>
                <span className="palette-hint">{c.hint}</span>
              </button>
            </li>
          ))}
          {list.length === 0 && <li className="palette-empty">404: no matching command</li>}
        </ul>
      </div>
    </div>
  );
}

function initialTheme() {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* storage unavailable */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const isMac = /Mac|iPhone|iPad/.test(navigator.platform);

function App() {
  const [theme, setTheme] = useState(initialTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [clock, setClock] = useState('');
  const [active, setActive] = useState('');
  const aboutRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch { /* storage unavailable */ }
  }, [theme]);

  useEffect(() => {
    const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean);
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      const mark = window.innerHeight * 0.35;
      let current = '';
      sections.forEach((s) => { if (s.getBoundingClientRect().top <= mark) current = s.id; });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

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
      { threshold: 0.12 }
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
      const p = Math.min(Math.max((vh * 0.85 - r.top) / (r.height + vh * 0.3), 0), 1);
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('lit', i < lit));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Pointer-follow glow on the page and on `.spot` cards.
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    let raf = 0;
    let ev;
    const apply = () => {
      raf = 0;
      const root = document.documentElement;
      root.style.setProperty('--mx', `${ev.clientX}px`);
      root.style.setProperty('--my', `${ev.clientY}px`);
      const card = ev.target instanceof Element ? ev.target.closest('.spot') : null;
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--x', `${ev.clientX - r.left}px`);
        card.style.setProperty('--y', `${ev.clientY - r.top}px`);
      }
    };
    const move = (e) => { ev = e; if (!raf) raf = requestAnimationFrame(apply); };
    window.addEventListener('mousemove', move);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(''), 2000);
    return () => clearTimeout(id);
  }, [toast]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileLinks.email);
      setToast('Email copied to clipboard');
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

  const commands = [
    ...navItems.map((n) => ({ label: `Go to ${n.label}`, hint: `${n.method} /${n.id}`, run: () => document.getElementById(n.id)?.scrollIntoView() })),
    { label: `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`, hint: 'theme', run: toggleTheme },
    { label: 'Copy email address', hint: 'contact', run: copyEmail },
    ...links.map((l) => ({ label: `Open ${l.label}`, hint: 'link', run: () => window.open(l.href, '_blank', 'noopener') })),
  ];

  return (
    <div className="page">
      <a href="#about" className="skip-link">Skip to content</a>
      <div className="glow" aria-hidden="true" />
      <span className="progress" ref={progressRef} aria-hidden="true" />

      <header className="top">
        <a href="#home" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">rs</span>
          <span className="brand-name">Rameshwari Satpute</span>
        </a>
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          {navItems.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={active === n.id ? 'active' : ''}
              aria-current={active === n.id ? 'true' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="top-right">
          <button className="kbd-btn" onClick={() => setPaletteOpen(true)} aria-label="Open command palette">
            <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd><kbd>K</kbd>
          </button>
          <button className="icon-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
            <ThemeIcon theme={theme} />
          </button>
          <button className="icon-btn menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            <span className={`burger ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero wrap">
          <p className="status-pill">
            <span className="live-dot" /><b>200 OK</b>Available for SDE roles &middot; 2027
          </p>
          <div className="hero-title">
            <h1 className="hero-name" aria-label="Rameshwari Satpute">
              <span className="name-line" aria-hidden="true"><Letters text="RAMESHWARI" /></span>
              <span className="name-line outline" aria-hidden="true"><Letters text="SATPUTE" delay={320} /></span>
            </h1>
            <p className="hero-role">
              Software engineer who builds{' '}
              <span className="rotator">
                <span key={wordIndex} className="rot-word">{rotatingWords[wordIndex]}</span>
              </span>{' '}
              that hold up in production.
            </p>
          </div>
          <div className="hero-bottom">
            <div className="hero-side">
              <dl className="hero-facts">
                <div><dt>Interned at</dt><dd>UBS, Pune</dd></div>
                <div><dt>Study</dt><dd>B.Tech CSE, WCE Sangli</dd></div>
                <div><dt>Based</dt><dd>Sangli / Pune, India</dd></div>
              </dl>
              <div className="hero-cta">
                <a href="#projects" className="btn primary">See projects <Arrow /></a>
                <button className="btn" onClick={copyEmail}>Copy email</button>
              </div>
            </div>
            <RateLimiter />
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {Array.from({ length: 2 }).map((_, k) => (
              <span key={k}>
                {['Java', 'Spring Boot', 'Go', 'Redis', 'Docker', 'React', 'Node.js', 'MongoDB', 'PostgreSQL', 'Linux'].map((t) => (
                  <Fragment key={t}>{t}<i>/</i></Fragment>
                ))}
              </span>
            ))}
          </div>
        </div>

        <section id="about" className="wrap section">
          <SectionHead id="about">I like the <em>unglamorous</em> parts of software.</SectionHead>
          <div className="bento">
            <div className="card spot b-bio reveal">
              <span className="card-tag">{'// bio'}</span>
              <p className="about-text" ref={aboutRef}>
                {aboutText.split(' ').map((w, i) => <span key={i}>{w} </span>)}
              </p>
            </div>
            <div className="b-stats">
              {numbers.map((n, i) => (
                <div className="card spot stat reveal" style={{ transitionDelay: `${i * 80}ms` }} key={n.label}>
                  <strong><CountUp value={n.value} decimals={n.decimals} suffix={n.suffix} /></strong>
                  <span>{n.label}</span>
                </div>
              ))}
            </div>
            <div className="card spot b-edu reveal">
              <span className="card-tag">{'// education'}</span>
              <div className="edu-row main">
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
            <div className="card spot b-now reveal">
              <span className="card-tag">{'// local time'}</span>
              <p className="now-clock">{clock}<small>IST</small></p>
              <p className="now-place">Sangli / Pune, India</p>
              <p className="now-status"><span className="live-dot" />Open to SDE roles for 2027</p>
            </div>
          </div>
        </section>

        <section id="work" className="wrap section">
          <SectionHead id="work">Where I&apos;ve <em>shipped</em> and led.</SectionHead>
          <Trace />
          <div className="exp-cards">
            {jobs.map((j, i) => (
              <article className="card spot exp-card reveal" style={{ transitionDelay: `${i * 100}ms` }} key={j.title}>
                <div className="exp-card-header">
                  <span className="exp-period">{j.period}</span>
                  <h3 className="exp-title">{j.title}</h3>
                  <span className="exp-org">{j.org}</span>
                </div>
                <ul className="bullets">
                  {j.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <Chips items={j.tags} />
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="wrap section">
          <SectionHead id="projects">Things I&apos;ve designed, built and <em>shipped.</em></SectionHead>
          <div className="features">
            {flagshipProjects.map((p, i) => (
              <article className="card spot feature reveal" style={{ '--i': i }} key={p.name}>
                <div className="feature-bar">
                  <span className="p-idx">{String(i + 1).padStart(2, '0')} / featured</span>
                  {p.badge && <span className="badge">{p.badge}</span>}
                  <ProjectLinks project={p} />
                </div>
                <div className="feature-body">
                  <div className="feature-meta">
                    <h3 className="feature-name">{p.name}</h3>
                    <Chips items={p.stack.split(' · ')} />
                  </div>
                  <ul className="bullets">
                    {p.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
                <Pipeline flow={p.flow} />
              </article>
            ))}
          </div>
          <h3 className="more-label reveal">{'// more projects'}</h3>
          <div className="project-cards">
            {otherProjects.map((p, i) => (
              <article className="card spot pcard reveal" style={{ transitionDelay: `${i * 90}ms` }} key={p.name}>
                <div className="pcard-top">
                  <span className="p-idx">{String(flagshipProjects.length + i + 1).padStart(2, '0')}</span>
                  {p.badge && <span className="badge">{p.badge}</span>}
                </div>
                <h3 className="pcard-name">{p.name}</h3>
                <Chips items={p.stack.split(' · ')} />
                <ul className="bullets">
                  {p.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <ProjectLinks project={p} />
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="wrap section">
          <SectionHead id="skills">The <em>stack</em> I reach for, and what it&apos;s won.</SectionHead>
          <div className="skills">
            {skillCategories.map((c, i) => (
              <div className="card spot skill reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }} key={c.title}>
                <h3 className="card-tag">{`// ${c.title.toLowerCase()}`}</h3>
                <Chips items={c.items} />
              </div>
            ))}
          </div>
          <div className="recognition">
            <ol className="awards card reveal">
              {achievements.map((a) => {
                const [title, desc] = a.split(' \u2014 ');
                return (
                  <li key={a}>
                    <span>{title}</span>
                    {desc && <small>{desc}</small>}
                  </li>
                );
              })}
            </ol>
            <a className="card spot activity-card reveal" href={profileLinks.leetcode} target="_blank" rel="noreferrer">
              <span className="activity-head">LeetCode &middot; rating 1745 &middot; top 10% <Arrow /></span>
              <img src={`https://leetcard.jacoblin.cool/shrutisatpute1112?theme=${theme}&font=Inter&ext=heatmap`} alt="LeetCode heatmap" loading="lazy" />
            </a>
          </div>
          <a className="card spot activity-card gh-card reveal" href={profileLinks.github} target="_blank" rel="noreferrer">
            <span className="activity-head">GitHub activity <Arrow /></span>
            <img className="gh-chart" src={`https://ghchart.rshah.org/${theme === 'light' ? '3a2dff' : '1a1a1a'}/RameshwariS`} alt="GitHub contributions chart" loading="lazy" />
          </a>
        </section>

        <section id="contact" className="wrap section">
          <div className="contact reveal">
            <p className="endpoint">
              <span className="method">POST</span>
              <span className="path">/contact</span>
              <span className="status">202 Accepted</span>
            </p>
            <h2 className="contact-title">
              Have a role or a project in mind? <a href={`mailto:${profileLinks.email}`}>Let&apos;s talk.</a>
            </h2>
            <div className="contact-grid">
              <div>
                <span className="k">Email</span>
                <button className="contact-link" onClick={copyEmail}>{profileLinks.email}<small>click to copy</small></button>
              </div>
              <div>
                <span className="k">Phone</span>
                <a href={`tel:${profileLinks.phone.replace(/\s/g, '')}`} className="contact-link">{profileLinks.phone}</a>
              </div>
              <div>
                <span className="k">Elsewhere</span>
                <p className="elsewhere">
                  {links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="contact-link">{l.label} <Arrow size={12} /></a>)}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap footer">
        <span>&copy; {new Date().getFullYear()} Rameshwari Satpute</span>
        <span className="footer-hint">Press <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd> <kbd>K</kbd> to jump anywhere</span>
        <button className="text-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top &uarr;</button>
      </footer>

      {paletteOpen && <Palette commands={commands} onClose={() => setPaletteOpen(false)} />}
      <div className={`toast ${toast ? 'show' : ''}`} role="status">{toast}</div>
    </div>
  );
}

export default App;
