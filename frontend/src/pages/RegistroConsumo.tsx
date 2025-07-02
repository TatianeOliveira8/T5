import React from 'react';
import FormularioPadrao from '../components/FormularioPadrao';
import { criarConsumo } from '../services/consumoService';
import { buscarProdutoServicoPorId } from '../services/produtoServicoService';

const campos = [
  {
    nome: 'cpfCliente',
    rotulo: 'CPF do Cliente',
    tipo: 'text',
    valor: '',
    placeholder: '000.000.000-00',
    obrigatorio: true,
  },
  {
    nome: 'idItem',
    rotulo: 'ID do Produto ou Serviço',
    tipo: 'number',
    valor: '',
    placeholder: 'Ex: 1',
    obrigatorio: true,
  },
];

const RegistroConsumo: React.FC = () => {
  const aoEnviar = async (dados: Record<string, string>) => {
    try {
      if (!dados.cpfCliente || !dados.idItem) {
        alert('Preencha todos os campos obrigatórios.');
        return;
      }

      const idItem = Number(dados.idItem);
      if (isNaN(idItem)) {
        alert('ID do produto/serviço inválido.');
        return;
      }

      const produto = await buscarProdutoServicoPorId(idItem);
      if (!produto) {
        alert('Produto ou serviço não encontrado.');
        return;
      }

      // Limpa CPF: remove tudo que não for número
      const cpfLimpo = dados.cpfCliente.replace(/\D/g, '');

      await criarConsumo({
        produtoServicoId: produto.id,
        cpfCliente: cpfLimpo,
        data: new Date().toISOString(),
      });

      alert('Consumo registrado com sucesso!');
      window.location.hash = '#/';
    } catch (erro) {
      console.error('Erro ao registrar consumo:', erro);
      alert('Erro ao registrar consumo.');
    }
  };

  const aoCancelar = () => {
    window.location.hash = '#/';
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <FormularioPadrao
            campos={campos}
            aoEnviar={aoEnviar}
            aoCancelar={aoCancelar}
            titulo="Registrar Consumo"
          />
        </div>
      </div>
    </div>
  );
};

export default RegistroConsumo;
