import React from 'react';
import FormularioPadrao from '../components/FormularioPadrao';

const campos = [
  { nome: 'cpfCliente', rotulo: 'CPF do Cliente', tipo: 'text', valor: '', placeholder: '000.000.000-00', obrigatorio: true },
  { nome: 'codigoItem', rotulo: 'Código do Produto ou Serviço', tipo: 'text', valor: '', placeholder: 'Ex: P1 ou S2', obrigatorio: true }
];

const RegistroConsumo: React.FC = () => {
  const aoEnviar = (dados: Record<string, string>) => {
    alert('Consumo registrado! (simulado)');
    window.location.hash = '#/consumos';
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <FormularioPadrao
            campos={campos}
            aoEnviar={aoEnviar}
            aoCancelar={undefined}
            titulo="Registrar Consumo"
          />
        </div>
      </div>
    </div>
  );
};

export default RegistroConsumo;
