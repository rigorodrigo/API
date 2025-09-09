import { Router } from 'express';
import { ColaboradorController } from '@controllers/colaboradorController';

const router = Router();

router.get('/', ColaboradorController.listar);
router.get('/:id', ColaboradorController.buscarColaborador);
router.post('/', ColaboradorController.criar);
router.put('/:id', ColaboradorController.atualizar);
router.delete('/:id', ColaboradorController.excluir);

export default router;