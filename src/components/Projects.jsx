import { Fragment, useEffect, useRef, useState } from 'react';
import { flagshipProjects, otherProjects } from '../data.js';
import { reducedMotion } from '../hooks.js';
import { Links, Rule, SectionHead, pad } from './ui.jsx';
import Placeholder from './Placeholder.jsx';
import RateLimiter from './RateLimiter.jsx';

// The path a request takes through a project, with a packet travelling along it.
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
  if (project.demo === 'limiter') return <RateLimiter />;
  if (project.image) return <img className="p-img" src={project.image} alt={`${project.name} screenshot`} loading="lazy" />;
  return <Placeholder label={project.name} />;
}

// Featured projects are cards that pin under the header and stack. As the next
// card slides over, the one beneath eases back (scale + fade), driven by --p.
function Stack({ projects }) {
  const ref = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return undefined;
    const cards = [...ref.current.querySelectorAll('.pcard')];
    let raf = 0;
    const update = () => {
      raf = 0;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const a = card.getBoundingClientRect();
        const covered = 1 - (next.getBoundingClientRect().top - a.top) / a.height;
        card.style.setProperty('--p', Math.min(Math.max(covered, 0), 1).toFixed(3));
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="stack" ref={ref}>
      {projects.map((p, i) => (
        <article className="pcard" style={{ '--i': i }} key={p.name}>
          <div className="pcard-in">
            <header className="pcard-head">
              <span className="p-idx">{pad(i + 1)}</span>
              <h3 className="p-name">
                {p.name}
                {p.sub && <small>{p.sub}</small>}
              </h3>
              <div className="p-side">
                {p.badge && <span className="badge">{p.badge}</span>}
                <Links links={p.links} />
              </div>
            </header>
            <div className="pcard-body">
              <div className="p-info">
                <p className="p-stack">{p.stack.join(' · ')}</p>
                <ul className="points">
                  {p.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              </div>
              <div className="p-visual">
                <div className="frame"><Visual project={p} /></div>
                <Pipeline flow={p.flow} />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

// The remaining projects as an index. A row expands when selected.
function Index({ projects, offset }) {
  const [open, setOpen] = useState(-1);
  return (
    <ul className="index">
      {projects.map((p, i) => {
        const isOpen = open === i;
        return (
          // Open state lives in a data attribute, not the class list: the reveal
          // observer adds `in-view` to this element, and a changing className
          // would wipe it and hide the row again.
          <li className="idx reveal" data-open={isOpen} key={p.name}>
            <Rule />
            <button
              className="idx-row"
              aria-expanded={isOpen}
              aria-controls={`idx-${i}`}
              data-cursor={isOpen ? 'Close' : 'Open'}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className="p-idx">{pad(offset + i + 1)}</span>
              <span className="idx-name">{p.name}</span>
              <span className="idx-stack">{p.stack.join(' · ')}</span>
              <span className="idx-badge">{p.badge && <span className="badge">{p.badge}</span>}</span>
              <span className="idx-toggle" aria-hidden="true" />
            </button>
            <div className="idx-panel" id={`idx-${i}`} inert={!isOpen}>
              <div>
                <div className="idx-inner">
                  <ul className="points">
                    {p.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                  <Links links={p.links} />
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section wrap">
      <SectionHead index={3} label="Projects" codename="Missions" title="Things I've designed, built and *shipped.*" />
      <Stack projects={flagshipProjects} />
      <p className="label more-label"><span>(ii)</span>More projects<em>Side quests</em></p>
      <Index projects={otherProjects} offset={flagshipProjects.length} />
    </section>
  );
}
