import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar consumo
export async function criarConsumo(req: Request, res: Response) {
  try {
    const { petId, produtoServicoId, clienteId, data } = req.body;

    const novoConsumo = await prisma.consumo.create({
      data: {
        petId,
        produtoServicoId,
        clienteId,
        data: data ? new Date(data) : undefined,
      },
      include: {
        pet: true,
        produtoServico: true,
        cliente: true,
      },
    });

    res.status(201).json(novoConsumo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar consumo.' });
  }
}

// Listar todos os consumos
export async function listarConsumos(req: Request, res: Response) {
  try {
    const consumos = await prisma.consumo.findMany({
      include: {
        pet: true,
        produtoServico: true,
        cliente: true,
      },
    });

    res.json(consumos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar consumos.' });
  }
}

// Atualizar consumo por ID
export async function atualizarConsumo(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { petId, produtoServicoId, clienteId, data } = req.body;

    const consumoAtualizado = await prisma.consumo.update({
      where: { id },
      data: {
        petId,
        produtoServicoId,
        clienteId,
        data: data ? new Date(data) : undefined,
      },
      include: {
        pet: true,
        produtoServico: true,
        cliente: true,
      },
    });

    res.json(consumoAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar consumo.' });
  }
}

// Deletar consumo por ID
export async function deletarConsumo(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    await prisma.consumo.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar consumo.' });
  }
}
