import { useParams, useNavigate } from 'react-router-dom';
import useAppStore from '../store/appStore';
import useTranslation from '../hooks/useTranslation';
import './SettingsDetail.css';

export default function SettingsDetail() {
  const { type } = useParams();
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const setLanguage = useAppStore((state) => state.setLanguage);

  const CONTENT = {
    notifications: {
      title: t('notifications'),
      icon: 'fa-bell',
      body: 'Phase 1 simulated push notifications. In the full version, you will receive real-time updates for: \n\n• Complaint status changes\n• Contractor assignments\n• Resolution confirmations\n• Community announcements',
    },
    privacy: {
      title: t('privacy'),
      icon: 'fa-shield-halved',
      body: 'Your privacy is paramount. NIGRANI only collects data necessary for civic accountability:\n\n1. Phone number for account verification.\n2. GPS location for precise issue reporting.\n3. Photos for evidence.\n\nYour personal details are NOT shared with contractors, only the issue data and location.',
    },
    help: {
      title: t('help'),
      icon: 'fa-circle-question',
      body: 'Having issues? Reach out to us:\n\nEmail: support@nigrani.pune.gov.in\nHelpline: 1800- civic-help\n\nFrequently Asked Questions:\n• How long does a pothole fix take?\n• Can I report anonymously?\n• What if the issue is marked "Resolved" but is still there?',
    },
    about: {
      title: t('about'),
      icon: 'fa-info-circle',
      body: 'NIGRANI — Civic Oversight Platform\nVersion: 1.0.0 (MVP)\n\nDeveloped in partnership with Pune Municipal Corporation to bring transparency and efficiency to civic governance. Our goal is to empower citizens to be the eyes of the city.',
    },
  };

  const isLanguage = type === 'language';
  const data = CONTENT[type] || { title: t(type), icon: 'fa-cog' };

  return (
    <div className="settings-detail animate-fade-in">
      <div className="settings-detail__header">
        <button className="settings-detail__back" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left" />
        </button>
        <h1>{isLanguage ? t('language') : data.title}</h1>
      </div>

      <div className="settings-detail__content">
        <div className="settings-detail__icon-box">
          <i className={`fas ${isLanguage ? 'fa-language' : data.icon}`} />
        </div>

        {isLanguage ? (
          <div className="settings-detail__language-selector">
            <h3>{t('select_language')}</h3>
            <div className="language-options">
              {[
                { code: 'en', label: t('lang_en') },
                { code: 'hi', label: t('lang_hi') },
                { code: 'mr', label: t('lang_mr') },
              ].map((opt) => (
                <button
                  key={opt.code}
                  className={`language-option ${language === opt.code ? 'active' : ''}`}
                  onClick={() => setLanguage(opt.code)}
                >
                  <span className="language-option__label">{opt.label}</span>
                  {language === opt.code && <i className="fas fa-check-circle" />}
                </button>
              ))}
            </div>
            <p className="settings-detail__note">{t('phase2_note')}</p>
          </div>
        ) : (
          <div className="settings-detail__text">
            {data.body?.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}
      </div>

      <div className="settings-detail__footer">
        <button className="btn btn-primary btn-full" onClick={() => navigate(-1)}>
          {t('got_it')}
        </button>
      </div>
    </div>
  );
}
