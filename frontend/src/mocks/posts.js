// MOCK TEMPORÁRIO — substituir posteriormente pela API/backend.

export const MOCK_POSTS = [
  {
    id: "post-1",
    author: {
      name: "Maria Bordadeira",
      username: "mariabordadeira",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      verified: true
    },
    title: "Meu primeiro cardigan de squares 🌷",
    content: "Foram 42 quadradinhos (granny squares) e muito café ao longo do final de semana. O que vocês acharam dessa combinação de tons pastéis?",
    image: "https://images.unsplash.com/photo-1619252584172-a83a949b6efd?w=800&auto=format&fit=crop&q=80",
    likesCount: 142,
    isLiked: false,
    commentsCount: 18,
    timeAgo: "há 18 min",
    category: "Vestuário",
    comments: [
      {
        id: "c-1",
        author: {
          name: "Ana Silva",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        },
        text: "Ficou simplesmente maravilhoso! Qual agulha você usou?",
        timeAgo: "há 10 min"
      },
      {
        id: "c-2",
        author: {
          name: "Júlia C.",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
        },
        text: "Essa combinação de cores é perfeita para o outono! ❤️",
        timeAgo: "há 5 min"
      }
    ]
  },
  {
    id: "post-2",
    author: {
      name: "Júlia C.",
      username: "juliacroche",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
    },
    title: "Amigurumi de Polvinho para doação 🐙",
    content: "Terminei hoje essa remessa de polvinhos para a UTI Neonatal da minha cidade. O crochê aquece o coração de quem faz e de quem recebe!",
    image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80",
    likesCount: 89,
    isLiked: true,
    commentsCount: 7,
    timeAgo: "há 2 horas",
    category: "Amigurumi",
    comments: []
  },
  {
    id: "post-3",
    author: {
      name: "Rafa S.",
      username: "rafacrochet",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    title: "Trilho de Mesa em Fio de Malha ✨",
    content: "Super rápido de fazer e dá um charme especial na sala de jantar. Quem quiser a receita simplificada, mande um oi!",
    image: "https://images.unsplash.com/photo-1606744824163-985d376605aa?w=800&auto=format&fit=crop&q=80",
    likesCount: 56,
    isLiked: false,
    commentsCount: 3,
    timeAgo: "há 5 horas",
    category: "Decoração",
    comments: []
  }
];
