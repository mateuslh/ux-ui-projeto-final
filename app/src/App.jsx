import { useState } from 'react';
import HomePage from './pages/HomePage/HomePage.jsx';
import AulasPage from './pages/AulasPage/AulasPage.jsx';
import AtividadesPage from './pages/AtividadesPage/AtividadesPage.jsx';
import FinanceiroPage from './pages/FinanceiroPage/FinanceiroPage.jsx';
import AvisosPage from './pages/AvisosPage/AvisosPage.jsx';
import NotasPage from './pages/NotasPage/NotasPage.jsx';
import NotasDisciplinaDetalhe from './pages/NotasDisciplinaDetalhe/NotasDisciplinaDetalhe.jsx';
import AulaDetalhe from './pages/AulaDetalhe/AulaDetalhe.jsx';
import AtividadeDetalhe from './pages/AtividadeDetalhe/AtividadeDetalhe.jsx';
import MatriculaPage from './pages/MatriculaPage/MatriculaPage.jsx';
import MatriculaReservaFlow from './pages/MatriculaReservaFlow/MatriculaReservaFlow.jsx';
import ChamadasDiaDetalhe from './pages/ChamadasDiaDetalhe/ChamadasDiaDetalhe.jsx';

const TOP_LEVEL = new Set(['inicio', 'aulas', 'atividades', 'financeiro', 'avisos']);

function App() {
  const [stack, setStack] = useState([{ id: 'inicio', params: null }]);
  const current = stack[stack.length - 1];

  function navigate(id, params = null) {
    if (TOP_LEVEL.has(id)) {
      setStack([{ id, params }]);
    } else {
      setStack((s) => [...s, { id, params }]);
    }
  }

  function goBack() {
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }

  const props = { onNavigate: navigate, onBack: goBack, params: current.params };

  const screens = {
    inicio: <HomePage {...props} />,
    aulas: <AulasPage {...props} />,
    atividades: <AtividadesPage {...props} />,
    financeiro: <FinanceiroPage {...props} />,
    avisos: <AvisosPage {...props} />,
    notas: <NotasPage {...props} />,
    'notas-disciplina': <NotasDisciplinaDetalhe {...props} />,
    'aula-detalhe': <AulaDetalhe {...props} />,
    'atividade-detalhe': <AtividadeDetalhe {...props} />,
    'matricula':         <MatriculaPage {...props} />,
    'matricula-reserva': <MatriculaReservaFlow {...props} />,
    'chamadas-dia':      <ChamadasDiaDetalhe {...props} />,
  };

  return screens[current.id] ?? screens.inicio;
}

export default App;
