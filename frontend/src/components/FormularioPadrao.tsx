import React, { useState, useEffect } from 'react';

interface Campo {
  nome: string;
  rotulo: string;
  tipo: string;
  valor: string;
  placeholder?: string;
  obrigatorio?: boolean;
}

interface PropsFormulario {
  campos: Campo[];
  aoEnviar: (dados: Record<string, string>) => void;
  aoCancelar?: () => void;
  titulo: string;
}

const FormularioPadrao: React.FC<PropsFormulario> = ({ campos, aoEnviar, aoCancelar, titulo }) => {
  const [dados, setDados] = useState<Record<string, string>>({});

  useEffect(() => {
    const iniciais: Record<string, string> = {};
    campos.forEach(campo => {
      iniciais[campo.nome] = campo.valor || '';
    });
    setDados(iniciais);
  }, [campos]);

  const aoMudar = (nome: string, valor: string) => {
    setDados(prev => ({ ...prev, [nome]: valor }));
  };

  const aoSubmeter = (e: React.FormEvent) => {
    e.preventDefault();
    aoEnviar(dados);
  };

  return (
    <div className="shadow-sm p-4 mx-auto" style={{ maxWidth: 600 }}>
      <h2 className="h4 fw-bold mb-4">{titulo}</h2>
      <form onSubmit={aoSubmeter}>
        {campos.map(campo => (
          <div key={campo.nome} className="mb-3">
            <label htmlFor={campo.nome} className="form-label">{campo.rotulo}</label>
            <input
              id={campo.nome}
              type={campo.tipo}
              value={dados[campo.nome] || ''}
              onChange={e => aoMudar(campo.nome, e.target.value)}
              placeholder={campo.placeholder}
              required={campo.obrigatorio}
              className="form-control"
            />
          </div>
        ))}
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">Salvar</button>
          {aoCancelar && (
            <button type="button" className="btn btn-outline-secondary" onClick={aoCancelar}>Cancelar</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormularioPadrao;
