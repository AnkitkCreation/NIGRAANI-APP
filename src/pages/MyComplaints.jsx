import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useComplaintStore from '../store/complaintStore';
import useAuthStore from '../store/authStore';
import useTranslation from '../hooks/useTranslation';
import ComplaintCard from '../components/ComplaintCard';
import './MyComplaints.css';

export default function MyComplaints() {
  const location = useLocation();
  const { user } = useAuthStore();
  const complaints = useComplaintStore(s => s.complaints);
  const { t } = useTranslation();
  
  const [activeTab, setActiveTab] = useState(location.state?.status || 'all');
  const [search, setSearch] = useState('');

  const TABS = [
    { key: 'all', label: t('all') },
    { key: 'pending', label: t('status_pending') },
    { key: 'in_progress', label: t('status_in_progress') },
    { key: 'resolved', label: t('status_resolved') },
    { key: 'rejected', label: t('status_rejected') },
  ];

  useEffect(() => {
    if (location.state?.status) {
      setActiveTab(location.state.status);
    }
  }, [location.state]);

  const userComplaints = complaints.filter(c => c.userId === user?.id);

  const filtered = userComplaints.filter(c => {
    const matchTab = activeTab === 'all' || c.status === activeTab || (activeTab === 'in_progress' && c.status === 'assigned');
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const getCounts = (tab) => {
    if (tab === 'all') return userComplaints.length;
    if (tab === 'in_progress') return userComplaints.filter(c => c.status === 'in_progress' || c.status === 'assigned').length;
    return userComplaints.filter(c => c.status === tab).length;
  };

  return (
    <div className="my-complaints">
      {/* Search */}
      <div className="my-complaints__search">
        <i className="fas fa-search" />
        <input
          type="text"
          placeholder={t('search_placeholder')}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button className="my-complaints__clear" onClick={() => setSearch('')}>
            <i className="fas fa-times" />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="my-complaints__tabs">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`my-complaints__tab ${activeTab === tab.key ? 'my-complaints__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <span className="my-complaints__tab-count">{getCounts(tab.key)}</span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="my-complaints__list">
        {filtered.length === 0 ? (
          <div className="my-complaints__empty">
            <i className="fas fa-clipboard" />
            <h3>{t('no_complaints')}</h3>
            <p>
              {search ? t('try_different') : t('no_complaints_type').replace('{type}', activeTab === 'all' ? '' : t(`status_${activeTab}`))}
            </p>
          </div>
        ) : (
          filtered.map((c, i) => (
            <div key={c.id} style={{ animationDelay: `${i * 0.05}s` }}>
              <ComplaintCard complaint={c} />
            </div>
          ))
        )}
      </div>

      <div style={{ height: 'calc(var(--bottom-nav-height) + 16px)' }} />
    </div>
  );
}
