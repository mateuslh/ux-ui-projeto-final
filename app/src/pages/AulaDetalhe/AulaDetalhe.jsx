import DetailHeader from '../../components/DetailHeader/DetailHeader.jsx';
import './AulaDetalhe.css';

const MATERIALS_BY_SUBJECT = {
  'Engenharia de Software': [
    { name: 'Slides — Aula 08: Testes de Software', type: 'PDF' },
    { name: 'Leitura: Sommerville Cap. 8', type: 'PDF' },
    { name: 'Exercícios de UML', type: 'DOC' },
  ],
  'Interação Humano-Computador': [
    { name: 'Slides — Heurísticas de Nielsen', type: 'PDF' },
    { name: 'Artigo: Usability Testing Methods', type: 'PDF' },
  ],
  'Banco de Dados II': [
    { name: 'Slides — Normalização 3FN', type: 'PDF' },
    { name: 'Lista de Exercícios 04', type: 'DOC' },
    { name: 'Script SQL — Exercício Prático', type: 'SQL' },
  ],
  'Sistemas Operacionais': [
    { name: 'Slides — Gerência de Memória', type: 'PDF' },
    { name: 'Leitura: Tanenbaum Cap. 3', type: 'PDF' },
  ],
  'Redes de Computadores': [
    { name: 'Slides — Camada de Transporte', type: 'PDF' },
    { name: 'Exercícios — Protocolo TCP/IP', type: 'DOC' },
  ],
};

const TYPE_COLORS = {
  PDF: { bg: 'rgba(179,38,30,0.1)', color: '#B3261E' },
  DOC: { bg: 'rgba(6,95,49,0.1)',   color: '#065F31' },
  SQL: { bg: 'rgba(29,140,79,0.12)', color: '#1D8C4F' },
};

function AulaDetalhe({ params, onBack }) {
  if (!params) return null;

  const isOnline = params.format === 'online';
  const materials = MATERIALS_BY_SUBJECT[params.subject] ?? [
    { name: 'Slides da aula', type: 'PDF' },
    { name: 'Material de apoio', type: 'PDF' },
  ];

  return (
    <div className="page">
      <DetailHeader title={params.subject} onBack={onBack} />

      <main className="page__main" id="conteudo">
        <article className={`aula-info aula-info--${params.format}`}>
          <div className="aula-info__badges">
            <span className={`aula-info__format aula-info__format--${params.format}`}>
              {isOnline ? 'Aula online' : 'Aula presencial'}
            </span>
            {params.status === 'next' && (
              <span className="aula-info__badge-next">Próxima</span>
            )}
          </div>
          <p className="aula-info__teacher">{params.teacher}</p>
          <div className="aula-info__row">
            <span className="aula-info__row-label">Horário</span>
            <span className="aula-info__row-value">{params.startsAt} – {params.endsAt}</span>
          </div>
          <div className="aula-info__row">
            <span className="aula-info__row-label">{isOnline ? 'Formato' : 'Sala'}</span>
            <span className="aula-info__row-value">
              {isOnline ? 'Online' : `Sala ${params.room}`}
            </span>
          </div>
        </article>

        {isOnline && params.callLink && params.status !== 'done' && (
          <a
            className="call-link-btn"
            href={params.callLink}
            target="_blank"
            rel="noreferrer"
          >
            Entrar na call agora
          </a>
        )}

        <section aria-labelledby="sec-materiais">
          <h2 id="sec-materiais" className="aula-section-title">Materiais da disciplina</h2>
          <ul className="material-list">
            {materials.map((mat, i) => {
              const style = TYPE_COLORS[mat.type] ?? TYPE_COLORS.PDF;
              return (
                <li key={i} className="material-item">
                  <span
                    className="material-item__type"
                    style={{ background: style.bg, color: style.color }}
                  >
                    {mat.type}
                  </span>
                  <p className="material-item__name">{mat.name}</p>
                  <svg className="material-item__download" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default AulaDetalhe;
