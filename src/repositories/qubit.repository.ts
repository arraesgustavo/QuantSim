import { PrismaClient, Qubit, Prisma } from '@prisma/client';

interface Complex {
  real: number;
  imag: number;
}

type StateVector = [Complex, Complex];

const prisma = new PrismaClient();

export const createQubit = async (estado: number, stateVector?: string): Promise<Qubit> => {
    return prisma.qubit.create({
        data: {
            estado,
            stateVector
        }
    });
};

export const getAllQubits = async (): Promise<Qubit[]> => {
    return prisma.qubit.findMany();
};

export const getQubitById = async (id: number): Promise<Qubit | null> => {
    return prisma.qubit.findUnique({
        where: { id }
    });
};

export const updateQubit = async (
    id: number,
    data: {
        estado?: number;
        stateVector?: string | null;
    }
): Promise<Qubit> => {
    return prisma.qubit.update({
        where: { id },
        data: {
            estado: data.estado,
            stateVector: data.stateVector,
        },
    });
};

export const removeQubit = async (id: number): Promise<Qubit> => {
    return prisma.qubit.delete({
        where: { id },
    });
};

export const getQubitGates = async (qubitId: number): Promise<any[]> => {
    return prisma.quantumGate.findMany({
        where: { qubitId }
    });
};

export const addGateToQubit = async (qubitId: number, gateId: number): Promise<Qubit> => {
    return prisma.qubit.update({
        where: { id: qubitId },
        data: {
            portas: {
                connect: { id: gateId }
            }
        }
    });
};

export const removeGateFromQubit = async (qubitId: number, gateId: number): Promise<Qubit> => {
    return prisma.qubit.update({
        where: { id: qubitId },
        data: {
            portas: {
                disconnect: { id: gateId }
            }
        }
    });
};

export const measure = async (id: number): Promise<{ classicalState: number }> => {
    const qubit = await prisma.qubit.findUnique({
        where: { id }
    });

    if (!qubit) {
        throw new Error('Qubit not found');
    }

    if (!qubit.stateVector) {
        return { classicalState: qubit.estado };
    }

    let stateVector: StateVector;
    try {
        stateVector = JSON.parse(qubit.stateVector);
    } catch (e) {
        throw new Error('Invalid stateVector format');
    }

    // Calcula as probabilidades para |0⟩ e |1⟩
    const prob0 = Math.pow(stateVector[0].real, 2) + Math.pow(stateVector[0].imag, 2);
    const prob1 = Math.pow(stateVector[1].real, 2) + Math.pow(stateVector[1].imag, 2);

    // Normaliza as probabilidades (caso não estejam normalizadas)
    const totalProb = prob0 + prob1;
    const normalizedProb0 = prob0 / totalProb;
    
    // Gera um número aleatório para determinar o estado de colapso
    const random = Math.random();
    const classicalState = random < normalizedProb0 ? 0 : 1;

    await prisma.qubit.update({
        where: { id },
        data: {
            estado: classicalState
            //stateVector: null
        }
    });

    return { classicalState };
};