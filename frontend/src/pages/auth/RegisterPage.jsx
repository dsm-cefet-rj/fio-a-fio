import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/ui/Logo';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { useRole } from '../../context/RoleContext';
import { useQueryClient } from '@tanstack/react-query';
import { createRecord, getUsers } from '../../services/api';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { selectUser } = useRole();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    isCreator: false
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    try {
      const users = await getUsers();
      const username = formData.username.trim().replace(/^@/, '');
      if (users.some(user => user.email.toLowerCase() === formData.email.trim().toLowerCase())) {
        throw new Error('Este e-mail já está cadastrado.');
      }
      if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
        throw new Error('Este nome de usuário já está em uso.');
      }
      const createdUser = await createRecord('users', {
        name: formData.name.trim(),
        username,
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.isCreator ? 'creator' : 'user',
        joinedDate: new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(new Date()),
      });
      queryClient.setQueryData(['users'], [...users, createdUser]);
      selectUser(createdUser);
      setMessage('Conta criada com carinho! Redirecionando...');
      setTimeout(() => navigate('/feed'), 800);
    } catch (createError) {
      setError(createError.message || 'Não foi possível criar a conta. Verifique se o JSON Server está ativo.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4 animate-fade-in">
      <Card className="shadow-craft border-[#E8CCD4] bg-white">
        <CardBody className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-2">
              <Logo size="lg" showText={false} />
            </div>
            <h1 className="text-2xl font-black text-[#251D20]">Criar Minha Conta</h1>
            <p className="text-xs font-medium text-[#715B62]">
              Faça parte da maior comunidade de crochê e artesanato.
            </p>
          </div>

          {message && (
            <div className="p-3.5 bg-[#F6DDE5] border border-[#D98CA1] text-[#B94F70] text-xs font-extrabold rounded-2xl text-center">
              {message}
            </div>
          )}
          {error && <div role="alert" className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-2xl text-center">{error}</div>}

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

            <label className="flex items-center gap-2.5 p-3.5 bg-[#F6DDE5]/70 rounded-2xl border border-[#E8CCD4] cursor-pointer hover:bg-[#F6DDE5] transition-all">
              <input
                type="checkbox"
                checked={formData.isCreator}
                onChange={(e) => setFormData({ ...formData, isCreator: e.target.checked })}
                className="w-4 h-4 text-[#B94F70] rounded-md focus:ring-[#B94F70] accent-[#B94F70]"
              />
              <span className="text-xs font-bold text-[#251D20]">
                Desejo também vender minhas vídeo-aulas (Perfil de Criador)
              </span>
            </label>

            <Button type="submit" variant="primary" fullWidth size="lg" disabled={isSaving} className="bg-[#B94F70] text-white">
              <UserPlus size={18} />
              {isSaving ? 'Criando conta...' : 'Concluir Cadastro'}
            </Button>
          </form>

          <div className="pt-4 border-t border-[#E8CCD4] text-center text-xs text-[#715B62]">
            Já possui uma conta?{' '}
            <Link to="/login" className="font-extrabold text-[#B94F70] hover:underline">
              Fazer login
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
