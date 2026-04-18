import './StatCard.css';

export default function StatCard({ icon, label, value, color = 'var(--primary)', trend }) {
  return (
    <div className="stat-card">
      <div className="stat-card__icon" style={{ '--stat-color': color }}>
        <i className={`fas ${icon}`} />
      </div>
      <div className="stat-card__info">
        <span className="stat-card__value">{value}</span>
        <span className="stat-card__label">{label}</span>
      </div>
      {trend && (
        <span className={`stat-card__trend stat-card__trend--${trend > 0 ? 'up' : 'down'}`}>
          <i className={`fas fa-arrow-${trend > 0 ? 'up' : 'down'}`} />
          {Math.abs(trend)}%
        </span>
      )}
    </div>
  );
}
