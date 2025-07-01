import React from 'react';
import FormularioPadrao from '../../components/FormularioPadrao';

const servico = {
  nome: 'Banho e Tosa',
  preco: '60.00',
};

const campos = [
  { nome: 'novoNome', rotulo: 'Novo Nome do Serviço', tipo: 'text', valor: '', placeholder: 'Deixe em branco para manter', obrigatorio: false },
  { nome: 'novoPreco', rotulo: 'Novo Preço (R$)', tipo: 'number', valor: '', placeholder: 'Deixe em branco para manter', obrigatorio: false }
];

const AtualizarServico: React.FC = () => {
  const aoEnviar = (dados: Record<string, string>) => {
    const nome = dados.novoNome || servico.nome;
    const preco = dados.novoPreco || servico.preco;
    alert(`Serviço atualizado!\nNome: ${nome}\nPreço: R$ ${preco}`);
    window.location.hash = '#/servicos';
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
            titulo="Atualizar Serviço"
          />
        </div>
      </div>
    </div>
  );
};

export default AtualizarServico;
