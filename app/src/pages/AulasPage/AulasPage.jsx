import { useState } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader.jsx';
import BottomNav from '../../components/BottomNav/BottomNav.jsx';
import ChamadasTab from './ChamadasTab.jsx';
import { aulasMock } from './aulasMock.js';
import './AulasPage.css';

const DAYS = [
  { id: 'dom', label: 'Dom' },
  { id: 'seg', label: 'Seg' },
  { id: 'ter', label: 'Ter' },
  { id: 'qua', label: 'Qua' },
  { id: 'qui', label: 'Qui' },
  { id: 'sex', label: 'Sex' },
  { id: 'sab', label: 'Sáb' },
];

function ClassCard({ data, onDetails }) {
  const isOnline = data.format === 'online';

  return (
    <article className={`class-card class-card--${data.status} class-card--${data.format}`}>
      <div className="class-card__top">
        <div className="class-card__badges">
          <span className={`class-card__format class-card__format--${data.format}`}>
            {isOnline ? 'Online' : 'Presencial'}
          </span>
          {data.status === 'now' && <span className="class-card__live">Ao vivo</span>}
          {data.status === 'next' && <span className="class-card__next">Próxima</span>}
        </div>
        <span className="class-card__time">{data.startsAt} – {data.endsAt}</span>
      </div>

      <h3 className="class-card__subject">{data.subject}</h3>
      <p className="class-card__teacher">{data.teacher}</p>
      <p className="class-card__location">
        {isOnline ? 'Acesso pelo link da call' : `Sala ${data.room}`}
      </p>

      <div className="class-card__actions">
        {isOnline && data.callLink && data.status !== 'done' && (
          <a className="class-card__action" href={data.callLink} target="_blank" rel="noreferrer">
            Entrar na call
          </a>
        )}
        <button
          type="button"
          className="class-card__action class-card__action--secondary"
          onClick={onDetails}
        >
          Ver detalhes
        </button>
      </div>
    </article>
  );
}

function AulasPage({ onNavigate }) {
  const [activeView, setActiveView] = useState('agenda');
  const [activeDay, setActiveDay] = useState(aulasMock.today);
  const classes = aulasMock.schedule[activeDay] ?? [];

  return (
    <div className="page">
      <PageHeader title="Aulas" />

      <div className="view-tabs" role="tablist" aria-label="Visões da página">
        {[
          { id: 'agenda', label: 'Agenda' },
          { id: 'frequencia', label: 'Frequência' },
        ].map((view) => (
          <button
            key={view.id}
            role="tab"
            type="button"
            className={`view-tab ${activeView === view.id ? 'view-tab--active' : ''}`}
            aria-selected={activeView === view.id}
            onClick={() => setActiveView(view.id)}
          >
            {view.label}
          </button>
        ))}
      </div>

      {activeView === 'agenda' && (
        <div className="day-tabs" role="tablist" aria-label="Dias da semana">
          {DAYS.map((day) => (
            <button
              key={day.id}
              role="tab"
              type="button"
              className={[
                'day-tab',
                activeDay === day.id ? 'day-tab--active' : '',
                aulasMock.today === day.id && activeDay !== day.id ? 'day-tab--today' : '',
              ].join(' ')}
              aria-selected={activeDay === day.id}
              onClick={() => setActiveDay(day.id)}
            >
              {day.label}
            </button>
          ))}
        </div>
      )}

      <main className="page__main" id="conteudo">
        {activeView === 'agenda' && (
          <>
            {classes.length === 0 ? (
              <div className="empty-state">
                <p className="empty-state__text">Sem aulas neste dia.</p>
              </div>
            ) : (
              <ul className="class-list">
                {classes.map((cls) => (
                  <li key={cls.id}>
                    <ClassCard
                      data={cls}
                      onDetails={() => onNavigate('aula-detalhe', cls)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {activeView === 'frequencia' && (
          <ChamadasTab onNavigate={onNavigate} />
        )}
      </main>

      <BottomNav active="aulas" onNavigate={onNavigate} />
    </div>
  );
}

export default AulasPage;
