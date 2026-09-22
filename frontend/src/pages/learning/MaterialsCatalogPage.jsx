import React, { useState } from 'react';
import { MaterialCard } from '../../components/learning/MaterialCard';
import { SearchInput } from '../../components/ui/SearchInput';
import { PageHeader } from '../../components/ui/PageHeader';
import { EmptyState } from '../../components/ui/EmptyState';
import { MOCK_MATERIALS } from '../../mocks/materials';
import { BookOpen } from 'lucide-react';

export const MaterialsCatalogPage = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = ['Todas', 'Vestuário', 'Pontos & Técnicas', 'Amigurumi', 'Guia Técnico'];

  const filteredMaterials = MOCK_MATERIALS.filter((material) => {
    const matchesSearch = material.title.toLowerCase().includes(search.toLowerCase()) ||
                          material.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Biblioteca de Conhecimento"
        title="Materiais Gratuitos"
        subtitle="Baixe revistas em PDF, gráficos vetoriais, receitas de amigurumi e apostilas para aprimorar suas habilidades no crochê."
        icon={BookOpen}
        variant="purple"
      />

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="w-full sm:w-80">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Buscar material em PDF ou gráfico..."
          />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-zinc-700 hover:bg-purple-50 border border-rose-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredMaterials.length === 0 ? (
        <EmptyState
          title="Nenhum material encontrado"
          description="Tente buscar por termos diferentes ou selecione 'Todas' as categorias."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMaterials.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      )}
    </div>
  );
};
