import Link from "next/link";

import { ThemeToggle } from "@/components/theme/theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner shell">
        <div>
          <Link className="site-name" href="/">
            Eliya Cohen
          </Link>
          <span className="site-role">
            {" "}
            · Backend Engineer &amp; Development Team Lead
          </span>
        </div>
        <nav className="header-actions" aria-label="Primary navigation">
          <Link className="site-nav-link" href="/projects">
            Projects
          </Link>
          <Link className="site-nav-link" href="/about">
            About
          </Link>
          <a
            className="site-nav-link header-github"
            href="https://github.com/Eliya25"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
