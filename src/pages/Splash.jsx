import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import './Splash.css';

export default function Splash() {
  const navigate = useNavigate();
  const { isAuthenticated, isFirstLaunch, loadUser } = useAuthStore();
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    loadUser();
    const timer = setTimeout(() => {
      setAnimating(false);
      setTimeout(() => {
        if (isFirstLaunch) {
          navigate('/onboarding', { replace: true });
        } else if (isAuthenticated) {
          navigate('/home', { replace: true });
        } else {
          navigate('/auth', { replace: true });
        }
      }, 400);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`splash ${!animating ? 'splash--fade' : ''}`}>
      <div className="splash__content">
        <div className="splash__ring-container">
          <div className="splash__ring splash__ring--1" />
          <div className="splash__ring splash__ring--2" />
          <div className="splash__ring splash__ring--3" />
          <div className="splash__eye">👁</div>
        </div>
        <h1 className="splash__title">NIGRANI</h1>
        <p className="splash__subtitle">Civic Oversight Platform</p>
      </div>
      <div className="splash__footer">
        <p>Empowering citizens. Ensuring accountability.</p>
      </div>
    </div>
  );
}
