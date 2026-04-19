import { getSeverityInfo } from '../data/mockData';
import useTranslation from '../hooks/useTranslation';
import './SeverityBadge.css';

export default function SeverityBadge({ severity, size = 'md', showIcon = true }) {
  const info = getSeverityInfo(severity);
  const { t } = useTranslation();

  return (
    <span
      className={`severity-badge severity-badge--${size}`}
      style={{ background: info.bg, color: info.color }}
    >
      {showIcon && <i className={`fas ${info.icon}`} />}
      {t(`sev_${severity}`) || info.label}
    </span>
  );
}
