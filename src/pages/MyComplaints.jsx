import { useState } from 'react';
import useComplaintStore from '../store/complaintStore';
import ComplaintCard from '../components/ComplaintCard';
import './MyComplaints.css';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'resolved', label: 'Resolved' },
  { key: 'rejected', label: 'Rejected' },
];

export default function MyComplaints() {
  const complaints = useComplaintStore(s => s.complaints);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');

  const userComplaints = complaints.filter(c => c.userId === 'u001');

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
          placeholder="Search by title or complaint ID..."
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
            <h3>No complaints found</h3>
            <p>
              {search ? 'Try a different search term' : `You don't have any ${activeTab === 'all' ? '' : activeTab.replace('_', ' ')} complaints`}
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
