import { useState } from 'react';
import './PhotoCarousel.css';

export default function PhotoCarousel({ photos }) {
  const [active, setActive] = useState(0);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="photo-carousel">
      <div className="photo-carousel__viewport">
        <img
          src={photos[active]}
          alt={`Photo ${active + 1}`}
          className="photo-carousel__img"
        />
        {photos.length > 1 && (
          <>
            <button
              className="photo-carousel__nav photo-carousel__nav--prev"
              onClick={() => setActive((active - 1 + photos.length) % photos.length)}
              aria-label="Previous photo"
            >
              <i className="fas fa-chevron-left" />
            </button>
            <button
              className="photo-carousel__nav photo-carousel__nav--next"
              onClick={() => setActive((active + 1) % photos.length)}
              aria-label="Next photo"
            >
              <i className="fas fa-chevron-right" />
            </button>
          </>
        )}
        <div className="photo-carousel__counter">
          {active + 1} / {photos.length}
        </div>
      </div>
      {photos.length > 1 && (
        <div className="photo-carousel__dots">
          {photos.map((_, i) => (
            <button
              key={i}
              className={`photo-carousel__dot ${i === active ? 'photo-carousel__dot--active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
