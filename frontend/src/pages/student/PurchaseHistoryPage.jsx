import React from 'react';
import { Link } from 'react-router-dom';
import { getPurchases } from '../../services/api';
import { useApiData } from '../../hooks/useApiData';
import { useRole } from '../../context/RoleContext';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export const PurchaseHistoryPage = () => {
  const { currentUser } = useRole();
  const { data: purchases = [] } = useApiData('purchases', getPurchases);

  const userPurchases = currentUser?.id
    ? purchases.filter((item) => item.userId === currentUser.id)
    : purchases;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Link to="/biblioteca" className="inline-flex items-center gap-1 text-xs font-bold text-[#B94F70] hover:underline">
        <ArrowLeft size={16} />
        Voltar para a Biblioteca
      </Link>

      <Card className="border-[#E8CCD4]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-[#B94F70]" size={20} />
            <h1 className="text-lg font-extrabold text-[#251D20]">Histórico de Compras</h1>
          </div>
          <p className="text-xs text-[#715B62]">
            {currentUser?.name ? `Compras registradas para ${currentUser.name}.` : 'Registro de todas as vídeo-aulas adquiridas na plataforma.'}
          </p>
        </CardHeader>

        <CardBody className="p-0">
          {userPurchases.length === 0 ? (
            <div className="p-8">
              <EmptyState
                icon={ShoppingBag}
                title="Nenhuma compra registrada"
                description="Seu histórico de compras de cursos aparecerá aqui após a confirmação do pagamento."
                actionText="Ver Vídeo-aulas Disponíveis"
                actionTo="/videoaulas"
              />
            </div>
          ) : (
            <div className="divide-y divide-[#E8CCD4]/60">
              {userPurchases.map((p) => (
                <div key={p.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F8E9ED]/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <img src={p.lesson?.thumbnail} alt={p.lesson?.title} className="w-16 h-16 rounded-xl object-cover bg-zinc-900" />
                    <div>
                      <span className="text-[10px] text-zinc-400 font-semibold">ID: #{p.id} • {p.date}</span>
                      <h3 className="font-bold text-sm text-[#251D20]">{p.lesson?.title}</h3>
                      <p className="text-xs text-[#715B62]">Forma de pagamento: {p.paymentMethod}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                    <Badge variant="green" size="md">{p.status}</Badge>
                    <span className="font-extrabold text-sm text-[#251D20]">
                      R$ {Number(p.amount || 0).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
