import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';
import { Heart, BookOpen, Video, Users, ArrowRight, Sparkles } from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
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
          <Card hoverable className="p-2">
            <CardBody className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xl">
                <Users size={24} />
              </div>
              <h3 className="font-bold text-lg text-zinc-900">Compartilhe</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Publique seus projetos, compartilhe stories temporários e troque dicas com outros artesãos da comunidade.
              </p>
            </CardBody>
          </Card>

          <Card hoverable className="p-2">
            <CardBody className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl">
                <BookOpen size={24} />
              </div>
              <h3 className="font-bold text-lg text-zinc-900">Aprenda</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Acesse uma biblioteca completa de materiais gratuitos como revistas em PDF, gráficos e receitas exclusivas.
              </p>
            </CardBody>
          </Card>

          <Card hoverable className="p-2">
            <CardBody className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xl">
                <Video size={24} />
              </div>
              <h3 className="font-bold text-lg text-zinc-900">Ensine & Monetize</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Transforme seu conhecimento em renda! Crie suas vídeo-aulas, gerencie seu catálogo e receba 85% do valor da venda.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
};
