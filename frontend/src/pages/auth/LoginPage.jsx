import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/ui/Logo';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useRole } from '../../context/RoleContext';
import { useQueryClient } from '@tanstack/react-query';
import { getUsers } from '../../services/api';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { selectUser } = useRole();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Login realizado com carinho! Bem-vinda de volta 🧶');
    return getUsers().then(users => {
      const user = users.find(item => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password);
      if (user?.isSuspended) throw new Error('Esta conta estÃ¡ suspensa. Entre em contato com a equipe Fio a Fio.');
      if (!user) throw new Error('E-mail ou senha inválidos.');
      queryClient.setQueryData(['users'], users);
      selectUser(user);
      setMessage('Login realizado com sucesso! Bem-vinda de volta.');
      setTimeout(() => navigate('/feed'), 600);
    }).catch(loginError => {
      setError(loginError.message || 'Não foi possível acessar as contas.');
    });
    setTimeout(() => {
      navigate('/feed');
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 animate-fade-in">
      <Card className="shadow-craft border-[#E8CCD4] bg-white">
        <CardBody className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-2">
              <Logo size="lg" showText={false} />
            </div>
            <h1 className="text-2xl font-black text-[#251D20]">Entrar no Fio a Fio</h1>
            <p className="text-xs font-medium text-[#715B62]">
              Acesse sua conta para ver projetos, vídeos e interagir com a comunidade.
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
              label="E-mail"
              type="email"
              icon={Mail}
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Senha"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" fullWidth size="lg" className="bg-[#B94F70] text-white">
              <LogIn size={18} />
              Entrar
            </Button>
          </form>

          <div className="pt-4 border-t border-[#E8CCD4] text-center text-xs text-[#715B62]">
            Ainda não possui uma conta?{' '}
            <Link to="/cadastro" className="font-extrabold text-[#B94F70] hover:underline">
              Criar conta
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
