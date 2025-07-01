// Serviço para consumir a API REST de clientes

export interface Cliente {
  id?: number;
  nome: string;
  nomeSocial?: string;
  cpf: string;
  rg: string;
  dataEmissaoCpf: string;
  ddd: string;
  numeroTelefone: string;
}

const API_URL = 'http://localhost:3001/clientes';

// GET /clientes
export async function listarClientes(): Promise<Cliente[]> {
  const resp = await fetch(API_URL);
  if (!resp.ok) throw new Error('Erro ao listar clientes');
  return resp.json();
}

// GET /clientes/:cpf
export async function buscarCliente(cpf: string): Promise<Cliente> {
  const resp = await fetch(`${API_URL}/${cpf}`);
  if (!resp.ok) throw new Error('Erro ao buscar cliente');
  return resp.json();
}

// POST /clientes
export async function cadastrarCliente(cliente: Omit<Cliente, 'id'>): Promise<Cliente> {
  const resp = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });
  if (!resp.ok) throw new Error('Erro ao cadastrar cliente');
  return resp.json();
}

// PUT /clientes/:cpf
export async function atualizarCliente(
  cpf: string,
  dados: { novoNome?: string; novoNomeSocial?: string }
): Promise<Cliente> {
  const resp = await fetch(`${API_URL}/${cpf}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!resp.ok) throw new Error('Erro ao atualizar cliente');
  return resp.json();
}

// DELETE /clientes/:cpf
export async function excluirCliente(cpf: string): Promise<void> {
  const resp = await fetch(`${API_URL}/${cpf}`, { method: 'DELETE' });
  if (!resp.ok) throw new Error('Erro ao excluir cliente');
}
