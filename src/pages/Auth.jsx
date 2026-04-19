import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import './Auth.css';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState(null);
  
  const navigate = useNavigate();
  const { login, register, loading, error: authError } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register({ full_name: name, email, password, phone });
      }
      navigate('/home', { replace: true });
    } catch (err) {
      // Error is already handled in authStore, but we can catch it here if needed
      console.error('Auth failed:', err);
    }
  };

  const currentError = formError || authError;

  return (
    <div className="auth">
      <div className="auth__hero">
        <div className="auth__hero-content">
          <div className="auth__hero-icon">👁</div>
          <h1>Welcome to NIGRANI</h1>
          <p>Report civic issues. Track resolutions. Hold authorities accountable.</p>
        </div>
        <div className="auth__wave">
          <svg viewBox="0 0 480 60" preserveAspectRatio="none">
            <path d="M0,30 C120,55 360,5 480,30 L480,60 L0,60 Z" fill="white"/>
          </svg>
        </div>
      </div>

      <div className="auth__form-area">
        <div className="auth__toggle">
          <button
            className={`auth__toggle-btn ${mode === 'login' ? 'auth__toggle-btn--active' : ''}`}
            onClick={() => { setMode('login'); setFormError(null); }}
          >
            Login
          </button>
          <button
            className={`auth__toggle-btn ${mode === 'register' ? 'auth__toggle-btn--active' : ''}`}
            onClick={() => { setMode('register'); setFormError(null); }}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth__form">
          {currentError && (
            <div className="auth__error animate-shake">
              <i className="fas fa-circle-exclamation" /> {currentError}
            </div>
          )}

          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                type="text"
                placeholder="Ex: Ankit Kumar"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                className="form-input"
                type="tel"
                placeholder="10-digit number"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary btn-full ${loading ? 'btn--loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <><i className="fas fa-spinner fa-spin" /> Verifying...</>
            ) : (
              <><i className={`fas ${mode === 'login' ? 'fa-sign-in-alt' : 'fa-user-plus'}`} /> {mode === 'login' ? 'Secure Login' : 'Create Account'}</>
            )}
          </button>
        </form>

        <p className="auth__footer-text">
          By continuing, you agree to NIGRANI's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}

