import React, { useEffect, useState } from 'react';
import TabelaDados from '../../components/TabelaDados';
import {
  listarPorTipo,
  deletarProdutoServico
} from '../../services/produtoServicoService';

const colunas = [
  { key: 'id', label: 'ID' },
  { key: 'nome', label: 'Nome' },
  { key: 'preco', label: 'Preço (R$)' }
];

const ListagemServicos: React.FC = () => {
  const [servicos, setServicos] = useState<any[]>([]);

  const carregarServicos = async () => {
    const lista = await listarPorTipo('SERVICO');
    // Ordenar do mais recente
    lista.sort(
      (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setServicos(lista);
  };

  useEffect(() => {
    carregarServicos();
  }, []);

  const handleEdit = (servico: any) => {
    window.location.hash = `#/servicos/editar/${servico.id}`;
  };

// Serviço
const handleDelete = async (servico: any) => {
  if (window.confirm(`Deseja excluir o serviço "${servico.nome}"?`)) {
    await deletarProdutoServico(servico.id);
    carregarServicos();
  }
};

  const navegarCadastro = () => {
    window.location.hash = '#/servicos/cadastrar';
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 fw-bold text-success m-0">Serviços</h1>
        <button
          type="button"
          className="btn btn-success d-flex align-items-center gap-2"
          onClick={navegarCadastro}
        >
          <span className="fw-bold">Novo Serviço</span>
        </button>
      </div>
      <TabelaDados
        colunas={colunas}
        dados={servicos}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ListagemServicos;
