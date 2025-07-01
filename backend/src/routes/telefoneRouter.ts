import { Router } from 'express';
import {
  criarTelefone,
  listarTelefones,
  atualizarTelefone,
  deletarTelefone,
  buscarTelefonePorId
} from '../controllers/telefoneController';


const router = Router();

router.get('/', listarTelefones);
router.post('/', criarTelefone);
router.put('/:id', atualizarTelefone);
router.delete('/:id', deletarTelefone);
router.get('/:id', buscarTelefonePorId);

export default router;
