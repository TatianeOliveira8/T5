const API_URL = 'http://localhost:3001/consumos';

// Lista todos os consumos
export async function listarConsumo() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erro ao listar consumos');

  const consumos = await res.json();
  consumos.sort((a: any, b: any) => b.id - a.id); // mais recentes primeiro
  return consumos;
}

// Cria um novo consumo
export async function criarConsumo(dados: {
  cpfCliente: string;
  produtoServicoId: number;
  data: string; // ISO string
}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });

  if (!res.ok) throw new Error('Erro ao criar consumo');
  return res.json();
}

// Busca um consumo por ID
export async function buscarConsumoPorId(id: number) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Consumo não encontrado');
  return res.json();
}

// Atualiza um consumo por ID
export async function atualizarConsumo(
  id: number,
  dados: {
    cpfCliente?: string;
    produtoServicoId?: number;
    data?: string;
  }
) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });

  if (!res.ok) throw new Error('Erro ao atualizar consumo');
  return res.json();
}

// Deleta (ou desativa) um consumo por ID
export async function deletarConsumo(id: number) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar consumo');
}
