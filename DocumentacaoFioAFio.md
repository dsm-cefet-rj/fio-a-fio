# Fio a Fio — Documentação Consolidada do Projeto

## 1. Visão geral

**Nome do sistema:** Fio a Fio

**Integrantes do grupo:**
- Letícia Mendonça dos Santos
- Maria Clara Mousinho de Salles

### 1.1 Propósito

O **Fio a Fio** é uma rede social voltada exclusivamente para a comunidade de crochê, criada para conectar crocheteiros, artesãos, professores e entusiastas em um único ambiente digital.

A plataforma permite:
- compartilhar trabalhos e projetos;
- publicar conteúdos;
- acompanhar outros usuários;
- visualizar stories;
- acessar materiais gratuitos;
- pesquisar conteúdos e usuários;
- comprar e vender vídeo-aulas de crochê.

O sistema busca fortalecer a comunidade do crochê, facilitar o acesso ao conhecimento e possibilitar que crocheteiros transformem seus conhecimentos em fonte de renda por meio da venda de vídeo-aulas.

### 1.2 Proposta de valor

O Fio a Fio reúne em uma única plataforma:

- rede social especializada em crochê;
- compartilhamento de trabalhos e projetos;
- compra e venda de vídeo-aulas;
- biblioteca de materiais gratuitos;
- revistas e PDFs;
- stories;
- curtidas, comentários e seguidores;
- busca por conteúdos e usuários;
- possibilidade de monetização para criadores;
- comunidade específica para pessoas interessadas em crochê.

---

## 2. Business Case

### 2.1 Contexto

Atualmente, pessoas interessadas em crochê utilizam diferentes plataformas para finalidades distintas. Redes sociais são utilizadas para compartilhar trabalhos e encontrar inspiração, enquanto plataformas de vídeo e sites especializados são utilizados para aprender novas técnicas. Revistas, gráficos e receitas também podem estar distribuídos entre diferentes sites e comunidades.

Para produtores de conteúdo, existe a dificuldade de encontrar um ambiente especificamente voltado ao crochê que permita divulgar trabalhos e comercializar aulas de maneira integrada.

### 2.2 Problema

A comunidade do crochê não possui, em um único ambiente, uma plataforma que combine:

- interação social;
- divulgação de trabalhos;
- aprendizado;
- materiais gratuitos;
- comercialização de cursos e vídeo-aulas.

Como consequência, os usuários precisam utilizar diferentes plataformas para realizar atividades relacionadas ao mesmo interesse.

### 2.3 Solução proposta

O Fio a Fio será uma rede social especializada em crochê, permitindo que os usuários:

- criem seus perfis;
- publiquem conteúdos;
- sigam outros crocheteiros;
- interajam com publicações;
- compartilhem seus projetos.

A plataforma também possuirá:

- uma área de aprendizado com materiais gratuitos, como revistas em PDF, gráficos e receitas;
- uma área comercial destinada às vídeo-aulas pagas;
- possibilidade de usuários com conhecimento e experiência atuarem como criadores e disponibilizarem suas próprias vídeo-aulas para venda.

### 2.4 Valor gerado

**Para o aluno/consumidor:**
- acesso centralizado ao conteúdo;
- facilidade para encontrar aulas;
- aprendizado especializado;
- materiais gratuitos;
- possibilidade de descobrir novos professores;
- interação com outros crocheteiros.

**Para o criador/professor:**
- divulgação do trabalho;
- construção de uma comunidade;
- possibilidade de alcançar novos alunos;
- monetização do conhecimento por meio da venda de vídeo-aulas.

**Para a comunidade:**
- compartilhamento de conhecimento;
- inspiração;
- interação entre crocheteiros;
- valorização do trabalho artesanal.

---

# 3. Modelo de receita

O Fio a Fio adotará um modelo baseado na intermediação da venda de vídeo-aulas.

Os criadores poderão cadastrar e comercializar seus conteúdos dentro da plataforma. O sistema será responsável pela divulgação, processamento dos pagamentos e disponibilização do material ao comprador.

### 3.1 Divisão de receita

Como proposta inicial:

| Destinação | Percentual |
|---|---:|
| Professor/Criador | 85% |
| Plataforma | 15% |

Os 15% destinados à plataforma são descritos como recursos para cobrir custos de operação, manutenção, processamento de pagamentos e desenvolvimento de novas funcionalidades.

---

# 4. Processo de negócio principal

O processo principal do Fio a Fio é:

> **Compra e acesso a uma vídeo-aula de crochê.**

Esse processo conecta o consumidor interessado em aprender uma técnica ao criador que disponibilizou o conteúdo.

### 4.1 Fluxo do processo

1. **Descoberta da vídeo-aula**  
   O usuário navega pelo feed, pesquisa conteúdos ou acessa a área de vídeo-aulas.

2. **Seleção da vídeo-aula**  
   O usuário seleciona uma vídeo-aula.

3. **Visualização das informações**  
   O sistema apresenta:
   - título;
   - descrição;
   - imagem de capa;
   - criador;
   - preço;
   - avaliação;
   - duração;
   - nível de dificuldade;
   - informações sobre o que será aprendido.

4. **Compra**  
   O usuário seleciona a opção de compra.

5. **Pagamento**  
   O usuário realiza o pagamento pela plataforma.

6. **Confirmação**  
   O sistema confirma o pagamento.

7. **Liberação do conteúdo**  
   Após a confirmação, a vídeo-aula passa a fazer parte da biblioteca de conteúdos adquiridos pelo usuário.

8. **Acesso**  
   O usuário pode assistir à vídeo-aula quando desejar.

9. **Avaliação/interação**  
   Após assistir, o usuário pode avaliar a aula e interagir com o conteúdo.

---

# 5. Atores do sistema

| Ator | Descrição |
|---|---|
| **Usuário** | Pessoa que utiliza a rede social, podendo publicar, interagir, seguir outros usuários, acessar materiais e comprar vídeo-aulas. |
| **Criador/Professor** | Usuário que também produz conteúdo educacional e disponibiliza vídeo-aulas para venda. É tratado como uma especialização do usuário. |
| **Administrador** | Responsável pela administração da plataforma, incluindo gerenciamento e moderação dos conteúdos. |
| **Serviço de pagamento** | Sistema externo responsável pelo processamento dos pagamentos. |

---

# 6. Casos de uso

A documentação inicial define os seguintes casos de uso:

| ID | Caso de uso | Descrição |
|---|---|---|
| UC01 | Cadastrar usuário | Criar uma nova conta na plataforma |
| UC02 | Realizar login | Acessar a conta do usuário |
| UC03 | Gerenciar perfil | Alterar informações e configurações do perfil |
| UC04 | Publicar conteúdo | Criar uma publicação no feed |
| UC05 | Interagir com publicação | Curtir, comentar e compartilhar conteúdos |
| UC06 | Seguir usuário | Seguir outros membros da comunidade |
| UC07 | Publicar story | Criar conteúdo temporário |
| UC08 | Pesquisar conteúdo | Procurar usuários, publicações e vídeo-aulas |
| UC09 | Consultar materiais gratuitos | Acessar revistas, PDFs, gráficos e receitas |
| UC10 | Cadastrar vídeo-aula | Criador disponibiliza uma vídeo-aula para venda |
| UC11 | Consultar vídeo-aula | Visualizar informações de uma vídeo-aula |
| UC12 | Comprar vídeo-aula | Adquirir uma vídeo-aula paga |
| UC13 | Realizar pagamento | Efetuar o pagamento da vídeo-aula |
| UC14 | Acessar vídeo-aula adquirida | Assistir a uma aula comprada |
| UC15 | Avaliar vídeo-aula | Avaliar uma vídeo-aula adquirida |
| UC16 | Consultar compras | Visualizar vídeo-aulas já adquiridas |
| UC17 | Gerenciar vídeo-aulas | Criador editar ou remover suas aulas |
| UC18 | Consultar vendas | Criador acompanhar suas vídeo-aulas vendidas |

> **Observação:** o documento de validação posterior amplia e reorganiza os casos de uso, chegando a UC30. Essa evolução está documentada na seção de validação de requisitos.

---

# 7. Entidades de domínio

A documentação inicial define cinco entidades principais.

## 7.1 Usuário

Representa as pessoas que utilizam a plataforma.

**Atributos:**
- `id`
- `nome`
- `username`
- `email`
- `senha`
- `foto`
- `biografia`
- `data de cadastro`

## 7.2 Publicação

Representa os conteúdos compartilhados pelos usuários no feed.

**Atributos possíveis:**
- `id`
- `conteúdo`
- `imagem/vídeo`
- `data`
- `quantidade de curtidas`
- `quantidade de comentários`
- `usuário autor`

## 7.3 Vídeo-aula

Representa o principal produto comercial da plataforma.

**Atributos:**
- `id`
- `título`
- `descrição`
- `preço`
- `duração`
- `vídeo`
- `capa`
- `nível de dificuldade`
- `data de publicação`
- `criador`
- `avaliação média`

## 7.4 Compra

Representa a aquisição de uma vídeo-aula pelo usuário.

**Atributos:**
- `id`
- `usuário`
- `vídeo-aula`
- `data`
- `valor`
- `status de pagamento`

## 7.5 Material

Representa os conteúdos gratuitos disponibilizados na plataforma.

**Tipos de material possíveis:**
- revistas em PDF;
- gráficos;
- receitas;
- apostilas;
- moldes;
- tutoriais.

**Atributos:**
- `id`
- `título`
- `descrição`
- `tipo`
- `arquivo`
- `data de publicação`
- `autor`

---

# 8. Entidades adicionadas na validação

Durante a validação dos requisitos, foram adicionadas duas entidades para representar informações que já faziam parte da proposta do sistema:

1. **Relacionamento/Seguidor**
2. **Story**

A inclusão dessas entidades permite representar de forma persistente funcionalidades como seguir usuários e publicar stories.

## 8.1 Relacionamento/Seguidor

Representa a relação entre dois usuários, permitindo que um usuário siga outro dentro da plataforma.

**Atributos:**
- `id`
- `usuário seguidor`
- `usuário seguido`
- `data do relacionamento`
- `status do relacionamento`

## 8.2 Story

Representa conteúdos temporários publicados pelos usuários.

**Atributos:**
- `id`
- `conteúdo`
- `imagem/vídeo`
- `data de publicação`
- `data de expiração`
- `usuário autor`

---

# 9. Validação dos requisitos

A validação dos requisitos é realizada por meio de:

- Matriz CRUD;
- Matriz Perfil × Funcionalidade;
- priorização dos requisitos;
- definição dos responsáveis por entidade e funcionalidade.

O processo principal considerado para a validação continua sendo a compra e o acesso a vídeo-aulas de crochê.

---

# 10. Matriz CRUD

A Matriz CRUD considera as operações:

| Sigla | Operação |
|---|---|
| **C** | Create — criar |
| **R** | Read — consultar/ler |
| **U** | Update — atualizar |
| **D** | Delete — excluir |

As entidades consideradas são:

- Usuário;
- Publicação;
- Relacionamento/Seguidor;
- Story;
- Vídeo-aula;
- Compra;
- Material.

### 10.1 Casos de uso da validação CRUD

| Caso de uso | Usuário | Publicação | Relacionamento | Story | Vídeo-aula | Compra | Material |
|---|---|---|---|---|---|---|---|
| UC01 — Cadastrar usuário | C | — | — | — | — | — | — |
| UC02 — Realizar login | R | — | — | — | — | — | — |
| UC03 — Gerenciar perfil | U | — | — | — | — | — | — |
| UC04 — Excluir conta | D | — | — | — | — | — | — |
| UC05 — Publicar conteúdo | R | C | — | — | — | — | — |
| UC06 — Consultar publicações | — | R | — | — | — | — | — |
| UC07 — Editar publicação | — | U | — | — | — | — | — |
| UC08 — Excluir publicação | — | D | — | — | — | — | — |
| UC09 — Interagir com publicação | R | U | — | — | — | — | — |
| UC10 — Seguir usuário | U | — | C | — | — | — | — |
| UC11 — Consultar relacionamentos | R | — | R | — | — | — | — |
| UC12 — Gerenciar relacionamento | — | — | U | — | — | — | — |
| UC13 — Deixar de seguir usuário | — | — | D | — | — | — | — |
| UC14 — Publicar story | R | — | — | C | — | — | — |
| UC15 — Visualizar story | — | — | — | R | — | — | — |
| UC16 — Editar story | — | — | — | U | — | — | — |
| UC17 — Excluir story | — | — | — | D | — | — | — |
| UC18 — Pesquisar conteúdo | R | R | R | R | R | — | R |
| UC19 — Cadastrar vídeo-aula | R | — | — | — | C | — | — |
| UC20 — Consultar vídeo-aula | — | — | — | — | R | — | — |
| UC21 — Gerenciar vídeo-aula | — | — | — | — | U | — | — |
| UC22 — Excluir vídeo-aula | — | — | — | — | D | — | — |
| UC23 — Comprar vídeo-aula | R | — | — | — | R | C | — |
| UC24 — Consultar compras | R | — | — | — | R | R | — |
| UC25 — Atualizar status da compra | — | — | — | — | — | U | — |
| UC26 — Cancelar compra | — | — | — | — | — | D | — |
| UC27 — Cadastrar material gratuito | R | — | — | — | — | — | C |
| UC28 — Consultar materiais gratuitos | — | — | — | — | — | — | R |
| UC29 — Gerenciar material gratuito | — | — | — | — | — | — | U |
| UC30 — Excluir material gratuito | — | — | — | — | — | — | D |

---

# 11. Alterações realizadas durante a validação

Para garantir que as entidades possuíssem operações CRUD representadas, foram adicionados ou detalhados casos de uso.

| Caso de uso | Alteração |
|---|---|
| UC04 — Excluir conta | Remover a conta do usuário |
| UC06 — Consultar publicações | Visualizar publicações no feed |
| UC07 — Editar publicação | Alterar uma publicação realizada pelo usuário |
| UC08 — Excluir publicação | Remover uma publicação realizada pelo usuário |
| UC11 — Consultar relacionamentos | Visualizar seguidores e usuários seguidos |
| UC12 — Gerenciar relacionamentos | Alterar o estado de um relacionamento entre usuários |
| UC13 — Deixar de seguir usuário | Excluir um relacionamento de seguimento |
| UC15 — Visualizar story | Consultar stories publicados |
| UC16 — Alterar um story publicado | Alterar um story publicado |
| UC17 — Excluir story | Remover um story antes de sua expiração |
| UC22 — Excluir vídeo-aula | Remover uma vídeo-aula da plataforma |
| UC25 — Atualizar status da compra | Atualizar o estado da compra conforme o processamento do pagamento |
| UC26 — Cancelar compra | Cancelar uma compra quando aplicável |
| UC27 — Cadastrar material gratuito | Disponibilizar revistas, PDFs, gráficos, receitas e outros materiais |
| UC29 — Gerenciar material gratuito | Alterar informações de um material |
| UC30 — Excluir material gratuito | Remover um material da biblioteca |

---

# 12. Matriz Perfil × Funcionalidade

## 12.1 Perfis

### Usuário

Pode:
- publicar;
- interagir;
- seguir outros usuários;
- acessar materiais;
- comprar vídeo-aulas.

### Criador/Professor

É uma especialização do usuário e, além das funções comuns, pode disponibilizar vídeo-aulas para venda.

### Administrador

É responsável pela administração e moderação dos conteúdos.

### Serviço de pagamento

É um sistema externo responsável pelo processamento dos pagamentos.

## 12.2 Matriz

**Legenda:** `X` = possui acesso à funcionalidade.

| Caso de uso | Usuário | Criador/Professor | Administrador | Serviço de pagamento |
|---|:---:|:---:|:---:|:---:|
| UC01 — Cadastrar usuário | X | X | — | — |
| UC02 — Realizar login | X | X | X | — |
| UC03 — Gerenciar perfil | X | X | — | — |
| UC04 — Publicar conteúdo | X | X | — | — |
| UC05 — Interagir com publicação | X | X | — | — |
| UC06 — Seguir usuário | X | X | — | — |
| UC07 — Publicar story | X | X | — | — |
| UC08 — Pesquisar conteúdo | X | X | X | — |
| UC09 — Consultar materiais gratuitos | X | X | X | — |
| UC10 — Cadastrar vídeo-aula | — | X | — | — |
| UC11 — Consultar vídeo-aula | X | X | X | — |
| UC12 — Comprar vídeo-aula | X | X | — | — |
| UC13 — Realizar pagamento | — | — | — | X |
| UC14 — Acessar vídeo-aula adquirida | X | X | — | — |
| UC15 — Avaliar vídeo-aula | X | X | — | — |
| UC16 — Consultar compras | X | X | X | — |
| UC17 — Gerenciar vídeo-aulas | — | X | X | — |
| UC18 — Consultar vendas | — | X | X | — |

> **Nota de consistência:** esta matriz utiliza a numeração apresentada no documento inicial de definição do projeto. A Matriz CRUD da validação posterior utiliza uma numeração ampliada até UC30. As duas estruturas são mantidas nesta documentação para preservar o conteúdo dos documentos de origem.

---

# 13. Responsáveis por entidade

| Entidade | Responsável principal | Responsabilidade |
|---|---|---|
| Usuário | Usuário | Criar e gerenciar seus dados cadastrais |
| Publicação | Usuário/Criador | Criar, editar, consultar e excluir publicações |
| Relacionamento/Seguidor | Usuário | Seguir, consultar e deixar de seguir outros usuários |
| Story | Usuário/Criador | Publicar, visualizar, editar e excluir stories |
| Vídeo-aula | Criador/Professor | Cadastrar, gerenciar e comercializar aulas |
| Compra | Usuário + Serviço de pagamento | Registrar, processar e atualizar compras |
| Material | Criador/Administrador | Disponibilizar, gerenciar e remover materiais |

---

# 14. Priorização dos requisitos

A priorização considera principalmente:

1. valor para o negócio;
2. relação com o processo principal;
3. dependências entre funcionalidades;
4. funcionalidades secundárias;
5. funcionalidades que podem ser desenvolvidas posteriormente.

Como o processo principal do Fio a Fio é a compra e o acesso a uma vídeo-aula, as funcionalidades relacionadas a esse fluxo recebem a maior prioridade.

## 14.1 Prioridade 1 — Núcleo do negócio

- UC19 — Cadastrar vídeo-aula
- UC18 — Pesquisar conteúdo
- UC20 — Consultar vídeo-aula
- UC23 — Comprar vídeo-aula
- UC25 — Atualizar status da compra
- UC24 — Consultar compras
- UC26 — Cancelar compra
- UC21 — Gerenciar vídeo-aula
- UC22 — Excluir vídeo-aula

## 14.2 Prioridade 2 — Estrutura e suporte

- UC01 — Cadastrar usuário
- UC02 — Realizar login
- UC03 — Gerenciar perfil
- UC27 — Cadastrar material gratuito
- UC28 — Consultar materiais gratuitos
- UC29 — Gerenciar material gratuito
- UC30 — Excluir material gratuito
- UC14 — Publicar story
- UC15 — Visualizar story
- UC05 — Publicar conteúdo
- UC06 — Consultar publicações

## 14.3 Prioridade 3 — Engajamento e funcionalidades complementares

- UC09 — Interagir com publicação
- UC10 — Seguir usuário
- UC11 — Consultar relacionamentos
- UC13 — Deixar de seguir usuário
- UC12 — Gerenciar relacionamento
- UC07 — Editar publicação
- UC08 — Excluir publicação
- UC16 — Editar story
- UC17 — Excluir story
- UC04 — Excluir conta

---

# 15. Justificativa da priorização

A primeira prioridade corresponde ao núcleo comercial do Fio a Fio.

O sistema precisa permitir que:

1. um criador disponibilize uma vídeo-aula;
2. um usuário consiga encontrá-la;
3. o usuário consulte suas informações;
4. realize a compra;
5. a aquisição seja registrada;
6. o conteúdo seja liberado após a confirmação do pagamento;
7. o usuário tenha acesso à vídeo-aula.

Esse fluxo é considerado especialmente importante porque o modelo de negócio do Fio a Fio é baseado na intermediação da venda de vídeo-aulas.

A proposta atual estabelece que **85% do valor da venda seja destinado ao professor/criador e 15% permaneça com a plataforma**, responsável pelos custos de operação, manutenção, processamento de pagamentos e desenvolvimento.

As funcionalidades de rede social — publicações, seguidores, stories e interações — são consideradas fundamentais para a formação da comunidade, mas podem ser desenvolvidas depois do núcleo comercial estar funcionando.

---

# 16. Validação final dos requisitos

A validação final apresenta os seguintes pontos:

- A inclusão das entidades **Relacionamento/Seguidor** e **Story** permite representar informações que já faziam parte da proposta original do sistema.
- A proposta de valor do Fio a Fio já contemplava stories, curtidas, comentários, seguidores e compartilhamento de trabalhos.
- A Matriz CRUD foi ampliada para representar operações de criação, consulta, atualização e exclusão nas sete entidades consideradas.
- A Matriz Perfil × Funcionalidade foi atualizada para refletir os novos casos de uso e as responsabilidades dos atores.
- A priorização mantém o foco no processo de negócio principal: **compra e acesso a uma vídeo-aula**.
- As demais funcionalidades foram organizadas conforme sua contribuição para funcionamento, suporte e engajamento da comunidade.

---

# 17. Identidade visual

As cores definidas como principais para o sistema são rosa e preto, complementadas por tons de apoio.

| Cor/tonalidade | Uso |
|---|---|
| Rose bebê | Fundo e áreas suaves |
| Rosa claro | Cards e elementos secundários |
| Rosa médio | Botões e elementos interativos |
| Preto | Textos, títulos e destaques |
| Off-white | Fundo principal |
| Cinza | Textos secundários |

---

# 18. Estrutura conceitual do sistema

De forma consolidada, o Fio a Fio pode ser entendido como a integração de três grandes áreas:

### 18.1 Comunidade

- perfis;
- publicações;
- stories;
- seguidores;
- curtidas;
- comentários;
- compartilhamento;
- pesquisa de conteúdos e usuários.

### 18.2 Aprendizado

- materiais gratuitos;
- revistas;
- PDFs;
- gráficos;
- receitas;
- apostilas;
- moldes;
- tutoriais;
- vídeo-aulas.

### 18.3 Comercialização

- cadastro de vídeo-aulas;
- consulta de vídeo-aulas;
- compra;
- pagamento;
- confirmação;
- atualização do status da compra;
- liberação do conteúdo;
- acesso;
- avaliação;
- consulta de compras;
- consulta de vendas.

O processo comercial de vídeo-aulas constitui o processo de negócio principal utilizado como referência para a validação e priorização dos requisitos.

---

# 19. Observações de consistência documental

Durante a consolidação dos documentos, foi identificada uma diferença de numeração entre a documentação inicial e a documentação de validação.

### Documentação inicial

Os casos de uso vão de **UC01 a UC18**, com, por exemplo:

- UC04 — Publicar conteúdo;
- UC05 — Interagir com publicação;
- UC10 — Cadastrar vídeo-aula;
- UC12 — Comprar vídeo-aula;
- UC18 — Consultar vendas.

### Documentação de validação

A validação amplia os casos de uso até **UC30** e utiliza outra distribuição numérica. Nessa estrutura:

- UC04 — Excluir conta;
- UC05 — Publicar conteúdo;
- UC09 — Interagir com publicação;
- UC19 — Cadastrar vídeo-aula;
- UC23 — Comprar vídeo-aula;
- UC30 — Excluir material gratuito.

Essa diferença foi **preservada e explicitada**, em vez de atribuir uma numeração nova sem indicação nos documentos originais.

Para uma futura versão definitiva da especificação, recomenda-se adotar uma única numeração de casos de uso e atualizar todas as matrizes e referências para utilizar essa mesma numeração.

---

# 20. Resumo do sistema para análise por IA

O **Fio a Fio** é uma plataforma digital especializada em crochê que combina uma rede social, uma área de aprendizado e um ambiente de comercialização de vídeo-aulas.

Seu público inclui crocheteiros, artesãos, professores e entusiastas. Os usuários podem criar perfis, publicar trabalhos, seguir outros usuários, interagir com conteúdos, visualizar stories, pesquisar informações e acessar materiais gratuitos.

Os criadores/professores possuem funcionalidades adicionais para cadastrar, gerenciar e comercializar vídeo-aulas. O sistema utiliza um serviço externo para processamento de pagamentos e registra as compras dos usuários.

O processo de negócio principal é a **compra e o acesso a uma vídeo-aula de crochê**, composto pelas etapas de descoberta, seleção, consulta das informações, compra, pagamento, confirmação, liberação, acesso e avaliação.

A validação dos requisitos utiliza **Matriz CRUD, Matriz Perfil × Funcionalidade, definição de responsáveis e priorização dos requisitos**. A priorização coloca o fluxo comercial de vídeo-aulas como núcleo do negócio, seguido pelas funcionalidades estruturais e, posteriormente, pelas funcionalidades de engajamento da comunidade.

O modelo de receita proposto inicialmente estabelece uma divisão de **85% para o criador/professor e 15% para a plataforma**.

As entidades consideradas na validação são:

1. Usuário;
2. Publicação;
3. Relacionamento/Seguidor;
4. Story;
5. Vídeo-aula;
6. Compra;
7. Material.

A documentação deve ser entendida como uma consolidação dos dois documentos fornecidos, mantendo explícitas as diferenças existentes entre a definição inicial do projeto e a etapa posterior de validação dos requisitos.