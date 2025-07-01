import React, { useEffect, useState } from 'react';
import FormularioPadrao from '../../components/FormularioPadrao';
import {
  atualizarProdutoServico,
  listarPorTipo
} from '../../services/produtoServicoService';

const AtualizarProduto: React.FC = () => {
  const [produto, setProduto] = useState<any | null>(null);

  // Extrai o ID da URL
  const id = Number(window.location.hash.split('/').pop());

  useEffect(() => {
    const carregarProduto = async () => {
      const lista = await listarPorTipo('PRODUTO');
      const encontrado = lista.find((p: any) => p.id === id);
      setProduto(encontrado);
    };

    carregarProduto();
  }, [id]);

  const campos = [
    {
      nome: 'novoNome',
      rotulo: 'Novo Nome do Produto',
      tipo: 'text',
      valor: produto?.nome || '',
      placeholder: 'Deixe em branco para manter',
      obrigatorio: false
    },
    {
      nome: 'novoPreco',
      rotulo: 'Novo Preço (R$)',
      tipo: 'number',
      valor: produto?.preco || '',
      placeholder: 'Deixe em branco para manter',
      obrigatorio: false
    }
  ];

  const aoEnviar = async (dados: Record<string, string>) => {
    const nome = dados.novoNome || produto.nome;
    const preco = dados.novoPreco ? parseFloat(dados.novoPreco) : parseFloat(produto.preco);

    try {
      await atualizarProdutoServico(id, {
        nome,
        preco,
        tipo: 'PRODUTO'
      });

      alert('Produto atualizado com sucesso!');
      window.location.hash = '#/produtos';
    } catch (error) {
      alert('Erro ao atualizar produto.');
      console.error(error);
    }
  };

  const aoCancelar = () => {
    window.location.hash = '#/produtos';
  };

  if (!produto) return <p className="text-center mt-5">Carregando produto...</p>;

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <FormularioPadrao
            campos={campos}
            aoEnviar={aoEnviar}
            aoCancelar={aoCancelar}
            titulo="Atualizar Produto"
          />
        </div>
      </div>
    </div>
  );
};

export default AtualizarProduto;
