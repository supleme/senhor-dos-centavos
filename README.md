# Senhor dos Centavos

### Instalação e Configuração
*Clone o repositório:*
`git clone https://github.com/supleme/senhor-dos-centavos.git`

*Navegue até o diretório do projeto*
`cd centavo`

*Instale as dependências*
`npm install`

Certifique-se de configurar todas as variáveis de ambiente necessárias.

### Execução
Para iniciar o servidor de desenvolvimento, execute o comando:
`npm start`

## Sobre o app
O *Senhor dos Centavos* é um aplicativo focado em oferecer uma maneira prática e acessível para que os usuários controlem seus gastos mensais, permitindo uma visão clara e detalhada das finanças.
Com ele, é possível gerenciar despesas pagas via cartão de crédito, débito e PIX, oferecendo uma melhor compreensão dos hábitos de consumo e auxiliando no planejamento financeiro consciente.

### Funcionalidades
* [ ] Cadastro e categorização de despesas (crédito, débito, PIX)
* [ ] Gráficos e relatórios mensais mostrando gastos por categoria (alimentação, transporte, lazer, etc.)
* [ ] Importação de dados de planilhas para facilitar a transição
* [ ] Integração com Firebase para armazenamento de dados seguro e escalável
* [ ] Alertas de gastos excessivos ou fora do planejado
* [ ] Funcionalidade de "sobras" para mostrar o quanto resta para o mês

### Funcionalidades futuras
* [ ] Análises e previsões baseadas em dados históricos

## Protótipos de tela
Para a criação dos protótipos, utilizamos o [Figma](https://www.figma.com/), onde você pode visualizar os protótipos e os fluxos de navegação entre as telas interativas.
[Visualize aqui o protótipo completo](https://www.figma.com/design/9C7IHxC2tM5e1u1TAglocV/Senhor-dos-Centavos?m=auto&t=IMWQBswbyiqkKM85-1).

## Modelagem do banco de dados
O *Senhor dos Centavos* utiliza o *Firebase* como banco de dados NoSQL para o armazenamento dos dados dos usuários. Abaixo estão os Schemas de dados principais do projeto:

### Banco de Dados
1. *Usuário*
   - id (string, único): Identificador do usuário
   - nome (string): Nome do usuário
   - email (string): E-mail de login

2. *Despesa*
   - id (string, único): Identificador da despesa
   - usuarioId (string): Identificador do usuário associado
   - categoriaId (integer): Identificador da categoria da despesa
   - valor (decimal): Valor da despesa
   - data (timestamp): Data da despesa
   - tipoPagamento (varchar): Tipo de pagamento (crédito, débito, PIX)

3. *Entrada*
   - id (integer, único): Identificador da entrada
   - usuarioId (integer): Identificador do usuário associado
   - categoriaId (integer): Identificador da categoria da entrada
   - valor (decimal): Valor da entrada
   - data (date): Data da entrada

4. *Categoria*
   - id (integer, único): Identificador da categoria
   - nome (varchar): Nome da categoria (ex: alimentação, salário)
   - tipo (integer): Tipo da categoria (1 para despesas, 2 para entradas)

Para uma visão mais detalhada, consulte o diagrama no Figma.

## Planejamento de Sprints
Este é o cronograma planejado para o desenvolvimento do *Senhor dos Centavos* com os requisitos e entregas em cada checkpoint.

### Sprints e Checkpoints

* *Sprint 1 (Semana 1-2)*: Configuração do ambiente de desenvolvimento e criação do esqueleto das telas.
  - [ ] Configuração do projeto com React Native e Firebase.
  - [ ] Implementação do roteamento básico.
  - *Checkpoint 2*: Entrega com todas as telas estilizadas e navegação funcional (dados fake).

* *Sprint 2 (Semana 3-5)*: Integração das funcionalidades principais com o Firebase.
  - [ ] Implementação do cadastro de despesas (crédito, débito, PIX).
  - [ ] Integração com Firebase para armazenamento de dados.
  - *Checkpoint 3*: Integração completa com banco de dados para funcionalidades básicas.

* *Sprint 3 (Semana 6-8)*: Implementação de funcionalidades adicionais e finalização do app.
  - [ ] Implementação de alertas de gastos excessivos e funcionalidade de "sobras".
  - [ ] Análises e previsões baseadas em dados históricos.
  - [ ] Preparação do APK para distribuição.
  - *Checkpoint 4 (Final)*: Entrega final do app com APK, incluindo funcionalidades principais e adicionais implementadas.

## Tecnologias Utilizadas
* *Frontend*: React Native
* *Banco de dados*: Firebase (versão gratuita)

## Fatores Externos e Restrições
* *Limitações do Firebase*: O plano gratuito do Firebase pode impor limites de armazenamento, podendo exigir uma expansão para uma versão paga em caso de crescimento do app.
* *Segurança e Privacidade*: Dada a natureza sensível dos dados financeiros, camadas adicionais de segurança podem ser implementadas para garantir a segurança dos dados.

## Benefícios para o Usuário
* *Visão clara das finanças*: Com controle dos gastos diários e mensais, o usuário pode visualizar de forma prática para onde está indo o dinheiro.
* *Organização e Planejamento*: Ferramentas de categorização detalhada e alertas de gasto ajudam no planejamento financeiro.
  
## Modelo de Negócio
Este app pode ser monetizado através de um modelo *Freemium*:
* Funcionalidades básicas gratuitas.
* Versão Premium com funcionalidades avançadas (entre R$5 e R$15 mensais).

Outras opções incluem a exibição de anúncios na versão gratuita e parcerias com fintechs para diversificação de receita.
