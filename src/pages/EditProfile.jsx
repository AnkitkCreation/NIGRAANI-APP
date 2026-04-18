import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import './EditProfile.css';

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuthStore();
  
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [ward, setWard] = useState(user?.ward || 'Ward 15 — Kothrud');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      updateProfile({ name, phone, ward });
      setLoading(false);
      navigate('/profile');
    }, 800);
  };

  return (
    <div className="edit-profile animate-fade-in">
      <div className="edit-profile__header">
        <button className="edit-profile__back" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left" />
        </button>
        <h1>Edit Profile</h1>
      </div>

      <form className="edit-profile__form" onSubmit={handleSubmit}>
        <div className="edit-profile__avatar-section">
          <div className="edit-profile__avatar">
            <i className="fas fa-user" />
          </div>
          <button type="button" className="btn btn-ghost btn-sm">Change Photo</button>
        </div>

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input 
            className="form-input" 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input 
            className="form-input" 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Ward / Location</label>
          <select 
            className="form-input" 
            value={ward} 
            onChange={(e) => setWard(e.target.value)}
          >
            <option>Ward 14 — Deccan</option>
            <option>Ward 15 — Kothrud</option>
            <option>Ward 16 — Shivajinagar</option>
            <option>Ward 17 — Aundh</option>
            <option>Ward 18 — Baner</option>
          </select>
        </div>

        <div className="edit-profile__actions">
          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? 'Saving Changes...' : 'Save Changes'}
          </button>
          <button 
            type="button" 
            className="btn btn-ghost btn-full" 
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
