// April 2026: April 1 = Wednesday (startOffset = 3)
// Each discipline session = 2 aulas (50 min each)
// Saturday Metodologia = 4 aulas (double session)

export const chamadasMock = {
  month: 4,
  year: 2026,
  today: '2026-04-27',

  stats: {
    total: 62,
    presencas: 52,
    faltas: 10,
    frequency: 83.9,
    minFrequency: 75,
  },

  bySubject: [
    { id: 'engsw',  subject: 'Engenharia de Software',      total: 6,  faltas: 0, presencas: 6,  frequency: 100.0 },
    { id: 'fisica', subject: 'Física Aplicada',             total: 6,  faltas: 0, presencas: 6,  frequency: 100.0 },
    { id: 'met',    subject: 'Metodologia Científica',      total: 16, faltas: 0, presencas: 16, frequency: 100.0 },
    { id: 'bd2',    subject: 'Banco de Dados II',           total: 8,  faltas: 2, presencas: 6,  frequency: 75.0  },
    { id: 'so',     subject: 'Sistemas Operacionais',       total: 8,  faltas: 2, presencas: 6,  frequency: 75.0  },
    { id: 'redes',  subject: 'Redes de Computadores',       total: 8,  faltas: 2, presencas: 6,  frequency: 75.0  },
    { id: 'calc',   subject: 'Cálculo II',                  total: 6,  faltas: 2, presencas: 4,  frequency: 66.7  },
    { id: 'ihc',    subject: 'Interação Humano-Computador', total: 6,  faltas: 2, presencas: 4,  frequency: 66.7  },
  ],

  days: {
    '2026-04-01': {
      label: 'Quarta, 1 de abril',
      classes: [
        { id: 'c1', subjectId: 'bd2', subject: 'Banco de Dados II', teacher: 'Prof. Fernanda Lima', time: '19:00–20:30', format: 'presencial', room: 'Sala 103', status: 'presente', aulaCount: 2, content: 'Normalização — 3FN e BCNF. Dependências funcionais e decomposição de relações com exercícios práticos.' },
      ],
    },
    '2026-04-02': {
      label: 'Quinta, 2 de abril',
      classes: [
        { id: 'c2', subjectId: 'so', subject: 'Sistemas Operacionais', teacher: 'Prof. Marcos Vieira', time: '19:00–20:30', format: 'online', callLink: 'meet.satc.edu.br/so', status: 'presente', aulaCount: 2, content: 'Gerência de Processos — algoritmos de escalonamento Round Robin e Priority Queue com exemplos de SO reais.' },
        { id: 'c3', subjectId: 'redes', subject: 'Redes de Computadores', teacher: 'Prof. Cláudia Nunes', time: '20:45–22:15', format: 'presencial', room: 'Sala 205', status: 'presente', aulaCount: 2, content: 'Camada de Transporte — Protocolo TCP, three-way handshake e controle de fluxo.' },
      ],
    },
    '2026-04-04': {
      label: 'Sábado, 4 de abril',
      classes: [
        { id: 'c4', subjectId: 'met', subject: 'Metodologia Científica', teacher: 'Prof. Patrícia Santos', time: '08:00–11:30', format: 'presencial', room: 'Sala 401', status: 'presente', aulaCount: 4, content: 'Estrutura do artigo científico — normas ABNT. Introdução, revisão bibliográfica e seção de metodologia.' },
      ],
    },
    '2026-04-06': {
      label: 'Segunda, 6 de abril',
      classes: [
        { id: 'c5', subjectId: 'calc', subject: 'Cálculo II', teacher: 'Prof. Ricardo Souza', time: '19:00–20:30', format: 'presencial', room: 'Sala 202', status: 'falta', aulaCount: 2, content: 'Integrais por substituição trigonométrica. Exercícios 3.4 ao 3.7 do livro-texto.' },
        { id: 'c6', subjectId: 'fisica', subject: 'Física Aplicada', teacher: 'Prof. Carla Andrade', time: '20:45–22:15', format: 'presencial', room: 'Sala 110', status: 'presente', aulaCount: 2, content: 'Leis de Newton — aplicações em sistemas de forças compostas e resolução vetorial.' },
      ],
    },
    '2026-04-07': {
      label: 'Terça, 7 de abril',
      classes: [
        { id: 'c7', subjectId: 'engsw', subject: 'Engenharia de Software', teacher: 'Prof. Ana Ribeiro', time: '19:30–21:00', format: 'online', callLink: 'meet.satc.edu.br/engsw', status: 'presente', aulaCount: 2, content: 'Padrões de Projeto — GOF Criacionais: Factory Method e Abstract Factory com implementação em Java.' },
        { id: 'c8', subjectId: 'ihc', subject: 'Interação Humano-Computador', teacher: 'Prof. Bruno Melo', time: '21:10–22:40', format: 'presencial', room: 'Sala 301', status: 'presente', aulaCount: 2, content: 'Avaliação Heurística — aplicação das 10 heurísticas de Nielsen em sistemas reais. Estudo de caso Google Maps.' },
      ],
    },
    '2026-04-08': {
      label: 'Quarta, 8 de abril',
      classes: [
        { id: 'c9', subjectId: 'bd2', subject: 'Banco de Dados II', teacher: 'Prof. Fernanda Lima', time: '19:00–20:30', format: 'presencial', room: 'Sala 103', status: 'presente', aulaCount: 2, content: 'Modelagem física — índices B-tree, particionamento horizontal e otimização de queries com EXPLAIN.' },
      ],
    },
    '2026-04-09': {
      label: 'Quinta, 9 de abril',
      classes: [
        { id: 'c10', subjectId: 'so', subject: 'Sistemas Operacionais', teacher: 'Prof. Marcos Vieira', time: '19:00–20:30', format: 'online', callLink: 'meet.satc.edu.br/so', status: 'presente', aulaCount: 2, content: 'Gerência de Memória — paginação e segmentação. Algoritmos de substituição: LRU, FIFO e Clock.' },
        { id: 'c11', subjectId: 'redes', subject: 'Redes de Computadores', teacher: 'Prof. Cláudia Nunes', time: '20:45–22:15', format: 'presencial', room: 'Sala 205', status: 'falta', aulaCount: 2, content: 'Camada de Rede — Protocolo IP, endereçamento IPv4/IPv6 e roteamento estático.' },
      ],
    },
    '2026-04-11': {
      label: 'Sábado, 11 de abril',
      classes: [
        { id: 'c12', subjectId: 'met', subject: 'Metodologia Científica', teacher: 'Prof. Patrícia Santos', time: '08:00–11:30', format: 'presencial', room: 'Sala 401', status: 'presente', aulaCount: 4, content: 'Revisão bibliográfica — busca em bases de dados acadêmicas: CAPES, Scopus e Web of Science. Uso de Zotero.' },
      ],
    },
    '2026-04-13': {
      label: 'Segunda, 13 de abril',
      classes: [
        { id: 'c13', subjectId: 'calc', subject: 'Cálculo II', teacher: 'Prof. Ricardo Souza', time: '19:00–20:30', format: 'presencial', room: 'Sala 202', status: 'presente', aulaCount: 2, content: 'Integrais duplas — conceitos fundamentais e cálculo de volume de sólidos de revolução.' },
        { id: 'c14', subjectId: 'fisica', subject: 'Física Aplicada', teacher: 'Prof. Carla Andrade', time: '20:45–22:15', format: 'presencial', room: 'Sala 110', status: 'presente', aulaCount: 2, content: 'Trabalho e Energia — teorema trabalho-energia cinética. Resolução de problemas com atrito.' },
      ],
    },
    '2026-04-14': {
      label: 'Terça, 14 de abril',
      classes: [
        { id: 'c15', subjectId: 'engsw', subject: 'Engenharia de Software', teacher: 'Prof. Ana Ribeiro', time: '19:30–21:00', format: 'online', callLink: 'meet.satc.edu.br/engsw', status: 'presente', aulaCount: 2, content: 'Padrões de Projeto — GOF Estruturais: Decorator, Adapter e Composite. Exercício prático em duplas.' },
        { id: 'c16', subjectId: 'ihc', subject: 'Interação Humano-Computador', teacher: 'Prof. Bruno Melo', time: '21:10–22:40', format: 'presencial', room: 'Sala 301', status: 'falta', aulaCount: 2, content: 'Teste de Usabilidade — planejamento, execução com usuários reais e análise de resultados.' },
      ],
    },
    '2026-04-15': {
      label: 'Quarta, 15 de abril',
      classes: [
        { id: 'c17', subjectId: 'bd2', subject: 'Banco de Dados II', teacher: 'Prof. Fernanda Lima', time: '19:00–20:30', format: 'presencial', room: 'Sala 103', status: 'falta', aulaCount: 2, content: 'Transações e controle de concorrência — propriedades ACID, locks exclusivos e problemas de deadlock.' },
      ],
    },
    '2026-04-16': {
      label: 'Quinta, 16 de abril',
      classes: [
        { id: 'c18', subjectId: 'so', subject: 'Sistemas Operacionais', teacher: 'Prof. Marcos Vieira', time: '19:00–20:30', format: 'online', callLink: 'meet.satc.edu.br/so', status: 'presente', aulaCount: 2, content: 'Sistemas de Arquivos — FAT32, NTFS e ext4. Estrutura de diretórios e journaling.' },
        { id: 'c19', subjectId: 'redes', subject: 'Redes de Computadores', teacher: 'Prof. Cláudia Nunes', time: '20:45–22:15', format: 'presencial', room: 'Sala 205', status: 'presente', aulaCount: 2, content: 'Roteamento dinâmico — protocolos OSPF e BGP. Configuração básica em simulador Cisco Packet Tracer.' },
      ],
    },
    '2026-04-18': {
      label: 'Sábado, 18 de abril',
      classes: [
        { id: 'c20', subjectId: 'met', subject: 'Metodologia Científica', teacher: 'Prof. Patrícia Santos', time: '08:00–11:30', format: 'presencial', room: 'Sala 401', status: 'presente', aulaCount: 4, content: 'Metodologia de pesquisa — pesquisa quantitativa vs qualitativa. Elaboração de hipóteses e definição de variáveis.' },
      ],
    },
    '2026-04-20': {
      label: 'Segunda, 20 de abril',
      classes: [
        { id: 'c21', subjectId: 'calc', subject: 'Cálculo II', teacher: 'Prof. Ricardo Souza', time: '19:00–20:30', format: 'presencial', room: 'Sala 202', status: 'presente', aulaCount: 2, content: 'Integrais triplas — coordenadas cilíndricas e esféricas. Aplicações em cálculo de massa e centro de gravidade.' },
        { id: 'c22', subjectId: 'fisica', subject: 'Física Aplicada', teacher: 'Prof. Carla Andrade', time: '20:45–22:15', format: 'presencial', room: 'Sala 110', status: 'presente', aulaCount: 2, content: 'Conservação de Energia — energia potencial gravitacional, cinética e mecânica total. Problemas com mola.' },
      ],
    },
    '2026-04-21': {
      label: 'Terça, 21 de abril',
      classes: [
        { id: 'c23', subjectId: 'engsw', subject: 'Engenharia de Software', teacher: 'Prof. Ana Ribeiro', time: '19:30–21:00', format: 'online', callLink: 'meet.satc.edu.br/engsw', status: 'presente', aulaCount: 2, content: 'Refatoração — identificação de code smells e aplicação de refactoring patterns segundo Martin Fowler.' },
        { id: 'c24', subjectId: 'ihc', subject: 'Interação Humano-Computador', teacher: 'Prof. Bruno Melo', time: '21:10–22:40', format: 'presencial', room: 'Sala 301', status: 'presente', aulaCount: 2, content: 'Prototipação — baixa e alta fidelidade. Ferramentas: papel, Balsamiq e Figma. Avaliação entre equipes.' },
      ],
    },
    '2026-04-22': {
      label: 'Quarta, 22 de abril',
      classes: [
        { id: 'c25', subjectId: 'bd2', subject: 'Banco de Dados II', teacher: 'Prof. Fernanda Lima', time: '19:00–20:30', format: 'presencial', room: 'Sala 103', status: 'presente', aulaCount: 2, content: 'Stored Procedures e Triggers — criação, uso de cursores e casos práticos de automação de negócio.' },
      ],
    },
    '2026-04-23': {
      label: 'Quinta, 23 de abril',
      classes: [
        { id: 'c26', subjectId: 'so', subject: 'Sistemas Operacionais', teacher: 'Prof. Marcos Vieira', time: '19:00–20:30', format: 'online', callLink: 'meet.satc.edu.br/so', status: 'falta', aulaCount: 2, content: 'Segurança em SO — controle de acesso, autenticação multifator e criptografia de disco com BitLocker/LUKS.' },
        { id: 'c27', subjectId: 'redes', subject: 'Redes de Computadores', teacher: 'Prof. Cláudia Nunes', time: '20:45–22:15', format: 'presencial', room: 'Sala 205', status: 'presente', aulaCount: 2, content: 'Segurança em Redes — firewalls stateful, VPNs e sistemas IDS/IPS. Demonstração com Wireshark.' },
      ],
    },
    '2026-04-25': {
      label: 'Sábado, 25 de abril',
      classes: [
        { id: 'c28', subjectId: 'met', subject: 'Metodologia Científica', teacher: 'Prof. Patrícia Santos', time: '08:00–11:30', format: 'presencial', room: 'Sala 401', status: 'presente', aulaCount: 4, content: 'Análise e interpretação de dados — tabelas, gráficos e interpretação estatística com SPSS e Excel.' },
      ],
    },
    '2026-04-27': {
      label: 'Segunda, 27 de abril',
      classes: [
        { id: 'c29', subjectId: 'calc', subject: 'Cálculo II', teacher: 'Prof. Ricardo Souza', time: '19:00–20:30', format: 'presencial', room: 'Sala 202', status: 'futuro', aulaCount: 2, content: null },
        { id: 'c30', subjectId: 'fisica', subject: 'Física Aplicada', teacher: 'Prof. Carla Andrade', time: '20:45–22:15', format: 'presencial', room: 'Sala 110', status: 'futuro', aulaCount: 2, content: null },
      ],
    },
    '2026-04-28': {
      label: 'Terça, 28 de abril',
      classes: [
        { id: 'c31', subjectId: 'engsw', subject: 'Engenharia de Software', teacher: 'Prof. Ana Ribeiro', time: '19:30–21:00', format: 'online', status: 'futuro', aulaCount: 2, content: null },
        { id: 'c32', subjectId: 'ihc', subject: 'Interação Humano-Computador', teacher: 'Prof. Bruno Melo', time: '21:10–22:40', format: 'presencial', room: 'Sala 301', status: 'futuro', aulaCount: 2, content: null },
      ],
    },
    '2026-04-29': {
      label: 'Quarta, 29 de abril',
      classes: [
        { id: 'c33', subjectId: 'bd2', subject: 'Banco de Dados II', teacher: 'Prof. Fernanda Lima', time: '19:00–20:30', format: 'presencial', room: 'Sala 103', status: 'futuro', aulaCount: 2, content: null },
      ],
    },
    '2026-04-30': {
      label: 'Quinta, 30 de abril',
      classes: [
        { id: 'c34', subjectId: 'so', subject: 'Sistemas Operacionais', teacher: 'Prof. Marcos Vieira', time: '19:00–20:30', format: 'online', status: 'futuro', aulaCount: 2, content: null },
        { id: 'c35', subjectId: 'redes', subject: 'Redes de Computadores', teacher: 'Prof. Cláudia Nunes', time: '20:45–22:15', format: 'presencial', room: 'Sala 205', status: 'futuro', aulaCount: 2, content: null },
      ],
    },
  },
};

export function getDayStatus(dateKey, today, dayData) {
  if (!dayData) return 'none';
  if (dateKey > today) return 'futuro';
  if (dateKey === today) return 'hoje';
  const statuses = dayData.classes.map((c) => c.status);
  const hasFalta = statuses.includes('falta');
  const hasPresente = statuses.includes('presente');
  if (hasFalta && hasPresente) return 'parcial';
  if (hasFalta) return 'falta';
  return 'presente';
}
