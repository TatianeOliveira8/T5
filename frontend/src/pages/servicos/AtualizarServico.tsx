import React, { useEffect, useState } from 'react';
import FormularioPadrao from '../../components/FormularioPadrao';
import {
  atualizarProdutoServico,
  listarPorTipo
} from '../../services/produtoServicoService';

const AtualizarServico: React.FC = () => {
  const [servico, setServico] = useState<any | null>(null);

  const id = Number(window.location.hash.split('/').pop());

  useEffect(() => {
    const carregarServico = async () => {
      const lista = await listarPorTipo('SERVICO');
      const encontrado = lista.find((s: any) => s.id === id);
      setServico(encontrado);
    };

    carregarServico();
  }, [id]);

  const campos = [
    {
      nome: 'novoNome',
      rotulo: 'Novo Nome do Serviço',
      tipo: 'text',
      valor: servico?.nome || '',
      placeholder: 'Deixe em branco para manter',
      obrigatorio: false,
    },
    {
      nome: 'novoPreco',
      rotulo: 'Novo Preço (R$)',
      tipo: 'number',
      valor: servico?.preco || '',
      placeholder: 'Deixe em branco para manter',
      obrigatorio: false,
    },
  ];

  const aoEnviar = async (dados: Record<string, string>) => {
    if (!servico) return;

    const nome = dados.novoNome.trim() || servico.nome;
    const preco = dados.novoPreco ? parseFloat(dados.novoPreco) : Number(servico.preco);

    try {
      await atualizarProdutoServico(id, {
        nome,
        preco,
        tipo: 'SERVICO',
        codigo: servico.codigo, // necessário
      });

      alert('Serviço atualizado com sucesso!');
      window.location.hash = '#/servicos';
    } catch (error) {
      alert('Erro ao atualizar serviço.');
      console.error(error);
    }
  };

  const aoCancelar = () => {
    window.location.hash = '#/servicos';
  };

  if (!servico) return <p className="text-center mt-5">Carregando serviço...</p>;

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <FormularioPadrao
            campos={campos}
            aoEnviar={aoEnviar}
            aoCancelar={aoCancelar}
            titulo="Atualizar Serviço"
          />
        </div>
      </div>
    </div>
  );
};

export default AtualizarServico;
