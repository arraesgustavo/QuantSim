import { PrismaClient, QuantumGate, Prisma } from '@prisma/client';

interface Complex {
  real: number;
  imag: number;
}

type Matrix2x2 = [Complex, Complex, Complex, Complex];

const prisma = new PrismaClient();

export const getAllQuantumGates = async (): Promise<QuantumGate[]> => {
    return prisma.quantumGate.findMany({
        include: {
            qubit: true
        }
    });
};

export const getQuantumGateById = async (id: number): Promise<QuantumGate | null> => {
    return prisma.quantumGate.findUnique({
        where: { id },
        include: {
            qubit: true
        }
    });
};

export const createQuantumGate = async (data: Prisma.QuantumGateCreateInput): Promise<QuantumGate> => {
    return prisma.quantumGate.create({
        data,
        include: {
            qubit: true
        }
    });
};

export const updateQuantumGate = async (id: number, data: any): Promise<QuantumGate> => {
    const updateData = {
        ...data,
        ...(data.qubit === null && { qubit: { disconnect: true } })
    };

    if (data.qubit === null) {
        delete updateData.qubit;
    }

    return prisma.quantumGate.update({
        where: { id },
        data: updateData,
        include: {
            qubit: true
        }
    });
};

export const deleteQuantumGate = async (id: number): Promise<QuantumGate> => {
    return prisma.quantumGate.delete({
        where: { id }
    });
};

export const associateGateWithQubit = async (gateId: number, qubitId: number): Promise<QuantumGate> => {
    return prisma.quantumGate.update({
        where: { id: gateId },
        data: {
            qubit: {
                connect: { id: qubitId }
            }
        },
        include: {
            qubit: true
        }
    });
};

export const disassociateGateFromQubit = async (gateId: number): Promise<QuantumGate> => {
    return prisma.quantumGate.update({
        where: { id: gateId },
        data: {
            qubit: {
                disconnect: true
            }
        },
        include: {
            qubit: true
        }
    });
};