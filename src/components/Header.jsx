import { navItems, profile } from '../data.js';
import { Icon } from './ui.jsx';

export default function Header() {
  return (
    <header className="nav">
      <a className="nav__logo" href="#top" aria-label="Rameshwari Satpute, back to top">RS <i aria-hidden="true" /></a>
      <nav className="nav__links" aria-label="Primary">
        {navItems.map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
      </nav>
      <a className="nav__cta" href={profile.resume} download data-magnetic="0.25">
        Résumé <Icon name="download" />
      </a>
    </header>
  );
}
