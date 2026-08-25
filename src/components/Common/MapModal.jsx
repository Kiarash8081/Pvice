import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { NESHAN_API_KEY } from '../../data/constants';

export function MapModal() {
  const { language } = useApp();
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState('');
  const [selectMode, setSelectMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('35.699756, 51.338076');
  const [callback, setCallback] = useState(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapContainerRef = useRef(null);

  const parseLocation = (value) => {
    if (!value) {
      return { lat: 35.699756, lng: 51.338076 };
    }

    if (Array.isArray(value) && value.length >= 2) {
      const [lat, lng] = value;
      return { lat: Number(lat), lng: Number(lng) };
    }

    const cleaned = String(value).replace(/[^0-9,.-]/g, '');
    const parts = cleaned.split(',').map((p) => p.trim()).filter(Boolean);

    if (parts.length >= 2) {
      const lat = Number(parts[0]);
      const lng = Number(parts[1]);
      if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
        return { lat, lng };
      }
    }

    return { lat: 35.699756, lng: 51.338076 };
  };

  const openMap = (complex, isSelectionMode = false, onSelect = null) => {
    const location = complex?.location || complex?.name || '35.699756, 51.338076';
    const coords = parseLocation(location);
    setTitle(complex?.name || 'موقعیت مکانی');
    setIsActive(true);
    setSelectMode(Boolean(isSelectionMode));
    setSelectedLocation(`${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`);
    setCallback(typeof onSelect === 'function' ? onSelect : null);
  };

  const translations = {
    fa: { location: 'موقعیت مکانی', save: 'ثبت مکان', close: 'بستن' },
    en: { location: 'Location', save: 'Save location', close: 'Close' },
    ar: { location: 'الموقع', save: 'حفظ الموقع', close: 'إغلاق' },
    zh: { location: '位置', save: '保存位置', close: '关闭' },
    es: { location: 'Ubicación', save: 'Guardar ubicación', close: 'Cerrar' }
  };

  const text = translations[language] || translations.fa;

  const closeMap = () => {
    setIsActive(false);
    setSelectMode(false);
    setCallback(null);
  };

  const confirmSelection = () => {
    if (typeof callback === 'function') {
      callback(selectedLocation);
    }
    closeMap();
  };

  useEffect(() => {
    window.openMapModal = openMap;
    window.closeMapModal = closeMap;
  }, []);

  useEffect(() => {
    if (!isActive || !mapContainerRef.current || typeof window === 'undefined') return;

    const Leaflet = window.L;
    if (!Leaflet) {
      console.error('Neshan map SDK not loaded.');
      return;
    }

    const { lat, lng } = parseLocation(selectedLocation);

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = new Leaflet.Map(mapContainerRef.current, {
      key: NESHAN_API_KEY,
      maptype: 'neshan',
      poi: true,
      traffic: true,
      center: [lat, lng],
      zoom: 14,
    });

    Leaflet.control.zoom({ position: 'topright' }).addTo(map);
    mapRef.current = map;

    const marker = Leaflet.marker([lat, lng]).addTo(map);
    markerRef.current = marker;

    map.on('click', (event) => {
      const newLat = event.latlng.lat;
      const newLng = event.latlng.lng;
      const nextLocation = `${newLat.toFixed(6)}, ${newLng.toFixed(6)}`;
      setSelectedLocation(nextLocation);
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }
      const newMarker = Leaflet.marker([newLat, newLng]).addTo(map);
      markerRef.current = newMarker;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      markerRef.current = null;
    };
  }, [isActive, selectedLocation]);

  return (
    <div className={`map-modal ${isActive ? 'active' : ''}`} id="mapModal">
      <div className="map-content">
        <div className="map-title">
          <i className="fas fa-map-marker-alt"></i>
          {text.location}: <span>{title}</span>
        </div>

        <div className="map-frame">
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
        </div>

        <div className="map-actions">
          {selectMode && (
            <button className="select-location-btn" onClick={confirmSelection}>
              <i className="fas fa-check"></i> {text.save}
            </button>
          )}
          <button className="close-map" onClick={closeMap}>
            <i className="fas fa-times"></i> {text.close}
          </button>
        </div>
      </div>
    </div>
  );
}