import { Router } from 'express';
import {
  criarConsumo,
  listarConsumos,
  atualizarConsumo,
  deletarConsumo,
} from '../controllers/consumoController';

const router = Router();

router.post('/', criarConsumo);
router.get('/', listarConsumos);
router.put('/:id', atualizarConsumo);
router.delete('/:id', deletarConsumo);

export default router;
