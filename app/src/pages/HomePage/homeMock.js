export const homeMock = {
  student: {
    firstName: 'Mateus',
    summary: 'Você tem 1 aula hoje e 2 atividades em aberto.'
  },
  nextClass: {
    subject: 'Engenharia de Software',
    teacher: 'Prof. Ana Ribeiro',
    format: 'online',
    startsAt: '19:30',
    endsAt: '21:00',
    room: null,
    callLink: 'https://meet.satc.edu.br/engsw'
  },
  activities: [
    {
      id: 'a1',
      title: 'Entrega do artigo de UX',
      subject: 'Interação Humano-Computador',
      dueLabel: 'Vence hoje',
      priority: 'high'
    },
    {
      id: 'a2',
      title: 'Lista de exercícios 04',
      subject: 'Banco de Dados II',
      dueLabel: 'Em 2 dias',
      priority: 'medium'
    }
  ],
  bill: {
    reference: 'Mensalidade de abril',
    amount: 'R$ 1.248,00',
    dueLabel: 'Vence em 15/04',
    status: 'pending'
  },
  notices: [
    {
      id: 'n1',
      title: 'Reserva de matrícula aberta',
      summary: 'O período de reserva para o próximo semestre começou.',
      tag: 'Institucional',
      isImportant: true
    },
    {
      id: 'n2',
      title: 'Semana acadêmica SATC',
      summary: 'Inscrições abertas para palestras e minicursos.',
      tag: 'Evento',
      isImportant: false
    }
  ]
};
