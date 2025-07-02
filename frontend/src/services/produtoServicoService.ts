const API_URL = 'http://localhost:3001/produtos-servicos';

// Lista todos os produtos/serviços filtrando por tipo e ativo
export async function listarPorTipo(tipo: 'PRODUTO' | 'SERVICO') {
  const res = await fetch(API_URL);
  const todos = await res.json();

  const filtrados = todos.filter((item: any) => item.tipo === tipo && item.ativo === true);

  // Ordena por data de criação (mais recente primeiro)
  filtrados.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return filtrados;
}

export async function criarProdutoServico(dados: any) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!res.ok) throw new Error('Erro ao criar produto/serviço');
  return res.json();
}

export async function atualizarProdutoServico(id: number, dados: any) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  return res.json();
}

// Deleta produto/serviço por ID
export async function deletarProdutoServico(id: number) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
}

export async function buscarProdutoServicoPorId(id: number) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Produto/Serviço não encontrado');
  return res.json();
}

