import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import useComplaintStore from '../store/complaintStore';
import { getCategoryInfo, formatFullDate } from '../data/mockData';
import PhotoCarousel from '../components/PhotoCarousel';
import SeverityBadge from '../components/SeverityBadge';
import StatusBadge from '../components/StatusBadge';
import Timeline from '../components/Timeline';
import './ComplaintDetail.css';

export default function ComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const complaint = useComplaintStore(s => s.getComplaintById(id));

  if (!complaint) {
    return (
      <div className="detail-empty">
        <i className="fas fa-file-circle-question" />
        <h2>Complaint Not Found</h2>
        <p>The complaint ID "{id}" does not exist.</p>
        <button className="btn btn-primary" onClick={() => navigate('/complaints')}>
          Back to Complaints
        </button>
      </div>
    );
  }

  const category = getCategoryInfo(complaint.category);
  const timelineReversed = [...complaint.timeline].reverse();
  const SEVERITY_COLORS = { critical: '#C62828', high: '#E65100', medium: '#F57F17', low: '#2E7D32' };

  return (
    <div className="complaint-detail">
      {/* Photo Carousel */}
      <PhotoCarousel photos={complaint.photos} />

      {/* Info Card */}
      <div className="detail-card">
        <div className="detail-card__top">
          <span className="detail-card__id">{complaint.id}</span>
          <div className="detail-card__badges">
            <SeverityBadge severity={complaint.severity} />
            <StatusBadge status={complaint.status} />
          </div>
        </div>
        <span
          className="detail-card__category"
          style={{ background: category.color, color: 'white' }}
        >
          <i className={`fas ${category.icon}`} /> {category.label}
        </span>
        <h2 className="detail-card__title">{complaint.title}</h2>
        <p className="detail-card__desc">{complaint.description}</p>
        <div className="detail-card__meta">
          <span><i className="fas fa-calendar" /> {formatFullDate(complaint.createdAt)}</span>
          {complaint.severityConfidence && (
            <span><i className="fas fa-robot" /> AI Confidence: {(complaint.severityConfidence * 100).toFixed(0)}%</span>
          )}
        </div>
      </div>

      {/* Location Card */}
      <div className="detail-card">
        <h3 className="detail-card__section-title">
          <i className="fas fa-location-dot" /> Location
        </h3>
        <div className="detail-card__map">
          <MapContainer
            center={[complaint.location.coordinates[1], complaint.location.coordinates[0]]}
            zoom={15}
            style={{ width: '100%', height: '100%' }}
            zoomControl={false}
            scrollWheelZoom={false}
            dragging={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <CircleMarker
              center={[complaint.location.coordinates[1], complaint.location.coordinates[0]]}
              radius={8}
              fillColor={SEVERITY_COLORS[complaint.severity]}
              fillOpacity={0.9}
              color={SEVERITY_COLORS[complaint.severity]}
              weight={2}
            />
          </MapContainer>
        </div>
        <p className="detail-card__address">
          <i className="fas fa-map-pin" /> {complaint.address}
        </p>
        <span className="detail-card__ward">{complaint.ward}</span>
      </div>

      {/* Timeline */}
      <div className="detail-card">
        <h3 className="detail-card__section-title">
          <i className="fas fa-timeline" /> Status Timeline
        </h3>
        <Timeline events={timelineReversed} />
      </div>

      {/* Transparency Card */}
      {complaint.assignment && (
        <div className="detail-card detail-card--transparency">
          <h3 className="detail-card__section-title">
            <i className="fas fa-shield-halved" /> Transparency Details
          </h3>
          <div className="detail-card__transparency-grid">
            <div className="detail-card__transparency-item">
              <span className="text-label">Contractor</span>
              <span className="detail-card__transparency-value">{complaint.assignment.contractorName}</span>
            </div>
            <div className="detail-card__transparency-item">
              <span className="text-label">Tender ID</span>
              <span className="detail-card__transparency-value">{complaint.assignment.tenderId}</span>
            </div>
            <div className="detail-card__transparency-item">
              <span className="text-label">Budget Allocated</span>
              <span className="detail-card__transparency-value detail-card__transparency-value--budget">
                ₹{complaint.assignment.budget.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="detail-card__transparency-item">
              <span className="text-label">Approving Authority</span>
              <span className="detail-card__transparency-value">{complaint.assignment.approvingAuthority}</span>
            </div>
            <div className="detail-card__transparency-item">
              <span className="text-label">Expected Completion</span>
              <span className="detail-card__transparency-value">
                {new Date(complaint.assignment.expectedCompletion).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>
      )}

      <div style={{ height: 'calc(var(--bottom-nav-height) + 16px)' }} />
    </div>
  );
}
