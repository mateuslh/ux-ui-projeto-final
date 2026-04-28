import DetailHeader from '../../components/DetailHeader/DetailHeader.jsx';
import { notasMock } from './notasMock.js';
import './NotasPage.css';

const SITUATION_VARIANT = {
  'Aprovado': 'ok',
  'Em risco': 'risk',
  'Reprovado': 'fail',
};

function NotasPage({ onNavigate, onBack }) {
  return (
    <div className="page">
      <DetailHeader title="Notas do semestre" onBack={onBack} />

      <main className="page__main" id="conteudo">
        <ul className="subject-list">
          {notasMock.map((subject) => {
            const variant = SITUATION_VARIANT[subject.situation] ?? 'ok';
            return (
              <li key={subject.id}>
                <button
                  type="button"
                  className="subject-item"
                  onClick={() => onNavigate('notas-disciplina', subject)}
                >
                  <div className="subject-item__info">
                    <p className="subject-item__name">{subject.subject}</p>
                    <p className="subject-item__teacher">{subject.teacher}</p>
                    <span className={`subject-item__situation subject-item__situation--${variant}`}>
                      {subject.situation}
                    </span>
                  </div>
                  <div className="subject-item__right">
                    <span className={`subject-item__average subject-item__average--${variant}`}>
                      {subject.average.toFixed(1)}
                    </span>
                    <svg className="subject-item__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default NotasPage;
