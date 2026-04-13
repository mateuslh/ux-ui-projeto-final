import AppHeader from '../../components/AppHeader/AppHeader.jsx';
import QuickActions from '../../components/QuickActions/QuickActions.jsx';
import NextClassCard from '../../components/NextClassCard/NextClassCard.jsx';
import PendingActivities from '../../components/PendingActivities/PendingActivities.jsx';
import FinancialSummary from '../../components/FinancialSummary/FinancialSummary.jsx';
import NoticesPanel from '../../components/NoticesPanel/NoticesPanel.jsx';
import BottomNav from '../../components/BottomNav/BottomNav.jsx';
import { homeMock } from './homeMock.js';
import './HomePage.css';

function HomePage() {
  const { student, nextClass, activities, bill, notices } = homeMock;

  return (
    <div className="home">
      <AppHeader studentName={student.firstName} summary={student.summary} />

      <main className="home__main" id="conteudo">
        <section className="home__section" aria-label="Ações rápidas">
          <QuickActions />
        </section>

        <section className="home__section" aria-labelledby="sec-aula">
          <header className="home__section-header">
            <h2 id="sec-aula" className="t1">Próxima aula</h2>
          </header>
          <NextClassCard data={nextClass} />
        </section>

        <section className="home__section" aria-labelledby="sec-atividades">
          <header className="home__section-header">
            <h2 id="sec-atividades" className="t1">Atividades pendentes</h2>
            <button type="button" className="home__section-link">Ver todas</button>
          </header>
          <PendingActivities items={activities} />
        </section>

        <section className="home__section" aria-labelledby="sec-financeiro">
          <header className="home__section-header">
            <h2 id="sec-financeiro" className="t1">Financeiro</h2>
          </header>
          <FinancialSummary bill={bill} />
        </section>

        <section className="home__section" aria-labelledby="sec-avisos">
          <header className="home__section-header">
            <h2 id="sec-avisos" className="t1">Avisos</h2>
            <button type="button" className="home__section-link">Ver painel</button>
          </header>
          <NoticesPanel items={notices} />
        </section>
      </main>

      <BottomNav active="inicio" />
    </div>
  );
}

export default HomePage;
