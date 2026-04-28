import './DetailHeader.css';

function DetailHeader({ title, onBack }) {
  return (
    <header className="detail-header" role="banner">
      <div className="detail-header__top">
        <button
          type="button"
          className="detail-header__back"
          onClick={onBack}
          aria-label="Voltar"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Voltar
        </button>
      </div>
      <h1 className="detail-header__title">{title}</h1>
    </header>
  );
}

export default DetailHeader;
