import { Router } from 'express';
import {
    getAllQuantumGatesController,
    getQuantumGateByIdController,
    createQuantumGateController,
    updateQuantumGateController,
    deleteQuantumGateController,
    associateWithQubitController,
    disassociateFromQubitController
} from '../controllers/quantumGate.controller';

const router = Router();

router.get('/', getAllQuantumGatesController);
router.get('/:id', getQuantumGateByIdController);
router.post('/', createQuantumGateController);
router.put('/:id', updateQuantumGateController);
router.delete('/:id', deleteQuantumGateController);

router.post('/:gateId/associate-qubit', associateWithQubitController);
router.post('/:gateId/disassociate-qubit', disassociateFromQubitController);

export default router;