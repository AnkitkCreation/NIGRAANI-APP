import { useLocation, useNavigate } from 'react-router-dom';
import useAppStore from '../../store/appStore';
import useAuthStore from '../../store/authStore';
import useTranslation from '../../hooks/useTranslation';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const notificationCount = useAppStore(s => s.getUnreadCount(user?.id));

  const SCREEN_TITLES = {
    '/home': 'NIGRANI',
    '/dashboard': 'NIGRANI',
    '/map': t('nav_map'),
    '/report': t('quick_report'),
    '/complaints': t('nav_issues'),
    '/profile': t('nav_profile'),
    '/notifications': t('notifications'),
  };

  const hiddenPaths = ['/', '/splash', '/onboarding', '/auth'];
  if (hiddenPaths.some(p => location.pathname === p)) return null;

  const isDetail = location.pathname.startsWith('/complaint/');
  const title = isDetail ? 'Complaint Detail' : (SCREEN_TITLES[location.pathname] || 'NIGRANI');
  const isBrand = location.pathname === '/home';

  return (
    <header className="header" id="app-header">
      {isDetail ? (
        <button className="header__back" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left" />
        </button>
      ) : (
        <div className="header__spacer" />
      )}

      <h1 className={`header__title ${isBrand ? 'header__title--brand' : ''}`}>
        {isBrand && <span className="header__eye">👁</span>}
        {title}
      </h1>

      <div className="header__actions">
        <button
          className="header__icon-btn"
          onClick={() => navigate('/notifications')}
          id="notification-bell"
        >
          <i className="fas fa-bell" />
          {notificationCount > 0 && (
            <span className="header__badge">{notificationCount}</span>
          )}
        </button>
        <button
          className="header__avatar"
          onClick={() => navigate('/profile')}
          id="profile-avatar"
        >
          <i className="fas fa-user" />
        </button>
      </div>
    </header>
  );
}
