import { achievements, leetcode, profileLinks, skillCategories } from '../data.js';
import { Arrow, Chips, Ext, SectionHead, Window } from './ui.jsx';

const SKILL_COLORS = ['pink', 'lav', 'mint', 'butter', 'sky', 'peach'];
const KIND_COLORS = { '1st place': 'butter', Finalist: 'lav', 'Top 450': 'sky', Mentee: 'pink', Certified: 'mint' };

export default function Skills({ theme }) {
  return (
    <section id="skills" className="section wrap">
      <SectionHead index={4} kicker="skills">The <em>stack</em> I reach for.</SectionHead>

      <div className="skill-wall">
        {skillCategories.map((c, i) => (
          <div className={`card skill c-${SKILL_COLORS[i % 6]} reveal`} key={c.title}>
            <h3 className="skill-title">{c.title}</h3>
            <Chips items={c.items} />
          </div>
        ))}
      </div>

      <h3 className="sub-head reveal">little wins along the way</h3>
      <ol className="card awards reveal">
        {achievements.map((a) => (
          <li key={a.title}>
            <span className={`pill c-${KIND_COLORS[a.kind] || 'peach'}`}>{a.kind}</span>
            <span className="aw-title">{a.title}</span>
            {(a.detail || a.link) && (
              <small>{a.detail} {a.link && <Ext href={a.link.href}>{a.link.label}</Ext>}</small>
            )}
          </li>
        ))}
      </ol>

      <div className="signals">
        <a className="signal reveal" href={profileLinks.leetcode} target="_blank" rel="noreferrer" data-cursor="visit">
          <Window title="leetcode.exe">
            <span className="signal-figures">
              <span><b>{leetcode.solved}</b>solved</span>
              <span><b>{leetcode.rating}</b>rating ({leetcode.ratingNote})</span>
              <span><b>{leetcode.rank}</b>global</span>
            </span>
            <img src={`https://leetcard.jacoblin.cool/shrutisatpute1112?theme=${theme}&font=Nunito&ext=heatmap`} alt="LeetCode stats and heatmap" loading="lazy" />
          </Window>
        </a>
        <a className="signal reveal" href={profileLinks.github} target="_blank" rel="noreferrer" data-cursor="visit">
          <Window title="github_activity.png">
            <img className="gh-chart" src="https://ghchart.rshah.org/d94f83/RameshwariS" alt="GitHub contributions chart" loading="lazy" />
            <span className="signal-foot">View profile <Arrow /></span>
          </Window>
        </a>
      </div>
    </section>
  );
}
