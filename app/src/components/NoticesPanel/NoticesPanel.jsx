import './NoticesPanel.css';

function NoticesPanel({ items }) {
  return (
    <ul className="notices">
      {items.map((notice) => (
        <li key={notice.id} className={`notices__item ${notice.isImportant ? 'notices__item--important' : ''}`}>
          <div className="notices__head">
            <span className="notices__tag">{notice.tag}</span>
            {notice.isImportant && <span className="notices__badge">Importante</span>}
          </div>
          <p className="notices__title">{notice.title}</p>
          <p className="notices__summary">{notice.summary}</p>
        </li>
      ))}
    </ul>
  );
}

export default NoticesPanel;
