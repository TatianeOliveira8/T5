import { Router } from 'express';
import { listarClientes, buscarClientePorCpf, criarCliente, atualizarCliente, deletarCliente } from '../controllers/clienteController';

const router = Router();

router.get('/', listarClientes);
router.get('/cpf/:cpf', buscarClientePorCpf);  // Buscar cliente por CPF
router.post('/', criarCliente);
router.put('/cpf/:cpf', atualizarCliente);
router.delete('/cpf/:cpf', deletarCliente);




export default router;
