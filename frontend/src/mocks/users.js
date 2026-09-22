// MOCK TEMPORÁRIO — substituir posteriormente pela API/backend.

export const MOCK_USERS = [
  {
    id: "usr-1",
    name: "Ana Silva",
    username: "anacroche",
    email: "ana@fioafio.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "Apaixonada por amigurumis e fios de algodão natural 🧶💫",
    followersCount: 142,
    followingCount: 89,
    location: "São Paulo, SP",
    joinedDate: "Março 2024"
  },
  {
    id: "usr-2",
    name: "Maria Bordadeira",
    username: "mariabordadeira",
    email: "maria@fioafio.com",
    role: "creator",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    bio: "Professora de crochê com mais de 10 anos de experiência. Especialista em cardigans e vestuário.",
    followersCount: 3450,
    followingCount: 120,
    location: "Belo Horizonte, MG",
    joinedDate: "Janeiro 2023",
    verifiedCreator: true
  },
  {
    id: "usr-3",
    name: "Júlia C.",
    username: "juliacroche",
    email: "julia@fioafio.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    bio: "Crocheteira nas horas vagas 🌸 Amante de mantas de sofás.",
    followersCount: 88,
    followingCount: 210,
    joinedDate: "Fevereiro 2024"
  },
  {
    id: "usr-4",
    name: "Admin Fio a Fio",
    username: "admin",
    email: "admin@fioafio.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    bio: "Conta oficial de moderação e administração da comunidade Fio a Fio.",
    followersCount: 10500,
    followingCount: 0,
    joinedDate: "Janeiro 2023"
  }
];

export const CURRENT_USER = MOCK_USERS[0];
