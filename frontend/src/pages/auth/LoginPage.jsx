import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/ui/Logo';
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
    setMessage('Login realizado com carinho! Bem-vinda de volta 🧶');
    switchRole('user');
    setTimeout(() => {
      navigate('/feed');
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 animate-fade-in">
      <Card className="shadow-craft border-[#EADED5] bg-white">
        <CardBody className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-2">
              <Logo size="lg" showText={false} />
            </div>
            <h1 className="text-2xl font-black text-[#17151A]">Entrar no Fio a Fio</h1>
            <p className="text-xs font-medium text-[#896B70]">
              Acesse sua conta para ver projetos, vídeos e interagir com a comunidade.
            </p>
          </div>

          {message && (
            <div className="p-3.5 bg-[#FEF1F4] border border-[#EF9FB1] text-[#E55B86] text-xs font-extrabold rounded-2xl text-center">
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

            <Button type="submit" variant="primary" fullWidth size="lg" className="bg-[#E55B86] text-white">
              <LogIn size={18} />
              Entrar
            </Button>
          </form>

          <div className="pt-4 border-t border-[#EADED5] text-center text-xs text-[#896B70]">
            Ainda não possui uma conta?{' '}
            <Link to="/cadastro" className="font-extrabold text-[#E55B86] hover:underline">
              Criar conta
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

