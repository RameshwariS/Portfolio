import { memo } from 'react';
import { openSource, projects } from '../data.js';
import RateLimiter from './RateLimiter.jsx';
import { Chips, Meta, SecHead, Tags, Ticks, Tile } from './ui.jsx';

const { goproxyx: gp, dsvx, osc } = projects;

/** Project title whose link stretches over the whole tile. */
const Title = ({ p }) => (
  <h3 className="proj__title">
    <a className="stretch" href={p.href} target="_blank" rel="noopener noreferrer">{p.name}</a>
  </h3>
);

/** DSVX version graph: main line v1→HEAD plus a branch, drawn on hover. */
const VersionGraph = () => (
  <div className="dag" aria-hidden="true">
    <svg viewBox="0 0 240 92">
      <path d="M18 30 H222" />
      <path className="br" d="M114 30 C130 30 128 68 146 68 H222" />
      {[18, 66, 114, 162].map((x) => <circle key={x} cx={x} cy="30" r="5" />)}
      <circle className="head" cx="222" cy="30" r="5" />
      <circle cx="170" cy="68" r="5" /><circle cx="222" cy="68" r="5" />
      {['v1', 'v2', 'v3', 'v4'].map((v, i) => <text key={v} x={10 + i * 48} y="14">{v}</text>)}
      <text x="208" y="14">HEAD</text>
      <text x="150" y="88">clean-v2</text><text x="208" y="88">v6</text>
    </svg>
  </div>
);

function Projects() {
  return (
    <section id="projects" className="section wrap" aria-labelledby="projects-title">
      <SecHead idx="03" id="projects-title" title="Projects" note="GET /projects?sort=impact" />

      <div className="bento bento--projects">
        {/* Featured: GoProxyX with a live rate-limiter simulation */}
        <Tile className="t-feat project" data-cursor="view">
          <div className="preview" aria-hidden="true" />
          <div className="feat__text">
            <Meta path="/projects/goproxyx" status="featured" />
            <Title p={gp} />
            <p className="proj__lead">{gp.lead}</p>
            <Ticks items={gp.bullets} />
            <Tags items={gp.tags} slide />
            <Chips links={[{ label: 'Source on GitHub', href: gp.href }]} />
          </div>
          <RateLimiter />
        </Tile>

        <Tile className="t-dsvx project" data-cursor="view">
          <div className="preview" aria-hidden="true" />
          <Meta path="/projects/dsvx" status="on PyPI" />
          <VersionGraph />
          <Title p={dsvx} />
          <p className="proj__lead">{dsvx.lead}</p>
          <span className="badge">{dsvx.badge}</span>
          <Ticks items={dsvx.bullets} />
          <Tags items={dsvx.tags} slide />
          <Chips links={dsvx.links} />
        </Tile>

        <Tile className="t-osc project" data-cursor="view">
          <div className="preview" aria-hidden="true" />
          <div className="osc__text">
            <Meta path="/projects/osc" status="live" />
            <Title p={osc} />
            <p className="proj__lead">{osc.lead}</p>
            <Ticks items={osc.bullets} />
            <Tags items={osc.tags} slide />
            <Chips links={osc.links} />
          </div>
          <div className="issues" aria-hidden="true">
            <p className="issues__cap">// recommended for you (illustration)</p>
            {osc.mockIssues.map(([label, title, match]) => (
              <div className="issue" key={title}><em>{label}</em><span>{title}</span><b>{match}</b></div>
            ))}
          </div>
        </Tile>

        <Tile className="t-oss">
          <Meta path="/open-source/meshery" status="CNCF" />
          <h3 className="h3 oss__title">{openSource.title}</h3>
          <div className="oss__count">
            {openSource.counts.map(([n, label]) => <div key={label}>{n}<small>{label}</small></div>)}
          </div>
          <ul className="prs">
            {openSource.prs.map((pr) => (
              <li key={pr.ref}>
                {pr.href
                  ? <a href={pr.href} target="_blank" rel="noopener noreferrer"><code>{pr.ref}</code></a>
                  : <code>{pr.ref}</code>}
                <span>{pr.text}</span>
              </li>
            ))}
          </ul>
          <Chips links={[{ label: 'All my PRs', href: openSource.all }]} />
        </Tile>
      </div>
    </section>
  );
}

export default memo(Projects);
