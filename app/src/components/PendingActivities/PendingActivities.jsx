import './PendingActivities.css';

function PendingActivities({ items, onSelectItem }) {
  if (!items?.length) {
    return <p className="pending-activities__empty">Sem atividades pendentes.</p>;
  }

  return (
    <ul className="pending-activities">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            className={`pending-activities__item pending-activities__item--${item.priority}`}
            onClick={() => onSelectItem?.(item)}
          >
            <div className="pending-activities__content">
              <p className="pending-activities__title">{item.title}</p>
              <p className="pending-activities__subject">{item.subject}</p>
            </div>
            <div className="pending-activities__right">
              <span className="pending-activities__due">{item.dueLabel}</span>
              <svg className="pending-activities__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PendingActivities;
