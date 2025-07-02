import React, { useEffect, useState } from 'react';

interface ClienteQtd {
  nome: string;
  quantidade: number;
}

interface ProdutoServicoQtd {
  nome: string;
  quantidade: number;
  tipo: 'PRODUTO' | 'SERVICO';
}

interface ConsumoPet {
  tipo: string;
  raca: string;
  servicos: number;
  produtos: number;
}

interface ClienteValor {
  nome: string;
  valor: number;
}

const Dashboard: React.FC = () => {
  const [topClientesQtd, setTopClientesQtd] = useState<ClienteQtd[]>([]);
  const [maisConsumidos, setMaisConsumidos] = useState<ProdutoServicoQtd[]>([]);
  const [consumoPorPet, setConsumoPorPet] = useState<ConsumoPet[]>([]);
  const [topClientesValor, setTopClientesValor] = useState<ClienteValor[]>([]);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const [res1, res2, res3, res4] = await Promise.all([
          fetch('http://localhost:3001/dashboard/top-clientes-qtd'),
          fetch('http://localhost:3001/dashboard/itens-mais-consumidos'),
          fetch('http://localhost:3001/dashboard/por-tipo-raca'),
          fetch('http://localhost:3001/dashboard/top-clientes-valor'),
        ]);

        if (!res1.ok || !res2.ok || !res3.ok || !res4.ok) {
          throw new Error('Erro ao buscar dados do dashboard');
        }

        const [dados1, dados2, dados3, dados4] = await Promise.all([
          res1.json(),
          res2.json(),
          res3.json(),
          res4.json(),
        ]);

        setTopClientesQtd(dados1);
        setMaisConsumidos(dados2);
        setConsumoPorPet(dados3);
        setTopClientesValor(dados4);
      } catch (err) {
        console.error('Erro ao buscar dados do dashboard:', err);
      }
    };

    fetchDados();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Dashboard</h2>

      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Top 10 clientes que mais consumiram</h5>
              <ol className="mb-0">
                {topClientesQtd.length > 0 ? (
                  topClientesQtd.map((cliente, i) => (
                    <li key={i}>
                      {cliente.nome} - {cliente.quantidade} itens
                    </li>
                  ))
                ) : (
                  <li>Nenhum dado disponível</li>
                )}
              </ol>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Produtos mais consumidos</h5>
              <ul className="mb-0">
                {maisConsumidos.filter(item => item.tipo === 'PRODUTO').length > 0 ? (
                  maisConsumidos
                    .filter(item => item.tipo === 'PRODUTO')
                    .map((item, i) => (
                      <li key={i}>
                        {item.nome} - {item.quantidade}x
                      </li>
                    ))
                ) : (
                  <li>Nenhum produto consumido</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Serviços mais consumidos</h5>
              <ul className="mb-0">
                {maisConsumidos.filter(item => item.tipo === 'SERVICO').length > 0 ? (
                  maisConsumidos
                    .filter(item => item.tipo === 'SERVICO')
                    .map((item, i) => (
                      <li key={i}>
                        {item.nome} - {item.quantidade}x
                      </li>
                    ))
                ) : (
                  <li>Nenhum serviço consumido</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-6">
          <div className="card h-100 mt-4 mt-lg-0">
            <div className="card-body">
              <h5 className="card-title">Consumo por tipo e raça de pet</h5>
              <ul className="mb-0">
                {consumoPorPet.length > 0 ? (
                  consumoPorPet.map((item, i) => (
                    <li key={i}>
                      {item.tipo} ({item.raca}): {item.servicos} serviços, {item.produtos} produtos
                    </li>
                  ))
                ) : (
                  <li>Nenhum dado disponível</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-6">
          <div className="card h-100 mt-4 mt-lg-0">
            <div className="card-body">
              <h5 className="card-title">Top 5 clientes por valor consumido</h5>
              <ol className="mb-0">
                {topClientesValor.length > 0 ? (
                  topClientesValor.map((cliente, i) => (
                    <li key={i}>
                      {cliente.nome} - R$ {cliente.valor.toFixed(2)}
                    </li>
                  ))
                ) : (
                  <li>Nenhum dado disponível</li>
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
