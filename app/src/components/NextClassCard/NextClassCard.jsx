import './NextClassCard.css';

function NextClassCard({ data, onDetails }) {
  const isOnline = data.format === 'online';
  const formatLabel = isOnline ? 'Aula online' : 'Aula presencial';

  return (
    <article className={`next-class ${isOnline ? 'next-class--online' : 'next-class--onsite'}`}>
      <div className="next-class__meta">
        <span className="next-class__tag">{formatLabel}</span>
        <span className="next-class__time">{data.startsAt} – {data.endsAt}</span>
      </div>

      <h3 className="next-class__subject">{data.subject}</h3>
      <p className="next-class__teacher">{data.teacher}</p>

      <p className="next-class__where">
        {isOnline ? 'Acesso online pelo link da call' : `Sala ${data.room ?? '—'}`}
      </p>

      <div className="next-class__actions">
        {isOnline && data.callLink ? (
          <a className="next-class__action" href={data.callLink} target="_blank" rel="noreferrer">
            Entrar na call
          </a>
        ) : null}
        <button
          type="button"
          className="next-class__action next-class__action--secondary"
          onClick={onDetails}
        >
          Ver detalhes
        </button>
      </div>
    </article>
  );
}

export default NextClassCard;
