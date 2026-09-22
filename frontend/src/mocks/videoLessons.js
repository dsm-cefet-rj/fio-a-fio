// MOCK TEMPORÁRIO — substituir posteriormente pela API/backend.

export const MOCK_VIDEO_LESSONS = [
  {
    id: "aula-101",
    title: "Cardigan de Hexágonos em Crochê Moderno",
    subtitle: "Aprenda a criar um cardigan elegante e versátil usando a técnica do hexágono continuo.",
    description: "Neste curso completo, você aprenderá do zero a confeccionar um cardigan impecável. Vamos passar pela escolha dos fios ideais, cálculo de medidas para diferentes tamanhos (P ao EGG), montagem dos hexágonos, arremates invisíveis e acabamentos profissionais em ponto barra.",
    price: 49.90,
    rating: 4.9,
    reviewsCount: 38,
    duration: "2h 45min",
    level: "Intermediário",
    category: "Vestuário",
    thumbnail: "https://images.unsplash.com/photo-1619252584172-a83a949b6efd?w=800&auto=format&fit=crop&q=80",
    creator: {
      id: "usr-2",
      name: "Maria Bordadeira",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      bio: "Professora com +10 anos ensinando milhares de crocheteiras pelo Brasil."
    },
    studentsCount: 312,
    requirements: [
      "Conhecimentos básicos de crochê (correntinha, ponto alto e ponto baixo)",
      "Agulha de crochê 4.0mm",
      "Fio de algodão de sua preferência (aprox. 500g)",
      "Fita métrica e tesoura"
    ],
    whatYouWillLearn: [
      "Estruturar os hexágonos perfeitos sem enrolar as bordas",
      "Calcular a quantidade exata de fio para qualquer tamanho",
      "União invisível de peças com agulha de tapeceiro",
      "Acabamento de punhos e gola com caimento perfeito"
    ],
    modules: [
      {
        title: "Módulo 1: Apresentação e Materiais",
        lessons: [
          { id: "les-1", title: "Boas-vindas e Lista de Materiais", duration: "12 min", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "les-2", title: "Escolha dos Fios e Tensão do Ponto", duration: "18 min", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      },
      {
        title: "Módulo 2: Confecção da Peça",
        lessons: [
          { id: "les-3", title: "Primeiro Hexágono Passo a Passo", duration: "35 min", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "les-4", title: "Dobras e União das Costas", duration: "40 min", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      },
      {
        title: "Módulo 3: Mangas e Acabamentos",
        lessons: [
          { id: "les-5", title: "Crescimento das Mangas e Gola", duration: "30 min", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "les-6", title: "Arremates Finais e Bloqueio", duration: "30 min", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      }
    ]
  },
  {
    id: "aula-102",
    title: "Bolsa Boho Fio de Malha com Alça de Couro",
    subtitle: "Domine o ponto baixo centrado e crie bolsas estruturadas de alto valor de venda.",
    description: "Aprenda a trabalhar com fio de malha criando uma bolsa estruturada estilo Boho. O curso cobre a confecção da base oval, subida sem emenda aparente e aplicação de fechos e alças de couro sintético.",
    price: 35.00,
    rating: 4.8,
    reviewsCount: 24,
    duration: "1h 50min",
    level: "Iniciante",
    category: "Acessórios",
    thumbnail: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80",
    creator: {
      id: "usr-2",
      name: "Maria Bordadeira",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    },
    studentsCount: 184,
    requirements: ["Conhecimento de ponto baixo"],
    whatYouWillLearn: ["Criar bases ovais sem buracos", "Estruturação de bolsa com fio de malha"],
    modules: [
      {
        title: "Módulo Único: Passo a Passo Completo",
        lessons: [
          { id: "les-b1", title: "Base e Subida da Bolsa", duration: "50 min", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "les-b2", title: "Aplicação das Alças e Forro", duration: "60 min", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      }
    ]
  },
  {
    id: "aula-103",
    title: "Manta Primavera de Square Floral",
    subtitle: "Manta aconchegante feita de flores em alto relevo e moldura em ponto leque.",
    description: "Um curso relaxante e encantador para quem quer dominar o crochê modular e criar peças de decoração inesquecíveis.",
    price: 59.90,
    rating: 5.0,
    reviewsCount: 15,
    duration: "3h 10min",
    level: "Avançado",
    category: "Decoração",
    thumbnail: "https://images.unsplash.com/photo-1606744824163-985d376605aa?w=800&auto=format&fit=crop&q=80",
    creator: {
      id: "usr-2",
      name: "Maria Bordadeira",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    },
    studentsCount: 96,
    requirements: ["Leitura de gráficos e domínio de pontos altos duplos"],
    whatYouWillLearn: ["Flores 3D em crochê", "Montagem de mantas grandes"],
    modules: []
  }
];
