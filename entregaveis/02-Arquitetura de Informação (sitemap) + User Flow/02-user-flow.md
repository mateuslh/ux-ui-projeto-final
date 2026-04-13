# User Flow

**Projeto:** Aplicativo Acadêmico SATC
**Entregável:** 02 — User Flow

---

## 1. Visão geral

Os fluxos abaixo representam os caminhos principais do estudante dentro do aplicativo, cobrindo as tarefas mais recorrentes descritas na jornada do usuário: entrada no app, consulta da rotina acadêmica, pagamento, reserva de matrícula, notas, materiais, comunicação e votação da turma.

Cada fluxo parte de uma intenção concreta do usuário e segue até a conclusão da ação ou entrega de informação.

---

## 2. Fluxo 0 — Entrada e autenticação

> **Nota:** caso encontre dificuldade para visualizar o diagrama diretamente pelo renderizador do GitHub, recomenda-se consultar a seção [Sobre os diagramas (Mermaid)](../../README.md#sobre-os-diagramas-mermaid) no README principal do projeto, que descreve como utilizar o [mermaid.live](https://mermaid.live) para uma navegação mais confortável.

```mermaid
flowchart TD
    Start([Abre o app]) --> Splash[Splash]
    Splash --> Logado{Sessão ativa?}
    Logado -- Sim --> Home[Tela Início]
    Logado -- Não --> Login[Tela de Login]
    Login --> Cred[Insere matrícula e senha]
    Cred --> Valida{Credenciais válidas?}
    Valida -- Não --> Erro[Exibir erro]
    Erro --> Login
    Valida -- Sim --> Home
    Home --> End([Acesso ao app])
```

---

## 3. Fluxo 1 — Consultar próxima aula e abrir call online

**Persona:** Estudante que quer saber qual é a próxima aula e entrar na call se for online.

> **Nota:** caso encontre dificuldade para visualizar o diagrama diretamente pelo renderizador do GitHub, recomenda-se consultar a seção [Sobre os diagramas (Mermaid)](../../README.md#sobre-os-diagramas-mermaid) no README principal do projeto, que descreve como utilizar o [mermaid.live](https://mermaid.live) para uma navegação mais confortável.

```mermaid
flowchart TD
    A([Início no app]) --> B[Home]
    B --> C{Próxima aula visível no resumo?}
    C -- Sim --> D[Toca no card da próxima aula]
    C -- Não --> E[Acessa aba Aulas]
    E --> F[Seleciona aula de hoje]
    D --> G[Detalhe da aula]
    F --> G
    G --> H{Aula online?}
    H -- Sim --> I[Toca em Abrir link da call]
    I --> J[App externo de videochamada]
    H -- Não --> K[Visualiza local e horário]
    J --> End([Em aula])
    K --> End
```

---

## 4. Fluxo 2 — Pagar mensalidade

**Persona:** Estudante com mensalidade próxima do vencimento.

> **Nota:** caso encontre dificuldade para visualizar o diagrama diretamente pelo renderizador do GitHub, recomenda-se consultar a seção [Sobre os diagramas (Mermaid)](../../README.md#sobre-os-diagramas-mermaid) no README principal do projeto, que descreve como utilizar o [mermaid.live](https://mermaid.live) para uma navegação mais confortável.

```mermaid
flowchart TD
    A([Início]) --> B[Home]
    B --> C{Pendência visível?}
    C -- Sim --> D[Toca no card de mensalidade pendente]
    C -- Não --> E[Aba Financeiro]
    E --> F[Mensalidades]
    F --> G[Seleciona mensalidade pendente]
    D --> H[Detalhe da mensalidade]
    G --> H
    H --> I[Toca em Pagar]
    I --> J[Fluxo de pagamento]
    J --> K{Pagamento concluído?}
    K -- Sim --> L[Confirmação + atualização de status]
    K -- Não --> M[Mensagem de erro]
    M --> H
    L --> End([Mensalidade paga])
```

---

## 5. Fluxo 3 — Reservar matrícula

**Persona:** Estudante em período de rematrícula.

> **Nota:** caso encontre dificuldade para visualizar o diagrama diretamente pelo renderizador do GitHub, recomenda-se consultar a seção [Sobre os diagramas (Mermaid)](../../README.md#sobre-os-diagramas-mermaid) no README principal do projeto, que descreve como utilizar o [mermaid.live](https://mermaid.live) para uma navegação mais confortável.

```mermaid
flowchart TD
    A([Início]) --> B[Home]
    B --> C[Aba Financeiro]
    C --> D[Reserva de matrícula]
    D --> E{Reserva já feita?}
    E -- Sim --> F[Exibe status atual]
    E -- Não --> G[Inicia fluxo guiado]
    G --> H[Leitura das informações]
    H --> I[Confirma intenção]
    I --> J{Sucesso?}
    J -- Sim --> K[Tela de confirmação]
    J -- Não --> L[Erro + orientação]
    L --> G
    K --> End([Reserva registrada])
    F --> End
```

---

## 6. Fluxo 4 — Consultar notas

**Persona:** Estudante que quer ver desempenho acadêmico.

> **Nota:** caso encontre dificuldade para visualizar o diagrama diretamente pelo renderizador do GitHub, recomenda-se consultar a seção [Sobre os diagramas (Mermaid)](../../README.md#sobre-os-diagramas-mermaid) no README principal do projeto, que descreve como utilizar o [mermaid.live](https://mermaid.live) para uma navegação mais confortável.

```mermaid
flowchart TD
    A([Início]) --> B[Home]
    B --> C[Aba Perfil]
    C --> D[Notas]
    D --> E[Lista de disciplinas]
    E --> F[Seleciona disciplina]
    F --> G[Detalhe das avaliações]
    G --> H{Quer comparar outra disciplina?}
    H -- Sim --> E
    H -- Não --> End([Consulta concluída])
```

---

## 7. Fluxo 5 — Acessar material de estudo

**Persona:** Estudante que precisa de um PDF de aula.

> **Nota:** caso encontre dificuldade para visualizar o diagrama diretamente pelo renderizador do GitHub, recomenda-se consultar a seção [Sobre os diagramas (Mermaid)](../../README.md#sobre-os-diagramas-mermaid) no README principal do projeto, que descreve como utilizar o [mermaid.live](https://mermaid.live) para uma navegação mais confortável.

```mermaid
flowchart TD
    A([Início]) --> B[Home]
    B --> C[Aba Atividades]
    C --> D[Materiais de estudo]
    D --> E[Seleciona disciplina]
    E --> F[Lista de materiais]
    F --> G[Seleciona arquivo]
    G --> H[Visualizador]
    H --> I{Quer baixar?}
    I -- Sim --> J[Download]
    I -- Não --> K[Leitura no app]
    J --> End([Arquivo disponível])
    K --> End
```

---

## 8. Fluxo 6 — Ver atividade pendente e marcar como concluída

**Persona:** Estudante que quer acompanhar tarefas.

> **Nota:** caso encontre dificuldade para visualizar o diagrama diretamente pelo renderizador do GitHub, recomenda-se consultar a seção [Sobre os diagramas (Mermaid)](../../README.md#sobre-os-diagramas-mermaid) no README principal do projeto, que descreve como utilizar o [mermaid.live](https://mermaid.live) para uma navegação mais confortável.

```mermaid
flowchart TD
    A([Início]) --> B[Home]
    B --> C{Atividade pendente em destaque?}
    C -- Sim --> D[Toca no card de atividade]
    C -- Não --> E[Aba Atividades]
    E --> F[Lista por prazo]
    F --> G[Seleciona atividade]
    D --> H[Detalhe da atividade]
    G --> H
    H --> I[Lê descrição e anexos]
    I --> J{Já entregou?}
    J -- Sim --> K[Marca como concluída]
    J -- Não --> L[Mantém pendente]
    K --> End([Atividade concluída])
    L --> End
```

---

## 9. Fluxo 7 — Ler aviso institucional

**Persona:** Estudante notificado sobre aviso importante.

> **Nota:** caso encontre dificuldade para visualizar o diagrama diretamente pelo renderizador do GitHub, recomenda-se consultar a seção [Sobre os diagramas (Mermaid)](../../README.md#sobre-os-diagramas-mermaid) no README principal do projeto, que descreve como utilizar o [mermaid.live](https://mermaid.live) para uma navegação mais confortável.

```mermaid
flowchart TD
    A([Notificação push]) --> B{Toca na notificação?}
    B -- Sim --> C[Detalhe do aviso]
    B -- Não --> D[Abre app manualmente]
    D --> E[Aba Avisos]
    E --> F[Painel institucional]
    F --> C
    C --> G[Leitura completa]
    G --> End([Aviso lido])
```

---

## 10. Fluxo 8 — Participar de votação da turma

**Persona:** Estudante que quer votar em enquete da turma.

> **Nota:** caso encontre dificuldade para visualizar o diagrama diretamente pelo renderizador do GitHub, recomenda-se consultar a seção [Sobre os diagramas (Mermaid)](../../README.md#sobre-os-diagramas-mermaid) no README principal do projeto, que descreve como utilizar o [mermaid.live](https://mermaid.live) para uma navegação mais confortável.

```mermaid
flowchart TD
    A([Início]) --> B[Aba Avisos]
    B --> C[Chat da turma]
    C --> D[Votações]
    D --> E[Seleciona votação ativa]
    E --> F[Detalhe da votação]
    F --> G{Já votou?}
    G -- Sim --> H[Visualiza resultado parcial]
    G -- Não --> I[Seleciona opção]
    I --> J[Confirma voto]
    J --> H
    H --> End([Participação registrada])
```

---

## 11. Resumo dos fluxos

| # | Fluxo | Ponto de partida | Resultado esperado |
|---|---|---|---|
| 0 | Entrada e autenticação | Splash | Acesso à Home |
| 1 | Próxima aula / call online | Home | Entrou na aula |
| 2 | Pagar mensalidade | Home ou Financeiro | Pagamento confirmado |
| 3 | Reservar matrícula | Financeiro | Reserva registrada |
| 4 | Consultar notas | Perfil | Desempenho visualizado |
| 5 | Material de estudo | Atividades | Arquivo acessado |
| 6 | Atividade pendente | Home ou Atividades | Atividade concluída |
| 7 | Aviso institucional | Push ou Avisos | Aviso lido |
| 8 | Votação da turma | Avisos | Voto registrado |

---

## 12. Princípios aplicados aos fluxos

- **Caminhos redundantes**: ações críticas (mensalidade, aula, atividade) podem ser iniciadas pela Home ou pela aba correspondente.
- **Baixo número de passos** até a ação principal — máximo de 4 toques do login até qualquer tarefa de alta prioridade.
- **Confirmação visual** em toda ação que altere estado (pagamento, reserva, voto, conclusão).
- **Tratamento de erro** explícito em fluxos sensíveis (login, pagamento, reserva).
- **Entrada por notificação** considerada como ponto alternativo de início para avisos e aulas online.
