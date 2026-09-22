// MOCK TEMPORÁRIO — substituir posteriormente pela API/backend.

export const MOCK_PURCHASES = [
  {
    id: "pur-1001",
    date: "15/03/2024",
    status: "Concluído",
    amount: 49.90,
    paymentMethod: "Cartão de Crédito",
    lesson: {
      id: "aula-101",
      title: "Cardigan de Hexágonos em Crochê Moderno",
      thumbnail: "https://images.unsplash.com/photo-1619252584172-a83a949b6efd?w=800&auto=format&fit=crop&q=80",
      creatorName: "Maria Bordadeira",
      progressPercent: 40
    }
  },
  {
    id: "pur-1002",
    date: "02/02/2024",
    status: "Concluído",
    amount: 35.00,
    paymentMethod: "PIX",
    lesson: {
      id: "aula-102",
      title: "Bolsa Boho Fio de Malha com Alça de Couro",
      thumbnail: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80",
      creatorName: "Maria Bordadeira",
      progressPercent: 100
    }
  }
];
