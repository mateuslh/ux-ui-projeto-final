export const matriculaMock = {
  currentSemester: '2026/2',
  period: {
    start: '27/04/2026',
    end: '15/05/2026',
    daysLeft: 18,
  },

  // Altere para testar os outros estados: 'reserved' | 'confirmed' | 'closed'
  status: 'open',

  reservation: {
    protocol: 'SATC-2026-7834',
    reservedAt: '28/04/2026',
    confirmedAt: null,
    subjects: 5,
    credits: 18,
  },

  availableSubjects: {
    mandatory: [
      { id: 'm1', code: 'ENG501', name: 'Gerência de Projetos de TI', credits: 4, period: 'Noturno' },
      { id: 'm2', code: 'ENG502', name: 'Computação em Nuvem',        credits: 4, period: 'Noturno' },
      { id: 'm3', code: 'ENG503', name: 'Inteligência Artificial',     credits: 4, period: 'Noturno' },
      { id: 'm4', code: 'ENG504', name: 'Ética e Legislação em TI',   credits: 2, period: 'Noturno' },
    ],
    elective: [
      { id: 'e1', code: 'OPT201', name: 'Desenvolvimento Mobile',    credits: 4, period: 'Noturno' },
      { id: 'e2', code: 'OPT202', name: 'Segurança da Informação',   credits: 4, period: 'Noturno' },
      { id: 'e3', code: 'OPT203', name: 'UX Design Avançado',        credits: 2, period: 'Noturno' },
      { id: 'e4', code: 'OPT204', name: 'Ciência de Dados',          credits: 4, period: 'Noturno' },
    ],
  },

  credits: {
    mandatory: 14,
    electiveMax: 4,
    totalMax: 18,
  },

  history: [
    { semester: '2026/1', status: 'confirmed', subjects: 6, credits: 16, protocol: 'SATC-2026-1102' },
    { semester: '2025/2', status: 'confirmed', subjects: 6, credits: 16, protocol: 'SATC-2025-8841' },
    { semester: '2025/1', status: 'confirmed', subjects: 5, credits: 14, protocol: 'SATC-2025-3312' },
  ],
};
