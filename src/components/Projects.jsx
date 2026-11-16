import { Fragment } from 'react';
import { flagshipProjects, otherProjects } from '../data.js';
import { Chips, Links, SectionHead, Window, pad } from './ui.jsx';
import Placeholder from './Placeholder.jsx';
import RateLimiter from './RateLimiter.jsx';

const CARD_COLORS = ['pink', 'lav', 'mint'];
const NOTE_COLORS = ['butter', 'sky', 'peach', 'mint'];

// The path a request takes through a project, with a heart travelling along it.
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

function Visual({ project }) {
  if (project.demo === 'limiter') return <Window title="cookie_jar.go"><RateLimiter /></Window>;
  if (project.image) return <Window title="screenshot.png"><img className="proj-img" src={project.image} alt={`${project.name} screenshot`} loading="lazy" /></Window>;
  return <Window title="screenshot.png"><Placeholder label={project.name} /></Window>;
}

// A featured project: big pastel card, details on one side, a window on the other.
function Feature({ project, index }) {
  return (
    <article className={`proj c-${CARD_COLORS[index % 3]} reveal`}>
      <div className="proj-info">
        <p className="proj-kicker">
          <span>project {pad(index + 1)}</span>
          {project.badge && <span className="pill c-butter">{project.badge}</span>}
        </p>
        <h3 className="proj-name">
          {project.name}
          {project.sub && <small>{project.sub}</small>}
        </h3>
        <Chips items={project.stack} />
        <ul className="bullets">
          {project.bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
        <Links links={project.links} />
      </div>
      <div className="proj-visual">
        <Visual project={project} />
        <Pipeline flow={project.flow} />
      </div>
    </article>
  );
}

// Smaller projects as sticky notes, taped on at slight angles.
function Note({ project, index }) {
  return (
    <article className={`note c-${NOTE_COLORS[index % 4]} reveal`} style={{ '--tilt': `${index % 2 ? 1.2 : -1.2}deg`, transitionDelay: `${(index % 2) * 90}ms` }}>
      <span className="tape" aria-hidden="true" />
      {project.badge && <span className="pill c-paper note-badge">{project.badge}</span>}
      <h4 className="note-name">{project.name}</h4>
      <Chips items={project.stack} />
      <ul className="bullets">
        {project.bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
      <Links links={project.links} />
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section wrap">
      <SectionHead index={3} kicker="projects">Things I&apos;ve designed, built and <em>shipped.</em></SectionHead>
      <div className="features">
        {flagshipProjects.map((p, i) => <Feature project={p} index={i} key={p.name} />)}
      </div>
      <h3 className="sub-head reveal">and a few more, on sticky notes</h3>
      <div className="notes">
        {otherProjects.map((p, i) => <Note project={p} index={i} key={p.name} />)}
      </div>
    </section>
  );
}
