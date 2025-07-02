import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Criar clientes com telefones
  for (let i = 1; i <= 10; i++) {
    // Criar cliente
    const cliente = await prisma.cliente.create({
      data: {
        nome: `Cliente ${i}`,
        nomeSocial: `Social ${i}`,
        cpf: `0000000000${i}`,
        dataEmissaoCpf: new Date('2022-01-01'),
        rg: `RG${i}`,
        telefones: {
          create: [
            { ddd: '12', numero: `99999-000${i}` }
          ]
        }
      }
    });

    // Criar pet para o cliente
    const pet = await prisma.pet.create({
      data: {
        nome: `Pet ${i}`,
        tipo: i % 2 === 0 ? 'Cachorro' : 'Gato',
        raca: i % 2 === 0 ? 'Labrador' : 'Siames',
        genero: i % 2 === 0 ? 'M' : 'F',
        clienteId: cliente.id
      }
    });

    // Criar produto
    const produto = await prisma.produtoServico.create({
      data: {
        codigo: `P${i}`,
        nome: `Produto ${i}`,
        preco: 10.5 * i,
        tipo: 'PRODUTO'
      }
    });

    // Criar serviço
    const servico = await prisma.produtoServico.create({
      data: {
        codigo: `S${i}`,
        nome: `Serviço ${i}`,
        preco: 15.5 * i,
        tipo: 'SERVICO'
      }
    });

    // Criar consumo com o produto (sem petId)
    await prisma.consumo.create({
      data: {
        clienteId: cliente.id,
        produtoServicoId: produto.id,
        data: new Date(`2025-07-${(i % 28) + 1}`)
      }
    });

    // Criar consumo com o serviço (sem petId)
    await prisma.consumo.create({
      data: {
        clienteId: cliente.id,
        produtoServicoId: servico.id,
        data: new Date(`2025-07-${(i % 28) + 1}`)
      }
    });
  }
}

main()
  .then(() => {
    console.log('Seed executado com sucesso.');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
