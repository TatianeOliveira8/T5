import React from 'react';
import FormularioPadrao from '../../components/FormularioPadrao';
import { criarProdutoServico } from '../../services/produtoServicoService';

const campos = [
  {
    nome: 'nome',
    rotulo: 'Nome do Serviço',
    tipo: 'text',
    valor: '',
    placeholder: 'Digite o nome do serviço',
    obrigatorio: true
  },
  {
    nome: 'preco',
    rotulo: 'Preço (R$)',
    tipo: 'number',
    valor: '',
    placeholder: '0.00',
    obrigatorio: true
  }
];

const CadastroServico: React.FC = () => {
  const aoEnviar = async (dados: Record<string, string>) => {
    const servico = {
      nome: dados.nome,
      preco: parseFloat(dados.preco),
      tipo: 'SERVICO'
    };

    try {
      await criarProdutoServico(servico);
      alert('Serviço cadastrado com sucesso!');
      window.location.hash = '#/servicos';
    } catch (error) {
      alert('Erro ao cadastrar serviço.');
      console.error(error);
    }
  };

  const aoCancelar = () => {
    window.location.hash = '#/servicos';
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <FormularioPadrao
            campos={campos}
            aoEnviar={aoEnviar}
            aoCancelar={aoCancelar}
            titulo="Cadastrar Serviço"
          />
        </div>
      </div>
    </div>
  );
};

export default CadastroServico;
