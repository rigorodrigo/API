import {Router} from 'express'
import clienteRouter from '@routes/cliente'
import colaboradorRouter from '@routes/colaborador';
import culturaRouter from '@routes/cultura';
import produtoRouter from '@routes/produto';
import sacaRouter from '@routes/saca';
import sementeRouter from '@routes/semente';

const router = Router();

router.use ('/clientes', clienteRouter);
router.use('/colaboradores', colaboradorRouter);
router.use('/culturas', culturaRouter);
router.use('/produtos', produtoRouter);
router.use('/sacas', sacaRouter);
router.use('/sementes',sementeRouter);

export default router;