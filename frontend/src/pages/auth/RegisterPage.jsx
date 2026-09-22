import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { useRole } from '../../context/RoleContext';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { switchRole } = useRole();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    isCreator: false
  });
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Conta simulada criada com sucesso! Redirecionando...');
    if (formData.isCreator) {
      switchRole('creator');
    } else {
      switchRole('user');
    }
    setTimeout(() => {
      navigate('/feed');
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <Card className="shadow-lg border-rose-200">
        <CardBody className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="text-4xl">🧶</div>
            <h1 className="text-2xl font-extrabold text-zinc-900">Criar Minha Conta</h1>
            <p className="text-xs text-zinc-500">
              Faça parte da maior comunidade de crochê do Brasil.
            </p>
          </div>

          {message && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nome Completo"
              icon={User}
              placeholder="Maria das Dores"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Nome de Usuário (@username)"
              icon={User}
              placeholder="mariacroche"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />

            <Input
              label="E-mail"
              type="email"
              icon={Mail}
              placeholder="seuemail@exemplo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Senha"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <label className="flex items-center gap-2 p-3 bg-rose-50/50 rounded-xl border border-rose-100 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isCreator}
                onChange={(e) => setFormData({ ...formData, isCreator: e.target.checked })}
                className="w-4 h-4 text-rose-600 rounded-md focus:ring-rose-400"
              />
              <span className="text-xs font-semibold text-zinc-800">
                Desejo também vender minhas vídeo-aulas (Perfil de Criador)
              </span>
            </label>

            <Button type="submit" variant="primary" fullWidth size="lg">
              <UserPlus size={18} />
              Concluir Cadastro
            </Button>
          </form>

          <div className="pt-4 border-t border-rose-50 text-center text-xs text-zinc-600">
            Já possui uma conta?{' '}
            <Link to="/login" className="font-bold text-rose-600 hover:underline">
              Fazer login
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
