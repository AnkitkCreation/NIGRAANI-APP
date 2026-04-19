import { useLocation, useNavigate } from 'react-router-dom';
import useAppStore from '../../store/appStore';
import useTranslation from '../../hooks/useTranslation';
import './BottomNav.css';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const setActiveTab = useAppStore(s => s.setActiveTab);
  const { t } = useTranslation();

  const tabs = [
    { key: 'home', label: t('nav_home'), icon: 'fa-house', path: '/home' },
    { key: 'map', label: t('nav_map'), icon: 'fa-map-location-dot', path: '/map' },
    { key: 'report', label: t('nav_report'), icon: 'fa-plus', path: '/report', center: true },
    { key: 'complaints', label: t('nav_issues'), icon: 'fa-list-check', path: '/complaints' },
    { key: 'profile', label: t('nav_profile'), icon: 'fa-user', path: '/profile' },
  ];

  const hiddenPaths = ['/', '/splash', '/onboarding', '/auth'];
  if (hiddenPaths.some(p => location.pathname === p)) return null;

  const activeKey = tabs.find(t => location.pathname.startsWith(t.path))?.key || 'home';

  return (
    <nav className="bottom-nav" id="bottom-nav">
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={`bottom-nav__tab ${activeKey === tab.key ? 'bottom-nav__tab--active' : ''} ${tab.center ? 'bottom-nav__tab--center' : ''}`}
          onClick={() => { setActiveTab(tab.key); navigate(tab.path); }}
          id={`nav-${tab.key}`}
        >
          {tab.center ? (
            <div className="bottom-nav__fab">
              <i className={`fas ${tab.icon}`} />
            </div>
          ) : (
            <>
              <i className={`fas ${tab.icon}`} />
              <span>{tab.label}</span>
            </>
          )}
        </button>
      ))}
    </nav>
  );
}
