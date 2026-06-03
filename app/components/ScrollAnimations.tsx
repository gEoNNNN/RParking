'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset any previously revealed elements so they animate again
    document.querySelectorAll('[data-reveal].in-view').forEach((el) =>
      el.classList.remove('in-view')
    );

    const els = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.revealDelay ?? '0', 10);
            setTimeout(() => el.classList.add('in-view'), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]); // re-run every time the route changes

  return null;
}
