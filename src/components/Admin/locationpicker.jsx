import React, { useEffect, useRef, useState } from 'react';
import { NESHAN_API_KEY } from '../../data/constants';

export function LocationPicker({ onLocationSelect, initialLat = 35.699756, initialLng = 51.338076 }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [lat, setLat] = useState(initialLat);
  const [lng, setLng] = useState(initialLng);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    setLat(initialLat);
    setLng(initialLng);
  }, [initialLat, initialLng]);

  useEffect(() => {
    const Leaflet = window.L;
    if (!Leaflet || !mapContainerRef.current) {
      console.error('Leaflet (Neshan) not loaded!');
      return;
    }

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

    if (lat && lng) {
      const newMarker = Leaflet.marker([lat, lng]).addTo(map);
      markerRef.current = newMarker;
    }

    map.on('click', function (e) {
      const newLat = e.latlng.lat;
      const newLng = e.latlng.lng;

      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }

      const newMarker = Leaflet.marker([newLat, newLng]).addTo(map);
      markerRef.current = newMarker;
      setLat(newLat);
      setLng(newLng);
      if (typeof onLocationSelect === 'function') {
        onLocationSelect(newLat, newLng);
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      markerRef.current = null;
    };
  }, [lat, lng, onLocationSelect]);

  return (
    <div style={{ width: '100%' }}>
      <div 
        ref={mapContainerRef} 
        style={{ 
          width: '100%', 
          height: '400px', 
          borderRadius: '12px',
          border: '2px solid rgba(75,88,110,.2)',
          overflow: 'hidden'
        }} 
      />
      <div style={{ marginTop: '10px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '.85rem', color: '#4b5870' }}>
          <i className="fas fa-map-pin"></i> عرض جغرافیایی: <strong>{Number(lat).toFixed(6)}</strong>
        </div>
        <div style={{ fontSize: '.85rem', color: '#4b5870' }}>
          <i className="fas fa-map-pin"></i> طول جغرافیایی: <strong>{Number(lng).toFixed(6)}</strong>
        </div>
      </div>
    </div>
  );
}