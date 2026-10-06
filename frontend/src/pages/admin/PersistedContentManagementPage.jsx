import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Eye, Trash2, RotateCcw } from 'lucide-react';
import { deleteRecord, getMaterials, getVideoLessons, updateRecord } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const PersistedContentManagementPage = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState('');
  const [processingKey, setProcessingKey] = useState('');
  const { data: lessons = [], isLoading: lessonsLoading } = useApiData('videoLessons', getVideoLessons);
  const { data: materials = [], isLoading: materialsLoading } = useApiData('materials', getMaterials);

  const setLessonStatus = async (lesson) => {
    const isActive = lesson.isActive === false;
    const action = isActive ? 'reativar' : 'desativar';
    if (!window.confirm(`Deseja ${action} a vídeo-aula "${lesson.title}"?`)) return;
    setProcessingKey(`lesson-${lesson.id}`);
    setError('');
    try {
      await updateRecord('videoLessons', lesson.id, {
        isActive,
        moderationStatus: isActive ? 'approved' : 'removed',
        moderatedAt: new Date().toISOString(),
      });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['videoLessons'] }),
        queryClient.invalidateQueries({ queryKey: ['adminDashboard'] }),
      ]);
    } catch {
      setError('Não foi possível atualizar a vídeo-aula. Verifique se o JSON Server está ativo.');
    } finally {
      setProcessingKey('');
    }
  };

  const removeMaterial = async (material) => {
    if (!window.confirm(`Remover definitivamente o material "${material.title}"?`)) return;
    setProcessingKey(`material-${material.id}`);
    setError('');
    try {
      await deleteRecord('materials', material.id);
      await queryClient.invalidateQueries({ queryKey: ['materials'] });
    } catch {
      setError('Não foi possível remover o material. Verifique se o JSON Server está ativo.');
    } finally {
      setProcessingKey('');
    }
  };

  const activeLessons = lessons.filter((lesson) => lesson.isActive !== false);
  const archivedLessons = lessons.filter((lesson) => lesson.isActive === false);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="space-y-1">
        <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600">Painel de Moderação</span>
        <h1 className="text-2xl font-black text-zinc-900">Gestão de Conteúdos</h1>
        <p className="text-xs text-zinc-500">Desative aulas sem apagar o histórico de compras; materiais removidos são excluídos do banco local.</p>
      </header>
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">{error}</p>}

      <Card>
        <CardHeader><h2 className="text-sm font-extrabold text-zinc-900">Vídeo-aulas ativas ({activeLessons.length})</h2></CardHeader>
        <CardBody className="space-y-3 p-3 sm:p-5">
          {lessonsLoading && <p role="status" className="p-4 text-center text-sm text-zinc-500">Carregando vídeo-aulas...</p>}
          {!lessonsLoading && activeLessons.length === 0 && <p className="p-4 text-center text-sm text-zinc-500">Nenhuma vídeo-aula ativa.</p>}
          {activeLessons.map((lesson) => (
            <article key={lesson.id} className="flex flex-col gap-3 rounded-2xl border border-rose-100 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <img src={lesson.thumbnail} alt="" className="h-14 w-16 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0">
                  <h3 className="break-words text-xs font-bold text-zinc-900">{lesson.title}</h3>
                  <p className="break-words text-[11px] text-zinc-500">{lesson.creator?.name || 'Criador'} · R$ {Number(lesson.price || 0).toFixed(2)}</p>
                  <Badge variant="green" size="sm">Ativa</Badge>
                </div>
              </div>
              <div className="flex w-full justify-end gap-2 sm:w-auto sm:shrink-0">
                <Link to={`/videoaulas/${lesson.id}`}><Button variant="ghost" size="sm" aria-label="Visualizar aula"><Eye size={16} /></Button></Link>
                <Button variant="danger" size="sm" disabled={processingKey === `lesson-${lesson.id}`} onClick={() => setLessonStatus(lesson)}>
                  <Trash2 size={14} /><span>{processingKey === `lesson-${lesson.id}` ? 'Salvando...' : 'Desativar'}</span>
                </Button>
              </div>
            </article>
          ))}
        </CardBody>
      </Card>

      {archivedLessons.length > 0 && <Card>
        <CardHeader><h2 className="text-sm font-extrabold text-zinc-900">Vídeo-aulas desativadas ({archivedLessons.length})</h2></CardHeader>
        <CardBody className="space-y-3 p-3 sm:p-5">
          {archivedLessons.map((lesson) => (
            <article key={lesson.id} className="flex flex-col gap-3 rounded-2xl border border-zinc-200 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0"><h3 className="break-words text-xs font-bold text-zinc-700">{lesson.title}</h3><Badge variant="gray" size="sm">Desativada</Badge></div>
              <Button variant="secondary" size="sm" disabled={processingKey === `lesson-${lesson.id}`} onClick={() => setLessonStatus(lesson)}>
                <RotateCcw size={14} /><span>{processingKey === `lesson-${lesson.id}` ? 'Salvando...' : 'Reativar'}</span>
              </Button>
            </article>
          ))}
        </CardBody>
      </Card>}

      <Card>
        <CardHeader><h2 className="text-sm font-extrabold text-zinc-900">Materiais gratuitos ({materials.length})</h2></CardHeader>
        <CardBody className="space-y-3 p-3 sm:p-5">
          {materialsLoading && <p role="status" className="p-4 text-center text-sm text-zinc-500">Carregando materiais...</p>}
          {!materialsLoading && materials.length === 0 && <p className="p-4 text-center text-sm text-zinc-500">Nenhum material cadastrado.</p>}
          {materials.map((material) => (
            <article key={material.id} className="flex flex-col gap-3 rounded-2xl border border-rose-100 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0"><h3 className="break-words text-xs font-bold text-zinc-900">{material.title}</h3><p className="break-words text-[11px] text-zinc-500">{material.type} · {material.author} · {material.downloadsCount} downloads</p></div>
              <Button variant="danger" size="sm" disabled={processingKey === `material-${material.id}`} onClick={() => removeMaterial(material)}>
                <Trash2 size={14} /><span>{processingKey === `material-${material.id}` ? 'Removendo...' : 'Remover'}</span>
              </Button>
            </article>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};
