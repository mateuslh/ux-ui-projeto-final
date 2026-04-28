import './PageHeader.css';

function PageHeader({ title }) {
  return (
    <header className="page-header" role="banner">
      <div className="page-header__brand">
        <span className="page-header__logo">SATC</span>
        <span className="page-header__tagline">Educação, Tecnologia e Inovação</span>
      </div>
      <h1 className="page-header__title">{title}</h1>
    </header>
  );
}

export default PageHeader;
