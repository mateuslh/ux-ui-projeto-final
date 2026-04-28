# Estado Atual e Delta da Implementação

## Referência de comparação

Este repositório **não possui branch local `master`** no momento.

Para atender ao pedido de comparação, foi considerado como base o último commit da branch `main`:

- Commit base: `a014a32`
- Mensagem: `add team members section to README`

O conteúdo abaixo descreve o que está implementado no workspace atual e o que difere dessa base.

---

## Escopo implementado no app (estado atual)

### Navegação e estrutura

- Navegação principal por stack local em `App.jsx` com telas de:
  - Início
  - Aulas
  - Atividades
  - Financeiro
  - Avisos
  - Notas
  - Detalhes de aula/atividade/notas/chamadas
  - Matrícula e fluxo de reserva

### Funcionalidades entregues

- Home com ações rápidas e cards navegáveis.
- Agenda de aulas com:
  - visão por dia da semana
  - detalhe da aula
  - acesso a call para aula online
  - aba de frequência/chamadas
- Chamadas com:
  - calendário de presença
  - resumo geral de presença/faltas
  - detalhamento por disciplina
  - cálculo de faltas em regra de 4 aulas por dia
  - detalhe por dia com conteúdo e ações acadêmicas
  - recurso de falta com anexo de comprovante
- Atividades com:
  - pendentes
  - entregues
  - detalhe de atividade
- Notas com:
  - lista por disciplina
  - detalhe da disciplina (média, frequência e avaliações)
- Financeiro com:
  - mensalidade atual
  - fluxo de pagamento de boleto
  - cópia da linha digitável
  - marcação de pagamento em protótipo
  - comprovante com protocolo e autenticação
  - histórico de pagamentos
  - atalho para reserva de matrícula
- Matrícula com:
  - status da reserva
  - histórico
  - fluxo de reserva em 3 etapas (seleção, revisão e confirmação)

---

## Delta técnico em relação à base (`a014a32`)

### Arquivos modificados

- `app/src/App.jsx`
- `app/src/components/BottomNav/BottomNav.css`
- `app/src/components/BottomNav/BottomNav.jsx`
- `app/src/components/NextClassCard/NextClassCard.css`
- `app/src/components/NextClassCard/NextClassCard.jsx`
- `app/src/components/NoticesPanel/NoticesPanel.css`
- `app/src/components/NoticesPanel/NoticesPanel.jsx`
- `app/src/components/PendingActivities/PendingActivities.css`
- `app/src/components/PendingActivities/PendingActivities.jsx`
- `app/src/components/QuickActions/QuickActions.css`
- `app/src/components/QuickActions/QuickActions.jsx`
- `app/src/pages/HomePage/HomePage.jsx`
- `app/src/styles/global.css`
- `docs/01-visao-geral-do-projeto.md`

### Novos diretórios/arquivos de app adicionados

- `app/src/components/DetailHeader/`
- `app/src/components/PageHeader/`
- `app/src/pages/AulaDetalhe/`
- `app/src/pages/AulasPage/`
- `app/src/pages/ChamadasDiaDetalhe/`
- `app/src/pages/AtividadesPage/`
- `app/src/pages/AtividadeDetalhe/`
- `app/src/pages/NotasPage/`
- `app/src/pages/NotasDisciplinaDetalhe/`
- `app/src/pages/FinanceiroPage/`
- `app/src/pages/AvisosPage/`
- `app/src/pages/MatriculaPage/`
- `app/src/pages/MatriculaReservaFlow/`

### Arquivos auxiliares fora do app no workspace

- `CLAUDE.md` (novo)
- `.claude` (removido)
- `.DS_Store`, `.idea/`, `entregaveis/.DS_Store` (arquivos locais, não funcionais)

---

## Observações de alinhamento

- O comparativo solicitado contra `master` foi mapeado para a base da `main` porque `master` não está disponível localmente.
- O estado atual inclui alterações amplas e ainda não commitadas no workspace.
- Build validado localmente com sucesso via `npm run build` em `app/`.
