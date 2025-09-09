import { Router } from 'express';
import { CulturaController } from '@controllers/culturaController';

const router = Router();

router.get('/', CulturaController.listar);
router.get('/:id', CulturaController.buscarCultura);
router.post('/', CulturaController.criar);
router.put('/:id', CulturaController.atualizar);
router.delete('/:id', CulturaController.excluir);

export default router;