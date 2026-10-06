# Fio a Fio

Fio a Fio é uma aplicação acadêmica que reúne uma comunidade de pessoas interessadas em crochê. O sistema combina recursos sociais — publicações, comentários, stories, perfis e conversas — com materiais de aprendizagem e videoaulas de criadores. Também inclui áreas de estudante, criador e administração.

O projeto é composto por uma interface React responsiva e uma API local de demonstração baseada em JSON Server. Os dados usados pela aplicação ficam em `backend/db.json`. A solução é destinada a estudo e demonstração: autenticação, pagamentos e regras de negócio não têm segurança de produção.

## Estrutura do projeto

```text
.
├── backend/
│   ├── db.json                 # banco JSON local usado pela API
│   ├── package.json            # inicialização do JSON Server
│   └── README.md               # notas sobre a API de demonstração
├── frontend/
│   ├── index.html              # entrada da aplicação Vite
│   ├── package.json            # scripts e dependências React/Vite
│   └── src/
│       ├── components/         # layout, navegação e componentes de interface
│       ├── context/            # estado de perfil e conversas
│       ├── hooks/              # hooks de acesso e estado de dados
│       ├── mocks/              # dados de referência para as fixtures
│       ├── pages/              # telas agrupadas por área funcional
│       └── services/           # comunicação HTTP com a API
├── DocumentacaoFioAFio.md      # documentação de requisitos e análise
└── README.md                   # instalação, operação e uso
```

As páginas estão organizadas em `auth`, `community`, `learning`, `checkout`, `student`, `creator` e `admin`. A API expõe coleções como `users`, `posts`, `comments`, `stories`, `conversations`, `messages`, `materials`, `videoLessons`, `purchases`, `sales`, `salesSummary` e `adminDashboard`.

## Requisitos

- Node.js e npm instalados.
- Um navegador atualizado.
- Acesso local às portas `3001` (API) e `5173` (interface), ou portas alternativas se estiverem ocupadas.

## Instalação

Na raiz do repositório, instale as dependências de cada aplicação:

```bash
npm ci --prefix backend
npm ci --prefix frontend
```

Se não houver um arquivo de lock correspondente ou se as dependências tiverem sido alteradas intencionalmente, use `npm install --prefix backend` e `npm install --prefix frontend`.

## Operação e inicialização

O sistema precisa dos dois processos ativos. Abra dois terminais na raiz do projeto.

No primeiro terminal, inicie a API:

```bash
npm run dev --prefix backend
```

A API ficará disponível em `http://localhost:3001`. No segundo terminal, inicie a interface:

```bash
npm run dev --prefix frontend
```

Abra o endereço local indicado pelo Vite, normalmente `http://localhost:5173`. Para encerrar cada processo, use `Ctrl+C` no terminal correspondente.

O frontend usa `http://localhost:3001` como endereço padrão da API. Para alterar esse endereço, crie `frontend/.env.local` com:

```env
VITE_API_URL=http://localhost:3001
```

O JSON Server grava as alterações no arquivo `backend/db.json`; portanto, dados podem continuar alterados entre execuções. Antes de uma demonstração importante, faça uma cópia desse arquivo para preservar a fixture inicial. A API também pode ser consultada diretamente em endereços como `http://localhost:3001/users`, `/posts`, `/comments` e `/videoLessons`.

### Compilar a interface

Para gerar a versão estática do frontend:

```bash
npm run build --prefix frontend
```

Os arquivos compilados são gravados em `frontend/dist`. Esse comando compila apenas a interface e não implanta nem configura a API.

## Manual do usuário

### Acesso e navegação

1. Abra o endereço do frontend no navegador.
2. Entre com uma conta de demonstração ou acesse o cadastro para criar uma conta local.
3. Use a navegação principal para abrir o feed, stories, pesquisa, conversas, materiais, videoaulas, biblioteca, perfil ou as ferramentas do seu perfil.
4. A aplicação oferece perfis de usuário, criador e administrador. A troca de perfil disponível no protótipo serve para demonstração; ela não substitui controle de acesso seguro.

Contas de demonstração existentes em `backend/db.json`:

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Usuário | `ana@fioafio.com` | `1234` |
| Criador | `maria@fioafio.com` | `1234` |
| Administrador | `admin@fioafio.com` | `admin123` |

As credenciais são dados de demonstração armazenados no JSON local. Não as reutilize em outros serviços.

### Comunidade

- **Feed e publicações:** consulte publicações, abra uma publicação para ver seus detalhes e comentários, curta e participe da conversa. Em **Criar publicação**, informe o conteúdo e, quando desejar, selecione uma foto e envie a publicação. Publicações novas aguardam aprovação administrativa antes de aparecerem no feed.
- **Comentários:** abra os detalhes da publicação, escreva no campo de comentário e envie. A lista de comentários pertence à publicação aberta; em telas estreitas, use a rolagem do conteúdo para ler e responder sem depender de uma janela fixa.
- **Stories:** abra a área de stories e use a ação de criar para publicar uma atualização. O protótipo permite informar o conteúdo e a mídia conforme os campos apresentados na tela.
- **Pesquisa:** digite um termo para encontrar perfis, publicações ou conteúdos oferecidos pela aplicação.
- **Perfil:** veja publicações e informações de uma conta. Em editar perfil, atualize os campos apresentados e salve as alterações.
- **Conversas:** abra o chat, selecione uma conversa e envie mensagens pelo campo de composição. As conversas e mensagens de demonstração usam a API local.

### Aprendizagem e compras

- **Materiais:** abra o catálogo, selecione um material e consulte seus detalhes e recurso disponível.
- **Videoaulas:** navegue pelo catálogo, abra uma aula para consultar informações e siga o fluxo de compra apresentado na tela.
- **Pagamento:** preencha os dados solicitados e conclua a simulação. O sistema registra a compra localmente; nenhum pagamento real é processado.
- **Biblioteca e compras:** consulte aulas adquiridas e o histórico nas áreas correspondentes. Abra uma aula da biblioteca para acessar a tela de reprodução.
- **Avaliação:** use a tela de avaliação depois de assistir. Algumas ações de avaliação e acesso a materiais são apenas demonstrativas e não representam uma transação externa.

### Ferramentas do criador

Na área **Criador**, consulte as videoaulas cadastradas, abra o formulário para cadastrar uma aula, edite os dados disponíveis e veja o relatório de vendas de demonstração. A disponibilidade de uma aula pode ser gerenciada nas ferramentas administrativas. Dados de vendas e pagamento não correspondem a processamento financeiro real.

### Ferramentas de administração

Na área **Administração**, o painel mostra indicadores e links para as telas de gestão:

- **Usuários:** suspenda ou reative contas. A suspensão é gravada no registro do usuário; contas suspensas não devem conseguir entrar pelo fluxo de login da demonstração. A própria conta administrativa não pode ser suspensa pela tela.
- **Publicações:** aprove uma publicação pendente para torná-la visível, remova uma publicação ou restaure uma removida. A moderação atualiza seu estado no JSON; publicações removidas ficam registradas para permitir restauração.
- **Conteúdos:** desative ou reative videoaulas e remova materiais. A desativação mantém a aula registrada, mas a retira das áreas públicas; a remoção de um material apaga seu registro local.

Mantenha a API ligada ao executar operações administrativas. Se houver erro de conexão, confirme que o servidor da porta `3001` está ativo e recarregue os dados antes de repetir a ação.

## Limites do protótipo

O JSON Server é uma API local de desenvolvimento. O sistema não implementa autenticação e autorização seguras, recuperação de senha, armazenamento seguro de credenciais, processamento de pagamento, nem garantias de disponibilidade ou proteção de dados. Algumas interações da interface são simulações e não persistem. As funcionalidades de administração descritas acima gravam as operações suportadas no `db.json`, mas não devem ser expostas como serviço público.

## Histórico do repositório

Histórico consultado em 06/10/2026 no repositório público [leticiamendsnt/fio-a-fio](https://github.com/leticiamendsnt/fio-a-fio). A branch padrão é `develop`. As listas abaixo mostram os commits alcançáveis em cada branch nesse momento. Como há commits compartilhados entre branches, algumas mensagens se repetem.

### `develop` (branch principal do projeto)

| Data | Commit | Mensagem |
| --- | --- | --- |
| 06/10/2026 | [`158bace`](https://github.com/leticiamendsnt/fio-a-fio/commit/158bace1556ad4d3f33bf305035c20ad01a35b61) | `feat: corrige abas, integra JSON Server e atualiza a documentação` |
| 03/10/2026 | [`31c2a14`](https://github.com/leticiamendsnt/fio-a-fio/commit/31c2a14db389f680495adcc7c5684cb8cbc31446) | `Ajustes na tela do chat` |
| 03/10/2026 | [`2d59a27`](https://github.com/leticiamendsnt/fio-a-fio/commit/2d59a278b51df115268fb620d95a3065383f45a2) | `Correção do design dealgumas possíbilidades da página do usuário` |
| 03/10/2026 | [`46bfb80`](https://github.com/leticiamendsnt/fio-a-fio/commit/46bfb800c0e22d92eea932e1230cf16680739dcf) | `atualizacao da navegacao, landing page e transicao de perfil` |
| 02/10/2026 | [`e2eeae8`](https://github.com/leticiamendsnt/fio-a-fio/commit/e2eeae899d6e963c9164143991944f28b7ad3f30) | `feat(ui/ux): refatoração visual, nova logo SVG e otimização da navegação` |
| 27/09/2026 | [`53e3f74`](https://github.com/leticiamendsnt/fio-a-fio/commit/53e3f749c799a07618b0675609d2b52236990ea2) | `Alterações na barra de navegação, mudança das páginas de comentários e publicação para um modal, e acréscimo de um botão de 'Criar Publicação' no perfil do usuário` |
| 22/09/2026 | [`bc7c17d`](https://github.com/leticiamendsnt/fio-a-fio/commit/bc7c17d3204bdbd25fd5bd9d9204f6ef0c114780) | `feat(frontend): setup inicial do app React com Vite, Tailwind CSS e 27 telas` |

### `feat/implementacao-jsonserver`

| Data | Commit | Mensagem |
| --- | --- | --- |
| 06/10/2026 | [`158bace`](https://github.com/leticiamendsnt/fio-a-fio/commit/158bace1556ad4d3f33bf305035c20ad01a35b61) | `feat: corrige abas, integra JSON Server e atualiza a documentação` |
| 03/10/2026 | [`31c2a14`](https://github.com/leticiamendsnt/fio-a-fio/commit/31c2a14db389f680495adcc7c5684cb8cbc31446) | `Ajustes na tela do chat` |
| 03/10/2026 | [`2d59a27`](https://github.com/leticiamendsnt/fio-a-fio/commit/2d59a278b51df115268fb620d95a3065383f45a2) | `Correção do design dealgumas possíbilidades da página do usuário` |
| 03/10/2026 | [`46bfb80`](https://github.com/leticiamendsnt/fio-a-fio/commit/46bfb800c0e22d92eea932e1230cf16680739dcf) | `atualizacao da navegacao, landing page e transicao de perfil` |
| 02/10/2026 | [`e2eeae8`](https://github.com/leticiamendsnt/fio-a-fio/commit/e2eeae899d6e963c9164143991944f28b7ad3f30) | `feat(ui/ux): refatoração visual, nova logo SVG e otimização da navegação` |
| 27/09/2026 | [`53e3f74`](https://github.com/leticiamendsnt/fio-a-fio/commit/53e3f749c799a07618b0675609d2b52236990ea2) | `Alterações na barra de navegação, mudança das páginas de comentários e publicação para um modal, e acréscimo de um botão de 'Criar Publicação' no perfil do usuário` |
| 22/09/2026 | [`bc7c17d`](https://github.com/leticiamendsnt/fio-a-fio/commit/bc7c17d3204bdbd25fd5bd9d9204f6ef0c114780) | `feat(frontend): setup inicial do app React com Vite, Tailwind CSS e 27 telas` |

### `docs/gpti-AV1`

| Data | Commit | Mensagem |
| --- | --- | --- |
| 06/10/2026 | [`f8813db`](https://github.com/leticiamendsnt/fio-a-fio/commit/f8813dbd03950802194a5f77bf188924f7326f5c) | `docs(gpti): artefatos da AV1` |
| 03/10/2026 | [`31c2a14`](https://github.com/leticiamendsnt/fio-a-fio/commit/31c2a14db389f680495adcc7c5684cb8cbc31446) | `Ajustes na tela do chat` |
| 03/10/2026 | [`2d59a27`](https://github.com/leticiamendsnt/fio-a-fio/commit/2d59a278b51df115268fb620d95a3065383f45a2) | `Correção do design dealgumas possíbilidades da página do usuário` |
| 03/10/2026 | [`46bfb80`](https://github.com/leticiamendsnt/fio-a-fio/commit/46bfb800c0e22d92eea932e1230cf16680739dcf) | `atualizacao da navegacao, landing page e transicao de perfil` |
| 02/10/2026 | [`e2eeae8`](https://github.com/leticiamendsnt/fio-a-fio/commit/e2eeae899d6e963c9164143991944f28b7ad3f30) | `feat(ui/ux): refatoração visual, nova logo SVG e otimização da navegação` |
| 27/09/2026 | [`53e3f74`](https://github.com/leticiamendsnt/fio-a-fio/commit/53e3f749c799a07618b0675609d2b52236990ea2) | `Alterações na barra de navegação, mudança das páginas de comentários e publicação para um modal, e acréscimo de um botão de 'Criar Publicação' no perfil do usuário` |
| 22/09/2026 | [`bc7c17d`](https://github.com/leticiamendsnt/fio-a-fio/commit/bc7c17d3204bdbd25fd5bd9d9204f6ef0c114780) | `feat(frontend): setup inicial do app React com Vite, Tailwind CSS e 27 telas` |

### `feat/frontend-landing-updates`

| Data | Commit | Mensagem |
| --- | --- | --- |
| 03/10/2026 | [`31c2a14`](https://github.com/leticiamendsnt/fio-a-fio/commit/31c2a14db389f680495adcc7c5684cb8cbc31446) | `Ajustes na tela do chat` |
| 03/10/2026 | [`2d59a27`](https://github.com/leticiamendsnt/fio-a-fio/commit/2d59a278b51df115268fb620d95a3065383f45a2) | `Correção do design dealgumas possíbilidades da página do usuário` |
| 03/10/2026 | [`46bfb80`](https://github.com/leticiamendsnt/fio-a-fio/commit/46bfb800c0e22d92eea932e1230cf16680739dcf) | `atualizacao da navegacao, landing page e transicao de perfil` |
| 02/10/2026 | [`e2eeae8`](https://github.com/leticiamendsnt/fio-a-fio/commit/e2eeae899d6e963c9164143991944f28b7ad3f30) | `feat(ui/ux): refatoração visual, nova logo SVG e otimização da navegação` |
| 27/09/2026 | [`53e3f74`](https://github.com/leticiamendsnt/fio-a-fio/commit/53e3f749c799a07618b0675609d2b52236990ea2) | `Alterações na barra de navegação, mudança das páginas de comentários e publicação para um modal, e acréscimo de um botão de 'Criar Publicação' no perfil do usuário` |
| 22/09/2026 | [`bc7c17d`](https://github.com/leticiamendsnt/fio-a-fio/commit/bc7c17d3204bdbd25fd5bd9d9204f6ef0c114780) | `feat(frontend): setup inicial do app React com Vite, Tailwind CSS e 27 telas` |

### `feat/refatoracao-ui-fio-a-fio`

| Data | Commit | Mensagem |
| --- | --- | --- |
| 02/10/2026 | [`e2eeae8`](https://github.com/leticiamendsnt/fio-a-fio/commit/e2eeae899d6e963c9164143991944f28b7ad3f30) | `feat(ui/ux): refatoração visual, nova logo SVG e otimização da navegação` |
| 27/09/2026 | [`53e3f74`](https://github.com/leticiamendsnt/fio-a-fio/commit/53e3f749c799a07618b0675609d2b52236990ea2) | `Alterações na barra de navegação, mudança das páginas de comentários e publicação para um modal, e acréscimo de um botão de 'Criar Publicação' no perfil do usuário` |
| 22/09/2026 | [`bc7c17d`](https://github.com/leticiamendsnt/fio-a-fio/commit/bc7c17d3204bdbd25fd5bd9d9204f6ef0c114780) | `feat(frontend): setup inicial do app React com Vite, Tailwind CSS e 27 telas` |

### `feature/frontend-ui-react` (branch padrão)

| Data | Commit | Mensagem |
| --- | --- | --- |
| 22/09/2026 | [`bc7c17d`](https://github.com/leticiamendsnt/fio-a-fio/commit/bc7c17d3204bdbd25fd5bd9d9204f6ef0c114780) | `feat(frontend): setup inicial do app React com Vite, Tailwind CSS e 27 telas` |

### `feature/frontend-update`

| Data | Commit | Mensagem |
| --- | --- | --- |
| 27/09/2026 | [`53e3f74`](https://github.com/leticiamendsnt/fio-a-fio/commit/53e3f749c799a07618b0675609d2b52236990ea2) | `Alterações na barra de navegação, mudança das páginas de comentários e publicação para um modal, e acréscimo de um botão de 'Criar Publicação' no perfil do usuário` |
| 22/09/2026 | [`bc7c17d`](https://github.com/leticiamendsnt/fio-a-fio/commit/bc7c17d3204bdbd25fd5bd9d9204f6ef0c114780) | `feat(frontend): setup inicial do app React com Vite, Tailwind CSS e 27 telas` |

### Observação sobre a documentação de gestão

A pasta `docs/gpti-AV1/`, registrada na branch de mesmo nome, contém artefatos preparados pela equipe responsável pela gestão do projeto. Esse material atende à organização e ao acompanhamento da atividade e não corresponde a conteúdo produzido pelo grupo responsável pela construção da aplicação. Sua presença no histórico do repositório é apresentada apenas para manter o registro completo das branches consultadas.

## Organização do grupo

A atividade previa a distribuição de tarefas entre os integrantes do grupo. Durante o desenvolvimento, o grupo contou com um integrante a menos do que o inicialmente esperado; as tentativas de contato realizadas não tiveram retorno no período do projeto. Para dar continuidade ao trabalho, as tarefas foram reorganizadas entre os integrantes ativos. Essa circunstância reduziu a possibilidade de dividir atividades em paralelo e exigiu maior priorização e ajustes na organização do desenvolvimento.

## Documentação relacionada

- [`DocumentacaoFioAFio.md`](DocumentacaoFioAFio.md): documentação acadêmica de requisitos, casos de uso e análise do projeto.
- [`backend/README.md`](backend/README.md): detalhes da API local e das coleções disponíveis.
