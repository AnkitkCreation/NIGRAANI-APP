import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import './Onboarding.css';

const slides = [
  {
    icon: '📸',
    title: 'Report in Seconds',
    description: 'Take a photo, pin the location, and submit. That\'s it. Your civic complaint is registered instantly.',
    color: '#0A6E6E',
  },
  {
    icon: '📍',
    title: 'Track Everything',
    description: 'Know exactly when your issue is received, assigned, and resolved. Real-time status updates at your fingertips.',
    color: '#E8871E',
  },
  {
    icon: '🔍',
    title: 'Full Transparency',
    description: 'Contractor details, budget spent, and approval authority — all public. Hold your government accountable.',
    color: '#2E7D32',
  },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const completeOnboarding = useAuthStore(s => s.completeOnboarding);

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      completeOnboarding();
      navigate('/auth', { replace: true });
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    navigate('/auth', { replace: true });
  };

  const slide = slides[current];

  return (
    <div className="onboarding">
      <button className="onboarding__skip" onClick={handleSkip}>
        Skip <i className="fas fa-arrow-right" />
      </button>

      <div className="onboarding__slide animate-fade-in" key={current}>
        <div className="onboarding__illustration" style={{ '--ob-color': slide.color }}>
          <div className="onboarding__icon-ring">
            <span className="onboarding__emoji">{slide.icon}</span>
          </div>
          <div className="onboarding__bg-circle onboarding__bg-circle--1" />
          <div className="onboarding__bg-circle onboarding__bg-circle--2" />
        </div>

        <div className="onboarding__text">
          <h2>{slide.title}</h2>
          <p>{slide.description}</p>
        </div>
      </div>

      <div className="onboarding__footer">
        <div className="onboarding__dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`onboarding__dot ${i === current ? 'onboarding__dot--active' : ''}`}
              style={i === current ? { background: slide.color } : {}}
            />
          ))}
        </div>
        <button className="btn btn-primary btn-full" onClick={handleNext}>
          {current === slides.length - 1 ? 'Get Started' : 'Next'}
          <i className={`fas ${current === slides.length - 1 ? 'fa-rocket' : 'fa-arrow-right'}`} />
        </button>
      </div>
    </div>
  );
}
