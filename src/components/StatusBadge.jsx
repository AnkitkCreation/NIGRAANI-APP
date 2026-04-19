import { getStatusInfo } from '../data/mockData';
import useTranslation from '../hooks/useTranslation';
import './StatusBadge.css';

export default function StatusBadge({ status, size = 'md' }) {
  const info = getStatusInfo(status);
  const { t } = useTranslation();
  
  return (
    <span
      className={`status-badge status-badge--${size}`}
      style={{ '--status-color': info.color }}
    >
      <span className="status-badge__dot" />
      {t(`status_${status}`) || info.label}
    </span>
  );
}
