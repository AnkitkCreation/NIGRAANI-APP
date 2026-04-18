import { getStatusInfo } from '../data/mockData';
import './StatusBadge.css';

export default function StatusBadge({ status, size = 'md' }) {
  const info = getStatusInfo(status);
  return (
    <span
      className={`status-badge status-badge--${size}`}
      style={{ '--status-color': info.color }}
    >
      <span className="status-badge__dot" />
      {info.label}
    </span>
  );
}
