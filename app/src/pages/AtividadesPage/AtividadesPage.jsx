import { useState } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader.jsx';
import BottomNav from '../../components/BottomNav/BottomNav.jsx';
import { atividadesMock } from './atividadesMock.js';
import './AtividadesPage.css';

const TABS = [
  { id: 'pending', label: 'Pendentes' },
  { id: 'delivered', label: 'Entregues' },
];

function PendingItem({ data, onSelect }) {
  return (
    <li>
      <button
        type="button"
        className={`activity-item activity-item--${data.dueUrgency}`}
        onClick={() => onSelect?.(data)}
      >
        <div className="activity-item__indicator" aria-hidden="true" />
        <div className="activity-item__body">
          <p className="activity-item__title">{data.title}</p>
          <p className="activity-item__subject">{data.subject}</p>
        </div>
        <div className="activity-item__right-group">
          <span className={`activity-item__due activity-item__due--${data.dueUrgency}`}>
            {data.dueLabel}
          </span>
          <svg className="activity-item__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </button>
    </li>
  );
}

function DeliveredItem({ data, onSelect }) {
  const isGraded = data.status === 'graded';

  return (
    <li>
      <button
        type="button"
        className={`delivered-item delivered-item--${data.status}`}
        onClick={() => onSelect?.(data)}
      >
        <div className={`delivered-item__icon delivered-item__icon--${data.status}`} aria-hidden="true">
          {isGraded ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          )}
        </div>

        <div className="delivered-item__body">
          <p className="delivered-item__title">{data.title}</p>
          <p className="delivered-item__subject">{data.subject}</p>
          <div className="delivered-item__meta">
            <span className="delivered-item__date">{data.deliveredLabel}</span>
            {data.attachmentName && (
              <span className="delivered-item__file">{data.attachmentName}</span>
            )}
          </div>
        </div>

        <div className="delivered-item__right">
          {isGraded ? (
            <span className="delivered-item__grade">{data.grade}</span>
          ) : (
            <span className="delivered-item__awaiting">Aguardando</span>
          )}
          <svg className="delivered-item__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </button>
    </li>
  );
}

function AtividadesPage({ onNavigate, onBack }) {
  const [activeTab, setActiveTab] = useState('pending');
  const pendingCount = atividadesMock.pending.length;

  return (
    <div className="page">
      <PageHeader title="Atividades" />

      <div className="seg-tabs" role="tablist" aria-label="Filtro de atividades">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            className={`seg-tab ${activeTab === tab.id ? 'seg-tab--active' : ''}`}
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.id === 'pending' && pendingCount > 0 && (
              <span className="seg-tab__badge">{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      <main className="page__main" id="conteudo">
        {activeTab === 'pending' && (
          <ul className="activity-list">
            {atividadesMock.pending.map((item) => (
              <PendingItem
                key={item.id}
                data={item}
                onSelect={(item) => onNavigate('atividade-detalhe', item)}
              />
            ))}
          </ul>
        )}

        {activeTab === 'delivered' && (
          <ul className="activity-list">
            {atividadesMock.delivered.map((item) => (
              <DeliveredItem
                key={item.id}
                data={item}
                onSelect={(item) => onNavigate('atividade-detalhe', item)}
              />
            ))}
          </ul>
        )}
      </main>

      <BottomNav active="atividades" onNavigate={onNavigate} />
    </div>
  );
}

export default AtividadesPage;
