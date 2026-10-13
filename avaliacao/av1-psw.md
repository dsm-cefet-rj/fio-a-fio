# Correção da AV1 — PSW — Fio a Fio

Repositório: https://github.com/leticiamendsnt/fio-a-fio/

A nota de cada aluno é a parte comum do grupo mais a qualidade individual. Sem autoria efetiva na própria parte, a AV1 fica 0. A parte comum vale 60 pontos: stack da disciplina (30) e escopo funcionando (30). Os 40 restantes avaliam a qualidade do que o próprio aluno fez.

| Aluno | Nota |
| --- | ---: |
| Maria Clara Mousinho de Salles | 77 |
| Letícia Mendonça dos Santos | 73 |

## Parte comum — 37/60

A correção usou a branch `develop`, que o README chama de principal e integra o JSON Server. A branch `feature/frontend-ui-react`, que o clone inicial apontou como padrão, para no setup de 22/09, antes dessa API.

A stack vale 15/30.

- 5 pontos. React com rotas de feed, perfil, stories, vídeo-aulas, compra, criador e administração.
- 0. React Hook Form não está no `package.json` nem no código. Os formulários usam `useState`.
- 0. Zod não está no projeto.
- 0. TanStack Query 5 está no projeto e lê as coleções com `useQuery`. As gravações passam por `fetch` em `frontend/src/services/api.js` e depois invalidam a consulta. Não há `useMutation`.
- 5 pontos. O JSON Server sobe com `npm run dev --prefix backend` na porta 3001. O pacote pede Node 22 e avisou o motor nesta máquina; a API mesmo assim atendeu.
- 5 pontos. Tailwind é o framework de interface.

O escopo vale 22/30. A régua é a matriz da `DocumentacaoFioAFio.md`. O núcleo pedido é vídeo-aula e compra. Entrei com Maria (`maria@fioafio.com`) e Ana (`ana@fioafio.com`), as contas do README.

- 8 pontos, vídeo-aula, de 10. Maria cadastrou "Aula AV1 Granny", que ficou em `GET /videoLessons` como `ZhI_LP4PbD0`, R$ 29,90. A edição mudou o preço para R$ 19,90, e a ficha pública mostrou esse valor. Excluir a aula não existe. Em `PersistedContentManagementPage.jsx` a administração desativa com `PATCH` e mantém o registro.
- 6 pontos, compra, de 8. Ana abriu o resumo de R$ 19,90, com R$ 16,91 para a criadora, e confirmou o Pix simulado. A compra `t_F33AbfxQ4` ficou `Concluído` na API. O histórico não oferece cancelar a compra.
- 4 pontos, comunidade, de 6. O feed da Maria e o da Ana listaram publicações e comentários vindos da API. Criar, editar e excluir publicação não foram concluídos nesta correção.
- 4 pontos, conta, de 6. O login das duas contas abriu o feed no nome certo. Cadastro e exclusão de conta não foram percorridos.

O commit de Matheus Cunha Schwab, "docs(gpti): artefatos da AV1", está na branch de documentação de GPTI. A documentação de PSW lista Letícia e Maria Clara.

## Maria Clara Mousinho de Salles — 77

Os commits de navegação, landing, perfil, modal de publicação e chat estão no nome dela. A nota reúne os 37 pontos do grupo e 40 de qualidade.

O feed que a correção abriu usa essa navegação e lista as publicações da API, com curtidas e comentários. A troca de conta entre Maria e Ana manteve o nome certo no cabeçalho.

## Letícia Mendonça dos Santos — 73

O setup do React, a refatoração visual e o commit que integra o JSON Server estão no nome dela. A nota reúne os 37 pontos do grupo e 36 de qualidade.

Desconto na parte individual:

- 4 pontos. Em `frontend/src/pages/auth/LoginPage.jsx`, o envio grava a mensagem "Login realizado com carinho! Bem-vinda de volta" antes de localizar o usuário. A conta suspensa recebe o texto "Esta conta estÃ¡ suspensa", com a palavra quebrada.

A aula criada, a alteração de preço e a compra da Ana passaram por `frontend/src/services/api.js`, que só segue em frente quando a resposta vem com sucesso. O catálogo do criador mostrou a aula nova.
