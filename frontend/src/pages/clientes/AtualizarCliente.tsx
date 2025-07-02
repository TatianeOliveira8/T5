import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormularioPadrao from '../../components/FormularioPadrao';
import { buscarCliente, atualizarCliente, Cliente } from '../../services/clienteService';

const AtualizarCliente: React.FC = () => {
  const { cpf } = useParams<{ cpf: string }>();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    console.log('CPF recebido:', cpf);
    if (!cpf) return;

    setCarregando(true);

    buscarCliente(cpf)
      .then(dados => setCliente(dados))
      .catch(() => alert('Erro ao carregar cliente'))
      .finally(() => setCarregando(false));
  }, [cpf]);

  if (carregando) return <div>Carregando cliente...</div>;
  if (!cliente) return <div>Cliente não encontrado.</div>;

  const campos = [
    {
      nome: 'novoNome',
      rotulo: 'Novo Nome',
      tipo: 'text',
      valor: cliente.nome,
      placeholder: 'Deixe em branco para manter',
      obrigatorio: false,
    },
    {
      nome: 'novoNomeSocial',
      rotulo: 'Novo Nome Social',
      tipo: 'text',
      valor: cliente.nomeSocial || '',
      placeholder: 'Deixe em branco para manter',
      obrigatorio: false,
    },
  ];

  const aoEnviar = async (dados: Record<string, string>) => {
    try {
      await atualizarCliente(cpf!, {
        novoNome: dados.novoNome || cliente.nome,
        novoNomeSocial: dados.novoNomeSocial || cliente.nomeSocial || '',
      });

      alert('Cliente atualizado com sucesso!');
      window.location.hash = '#/clientes';
    } catch {
      alert('Erro ao atualizar cliente.');
    }
  };

  const aoCancelar = () => {
    window.location.hash = '#/clientes';
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <FormularioPadrao
            campos={campos}
            aoEnviar={aoEnviar}
            aoCancelar={aoCancelar}
            titulo="Atualizar Cliente"
          />
        </div>
      </div>
    </div>
  );
};

export default AtualizarCliente;
