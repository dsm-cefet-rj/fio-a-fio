// MOCK DE CONVERSAS E MENSAGENS PRIVADAS
export const MOCK_CONVERSATIONS = [
  {
    id: "conv-1",
    participants: [
      {
        id: "usr-1",
        name: "Ana Silva",
        username: "anacroche",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        role: "user"
      },
      {
        id: "usr-2",
        name: "Maria Bordadeira",
        username: "mariabordadeira",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        role: "creator",
        verifiedCreator: true
      }
    ],
    lastMessage: {
      text: "Oi Maria! Amei sua aula de cardigan, tirei uma dúvida sobre a medida do tamanho P!",
      timestamp: "10:42",
      senderId: "usr-1",
      read: false
    },
    unreadCount: 1,
    messages: [
      {
        id: "msg-1",
        senderId: "usr-2",
        text: "Olá Ana! Seja muito bem-vinda à comunidade Fio a Fio 🧶! Qualquer dúvida nas receitas pode me mandar por aqui.",
        timestamp: "Ontem 18:30"
      },
      {
        id: "msg-2",
        senderId: "usr-1",
        text: "Muito obrigada, professora! Estou fazendo o cardigan de hexágonos.",
        timestamp: "Ontem 18:35"
      },
      {
        id: "msg-3",
        senderId: "usr-1",
        text: "Oi Maria! Amei sua aula de cardigan, tirei uma dúvida sobre a medida do tamanho P!",
        timestamp: "10:42"
      }
    ]
  },
  {
    id: "conv-2",
    participants: [
      {
        id: "usr-1",
        name: "Ana Silva",
        username: "anacroche",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      },
      {
        id: "usr-3",
        name: "Júlia C.",
        username: "juliacroche",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
      }
    ],
    lastMessage: {
      text: "Quais fios você costuma usar para amigurumi?",
      timestamp: "Segunda",
      senderId: "usr-3",
      read: true
    },
    unreadCount: 0,
    messages: [
      {
        id: "msg-201",
        senderId: "usr-1",
        text: "Oi Júlia! Vi sua publicação dos polvinhos para doação, ficou lindo demais!",
        timestamp: "Segunda 14:10"
      },
      {
        id: "msg-202",
        senderId: "usr-3",
        text: "Ahhh muito obrigada Ana! ❤️ Dá um trabalho mas vale super a pena!",
        timestamp: "Segunda 14:15"
      },
      {
        id: "msg-203",
        senderId: "usr-3",
        text: "Quais fios você costuma usar para amigurumi?",
        timestamp: "Segunda 14:16"
      }
    ]
  },
  {
    id: "conv-3",
    participants: [
      {
        id: "usr-1",
        name: "Ana Silva",
        username: "anacroche",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      },
      {
        id: "usr-4",
        name: "Admin Fio a Fio",
        username: "admin",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        role: "admin"
      }
    ],
    lastMessage: {
      text: "Sua dúvida sobre a comunidade foi atendida.",
      timestamp: "12 de Set",
      senderId: "usr-4",
      read: true
    },
    unreadCount: 0,
    messages: [
      {
        id: "msg-301",
        senderId: "usr-4",
        text: "Bem-vinda à plataforma Fio a Fio! Se precisar de suporte técnico, conte conosco.",
        timestamp: "12 de Set 10:00"
      }
    ]
  }
];
