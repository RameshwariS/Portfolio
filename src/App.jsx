import { useEffect, useState } from 'react';

const projects = [
  {
    name: 'Movie Booking API',
    stack: 'Node.js, Express.js, MongoDB, Postman, REST APIs',
    github: 'https://github.com/RameshwariS/MOVIE_BOOKING',
    bullets: [
      'Designed a scalable movie ticket booking backend with modules for movies, theatres, showtimes, accounts, and bookings.',
      'Implemented JWT authentication and role-based authorization for secure user/admin access.',
      'Applied request validation, robust error handling, and Postman testing for reliability.',
    ],
  },
  {
    name: 'Blogify',
    stack: 'Node.js, Express.js, MongoDB, EJS',
    github: 'https://github.com/RameshwariS/Blog',
    live: 'https://blogify-oz95.onrender.com/',
    bullets: [
      'Built and deployed a full-stack blogging platform with auth, image uploads, and comments.',
      'Implemented secure password hashing and a mobile-friendly interface.',
      'Hosted live deployment on Render.',
    ],
  },
  {
    name: 'AgriSeva',
    stack: 'React.js, Express.js, TensorFlow.js, NVIDIA APIs',
    github: 'https://github.com/Nandinipatil1410/WCEHackathon2025_TeamAnvesha',
    live: 'https://agriseva.vercel.app/',
    bullets: [
      'Built AI-powered plant disease detection processing 1,200+ images across 12 diseases.',
      'Integrated crop suggestions using soil input and live weather signals.',
      'Added multilingual government scheme explorer and chatbot support.',
    ],
  },
  {
    name: 'URL Shortener',
    stack: 'Node.js, Express.js, EJS',
    github: 'https://github.com/RameshwariS/URL-Shortner',
    bullets: [
      'Developed short-link generation with fast and reliable redirection logic.',
      'Added validation and error handling for stronger user experience.',
      'Integrated database-backed persistence for stable link storage.',
    ],
  },
  {
    name: 'Paste - Notes App',
    stack: 'React.js, Redux Toolkit',
    github: 'https://github.com/RameshwariS/PasteApp',
    live: 'https://paste-app-one-lime.vercel.app/',
    bullets: [
      'Built a responsive note management app with create, edit, and copy workflows.',
      'Used Redux Toolkit for centralized state and predictable updates.',
      'Enabled persistence through localStorage.',
    ],
  },
];

const skillGroups = [
  {
    title: 'Languages',
    items: ['C++', 'JavaScript', 'Python', 'SQL', 'PL/SQL'],
  },
  {
    title: 'Frontend',
    items: ['HTML5', 'CSS3', 'React.js', 'EJS'],
  },
  {
    title: 'Backend & APIs',
    items: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    title: 'Databases & Tools',
    items: ['MongoDB', 'MySQL', 'Git', 'GitHub', 'Postman', 'Linux', 'Firebase'],
  },
  {
    title: 'Core CS',
    items: ['DSA', 'OOP', 'OS', 'DBMS', 'Computer Networks', 'Software Engineering', 'Machine Learning'],
  },
];

const achievements = [
  'Winner, WCE ACM Hackathon 2025 (Novice Track) - Rank 1 among 20+ teams.',
  'Winner, TechFusion CodeDuet 2025 pair programming contest.',
  'Finalist, TechSprint 2026 by Google Developer Group.',
  'WCPC 2025 Finalist.',
  'ICPC Algoqueen - Top 450 among 2300+ participants.',
  'Microsoft CodeWithoutBarrier Mentee (ML and responsible AI).',
];

const highlights = [
  { label: 'Problems Solved', value: '600+' },
  { label: 'Major Projects', value: '5+' },
  { label: 'Hackathon Wins', value: '1' },
  { label: 'Competition Wins', value: '2' },
];

const principles = [
  'Build for reliability first: validation, error handling, and predictable behavior.',
  'Keep architecture modular so features can scale without breaking existing flows.',
  'Prioritize clarity in APIs and interfaces to reduce debugging time.',
  'Balance speed with maintainability using reusable components and clean code.',
];

const currentlyExploring = [
  'System design fundamentals for scalable backend services',
  'Model integration patterns for practical AI features in web apps',
  'Performance-focused React patterns for large UI states',
];

const typingPhrases = [
  'Computer Science student building reliable full-stack products.',
  'Focused on backend APIs, React interfaces, and AI-assisted workflows.',
  'Open to internships and impactful engineering work.',
];

function App() {
  const particles = Array.from({ length: 18 }, (_, i) => i);
  const matrixCols = Array.from({ length: 14 }, (_, i) => i);

  const profileLinks = {
    linkedin: 'https://www.linkedin.com/in/rameshwari-satpute-8068322a6/',
    github: 'https://github.com/RameshwariS',
    leetcode: 'https://leetcode.com/u/shrutisatpute1112/',
    codolio: 'https://codolio.com/profile/shruti1',
  };

  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];
    const speed = isDeleting ? 28 : 52;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = currentPhrase.slice(0, typedText.length + 1);
        setTypedText(next);

        if (next === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 900);
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

  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealEls.forEach((el) => observer.observe(el));

    const onMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mx', `${x}%`);
      document.documentElement.style.setProperty('--my', `${y}%`);
      document.documentElement.style.setProperty('--cx', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cy', `${event.clientY}px`);
    };

    const hoverables = document.querySelectorAll('a, .card, .chip');
    const activateCursor = () => document.body.classList.add('cursor-hover');
    const deactivateCursor = () => document.body.classList.remove('cursor-hover');

    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', activateCursor);
      el.addEventListener('mouseleave', deactivateCursor);
    });

    window.addEventListener('mousemove', onMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', onMove);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', activateCursor);
        el.removeEventListener('mouseleave', deactivateCursor);
      });
    };
  }, []);

  return (
    <div className="page">
      <div className="cursor-glow" />
      <div className="cursor-dot" />
      <div className="cursor-ring" />
      <div className="tech-grid" />
      <div className="scanline" />
      <div className="beam beam-a" />
      <div className="beam beam-b" />
      <div className="rings">
        <span className="ring ring-1" />
        <span className="ring ring-2" />
        <span className="ring ring-3" />
      </div>
      <div className="matrix-cols" aria-hidden="true">
        {matrixCols.map((col) => (
          <span key={col} className="matrix-col" />
        ))}
      </div>
      <div className="particles" aria-hidden="true">
        {particles.map((id) => (
          <span key={id} className="particle" />
        ))}
      </div>
      <div className="bg-orb orb-one" />
      <div className="bg-orb orb-two" />

      <header className="hero section reveal">
        <p className="eyebrow">Portfolio</p>
        <h1>Rameshwari Rajendra Satpute</h1>
        <p className="subtitle typing-line">
          <span className="typed-text">{typedText}</span>
          <span className="caret" aria-hidden="true" />
        </p>
        <div className="status-row">
          <span className="status-dot" /> Open to internships and impactful engineering work
        </div>
        <div className="hero-meta">
          <a href="tel:+917875743747">+91 7875743747</a>
          <a href="mailto:rameshwaris1112@gmail.com">rameshwaris1112@gmail.com</a>
          <a href={profileLinks.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profileLinks.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span>Sangli, Maharashtra</span>
        </div>
      </header>

      <main>
        <section className="section ticker-wrap reveal">
          <div className="ticker">
            <span>React.js</span>
            <span>Node.js</span>
            <span>Express.js</span>
            <span>MongoDB</span>
            <span>TensorFlow.js</span>
            <span>REST APIs</span>
            <span>DSA</span>
            <span>Linux</span>
            <span>React.js</span>
            <span>Node.js</span>
            <span>Express.js</span>
            <span>MongoDB</span>
          </div>
        </section>

        <section className="section card reveal">
          <h2>About</h2>
          <p>
            I am a B.Tech CSE student at Walchand College of Engineering focused on end-to-end
            product development. Beyond writing code, I care about designing systems that are
            understandable, secure, and easy to evolve. I enjoy converting real-world problems into
            practical software with measurable outcomes, especially across backend APIs, React
            interfaces, and AI-assisted workflows.
          </p>
          <p>
            My working style is execution-heavy: define scope quickly, ship a reliable first
            version, then iterate based on testing and feedback. I am currently looking for
            internship opportunities where I can contribute to production features and learn from
            strong engineering teams.
          </p>
        </section>

        <section className="section reveal">
          <h2>Profile Snapshot</h2>
          <div className="grid skills">
            {highlights.map((item) => (
              <article className="card skill-card reveal" key={item.label}>
                <h3>{item.value}</h3>
                <p className="stack">{item.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section split reveal">
          <article className="card reveal">
            <h2>Engineering Principles</h2>
            <ul>
              {principles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card reveal" style={{ '--d': '120ms' }}>
            <h2>Currently Exploring</h2>
            <ul>
              {currentlyExploring.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="section reveal">
          <h2>Projects</h2>
          <div className="grid projects">
            {projects.map((project, index) => (
              <article className="card project-card reveal" key={project.name} style={{ '--d': `${index * 90}ms` }}>
                <h3>{project.name}</h3>
                <p className="stack">{project.stack}</p>
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      Live Demo
                    </a>
                  )}
                </div>
                <ul>
                  {project.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section split reveal">
          <article className="card reveal">
            <h2>Education</h2>
            <div className="timeline">
              <p>
                <strong>Walchand College of Engineering</strong>
                <br />
                B.Tech in CSE (2023-2027), CGPA: 8.78/10
              </p>
              <p>
                <strong>LGRPKP College</strong>
                <br />
                HSC (2023), 88.3%, MHTCET: 99.65 percentile
              </p>
              <p>
                <strong>RSK School</strong>
                <br />
                SSC (2021), 92.4%
              </p>
            </div>
          </article>

          <article className="card reveal" style={{ '--d': '120ms' }}>
            <h2>Profiles</h2>
            <ul className="profile-list">
              <li>
                <a href={profileLinks.leetcode} target="_blank" rel="noreferrer">
                  LeetCode: 600+ problems solved (Top 28%)
                </a>
              </li>
              <li>
                <a href={profileLinks.github} target="_blank" rel="noreferrer">
                  GitHub Profile
                </a>
              </li>
              <li>
                <a href={profileLinks.codolio} target="_blank" rel="noreferrer">
                  Codolio Profile
                </a>
              </li>
            </ul>
            <p className="note">All profile links are now connected from your resume.</p>
          </article>
        </section>

        <section className="section reveal">
          <h2>Coding Heatmaps</h2>
          <div className="split">
            <article className="card reveal">
              <h3>GitHub Contributions</h3>
              <a href={profileLinks.github} target="_blank" rel="noreferrer">
                <img
                  className="heatmap"
                  src="https://ghchart.rshah.org/RameshwariS"
                  alt="GitHub contribution heatmap for RameshwariS"
                />
              </a>
            </article>
            <article className="card reveal" style={{ '--d': '120ms' }}>
              <h3>LeetCode Heatmap</h3>
              <a href={profileLinks.leetcode} target="_blank" rel="noreferrer">
                <img
                  className="heatmap"
                  src="https://leetcard.jacoblin.cool/shrutisatpute1112?theme=light&ext=heatmap"
                  alt="LeetCode heatmap for shrutisatpute1112"
                />
              </a>
            </article>
          </div>
        </section>

        <section className="section reveal">
          <h2>Technical Skills</h2>
          <div className="grid skills">
            {skillGroups.map((group) => (
              <article className="card skill-card reveal" key={group.title}>
                <h3>{group.title}</h3>
                <div className="chips">
                  {group.items.map((skill) => (
                    <span key={skill} className="chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section split reveal">
          <article className="card reveal">
            <h2>Leadership</h2>
            <p>
              <strong>Main Program Director, WLUG</strong> (May 2025 - Present)
            </p>
            <ul>
              <li>Delivered a session at LinuxDiary 5.0 promoting Linux and open-source adoption.</li>
              <li>Coordinated Open Source Day 2k26 and LinuxDiary 6.0 technical initiatives.</li>
              <li>Featured on FOSS FILES S6 discussing Anycast and DNS routing.</li>
            </ul>
          </article>

          <article className="card reveal" style={{ '--d': '120ms' }}>
            <h2>Achievements</h2>
            <ul>
              {achievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
