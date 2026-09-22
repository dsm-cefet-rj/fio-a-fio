// MOCK TEMPORÁRIO — substituir posteriormente pela API/backend.

export const MOCK_ADMIN_STATS = {
  totalUsers: 12480,
  activeCreators: 340,
  publishedCourses: 128,
  totalPosts: 45890,
  pendingModerationPosts: 4,
  pendingReports: 2,
  platformRevenueMonth: 14250.00,
  recentUsers: [
    { id: "usr-10", name: "Helena Castro", email: "helena@email.com", role: "user", status: "Ativo", date: "Hoje" },
    { id: "usr-11", name: "Beatriz Ramos", email: "biaramos@email.com", role: "creator", status: "Em Análise", date: "Ontem" },
    { id: "usr-12", name: "Marcos Vinicius", email: "mvcroche@email.com", role: "user", status: "Ativo", date: "18/03" }
  ],
  reportedPosts: [
    { id: "rep-1", postTitle: "Venda fora da plataforma", author: "UsuarioFake123", reason: "Spam", date: "Hoje" },
    { id: "rep-2", postTitle: "Conteúdo inapropriado", author: "CrocheMaluco", reason: "Violação de Termos", date: "Ontem" }
  ]
};
