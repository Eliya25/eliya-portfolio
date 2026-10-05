"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Runs the entrance and scroll-reveal animations for the current route.
 *
 * Markup opts in with `data-hero` (children animate in on load) and
 * `data-reveal` (element animates in when scrolled into view). The initial
 * hidden state comes from CSS gated on `html[data-motion="on"]`, which the
 * inline script in the root layout only sets when motion is allowed.
 */
export function PageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      root.dataset.motionReady = "true";

      gsap.utils.toArray<HTMLElement>("[data-hero]").forEach((hero) => {
        const title = hero.querySelector<HTMLElement>("h1");
        const rest = Array.from(hero.children).filter(
          (child) => child !== title,
        );

        gsap.fromTo(
          rest,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
            delay: 0.15,
          },
        );

        if (title) {
          gsap.set(title, { opacity: 1 });
          SplitText.create(title, {
            type: "lines",
            mask: "lines",
            linesClass: "hero-line",
            autoSplit: true,
            onSplit: (split) =>
              gsap.from(split.lines, {
                yPercent: 110,
                duration: 0.9,
                ease: "power4.out",
                stagger: 0.1,
                onComplete: () => split.revert(),
              }),
          });
        }
      });

      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (reveals.length === 0) return;

      gsap.set(reveals, { y: 28 });
      ScrollTrigger.batch(reveals, {
        start: "top 88%",
        once: true,
        onEnter: (elements) =>
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          }),
      });
    });

    return () => media.revert();
  }, [pathname]);

  return null;
}
