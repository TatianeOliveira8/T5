import React, { useEffect, useState } from 'react';
import TabelaDados from '../../components/TabelaDados';
import { listarPets, deletarPet } from '../../services/petService';

const colunas = [
  { key: 'nome', label: 'Nome' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'raca', label: 'Raça' },
  { key: 'genero', label: 'Gênero' },
  { key: 'clienteNome', label: 'Cliente' } // cliente.nome vindo do backend
];

const ListagemPets: React.FC = () => {
  const [pets, setPets] = useState<any[]>([]);

  const carregarPets = async () => {
    const lista = await listarPets();
    // Mapear para o formato esperado no front (clienteNome)
    const petsFormatados = lista.map(p => ({
      ...p,
      clienteNome: p.cliente?.nome || 'Sem dono',
    }));
    setPets(petsFormatados);
  };

  useEffect(() => {
    carregarPets();
  }, []);

  const handleEdit = (pet: any) => {
    window.location.hash = `#/pets/editar/${pet.id}`;
  };

  const handleDelete = async (pet: any) => {
    if (window.confirm(`Deseja excluir o pet "${pet.nome}"?`)) {
      await deletarPet(pet.id);
      carregarPets();
    }
  };

  const navegarCadastro = () => {
    window.location.hash = '#/pets/cadastrar';
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 fw-bold text-success m-0">Pets</h1>
        <button
          type="button"
          className="btn btn-success d-flex align-items-center gap-2"
          onClick={navegarCadastro}
        >
          <span className="fw-bold">Novo Pet</span>
        </button>
      </div>
      <TabelaDados
        colunas={colunas}
        dados={pets}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ListagemPets;
