import { useState } from 'react';
import DetailHeader from '../../components/DetailHeader/DetailHeader.jsx';
import { matriculaMock } from '../MatriculaPage/matriculaMock.js';
import './MatriculaReservaFlow.css';

const STEP_LABELS = ['Seleção', 'Revisão', 'Confirmação'];

/* ── Indicador de progresso ─────────────────────────────────── */
function StepIndicator({ current }) {
  return (
    <div className="step-indicator" aria-label={`Etapa ${current + 1} de ${STEP_LABELS.length}`}>
      {STEP_LABELS.map((label, i) => (
        <div key={i} className="step-indicator__item">
          <div className={`step-dot ${i < current ? 'step-dot--done' : ''} ${i === current ? 'step-dot--active' : ''}`}>
            {i < current ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <span>{i + 1}</span>
            )}
          </div>
          {i < STEP_LABELS.length - 1 && (
            <div className={`step-line ${i < current ? 'step-line--done' : ''}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Step 0 — Seleção de disciplinas ────────────────────────── */
function StepSelecao({ selectedElective, onToggleElective, electiveCredits, maxElective, onNext }) {
  const { availableSubjects, credits } = matriculaMock;
  const totalCredits = credits.mandatory + electiveCredits;
  const canContinue = totalCredits >= credits.mandatory;

  return (
    <div className="flow-step">
      <h2 className="flow-step__title">Selecione as disciplinas</h2>
      <p className="flow-step__subtitle">
        Obrigatórias já confirmadas. Escolha até {maxElective} créditos em optativas.
      </p>

      <section className="subject-group" aria-labelledby="group-mandatory">
        <h3 id="group-mandatory" className="subject-group__title">
          Obrigatórias
          <span className="subject-group__credits">{credits.mandatory} cr</span>
        </h3>
        <ul className="subject-list-flow">
          {availableSubjects.mandatory.map((sub) => (
            <li key={sub.id} className="subject-row subject-row--locked">
              <div className="subject-row__check subject-row__check--locked" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
              <div className="subject-row__info">
                <p className="subject-row__code">{sub.code}</p>
                <p className="subject-row__name">{sub.name}</p>
                <p className="subject-row__meta">{sub.period} · {sub.credits} créditos</p>
              </div>
              <span className="subject-row__credits">{sub.credits}cr</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="subject-group" aria-labelledby="group-elective">
        <h3 id="group-elective" className="subject-group__title">
          Optativas
          <span className="subject-group__credits">até {maxElective} cr</span>
        </h3>
        <ul className="subject-list-flow">
          {availableSubjects.elective.map((sub) => {
            const isSelected = selectedElective.has(sub.id);
            const wouldExceed = !isSelected && electiveCredits + sub.credits > maxElective;
            return (
              <li key={sub.id}>
                <button
                  type="button"
                  className={`subject-row subject-row--selectable ${isSelected ? 'subject-row--selected' : ''} ${wouldExceed ? 'subject-row--disabled' : ''}`}
                  onClick={() => !wouldExceed && onToggleElective(sub)}
                  aria-pressed={isSelected}
                  disabled={wouldExceed && !isSelected}
                >
                  <div className={`subject-row__check ${isSelected ? 'subject-row__check--on' : ''}`} aria-hidden="true">
                    {isSelected && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <div className="subject-row__info">
                    <p className="subject-row__code">{sub.code}</p>
                    <p className="subject-row__name">{sub.name}</p>
                    <p className="subject-row__meta">{sub.period} · {sub.credits} créditos</p>
                  </div>
                  <span className="subject-row__credits">{sub.credits}cr</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="flow-credits-bar">
        <div className="flow-credits-bar__info">
          <span className="flow-credits-bar__label">Total de créditos</span>
          <span className="flow-credits-bar__value">
            {totalCredits} / {credits.totalMax}
          </span>
        </div>
        <div className="flow-credits-bar__track">
          <div
            className="flow-credits-bar__fill"
            style={{ width: `${(totalCredits / credits.totalMax) * 100}%` }}
          />
        </div>
      </div>

      <button
        type="button"
        className="flow-btn flow-btn--primary"
        onClick={onNext}
        disabled={!canContinue}
      >
        Continuar
      </button>
    </div>
  );
}

/* ── Step 1 — Revisão ───────────────────────────────────────── */
function StepRevisao({ selectedElective, electiveCredits, onNext, onBack }) {
  const { availableSubjects, credits, currentSemester } = matriculaMock;
  const selectedElectiveList = availableSubjects.elective.filter((s) => selectedElective.has(s.id));
  const totalSubjects = availableSubjects.mandatory.length + selectedElectiveList.length;
  const totalCredits = credits.mandatory + electiveCredits;

  return (
    <div className="flow-step">
      <h2 className="flow-step__title">Revise sua reserva</h2>
      <p className="flow-step__subtitle">Confira as disciplinas antes de confirmar.</p>

      <div className="review-summary">
        <div className="review-summary__item">
          <p className="review-summary__number">{totalSubjects}</p>
          <p className="review-summary__label">Disciplinas</p>
        </div>
        <div className="review-summary__divider" />
        <div className="review-summary__item">
          <p className="review-summary__number">{totalCredits}</p>
          <p className="review-summary__label">Créditos</p>
        </div>
        <div className="review-summary__divider" />
        <div className="review-summary__item">
          <p className="review-summary__number">{currentSemester}</p>
          <p className="review-summary__label">Semestre</p>
        </div>
      </div>

      <section aria-labelledby="rev-mandatory">
        <h3 id="rev-mandatory" className="review-group-title">Obrigatórias</h3>
        <ul className="review-subject-list">
          {availableSubjects.mandatory.map((sub) => (
            <li key={sub.id} className="review-subject-item">
              <div className="review-subject-item__dot" aria-hidden="true" />
              <div className="review-subject-item__info">
                <p className="review-subject-item__name">{sub.name}</p>
                <p className="review-subject-item__meta">{sub.code} · {sub.credits} cr</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {selectedElectiveList.length > 0 && (
        <section aria-labelledby="rev-elective">
          <h3 id="rev-elective" className="review-group-title">Optativas</h3>
          <ul className="review-subject-list">
            {selectedElectiveList.map((sub) => (
              <li key={sub.id} className="review-subject-item review-subject-item--elective">
                <div className="review-subject-item__dot review-subject-item__dot--elective" aria-hidden="true" />
                <div className="review-subject-item__info">
                  <p className="review-subject-item__name">{sub.name}</p>
                  <p className="review-subject-item__meta">{sub.code} · {sub.credits} cr</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {selectedElectiveList.length === 0 && (
        <p className="review-no-elective">Nenhuma optativa selecionada.</p>
      )}

      <div className="flow-actions">
        <button type="button" className="flow-btn flow-btn--primary" onClick={onNext}>
          Confirmar reserva
        </button>
        <button type="button" className="flow-btn flow-btn--ghost" onClick={onBack}>
          Voltar e editar
        </button>
      </div>
    </div>
  );
}

/* ── Step 2 — Confirmação ───────────────────────────────────── */
function StepConfirmacao({ totalSubjects, totalCredits, onGoHome }) {
  const protocol = 'SATC-2026-7834';

  return (
    <div className="flow-step flow-step--success">
      <div className="success-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>

      <h2 className="success-title">Reserva realizada!</h2>
      <p className="success-sub">Sua reserva para o semestre {matriculaMock.currentSemester} foi registrada com sucesso.</p>

      <div className="success-protocol">
        <p className="success-protocol__label">Protocolo</p>
        <p className="success-protocol__code">{protocol}</p>
      </div>

      <ul className="success-details">
        <li className="success-detail-item">
          <span className="success-detail-item__label">Disciplinas</span>
          <span className="success-detail-item__value">{totalSubjects}</span>
        </li>
        <li className="success-detail-item">
          <span className="success-detail-item__label">Créditos</span>
          <span className="success-detail-item__value">{totalCredits}</span>
        </li>
        <li className="success-detail-item">
          <span className="success-detail-item__label">Confirmação</span>
          <span className="success-detail-item__value">Em até 5 dias úteis</span>
        </li>
      </ul>

      <p className="success-email">
        Uma confirmação será enviada para o seu e-mail cadastrado.
      </p>

      <button type="button" className="flow-btn flow-btn--primary" onClick={onGoHome}>
        Voltar ao início
      </button>
    </div>
  );
}

/* ── Página principal do fluxo ──────────────────────────────── */
function MatriculaReservaFlow({ onNavigate, onBack }) {
  const [step, setStep] = useState(0);
  const [selectedElective, setSelectedElective] = useState(new Set());

  const electiveCredits = matriculaMock.availableSubjects.elective
    .filter((s) => selectedElective.has(s.id))
    .reduce((sum, s) => sum + s.credits, 0);

  const totalSubjects = matriculaMock.availableSubjects.mandatory.length
    + selectedElective.size;
  const totalCredits = matriculaMock.credits.mandatory + electiveCredits;

  function toggleElective(sub) {
    setSelectedElective((prev) => {
      const next = new Set(prev);
      if (next.has(sub.id)) next.delete(sub.id);
      else next.add(sub.id);
      return next;
    });
  }

  const isSuccess = step === 2;

  return (
    <div className="page">
      {!isSuccess && (
        <DetailHeader
          title="Reserva de Matrícula"
          onBack={step === 0 ? onBack : () => setStep((s) => s - 1)}
        />
      )}

      {!isSuccess && (
        <div className="flow-step-indicator-wrap">
          <StepIndicator current={step} />
        </div>
      )}

      <main className="page__main" id="conteudo">
        {step === 0 && (
          <StepSelecao
            selectedElective={selectedElective}
            onToggleElective={toggleElective}
            electiveCredits={electiveCredits}
            maxElective={matriculaMock.credits.electiveMax}
            onNext={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <StepRevisao
            selectedElective={selectedElective}
            electiveCredits={electiveCredits}
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
          />
        )}
        {step === 2 && (
          <StepConfirmacao
            totalSubjects={totalSubjects}
            totalCredits={totalCredits}
            onGoHome={() => onNavigate('inicio')}
          />
        )}
      </main>
    </div>
  );
}

export default MatriculaReservaFlow;
