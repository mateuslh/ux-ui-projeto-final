import './PendingActivities.css';

function PendingActivities({ items }) {
  if (!items?.length) {
    return <p className="pending-activities__empty">Sem atividades pendentes.</p>;
  }

  return (
    <ul className="pending-activities">
      {items.map((item) => (
        <li key={item.id} className={`pending-activities__item pending-activities__item--${item.priority}`}>
          <div className="pending-activities__content">
            <p className="pending-activities__title">{item.title}</p>
            <p className="pending-activities__subject">{item.subject}</p>
          </div>
          <span className="pending-activities__due">{item.dueLabel}</span>
        </li>
      ))}
    </ul>
  );
}

export default PendingActivities;
