import { useMemo } from 'react';
import useTranslation from '../hooks/useTranslation';
import { CITY_STATS, MOCK_CONTRACTORS, MOCK_COMPLAINTS, CATEGORIES } from '../data/mockData';
import './Transparency.css';

export default function Transparency() {
  const { t } = useTranslation();

  const activeTenders = useMemo(() => {
    return MOCK_COMPLAINTS
      .filter(c => c.assignment)
      .slice(0, 4)
      .map(c => ({
        id: c.assignment.tenderId,
        title: c.title,
        budget: c.assignment.budget,
        agency: c.assignment.contractorName
      }));
  }, []);

  const contractorRankings = useMemo(() => {
    return [...MOCK_CONTRACTORS].sort((a, b) => b.rating - a.rating);
  }, []);

  const departmentStats = useMemo(() => {
    return CATEGORIES.slice(0, 4).map((cat, idx) => ({
      ...cat,
      efficiency: [92, 87, 78, 85][idx],
      activeCount: [42, 38, 25, 31][idx]
    }));
  }, []);

  return (
    <div className="transparency animate-fade-in">
      {/* Financial Overview */}
      <section className="transparency__section">
        <h2 className="transparency__section-title">
          <i className="fas fa-hand-holding-dollar" /> {t('fin_overview')}
        </h2>
        <div className="transparency__fin-card">
          <span className="transparency__fin-label">{t('budget_utilized')} (YTD)</span>
          <span className="transparency__fin-value">₹{(CITY_STATS.totalBudgetUtilized / 10000000).toFixed(2)}Cr</span>
          <div className="transparency__fin-visual">
            <div className="transparency__fin-bar" style={{ width: '72%' }} />
          </div>
          <p className="text-caption" style={{ color: 'rgba(255,255,255,0.7)', marginTop: '8px' }}>
            Allocated across {CITY_STATS.contractorsActive} active contractors
          </p>
        </div>
      </section>

      {/* Contractor Leaderboard */}
      <section className="transparency__section">
        <h2 className="transparency__section-title">
          <i className="fas fa-medal" /> {t('contractor_rankings')}
        </h2>
        <div className="transparency__leaderboard">
          {contractorRankings.map((c, i) => (
            <div key={c.id} className="transparency__contractor">
              <div className="transparency__contractor-rank">{i + 1}</div>
              <div className="transparency__contractor-info">
                <span className="transparency__contractor-name">{c.name}</span>
                <span className="transparency__contractor-agency">{c.agency}</span>
              </div>
              <div className="transparency__contractor-stats">
                <span className="transparency__rating">{c.rating} <i className="fas fa-star" /></span>
                <span className="transparency__avg-days">{c.avgDays}d avg</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Department Efficiency */}
      <section className="transparency__section">
        <h2 className="transparency__section-title">
          <i className="fas fa-chart-line" /> {t('department_stats')}
        </h2>
        <div className="transparency__grid">
          {departmentStats.map(dept => (
            <div key={dept.key} className="transparency__grid-item">
              <div className="transparency__grid-icon" style={{ backgroundColor: `${dept.color}15`, color: dept.color }}>
                <i className={`fas ${dept.icon}`} />
              </div>
              <span className="transparency__grid-value">{dept.efficiency}%</span>
              <span className="transparency__grid-label">{t(`cat_${dept.key}`)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tender Feed */}
      <section className="transparency__section">
        <h2 className="transparency__section-title">
          <i className="fas fa-file-contract" /> {t('active_tenders')}
        </h2>
        <div className="transparency__tenders">
          {activeTenders.map(tender => (
            <div key={tender.id} className="transparency__tender">
              <div className="transparency__tender-left">
                <span className="transparency__tender-id">{tender.id}</span>
                <span className="transparency__tender-title">{tender.title}</span>
                <span className="transparency__contractor-agency">{tender.agency}</span>
              </div>
              <div className="transparency__tender-budget">
                ₹{tender.budget.toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom spacer for nav */}
      <div style={{ height: 'calc(var(--bottom-nav-height) + 16px)' }} />
    </div>
  );
}
