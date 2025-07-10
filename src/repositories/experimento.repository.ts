import { prisma } from '../lib/prisma';
import { Experimento } from '@prisma/client';

interface CriarExperimentoData {
  name: string;
  status: number;
  usuarioId?: number;
  circuitoId: number; 
}

export const ExperimentoRepository = {
  listar() {
    return prisma.experimento.findMany({
      include: {
        circuitos: {
          include: {
            circuito: true,
          },
        },
      },
       orderBy: {
        id: 'desc'
      }
    });
  },

  buscarPorId(id: number) {
    return prisma.experimento.findUnique({ where: { id } });
  },

  criar(data: CriarExperimentoData) {
    return prisma.experimento.create({
      data: {
        name: data.name,
        status: data.status,
        usuarioId: data.usuarioId,
        circuitos: {
          create: [
            {
              circuito: {
                connect: {
                  id: data.circuitoId,
                },
              },
            },
          ],
        },
      },
    });
  },

  atualizar(id: number, data: { name?: string; status?: number }) {
    return prisma.experimento.update({
      where: { id },
      data,
    });
  },

  async deletar(id: number) {
    await prisma.experimentoCircuito.deleteMany({
      where: { experimentoId: id },
    });

    await prisma.medicao.deleteMany({
      where: { experimentoId: id },
    });

    return prisma.experimento.delete({
      where: { id },
    });
  },

  async findExperimentoForSimulation(id: number): Promise<Experimento | null> {
    return prisma.experimento.findUnique({
      where: { id },
      include: {
        circuitos: {
          include: {
            circuito: {
              include: {
                gates: true,
              },
            },
          },
        },
      },
    });
  },
};
