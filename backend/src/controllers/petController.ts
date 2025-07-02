import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar pet
export async function criarPet(req: Request, res: Response) {
  try {
    const { nome, tipo, raca, genero, clienteId } = req.body;

    const pet = await prisma.pet.create({
      data: { nome, tipo, raca, genero, clienteId, ativo: true },
    });

    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar pet.' });
  }
}

// Listar todos os pets ativos
export async function listarPets(req: Request, res: Response) {
  try {
    const pets = await prisma.pet.findMany({
      where: { ativo: true },
      include: { cliente: true },
    });

    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar pets.' });
  }
}

// Buscar pet por ID (ativo)
export async function buscarPetPorId(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const pet = await prisma.pet.findFirst({
      where: { id, ativo: true },
      include: { cliente: true },
    });

    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado.' });
    }

    res.json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pet.' });
  }
}

// Listar pets ativos de um cliente pelo clienteId
export async function listarPetsPorCliente(req: Request, res: Response) {
  try {
    const clienteId = Number(req.params.clienteId);

    const pets = await prisma.pet.findMany({
      where: { clienteId, ativo: true },
    });

    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar pets do cliente.' });
  }
}

// Listae pets ativos pelo CPF do cliente
export async function listarPetsPorCpfCliente(req: Request, res: Response) {
  try {
    let { cpf } = req.params;

cpf = cpf.replace(/\D/g, ''); 

cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

console.log(cpf); 

    const cliente = await prisma.cliente.findUnique({ where: { cpf } });
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado.' });

    const pets = await prisma.pet.findMany({
      where: { clienteId: cliente.id, ativo: true },
     
    });

    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar pets pelo CPF do cliente.' });
  }
}

// Atualizar pet por ID
export async function atualizarPet(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { nome, tipo, raca, genero } = req.body;

    const petAtualizado = await prisma.pet.update({
      where: { id },
      data: { nome, tipo, raca, genero },
    });

    res.json(petAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar pet.' });
  }
}

// "Deletar" pet por ID (desativar)
export async function deletarPet(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const petDesativado = await prisma.pet.update({
      where: { id },
      data: { ativo: false },
    });

    res.status(200).json(petDesativado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao desativar pet.' });
  }
}
