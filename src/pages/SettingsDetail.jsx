import { useParams, useNavigate } from 'react-router-dom';
import './SettingsDetail.css';

const CONTENT = {
  notifications: {
    title: 'Notifications',
    icon: 'fa-bell',
    body: 'Phase 1 simulated push notifications. In the full version, you will receive real-time updates for: \n\n• Complaint status changes\n• Contractor assignments\n• Resolution confirmations\n• Community announcements',
  },
  language: {
    title: 'Language',
    icon: 'fa-language',
    body: 'Current Language: English\n\nSupport for Marathi and Hindi is scheduled for the Phase 2 release. We aim to make NIGRANI accessible to every citizen in their preferred local language.',
  },
  privacy: {
    title: 'Privacy Policy',
    icon: 'fa-shield-halved',
    body: 'Your privacy is paramount. NIGRANI only collects data necessary for civic accountability:\n\n1. Phone number for account verification.\n2. GPS location for precise issue reporting.\n3. Photos for evidence.\n\nYour personal details are NOT shared with contractors, only the issue data and location.',
  },
  help: {
    title: 'Help & Support',
    icon: 'fa-circle-question',
    body: 'Having issues? Reach out to us:\n\nEmail: support@nigrani.pune.gov.in\nHelpline: 1800- civic-help\n\nFrequently Asked Questions:\n• How long does a pothole fix take?\n• Can I report anonymously?\n• What if the issue is marked "Resolved" but is still there?',
  },
  about: {
    title: 'About NIGRANI',
    icon: 'fa-info-circle',
    body: 'NIGRANI — Civic Oversight Platform\nVersion: 1.0.0 (MVP)\n\nDeveloped in partnership with Pune Municipal Corporation to bring transparency and efficiency to civic governance. Our goal is to empower citizens to be the eyes of the city.',
  },
};

export default function SettingsDetail() {
  const { type } = useParams();
  const navigate = useNavigate();
  const data = CONTENT[type] || CONTENT.about;

  return (
    <div className="settings-detail animate-fade-in">
      <div className="settings-detail__header">
        <button className="settings-detail__back" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left" />
        </button>
        <h1>{data.title}</h1>
      </div>

      <div className="settings-detail__content">
        <div className="settings-detail__icon-box">
          <i className={`fas ${data.icon}`} />
        </div>
        <div className="settings-detail__text">
          {data.body.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>

      <div className="settings-detail__footer">
        <button className="btn btn-primary btn-full" onClick={() => navigate(-1)}>
          Got it
        </button>
      </div>
    </div>
  );
}
