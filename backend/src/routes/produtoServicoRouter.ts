import { Router } from 'express';
import {
  criarProdutoServico,
  listarProdutosServicos,
  atualizarProdutoServico,
  deletarProdutoServico
} from '../controllers/produtoServicoController';

const router = Router();

router.post('/', criarProdutoServico);
router.get('/', listarProdutosServicos);
router.put('/:id', atualizarProdutoServico);
router.delete('/:id', deletarProdutoServico);

export default router;
