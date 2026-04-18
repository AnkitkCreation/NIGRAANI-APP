import './StepIndicator.css';

export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="step-indicator">
      {steps.map((step, i) => (
        <div key={i} className={`step-indicator__item ${i + 1 <= currentStep ? 'step-indicator__item--active' : ''} ${i + 1 < currentStep ? 'step-indicator__item--completed' : ''}`}>
          <div className="step-indicator__circle">
            {i + 1 < currentStep ? <i className="fas fa-check" /> : i + 1}
          </div>
          <span className="step-indicator__label">{step}</span>
          {i < steps.length - 1 && <div className="step-indicator__line" />}
        </div>
      ))}
    </div>
  );
}
