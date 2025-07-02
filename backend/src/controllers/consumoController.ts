import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar consumo
export async function criarConsumo(req: Request, res: Response) {
  try {
    const { produtoServicoId, cpfCliente, data } = req.body;

    if (!produtoServicoId || !cpfCliente) {
      return res.status(400).json({ error: 'produtoServicoId e cpfCliente são obrigatórios.' });
    }

    const cliente = await prisma.cliente.findUnique({ where: { cpf: cpfCliente } });
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado.' });

    const produtoServico = await prisma.produtoServico.findUnique({ where: { id: produtoServicoId } });
    if (!produtoServico) return res.status(404).json({ error: 'Produto ou serviço não encontrado.' });

    const consumoData = data && !isNaN(Date.parse(data)) ? new Date(data) : new Date();

    const novoConsumo = await prisma.consumo.create({
      data: {
        produtoServicoId,
        clienteId: cliente.id,
        data: consumoData,
      },
      include: {
        produtoServico: true,
        cliente: true,
      },
    });

    res.status(201).json(novoConsumo);
  } catch (error) {
    console.error('Erro ao criar consumo:', error);
    res.status(500).json({ error: 'Erro ao criar consumo.' });
  }
}

// Listar consumos
export async function listarConsumos(req: Request, res: Response) {
  try {
    const consumos = await prisma.consumo.findMany({
      include: { produtoServico: true, cliente: true },
    });
    res.json(consumos);
  } catch (error) {
    console.error('Erro ao listar consumos:', error);
    res.status(500).json({ error: 'Erro ao listar consumos.' });
  }
}

// Atualizar consumo por ID
export async function atualizarConsumo(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

    const { produtoServicoId, cpfCliente, data } = req.body;

    let clienteId;
    if (cpfCliente) {
      const cliente = await prisma.cliente.findUnique({ where: { cpf: cpfCliente } });
      if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado.' });
      clienteId = cliente.id;
    }

    if (produtoServicoId) {
      const produtoServico = await prisma.produtoServico.findUnique({ where: { id: produtoServicoId } });
      if (!produtoServico) return res.status(404).json({ error: 'Produto ou serviço não encontrado.' });
    }

    const consumoData = data && !isNaN(Date.parse(data)) ? new Date(data) : undefined;

    const consumoAtualizado = await prisma.consumo.update({
      where: { id },
      data: {
        ...(produtoServicoId && { produtoServicoId }),
        ...(clienteId && { clienteId }),
        ...(consumoData && { data: consumoData }),
      },
      include: { produtoServico: true, cliente: true },
    });

    res.json(consumoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar consumo:', error);
    res.status(500).json({ error: 'Erro ao atualizar consumo.' });
  }
}

// Deletar consumo por ID
export async function deletarConsumo(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

    await prisma.consumo.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar consumo:', error);
    res.status(500).json({ error: 'Erro ao deletar consumo.' });
  }
}
