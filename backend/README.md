# API mock de desenvolvimento

Esta pasta contém somente o JSON Server usado para servir dados de demonstração ao frontend. Não é um backend de produção e não implementa autenticação, pagamentos ou regras de negócio.

## Executar

Na raiz do repositório:

```sh
npm run dev --prefix backend
```

O servidor fica em `http://localhost:3001`. Em outro terminal, inicie o frontend:

```sh
npm run dev --prefix frontend
```

O frontend lê `VITE_API_URL` se estiver configurada; sem ela, usa `http://localhost:3001`.

## Recursos

`db.json` contém somente dados que já existiam nos mocks: `users`, `posts`, `comments`, `stories`, `conversations`, `messages`, `materials`, `videoLessons`, `purchases`, `sales`, `salesSummary` e `adminDashboard`.

Posts, comentários, conversas, mensagens, stories, aulas e compras usam IDs de referência para reduzir dados duplicados. O serviço do frontend recompõe as estruturas aninhadas esperadas pelos componentes atuais.

Rotas úteis para conferir a API: `/users`, `/posts`, `/posts/post-1`, `/comments`, `/messages`, `/videoLessons` e `/adminDashboard`. Os métodos de escrita alteram o arquivo local `db.json`; descarte ou restaure essas alterações quando quiser voltar à fixture inicial.

Os arquivos em `frontend/src/mocks` são mantidos como fonte da fixture inicial e referência dos dados originais. As telas consomem os serviços HTTP, não importam esses mocks diretamente.
