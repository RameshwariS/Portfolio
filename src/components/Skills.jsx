import { achievements, leetcode, profileLinks, skillCategories } from '../data.js';
import { Arrow, Ext, Rule, SectionHead } from './ui.jsx';

export default function Skills({ theme }) {
  return (
    <section id="skills" className="section wrap">
      <SectionHead index={4} label="Skills" codename="Constellation" title="The *stack* I reach for." />

      <div className="matrix">
        {skillCategories.map((c) => (
          <div className={`row mrow reveal ${c.small ? 'small' : ''}`} key={c.title}>
            <Rule />
            <h3 className="mlabel">{c.title}</h3>
            <ul className="mitems">
              {c.items.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="split recog">
        <h3 className="label"><span>(iii)</span>Recognition<em>Signals received</em></h3>
        <ol className="awards">
          {achievements.map((a) => (
            <li className="row reveal" key={a.title}>
              <Rule />
              <span className="aw-kind">{a.kind}</span>
              <span className="aw-body">
                <b>{a.title}</b>
                {a.detail}
                {a.link && <Ext href={a.link.href}>{a.link.label}</Ext>}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="signals">
        <a className="signal reveal" href={profileLinks.leetcode} target="_blank" rel="noreferrer" data-cursor="Open">
          <span className="signal-bar"><span>LeetCode</span><Arrow /></span>
          <span className="signal-figures">
            <span><b>{leetcode.solved}</b>solved</span>
            <span><b>{leetcode.rating}</b>rating ({leetcode.ratingNote})</span>
            <span><b>{leetcode.rank}</b>global</span>
          </span>
          <img src={`https://leetcard.jacoblin.cool/shrutisatpute1112?theme=${theme}&font=Inter&ext=heatmap`} alt="LeetCode stats and heatmap" loading="lazy" />
        </a>
        <a className="signal reveal" href={profileLinks.github} target="_blank" rel="noreferrer" data-cursor="Open">
          <span className="signal-bar"><span>GitHub activity</span><Arrow /></span>
          <img className="gh-chart" src="https://ghchart.rshah.org/1a1a1a/RameshwariS" alt="GitHub contributions chart" loading="lazy" />
        </a>
      </div>
    </section>
  );
}
