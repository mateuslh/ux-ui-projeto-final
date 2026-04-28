import DetailHeader from '../../components/DetailHeader/DetailHeader.jsx';
import { matriculaMock } from './matriculaMock.js';
import './MatriculaPage.css';

const STATUS_CONFIG = {
  open: {
    label: 'Aberta',
    variant: 'open',
    description: (m) => `Período aberto até ${m.period.end} — ${m.period.daysLeft} dias restantes`,
    cta: 'Iniciar reserva',
  },
  reserved: {
    label: 'Reservada',
    variant: 'reserved',
    description: (m) => `Reserva realizada em ${m.reservation.reservedAt} · Protocolo ${m.reservation.protocol}`,
    cta: 'Ver detalhes da reserva',
  },
  confirmed: {
    label: 'Confirmada',
    variant: 'confirmed',
    description: (m) => `Matrícula confirmada · ${m.reservation.subjects} disciplinas · ${m.reservation.credits} créditos`,
    cta: 'Ver disciplinas matriculadas',
  },
  closed: {
    label: 'Encerrada',
    variant: 'closed',
    description: () => 'O período de reserva foi encerrado. Aguarde o próximo ciclo.',
    cta: null,
  },
};

const HISTORY_STATUS_LABEL = { confirmed: 'Confirmada', reserved: 'Reservada' };

function MatriculaPage({ onNavigate, onBack }) {
  const { currentSemester, status, period, reservation, credits, history } = matriculaMock;
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.closed;
  const canReserve = status === 'open';

  function handleCta() {
    if (canReserve) {
      onNavigate('matricula-reserva');
    }
  }

  return (
    <div className="page">
      <DetailHeader title="Reserva de Matrícula" onBack={onBack} />

      <main className="page__main" id="conteudo">

        <section aria-labelledby="sec-status">
          <h2 id="sec-status" className="matricula-section-title">Semestre {currentSemester}</h2>

          <article className={`matricula-status-card matricula-status-card--${config.variant}`}>
            <div className="matricula-status-card__top">
              <span className={`matricula-badge matricula-badge--${config.variant}`}>
                {config.label}
              </span>
              {status === 'open' && (
                <span className="matricula-status-card__days">
                  {period.daysLeft} dias
                </span>
              )}
            </div>

            <p className="matricula-status-card__desc">{config.description(matriculaMock)}</p>

            {status === 'open' && (
              <div className="matricula-deadline-bar">
                <div
                  className="matricula-deadline-bar__fill"
                  style={{ width: `${Math.round((1 - period.daysLeft / 30) * 100)}%` }}
                />
              </div>
            )}

            {config.cta && (
              <button
                type="button"
                className={`matricula-status-card__cta ${canReserve ? 'matricula-status-card__cta--primary' : 'matricula-status-card__cta--secondary'}`}
                onClick={handleCta}
                disabled={!canReserve && status === 'closed'}
              >
                {config.cta}
              </button>
            )}
          </article>
        </section>

        {(status === 'reserved' || status === 'confirmed') && reservation && (
          <section aria-labelledby="sec-detalhes" className="matricula-details">
            <h2 id="sec-detalhes" className="matricula-section-title">Detalhes da reserva</h2>
            <ul className="matricula-detail-list">
              <li className="matricula-detail-row">
                <span className="matricula-detail-row__label">Protocolo</span>
                <span className="matricula-detail-row__value matricula-detail-row__value--mono">
                  {reservation.protocol}
                </span>
              </li>
              <li className="matricula-detail-row">
                <span className="matricula-detail-row__label">Data da reserva</span>
                <span className="matricula-detail-row__value">{reservation.reservedAt}</span>
              </li>
              <li className="matricula-detail-row">
                <span className="matricula-detail-row__label">Disciplinas</span>
                <span className="matricula-detail-row__value">{reservation.subjects}</span>
              </li>
              <li className="matricula-detail-row">
                <span className="matricula-detail-row__label">Créditos</span>
                <span className="matricula-detail-row__value">{reservation.credits}</span>
              </li>
              {status === 'confirmed' && reservation.confirmedAt && (
                <li className="matricula-detail-row">
                  <span className="matricula-detail-row__label">Confirmado em</span>
                  <span className="matricula-detail-row__value">{reservation.confirmedAt}</span>
                </li>
              )}
            </ul>
          </section>
        )}

        <section aria-labelledby="sec-periodo">
          <h2 id="sec-periodo" className="matricula-section-title">Período de reservas</h2>
          <div className="matricula-period-card">
            <div className="matricula-period-card__row">
              <span className="matricula-period-card__label">Início</span>
              <span className="matricula-period-card__value">{period.start}</span>
            </div>
            <div className="matricula-period-card__row">
              <span className="matricula-period-card__label">Encerramento</span>
              <span className="matricula-period-card__value">{period.end}</span>
            </div>
            <div className="matricula-period-card__row">
              <span className="matricula-period-card__label">Créditos disponíveis</span>
              <span className="matricula-period-card__value">
                {credits.mandatory}–{credits.totalMax} créditos
              </span>
            </div>
          </div>
        </section>

        <section aria-labelledby="sec-historico-mat">
          <h2 id="sec-historico-mat" className="matricula-section-title">Histórico</h2>
          <ul className="matricula-history-list">
            {history.map((item) => (
              <li key={item.semester} className="matricula-history-item">
                <div className="matricula-history-item__info">
                  <p className="matricula-history-item__semester">{item.semester}</p>
                  <p className="matricula-history-item__meta">
                    {item.subjects} disciplinas · {item.credits} créditos
                  </p>
                  <p className="matricula-history-item__protocol">{item.protocol}</p>
                </div>
                <span className="matricula-badge matricula-badge--confirmed">
                  {HISTORY_STATUS_LABEL[item.status] ?? item.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

      </main>
    </div>
  );
}

export default MatriculaPage;
