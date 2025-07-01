import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

// Paginas
import Dashboard from "./pages/Dashboard";
import RegistroConsumo from "./pages/RegistroConsumo";

// Clientes
import CadastroCliente from "./pages/clientes/CadastroCliente";
import ListagemClientes from "./pages/clientes/ListagemClientes";
import AtualizarCliente from "./pages/clientes/AtualizarCliente";

// Pets
import CadastroPet from "./pages/pets/CadastroPet";
import ListagemPets from "./pages/pets/ListagemPets";
import AtualizarPet from "./pages/pets/AtualizarPet";

// Produtos
import CadastroProduto from "./pages/produtos/CadastroProduto";
import ListagemProdutos from "./pages/produtos/ListagemProdutos";
import AtualizarProduto from "./pages/produtos/AtualizarProduto";

// Serviços
import CadastroServico from "./pages/servicos/CadastroServico";
import ListagemServicos from "./pages/servicos/ListagemServicos";
import AtualizarServico from "./pages/servicos/AtualizarServico";

import Header from "./components/Header";

const App = () => (
  <>
    <HashRouter>
      <div className="min-vh-100 bg-light">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registro-consumo" element={<RegistroConsumo />} />
          {/* Rotas de Clientes */}
          <Route path="/clientes" element={<ListagemClientes />} />
          <Route path="/clientes/cadastrar" element={<CadastroCliente />} />
          <Route path="/clientes/editar/:cpf" element={<AtualizarCliente />} />
          {/* Rotas de Pets */}
          <Route path="/pets" element={<ListagemPets />} />
          <Route path="/pets/cadastrar" element={<CadastroPet />} />
          <Route path="/pets/editar/:id" element={<AtualizarPet />} />
          {/* Rotas de Produtos */}
          <Route path="/produtos" element={<ListagemProdutos />} />
          <Route path="/produtos/cadastrar" element={<CadastroProduto />} />
          <Route path="/produtos/editar/:id" element={<AtualizarProduto />} />
          {/* Rotas de Serviços */}
          <Route path="/servicos" element={<ListagemServicos />} />
          <Route path="/servicos/cadastrar" element={<CadastroServico />} />
          <Route path="/servicos/editar/:id" element={<AtualizarServico />} />
        </Routes>
      </div>
    </HashRouter>
  </>
);

export default App;
