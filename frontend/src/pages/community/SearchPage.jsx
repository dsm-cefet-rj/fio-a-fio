import React, { useState } from 'react';
import { SearchInput } from '../../components/ui/SearchInput';
import { Card, CardBody } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { VideoCard } from '../../components/learning/VideoCard';
import { MOCK_USERS } from '../../mocks/users';
import { MOCK_VIDEO_LESSONS } from '../../mocks/videoLessons';
import { MOCK_POSTS } from '../../mocks/posts';
import { Users, Video, FileText, UserPlus, UserCheck } from 'lucide-react';

export const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredUsers = MOCK_USERS.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.username.toLowerCase().includes(query.toLowerCase())
  );

  const filteredVideos = MOCK_VIDEO_LESSONS.filter((v) =>
    v.title.toLowerCase().includes(query.toLowerCase()) ||
    v.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPosts = MOCK_POSTS.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.content.toLowerCase().includes(query.toLowerCase())
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
                ? 'bg-rose-500 text-white shadow-xs'
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
                    <div className="flex items-center gap-3">
                      <Avatar src={u.avatar} alt={u.name} size="md" />
                      <div>
                        <p className="font-bold text-xs text-zinc-900">{u.name}</p>
                        <p className="text-[10px] text-zinc-500">@{u.username}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <UserPlus size={14} />
                      <span>Seguir</span>
                    </Button>
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
