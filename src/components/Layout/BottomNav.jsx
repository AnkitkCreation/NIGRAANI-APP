import { useLocation, useNavigate } from 'react-router-dom';
import useAppStore from '../../store/appStore';
import './BottomNav.css';

const tabs = [
  { key: 'home', label: 'Home', icon: 'fa-home', path: '/home' },
  { key: 'map', label: 'Map', icon: 'fa-map-marked-alt', path: '/map' },
  { key: 'report', label: 'Report', icon: 'fa-plus', path: '/report', center: true },
  { key: 'complaints', label: 'My Issues', icon: 'fa-clipboard-list', path: '/complaints' },
  { key: 'profile', label: 'Profile', icon: 'fa-user-circle', path: '/profile' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const setActiveTab = useAppStore(s => s.setActiveTab);

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
