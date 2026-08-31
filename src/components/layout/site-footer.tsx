import { profileLinks } from "@/lib/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner shell">
        <span>© {new Date().getFullYear()} Eliya Cohen</span>
        <div className="site-footer-links">
          {profileLinks.map((link) => (
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              key={link.label}
            >
              {link.label} <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
