import React from 'react';
import { Link } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { Heart, BookOpen, Video, Users, ArrowRight, Sparkles, MessageCircle, Edit3 } from 'lucide-react';

export const LandingPage = () => {
  const { currentRole } = useRole();
  const isLoggedIn = currentRole !== 'guest';

  return (
    <div className="space-y-12 py-4">
      {/* Hero Section - Conditional state based on login status */}
      {!isLoggedIn ? (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-500 via-rose-400 to-pink-500 text-white p-8 sm:p-12 shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white border border-white/30">
              <Sparkles size={14} />
              Rede social para quem cria com as mãos
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ideias que se conectam, <span className="underline decoration-rose-300">ponto a ponto</span>.
            </h1>

            <p className="text-base sm:text-lg text-rose-100 font-medium leading-relaxed">
              O Fio a Fio reúne comunidade, inspiração, materiais gratuitos e comercialização de vídeo-aulas de crochê em um só lugar.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/login">
                <Button variant="dark" size="lg" className="shadow-lg">
                  Entrar na Comunidade
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button variant="secondary" size="lg" className="bg-white text-rose-600 hover:bg-rose-50 border-none shadow-md">
                  Criar Minha Conta
                </Button>
              </Link>
            </div>
          </div>

          <div className="absolute -right-8 -bottom-8 opacity-20 text-[220px] pointer-events-none select-none">
            🧶
          </div>
        </section>
      ) : (
        /* Smaller Hero Banner when Logged In */
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 via-rose-400 to-pink-500 text-white p-5 sm:p-7 shadow-md">
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-white border border-white/30">
                <Sparkles size={13} />
                Sua Comunidade Crocheteira 🧶
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                Ideias que se conectam, <span className="underline decoration-rose-300">ponto a ponto</span>.
              </h2>
              <p className="text-xs sm:text-sm text-rose-100 font-medium leading-relaxed">
                Explore a comunidade Fio a Fio, interaja no feed e aproveite as vídeo-aulas disponíveis.
              </p>
            </div>

            <div className="shrink-0">
              <Link to="/feed">
                <Button variant="dark" size="md" className="shadow-md font-black rounded-xl bg-[#251D20] hover:bg-black text-white">
                  Entrar na Comunidade
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Grid Section */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            O que você encontra no Fio a Fio
          </h2>
          <p className="text-sm text-zinc-600">
            Tudo o que você precisa para aprender, ensinar e se inspirar no universo do crochê.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Compartilhe -> Connected to Chat Page */}
          <Card hoverable className="p-2 transition-all duration-300 hover:border-[#B94F70] hover:shadow-lg group">
            <Link to="/chat" className="block h-full">
              <CardBody className="space-y-3 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900 group-hover:text-[#B94F70] transition-colors">
                    Compartilhe
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Publique seus projetos, compartilhe stories temporários e troque mensagens privadas no chat com outros artesãos.
                  </p>
                </div>

                <div className="pt-2 flex items-center text-xs font-bold text-[#B94F70] group-hover:underline">
                  <span>Ir para o Chat</span>
                  <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardBody>
            </Link>
          </Card>

          {/* Card 2: Aprenda -> Connected to Video Lessons / Aulas Page */}
          <Card hoverable className="p-2 transition-all duration-300 hover:border-[#B94F70] hover:shadow-lg group">
            <Link to="/videoaulas" className="block h-full">
              <CardBody className="space-y-3 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900 group-hover:text-[#B94F70] transition-colors">
                    Aprenda
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Acesse a página de vídeo-aulas, materiais didáticos, receitas exclusivas e aprimore suas habilidades de crochê.
                  </p>
                </div>

                <div className="pt-2 flex items-center text-xs font-bold text-[#B94F70] group-hover:underline">
                  <span>Ver Vídeo-Aulas</span>
                  <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardBody>
            </Link>
          </Card>

          {/* Card 3: Ensine & Monetize -> Opens Edit Profile for regular users to change profile type */}
          <Card hoverable className="p-2 transition-all duration-300 hover:border-[#B94F70] hover:shadow-lg group">
            <Link
              to={currentRole === 'creator' ? '/criador/videoaulas' : '/perfil/editar?focus=role'}
              className="block h-full"
            >
              <CardBody className="space-y-3 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    <Video size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900 group-hover:text-[#B94F70] transition-colors">
                    Ensine & Monetize
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Transforme seu conhecimento em renda! Altere seu perfil para Criadora/Professora e venda suas vídeo-aulas.
                  </p>
                </div>

                <div className="pt-2 flex items-center text-xs font-bold text-[#B94F70] group-hover:underline">
                  <span>
                    {currentRole === 'creator' ? 'Gerenciar Minhas Aulas' : 'Tornar-se Criadora / Professora'}
                  </span>
                  <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardBody>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
};
