import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NESHAN_API_KEY } from '../../data/constants';

const TEHRAN_CENTER = [35.7219, 51.3347];
const TEHRAN_BOUNDS = [
  [35.55, 51.10],
  [35.86, 51.62]
];

const TEHRAN_TOUR = [
  { name: 'هدیش مال', coords: [35.8024, 51.4248] },
  { name: 'ایران مال', coords: [35.7536, 51.1855] },
  { name: 'پالادیوم', coords: [35.8028, 51.4295] },
  { name: 'برج میلاد', coords: [35.7448, 51.3753] },
  { name: 'ونک', coords: [35.7572, 51.4099] },
  { name: 'تجریش', coords: [35.8045, 51.4304] },
  { name: 'میدان آزادی', coords: [35.6997, 51.3381] },
  { name: 'آرژانتین', coords: [35.7370, 51.4155] },
  { name: 'شهرک غرب', coords: [35.7595, 51.3758] },
  { name: 'سعادت‌آباد', coords: [35.7870, 51.3730] },
  { name: 'چیتگر', coords: [35.7455, 51.1950] },
  { name: 'باملند', coords: [35.7540, 51.2270] }
];

function parseCoords(value) {
  if (!value) return null;

  if (Array.isArray(value) && value.length >= 2) {
    const lat = Number(value[0]);
    const lng = Number(value[1]);
    return Number.isFinite(lat) && Number.isFinite(lng) ? [lat, lng] : null;
  }

  const parts = String(value)
    .replace(/[^0-9,.-]/g, '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length < 2) return null;

  const lat = Number(parts[0]);
  const lng = Number(parts[1]);
  return Number.isFinite(lat) && Number.isFinite(lng) ? [lat, lng] : null;
}

function isInTehran(coords) {
  if (!coords) return false;
  const [lat, lng] = coords;
  return lat >= 35.55 && lat <= 35.86 && lng >= 51.10 && lng <= 51.62;
}

export function IranMap({ active = true }) {
  const { complexes } = useApp();
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const lastIndexRef = useRef(-1);
  const pausedUntilRef = useRef(0);
  const [hasTiles, setHasTiles] = useState(false);
  const [tourLabel, setTourLabel] = useState('تهران');

  const tourStops = useMemo(() => {
    const fromComplexes = (complexes || [])
      .map((complex) => {
        const coords = parseCoords(complex?.location);
        if (!isInTehran(coords)) return null;
        return { name: complex.name, coords };
      })
      .filter(Boolean);

    const extras = TEHRAN_TOUR.filter((stop) => (
      !fromComplexes.some((item) => item.name === stop.name)
    ));

    return [...fromComplexes, ...extras];
  }, [complexes]);

  useEffect(() => {
    if (!active || !containerRef.current || typeof window === 'undefined') return;

    const Leaflet = window.L;
    if (!Leaflet) {
      setHasTiles(false);
      return;
    }

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    let map;
    try {
      map = new Leaflet.Map(containerRef.current, {
        key: NESHAN_API_KEY,
        maptype: 'neshan',
        poi: true,
        traffic: false,
        center: TEHRAN_CENTER,
        zoom: 12,
        minZoom: 10,
        maxZoom: 17,
        zoomControl: false,
        attributionControl: false,
        maxBounds: TEHRAN_BOUNDS,
        maxBoundsViscosity: 0.7
      });
    } catch {
      setHasTiles(false);
      return;
    }

    Leaflet.control.zoom({ position: 'bottomleft' }).addTo(map);
    mapRef.current = map;
    setHasTiles(true);

    const resizeSoon = window.setTimeout(() => map.invalidateSize(), 80);
    const resizeLater = window.setTimeout(() => map.invalidateSize(), 450);
    const onResize = () => map.invalidateSize();
    window.addEventListener('resize', onResize);

    return () => {
      window.clearTimeout(resizeSoon);
      window.clearTimeout(resizeLater);
      window.removeEventListener('resize', onResize);
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [active]);

  useEffect(() => {
    if (!active || !hasTiles || !mapRef.current || !tourStops.length) return;

    const Leaflet = window.L;
    const map = mapRef.current;
    if (!Leaflet || !map) return;

    const flyingRef = { current: false };

    const flyToStop = (stop) => {
      if (!stop) return;
      setTourLabel(stop.name);
      const zoom = 15 + Math.floor(Math.random() * 2);
      flyingRef.current = true;
      map.flyTo(stop.coords, zoom, { duration: 1.6, easeLinearity: 0.25 });
      map.once('moveend', () => {
        flyingRef.current = false;
      });

      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }
      markerRef.current = Leaflet.circleMarker(stop.coords, {
        radius: 9,
        color: '#c4121a',
        weight: 3,
        fillColor: '#ff4d4d',
        fillOpacity: 0.95
      }).addTo(map).bindTooltip(stop.name, { direction: 'top', permanent: true });
    };

    const pauseTour = () => {
      if (flyingRef.current) return;
      pausedUntilRef.current = Date.now() + 12000;
    };
    map.on('dragstart', pauseTour);
    map.on('zoomstart', pauseTour);

    const first = tourStops[Math.floor(Math.random() * tourStops.length)];
    lastIndexRef.current = tourStops.indexOf(first);
    flyToStop(first);

    const timer = window.setInterval(() => {
      if (Date.now() < pausedUntilRef.current) return;
      if (!tourStops.length) return;
      let next = Math.floor(Math.random() * tourStops.length);
      if (tourStops.length > 1) {
        while (next === lastIndexRef.current) {
          next = Math.floor(Math.random() * tourStops.length);
        }
      }
      lastIndexRef.current = next;
      flyToStop(tourStops[next]);
    }, 5000);

    return () => {
      window.clearInterval(timer);
      map.off('dragstart', pauseTour);
      map.off('zoomstart', pauseTour);
    };
  }, [active, hasTiles, tourStops]);

  return (
    <section className="iran-map-section" aria-label="نقشه تهران">
      <div className="iran-map-frame">
        <div ref={containerRef} className="iran-map-canvas" />
        <div className="map-tour-label">
          <i className="fas fa-map-marker-alt"></i>
          <span>{tourLabel}</span>
        </div>
        <svg className={`iran-map-fallback ${hasTiles ? 'is-hidden' : ''}`} viewBox="0 0 620 540" role="img" aria-label="تهران">
          <path
            className="iran-land"
            d="M28 20 L78 16 L118 36 L148 58 C168 72 188 88 214 100 C248 114 278 104 318 100 C368 92 418 80 470 70 C510 64 548 86 558 124 C564 152 550 178 546 208 C540 242 556 278 582 322 C604 360 618 404 612 444 C604 486 568 514 522 522 C478 508 442 486 404 474 C366 478 328 486 286 456 C246 424 206 388 168 350 C142 318 122 282 100 244 C76 206 48 176 32 140 C22 108 20 68 28 20 Z"
          />
          <circle className="iran-capital" cx="248" cy="156" r="7" />
        </svg>
      </div>
    </section>
  );
}
