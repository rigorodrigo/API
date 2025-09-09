import { Router } from 'express';
import { SacaController } from '@controllers/sacaController';

const router = Router();

router.get('/', SacaController.listar);
router.get('/:id', SacaController.buscarSaca);
router.post('/', SacaController.criar);
router.put('/:id', SacaController.atualizar);
router.delete('/:id', SacaController.excluir);

export default router;