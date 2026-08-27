import Link from "next/link";

export default function NotFound() {
  return (
    <section className="hero shell" aria-labelledby="not-found-title">
      <p className="eyebrow">404 · Page not found</p>
      <h1 id="not-found-title">This page does not exist.</h1>
      <p className="hero-copy">
        The address may have changed or the page may have moved.
      </p>
      <Link className="button" href="/">
        Return home
      </Link>
    </section>
  );
}
