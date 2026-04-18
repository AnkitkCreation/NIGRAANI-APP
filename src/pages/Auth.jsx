import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import './Auth.css';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuthStore();

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      login({ phone: `+91${phone}` });
    } else {
      register({ name, phone: `+91${phone}` });
    }
    navigate('/home', { replace: true });
  };

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
            onClick={() => { setMode('login'); setOtpSent(false); }}
          >
            Login
          </button>
          <button
            className={`auth__toggle-btn ${mode === 'register' ? 'auth__toggle-btn--active' : ''}`}
            onClick={() => { setMode('register'); setOtpSent(false); }}
          >
            Register
          </button>
        </div>

        <form onSubmit={otpSent ? handleVerify : handleSendOtp} className="auth__form">
          {mode === 'register' && !otpSent && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <div className="auth__phone-input">
              <span className="auth__country-code">+91</span>
              <input
                className="form-input"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                required
                disabled={otpSent}
              />
            </div>
          </div>

          {otpSent && (
            <div className="form-group animate-fade-in-up">
              <label className="form-label">OTP Verification</label>
              <div className="auth__otp-row">
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <input
                    key={i}
                    className="auth__otp-digit"
                    type="text"
                    maxLength="1"
                    value={otp[i] || ''}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '');
                      const newOtp = otp.split('');
                      newOtp[i] = val;
                      setOtp(newOtp.join(''));
                      if (val && e.target.nextSibling) e.target.nextSibling.focus();
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Backspace' && !otp[i] && e.target.previousSibling) {
                        e.target.previousSibling.focus();
                      }
                    }}
                  />
                ))}
              </div>
              <p className="auth__otp-hint">
                <i className="fas fa-info-circle" /> Enter any 6 digits to verify (demo mode)
              </p>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={!otpSent ? phone.length < 10 : otp.length < 6}
          >
            {otpSent ? (
              <><i className="fas fa-shield-halved" /> Verify & {mode === 'login' ? 'Login' : 'Register'}</>
            ) : (
              <><i className="fas fa-paper-plane" /> Send OTP</>
            )}
          </button>

          {otpSent && (
            <button type="button" className="btn btn-ghost btn-full" onClick={() => setOtpSent(false)}>
              <i className="fas fa-arrow-left" /> Change Number
            </button>
          )}
        </form>

        <p className="auth__footer-text">
          By continuing, you agree to NIGRANI's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
