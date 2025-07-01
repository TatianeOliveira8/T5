import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function listarClientes(req: Request, res: Response) {
  try {
    const clientes = await prisma.cliente.findMany({
      include: { telefones: true, pets: true, consumos: true }
    });
    res.json(clientes);
  } catch (error) {
    console.error('Erro listarClientes:', error);
    res.status(500).json({ error: 'Erro ao buscar clientes.' });
  }
}

export async function buscarClientePorCpf(req: Request, res: Response) {
  try {
    const { cpf } = req.params;
    const cpfLimpo = cpf.replace(/\D/g, '');

    const cliente = await prisma.cliente.findUnique({
      where: { cpf: cpfLimpo },
      include: { telefones: true, pets: true, consumos: true }
    });

    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado.' });
    res.json(cliente);
  } catch (error) {
    console.error('Erro buscarClientePorCpf:', error);
    res.status(500).json({ error: 'Erro ao buscar cliente.' });
  }
}

export async function criarCliente(req: Request, res: Response) {
  try {
    const { nome, nomeSocial, cpf, dataEmissaoCpf, rg, ddd, numeroTelefone } = req.body;
    const cpfLimpo = cpf.replace(/\D/g, '');

    const novoCliente = await prisma.cliente.create({
      data: {
        nome,
        nomeSocial,
        cpf: cpfLimpo,
        dataEmissaoCpf: new Date(dataEmissaoCpf),
        rg,
        telefones: {
          create: { ddd, numero: numeroTelefone }
        }
      },
      include: { telefones: true }
    });

    res.status(201).json(novoCliente);
  } catch (error) {
    console.error('Erro criarCliente:', error);
    res.status(500).json({ error: 'Erro ao criar cliente.' });
  }
}

export async function atualizarCliente(req: Request, res: Response) {
  try {
    const { cpf } = req.params;
    const { novoNome, novoNomeSocial } = req.body;
    const cpfLimpo = cpf.replace(/\D/g, '');

    const clienteAtualizado = await prisma.cliente.update({
      where: { cpf: cpfLimpo },
      data: {
        nome: novoNome || undefined,
        nomeSocial: novoNomeSocial || undefined
      },
      include: { telefones: true }
    });

    res.json(clienteAtualizado);
  } catch (error) {
    console.error('Erro atualizarCliente:', error);
    res.status(500).json({ error: 'Erro ao atualizar cliente.' });
  }
}

export async function deletarCliente(req: Request, res: Response) {
  try {
    const { cpf } = req.params;
    const cpfLimpo = cpf.replace(/\D/g, '');

    const cliente = await prisma.cliente.findUnique({ where: { cpf: cpfLimpo } });
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado.' });

    await prisma.consumo.deleteMany({ where: { clienteId: cliente.id } });
    await prisma.pet.deleteMany({ where: { clienteId: cliente.id } });
    await prisma.telefone.deleteMany({ where: { clienteId: cliente.id } });
    await prisma.cliente.delete({ where: { cpf: cpfLimpo } });

    res.status(204).send();
  } catch (error) {
    console.error('Erro deletarCliente:', error);
    res.status(500).json({ error: 'Erro ao deletar cliente.' });
  }
}
