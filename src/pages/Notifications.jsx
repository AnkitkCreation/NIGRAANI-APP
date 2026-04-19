import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/appStore';
import useAuthStore from '../store/authStore';
import useTranslation from '../hooks/useTranslation';
import './Notifications.css';

const ICON_MAP = {
  status_update: { icon: 'fa-arrow-rotate-right', color: '#0277BD' },
  assigned: { icon: 'fa-user-check', color: '#F57F17' },
  resolved: { icon: 'fa-circle-check', color: '#2E7D32' },
  rejected: { icon: 'fa-circle-xmark', color: '#C62828' },
};

export default function Notifications() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getUserNotifications, clearNotifications, markAsRead } = useAppStore();
  const { t } = useTranslation();
  
  const userNotifications = getUserNotifications(user?.id);
  const unreadCount = userNotifications.filter(n => !n.read).length;

  const handleNotificationClick = (notif) => {
    markAsRead(notif.id);
    if (notif.complaintId) {
      navigate(`/complaint/${notif.complaintId}`);
    }
  };

  const renderMessage = (notif) => {
    // Dynamic message construction based on templates in translations.js
    const templateKey = `notif_${notif.type}_body`;
    const template = t(templateKey);
    
    if (!template) return notif.message; // Fallback to raw mock message

    return template
      .replace('{id}', notif.complaintId || '')
      .replace('{status}', t(`status_${notif.statusValue}`) || notif.statusValue || '')
      .replace('{contractor}', notif.contractorName || '')
      .replace('{reason}', notif.rejectionReason || '');
  };

  const renderTitle = (notif) => {
    return t(`notif_${notif.type}_title`) || notif.title;
  };

  return (
    <div className="notifications animate-fade-in">
      <div className="notifications__header">
        <span className="notifications__count">
          {t('new_count').replace('{count}', unreadCount)}
        </span>
        {unreadCount > 0 && (
          <button className="btn btn-ghost btn-sm" onClick={() => clearNotifications(user?.id)}>
            {t('mark_all_read')}
          </button>
        )}
      </div>

      <div className="notifications__list">
        {userNotifications.length === 0 ? (
          <div className="notifications__empty">
            <div className="notifications__empty-icon">
              <i className="fas fa-bell-slash" />
            </div>
            <p>{t('notifications_empty')}</p>
          </div>
        ) : (
          userNotifications.map((notif, i) => {
            const iconInfo = ICON_MAP[notif.type] || ICON_MAP.status_update;
            return (
              <button
                key={notif.id}
                className={`notifications__item ${!notif.read ? 'notifications__item--unread' : ''}`}
                onClick={() => handleNotificationClick(notif)}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="notifications__icon" style={{ backgroundColor: `${iconInfo.color}15`, color: iconInfo.color }}>
                  <i className={`fas ${iconInfo.icon}`} />
                </div>
                <div className="notifications__content">
                  <div className="notifications__item-header">
                    <span className="notifications__title">{renderTitle(notif)}</span>
                    {!notif.read && <span className="notifications__dot" />}
                  </div>
                  <span className="notifications__message">{renderMessage(notif)}</span>
                  <span className="notifications__time">{notif.time}</span>
                </div>
              </button>
            );
          })
        )}
      </div>

      <div style={{ height: 'calc(var(--bottom-nav-height) + 16px)' }} />
    </div>
  );
}
