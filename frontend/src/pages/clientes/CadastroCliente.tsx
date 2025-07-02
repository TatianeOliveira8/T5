import React from 'react';
import FormularioPadrao from '../../components/FormularioPadrao';
import { cadastrarCliente } from '../../services/clienteService';

const campos = [
  {
    nome: 'nome',
    rotulo: 'Nome Completo',
    tipo: 'text',
    valor: '',
    placeholder: 'Digite o nome completo',
    obrigatorio: true,
  },
  {
    nome: 'nomeSocial',
    rotulo: 'Nome Social',
    tipo: 'text',
    valor: '',
    placeholder: 'Digite o nome social',
    obrigatorio: false,
  },
  {
    nome: 'cpf',
    rotulo: 'CPF',
    tipo: 'text',
    valor: '',
    placeholder: '000.000.000-00',
    obrigatorio: true,
  },
  {
    nome: 'dataEmissaoCpf',
    rotulo: 'Data de Emissão do CPF',
    tipo: 'date',
    valor: '',
    placeholder: '',
    obrigatorio: true,
  },
  {
    nome: 'rg',
    rotulo: 'RG',
    tipo: 'text',
    valor: '',
    placeholder: 'Digite o RG',
    obrigatorio: true,
  },
  {
    nome: 'ddd',
    rotulo: 'DDD',
    tipo: 'text',
    valor: '',
    placeholder: '00',
    obrigatorio: true,
  },
  {
    nome: 'numeroTelefone',
    rotulo: 'Telefone',
    tipo: 'text',
    valor: '',
    placeholder: '00000-0000',
    obrigatorio: true,
  },
];

const CadastroCliente: React.FC = () => {
  const aoEnviar = async (dados: Record<string, string>) => {
    try {
      await cadastrarCliente({
        nome: dados.nome,
        nomeSocial: dados.nomeSocial || '',
        cpf: dados.cpf,
        dataEmissaoCpf: dados.dataEmissaoCpf,
        rg: dados.rg,
        ddd: dados.ddd,
        numeroTelefone: dados.numeroTelefone,
      });
      alert('Cliente cadastrado com sucesso!');
      window.location.hash = '#/clientes';
    } catch (erro) {
      console.error(erro);
      alert('Erro ao cadastrar cliente.');
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
            titulo="Cadastrar Cliente"
            campos={campos}
            aoEnviar={aoEnviar}
            aoCancelar={aoCancelar}
          />
        </div>
      </div>
    </div>
  );
};

export default CadastroCliente;
