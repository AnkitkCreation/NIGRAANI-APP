import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/appStore';
import useAuthStore from '../store/authStore';
import './Notifications.css';

const ICON_MAP = {
  status_update: { icon: 'fa-arrow-rotate-right', color: 'var(--info)' },
  assigned: { icon: 'fa-user-check', color: 'var(--primary)' },
  resolved: { icon: 'fa-circle-check', color: 'var(--success)' },
  rejected: { icon: 'fa-circle-xmark', color: 'var(--danger)' },
};

export default function Notifications() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getUserNotifications, clearNotifications } = useAppStore();
  
  const userNotifications = getUserNotifications(user?.id);
  const unreadCount = userNotifications.filter(n => !n.read).length;

  return (
    <div className="notifications">
      <div className="notifications__header">
        <span className="notifications__count">{unreadCount} new</span>
        <button className="btn btn-ghost btn-sm" onClick={() => clearNotifications(user?.id)}>
          Mark all read
        </button>
      </div>

      <div className="notifications__list">
        {userNotifications.length === 0 ? (
          <div className="notifications__empty">
            <i className="fas fa-bell-slash" />
            <p>No notifications yet</p>
          </div>
        ) : (
          userNotifications.map((notif, i) => {
          const iconInfo = ICON_MAP[notif.type] || ICON_MAP.status_update;
          return (
            <button
              key={notif.id}
              className={`notifications__item ${!notif.read ? 'notifications__item--unread' : ''}`}
              onClick={() => navigate(`/complaint/${notif.complaintId}`)}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="notifications__icon" style={{ '--notif-color': iconInfo.color }}>
                <i className={`fas ${iconInfo.icon}`} />
              </div>
              <div className="notifications__content">
                <span className="notifications__title">{notif.title}</span>
                <span className="notifications__message">{notif.message}</span>
                <span className="notifications__time">{notif.time}</span>
              </div>
              {!notif.read && <span className="notifications__dot" />}
            </button>
          );
          })
        )}
      </div>

      <div style={{ height: 'calc(var(--bottom-nav-height) + 16px)' }} />
    </div>
  );
}
