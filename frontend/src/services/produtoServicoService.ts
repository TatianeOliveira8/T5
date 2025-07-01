const API_URL = 'http://localhost:3001/produtos-servicos';

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

export async function deletarProdutoServico(id: number) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
}
