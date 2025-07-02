import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const top10ClientesMaisConsumiram = async (req: Request, res: Response) => {
  const dados = await prisma.consumo.groupBy({
    by: ['clienteId'],
    _count: true,
    orderBy: { _count: { id: 'desc' } },
    take: 10,
  });

  const clientes = await Promise.all(
    dados.map(async (c) => {
      const cliente = await prisma.cliente.findUnique({ where: { id: c.clienteId } });
      return { nome: cliente?.nome, quantidade: c._count };
    })
  );

  res.json(clientes);
};

export const produtosServicosMaisConsumidos = async (req: Request, res: Response) => {
  const dados = await prisma.consumo.groupBy({
    by: ['produtoServicoId'],
    _count: true,
    orderBy: { _count: { id: 'desc' } },
    take: 10,
  });

  const itens = await Promise.all(
    dados.map(async (item) => {
      const produto = await prisma.produtoServico.findUnique({ where: { id: item.produtoServicoId } });
      return { nome: produto?.nome, tipo: produto?.tipo, quantidade: item._count };
    })
  );

  res.json(itens);
};

export const consumoPorTipoERaca = async (req: Request, res: Response) => {
  const pets = await prisma.pet.findMany({
    where: { ativo: true },
    include: {
      cliente: {
        include: {
          consumos: {
            include: { produtoServico: true }
          }
        }
      }
    }
  });

  const agrupadoMap: Record<string, { tipo: string; raca: string; produtos: number; servicos: number }> = {};

  pets.forEach(pet => {
    const chave = `${pet.tipo}#${pet.raca}`;

    if (!agrupadoMap[chave]) {
      agrupadoMap[chave] = { tipo: pet.tipo, raca: pet.raca, produtos: 0, servicos: 0 };
    }

    pet.cliente.consumos.forEach(consumo => {
      if (consumo.produtoServico.tipo === 'PRODUTO') {
        agrupadoMap[chave].produtos++;
      } else if (consumo.produtoServico.tipo === 'SERVICO') {
        agrupadoMap[chave].servicos++;
      }
    });
  });

  const resultado = Object.values(agrupadoMap);

  res.json(resultado);
};


export const top5ClientesPorValor = async (req: Request, res: Response) => {
  const consumos = await prisma.consumo.findMany({
    include: {
      cliente: true,
      produtoServico: true,
    }
  });

  const totais: Record<string, number> = {};

  consumos.forEach(consumo => {
    const cpf = consumo.cliente.cpf;
    const valor = consumo.produtoServico.preco;
    totais[cpf] = (totais[cpf] || 0) + valor;
  });

  const top5 = Object.entries(totais)
    .map(([cpf, valor]) => {
      const cliente = consumos.find(c => c.cliente.cpf === cpf)?.cliente;
      return { nome: cliente?.nome || cpf, valor };
    })
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 5);

  res.json(top5);
};
