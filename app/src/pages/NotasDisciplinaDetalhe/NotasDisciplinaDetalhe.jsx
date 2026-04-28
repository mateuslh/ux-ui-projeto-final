import DetailHeader from '../../components/DetailHeader/DetailHeader.jsx';
import './NotasDisciplinaDetalhe.css';

function NotasDisciplinaDetalhe({ params, onBack }) {
  if (!params) return null;

  const { subject, teacher, average, situation, attendance, grades } = params;

  const situationVariant =
    situation === 'Aprovado' ? 'ok' :
    situation === 'Em risco' ? 'risk' : 'fail';

  const attendanceVariant = attendance >= 75 ? 'ok' : 'risk';

  return (
    <div className="page">
      <DetailHeader title={subject} onBack={onBack} />

      <main className="page__main" id="conteudo">
        <p className="disc-teacher">{teacher}</p>

        <div className="disc-summary">
          <div className="disc-avg">
            <p className="disc-avg__label">Média parcial</p>
            <span className={`disc-avg__value disc-avg__value--${situationVariant}`}>
              {average.toFixed(1)}
            </span>
            <span className={`disc-situation disc-situation--${situationVariant}`}>
              {situation}
            </span>
          </div>
          <div className="disc-attendance">
            <p className="disc-attendance__label">Frequência</p>
            <span className={`disc-attendance__value disc-attendance__value--${attendanceVariant}`}>
              {attendance}%
            </span>
            <div className="disc-attendance__bar">
              <div
                className={`disc-attendance__fill disc-attendance__fill--${attendanceVariant}`}
                style={{ width: `${attendance}%` }}
              />
              <div className="disc-attendance__min" style={{ left: '75%' }} />
            </div>
            <p className="disc-attendance__hint">Mínimo: 75%</p>
          </div>
        </div>

        <section aria-labelledby="sec-notas">
          <h2 id="sec-notas" className="disc-section-title">Avaliações</h2>
          <ul className="grade-list">
            {grades.map((grade, i) => (
              <li key={i} className={`grade-item ${grade.value === null ? 'grade-item--pending' : ''}`}>
                <p className="grade-item__label">{grade.label}</p>
                <span className="grade-item__value">
                  {grade.value !== null ? grade.value.toFixed(1) : '—'}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default NotasDisciplinaDetalhe;
