import { useMemo, useState } from 'react';
import DetailHeader from '../../components/DetailHeader/DetailHeader.jsx';
import './ChamadasDiaDetalhe.css';

const STATUS_LABEL = {
  presente: 'Presente',
  falta: 'Falta',
  parcial: 'Parcial',
  futuro: 'Aguardando',
};

const STATUS_CLASS = {
  presente: 'present',
  falta: 'absent',
  parcial: 'partial',
  futuro: 'future',
};

function DayContentList({ classes }) {
  return (
    <ul className="attendance-class-list">
      {classes.map((cls) => (
        <li key={cls.id} className="attendance-class-item">
          <div className="attendance-class-item__head">
            <p className="attendance-class-item__subject">{cls.subject}</p>
            <span className={`attendance-class-item__status attendance-class-item__status--${STATUS_CLASS[cls.status] ?? 'future'}`}>
              {STATUS_LABEL[cls.status] ?? 'Aguardando'}
            </span>
          </div>

          <p className="attendance-class-item__teacher">{cls.teacher}</p>

          <div className="attendance-class-item__meta">
            <span>{cls.time}</span>
            <span>·</span>
            <span>{cls.format === 'online' ? 'Online' : `Sala ${cls.room}`}</span>
            <span>·</span>
            <span>{cls.aulaCount} aula(s)</span>
          </div>

          {cls.content ? (
            <p className="attendance-class-item__content">{cls.content}</p>
          ) : (
            <p className="attendance-class-item__pending">Conteúdo ainda não lançado.</p>
          )}

          {cls.format === 'online' && cls.callLink && (
            <a className="attendance-class-item__link" href={`https://${cls.callLink}`} target="_blank" rel="noreferrer">
              Abrir link da call
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

function AppealForm({ absences, dateKey }) {
  const [selectedIds, setSelectedIds] = useState(() => new Set(absences.map((cls) => cls.id)));
  const [reason, setReason] = useState('Atestado médico');
  const [details, setDetails] = useState('');
  const [hasEvidence, setHasEvidence] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedClasses = absences.filter((cls) => selectedIds.has(cls.id));
  const selectedLessonsCount = selectedClasses.reduce((sum, cls) => sum + cls.aulaCount, 0);

  const protocol = useMemo(
    () => `REC-${dateKey?.replaceAll('-', '')}-${Math.max(1, selectedIds.size)}`,
    [dateKey, selectedIds.size]
  );

  function toggleClass(id) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (selectedIds.size === 0 || !hasEvidence) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="appeal-panel appeal-panel--success">
        <h3 className="appeal-panel__title">Recurso enviado com sucesso</h3>
        <p className="appeal-panel__text">Protocolo: <strong>{protocol}</strong></p>
        <p className="appeal-panel__text">{selectedLessonsCount} aula(s) enviada(s) para análise.</p>
        <p className="appeal-panel__text">Prazo estimado: até 5 dias úteis.</p>
      </section>
    );
  }

  return (
    <section className="appeal-panel">
      <div className="appeal-panel__header">
        <h3 className="appeal-panel__title">Recorrer falta</h3>
        <span className="appeal-panel__counter">{selectedLessonsCount} aula(s)</span>
      </div>
      <p className="appeal-panel__text">
        Selecione as aulas com falta e envie o recurso com comprovante.
      </p>

      <form className="appeal-form" onSubmit={handleSubmit}>
        <fieldset className="appeal-form__fieldset">
          <legend className="appeal-form__legend">1. Aulas para recorrer</legend>
          <ul className="appeal-classes">
            {absences.map((cls) => (
              <li key={cls.id}>
                <label className={`appeal-class-option ${selectedIds.has(cls.id) ? 'appeal-class-option--active' : ''}`}>
                  <input
                    type="checkbox"
                    checked={selectedIds.has(cls.id)}
                    onChange={() => toggleClass(cls.id)}
                  />
                  <span className="appeal-class-option__label">
                    {cls.subject}
                    <small>{cls.time} · {cls.aulaCount} aula(s)</small>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>

        <label className="appeal-form__field">
          <span className="appeal-form__label">2. Motivo do recurso</span>
          <select value={reason} onChange={(e) => setReason(e.target.value)}>
            <option>Atestado médico</option>
            <option>Compromisso institucional</option>
            <option>Conflito acadêmico</option>
            <option>Outro</option>
          </select>
        </label>

        <label className="appeal-form__field">
          <span className="appeal-form__label">3. Descrição complementar</span>
          <textarea
            rows="4"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Descreva o contexto, período do atestado e informações relevantes."
          />
        </label>

        <label className="appeal-form__field">
          <span className="appeal-form__label">4. Anexo do comprovante</span>
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" />
        </label>

        <label className="appeal-form__check">
          <input
            type="checkbox"
            checked={hasEvidence}
            onChange={(e) => setHasEvidence(e.target.checked)}
          />
          <span>Confirmo que anexei atestado/comprovante válido.</span>
        </label>

        <button
          type="submit"
          className="appeal-form__submit"
          disabled={selectedIds.size === 0 || !hasEvidence}
        >
          Enviar recurso para {selectedLessonsCount} aula(s)
        </button>
      </form>
    </section>
  );
}

function ActionsSection({ absences, absentLessons, dateKey }) {
  const [showAppeal, setShowAppeal] = useState(absences.length > 0);

  return (
    <section aria-labelledby="sec-acoes">
      <h3 id="sec-acoes" className="attendance-section-title">Ações acadêmicas</h3>

      <div className="actions-grid">
        <button type="button" className="action-card" onClick={() => setShowAppeal((v) => !v)}>
          <p className="action-card__title">Recorrer falta</p>
          <p className="action-card__text">
            {absences.length > 0
              ? `Você tem ${absences.length} registro(s) de falta, totalizando ${absentLessons} aula(s) faltadas neste dia.`
              : 'Sem faltas registradas neste dia.'}
          </p>
        </button>

        <button type="button" className="action-card action-card--muted">
          <p className="action-card__title">Falar com coordenação</p>
          <p className="action-card__text">Atendimento acadêmico e orientação de frequência.</p>
        </button>

        <button type="button" className="action-card action-card--muted">
          <p className="action-card__title">Baixar resumo do dia</p>
          <p className="action-card__text">Exportar conteúdo e status de presença.</p>
        </button>
      </div>

      {showAppeal && (
        <>
          {absences.length > 0 ? (
            <AppealForm absences={absences} dateKey={dateKey} />
          ) : (
            <section className="appeal-panel">
              <h3 className="appeal-panel__title">Sem faltas para recorrer</h3>
              <p className="appeal-panel__text">
                Neste dia não há registro de falta. Em caso de divergência, contate a coordenação.
              </p>
            </section>
          )}
        </>
      )}
    </section>
  );
}

function ChamadasDiaDetalhe({ params, onBack }) {
  if (!params) return null;

  const dayLabel = params.dayData?.label ?? params.dateKey;
  const classes = params.dayData?.classes ?? [];
  const presentCount = classes.filter((cls) => cls.status === 'presente').length;
  const absentCount = classes.filter((cls) => cls.status === 'falta').length;
  const absences = classes.filter((cls) => cls.status === 'falta');
  const absentLessons = absences.reduce((sum, cls) => sum + cls.aulaCount, 0);

  return (
    <div className="page">
      <DetailHeader title="Detalhe de presença" onBack={onBack} />

      <main className="page__main" id="conteudo">
        <section className="attendance-day-summary" aria-labelledby="sec-dia">
          <h2 id="sec-dia" className="attendance-day-summary__title">{dayLabel}</h2>
          <div className="attendance-day-summary__badges">
            <span className="attendance-day-summary__badge attendance-day-summary__badge--present">
              {presentCount} presença(s)
            </span>
            <span className="attendance-day-summary__badge attendance-day-summary__badge--absent">
              {absentCount} falta(s)
            </span>
            <span className="attendance-day-summary__badge attendance-day-summary__badge--absent-lessons">
              {absentLessons} aula(s) faltadas
            </span>
          </div>
        </section>

        {classes.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__text">Sem aulas registradas neste dia.</p>
          </div>
        ) : (
          <>
            <section aria-labelledby="sec-conteudo">
              <h3 id="sec-conteudo" className="attendance-section-title">Conteúdo do dia</h3>
              <DayContentList classes={classes} />
            </section>

            <ActionsSection absences={absences} absentLessons={absentLessons} dateKey={params.dateKey} />
          </>
        )}
      </main>
    </div>
  );
}

export default ChamadasDiaDetalhe;
