import { getStatusInfo, formatFullDate } from '../data/mockData';
import './Timeline.css';

export default function Timeline({ events }) {
  return (
    <div className="timeline">
      {events.map((event, i) => {
        const statusInfo = getStatusInfo(event.status);
        return (
          <div key={i} className={`timeline__item ${i === 0 ? 'timeline__item--latest' : ''}`}>
            <div className="timeline__marker" style={{ '--tl-color': statusInfo.color }}>
              <div className="timeline__dot" />
              {i < events.length - 1 && <div className="timeline__connector" />}
            </div>
            <div className="timeline__content">
              <div className="timeline__header">
                <span className="timeline__status" style={{ color: statusInfo.color }}>
                  {statusInfo.label}
                </span>
                <span className="timeline__date">{formatFullDate(event.date)}</span>
              </div>
              <p className="timeline__note">{event.note}</p>
              <span className="timeline__actor">
                <i className="fas fa-user" /> {event.actor}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
