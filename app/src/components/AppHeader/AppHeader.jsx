import './AppHeader.css';

function AppHeader({ studentName, summary }) {
  return (
    <header className="app-header" role="banner">
      <div className="app-header__brand">
        <span className="app-header__logo">SATC</span>
        <span className="app-header__tagline">Educação, Tecnologia e Inovação</span>
      </div>
      <div className="app-header__greeting">
        <p className="app-header__hello">Olá, {studentName}</p>
        <p className="app-header__summary">{summary}</p>
      </div>
    </header>
  );
}

export default AppHeader;
