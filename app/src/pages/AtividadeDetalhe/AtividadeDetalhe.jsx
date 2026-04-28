import DetailHeader from '../../components/DetailHeader/DetailHeader.jsx';
import './AtividadeDetalhe.css';

const DESCRIPTIONS = {
  high: 'Esta atividade é de alta prioridade e vence hoje. Garanta a entrega antes do horário limite.',
  medium: 'Atividade com prazo próximo. Organize seu tempo para entregá-la dentro do prazo.',
  low: 'Atividade com prazo confortável. Planeje a entrega com antecedência.',
};

const ATTACHMENTS_BY_TITLE = {
  'Entrega do artigo de UX': [
    { name: 'Template — Artigo ABNT.docx', type: 'DOC' },
    { name: 'Critérios de avaliação.pdf', type: 'PDF' },
  ],
  'Lista de exercícios 04': [
    { name: 'Lista_04_BD2.pdf', type: 'PDF' },
    { name: 'Dataset para exercícios.sql', type: 'SQL' },
  ],
  'Relatório de requisitos — Sprint 2': [
    { name: 'Template de Requisitos.docx', type: 'DOC' },
    { name: 'Rubrica Sprint 2.pdf', type: 'PDF' },
  ],
};

const TYPE_COLORS = {
  PDF: { bg: 'rgba(179,38,30,0.1)', color: '#B3261E' },
  DOC: { bg: 'rgba(6,95,49,0.1)',   color: '#065F31' },
  SQL: { bg: 'rgba(29,140,79,0.12)', color: '#1D8C4F' },
};

const URGENCY_LABEL = { high: 'Alta', medium: 'Média', low: 'Baixa' };

function AttachmentRow({ name, type }) {
  const style = TYPE_COLORS[type] ?? TYPE_COLORS.PDF;
  return (
    <li className="ativ-attachment">
      <span className="ativ-attachment__type" style={{ background: style.bg, color: style.color }}>
        {type}
      </span>
      <p className="ativ-attachment__name">{name}</p>
      <svg className="ativ-attachment__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </li>
  );
}

function PendingView({ params }) {
  const { title, subject, dueLabel, dueUrgency, priority } = params;
  const urgency = dueUrgency ?? priority ?? 'low';
  const description = DESCRIPTIONS[urgency];
  const attachments = ATTACHMENTS_BY_TITLE[title] ?? [
    { name: 'Enunciado da atividade.pdf', type: 'PDF' },
  ];

  return (
    <>
      <div className="ativ-meta">
        <div className="ativ-meta__row">
          <span className="ativ-meta__label">Disciplina</span>
          <span className="ativ-meta__value">{subject}</span>
        </div>
        <div className="ativ-meta__row">
          <span className="ativ-meta__label">Prazo</span>
          <span className={`ativ-meta__value ativ-meta__due--${urgency}`}>{dueLabel}</span>
        </div>
        <div className="ativ-meta__row">
          <span className="ativ-meta__label">Prioridade</span>
          <span className={`ativ-meta__badge ativ-meta__badge--${urgency}`}>
            {URGENCY_LABEL[urgency]}
          </span>
        </div>
      </div>

      <section aria-labelledby="sec-descricao">
        <h2 id="sec-descricao" className="ativ-section-title">Descrição</h2>
        <p className="ativ-description">{description}</p>
      </section>

      <section aria-labelledby="sec-anexos">
        <h2 id="sec-anexos" className="ativ-section-title">Anexos</h2>
        <ul className="ativ-attachment-list">
          {attachments.map((att, i) => <AttachmentRow key={i} {...att} />)}
        </ul>
      </section>

      <div className="ativ-submit">
        <button type="button" className="ativ-submit__btn" disabled title="Envio disponível no portal acadêmico">
          Enviar atividade
        </button>
        <p className="ativ-submit__hint">O envio será feito pelo portal acadêmico.</p>
      </div>
    </>
  );
}

function DeliveredView({ params }) {
  const { subject, deliveredAt, deliveredLabel, status, grade, feedback, attachmentName } = params;
  const isGraded = status === 'graded';

  return (
    <>
      <div className="ativ-meta">
        <div className="ativ-meta__row">
          <span className="ativ-meta__label">Disciplina</span>
          <span className="ativ-meta__value">{subject}</span>
        </div>
        <div className="ativ-meta__row">
          <span className="ativ-meta__label">Data de entrega</span>
          <span className="ativ-meta__value">{deliveredLabel}</span>
        </div>
        <div className="ativ-meta__row">
          <span className="ativ-meta__label">Situação</span>
          <span className={`ativ-meta__badge ativ-meta__badge--${isGraded ? 'graded' : 'submitted'}`}>
            {isGraded ? 'Corrigida' : 'Aguardando correção'}
          </span>
        </div>
        {attachmentName && (
          <div className="ativ-meta__row">
            <span className="ativ-meta__label">Arquivo</span>
            <span className="ativ-meta__file">{attachmentName}</span>
          </div>
        )}
      </div>

      {isGraded ? (
        <section aria-labelledby="sec-resultado" className="ativ-result">
          <h2 id="sec-resultado" className="ativ-section-title">Resultado</h2>
          <div className="ativ-grade-card">
            <div className="ativ-grade-card__score">
              <p className="ativ-grade-card__label">Nota</p>
              <span className="ativ-grade-card__value">{grade}</span>
              <span className="ativ-grade-card__max">/ 10</span>
            </div>
            {feedback && (
              <div className="ativ-grade-card__feedback">
                <p className="ativ-grade-card__feedback-label">Feedback do professor</p>
                <p className="ativ-grade-card__feedback-text">{feedback}</p>
              </div>
            )}
          </div>
        </section>
      ) : (
        <div className="ativ-awaiting">
          <div className="ativ-awaiting__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <p className="ativ-awaiting__title">Atividade enviada</p>
          <p className="ativ-awaiting__text">
            Sua entrega foi recebida em {deliveredAt}. A correção será publicada em breve.
          </p>
        </div>
      )}
    </>
  );
}

function AtividadeDetalhe({ params, onBack }) {
  if (!params) return null;

  const isDelivered = Boolean(params.deliveredAt);

  return (
    <div className="page">
      <DetailHeader title={params.title} onBack={onBack} />
      <main className="page__main" id="conteudo">
        {isDelivered
          ? <DeliveredView params={params} />
          : <PendingView params={params} />
        }
      </main>
    </div>
  );
}

export default AtividadeDetalhe;
