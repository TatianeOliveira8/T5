import express from 'express';
import cors from 'cors';
import clienteRouter from './routes/clienteRouter';
import telefoneRouter from './routes/telefoneRouter';
import petsRouter from './routes/petRouter';
import produtoServicoRouter from './routes/produtoServicoRouter';
import consumosRouter from './routes/consumoRouter';

// import produtosRouter from './routes/produtos';
// import servicosRouter from './routes/servicos';
// import relatoriosRouter from './routes/relatorios';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/clientes', clienteRouter);
app.use('/telefones', telefoneRouter);
app.use('/pets', petsRouter);
app.use('/produtos-servicos', produtoServicoRouter);

// app.use('/produtos', produtosRouter);
// app.use('/servicos', servicosRouter);
app.use('/consumos', consumosRouter);
// app.use('/relatorios', relatoriosRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
