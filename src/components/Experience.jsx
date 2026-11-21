import { memo } from 'react';
import { awards, education, job, leadership, stats } from '../data.js';
import { Chips, Meta, SecHead, Tags, Ticks, Tile } from './ui.jsx';

function Experience() {
  return (
    <section id="work" className="section wrap" aria-labelledby="work-title">
      <SecHead idx="02" id="work-title" title="Work" note="GET /experience" />

      <div className="bento bento--work">
        <Tile className="t-exp">
          <Meta path="/experience/ubs" status="200" />
          <div className="exp__head">
            <div>
              <p className="kicker">{job.when}</p>
              <h3 className="h3">{job.role}</h3>
              <p className="org">{job.org}</p>
            </div>
            <span className="exp__mark" aria-hidden="true">{job.org}</span>
          </div>
          <Ticks items={job.bullets} />
          <Tags items={job.tags} />
          <Chips links={job.links} />
        </Tile>

        <Tile className="t-stats">
          <Meta path="/metrics" status="200" />
          <dl className="stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd aria-label={`${s.value}${s.suffix || ''}`}>
                  <span data-count={s.value}>{s.value}</span>{s.suffix && <i>{s.suffix}</i>}
                </dd>
              </div>
            ))}
          </dl>
        </Tile>

        <Tile className="t-lead">
          <Meta path="/leadership/wlug" status={leadership.when} />
          <h3 className="h3">{leadership.role}</h3>
          <p className="org">{leadership.org}</p>
          <Ticks items={leadership.bullets} />
          <Chips links={leadership.links} />
        </Tile>

        <Tile className="t-edu">
          <Meta path="/education" status={education.years} />
          <h3 className="h3">{education.degree}</h3>
          <p className="org">{education.college}</p>
          <p className="cgpa" aria-label={`CGPA ${education.cgpa} out of 10`}>
            <span data-count={education.cgpa} data-decimals="2">{education.cgpa.toFixed(2)}</span><small>/ 10 CGPA</small>
          </p>
        </Tile>

        <Tile className="t-achv">
          <Meta path="/achievements" status={`${awards.length} records`} />
          <ol className="awards">
            {awards.map((a) => (
              <li key={a.title}>
                <b>{a.rank}{a.rankSub && <span> {a.rankSub}</span>}</b>
                <p>
                  {a.href
                    ? <a href={a.href} target="_blank" rel="noopener noreferrer"><strong>{a.title}</strong></a>
                    : <strong>{a.title}</strong>}
                  {a.text}
                </p>
              </li>
            ))}
          </ol>
        </Tile>
      </div>
    </section>
  );
}

export default memo(Experience);
