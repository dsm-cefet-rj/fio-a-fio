import React from 'react';
import { Card, CardHeader, CardBody } from './Card';

export const DataTable = ({
  title,
  columns,
  data,
  renderRow,
  headerAction,
  emptyMessage = 'Nenhum registro encontrado.'
}) => {
  return (
    <Card>
      {title && (
        <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="font-extrabold text-sm text-zinc-900">{title}</h3>
          {headerAction}
        </CardHeader>
      )}

      <CardBody className="p-0">
        {data.length === 0 ? (
          <div className="p-8 text-center text-xs text-zinc-500">{emptyMessage}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-rose-50/50 border-b border-rose-100 text-zinc-700 uppercase tracking-wider font-bold">
                <tr>
                  {columns.map((col, idx) => (
                    <th key={idx} className={`p-3.5 ${col.align === 'right' ? 'text-right' : ''}`}>
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-50 text-zinc-800 font-medium">
                {data.map((item, rowIdx) => renderRow(item, rowIdx))}
              </tbody>
            </table>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
