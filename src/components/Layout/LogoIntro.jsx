import React, { useEffect, useRef, useState } from 'react';
import './LogoIntro.css';

function sampleLogoPoints(image, width, height) {
  const offscreen = document.createElement('canvas');
  const cols = 84;
  const rows = 96;
  offscreen.width = cols;
  offscreen.height = rows;
  const context = offscreen.getContext('2d', { willReadFrequently: true });
  context.drawImage(image, 0, 0, cols, rows);
  const pixels = context.getImageData(0, 0, cols, rows).data;
  const points = [];

  for (let y = 0; y < rows; y += 2) {
    for (let x = 0; x < cols; x += 2) {
      const index = (y * cols + x) * 4;
      const r = pixels[index];
      const g = pixels[index + 1];
      const b = pixels[index + 2];
      const a = pixels[index + 3];
      if (a < 24) continue;
      if (r < 22 && g < 22 && b < 22) continue;

      const angle = Math.random() * Math.PI * 2;
      const distance = 240 + Math.random() * 280;
      const tx = (x / cols) * width;
      const ty = (y / rows) * height;
      points.push({
        x: tx + Math.cos(angle) * distance,
        y: ty + Math.sin(angle) * distance,
        tx,
        ty,
        color: `rgb(${r}, ${g}, ${b})`
      });
    }
  }

  return points;
}

export function LogoIntro({
  logoSrc = '/sp-logo.png',
  onComplete = () => {},
  altText = 'لوگو'
}) {
  const canvasRef = useRef(null);
  const [exiting, setExiting] = useState(false);
  const [formed, setFormed] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduced) {
      setFormed(true);
      const timer = window.setTimeout(() => setExiting(true), 80);
      return () => window.clearTimeout(timer);
    }

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d');
    if (!context) {
      setFormed(true);
      return undefined;
    }

    const width = (canvas.width = 360);
    const height = (canvas.height = 410);
    const image = new Image();
    image.src = logoSrc;
    let frame = 0;
    let start = 0;
    let points = [];

    const draw = (now) => {
      if (!start) start = now;
      const time = Math.min(1, (now - start) / 1450);
      const ease = 1 - (1 - time) ** 3;
      context.clearRect(0, 0, width, height);
      context.lineCap = 'round';

      for (const point of points) {
        const x = point.x + (point.tx - point.x) * ease;
        const y = point.y + (point.ty - point.y) * ease;
        const trail = (1 - ease) * 26;
        context.strokeStyle = point.color;
        context.lineWidth = 1.8 + ease * 1.2;
        context.globalAlpha = 0.35 + ease * 0.65;
        context.beginPath();
        context.moveTo(x - trail * 0.4, y - trail * 0.15);
        context.lineTo(x, y);
        context.stroke();
      }

      if (time < 1) {
        frame = window.requestAnimationFrame(draw);
      } else {
        setFormed(true);
      }
    };

    const startAnimation = () => {
      points = sampleLogoPoints(image, width, height);
      frame = window.requestAnimationFrame(draw);
    };

    if (image.complete) startAnimation();
    else image.onload = startAnimation;

    return () => window.cancelAnimationFrame(frame);
  }, [logoSrc]);

  useEffect(() => {
    if (!formed) return undefined;
    const timer = window.setTimeout(() => setExiting(true), 1100);
    return () => window.clearTimeout(timer);
  }, [formed]);

  useEffect(() => {
    if (!exiting) return undefined;
    const timer = window.setTimeout(onComplete, 720);
    return () => window.clearTimeout(timer);
  }, [exiting, onComplete]);

  return (
    <div
      className={`logo-intro${exiting ? ' is-exiting' : ''}`}
      onClick={() => setExiting(true)}
      role="presentation"
    >
      <div className="logo-intro-glow" />
      <div className="logo-stage">
        <canvas ref={canvasRef} className="logo-canvas" aria-hidden="true" />
        <img
          src={logoSrc}
          alt={altText}
          className={`logo-photo${formed ? ' is-formed' : ''}`}
        />
        <span className={`logo-shine${formed ? ' is-formed' : ''}`} />
      </div>
    </div>
  );
}
