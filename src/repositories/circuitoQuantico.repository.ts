import { PrismaClient, CircuitoQuantico, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateCircuitoData {
  name: string;
  descricao: string;
  gates?: { create: Omit<Prisma.QuantumGateCreateInput, 'circuito'>[] };
}

interface UpdateCircuitoData {
  name?: string;
  descricao?: string;
}

export const createCircuito = async (data: CreateCircuitoData): Promise<CircuitoQuantico> => {
  return prisma.circuitoQuantico.create({
    data: {
      name: data.name,
      descricao: data.descricao,
      gates: data.gates,
    },
    include: {
      gates: true, 
    },
  });
};

export const getAllCircuitos = async (): Promise<CircuitoQuantico[]> => {
  return prisma.circuitoQuantico.findMany({
    include: {
      gates: true, 
    },
  });
};

export const getCircuitoById = async (id: number): Promise<CircuitoQuantico | null> => {
  return prisma.circuitoQuantico.findUnique({
    where: { id },
    include: {
      gates: true, 
    },
  });
};

export const updateCircuito = async (id: number, data: UpdateCircuitoData): Promise<CircuitoQuantico> => {
  return prisma.circuitoQuantico.update({
    where: { id },
    data,
    include: {
      gates: true,
    },
  });
};

export const removeCircuito = async (id: number): Promise<CircuitoQuantico> => {
  return prisma.circuitoQuantico.delete({
    where: { id },
  });
};
