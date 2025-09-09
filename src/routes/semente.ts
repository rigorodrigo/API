import { Router } from 'express';
import { SementeController } from '@controllers/sementeController';

const router = Router();

router.get('/', SementeController.listar);
router.get('/:id', SementeController.buscarSemente);
router.post('/', SementeController.criar);
router.put('/:id', SementeController.atualizar);
router.delete('/:id', SementeController.excluir);

export default router;