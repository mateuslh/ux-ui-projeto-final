import './BottomNav.css';

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  );
}

function IconClasses() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M8 2v4M16 2v4M3 10h18" />
    </svg>
  );
}

function IconTasks() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 11l2 2 4-4" />
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 17h8" />
    </svg>
  );
}

function IconFinance() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M2.5 10h19" />
      <circle cx="8" cy="14" r="1" />
    </svg>
  );
}

function IconNotices() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
      <path d="M10 20a2 2 0 004 0" />
    </svg>
  );
}

const ITEMS = [
  { id: 'inicio', label: 'Início', icon: <IconHome /> },
  { id: 'aulas', label: 'Aulas', icon: <IconClasses /> },
  { id: 'atividades', label: 'Atividades', icon: <IconTasks /> },
  { id: 'financeiro', label: 'Financeiro', icon: <IconFinance /> },
  { id: 'avisos', label: 'Avisos', icon: <IconNotices /> }
];

function BottomNav({ active = 'inicio', onNavigate }) {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      <ul className="bottom-nav__list">
        {ITEMS.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} className="bottom-nav__item">
              <button
                type="button"
                className={`bottom-nav__button ${isActive ? 'bottom-nav__button--active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onNavigate?.(item.id)}
              >
                <span className="bottom-nav__icon" aria-hidden="true">{item.icon}</span>
                <span className="bottom-nav__label">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default BottomNav;
