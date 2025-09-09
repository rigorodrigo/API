import { Router } from 'express';
import { ClienteController } from '@controllers/clienteController';

const router = Router();

router.get('/', ClienteController.listar);
router.get('/:id', ClienteController.buscarCliente);
router.post('/', ClienteController.criar);
router.put('/:id', ClienteController.atualizar);
router.delete('/:id', ClienteController.excluir);

export default router;