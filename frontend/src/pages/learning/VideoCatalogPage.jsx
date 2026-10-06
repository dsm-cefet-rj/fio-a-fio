import React, { useState } from 'react';
import { VideoCard } from '../../components/learning/VideoCard';
import { SearchInput } from '../../components/ui/SearchInput';
import { PageHeader } from '../../components/ui/PageHeader';
import { EmptyState } from '../../components/ui/EmptyState';
import { getVideoLessons } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { Video } from 'lucide-react';

export const VideoCatalogPage = () => {
  const { data: allVideos = [] } = useApiData('videoLessons', getVideoLessons);
  const videos = allVideos.filter((video) => video.isActive !== false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedLevel, setSelectedLevel] = useState('Todos');

  const categories = ['Todas', 'Vestuário', 'Acessórios', 'Decoração', 'Amigurumi'];
  const levels = ['Todos', 'Iniciante', 'Intermediário', 'Avançado'];

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(search.toLowerCase()) ||
                          video.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'Todas' || video.category === selectedCategory;
    const matchesLevel = selectedLevel === 'Todos' || video.level === selectedLevel;
    return matchesSearch && matchesCat && matchesLevel;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Catálogo Oficial"
        title="Vídeo-aulas de Crochê"
        subtitle="Aprenda novas técnicas com os melhores professores da comunidade. Cursos passo a passo com suporte e acesso vitalício."
        icon={Video}
        variant="rose"
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="w-full sm:w-80">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Buscar por curso, técnica ou professor..."
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-rose-100 rounded-xl px-3 py-2 text-xs font-bold text-zinc-700 outline-none focus:border-rose-400"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c === 'Todas' ? 'Todas Categorias' : c}</option>
            ))}
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="bg-white border border-rose-100 rounded-xl px-3 py-2 text-xs font-bold text-zinc-700 outline-none focus:border-rose-400"
          >
            {levels.map((l) => (
              <option key={l} value={l}>{l === 'Todos' ? 'Todos Níveis' : l}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredVideos.length === 0 ? (
        <EmptyState
          title="Nenhuma vídeo-aula encontrada"
          description="Nenhum curso coincide com a pesquisa ou filtros selecionados."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} lesson={video} />
          ))}
        </div>
      )}
    </div>
  );
};
