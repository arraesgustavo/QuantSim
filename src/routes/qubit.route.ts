import { Router } from 'express';
import {
    createQubitController,
    getAllQubitsController,
    getQubitByIdController,
    updateQubitController,
    removeQubitController,
    getQubitGatesController,
    addGateToQubitController,
    removeGateFromQubitController,
    measureQubitController
} from '../controllers/qubit.controller';

const router = Router();

router.post('/', createQubitController);
router.get('/', getAllQubitsController);
router.get('/:id', getQubitByIdController);
router.put('/:id', updateQubitController);
router.delete('/:id', removeQubitController);

router.get('/:qubitId/gates', getQubitGatesController);
router.post('/:qubitId/add-gate', addGateToQubitController);
router.delete('/:qubitId/remove-gate', removeGateFromQubitController);

router.get('/:id/measure', measureQubitController);

export default router;