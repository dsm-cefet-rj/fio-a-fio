import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchInput } from '../../components/ui/SearchInput';
import { Card, CardBody } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { VideoCard } from '../../components/learning/VideoCard';
import { getUsers, getVideoLessons, getPosts } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { Users, Video, FileText, UserPlus, UserCheck } from 'lucide-react';

export const SearchPage = () => {
  const { data: users = [] } = useApiData('users', getUsers);
  const { data: videos = [] } = useApiData('videoLessons', getVideoLessons);
  const { data: posts = [] } = useApiData('posts', getPosts);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(query.toLowerCase()) ||
    u.username?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredVideos = videos.filter((v) =>
    v.isActive !== false && (v.title?.toLowerCase().includes(query.toLowerCase()) ||
    v.category?.toLowerCase().includes(query.toLowerCase())
    )
  );

  const filteredPosts = posts.filter((p) =>
    p.title?.toLowerCase().includes(query.toLowerCase()) ||
    p.content?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-black text-zinc-900">Pesquisar na Comunidade</h1>
        <p className="text-xs text-zinc-500">Encontre artesãos, vídeo-aulas, receitas e publicações.</p>
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Busque por 'cardigan', 'amigurumi', 'Maria' ou 'bolsa'..."
        />
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 border-b border-rose-100 pb-3">
        {[
          { id: 'all', label: 'Tudo' },
          { id: 'users', label: `Usuários (${filteredUsers.length})`, icon: Users },
          { id: 'videos', label: `Vídeo-aulas (${filteredVideos.length})`, icon: Video },
          { id: 'posts', label: `Publicações (${filteredPosts.length})`, icon: FileText }
        ].map((chip) => (
          <button
            key={chip.id}
            onClick={() => setFilterType(chip.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              filterType === chip.id
                ? 'bg-[#B94F70] text-white shadow-xs'
                : 'bg-white text-zinc-700 hover:bg-rose-100 border border-rose-100'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-6">
        {/* Seção Usuários */}
        {(filterType === 'all' || filterType === 'users') && filteredUsers.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Usuários Encontrados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredUsers.map((u) => (
                <Card key={u.id}>
                  <CardBody className="p-3 flex items-center justify-between">
                    <Link to={`/perfil?user=${u.username}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                      <Avatar src={u.avatar} alt={u.name} size="md" />
                      <div>
                        <p className="font-bold text-xs text-zinc-900">{u.name}</p>
                        <p className="text-[10px] text-zinc-500">@{u.username}</p>
                        {u.role === 'creator' && (
                          <span className="text-[9px] font-bold text-[#B94F70] bg-[#F6DDE5] px-1.5 py-0.5 rounded-full">
                            Professora
                          </span>
                        )}
                      </div>
                    </Link>
                    <Link to={`/perfil?user=${u.username}`}>
                      <Button variant="outline" size="sm" className="rounded-full text-xs">
                        Ver Perfil
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Seção Vídeo-aulas */}
        {(filterType === 'all' || filterType === 'videos') && filteredVideos.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Vídeo-aulas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} lesson={video} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
