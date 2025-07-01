import { Router } from 'express';
import {
  criarPet,
  listarPets,
  buscarPetPorId,
  listarPetsPorCliente,
  listarPetsPorCpfCliente, // importa a função nova
  atualizarPet,
  deletarPet
} from '../controllers/petController';

const router = Router();

router.post('/', criarPet);
router.get('/', listarPets);
router.get('/cliente/:clienteId', listarPetsPorCliente);
router.get('/cpf/:cpf', listarPetsPorCpfCliente); // rota nova para buscar por CPF
router.get('/:id', buscarPetPorId);               // sempre depois das rotas mais específicas
router.put('/:id', atualizarPet);
router.delete('/:id', deletarPet);

export default router;
