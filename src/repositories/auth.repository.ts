import { PrismaClient, Usuario } from '@prisma/client';

const prisma = new PrismaClient();

export const findUsuarioByEmail = async (email: string): Promise<Usuario | null> => {
    return prisma.usuario.findUnique({ 
        where: { email }
    });
};
