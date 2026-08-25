import React, { useEffect, useMemo } from 'react';

const LINE_COUNT = 22;
const INTRO_MS = 3600;

export function IntroSplash({ onComplete }) {
  const lines = useMemo(() => (
    Array.from({ length: LINE_COUNT }, (_, index) => {
      const angle = (index / LINE_COUNT) * 360;
      const length = 160 + (index % 6) * 36;
      return {
        id: index,
        angle,
        length,
        delay: 0.04 * index,
        thickness: index % 4 === 0 ? 2.4 : 1.2
      };
    })
  ), []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      onComplete?.();
    }, INTRO_MS);

    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="intro-splash" aria-hidden="true">
      <div className="intro-grid" />

      {lines.map((line) => (
        <span
          key={line.id}
          className="intro-line"
          style={{
            '--ang': `${line.angle}deg`,
            '--len': `${line.length}px`,
            '--delay': `${line.delay}s`,
            '--thick': `${line.thickness}px`
          }}
        />
      ))}

      <span className="intro-cross intro-cross-x" />
      <span className="intro-cross intro-cross-y" />
      <span className="intro-ring" />

      <div className="intro-logo-wrap">
        <img src="/pvice.png" alt="لوگو" className="intro-logo" />
        <span className="intro-logo-text">| Parking system</span>
      </div>
    </div>
  );
}
