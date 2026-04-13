import './QuickActions.css';

const ACTIONS = [
  { id: 'pay', label: 'Pagar', hint: 'mensalidade', icon: '₩' },
  { id: 'class', label: 'Aula', hint: 'de hoje', icon: '▶' },
  { id: 'grades', label: 'Notas', hint: 'do semestre', icon: '◆' },
  { id: 'tasks', label: 'Atividades', hint: 'pendentes', icon: '✓' }
];

function QuickActions() {
  return (
    <ul className="quick-actions">
      {ACTIONS.map((action) => (
        <li key={action.id}>
          <button type="button" className="quick-actions__item">
            <span className="quick-actions__icon" aria-hidden="true">{action.icon}</span>
            <span className="quick-actions__label">{action.label}</span>
            <span className="quick-actions__hint">{action.hint}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default QuickActions;
