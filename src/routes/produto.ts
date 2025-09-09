import { Router } from 'express';
import { ProdutoController } from '@controllers/produtoController';

const router = Router();

router.get('/', ProdutoController.listar);
router.get('/:id', ProdutoController.buscarProduto);
router.post('/', ProdutoController.criar);
router.put('/:id', ProdutoController.atualizar);
router.delete('/:id', ProdutoController.excluir);

export default router;