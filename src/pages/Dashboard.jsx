import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useComplaintStore from '../store/complaintStore';
import { CATEGORIES, CITY_STATS } from '../data/mockData';
import StatCard from '../components/StatCard';
import ComplaintCard from '../components/ComplaintCard';
import CategoryIcon from '../components/CategoryIcon';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);
  const complaints = useComplaintStore(s => s.complaints);
  const stats = useMemo(() => {
    const userComplaints = complaints.filter(c => c.userId === 'u001');
    return {
      total: userComplaints.length,
      pending: userComplaints.filter(c => c.status === 'pending').length,
      inProgress: userComplaints.filter(c => c.status === 'in_progress' || c.status === 'assigned').length,
      resolved: userComplaints.filter(c => c.status === 'resolved').length,
      rejected: userComplaints.filter(c => c.status === 'rejected').length,
    };
  }, [complaints]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const recentComplaints = complaints
    .filter(c => c.userId === 'u001')
    .slice(0, 3);

  const quickCategories = CATEGORIES.slice(0, 6);

  return (
    <div className="dashboard">
      {/* Greeting Card */}
      <div className="dashboard__greeting">
        <div className="dashboard__greeting-text">
          <span className="dashboard__greeting-label">{greeting},</span>
          <h2 className="dashboard__greeting-name">{user?.name || 'Citizen'} 👋</h2>
          <p className="dashboard__greeting-subtitle">
            <i className="fas fa-city" /> {CITY_STATS.resolvedToday} issues resolved today in Pune
          </p>
        </div>
        <div className="dashboard__greeting-visual">
          <div className="dashboard__greeting-ring" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="dashboard__stats">
        <StatCard icon="fa-file-lines" label="Your Reports" value={stats.total} color="var(--primary)" trend={12} />
        <StatCard icon="fa-circle-check" label="Resolved" value={stats.resolved} color="var(--success)" trend={8} />
      </div>

      {/* Quick Report Categories */}
      <section className="dashboard__section">
        <div className="dashboard__section-header">
          <h2>Quick Report</h2>
          <span className="text-caption">Tap a category</span>
        </div>
        <div className="dashboard__categories">
          {quickCategories.map(cat => (
            <CategoryIcon
              key={cat.key}
              icon={cat.icon}
              label={cat.label}
              color={cat.color}
              onClick={() => navigate('/report', { state: { category: cat.key } })}
            />
          ))}
        </div>
      </section>

      {/* City Overview */}
      <section className="dashboard__section">
        <div className="dashboard__section-header">
          <h2>City Overview</h2>
        </div>
        <div className="dashboard__city-stats">
          <div className="dashboard__city-stat">
            <span className="dashboard__city-stat-value">{CITY_STATS.totalComplaints.toLocaleString()}</span>
            <span className="dashboard__city-stat-label">Total Reports</span>
          </div>
          <div className="dashboard__city-stat-divider" />
          <div className="dashboard__city-stat">
            <span className="dashboard__city-stat-value">{CITY_STATS.resolutionRate}%</span>
            <span className="dashboard__city-stat-label">Resolution Rate</span>
          </div>
          <div className="dashboard__city-stat-divider" />
          <div className="dashboard__city-stat">
            <span className="dashboard__city-stat-value">{CITY_STATS.avgResolutionDays}d</span>
            <span className="dashboard__city-stat-label">Avg Resolution</span>
          </div>
        </div>
      </section>

      {/* Recent Complaints */}
      <section className="dashboard__section">
        <div className="dashboard__section-header">
          <h2>Recent Complaints</h2>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/complaints')}>
            View All <i className="fas fa-arrow-right" />
          </button>
        </div>
        <div className="dashboard__complaints-list">
          {recentComplaints.map((c, i) => (
            <div key={c.id} style={{ animationDelay: `${i * 0.1}s` }}>
              <ComplaintCard complaint={c} compact />
            </div>
          ))}
        </div>
      </section>

      {/* Transparency Highlight */}
      <section className="dashboard__section">
        <div className="dashboard__transparency-card" onClick={() => navigate('/complaints')}>
          <div className="dashboard__transparency-icon">
            <i className="fas fa-shield-halved" />
          </div>
          <div className="dashboard__transparency-text">
            <h3>Transparency Portal</h3>
            <p>View contractor details, budgets, and resolution data for all civic complaints</p>
          </div>
          <i className="fas fa-chevron-right dashboard__transparency-arrow" />
        </div>
      </section>

      {/* Bottom spacer for nav */}
      <div style={{ height: 'var(--bottom-nav-height)' }} />
    </div>
  );
}
