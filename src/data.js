// ── Site content ─────────────────────────────────────────────────────────
// Everything visible on the page lives here. Edit text, links and numbers
// in this file; the components only handle layout and motion.

export const profile = {
  first: 'Rameshwari',
  last: 'Satpute',
  eyebrow: 'Software Engineer — backend · Go · Java',
  email: 'rameshwaris1112@gmail.com',
  resume: '/Rameshwari_Satpute_Resume.pdf', // lives in /public
  location: 'Sangli · Pune, India',
};

export const links = {
  github: 'https://github.com/RameshwariS',
  linkedin: 'https://www.linkedin.com/in/rameshwari-satpute-8068322a6/',
  leetcode: 'https://leetcode.com/u/shrutisatpute1112/',
  medium: 'https://medium.com/@shrutisatpute1112',
};

export const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

// Cycled with a scramble effect in the hero: "I build ___"
export const roles = [
  'backend systems',
  'API gateways in Go',
  'Spring Boot services',
  'developer tools',
  'things that hold up under load',
];

export const heroFacts = ['Ex-UBS SWE intern', "B.Tech CSE · WCE '27", 'Meshery contributor'];

export const status = {
  title: 'Open to opportunities',
  sub: 'SDE internships & new-grad roles · graduating 2027',
};

export const about = {
  lead: 'I like the unglamorous parts of software — ',
  highlight: 'clean service boundaries, honest tests and APIs that hold up under load.',
  sub: 'CS undergrad at Walchand College of Engineering. Interned at UBS, build Go tooling on the side, and run open-source events at WLUG.',
};

// Bullets are [bold lead-in, rest of the sentence]
export const job = {
  role: 'Software Engineering Intern',
  org: 'UBS',
  when: 'Jun – Jul 2026 · Pune',
  bullets: [
    ['Shipped REST APIs', ' in Java + Spring Boot for a modular microservice architecture.'],
    ['Hit 97% test coverage', ' with JUnit and Mockito unit + integration tests.'],
    ['Sped up production endpoints', ' by debugging and optimising data services.'],
    ['Delivered in Agile sprints', ' through automated CI/CD, with peer code reviews.'],
  ],
  tags: ['Java', 'Spring Boot', 'REST', 'Microservices', 'JUnit', 'Mockito', 'CI/CD'],
  links: [
    { label: 'Internship certificate', href: 'https://drive.google.com/file/d/1Aw3TcIrtJFcYwCSWDRpV6ElHKEsTVLkz/view?usp=sharing' },
  ],
};

export const stats = [
  { value: 750, suffix: '+', label: 'LeetCode problems solved' },
  { value: 1745, label: 'Peak LeetCode rating' },
  { value: 97, suffix: '%', label: 'Test coverage at UBS' },
  { value: 180, suffix: '+', label: 'People at my Go talk' },
];

export const leadership = {
  role: 'Main Program Director, WLUG',
  org: "Walchand Linux Users' Group",
  when: 'May 2025 – now',
  bullets: [
    ['Ran 3 flagship events:', ' Open Source Day 2k26, LinuxDiary 6.0, Metamorphosis 2k26 — and built their CTF platform.'],
    ['Taught Docker + Go to 180+ people', ' at Metamorphosis; led 5+ hands-on workshops.'],
    ['Hosted FOSS FILES S6', ' on Anycast and DNS routing in modern web architecture.'],
  ],
  links: [
    { label: 'CTF platform', href: 'https://github.com/Walchand-Linux-Users-Group/Wargames_Meta_2k26' },
    { label: 'Go session code', href: 'https://github.com/RameshwariS/Meta2k26-GoS2' },
    { label: 'Watch FOSS FILES', href: 'https://www.youtube.com/live/UWKW6FXVXwQ' },
  ],
};

export const education = {
  degree: 'B.Tech, Computer Science',
  college: 'Walchand College of Engineering, Sangli',
  years: '2023 – 27',
  cgpa: 8.69,
};

export const awards = [
  { rank: '1st', title: 'WCE ACM Hackathon 2025', text: ' (Novice) — AI plant-disease detection, topped 20+ teams.' },
  { rank: '1st', title: 'TechFusion CodeDuet 2025', text: ' — pair-programming contest.' },
  { rank: 'Finalist', title: 'WCE ACM Hackathon 2026', text: ' — with DSVX, my dataset versioning system.' },
  { rank: 'Top 450', rankSub: '/ 2,300+', title: 'ICPC AlgoQueen 2025', text: ' — competitive programming.' },
  { rank: 'Mentee', title: 'Microsoft Code Without Barriers', text: ' — ML mentorship on responsible AI.' },
  {
    rank: 'Certified',
    title: 'Kubernetes (LFS158)',
    href: 'https://drive.google.com/file/d/1C5-zv8kojjhybwTP3mZ_J2hNhu5rVf7M/view?usp=sharing',
    text: ' · AWS Educate Cloud 101.',
  },
];

export const projects = {
  goproxyx: {
    name: 'GoProxyX',
    href: 'https://github.com/RameshwariS/GoProxyX',
    lead: 'An API gateway in Go that routes, authenticates and rate-limits every request.',
    bullets: [
      ['Race-free rate limiting:', ' Redis token bucket in atomic Lua, steady under bursty traffic.'],
      ['No double-selling:', ' transactional purchase flow on PostgreSQL.'],
      ['Middleware chain:', ' request ID → logging → recovery → JWT auth → rate limit.'],
    ],
    tags: ['Go', 'PostgreSQL', 'Redis', 'Lua', 'JWT', 'Docker Compose'],
  },
  dsvx: {
    name: 'DSVX',
    href: 'https://github.com/RameshwariS/Dataset-Versioning-System',
    lead: 'Git for datasets — every version content-addressed and reproducible.',
    badge: 'Finalist · WCE ACM Hackathon 2026',
    bullets: [
      ['Same input, same ID:', ' SHA-256 over raw data + preprocessing config.'],
      ['73.5% smaller', ' than full copies, via a snapshot/delta engine (5-version test).'],
      ['Lineage DAGs,', ' branching and diffs from a CLI and dashboard.'],
    ],
    tags: ['Python', 'CLI', 'SHA-256', 'ML tracking'],
    links: [
      { label: 'PyPI', href: 'https://pypi.org/project/dsvx/' },
      { label: 'Blog', href: 'https://medium.com/@shrutisatpute1112/dsvx-building-a-git-for-datasets-in-pure-python-a69bc694a1be' },
    ],
  },
  osc: {
    name: 'OpenSource­Companion', // soft hyphen = tidy break on narrow tiles
    href: 'https://github.com/RameshwariS/OPENSOURCECOMPANION',
    lead: 'Matches developers with beginner-friendly open-source issues.',
    bullets: [
      ['Personalised ranking', ' by skills, languages, labels and recency.'],
      ['Secure by default:', ' GitHub OAuth 2.0, JWT, encrypted tokens, RBAC.'],
      ['250+ backend tests', ' in CI; real-time Socket.io notifications.'],
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Docker'],
    links: [{ label: 'Live demo', href: 'https://opensourcecompanion-fam4.onrender.com/' }],
    // Purely illustrative UI in the tile preview
    mockIssues: [
      ['good first issue', 'Fix flaky CLI test', '94%'],
      ['help wanted', 'Add dark-mode toggle', '88%'],
      ['docs', 'Clarify local setup', '81%'],
    ],
  },
};

export const openSource = {
  title: 'Meshery · Layer5',
  counts: [
    [7, 'pull requests'],
    [3, 'repositories'],
    [1, 'merged'],
  ],
  prs: [
    { ref: 'meshery#22967', href: 'https://github.com/meshery/meshery/pull/22967', text: 'K8s context errors now surface instead of a misleading empty 200.' },
    { ref: 'meshery#23822', href: 'https://github.com/meshery/meshery/pull/23822', text: 'Load tests now hit every configured endpoint, not just the first.' },
    { ref: 'mesheryctl-axi', text: 'Design import / evaluate / deploy / undeploy, with --dry-run.' },
    { ref: 'layer5#8216', href: 'https://github.com/layer5io/layer5/pull/8216', text: 'Logo + text visibility fixed in light and dark modes.' },
  ],
  all: 'https://github.com/meshery/meshery/pulls?q=is%3Apr+author%3ARameshwariS',
};

export const skills = {
  core: ['Go', 'Java', 'Spring Boot', 'Node.js', 'Redis', 'Python', 'C++', 'Microservices', 'REST APIs', 'SQL'],
  tools: [
    'PostgreSQL', 'MySQL', 'MongoDB', 'PL/SQL', 'JavaScript', 'React.js', 'Express.js', 'HTML5 / CSS3', 'EJS',
    'JUnit', 'Mockito', 'Docker', 'Docker Compose', 'GitHub Actions', 'Kubernetes', 'AWS', 'Linux',
    'Claude · LLM APIs', 'GitHub Copilot',
  ],
  grounding: 'data structures & algorithms, OOP, operating systems, DBMS, computer networks, cloud computing, ML and GenAI.',
};

export const socials = [
  { label: 'GitHub', href: links.github, icon: 'github' },
  { label: 'LinkedIn', href: links.linkedin, icon: 'linkedin' },
  { label: 'LeetCode', href: links.leetcode, icon: 'leetcode' },
  { label: 'Medium', href: links.medium, icon: 'medium' },
];

// What the mascot says when poked
export const mascotLines = [
  '200 OK!',
  'ping → pong!',
  'psst… type "hire"',
  'all systems nominal',
  'rate limit: 1 hug/sec',
  'have you tried Go?',
];
