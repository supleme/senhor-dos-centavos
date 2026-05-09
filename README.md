# Senhor dos Centavos

O *Senhor dos Centavos* é um aplicativo focado em oferecer uma maneira prática e acessível para que os usuários controlem seus gastos mensais, permitindo uma visão clara e detalhada das finanças.
Com ele, é possível gerenciar despesas pagas via cartão de crédito, débito e PIX, oferecendo uma melhor compreensão dos hábitos de consumo e auxiliando no planejamento financeiro consciente.

## Funcionalidades

* [ ] Cadastro e categorização de despesas (crédito, débito, PIX).
* [ ] Gráficos e relatórios mensais mostrando gastos por categoria (alimentação, transporte, lazer, etc.).
* [ ] Alertas de gastos excessivos ou fora do planejado.
* [ ] Funcionalidade de "sobras" para mostrar o quanto resta para o mês.

## Banco de Dados

Para armazenamento dos dados, o aplicativo utilizará **SQLite**, um banco de dados relacional leve e eficiente que permite persistência local no dispositivo.
A escolha do SQLite se dá pelo foco em simplicidade, praticidade e por não exigir autenticação ou acesso remoto nesta primeira versão.

A modelagem foi definida da seguinte forma:

1. **Usuário**
   - `id` (string, único): Identificador do usuário.
   - `nome` (string): Nome do usuário.
   - `email` (string): E-mail de login.

2. **Despesa**
   - `id` (string, único): Identificador da despesa.
   - `usuarioId` (string): Identificador do usuário associado.
   - `categoriaId` (integer): Identificador da categoria da despesa.
   - `valor` (decimal): Valor da despesa.
   - `data` (timestamp): Data da despesa.
   - `tipoPagamento` (varchar): Tipo de pagamento (crédito, débito, PIX).

3. **Entrada**
   - `id` (integer, único): Identificador da entrada.
   - `usuarioId` (integer): Identificador do usuário associado.
   - `categoriaId` (integer): Identificador da categoria da entrada.
   - `valor` (decimal): Valor da entrada.
   - `data` (date): Data da entrada.

4. **Categoria**
   - `id` (integer, único): Identificador da categoria.
   - `nome` (varchar): Nome da categoria (ex: alimentação, salário).
   - `tipo` (integer): Tipo da categoria (1 para despesas, 2 para entradas).

## Protótipos de Tela

Os protótipos de interface foram desenvolvidos no Figma para ilustrar o fluxo principal de uso do aplicativo.

[Clique aqui para visualizar o protótipo no Figma](https://www.figma.com/design/9C7IHxC2tM5e1u1TAglocV/Senhor-dos-Centavos?node-id=43-49&t=bUH2eb6MzZCyahFV-1)

As telas incluem:
- Tela inicial (Splash)
- Tela de visualização de despesas e entradas
- Tela de cadastro de nova despesa/entrada
- Tela de relatórios
- Alertas de gastos excessivos

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
- [ ] Implementação do cadastro de despesas com persistência (Zustand + SQLite).
- [ ] Implementação do cadastro de entradas.
- [ ] Integração com SQLite para armazenamento e leitura dos dados.
- *Checkpoint 2*: Telas estilizadas, navegação funcional e dados mock. ✅

### Sprint 3 (Semana 6-8): Funcionalidades completas e finalização

- [ ] Integração com SQLite — persistência real de despesas e entradas.
- [ ] Estado global com Zustand para gerenciar despesas e entradas em tempo real.
- [ ] Implementação de alertas de gastos excessivos e funcionalidade de "sobras".
- [ ] Implementação de gráficos e relatórios de gastos mensais.
- [ ] Preparação do APK para distribuição e testes finais.
- *Checkpoint 3 (Final)*: Entrega final do app com APK e funcionalidades completas.

## Atualizações desde o último checkpoint

### Recursos dos módulos aplicados

- **Módulo 05 — Workflow no Git:** organização do projeto em branches por funcionalidade (`@cvabreu/3/expo-router-setup`, `@cvabreu/4/screens-styled`), com PRs e merges para o `main`.

- **Módulo 06 — Expo Router:** configurado com layouts aninhados. `app/_layout.tsx` define o navegador Stack raiz; `app/(tabs)/_layout.tsx` define a navegação por abas (Home, Register, Reports, Alerts). Cada aba é um arquivo separado em `app/(tabs)/`.

- **Módulo 03 — Boas práticas para componentes reutilizáveis:**
  - **Isolamento de componentes repetitivos:** `ExpenseCard` isola a exibição de cada despesa, reutilizado em qualquer lista; `SummaryBar` isola o resumo financeiro.
  - **Parametrização de componentes:** `ExpenseCard` recebe `expense` e `category` como props; `SummaryBar` recebe `totalIncome` e `totalExpenses`.
  - **Uso de mocks para popular interfaces:** `src/mocks/mockData.ts` contém `mockExpenses`, `mockIncomes` e `mockCategories`, utilizados nas três telas durante o desenvolvimento.
  - **Nomenclaturas descritivas no contexto:** componentes nomeados pelo que representam (`ExpenseCard`, `SummaryBar`), props nomeadas pelo dado que carregam (`totalIncome`, `paymentType`).

### Demonstração das telas

> 📹 Link do vídeo: *(a ser adicionado após gravação)*
