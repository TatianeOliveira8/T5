import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar telefone
export async function criarTelefone(req: Request, res: Response) {
  try {
    const { ddd, numero, clienteId } = req.body;

    const telefone = await prisma.telefone.create({
      data: { ddd, numero, clienteId }
    });

    res.status(201).json(telefone);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar telefone.' });
  }
}

// Listar todos os telefones
export async function listarTelefones(req: Request, res: Response) {
  try {
    const telefones = await prisma.telefone.findMany({
      include: { cliente: true }
    });

    res.json(telefones);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar telefones.' });
  }
}

// Buscar um telefone por ID
export async function buscarTelefonePorId(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const telefone = await prisma.telefone.findUnique({
      where: { id },
      include: { cliente: true }
    });

    if (!telefone) {
      return res.status(404).json({ error: 'Telefone não encontrado.' });
    }

    res.json(telefone);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar telefone.' });
  }
}

// Atualizar telefone por ID
export async function atualizarTelefone(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { ddd, numero } = req.body;

    const telefoneAtualizado = await prisma.telefone.update({
      where: { id },
      data: { ddd, numero }
    });

    res.json(telefoneAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar telefone.' });
  }
}

// Deletar telefone por ID
export async function deletarTelefone(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    await prisma.telefone.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar telefone.' });
  }
}
