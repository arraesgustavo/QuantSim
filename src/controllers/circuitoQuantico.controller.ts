import { Request, Response } from 'express';
import * as circuitoRepository from '../repositories/circuitoQuantico.repository';

export const createCircuitoController = async (req: Request, res: Response) => {
  try {
    const { name, descricao, gates } = req.body;
    if (!name || !descricao) {
      return res.status(400).json({ message: 'Nome e descrição são obrigatórios.' });
    }
    const novoCircuito = await circuitoRepository.createCircuito({ name, descricao, gates });
    res.status(201).json(novoCircuito);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar o circuito', error });
  }
};

export const getAllCircuitosController = async (req: Request, res: Response) => {
  try {
    const circuitos = await circuitoRepository.getAllCircuitos();
    res.status(200).json(circuitos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar os circuitos', error });
  }
};

export const getCircuitoByIdController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const circuito = await circuitoRepository.getCircuitoById(id);
    if (circuito) {
      res.status(200).json(circuito);
    } else {
      res.status(404).json({ message: 'Circuito não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o circuito', error });
  }
};

export const updateCircuitoController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, descricao } = req.body;
    const updatedCircuito = await circuitoRepository.updateCircuito(id, { name, descricao });
    res.status(200).json(updatedCircuito);
  } catch (error) {
    // Adicionar checagem para o erro P2025 (Registro não encontrado) do Prisma
    if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Circuito não encontrado para atualização.' });
    }
    res.status(500).json({ message: 'Erro ao atualizar o circuito', error });
  }
};


export const removeCircuitoController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedCircuito = await circuitoRepository.removeCircuito(id);
    res.status(200).json({ message: 'Circuito removido com sucesso.', data: deletedCircuito });
  } catch (error) {
    if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Circuito não encontrado para remoção.' });
    }
    res.status(500).json({ message: 'Erro ao remover o circuito', error });
  }
};
