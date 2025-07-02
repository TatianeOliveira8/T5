import { Router } from 'express';
import {
  top10ClientesMaisConsumiram,
  produtosServicosMaisConsumidos,
  consumoPorTipoERaca,
  top5ClientesPorValor
} from '../controllers/dashboardController';

const router = Router();

router.get('/top-clientes-qtd', top10ClientesMaisConsumiram);
router.get('/itens-mais-consumidos', produtosServicosMaisConsumidos);
router.get('/por-tipo-raca', consumoPorTipoERaca);
router.get('/top-clientes-valor', top5ClientesPorValor);

export default router;
