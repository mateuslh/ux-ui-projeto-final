import './BottomNav.css';

const ITEMS = [
  { id: 'inicio', label: 'Início', icon: '⌂' },
  { id: 'aulas', label: 'Aulas', icon: '▤' },
  { id: 'atividades', label: 'Atividades', icon: '✓' },
  { id: 'financeiro', label: 'Financeiro', icon: '₩' },
  { id: 'avisos', label: 'Avisos', icon: '◉' }
];

function BottomNav({ active = 'inicio' }) {
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
