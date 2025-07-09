import { Request, Response } from 'express';
import { ExperimentoRepository } from '../repositories/experimento.repository';

export const ExperimentoController = {
  async listar(req: Request, res: Response) {
    const lista = await ExperimentoRepository.listar();
    res.json(lista);
  },

  async buscar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const experimento = await ExperimentoRepository.buscarPorId(id);
    if (!experimento) return res.status(404).json({ message: 'Não encontrado' });
    res.json(experimento);
  },

  async criar(req: Request, res: Response) {
    const { name, status } = req.body;
    const usuarioId = (req as any).user?.id; // ID extraído do token JWT

    const novo = await ExperimentoRepository.criar({ name, status, usuarioId });
    res.status(201).json(novo);
  },

  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name, status } = req.body;

    try {
      const atualizado = await ExperimentoRepository.atualizar(id, { name, status });
      res.json(atualizado);
    } catch {
      res.status(404).json({ message: 'Não encontrado' });
    }
  },

  async deletar(req: Request, res: Response) {
    const id = Number(req.params.id);

    try {
      await ExperimentoRepository.deletar(id);
      res.status(204).send();
    } catch {
      res.status(404).json({ message: 'Não encontrado' });
    }
  }
};
