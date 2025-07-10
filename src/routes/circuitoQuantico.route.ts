import { Router } from 'express';
import {
  createCircuitoController,
  getAllCircuitosController,
  getCircuitoByIdController,
  updateCircuitoController,
  removeCircuitoController,
} from '../controllers/circuitoQuantico.controller';
import { authMiddleware } from '../middleware/auth.middleware'; 

const router = Router();

router.use(authMiddleware);

router.post('/', createCircuitoController);
router.get('/', getAllCircuitosController);
router.get('/:id', getCircuitoByIdController);
router.put('/:id', updateCircuitoController);
router.delete('/:id', removeCircuitoController);

export default router;
