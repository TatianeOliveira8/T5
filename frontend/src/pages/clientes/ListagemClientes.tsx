import React, { useEffect, useState } from 'react';
import TabelaDados from '../../components/TabelaDados';
import { listarClientes, excluirCliente, Cliente } from '../../services/clienteService';

const colunas = [
  { key: 'nome', label: 'Nome' },
  { key: 'nomeSocial', label: 'Nome Social' },
  { key: 'cpf', label: 'CPF' }
];

const ListagemClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const carregarClientes = () => {
    listarClientes()
      .then(data => {
        const ordenados = data.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
        setClientes(ordenados);
      })
      .catch(console.error);
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const handleEdit = (cliente: Cliente) => {
    window.location.hash = `#/clientes/editar/${cliente.cpf}`;
  };

  const handleDelete = async (cliente: Cliente) => {
    if (!window.confirm(`Confirma exclusão do cliente ${cliente.nome}?`)) return;

    try {
      await excluirCliente(cliente.cpf);
      alert('Cliente removido com sucesso!');
      carregarClientes();
    } catch (erro) {
      console.error(erro);
      alert('Erro ao remover cliente.');
    }
  };

  const navegarCadastro = () => {
    window.location.hash = '#/clientes/cadastrar';
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 fw-bold text-success m-0">Clientes</h1>
        <button
          type="button"
          className="btn btn-success d-flex align-items-center gap-2"
          onClick={navegarCadastro}
        >
          <span className="fw-bold">Novo Cliente</span>
        </button>
      </div>
      <TabelaDados
        colunas={colunas}
        dados={clientes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ListagemClientes;
