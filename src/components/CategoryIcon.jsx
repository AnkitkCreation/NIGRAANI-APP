import './CategoryIcon.css';

export default function CategoryIcon({ icon, label, color, onClick, active = false }) {
  return (
    <button
      className={`category-icon ${active ? 'category-icon--active' : ''}`}
      onClick={onClick}
      title={label}
    >
      <div className="category-icon__circle" style={{ '--cat-color': color }}>
        <i className={`fas ${icon}`} />
      </div>
      <span className="category-icon__label">{label}</span>
    </button>
  );
}
