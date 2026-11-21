import { profile, profileLinks } from '../data.js';
import { Roll, Rule, Words } from './ui.jsx';

const elsewhere = [
  { label: 'GitHub', href: profileLinks.github },
  { label: 'LinkedIn', href: profileLinks.linkedin },
  { label: 'LeetCode', href: profileLinks.leetcode },
  { label: 'Codolio', href: profileLinks.codolio },
];

export function Contact({ onCopyEmail }) {
  return (
    <section id="contact" className="section wrap contact">
      <Rule />
      <p className="label"><span>(05)</span>Contact<em>Open a channel</em></p>
      <p className="contact-lead reveal">Have a role or a project in mind?</p>
      <a className="contact-big" href={`mailto:${profileLinks.email}`} data-cursor="Email">
        <Words text="Let's *talk*" />
        <span className="pulse" aria-hidden="true"><i /><i /><i /></span>
      </a>

      <dl className="contact-grid">
        <div className="reveal">
          <Rule />
          <dt>Email</dt>
          <dd><button className="plain-link" data-cursor="Copy" onClick={onCopyEmail}><Roll>{profileLinks.email}</Roll></button></dd>
        </div>
        <div className="reveal" style={{ transitionDelay: '80ms' }}>
          <Rule />
          <dt>Also at</dt>
          <dd><a className="plain-link" href={`mailto:${profileLinks.altEmail}`}><Roll>{profileLinks.altEmail}</Roll></a></dd>
        </div>
        <div className="reveal" style={{ transitionDelay: '160ms' }}>
          <Rule />
          <dt>Phone</dt>
          <dd><a className="plain-link" href={`tel:${profileLinks.phone.replace(/\s/g, '')}`}><Roll>{profileLinks.phone}</Roll></a></dd>
        </div>
        <div className="reveal" style={{ transitionDelay: '240ms' }}>
          <Rule />
          <dt>Elsewhere</dt>
          <dd className="elsewhere">
            {elsewhere.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="plain-link"><Roll>{l.label}</Roll></a>
            ))}
          </dd>
        </div>
      </dl>
    </section>
  );
}

export function Footer({ isMac }) {
  return (
    <footer className="footer wrap">
      <span>&copy; {new Date().getFullYear()} {profile.first} {profile.last} &middot; end of transmission</span>
      <span className="footer-hint">Press <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd> <kbd>K</kbd> to jump anywhere</span>
      <button className="plain-link" data-magnetic="0.4" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Roll>Back to top</Roll> &uarr;</button>
    </footer>
  );
}
