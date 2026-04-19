import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useComplaintStore from '../store/complaintStore';
import useTranslation from '../hooks/useTranslation';
import { CATEGORIES, CITY_STATS } from '../data/mockData';
import StatCard from '../components/StatCard';
import ComplaintCard from '../components/ComplaintCard';
import CategoryIcon from '../components/CategoryIcon';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);
  const complaints = useComplaintStore(s => s.complaints);
  const { t } = useTranslation();

  const stats = useMemo(() => {
    const userComplaints = complaints.filter(c => c.userId === user?.id);
    return {
      total: userComplaints.length,
      pending: userComplaints.filter(c => c.status === 'pending').length,
      inProgress: userComplaints.filter(c => c.status === 'in_progress' || c.status === 'assigned').length,
      resolved: userComplaints.filter(c => c.status === 'resolved').length,
      rejected: userComplaints.filter(c => c.status === 'rejected').length,
    };
  }, [complaints]);

  const hour = new Date().getHours();
  const greetingKey = hour < 12 ? 'greeting_morning' : hour < 17 ? 'greeting_afternoon' : 'greeting_evening';
  const greeting = t(greetingKey);

  const recentComplaints = complaints
    .filter(c => c.userId === user?.id)
    .slice(0, 3);

  const quickCategories = CATEGORIES.slice(0, 6);

  return (
    <div className="dashboard">
      {/* Greeting Card */}
      <div className="dashboard__greeting">
        <div className="dashboard__greeting-text">
          <span className="dashboard__greeting-label">{greeting},</span>
          <h2 className="dashboard__greeting-name">{user?.name || t('nav_profile')} 👋</h2>
          <p className="dashboard__greeting-subtitle">
            <i className="fas fa-city" /> {CITY_STATS.resolvedToday} {t('resolved_today')}
          </p>
        </div>
        <div className="dashboard__greeting-visual">
          <div className="dashboard__greeting-ring" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="dashboard__stats">
        <StatCard icon="fa-file-lines" label={t('your_reports')} value={stats.total} color="var(--primary)" trend={12} />
        <StatCard icon="fa-circle-check" label={t('resolved')} value={stats.resolved} color="var(--success)" trend={8} />
      </div>

      {/* Quick Report Categories */}
      <section className="dashboard__section">
        <div className="dashboard__section-header">
          <h2>{t('quick_report')}</h2>
          <span className="text-caption">{t('tap_category')}</span>
        </div>
        <div className="dashboard__categories">
          {quickCategories.map(cat => (
            <CategoryIcon
              key={cat.key}
              catKey={cat.key}
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
          <h2>{t('city_overview')}</h2>
        </div>
        <div className="dashboard__city-stats">
          <div className="dashboard__city-stat">
            <span className="dashboard__city-stat-value">{CITY_STATS.totalComplaints.toLocaleString()}</span>
            <span className="dashboard__city-stat-label">{t('total_reports')}</span>
          </div>
          <div className="dashboard__city-stat-divider" />
          <div className="dashboard__city-stat">
            <span className="dashboard__city-stat-value">{CITY_STATS.resolutionRate}%</span>
            <span className="dashboard__city-stat-label">{t('resolution_rate')}</span>
          </div>
          <div className="dashboard__city-stat-divider" />
          <div className="dashboard__city-stat">
            <span className="dashboard__city-stat-value">{CITY_STATS.avgResolutionDays}d</span>
            <span className="dashboard__city-stat-label">{t('avg_resolution')}</span>
          </div>
        </div>
      </section>

      {/* Recent Complaints */}
      <section className="dashboard__section">
        <div className="dashboard__section-header">
          <h2>{t('recent_complaints')}</h2>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/complaints')}>
            {t('view_all')} <i className="fas fa-arrow-right" />
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
        <div className="dashboard__transparency-card" onClick={() => navigate('/transparency')}>
          <div className="dashboard__transparency-icon">
            <i className="fas fa-shield-halved" />
          </div>
          <div className="dashboard__transparency-text">
            <h3>{t('transparency_portal')}</h3>
            <p>{t('transparency_desc')}</p>
          </div>
          <i className="fas fa-chevron-right dashboard__transparency-arrow" />
        </div>
      </section>

      {/* Bottom spacer for nav */}
      <div style={{ height: 'var(--bottom-nav-height)' }} />
    </div>
  );
}
