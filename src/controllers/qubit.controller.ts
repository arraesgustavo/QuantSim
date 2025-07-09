import { Request, Response } from 'express';
import * as qubitRepository from '../repositories/qubit.repository';

export const createQubitController = async (req: Request, res: Response) => {
        const { estado, stateVector } = req.body;
        const novoQubit = await qubitRepository.createQubit(estado, stateVector);
        res.status(201).json(novoQubit);
};

export const getAllQubitsController = async (req: Request, res: Response) => {
        const qubits = await qubitRepository.getAllQubits();
        res.json(qubits);
};

export const getQubitByIdController = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const qubit = await qubitRepository.getQubitById(id);
        
        if (qubit) {
            res.json(qubit);
        } else {
            res.status(404).json({ message: 'Qubit not found' });
        }
};

export const updateQubitController = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { estado, stateVector } = req.body;
        
        const updatedQubit = await qubitRepository.updateQubit(id, {
            estado,
            stateVector
        });
        
        res.json(updatedQubit);
};

export const removeQubitController = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const deletedQubit = await qubitRepository.removeQubit(id);
        res.json(deletedQubit);
};

export const getQubitGatesController = async (req: Request, res: Response) => {
    try {
        const qubitId = parseInt(req.params.qubitId);
        const gates = await qubitRepository.getQubitGates(qubitId);
        res.json(gates);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching gates', error });
    }
};

export const addGateToQubitController = async (req: Request, res: Response) => {
        const qubitId = parseInt(req.params.qubitId);
        const gateId = parseInt(req.body.gateId);
        const updatedQubit = await qubitRepository.addGateToQubit(qubitId, gateId);
        res.json(updatedQubit);
};

export const removeGateFromQubitController = async (req: Request, res: Response) => {
        const qubitId = parseInt(req.params.qubitId);
        const gateId = parseInt(req.body.gateId);
        const updatedQubit = await qubitRepository.removeGateFromQubit(qubitId, gateId);
        res.json(updatedQubit);
};

export const measureQubitController = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const measurement = await qubitRepository.measure(id);
        res.json(measurement);
};