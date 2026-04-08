## Sobre o app
O *Senhor dos Centavos* é um aplicativo focado em oferecer uma maneira prática e acessível para que os usuários controlem seus gastos mensais, permitindo uma visão clara e detalhada das finanças.
Com ele, é possível gerenciar despesas pagas via cartão de crédito, débito e PIX, oferecendo uma melhor compreensão dos hábitos de consumo e auxiliando no planejamento financeiro consciente.

### Funcionalidades
* [ ] Cadastro e categorização de despesas (crédito, débito, PIX).
* [ ] Gráficos e relatórios mensais mostrando gastos por categoria (alimentação, transporte, lazer, etc.).
* [ ] Alertas de gastos excessivos ou fora do planejado.
* [ ] Funcionalidade de "sobras" para mostrar o quanto resta para o mês.

### Banco de Dados

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

### Sprints e Checkpoints

* *Sprint 1 (Semana 1-2)*: Configuração do ambiente de desenvolvimento e criação do esqueleto das telas.
  - [ ] Configuração do projeto com React Native e SQLite.
  - [ ] Implementação do roteamento básico e navegação entre telas.
  - [ ] Criação das telas principais (Splash, Home, Cadastro de Despesa, Cadastro de Entrada, Relatórios).
  - *Checkpoint 1*: Entrega com todas as telas estilizadas e navegação funcional (dados fake).

* *Sprint 2 (Semana 3-5)*: Integração das funcionalidades principais com o banco de dados.
  - [ ] Implementação do cadastro de despesas (crédito, débito, PIX).
  - [ ] Implementação do cadastro de entradas.
  - [ ] Integração com SQLite para armazenamento e leitura dos dados.
  - *Checkpoint 2*: Integração completa com banco de dados para funcionalidades básicas.

* *Sprint 3 (Semana 6-8)*: Implementação de funcionalidades adicionais e finalização do app.
  - [ ] Implementação de alertas de gastos excessivos e funcionalidade de "sobras".
  - [ ] Implementação de gráficos e relatórios de gastos mensais.
  - [ ] Preparação do APK para distribuição e testes finais.
  - *Checkpoint 3 (Final)*: Entrega final do app com APK, incluindo funcionalidades principais e adicionais implementadas.
