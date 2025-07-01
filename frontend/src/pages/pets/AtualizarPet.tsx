import React, { useEffect, useState } from 'react';
import FormularioPadrao from '../../components/FormularioPadrao';
import { buscarPetPorId, atualizarPet } from '../../services/petService';
import { useParams } from 'react-router-dom'; // ou use hash params conforme seu roteamento

const camposBase = [
  { nome: 'novoNome', rotulo: 'Novo Nome do Pet', tipo: 'text', valor: '', placeholder: 'Deixe em branco para manter', obrigatorio: false },
  { nome: 'novaRaca', rotulo: 'Nova Raça', tipo: 'text', valor: '', placeholder: 'Deixe em branco para manter', obrigatorio: false },
  { nome: 'novoGenero', rotulo: 'Novo Gênero (M/F)', tipo: 'text', valor: '', placeholder: 'Deixe em branco para manter', obrigatorio: false },
  { nome: 'novoTipo', rotulo: 'Novo Tipo do Pet', tipo: 'text', valor: '', placeholder: 'Deixe em branco para manter', obrigatorio: false }
];

const AtualizarPet: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<any>(null);
  const [campos, setCampos] = useState(camposBase);

  useEffect(() => {
    if (id) {
      buscarPetPorId(Number(id)).then(petDados => {
        setPet(petDados);
      });
    }
  }, [id]);

  const aoEnviar = async (dados: Record<string, string>) => {
    if (!pet) return;
    const nome = dados.novoNome || pet.nome;
    const raca = dados.novaRaca || pet.raca;
    const genero = dados.novoGenero || pet.genero;
    const tipo = dados.novoTipo || pet.tipo;

    await atualizarPet(pet.id, { nome, raca, genero, tipo });
    alert('Pet atualizado com sucesso!');
    window.location.hash = '#/pets';
  };

  const aoCancelar = () => {
    window.location.hash = '#/pets';
  };

  if (!pet) return <div>Carregando pet...</div>;

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <FormularioPadrao
            campos={campos}
            aoEnviar={aoEnviar}
            aoCancelar={aoCancelar}
            titulo="Atualizar Pet"
          />
          <div className="text-muted mt-3 small">Nome do Responsável: {pet.cliente?.nome}</div>
        </div>
      </div>
    </div>
  );
};

export default AtualizarPet;
