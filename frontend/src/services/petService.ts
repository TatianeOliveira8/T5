const API_URL = 'http://localhost:3001/pets';

export async function listarPets() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erro ao listar pets');
  const pets = await res.json();
  pets.sort((a: any, b: any) => b.id - a.id);
  return pets;
}

export async function criarPet(dados: any) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error('Erro ao criar pet');
  return res.json();
}

export async function buscarPetPorId(id: number) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Pet não encontrado');
  return res.json();
}

export async function listarPetsPorCpf(cpf: string) {
  const cpfLimpo = cpf.replace(/\D/g, ''); // limpa CPF
  const res = await fetch(`${API_URL}/cpf/${cpfLimpo}`);
  if (!res.ok) throw new Error('Pets não encontrados para o CPF informado');
  return res.json();
}

export async function atualizarPet(id: number, dados: any) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error('Erro ao atualizar pet');
  return res.json();
}

export async function deletarPet(id: number) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar pet');
}
