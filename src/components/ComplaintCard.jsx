import { useNavigate } from 'react-router-dom';
import { getCategoryInfo, formatDate } from '../data/mockData';
import SeverityBadge from './SeverityBadge';
import StatusBadge from './StatusBadge';
import useTranslation from '../hooks/useTranslation';
import useComplaintStore from '../store/complaintStore';
import useAuthStore from '../store/authStore';
import './ComplaintCard.css';
import './UpvoteButton.css';

export default function ComplaintCard({ complaint, compact = false }) {
  const navigate = useNavigate();
  const category = getCategoryInfo(complaint.category);
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const toggleUpvote = useComplaintStore(s => s.toggleUpvote);

  const isUpvoted = complaint.upvotedBy?.includes(user?.id);

  const handleUpvote = (e) => {
    e.stopPropagation();
    toggleUpvote(complaint.id, user?.id);
  };

  return (
    <div
      className={`complaint-card ${compact ? 'complaint-card--compact' : ''}`}
      onClick={() => navigate(`/complaint/${complaint.id}`)}
      id={`complaint-${complaint.id}`}
    >
      <div className="complaint-card__thumb">
        <img src={complaint.photos[0]} alt={complaint.title} loading="lazy" />
        <span className="complaint-card__category-chip" style={{ background: category.color }}>
          <i className={`fas ${category.icon}`} />
          {!compact && (t(`cat_${complaint.category}`) || category.label)}
        </span>
      </div>
      <div className="complaint-card__body">
        <div className="complaint-card__header">
          <h3 className="complaint-card__title">{complaint.title}</h3>
        </div>
        <div className="complaint-card__meta">
          <span className="complaint-card__location">
            <i className="fas fa-location-dot" /> {complaint.address.split(',')[0]}
          </span>
          <span className="complaint-card__time">{formatDate(complaint.createdAt)}</span>
        </div>
        <div className="complaint-card__footer">
          <div className="complaint-card__badges">
            <SeverityBadge severity={complaint.severity} size="sm" />
            <StatusBadge status={complaint.status} size="sm" />
          </div>
          <button
            className={`upvote-btn ${isUpvoted ? 'upvote-btn--active' : ''}`}
            onClick={handleUpvote}
            title={isUpvoted ? t('upvoted') : t('upvote')}
          >
            <i className={`${isUpvoted ? 'fas' : 'far'} fa-heart`} />
            <span className="upvote-btn__count">{complaint.upvotes || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
