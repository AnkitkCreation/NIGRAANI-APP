import useTranslation from '../hooks/useTranslation';
import './CategoryIcon.css';

export default function CategoryIcon({ icon, label, color, onClick, active = false, catKey }) {
  const { t } = useTranslation();
  const displayLabel = catKey ? t(`cat_${catKey}`) : label;

  return (
    <button
      className={`category-icon ${active ? 'category-icon--active' : ''}`}
      onClick={onClick}
      title={displayLabel}
    >
      <div className="category-icon__circle" style={{ '--cat-color': color }}>
        <i className={`fas ${icon}`} />
      </div>
      <span className="category-icon__label">{displayLabel}</span>
    </button>
  );
}
