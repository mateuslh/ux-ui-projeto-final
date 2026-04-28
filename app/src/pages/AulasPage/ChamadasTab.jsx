import { getDayStatus, chamadasMock } from './chamadasMock.js';
import './ChamadasTab.css';

const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function pad(n) {
  return String(n).padStart(2, '0');
}

function ChamadasTab({ onNavigate }) {
  const { month, year, today, stats, bySubject, days } = chamadasMock;

  const daysInMonth = new Date(year, month, 0).getDate();
  const startOffset = new Date(year, month - 1, 1).getDay();

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const { total, presencas, faltas, frequency, minFrequency } = stats;
  const isAlert = frequency < minFrequency;
  const trackedDays = Object.entries(days).filter(([date]) => date <= today);
  const daysWithAbsence = trackedDays.filter(([, day]) =>
    day.classes.some((cls) => cls.status === 'falta')
  ).length;
  const absencesByFourClassesRule = daysWithAbsence * 4;

  return (
    <div className="chamadas-tab">
      <div className={`chamadas-stats${isAlert ? ' chamadas-stats--alert' : ''}`}>
        <div className="chamadas-stats__row">
          <div className="chamadas-stats__item">
            <span className="chamadas-stats__value">{total}</span>
            <span className="chamadas-stats__label">Total</span>
          </div>
          <div className="chamadas-stats__item">
            <span className="chamadas-stats__value chamadas-stats__value--present">{presencas}</span>
            <span className="chamadas-stats__label">Presenças</span>
          </div>
          <div className="chamadas-stats__item">
            <span className={`chamadas-stats__value${isAlert ? ' chamadas-stats__value--danger' : ' chamadas-stats__value--warn'}`}>{faltas}</span>
            <span className="chamadas-stats__label">Faltas</span>
          </div>
          <div className="chamadas-stats__item">
            <span className={`chamadas-stats__value${isAlert ? ' chamadas-stats__value--danger' : ''}`}>{frequency}%</span>
            <span className="chamadas-stats__label">Frequência</span>
          </div>
        </div>
        <div className="chamadas-stats__bar-wrap">
          <div className="chamadas-stats__bar-track">
            <div
              className={`chamadas-stats__bar-fill${isAlert ? ' chamadas-stats__bar-fill--danger' : ''}`}
              style={{ width: `${Math.min(frequency, 100)}%` }}
            />
            <div className="chamadas-stats__bar-min" style={{ left: `${minFrequency}%` }} />
          </div>
          <span className="chamadas-stats__bar-label">Mín. {minFrequency}%</span>
        </div>
        {isAlert && (
          <p className="chamadas-stats__alert">Frequência abaixo do mínimo exigido!</p>
        )}
      </div>

      <section className="chamadas-quick-summary" aria-labelledby="sec-resumo-faltas">
        <h3 id="sec-resumo-faltas" className="chamadas-quick-summary__title t1">
          Resumo de presença
        </h3>
        <div className="chamadas-quick-summary__grid">
          <article className="chamadas-quick-summary__card">
            <p className="chamadas-quick-summary__value chamadas-quick-summary__value--present">
              {presencas}
            </p>
            <p className="chamadas-quick-summary__label">Aulas que você foi</p>
          </article>
          <article className="chamadas-quick-summary__card">
            <p className="chamadas-quick-summary__value chamadas-quick-summary__value--absent">
              {faltas}
            </p>
            <p className="chamadas-quick-summary__label">Aulas que você faltou</p>
          </article>
          <article className="chamadas-quick-summary__card">
            <p className="chamadas-quick-summary__value chamadas-quick-summary__value--warning">
              {absencesByFourClassesRule}
            </p>
            <p className="chamadas-quick-summary__label">Faltas (regra 4 aulas/dia)</p>
          </article>
        </div>
        <p className="chamadas-quick-summary__hint">
          Dias com registro de falta: {daysWithAbsence} dia(s).
        </p>
      </section>

      <div className="chamadas-cal">
        <p className="chamadas-cal__month">Abril 2026</p>
        <div className="chamadas-cal__week">
          {WEEK_DAYS.map((d) => (
            <span key={d} className="chamadas-cal__wday">{d}</span>
          ))}
        </div>
        <div className="chamadas-cal__grid">
          {cells.map((day, i) => {
            if (day === null) {
              return <div key={`empty-${i}`} className="chamadas-cal__cell chamadas-cal__cell--empty" />;
            }
            const dateKey = `${year}-${pad(month)}-${pad(day)}`;
            const dayData = days[dateKey];
            const status = getDayStatus(dateKey, today, dayData);
            const isClickable = status !== 'none' && status !== 'futuro';

            return (
              <button
                key={dateKey}
                type="button"
                disabled={!isClickable}
                className={[
                  'chamadas-cal__cell',
                  `chamadas-cal__cell--${status}`,
                ].join(' ')}
                onClick={() => isClickable && onNavigate('chamadas-dia', { dateKey, dayData, status })}
              >
                <span className="chamadas-cal__day-num">{day}</span>
                {isClickable && <span className="chamadas-cal__dot" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="chamadas-legend">
        <span className="chamadas-legend__item chamadas-legend__item--presente">Presente</span>
        <span className="chamadas-legend__item chamadas-legend__item--parcial">Parcial</span>
        <span className="chamadas-legend__item chamadas-legend__item--falta">Falta</span>
        <span className="chamadas-legend__item chamadas-legend__item--hoje">Hoje</span>
      </div>

      <div className="chamadas-subjects">
        <h3 className="chamadas-subjects__title t1">Por disciplina</h3>
        <ul className="chamadas-subjects__list">
          {bySubject.map((s) => {
            const isCritical = s.frequency < minFrequency;
            const isWarn = s.frequency === minFrequency;
            const missedLessons = s.faltas;
            const missedFullDays = missedLessons / 4;
            return (
              <li key={s.id} className="chamadas-subject">
                <div className="chamadas-subject__header">
                  <p className="chamadas-subject__name">{s.subject}</p>
                  <span className={[
                    'chamadas-subject__pct',
                    isCritical ? 'chamadas-subject__pct--danger' : '',
                    isWarn ? 'chamadas-subject__pct--warn' : '',
                  ].join(' ')}>
                    {s.frequency.toFixed(1)}%
                  </span>
                </div>
                <div className="chamadas-subject__track">
                  <div
                    className={`chamadas-subject__fill${isCritical ? ' chamadas-subject__fill--danger' : ''}`}
                    style={{ width: `${s.frequency}%` }}
                  />
                  <div className="chamadas-subject__min-mark" style={{ left: `${minFrequency}%` }} />
                </div>
                <p className="chamadas-subject__meta">
                  {s.presencas}/{s.total} aulas
                  {isCritical && ' · Abaixo do mínimo'}
                  {isWarn && ' · No limite'}
                </p>
                <div className="chamadas-subject__absence-breakdown">
                  <p className="chamadas-subject__absence-item">
                    <span className="chamadas-subject__absence-label">Aulas faltadas</span>
                    <strong className="chamadas-subject__absence-value">{missedLessons}</strong>
                  </p>
                  <p className="chamadas-subject__absence-item">
                    <span className="chamadas-subject__absence-label">Dias inteiros faltados</span>
                    <strong className="chamadas-subject__absence-value">{missedFullDays.toFixed(2)}</strong>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ChamadasTab;
