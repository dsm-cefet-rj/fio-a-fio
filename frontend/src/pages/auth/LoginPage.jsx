import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useRole } from '../../context/RoleContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { switchRole } = useRole();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Login simulado com sucesso!');
    switchRole('user');
    setTimeout(() => {
      navigate('/feed');
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <Card className="shadow-lg border-rose-200">
        <CardBody className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="text-4xl">🧶</div>
            <h1 className="text-2xl font-extrabold text-zinc-900">Entrar no Fio a Fio</h1>
            <p className="text-xs text-zinc-500">
              Digite suas credenciais para acessar seu perfil e a comunidade.
            </p>
          </div>

          {message && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center">
              {message}
            </div>
          )}

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

            <Button type="submit" variant="primary" fullWidth size="lg">
              <LogIn size={18} />
              Entrar
            </Button>
          </form>

          <div className="pt-4 border-t border-rose-50 text-center text-xs text-zinc-600">
            Ainda não possui uma conta?{' '}
            <Link to="/cadastro" className="font-bold text-rose-600 hover:underline">
              Criar conta
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
