import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, User, MapPin, Camera } from 'lucide-react';

export const EditProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useRole();
  const [name, setName] = useState(currentUser.name || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [location, setLocation] = useState(currentUser.location || '');
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar || '');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Perfil atualizado com sucesso!');
    setTimeout(() => {
      navigate('/perfil');
    }, 800);
  };

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <Link to="/perfil" className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700">
        <ArrowLeft size={16} />
        Voltar para o Perfil
      </Link>

      <Card>
        <CardHeader>
          <h1 className="text-lg font-extrabold text-zinc-900">Editar Perfil</h1>
          <p className="text-xs text-zinc-500">Atualize suas informações pessoais e biografia.</p>
        </CardHeader>

        <CardBody className="space-y-4">
          {message && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nome de Exibição"
              icon={User}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1">
                Biografia
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm text-zinc-800 outline-none focus:border-rose-400"
              />
            </div>

            <Input
              label="Cidade / Estado"
              icon={MapPin}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <Input
              label="URL do Avatar / Foto"
              icon={Camera}
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />

            <Button type="submit" variant="primary" fullWidth size="lg">
              Salvar Alterações
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
