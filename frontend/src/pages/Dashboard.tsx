import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="container py-4">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Top 10 clientes que mais consumiram</h5>
              <ol className="mb-0">
                <li>João Silva</li>
                <li>Maria Santos</li>
                <li>Pedro Oliveira</li>
                <li>Fernanda Lima</li>
                <li>Lucas Souza</li>
                <li>Patrícia Alves</li>
                <li>Rafael Costa</li>
                <li>Juliana Rocha</li>
                <li>André Mendes</li>
                <li>Camila Dias</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Produtos mais consumidos</h5>
              <ul className="mb-0">
                <li>Ração Premium</li>
                <li>Brinquedo </li>
                <li>Coleira</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Serviços mais consumidos</h5>
              <ul className="mb-0">
                <li>Banho e Tosa</li>
                <li>Consulta Veterinária</li>
                <li>Vacinação</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <div className="card h-100 mt-4 mt-lg-0">
            <div className="card-body">
              <h5 className="card-title">Consumo por tipo e raça de pet</h5>
              <ul className="mb-0">
                <li>Cão (Labrador): 12 serviços, 8 produtos</li>
                <li>Gato (Persa): 7 serviços, 5 produtos</li>
                <li>Cão (Pinscher): 9 serviços, 6 produtos</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-6">
          <div className="card h-100 mt-4 mt-lg-0">
            <div className="card-body">
              <h5 className="card-title">Top 5 clientes por valor consumido</h5>
              <ol className="mb-0">
                <li>João Silva - R$ 1.200,00</li>
                <li>Maria Santos - R$ 1.250,00</li>
                <li>Pedro Oliveira - R$ 900,00</li>
                <li>Fernanda Lima - R$ 800,00</li>
                <li>Lucas Souza - R$ 750,00</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
