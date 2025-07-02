const BASE_URL = 'http://localhost:3001/dashboard';

export async function getTopClientesQuantidade() {
  const res = await fetch(`${BASE_URL}/top-clientes-qtd`);
  return res.json();
}

export async function getItensMaisConsumidos() {
  const res = await fetch(`${BASE_URL}/itens-mais-consumidos`);
  return res.json();
}

export async function getConsumoPorTipoRaca() {
  const res = await fetch(`${BASE_URL}/por-tipo-raca`);
  return res.json();
}

export async function getTopClientesValor() {
  const res = await fetch(`${BASE_URL}/top-clientes-valor`);
  return res.json();
}
