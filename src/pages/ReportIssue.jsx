import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useComplaintStore from '../store/complaintStore';
import useAuthStore from '../store/authStore';
import { CATEGORIES } from '../data/mockData';
import StepIndicator from '../components/StepIndicator';
import SeverityBadge from '../components/SeverityBadge';
import './ReportIssue.css';

const STEPS = ['Evidence', 'Details', 'Review'];

function classifySeverity(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  const critical = ['cave-in', 'collapse', 'death', 'electric', 'fallen', 'burst', 'fire', 'bridge', 'gas leak', 'electrocution'];
  const high = ['pothole', 'multiple', 'dangerous', 'flooding', 'sewage', 'accident', 'broken pole', 'dark'];
  const medium = ['overflow', 'leak', 'noise', 'smell', 'stench', 'slow'];
  if (critical.some(k => text.includes(k))) return 'critical';
  if (high.some(k => text.includes(k))) return 'high';
  if (medium.some(k => text.includes(k))) return 'medium';
  return 'low';
}

export default function ReportIssue() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const addComplaint = useComplaintStore(s => s.addComplaint);
  const fileInputRef = useRef(null);

  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [photoPreview, setPhotoPreview] = useState([]);
  const [category, setCategory] = useState(location.state?.category || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [landmark, setLandmark] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);

  // Simulated GPS
  const gpsLocation = { lat: 18.5082, lng: 73.8300, address: 'Near Nalstop, Karve Road, Pune 411004' };

  const handlePhotoCapture = (e) => {
    const files = Array.from(e.target.files);
    if (photos.length + files.length > 4) return;
    const newPhotos = [...photos, ...files];
    setPhotos(newPhotos);
    const previews = newPhotos.map(f => URL.createObjectURL(f));
    setPhotoPreview(previews);
  };

  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    const newPreviews = photoPreview.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    setPhotoPreview(newPreviews);
  };

  const severity = classifySeverity(title, description);

  const handleSubmit = () => {
    const id = addComplaint({
      category,
      title,
      description,
      photos: photoPreview.length > 0 ? photoPreview : ['https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400&h=300&fit=crop'],
      location: { type: 'Point', coordinates: [gpsLocation.lng, gpsLocation.lat] },
      address: gpsLocation.address,
      ward: 'Ward 14 — Deccan',
      severity,
      landmark,
    }, user?.id);
    setSubmittedId(id);
    setStep(4); // success
  };

  // Success Screen
  if (step === 4) {
    return (
      <div className="report-success">
        <div className="report-success__icon">
          <i className="fas fa-circle-check" />
        </div>
        <h2>Report Submitted!</h2>
        <p>Your complaint has been registered successfully</p>
        <div className="report-success__id-card">
          <span className="text-label">Complaint ID</span>
          <span className="report-success__id">{submittedId}</span>
        </div>
        <div className="report-success__actions">
          <button className="btn btn-primary btn-full" onClick={() => navigate(`/complaint/${submittedId}`)}>
            <i className="fas fa-eye" /> Track Your Complaint
          </button>
          <button className="btn btn-outline btn-full" onClick={() => { setStep(1); setPhotos([]); setPhotoPreview([]); setTitle(''); setDescription(''); setCategory(''); setConfirmed(false); }}>
            <i className="fas fa-plus" /> Report Another
          </button>
          <button className="btn btn-ghost btn-full" onClick={() => navigate('/home')}>
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="report-issue">
      <StepIndicator steps={STEPS} currentStep={step} />

      {/* Step 1: Evidence */}
      {step === 1 && (
        <div className="report-issue__step animate-fade-in">
          <section className="report-issue__photos">
            <h3>Capture Evidence</h3>
            <p className="text-caption">Take a clear photo of the issue (max 4 photos)</p>

            <div className="report-issue__photo-grid">
              {photoPreview.map((src, i) => (
                <div key={i} className="report-issue__photo-item">
                  <img src={src} alt={`Photo ${i+1}`} />
                  <button className="report-issue__photo-remove" onClick={() => removePhoto(i)}>
                    <i className="fas fa-times" />
                  </button>
                </div>
              ))}
              {photos.length < 4 && (
                <button className="report-issue__photo-add" onClick={() => fileInputRef.current?.click()}>
                  <i className="fas fa-camera" />
                  <span>Add Photo</span>
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              multiple
              onChange={handlePhotoCapture}
              style={{ display: 'none' }}
            />
          </section>

          <section className="report-issue__gps">
            <h3>Location Detected</h3>
            <div className="report-issue__gps-card">
              <div className="report-issue__gps-icon">
                <i className="fas fa-location-crosshairs" />
              </div>
              <div className="report-issue__gps-info">
                <span className="report-issue__gps-coords">
                  {gpsLocation.lat.toFixed(4)}, {gpsLocation.lng.toFixed(4)}
                </span>
                <span className="report-issue__gps-address">{gpsLocation.address}</span>
              </div>
              <span className="report-issue__gps-accuracy">
                <i className="fas fa-signal" /> ±8m
              </span>
            </div>
          </section>

          <button
            className="btn btn-primary btn-full"
            onClick={() => setStep(2)}
            disabled={photos.length === 0}
          >
            Continue <i className="fas fa-arrow-right" />
          </button>
          <p className="report-issue__hint">
            <i className="fas fa-info-circle" /> You can add a photo or proceed without one for demo
          </p>
          {photos.length === 0 && (
            <button className="btn btn-ghost btn-full" onClick={() => setStep(2)}>
              Skip photo (demo)
            </button>
          )}
        </div>
      )}

      {/* Step 2: Details */}
      {step === 2 && (
        <div className="report-issue__step animate-fade-in">
          <section>
            <h3>Category</h3>
            <div className="report-issue__category-chips">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.key}
                  className={`report-issue__chip ${category === cat.key ? 'report-issue__chip--active' : ''}`}
                  onClick={() => setCategory(cat.key)}
                  style={category === cat.key ? { background: cat.color, color: 'white', borderColor: cat.color } : {}}
                >
                  <i className={`fas ${cat.icon}`} />
                  {cat.label}
                </button>
              ))}
            </div>
          </section>

          <div className="form-group">
            <label className="form-label">Issue Title</label>
            <input
              className="form-input"
              type="text"
              placeholder="Brief title (e.g., Large pothole on main road)"
              value={title}
              onChange={e => setTitle(e.target.value.slice(0, 80))}
              maxLength={80}
            />
            <span className="report-issue__char-count">{title.length}/80</span>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-input form-textarea"
              placeholder="Describe the issue in detail — size, impact, how long it's been there..."
              value={description}
              onChange={e => setDescription(e.target.value.slice(0, 500))}
              maxLength={500}
            />
            <span className="report-issue__char-count">{description.length}/500</span>
          </div>

          <div className="form-group">
            <label className="form-label">Landmark (Optional)</label>
            <input
              className="form-input"
              type="text"
              placeholder="Nearby landmark for easier identification"
              value={landmark}
              onChange={e => setLandmark(e.target.value)}
            />
          </div>

          <div className="report-issue__nav-buttons">
            <button className="btn btn-outline" onClick={() => setStep(1)}>
              <i className="fas fa-arrow-left" /> Back
            </button>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <button
                className="btn btn-primary"
                onClick={() => setStep(3)}
                disabled={!category || !title || description.length < 3}
                style={{ width: '100%' }}
              >
                Review <i className="fas fa-arrow-right" />
              </button>
              {(!category || !title || description.length < 3) && (
                <span className="text-caption" style={{ color: 'var(--accent)', marginTop: 4, textAlign: 'center', fontSize: 10 }}>
                  {!category ? 'Select category' : !title ? 'Enter title' : 'Description too short'}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="report-issue__step animate-fade-in">
          <div className="report-issue__review-card">
            {photoPreview.length > 0 && (
              <img src={photoPreview[0]} alt="Issue" className="report-issue__review-img" />
            )}
            <div className="report-issue__review-details">
              <div className="report-issue__review-row">
                <span className="text-label">Category</span>
                <span className="report-issue__chip report-issue__chip--active" style={{ background: CATEGORIES.find(c => c.key === category)?.color, color: 'white', borderColor: 'transparent', fontSize: 11 }}>
                  <i className={`fas ${CATEGORIES.find(c => c.key === category)?.icon}`} />
                  {CATEGORIES.find(c => c.key === category)?.label}
                </span>
              </div>
              <div className="report-issue__review-row">
                <span className="text-label">Title</span>
                <p style={{ fontWeight: 600 }}>{title}</p>
              </div>
              <div className="report-issue__review-row">
                <span className="text-label">Description</span>
                <p>{description}</p>
              </div>
              <div className="report-issue__review-row">
                <span className="text-label">Location</span>
                <p><i className="fas fa-location-dot" style={{ color: 'var(--primary)', marginRight: 4 }} />{gpsLocation.address}</p>
              </div>
              <div className="report-issue__review-row">
                <span className="text-label">AI Severity Estimate</span>
                <SeverityBadge severity={severity} size="lg" />
              </div>
            </div>
          </div>

          <label className="report-issue__confirm">
            <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} />
            <span>I confirm this is a genuine civic issue</span>
          </label>

          <div className="report-issue__nav-buttons">
            <button className="btn btn-outline" onClick={() => setStep(2)}>
              <i className="fas fa-arrow-left" /> Back
            </button>
            <button
              className="btn btn-accent"
              onClick={handleSubmit}
              disabled={!confirmed}
              style={{ flex: 1 }}
            >
              <i className="fas fa-paper-plane" /> Submit Report
            </button>
          </div>
        </div>
      )}

      <div style={{ height: 'calc(var(--bottom-nav-height) + 16px)' }} />
    </div>
  );
}
