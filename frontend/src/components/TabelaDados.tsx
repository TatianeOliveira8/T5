import React from 'react';

interface Coluna {
  key: string;
  label: string;
  sortable?: boolean;
}

interface TabelaDadosProps {
  colunas: Coluna[];
  dados: Record<string, any>[];
  onEdit?: (item: Record<string, any>) => void;
  onDelete?: (item: Record<string, any>) => void;
}

const TabelaDados: React.FC<TabelaDadosProps> = ({ colunas, dados, onEdit, onDelete }) => {
  return (
    <div className="card shadow-sm p-4">
      <div className="table-responsive">
        <table className="table table-bordered align-middle mb-0">
          <thead className="table-light">
            <tr>
              {colunas.map((coluna) => (
                <th key={coluna.key} className="text-nowrap">{coluna.label}</th>
              ))}
              {(onEdit || onDelete) && <th className="text-nowrap">Ações</th>}
            </tr>
          </thead>
          <tbody>
            {dados.map((item, index) => (
              <tr key={index}>
                {colunas.map((coluna) => (
                  <td key={coluna.key} className="text-nowrap">{item[coluna.key]}</td>
                ))}
                {(onEdit || onDelete) && (
                  <td>
                    <div className="d-flex gap-2">
                      {onEdit && (
                        <button
                          type="button"
                          className="btn btn-outline-success btn-sm"
                          onClick={() => onEdit(item)}
                        >
                          Editar
                        </button>
                      )}
                      {onDelete && (
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => onDelete(item)}
                        >
                          Remover
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaDados;
