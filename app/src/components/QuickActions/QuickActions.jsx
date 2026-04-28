import './QuickActions.css';

function IconPay() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function IconClass() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconGrades() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}

function IconTasks() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    </svg>
  );
}

const ACTIONS = [
  { id: 'pay',   label: 'Pagar',      hint: 'Mensalidade', icon: <IconPay />,    page: 'financeiro' },
  { id: 'class', label: 'Aulas',      hint: 'Do dia',      icon: <IconClass />,  page: 'aulas'      },
  { id: 'grades',label: 'Notas',      hint: 'Semestre',    icon: <IconGrades />, page: 'notas'      },
  { id: 'tasks', label: 'Atividades', hint: 'Pendentes',   icon: <IconTasks />,  page: 'atividades' },
];

function QuickActions({ onNavigate }) {
  return (
    <ul className="quick-actions">
      {ACTIONS.map((action) => (
        <li key={action.id}>
          <button
            type="button"
            className="quick-actions__item"
            onClick={() => onNavigate?.(action.page)}
          >
            <span className="quick-actions__icon">{action.icon}</span>
            <span className="quick-actions__label">{action.label}</span>
            <span className="quick-actions__hint">{action.hint}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default QuickActions;
