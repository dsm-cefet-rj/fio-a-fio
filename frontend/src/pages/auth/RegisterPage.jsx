import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/ui/Logo';
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
    setMessage('Conta criada com carinho! Redirecionando...');
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
    <div className="max-w-md mx-auto py-8 px-4 animate-fade-in">
      <Card className="shadow-craft border-[#EADED5] bg-white">
        <CardBody className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-2">
              <Logo size="lg" showText={false} />
            </div>
            <h1 className="text-2xl font-black text-[#17151A]">Criar Minha Conta</h1>
            <p className="text-xs font-medium text-[#896B70]">
              Faça parte da maior comunidade de crochê e artesanato.
            </p>
          </div>

          {message && (
            <div className="p-3.5 bg-[#FEF1F4] border border-[#EF9FB1] text-[#E55B86] text-xs font-extrabold rounded-2xl text-center">
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

            <label className="flex items-center gap-2.5 p-3.5 bg-[#FEF1F4]/70 rounded-2xl border border-[#EADED5] cursor-pointer hover:bg-[#FEF1F4] transition-all">
              <input
                type="checkbox"
                checked={formData.isCreator}
                onChange={(e) => setFormData({ ...formData, isCreator: e.target.checked })}
                className="w-4 h-4 text-[#E55B86] rounded-md focus:ring-[#E55B86] accent-[#E55B86]"
              />
              <span className="text-xs font-bold text-[#17151A]">
                Desejo também vender minhas vídeo-aulas (Perfil de Criador)
              </span>
            </label>

            <Button type="submit" variant="primary" fullWidth size="lg" className="bg-[#E55B86] text-white">
              <UserPlus size={18} />
              Concluir Cadastro
            </Button>
          </form>

          <div className="pt-4 border-t border-[#EADED5] text-center text-xs text-[#896B70]">
            Já possui uma conta?{' '}
            <Link to="/login" className="font-extrabold text-[#E55B86] hover:underline">
              Fazer login
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
