import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import useComplaintStore from '../store/complaintStore';
import { getCategoryInfo, getSeverityInfo } from '../data/mockData';
import SeverityBadge from '../components/SeverityBadge';
import './MapView.css';

const SEVERITY_COLORS = {
  critical: '#C62828',
  high: '#E65100',
  medium: '#F57F17',
  low: '#2E7D32',
};

function FitBounds({ complaints }) {
  const map = useMap();
  useEffect(() => {
    if (complaints.length > 0) {
      const bounds = complaints.map(c => [c.location.coordinates[1], c.location.coordinates[0]]);
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [complaints, map]);
  return null;
}

export default function MapView() {
  const complaints = useComplaintStore(s => s.complaints);
  const [search, setSearch] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const filtered = complaints.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.address.toLowerCase().includes(search.toLowerCase());
    const matchSeverity = filterSeverity === 'all' || c.severity === filterSeverity;
    return matchSearch && matchSeverity;
  });

  return (
    <div className="map-view">
      {/* Search & Filter Bar */}
      <div className="map-view__bar">
        <div className="map-view__search">
          <i className="fas fa-search" />
          <input
            type="text"
            placeholder="Search issues by location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="map-view__filters">
          {['all', 'critical', 'high', 'medium', 'low'].map(s => (
            <button
              key={s}
              className={`map-view__filter-chip ${filterSeverity === s ? 'map-view__filter-chip--active' : ''}`}
              onClick={() => setFilterSeverity(s)}
              style={filterSeverity === s && s !== 'all' ? { background: SEVERITY_COLORS[s], color: 'white' } : {}}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="map-view__container">
        <MapContainer
          center={[18.52, 73.85]}
          zoom={12}
          style={{ width: '100%', height: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds complaints={filtered} />
          {filtered.map(c => (
            <CircleMarker
              key={c.id}
              center={[c.location.coordinates[1], c.location.coordinates[0]]}
              radius={filterSeverity !== 'all' ? 10 : (c.severity === 'critical' ? 10 : c.severity === 'high' ? 8 : 6)}
              fillColor={SEVERITY_COLORS[c.severity]}
              fillOpacity={0.8}
              color={SEVERITY_COLORS[c.severity]}
              weight={2}
              eventHandlers={{
                click: () => setSelectedComplaint(c),
              }}
            >
              <Popup>
                <div className="map-view__popup">
                  <strong>{c.title}</strong>
                  <SeverityBadge severity={c.severity} size="sm" />
                  <span className="map-view__popup-loc">{c.address.split(',')[0]}</span>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* Bottom Sheet */}
      {selectedComplaint && (
        <div className="map-view__sheet animate-slide-in-up">
          <div className="map-view__sheet-handle" onClick={() => setSelectedComplaint(null)} />
          <div className="map-view__sheet-content">
            <img src={selectedComplaint.photos[0]} alt="" className="map-view__sheet-img" />
            <div className="map-view__sheet-info">
              <h3>{selectedComplaint.title}</h3>
              <span className="map-view__sheet-loc">
                <i className="fas fa-location-dot" /> {selectedComplaint.address.split(',')[0]}
              </span>
              <div className="map-view__sheet-badges">
                <SeverityBadge severity={selectedComplaint.severity} size="sm" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ height: 'var(--bottom-nav-height)' }} />
    </div>
  );
}
