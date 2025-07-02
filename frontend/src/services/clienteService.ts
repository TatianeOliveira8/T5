export interface Telefone {
  id?: number;
  ddd: string;
  numero: string;
}

export interface Cliente {
  id?: number;
  nome: string;
  nomeSocial?: string;
  cpf: string;
  rg: string;
  dataEmissaoCpf: string;
  telefones: Telefone[];
  pets?: any[];
  consumos?: any[];
}

const API_URL = 'http://localhost:3001/clientes';

// GET /clientes
export async function listarClientes(): Promise<Cliente[]> {
  const resp = await fetch(API_URL);
  if (!resp.ok) throw new Error('Erro ao listar clientes');
  return resp.json();
}

// GET /clientes/cpf/:cpf
export async function buscarCliente(cpf: string): Promise<Cliente> {
  const cpfLimpo = cpf.replace(/\D/g, '');
  const resp = await fetch(`${API_URL}/cpf/${cpfLimpo}`);
  if (!resp.ok) throw new Error('Erro ao buscar cliente');
  return resp.json();
}

// POST /clientes
export async function cadastrarCliente(cliente: {
  nome: string;
  nomeSocial?: string;
  cpf: string;
  rg: string;
  dataEmissaoCpf: string;
  ddd: string;
  numeroTelefone: string;
}): Promise<Cliente> {
  const resp = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });
  if (!resp.ok) throw new Error('Erro ao cadastrar cliente');
  return resp.json();
}

// PUT /clientes/cpf/:cpf
export async function atualizarCliente(
  cpf: string,
  dados: { novoNome?: string; novoNomeSocial?: string }
): Promise<Cliente> {
  const cpfLimpo = cpf.replace(/\D/g, '');
  const resp = await fetch(`${API_URL}/cpf/${cpfLimpo}`, {  // corrigido aqui
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  if (!resp.ok) throw new Error('Erro ao atualizar cliente');
  return resp.json();
}

// DELETE /clientes/cpf/:cpf
export async function excluirCliente(cpf: string): Promise<void> {
  const cpfLimpo = cpf.replace(/\D/g, '');
  const resp = await fetch(`${API_URL}/cpf/${cpfLimpo}`, {  // corrigido aqui
    method: 'DELETE',
  });
  if (!resp.ok) throw new Error('Erro ao excluir cliente');
}
