import { prisma } from '../lib/prisma';

export const ExperimentoRepository = {
  listar() {
    return prisma.experimento.findMany();
  },

  buscarPorId(id: number) {
    return prisma.experimento.findUnique({ where: { id } });
  },

  criar(data: { name: string; status: number; usuarioId?: number }) {
    return prisma.experimento.create({ data });
  },

  atualizar(id: number, data: { name?: string; status?: number }) {
    return prisma.experimento.update({
      where: { id },
      data
    });
  },

    async deletar(id: number) {
    await prisma.experimentoCircuito.deleteMany({
        where: { experimentoId: id }
    });

    await prisma.medicao.deleteMany({
        where: { experimentoId: id }
    });

    return prisma.experimento.delete({
        where: { id }
    });
    }
};
