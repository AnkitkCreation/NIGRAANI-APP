import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useComplaintStore from '../store/complaintStore';
import useAuthStore from '../store/authStore';
import useTranslation from '../hooks/useTranslation';
import { CATEGORIES } from '../data/mockData';
import StepIndicator from '../components/StepIndicator';
import SeverityBadge from '../components/SeverityBadge';
import './ReportIssue.css';

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
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const STEPS = [t('step_confirm'), t('step_details'), t('step_confirm')]; // Simplified for now but translating keys
  // Actually STEPS in translation file are step_category, step_details, step_location, step_confirm
  // Let's use more accurate ones for this UI
  const reportSteps = [t('step_category'), t('step_details'), t('step_confirm')];

  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [photoPreview, setPhotoPreview] = useState([]);
  const [category, setCategory] = useState(location.state?.category || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [landmark, setLandmark] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [submittedId, setSubmittedId] = useState(null);

  // Real Geolocation
  const [gpsLocation, setGpsLocation] = useState({ lat: null, lng: null, address: '', ward: '' });
  const [isDetecting, setIsDetecting] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation not supported');
      return;
    }

    setIsDetecting(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setGpsLocation(prev => ({ ...prev, lat: latitude, lng: longitude }));
        
        try {
          // Reverse Geocoding using OpenStreetMap (Nominatim)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();
          const address = data.display_name;
          const suburb = data.address.suburb || data.address.neighbourhood || data.address.city_district || 'Pune';
          
          setGpsLocation({
            lat: latitude,
            lng: longitude,
            address: address,
            ward: `Ward — ${suburb}`
          });
        } catch (err) {
          console.error('Geocoding error:', err);
          setGpsLocation(prev => ({ ...prev, address: 'Location detected, address lookup failed' }));
        } finally {
          setIsDetecting(false);
        }
      },
      (err) => {
        setIsDetecting(false);
        setLocationError('Permission denied or location unavailable');
        console.error(err);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useState(() => {
    detectLocation();
  }, []);

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
      ward: gpsLocation.ward || 'Ward 14 — Deccan',
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
        <h2>{t('report_success')}</h2>
        <p>{t('report_desc')}</p>
        <div className="report-success__id-card">
          <span className="text-label">{t('complaint_id')}</span>
          <span className="report-success__id">{submittedId}</span>
        </div>
        <div className="report-success__actions">
          <button className="btn btn-primary btn-full" onClick={() => navigate(`/complaint/${submittedId}`)}>
            <i className="fas fa-eye" /> {t('track_complaint')}
          </button>
          <button className="btn btn-outline btn-full" onClick={() => { setStep(1); setPhotos([]); setPhotoPreview([]); setTitle(''); setDescription(''); setCategory(''); setConfirmed(false); }}>
            <i className="fas fa-plus" /> {t('report_another')}
          </button>
          <button className="btn btn-ghost btn-full" onClick={() => navigate('/home')}>
            {t('go_home')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="report-issue">
      <StepIndicator steps={reportSteps} currentStep={step} />

      {/* Step 1: Evidence */}
      {step === 1 && (
        <div className="report-issue__step animate-fade-in">
          <section className="report-issue__photos">
            <h3>{t('capture_evidence')}</h3>
            <p className="text-caption">{t('clear_photo_hint')}</p>

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
                  <span>{t('add_photo')}</span>
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
            <h3>{t('location_detected')}</h3>
            <div className={`report-issue__gps-card ${isDetecting ? 'report-issue__gps-card--detecting' : ''}`}>
              <div className={`report-issue__gps-icon ${isDetecting ? 'animate-pulse' : ''}`}>
                <i className="fas fa-location-crosshairs" />
              </div>
              <div className="report-issue__gps-info">
                {locationError ? (
                  <span className="text-caption" style={{ color: 'var(--accent)' }}>{locationError}</span>
                ) : (
                  <>
                    <span className="report-issue__gps-coords">
                      {gpsLocation.lat ? `${gpsLocation.lat.toFixed(4)}, ${gpsLocation.lng.toFixed(4)}` : 'Scanning...'}
                    </span>
                    <span className="report-issue__gps-address">
                      {isDetecting ? 'Fetching street address...' : gpsLocation.address || 'Address not found'}
                    </span>
                  </>
                )}
              </div>
              <button 
                className="btn btn-ghost btn-sm" 
                onClick={detectLocation}
                disabled={isDetecting}
                title="Refresh Location"
              >
                <i className={`fas fa-sync-alt ${isDetecting ? 'fa-spin' : ''}`} />
              </button>
            </div>
          </section>

          <button
            className="btn btn-primary btn-full"
            onClick={() => setStep(2)}
            disabled={photos.length === 0}
          >
            {t('next')} <i className="fas fa-arrow-right" />
          </button>
          <p className="report-issue__hint">
            <i className="fas fa-info-circle" /> You can add a photo or proceed without one for demo
          </p>
          {photos.length === 0 && (
            <button className="btn btn-ghost btn-full" onClick={() => setStep(2)}>
              {t('skip_photo')}
            </button>
          )}
        </div>
      )}

      {/* Step 2: Details */}
      {step === 2 && (
        <div className="report-issue__step animate-fade-in">
          <section>
            <h3>{t('step_category')}</h3>
            <div className="report-issue__category-chips">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.key}
                  className={`report-issue__chip ${category === cat.key ? 'report-issue__chip--active' : ''}`}
                  onClick={() => setCategory(cat.key)}
                  style={category === cat.key ? { background: cat.color, color: 'white', borderColor: cat.color } : {}}
                >
                  <i className={`fas ${cat.icon}`} />
                  {t(`cat_${cat.key}`) || cat.label}
                </button>
              ))}
            </div>
          </section>

          <div className="form-group">
            <label className="form-label">{t('issue_title')}</label>
            <input
              className="form-input"
              type="text"
              placeholder={t('title_placeholder')}
              value={title}
              onChange={e => setTitle(e.target.value.slice(0, 80))}
              maxLength={80}
            />
            <span className="report-issue__char-count">{title.length}/80</span>
          </div>

          <div className="form-group">
            <label className="form-label">{t('description')}</label>
            <textarea
              className="form-input form-textarea"
              placeholder={t('desc_placeholder')}
              value={description}
              onChange={e => setDescription(e.target.value.slice(0, 500))}
              maxLength={500}
            />
            <span className="report-issue__char-count">{description.length}/500</span>
          </div>

          <div className="form-group">
            <label className="form-label">{t('landmark')} ({t('cat_other')})</label>
            <input
              className="form-input"
              type="text"
              placeholder={t('landmark_placeholder')}
              value={landmark}
              onChange={e => setLandmark(e.target.value)}
            />
          </div>

          <div className="report-issue__nav-buttons">
            <button className="btn btn-outline" onClick={() => setStep(1)}>
              <i className="fas fa-arrow-left" /> {t('previous')}
            </button>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <button
                className="btn btn-primary"
                onClick={() => setStep(3)}
                disabled={!category || !title || description.length < 3}
                style={{ width: '100%' }}
              >
                {t('next')} <i className="fas fa-arrow-right" />
              </button>
              {(!category || !title || description.length < 3) && (
                <span className="text-caption" style={{ color: 'var(--accent)', marginTop: 4, textAlign: 'center', fontSize: 10 }}>
                  {!category ? t('step_category') : !title ? 'Enter title' : 'Description too short'}
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
                <span className="text-label">{t('step_category')}</span>
                <span className="report-issue__chip report-issue__chip--active" style={{ background: CATEGORIES.find(c => c.key === category)?.color, color: 'white', borderColor: 'transparent', fontSize: 11 }}>
                  <i className={`fas ${CATEGORIES.find(c => c.key === category)?.icon}`} />
                  {t(`cat_${category}`) || CATEGORIES.find(c => c.key === category)?.label}
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
            <span>{t('confirm_genuine')}</span>
          </label>

          <div className="report-issue__nav-buttons">
            <button className="btn btn-outline" onClick={() => setStep(2)}>
              <i className="fas fa-arrow-left" /> {t('previous')}
            </button>
            <button
              className="btn btn-accent"
              onClick={handleSubmit}
              disabled={!confirmed}
              style={{ flex: 1 }}
            >
              <i className="fas fa-paper-plane" /> {t('submit')}
            </button>
          </div>
        </div>
      )}

      <div style={{ height: 'calc(var(--bottom-nav-height) + 16px)' }} />
    </div>
  );
}
