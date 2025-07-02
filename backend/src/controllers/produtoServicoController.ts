import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar Produto ou Serviço
export async function criarProdutoServico(req: Request, res: Response) {
  try {
    const { nome, preco, tipo } = req.body;

    const prefixo = tipo === 'PRODUTO' ? 'P' : 'S';

    // Buscar último código do tipo ativo e com prefixo correto
    const ultimo = await prisma.produtoServico.findFirst({
      where: {
        tipo,
        codigo: {
          startsWith: prefixo,
        },
      },
      orderBy: {
        id: 'desc',
      },
      select: {
        codigo: true,
      },
    });

    let numero = 1;

    if (ultimo && ultimo.codigo) {
      const numeroStr = ultimo.codigo.slice(1);
      const numParse = parseInt(numeroStr, 10);

      if (!isNaN(numParse)) {
        numero = numParse + 1;
      }
    }

    const novoCodigo = prefixo + numero;

    const novo = await prisma.produtoServico.create({
      data: {
        codigo: novoCodigo,
        nome,
        preco: Number(preco),
        tipo,
        ativo: true,
      },
    });

    res.status(201).json(novo);
  } catch (error) {
    console.error('Erro criarProdutoServico:', error);
    res.status(500).json({ error: 'Erro ao criar produto ou serviço.' });
  }
}

// Listar somente ativos
export async function listarProdutosServicos(req: Request, res: Response) {
  try {
    const lista = await prisma.produtoServico.findMany({
      where: { ativo: true },
    });

    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar produtos e serviços.' });
  }
}

// Atualizar por ID
export async function atualizarProdutoServico(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { nome, preco, tipo } = req.body;

    const atualizado = await prisma.produtoServico.update({
      where: { id },
      data: {
        nome,
        preco: Number(preco),
        tipo,
      },
    });

    res.json(atualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto ou serviço.' });
  }
}

// "Deletar" por ID = desativar
export async function deletarProdutoServico(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const atualizado = await prisma.produtoServico.update({
      where: { id },
      data: { ativo: false },
    });

    res.status(200).json(atualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao desativar produto ou serviço.' });
  }
}

// Buscar produto ou serviço por ID
export async function buscarProdutoServicoPorId(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const produtoServico = await prisma.produtoServico.findUnique({
      where: { id },
    });

    if (!produtoServico) {
      return res.status(404).json({ error: 'Produto ou serviço não encontrado.' });
    }

    res.json(produtoServico);
  } catch (error) {
    console.error('Erro ao buscar produto ou serviço por ID:', error);
    res.status(500).json({ error: 'Erro ao buscar produto ou serviço.' });
  }
}
