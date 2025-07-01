import React from 'react';
import FormularioPadrao from '../../components/FormularioPadrao';
import { criarPet } from '../../services/petService';

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
      // Limpa CPF removendo tudo que não for número
      const cpfLimpo = dados.cpfResponsavel.replace(/\D/g, '');

      // Busca cliente pelo CPF limpo
      const clienteId = await buscarClienteIdPorCpf(cpfLimpo);
      if (!clienteId) {
        alert('Cliente não encontrado para o CPF informado.');
        return;
      }

      const petData = {
        nome: dados.nome,
        raca: dados.raca,
        genero: dados.genero,
        tipo: dados.tipo,
        clienteId
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

  // Função para buscar cliente pelo CPF limpo
  async function buscarClienteIdPorCpf(cpfLimpo: string): Promise<number | null> {
    try {
      const res = await fetch(`http://localhost:3001/pets/cpf/${cpfLimpo}`);
      if (!res.ok) return null;
      const cliente = await res.json();
      if(cliente.length === 0) return null; 
      return cliente[0].id ?? null;
    } catch {
      return null;
    }
  }

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
