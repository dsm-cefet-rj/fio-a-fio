import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { useChat } from '../../context/ChatContext';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { Card, CardBody } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { PostCard } from '../../components/community/PostCard';
import { CreatePostModal } from '../../components/community/CreatePostModal';
import { MOCK_USERS } from '../../mocks/users';
import { MOCK_POSTS } from '../../mocks/posts';
import { MOCK_VIDEO_LESSONS } from '../../mocks/videoLessons';
import {
  MapPin,
  Calendar,
  Edit3,
  UserCheck,
  UserPlus,
  Grid,
  Video,
  PlusCircle,
  MessageCircle,
  CheckCircle2,
  BookMarked,
  Sparkles,
  Star,
  Clock,
  PlayCircle,
  Camera,
  Upload,
  X,
  Image as ImageIcon
} from 'lucide-react';

export const ProfilePage = () => {
  const { currentUser } = useRole();
  const { getOrCreateConversationWithUser } = useChat();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Determine profile user (either specified in query param or current context user)
  const targetUsername = searchParams.get('user') || searchParams.get('username');
  const profileUser = targetUsername
    ? MOCK_USERS.find(u => u.username === targetUsername || u.id === targetUsername) || currentUser
    : currentUser;

  const isOwnProfile = profileUser.id === currentUser.id || profileUser.username === currentUser.username;

  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'videoaulas' | 'saved'
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  // Cover photo state
  const PRESET_COVERS = [
    'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1615233500042-19e0bed80b87?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=1200&auto=format&fit=crop&q=80',
  ];

  const [coverImage, setCoverImage] = useState(
    profileUser.coverImage || PRESET_COVERS[0]
  );
  const [isChangeCoverOpen, setIsChangeCoverOpen] = useState(false);
  const [customCoverUrl, setCustomCoverUrl] = useState('');

  // Filter posts by user
  const userPosts = MOCK_POSTS.filter(
    (p) => p.author.username === profileUser.username || (isOwnProfile && currentUser.role === 'creator')
  );

  // Filter video lessons by creator
  const userVideoLessons = MOCK_VIDEO_LESSONS.filter(
    (v) => v.creator.id === profileUser.id || v.creator.name === profileUser.name
  );

  const handleSendMessage = () => {
    const convId = getOrCreateConversationWithUser(currentUser.id, profileUser);
    navigate(`/chat?conv=${convId}`);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCoverImage(event.target.result);
          setIsChangeCoverOpen(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyCustomUrl = (e) => {
    e.preventDefault();
    if (customCoverUrl.trim()) {
      setCoverImage(customCoverUrl.trim());
      setCustomCoverUrl('');
      setIsChangeCoverOpen(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative animate-fade-in">
      
      {/* Instagram-style Creator Profile Header Card */}
      <Card className="overflow-hidden border border-[#EADED5] shadow-craft bg-white rounded-3xl">
        {/* Soft Rosê Cover Banner with Image Support */}
        <div className="h-40 sm:h-52 bg-gradient-to-r from-[#E55B86] via-[#EF9FB1] to-[#E55B86] relative overflow-hidden shadow-inner group">
          {coverImage && (
            <img
              src={coverImage}
              alt="Foto do painel de fundo"
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-[radial-[#ffffff]_1px,transparent_1px] [background-size:16px_16px] opacity-15" />

          <div className="absolute left-4 top-4 bg-[#FEF1F4]/90 backdrop-blur-md text-[#E55B86] font-black text-[10px] uppercase tracking-widest px-3.5 py-1 rounded-full shadow-sm border border-[#EF9FB1]/50 flex items-center gap-1.5">
            <Sparkles size={12} />
            Comunidade Fio a Fio 🧶
          </div>

          {/* Trocar Capa Button */}
          {isOwnProfile && (
            <button
              onClick={() => setIsChangeCoverOpen(true)}
              className="absolute right-4 top-4 bg-white/90 hover:bg-white text-[#17151A] hover:text-[#E55B86] backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-md transition-all flex items-center gap-1.5 border border-white/60 active:scale-95 cursor-pointer"
              title="Trocar Foto do Painel de Fundo"
            >
              <Camera size={15} className="text-[#E55B86]" />
              <span>Trocar Capa</span>
            </button>
          )}
        </div>

        <CardBody className="relative pt-0 px-4 sm:px-8 pb-6 space-y-6">
          {/* Avatar and Top Actions Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20">
            {/* Story Ring Avatar - Occupies full circle */}
            <div className="relative inline-block self-center sm:self-auto">
              <div className="p-1 rounded-full bg-gradient-to-tr from-[#E55B86] via-[#EF9FB1] to-[#E55B86] shadow-xl w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                <Avatar
                  src={profileUser.avatar}
                  alt={profileUser.name}
                  size="xl"
                  className="w-full h-full border-4 border-white shadow-md rounded-full object-cover"
                />
              </div>
              {profileUser.verifiedCreator && (
                <span
                  className="absolute bottom-1 right-1 bg-[#E55B86] text-white p-1 rounded-full shadow-md border-2 border-white"
                  title="Criadora / Professora Verificada"
                >
                  <CheckCircle2 size={18} className="fill-[#E55B86] text-white" />
                </span>
              )}
            </div>

            {/* Action Buttons Row with Integrated RoleSwitcher */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5">
              {isOwnProfile && (
                <div className="mr-1">
                  <RoleSwitcher />
                </div>
              )}

              {isOwnProfile ? (
                <>
                  <Link to="/perfil/editar">
                    <Button variant="outline" size="sm" className="rounded-full text-xs font-extrabold border-[#EADED5] text-[#17151A] hover:bg-[#FEF1F4]">
                      <Edit3 size={14} />
                      <span>Editar Perfil</span>
                    </Button>
                  </Link>
                  {profileUser.role === 'creator' && (
                    <Link to="/criador/videoaulas/cadastrar">
                      <Button variant="primary" size="sm" className="rounded-full text-xs font-black bg-[#E55B86] text-white shadow-md">
                        <PlusCircle size={15} />
                        <span>+ Nova Aula</span>
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Button
                    variant={isFollowing ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => setIsFollowing(!isFollowing)}
                    className="rounded-full text-xs font-black shadow-sm"
                  >
                    {isFollowing ? <UserCheck size={15} /> : <UserPlus size={15} />}
                    <span>{isFollowing ? 'Seguindo' : 'Seguir'}</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSendMessage}
                    className="rounded-full text-xs font-bold border-[#EADED5] text-[#17151A] hover:bg-[#FEF1F4]"
                  >
                    <MessageCircle size={15} className="text-[#E55B86]" />
                    <span>Enviar Mensagem</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* User Info & Badges */}
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black tracking-tight text-[#17151A]">{profileUser.name}</h1>
              {profileUser.verifiedCreator && (
                <span className="inline-flex items-center gap-1 bg-[#FEF1F4] text-[#E55B86] text-[11px] font-black px-3 py-0.5 rounded-full border border-[#EF9FB1]/60 shadow-2xs">
                  <Sparkles size={12} className="text-[#E55B86]" />
                  Professora Verificada
                </span>
              )}
            </div>
            <p className="text-xs font-extrabold text-[#E55B86]">@{profileUser.username}</p>
          </div>

          {/* Bio Description */}
          <p className="text-sm text-[#896B70] font-medium leading-relaxed max-w-2xl text-center sm:text-left">
            {profileUser.bio || 'Apaixonada por agulhas, fios e por compartilhar a arte do crochê com o mundo! 🧶✨'}
          </p>

          {/* Location & Joined Date */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-[#896B70] pt-1">
            {profileUser.location && (
              <span className="flex items-center gap-1.5 bg-[#FEF1F4] px-3 py-1 rounded-full text-[#17151A] font-bold border border-[#EADED5]">
                <MapPin size={14} className="text-[#E55B86]" />
                {profileUser.location}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-[#896B70]">
              <Calendar size={14} className="text-[#EF9FB1]" />
              Membro desde {profileUser.joinedDate || 'Janeiro 2024'}
            </span>
          </div>

          {/* Instagram-Style Statistics Grid (4 Key Metrics) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#EADED5]">
            <div className="bg-[#FEF1F4] border border-[#EADED5] p-3.5 rounded-2xl text-center hover:bg-[#F1DFD8]/60 transition-colors shadow-2xs">
              <span className="block text-2xl font-black text-[#17151A]">{userPosts.length}</span>
              <span className="text-[11px] font-extrabold text-[#E55B86] uppercase tracking-wider">Publicações</span>
            </div>

            <div className="bg-[#FEF1F4] border border-[#EADED5] p-3.5 rounded-2xl text-center hover:bg-[#F1DFD8]/60 transition-colors shadow-2xs">
              <span className="block text-2xl font-black text-[#17151A]">
                {profileUser.followersCount ? profileUser.followersCount.toLocaleString('pt-BR') : '142'}
              </span>
              <span className="text-[11px] font-extrabold text-[#E55B86] uppercase tracking-wider">Seguidores</span>
            </div>

            <div className="bg-[#FEF1F4] border border-[#EADED5] p-3.5 rounded-2xl text-center hover:bg-[#F1DFD8]/60 transition-colors shadow-2xs">
              <span className="block text-2xl font-black text-[#17151A]">
                {profileUser.followingCount || '89'}
              </span>
              <span className="text-[11px] font-extrabold text-[#E55B86] uppercase tracking-wider">Seguindo</span>
            </div>

            <div className="bg-[#F1DFD8] border border-[#EADED5] p-3.5 rounded-2xl text-center hover:bg-[#FEF1F4] transition-colors shadow-2xs">
              <span className="block text-2xl font-black text-[#17151A]">{userVideoLessons.length}</span>
              <span className="text-[11px] font-extrabold text-[#896B70] uppercase tracking-wider">Vídeo-aulas</span>
            </div>
          </div>
        </CardBody>

      </Card>

      {/* Instagram Navigation Tabs (Publicações | Vídeo-aulas | Salvos) */}
      <div className="flex border-b border-[#EADED5] bg-white rounded-2xl p-1.5 shadow-xs">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
            activeTab === 'posts'
              ? 'bg-[#E55B86] text-white font-black shadow-md'
              : 'text-[#896B70] hover:bg-[#FEF1F4] hover:text-[#E55B86]'
          }`}
        >
          <Grid size={16} />
          <span>Publicações ({userPosts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('videoaulas')}
          className={`flex-1 py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
            activeTab === 'videoaulas'
              ? 'bg-[#E55B86] text-white font-black shadow-md'
              : 'text-[#896B70] hover:bg-[#FEF1F4] hover:text-[#E55B86]'
          }`}
        >
          <Video size={16} />
          <span>Vídeo-aulas ({userVideoLessons.length})</span>
        </button>

        {isOwnProfile && (
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'saved'
                ? 'bg-[#E55B86] text-white font-black shadow-md'
                : 'text-[#896B70] hover:bg-[#FEF1F4] hover:text-[#E55B86]'
            }`}
          >
            <BookMarked size={16} />
            <span>Biblioteca</span>
          </button>
        )}
      </div>

      {/* Tab Content 1: Publicações */}
      {activeTab === 'posts' && (
        <div className="space-y-4">
          {userPosts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#EADED5] shadow-xs space-y-3">
              <Grid size={40} className="mx-auto text-[#EF9FB1]" />
              <h3 className="font-extrabold text-[#17151A] text-base">Nenhuma publicação ainda</h3>
              <p className="text-xs text-[#896B70]">As publicações criadas aparecerão nesta área.</p>
            </div>
          ) : (
            userPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      )}

      {/* Tab Content 2: Vídeo-aulas do Criador */}
      {activeTab === 'videoaulas' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {userVideoLessons.length === 0 ? (
            <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-[#EADED5] shadow-xs space-y-3">
              <Video size={40} className="mx-auto text-[#EF9FB1]" />
              <h3 className="font-extrabold text-[#17151A] text-base">Nenhuma vídeo-aula publicada</h3>
              <p className="text-xs text-[#896B70]">As vídeo-aulas publicadas pela criadora ficarão disponíveis aqui.</p>
            </div>
          ) : (
            userVideoLessons.map((lesson) => (
              <Card key={lesson.id} className="hover:shadow-xl hover:border-[#E55B86] transition-all duration-300 overflow-hidden flex flex-col group border-[#EADED5]">
                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden bg-[#17151A]">
                  <img
                    src={lesson.thumbnail}
                    alt={lesson.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <span className="absolute top-2.5 right-2.5 bg-[#E55B86] text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                    R$ {lesson.price.toFixed(2)}
                  </span>

                  <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-white text-xs font-bold bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                    <Clock size={12} className="text-[#EF9FB1]" />
                    {lesson.duration}
                  </span>
                </div>

                {/* Lesson Info */}
                <CardBody className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-black text-[#E55B86] mb-1">
                      <span className="uppercase tracking-wider">{lesson.category}</span>
                      <span className="flex items-center gap-1 text-[#17151A] font-extrabold bg-[#FEF1F4] px-2 py-0.5 rounded-full border border-[#EADED5]">
                        <Star size={12} className="fill-[#E55B86] text-[#E55B86]" />
                        {lesson.rating} ({lesson.reviewsCount})
                      </span>
                    </div>
                    <h3 className="font-extrabold text-sm text-[#17151A] line-clamp-2 leading-snug group-hover:text-[#E55B86] transition-colors">
                      {lesson.title}
                    </h3>
                  </div>

                  <Link to={`/videoaulas/${lesson.id}`} className="block">
                    <Button variant="primary" fullWidth size="sm" className="rounded-xl font-extrabold text-xs bg-[#E55B86] text-white">
                      <PlayCircle size={15} />
                      <span>Ver Detalhes</span>
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Tab Content 3: Biblioteca do Aluno (Saved) */}
      {activeTab === 'saved' && (
        <div className="bg-white rounded-3xl p-8 border border-[#EADED5] shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <BookMarked size={24} className="text-[#E55B86]" />
            <h2 className="font-extrabold text-lg text-[#17151A]">Sua Biblioteca de Estudos</h2>
          </div>
          <p className="text-xs text-[#896B70] font-medium">
            Acesse rapidamente todas as vídeo-aulas adquiridas e receitas salvas na sua conta.
          </p>
          <Link to="/biblioteca">
            <Button variant="outline" size="sm" className="rounded-full font-extrabold text-xs border-[#EADED5] text-[#17151A]">
              Ir para Minha Biblioteca Completa
            </Button>
          </Link>
        </div>
      )}

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />

      {/* Change Cover Modal */}
      {isChangeCoverOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-[#EADED5] relative">
            <button
              onClick={() => setIsChangeCoverOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#E55B86]">
                <Camera size={20} />
                <h3 className="text-lg font-black text-[#17151A]">Alterar Painel de Fundo</h3>
              </div>
              <p className="text-xs text-[#896B70] font-medium">
                Escolha uma foto de capa pré-definida de crochê, envie uma imagem do seu computador ou cole o link de uma imagem.
              </p>
            </div>

            {/* Preset Cover Options */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-[#17151A] block">
                Capas Ilustrativas Pré-definidas
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {PRESET_COVERS.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCoverImage(preset);
                      setIsChangeCoverOpen(false);
                    }}
                    className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      coverImage === preset ? 'border-[#E55B86] ring-2 ring-[#E55B86]/40 scale-[1.02]' : 'border-transparent hover:border-[#EF9FB1]'
                    }`}
                  >
                    <img src={preset} alt={`Opção ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Custom URL or Local File Upload */}
            <div className="space-y-3 pt-2 border-t border-[#EADED5]">
              <label className="text-xs font-black uppercase tracking-wider text-[#17151A] block">
                Carregar do Computador ou Usar Link URL
              </label>

              <div className="flex items-center gap-2">
                <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FEF1F4] hover:bg-[#F1DFD8] text-[#E55B86] rounded-xl text-xs font-black border border-[#EF9FB1]/60 cursor-pointer transition-colors">
                  <Upload size={16} />
                  <span>Enviar Imagem Local</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              <form onSubmit={handleApplyCustomUrl} className="flex gap-2">
                <input
                  type="url"
                  placeholder="Cole o link da imagem (URL)..."
                  value={customCoverUrl}
                  onChange={(e) => setCustomCoverUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl text-xs bg-[#FBF7EF] border border-[#EADED5] outline-none focus:border-[#E55B86] text-[#17151A]"
                />
                <Button type="submit" variant="primary" size="sm" className="bg-[#E55B86] text-white font-extrabold text-xs rounded-xl">
                  Aplicar URL
                </Button>
              </form>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => setIsChangeCoverOpen(false)} className="rounded-xl text-xs font-bold">
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

