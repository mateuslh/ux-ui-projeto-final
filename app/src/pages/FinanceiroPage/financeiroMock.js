export const financeiroMock = {
  currentBill: {
    reference: 'Mensalidade de abril / 2026',
    amount: 'R$ 1.248,00',
    dueDate: '30/04/2026',
    dueLabel: 'Vence em 30/04',
    status: 'pending',
    boleto: {
      bank: 'Banco do Brasil (001)',
      beneficiary: 'SATC Educação e Tecnologia',
      cnpj: '74.234.567/0001-45',
      linhaDigitavel: '00190.00009 03127.914005 00000.123174 1 96980000124800',
    },
    receipt: {
      protocol: 'SATC-PAG-2026-04812',
      auth: '9F4A-72C1-0B8D-61E3',
    },
  },
  enrollment: {
    semester: '2026/2',
    status: 'open',
    statusLabel: 'Aberta',
    deadline: '15/05/2026',
  },
  history: [
    {
      id: 'h1',
      reference: 'Março / 2026',
      amount: 'R$ 1.248,00',
      paidOn: '25/03/2026',
      status: 'paid',
    },
    {
      id: 'h2',
      reference: 'Fevereiro / 2026',
      amount: 'R$ 1.248,00',
      paidOn: '24/02/2026',
      status: 'paid',
    },
    {
      id: 'h3',
      reference: 'Janeiro / 2026',
      amount: 'R$ 1.248,00',
      paidOn: '22/01/2026',
      status: 'paid',
    },
    {
      id: 'h4',
      reference: 'Dezembro / 2025',
      amount: 'R$ 1.198,00',
      paidOn: '20/12/2025',
      status: 'paid',
    },
  ],
};
