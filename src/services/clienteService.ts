const API_URL = 'http://localhost:3001/clientes';

export interface Cliente {
  id?: number;
  nome: string;
  cpf: string;
  telefone: string;
}

export async function listarClientes(): Promise<Cliente[]> {
  const resp = await fetch(API_URL);
  return resp.json();
}

export async function buscarCliente(id: number): Promise<Cliente> {
  const resp = await fetch(`${API_URL}/${id}`);
  return resp.json();
}

export async function cadastrarCliente(cliente: Omit<Cliente, 'id'>): Promise<Cliente> {
  const resp = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });
  return resp.json();
}

export async function atualizarCliente(id: number, cliente: Omit<Cliente, 'id'>): Promise<Cliente> {
  const resp = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });
  return resp.json();
}

export async function removerCliente(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}
