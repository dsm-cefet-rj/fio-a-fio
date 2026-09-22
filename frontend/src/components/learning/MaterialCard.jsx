import React from 'react';
import { Card, CardBody } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Download, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MaterialCard = ({ material }) => {
  return (
    <Card hoverable className="h-full flex flex-col">
      <Link to={`/materiais/${material.id}`} className="block relative">
        <img
          src={material.thumbnail}
          alt={material.title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="green" size="sm" className="shadow-xs font-bold">
            GRATUITO
          </Badge>
        </div>
      </Link>

      <CardBody className="flex-1 flex flex-col justify-between p-4">
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1.5">
            <span className="font-semibold text-rose-600">{material.type}</span>
            <span>{material.fileSize}</span>
          </div>

          <Link to={`/materiais/${material.id}`}>
            <h3 className="font-bold text-sm text-zinc-900 line-clamp-2 hover:text-rose-600 transition-colors mb-1.5">
              {material.title}
            </h3>
          </Link>

          <p className="text-xs text-zinc-600 line-clamp-2 mb-3 leading-relaxed">
            {material.description}
          </p>
        </div>

        <div className="pt-3 border-t border-rose-50 flex items-center justify-between">
          <span className="text-[11px] text-zinc-400 font-medium">
            {material.downloadsCount} downloads
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => alert(`Simulação: Baixando arquivo PDF "${material.title}"`)}
          >
            <Download size={14} />
            <span>Baixar PDF</span>
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
