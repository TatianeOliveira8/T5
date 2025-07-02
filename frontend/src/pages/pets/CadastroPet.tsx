import React from 'react';
import FormularioPadrao from '../../components/FormularioPadrao';
import { criarPet } from '../../services/petService';
import { buscarCliente } from '../../services/clienteService'; // importe o serviço correto

const campos = [
  { nome: 'nome', rotulo: 'Nome do Pet', tipo: 'text', valor: '', placeholder: 'Digite o nome do pet', obrigatorio: true },
  { nome: 'raca', rotulo: 'Raça', tipo: 'text', valor: '', placeholder: 'Digite a raça', obrigatorio: true },
  { nome: 'genero', rotulo: 'Gênero', tipo: 'text', valor: '', placeholder: 'M/F', obrigatorio: true },
  { nome: 'tipo', rotulo: 'Tipo', tipo: 'text', valor: '', placeholder: 'Cão, Gato, etc.', obrigatorio: true },
  { nome: 'cpfResponsavel', rotulo: 'CPF do Responsável', tipo: 'text', valor: '', placeholder: '000.000.000-00', obrigatorio: true }
];

const CadastroPet: React.FC = () => {
  const aoEnviar = async (dados: Record<string, string>) => {
    try {
      const cpfLimpo = dados.cpfResponsavel.replace(/\D/g, '');

      // Busca o cliente usando o serviço correto
      const cliente = await buscarCliente(cpfLimpo);

      if (!cliente || !cliente.id) {
        alert('Cliente não encontrado para o CPF informado.');
        return;
      }

      const petData = {
        nome: dados.nome,
        raca: dados.raca,
        genero: dados.genero,
        tipo: dados.tipo,
        clienteId: cliente.id,
      };

      await criarPet(petData);
      alert('Pet cadastrado com sucesso!');
      window.location.hash = '#/pets';
    } catch (error) {
      alert('Erro ao cadastrar pet.');
      console.error(error);
    }
  };

  const aoCancelar = () => {
    window.location.hash = '#/pets';
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <FormularioPadrao
            campos={campos}
            aoEnviar={aoEnviar}
            aoCancelar={aoCancelar}
            titulo="Cadastrar Pet"
          />
        </div>
      </div>
    </div>
  );
};

export default CadastroPet;
