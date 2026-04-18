import { getSeverityInfo } from '../data/mockData';
import './SeverityBadge.css';

export default function SeverityBadge({ severity, size = 'md', showIcon = true }) {
  const info = getSeverityInfo(severity);
  return (
    <span
      className={`severity-badge severity-badge--${size}`}
      style={{ background: info.bg, color: info.color }}
    >
      {showIcon && <i className={`fas ${info.icon}`} />}
      {info.label}
    </span>
  );
}
