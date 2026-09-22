# Fio a Fio — protótipo acadêmico

Protótipo frontend estático para representar os requisitos da rede social de crochê Fio a Fio. Esta entrega prioriza estrutura semântica, reutilização e navegação; não há backend, autenticação nem pagamentos reais.

## Estrutura

```text
frontend/
├── public/
│   ├── index.html            # ponto de entrada
│   ├── login.html
│   ├── cadastro.html
│   └── pages/
│       ├── admin/            # telas de moderação e administração
│       ├── criador/          # telas exclusivas do criador
│       └── ...               # telas gerais do usuário
├── src/
│   ├── components/
│   │   └── site-layout.js    # cabeçalho e rodapé compartilhados
│   └── scripts/
│       └── interactions.js   # interações locais do protótipo
└── README.md
```

O componente `src/components/site-layout.js` monta a navegação conforme o perfil (`user`, `creator`, `admin` ou `auth`). Assim, links compartilhados não precisam ser copiados e mantidos em cada página.

## Fluxo principal

`videoaulas.html` → `videoaula-detalhes.html` → `compra.html` → `pagamento.html` → `confirmacao-compra.html` → `biblioteca.html` → `assistir.html` → `avaliacao.html`

## Casos de uso

- UC01–UC02: cadastro e login.
- UC03–UC08: perfil, publicações, interações, seguidores, stories e pesquisa.
- UC09: materiais gratuitos.
- UC10, UC17–UC18: cadastro, gestão e vendas do criador.
- UC11–UC16: consulta, compra, pagamento simulado, biblioteca, avaliação e histórico de compras.

## Execução

Abra `public/index.html` no navegador. Os formulários, curtidas, seguir, busca e avaliação são simulações no navegador. Não há CSS carregado nesta etapa estrutural.
