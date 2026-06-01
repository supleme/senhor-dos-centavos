# Senhor dos Centavos

O *Senhor dos Centavos* é um aplicativo focado em oferecer uma maneira prática e acessível para que os usuários controlem seus gastos mensais, permitindo uma visão clara e detalhada das finanças.
Com ele, é possível gerenciar despesas pagas via cartão de crédito, débito e PIX, oferecendo uma melhor compreensão dos hábitos de consumo e auxiliando no planejamento financeiro consciente.

## Funcionalidades

* [x] Cadastro e categorização de despesas (crédito, débito, PIX).
* [x] Cadastro e categorização de entradas (salário, freelance).
* [x] Relatórios mensais mostrando gastos por categoria com barras de progresso.
* [x] Alertas de saldo negativo com notificações locais.
* [x] Funcionalidade de "sobras" — saldo restante exibido na aba Alerts.

## Banco de Dados

Para armazenamento dos dados, o aplicativo utiliza **SQLite** via `expo-sqlite`, um banco de dados relacional leve e eficiente que permite persistência local no dispositivo.
A escolha do SQLite se dá pelo foco em simplicidade, praticidade e por não exigir autenticação ou acesso remoto nesta primeira versão.

A modelagem implementada:

1. **Usuário**
   - `id` (string, único): Identificador do usuário.
   - `name` (string): Nome do usuário.
   - `email` (string): E-mail de login.

2. **Despesa**
   - `id` (string, único): Identificador da despesa.
   - `userId` (string): Identificador do usuário associado.
   - `categoryId` (integer): Identificador da categoria da despesa.
   - `amount` (real): Valor da despesa.
   - `date` (text): Data da despesa em formato ISO.
   - `paymentType` (text): Tipo de pagamento (`credit`, `debit`, `pix`).

3. **Entrada**
   - `id` (integer, único, autoincrement): Identificador da entrada.
   - `userId` (integer): Identificador do usuário associado.
   - `categoryId` (integer): Identificador da categoria da entrada.
   - `amount` (real): Valor da entrada.
   - `date` (text): Data da entrada em formato ISO.

4. **Categoria**
   - `id` (integer, único): Identificador da categoria.
   - `name` (text): Nome da categoria (ex: Food, Salary).
   - `type` (integer): Tipo da categoria (1 = despesa, 2 = entrada).

> A operação de **Update** não foi implementada por decisão de design: registros financeiros são imutáveis após cadastro. Caso haja erro, o usuário pode excluir e recadastrar o lançamento.

## Protótipos de Tela

Os protótipos de interface foram desenvolvidos no Figma para ilustrar o fluxo principal de uso do aplicativo.

[Clique aqui para visualizar o protótipo no Figma](https://www.figma.com/design/9C7IHxC2tM5e1u1TAglocV/Senhor-dos-Centavos?node-id=43-49&t=bUH2eb6MzZCyahFV-1)

As telas incluem:
- Tela de visualização de despesas e entradas (Home)
- Tela de cadastro de nova despesa ou entrada (Register)
- Tela de relatórios por categoria (Reports)
- Tela de alertas e resumo financeiro (Alerts)

## Planejamento de Sprints

### Sprint 1 (Semana 1-2): Configuração e esqueleto das telas

- [x] Configuração do projeto com React Native e Expo Router.
- [x] Implementação do roteamento com Expo Router (Stack + Tabs) e navegação entre telas.
- [x] Criação das telas principais (Home, Register, Reports, Alerts).
- [x] Estrutura de pastas: `src/screens`, `src/components`, `src/types`, `src/mocks`, `src/store`, `src/database`.
- [x] Definição dos tipos TypeScript (`User`, `Expense`, `Income`, `Category`).
- [x] Dados mock em `src/mocks/mockData.ts` para popular as telas.
- *Checkpoint 1*: Entrega com planejamento do app, protótipo no Figma e repositório no GitHub. ✅

### Sprint 2 (Semana 3-5): Telas estilizadas e preparação para banco de dados

- [x] Migração para Expo Router com layouts aninhados (`_layout.tsx` raiz + tabs).
- [x] Estilização da HomeScreen com `SummaryBar` e lista de `ExpenseCard`.
- [x] Estilização da RegisterScreen com formulário (valor, categoria, tipo de pagamento).
- [x] Estilização da ReportsScreen com resumo e breakdown por categoria.
- [x] Componentes reutilizáveis: `ExpenseCard` e `SummaryBar`.
- [x] Implementação do cadastro de despesas com persistência (Zustand + SQLite).
- [x] Implementação do cadastro de entradas.
- [x] Integração com SQLite para armazenamento e leitura dos dados.
- *Checkpoint 2*: Telas estilizadas, navegação funcional e dados mock. ✅

### Sprint 3 (Semana 6-8): Funcionalidades completas e finalização

- [x] Integração com SQLite — persistência real de despesas e entradas via repository pattern.
- [x] Estado global com Zustand — gerenciamento de despesas e entradas em tempo real.
- [x] Exclusão de despesas e entradas com confirmação.
- [x] Toggle Expense / Income na tela de cadastro com máscara de moeda brasileira (R$ 1.000,00).
- [x] Validação de campos obrigatórios com mensagens de erro inline.
- [x] AlertsScreen completa — saldo, categoria com maior gasto e resumo mensal.
- [x] Notificações locais — alerta automático ao atingir saldo negativo.
- [x] Ícones nas abas do navegador (Ionicons).
- [ ] Gráficos avançados (pizza/linha) — não implementado; os relatórios por categoria com barras de progresso atendem ao requisito de visualização de gastos.
- [ ] Preparação do APK — em andamento (Módulo 13).
- *Checkpoint 3 (Final)*: Entrega final do app com APK e funcionalidades completas.

## Atualizações desde o último checkpoint

### Recursos dos módulos aplicados

- **Módulo 05 — Workflow no Git:** organização do projeto em branches por funcionalidade com padrão `@cvabreu/N/feature-name`, PRs individuais e merges para o `main`.

- **Módulo 06 — Expo Router:** configurado com layouts aninhados. `app/_layout.tsx` define o navegador Stack raiz; `app/(tabs)/_layout.tsx` define a navegação por abas com ícones Ionicons (outline inativo / filled ativo).

- **Módulo 10 — SQLite com Expo (Repository Pattern):** banco inicializado via `expo-sqlite` com `openDatabaseSync`. Tabelas criadas no startup do app. `ExpenseRepository` e `IncomeRepository` centralizam os acessos ao banco (insert, findAll, delete), seguindo o padrão repository apresentado em aula.

- **Módulo 11 — Validação de Dados:** validação implementada diretamente no `RegisterScreen` com mensagens de erro inline por campo (amount > 0, categoria obrigatória, tipo de pagamento obrigatório para despesas). A máscara de moeda garante que apenas valores numéricos válidos sejam aceitos.

- **Módulo 13 — Empacotamento (EAS Build):** em andamento — APK será gerado via EAS e disponibilizado como Release no GitHub.

- **Módulo 03 — Boas práticas para componentes reutilizáveis:**
  - `ExpenseCard` recebe `expense`, `category` e `onDelete` como props.
  - `SummaryBar` recebe `totalIncome` e `totalExpenses`.
  - Zustand como única fonte de verdade para o estado da aplicação.

- **Notificações Locais (expo-notifications):** permissão solicitada ao abrir o app. Notificação disparada automaticamente quando o saldo mensal fica negativo. Botão de resumo manual disponível na aba Alerts.

### Demonstração das telas

> 📹 Checkpoint 2: [YouTube](https://www.youtube.com/watch?v=b9QW4a9hBWc)

> 📹 Checkpoint Final: *(link será adicionado após gravação)*
