"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="hero shell" aria-labelledby="error-title">
      <p className="eyebrow">Unexpected error</p>
      <h1 id="error-title">Something went wrong.</h1>
      <p className="hero-copy">
        The page could not be loaded. Please try again.
      </p>
      <button className="button" type="button" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
