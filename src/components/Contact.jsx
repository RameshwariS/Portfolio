import { profile, profileLinks } from '../data.js';
import { Arrow, Flower, Heart, Sparkle, Squiggle } from './ui.jsx';

const elsewhere = [
  { label: 'GitHub', href: profileLinks.github },
  { label: 'LinkedIn', href: profileLinks.linkedin },
  { label: 'LeetCode', href: profileLinks.leetcode },
  { label: 'Codolio', href: profileLinks.codolio },
];

export function Contact({ onCopyEmail }) {
  return (
    <section id="contact" className="section wrap">
      <div className="contact reveal">
        <Flower className="float c1" />
        <Sparkle className="float c2" />
        <Heart className="float c3" />
        <Sparkle className="float c4" />

        <p className="kicker"><span>05</span>say hello</p>
        <p className="contact-lead">Have a role or a project in mind?</p>
        <a className="contact-big" href={`mailto:${profileLinks.email}`} data-cursor="email me">
          Let&apos;s talk
          <Squiggle />
        </a>

        <div className="contact-row">
          <button className="btn" data-cursor="copy" onClick={onCopyEmail}>{profileLinks.email}<small>copy</small></button>
          <a className="btn" href={`mailto:${profileLinks.altEmail}`}>{profileLinks.altEmail}</a>
          <a className="btn" href={`tel:${profileLinks.phone.replace(/\s/g, '')}`}>{profileLinks.phone}</a>
        </div>
        <div className="contact-row socials">
          {elsewhere.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="btn small">{l.label} <Arrow size={12} /></a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer({ isMac }) {
  return (
    <footer className="footer wrap">
      <span>&copy; {new Date().getFullYear()} {profile.first} {profile.last} &middot; made with <Heart /> and React</span>
      <span className="footer-hint">press <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd> <kbd>K</kbd> to jump anywhere</span>
      <button className="btn small" data-magnetic="0.4" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top &uarr;</button>
    </footer>
  );
}
