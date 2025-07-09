import { Request, Response } from 'express';
import * as quantumGateRepository from '../repositories/quantumGate.repository';

export const getAllQuantumGatesController = async (req: Request, res: Response) => {
        const gates = await quantumGateRepository.getAllQuantumGates();
        res.json(gates);
};

export const getQuantumGateByIdController = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const gate = await quantumGateRepository.getQuantumGateById(id);
        
        if (gate) {
            res.json(gate);
        } else {
            res.status(404).json({ message: 'Quantum gate not found' });
        }
};

export const createQuantumGateController = async (req: Request, res: Response) => {
        const newGate = await quantumGateRepository.createQuantumGate(req.body);
        res.status(201).json(newGate);
};

export const updateQuantumGateController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { id: _ignoredId, circuitoId, qubitId, ...safeData } = req.body;
  const updatedGate = await quantumGateRepository.updateQuantumGate(id, safeData);
  res.json(updatedGate);
};

export const deleteQuantumGateController = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const deletedGate = await quantumGateRepository.deleteQuantumGate(id);
        res.json(deletedGate);
};

export const associateWithQubitController = async (req: Request, res: Response) => {
        const gateId = parseInt(req.params.gateId);
        const qubitId = parseInt(req.body.qubitId);

        const updatedGate = await quantumGateRepository.associateGateWithQubit(gateId, qubitId);
        res.json(updatedGate);
};

export const disassociateFromQubitController = async (req: Request, res: Response) => {
        const gateId = parseInt(req.params.gateId);
        const updatedGate = await quantumGateRepository.disassociateGateFromQubit(gateId);
        res.json(updatedGate);
};
