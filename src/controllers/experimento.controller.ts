import { Request, Response } from 'express';
import { ExperimentoRepository } from '../repositories/experimento.repository';
import { spawn } from 'child_process';
import path from 'path';

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
    const { name, status, circuitoId } = req.body;
    const usuarioId = (req as any).user?.id;

    if (!circuitoId) {
        return res.status(400).json({ message: 'O campo circuitoId é obrigatório.' });
    }

    const novo = await ExperimentoRepository.criar({ name, status, usuarioId, circuitoId });
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
  },

  async simular(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const experimento = await ExperimentoRepository.findExperimentoForSimulation(id);

      if (!experimento || !experimento.circuitos || experimento.circuitos.length === 0) {
        return res.status(404).json({ message: 'Experimento ou circuito associado não encontrado.' });
      }

      const gates = experimento.circuitos[0].circuito.gates;
      if (!gates || gates.length === 0) {
        return res.status(400).json({ message: 'O circuito associado não possui gates para simular.' });
      }

      const gatesDataForPython = gates.map(gate => ({
        type: gate.type,
        qubitId: gate.qubitId,
      }));

      const gatesJson = JSON.stringify(gatesDataForPython);
      const scriptPath = path.join(__dirname, '.', 'scripts', 'simulador.py');
      const pythonProcess = spawn('python', [scriptPath, gatesJson]);

      let resultData = '';
      let errorData = '';

      pythonProcess.stdout.on('data', (data) => {
        resultData += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorData += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          console.error(`[Python Script Error]: ${errorData}`);
          return res.status(500).json({ message: 'Erro durante a execução da simulação.', details: errorData });
        }

        try {
          const results = JSON.parse(resultData);
          if (results.error) {
            return res.status(400).json({ message: 'Erro na lógica da simulação.', details: results.error });
          }
          res.status(200).json(results);
        } catch (parseError: any) {
          res.status(500).json({ message: 'Erro ao processar o resultado da simulação.', details: parseError.message });
        }
      });

    } catch (error: any) {
      res.status(500).json({ message: 'Erro interno no servidor.', error: error.message });
    }
  }
};
