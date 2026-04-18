import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useComplaintStore from '../store/complaintStore';
import './Profile.css';

const SETTINGS = [
  { icon: 'fa-bell', label: 'Notifications', desc: 'Manage push notifications', path: '/settings/notifications' },
  { icon: 'fa-language', label: 'Language', desc: 'English (Phase 1)', path: '/settings/language' },
  { icon: 'fa-shield-halved', label: 'Privacy', desc: 'Data & privacy settings', path: '/settings/privacy' },
  { icon: 'fa-circle-question', label: 'Help & Support', desc: 'FAQs, contact support', path: '/settings/help' },
  { icon: 'fa-info-circle', label: 'About NIGRANI', desc: 'Version 1.0.0', path: '/settings/about' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const complaints = useComplaintStore(s => s.complaints);
  const stats = useMemo(() => {
    const userComplaints = complaints.filter(c => c.userId === user?.id);
    return {
      total: userComplaints.length,
      pending: userComplaints.filter(c => c.status === 'pending').length,
      inProgress: userComplaints.filter(c => c.status === 'in_progress' || c.status === 'assigned').length,
      resolved: userComplaints.filter(c => c.status === 'resolved').length,
    };
  }, [complaints]);

  const handleLogout = () => {
    logout();
    navigate('/auth', { replace: true });
  };

  const goToReports = (status) => {
    navigate('/complaints', { state: { status } });
  };

  return (
    <div className="profile">
      {/* Profile Header */}
      <div className="profile__header">
        <div className="profile__avatar">
          <i className="fas fa-user" />
        </div>
        <div className="profile__info">
          <h2>{user?.name || 'Citizen User'}</h2>
          <p><i className="fas fa-phone" /> {user?.phone || '+91 98765 43210'}</p>
          <p><i className="fas fa-map-pin" /> {user?.ward || 'Ward 15 — Kothrud'}</p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={() => navigate('/edit-profile')}>
          <i className="fas fa-pen" /> Edit
        </button>
      </div>

      {/* Activity Stats */}
      <div className="profile__activity">
        <h3>My Activity</h3>
        <div className="profile__activity-grid">
          <div className="profile__activity-item" onClick={() => goToReports('all')}>
            <span className="profile__activity-value">{stats.total}</span>
            <span className="profile__activity-label">Total Reports</span>
          </div>
          <div className="profile__activity-item profile__activity-item--success" onClick={() => goToReports('resolved')}>
            <span className="profile__activity-value">{stats.resolved}</span>
            <span className="profile__activity-label">Resolved</span>
          </div>
          <div className="profile__activity-item profile__activity-item--warning" onClick={() => goToReports('in_progress')}>
            <span className="profile__activity-value">{stats.pending + stats.inProgress}</span>
            <span className="profile__activity-label">Active</span>
          </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="profile__settings">
        <h3>Settings</h3>
        <div className="profile__settings-list">
          {SETTINGS.map((item, i) => (
            <button key={i} className="profile__settings-item" onClick={() => navigate(item.path)}>
              <div className="profile__settings-icon">
                <i className={`fas ${item.icon}`} />
              </div>
              <div className="profile__settings-text">
                <span className="profile__settings-label">{item.label}</span>
                <span className="profile__settings-desc">{item.desc}</span>
              </div>
              <i className="fas fa-chevron-right profile__settings-arrow" />
            </button>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button className="profile__logout" onClick={handleLogout}>
        <i className="fas fa-right-from-bracket" />
        Logout
      </button>

      <div style={{ height: 'calc(var(--bottom-nav-height) + 16px)' }} />
    </div>
  );
}
