import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PURCHASES } from '../../mocks/purchases';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export const PurchaseHistoryPage = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Link to="/biblioteca" className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700">
        <ArrowLeft size={16} />
        Voltar para a Biblioteca
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-rose-500" size={20} />
            <h1 className="text-lg font-extrabold text-zinc-900">Histórico de Compras</h1>
          </div>
          <p className="text-xs text-zinc-500">Registro de todas as vídeo-aulas adquiridas na plataforma.</p>
        </CardHeader>

        <CardBody className="p-0">
          <div className="divide-y divide-rose-50">
            {MOCK_PURCHASES.map((p) => (
              <div key={p.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-rose-50/30 transition-colors">
                <div className="flex items-center gap-4">
                  <img src={p.lesson.thumbnail} alt={p.lesson.title} className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <span className="text-[10px] text-zinc-400 font-semibold">ID: #{p.id} • {p.date}</span>
                    <h3 className="font-bold text-sm text-zinc-900">{p.lesson.title}</h3>
                    <p className="text-xs text-zinc-500">Forma de pagamento: {p.paymentMethod}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                  <Badge variant="green" size="md">{p.status}</Badge>
                  <span className="font-extrabold text-sm text-zinc-900">
                    R$ {p.amount.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
