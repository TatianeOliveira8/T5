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

const ListagemProdutos: React.FC = () => {
  const [produtos, setProdutos] = useState<any[]>([]);

  const carregarProdutos = async () => {
    const lista = await listarPorTipo('PRODUTO');
    setProdutos(lista);
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleEdit = (produto: any) => {
    window.location.hash = `#/produtos/editar/${produto.id}`;
  };

  const handleDelete = async (produto: any) => {
    if (window.confirm(`Deseja excluir o produto "${produto.nome}"?`)) {
      await deletarProdutoServico(produto.id);
      carregarProdutos(); // Atualiza a lista após deletar
    }
  };

  const navegarCadastro = () => {
    window.location.hash = '#/produtos/cadastrar';
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 fw-bold text-success m-0">Produtos</h1>
        <button
          type="button"
          className="btn btn-success d-flex align-items-center gap-2"
          onClick={navegarCadastro}
        >
          <span className="fw-bold">Novo Produto</span>
        </button>
      </div>
      <TabelaDados
        colunas={colunas}
        dados={produtos}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ListagemProdutos;
