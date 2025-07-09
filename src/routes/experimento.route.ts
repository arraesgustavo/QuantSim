import { Router } from 'express';
import { ExperimentoController } from '../controllers/experimento.controller';

const router = Router();

router.get('/', ExperimentoController.listar);
router.get('/:id', ExperimentoController.buscar);
router.post('/', ExperimentoController.criar);
router.put('/:id', ExperimentoController.atualizar);
router.delete('/:id', ExperimentoController.deletar);

export default router;
