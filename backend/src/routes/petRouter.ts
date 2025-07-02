import { Router } from 'express';
import {
  criarPet,
  listarPets,
  buscarPetPorId,
  listarPetsPorCliente,
  listarPetsPorCpfCliente, 
  atualizarPet,
  deletarPet
} from '../controllers/petController';

const router = Router();

router.post('/', criarPet);
router.get('/', listarPets);
router.get('/cliente/:clienteId', listarPetsPorCliente);
router.get('/cpf/:cpf', listarPetsPorCpfCliente); 
router.get('/:id', buscarPetPorId);               
router.put('/:id', atualizarPet);
router.delete('/:id', deletarPet);

export default router;
