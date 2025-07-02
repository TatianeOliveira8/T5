import React, { useEffect, useState } from 'react';
import TabelaDados from '../../components/TabelaDados';
import { listarClientes, excluirCliente, Cliente } from '../../services/clienteService';

const colunas = [
  { key: 'nome', label: 'Nome' },
  { key: 'nomeSocial', label: 'Nome Social' },
  { key: 'cpfFormatado', label: 'CPF' }, // mudou para cpfFormatado
];

// Função para formatar CPF: 000.000.000-00
function formatarCpf(cpf: string): string {
  const cpfLimpo = cpf.replace(/\D/g, '');
  return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

const ListagemClientes: React.FC = () => {
  const [clientes, setClientes] = useState<any[]>([]); // any para injetar campo extra

  const carregarClientes = () => {
    listarClientes()
      .then(data => {
        const comCpfFormatado = data.map(cliente => ({
          ...cliente,
          nomeSocial: cliente.nomeSocial || '-', // caso vazio
          cpfFormatado: formatarCpf(cliente.cpf),
        }));

        const ordenados = comCpfFormatado.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

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
