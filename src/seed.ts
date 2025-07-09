import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
const prisma = new PrismaClient();

//interface Complex {
//  real: number;
//  imag: number;
//}

//type StateVector = [Complex, Complex];


async function main() {
  console.log('Iniciando o seed...');
  const senhaHash = await argon2.hash('senha123');
  const usuario = await prisma.usuario.create({
    data: {
      name: 'Gustavo Fernandes',
      email: 'd20220045447@unifei.edu.br',
      senha: senhaHash,
      admin: true,
    },
  });

  const qubit = await prisma.qubit.create({
    data: {
      estado: 0,
    },
  });

  const circuito = await prisma.circuitoQuantico.create({
    data: {
      name: 'Emaranhamento',
      descricao: 'uma porta hadamard e um CNOT',
    },
  });

  const hGate = await prisma.quantumGate.create({
    data: {
      type: 'HGATE',
      duration: 1.2,
      errorRate: 0.01,
      circuitoId: circuito.id,
      qubitId: qubit.id,
      phaseShift: 0.5,
    },
  });

  const experimento = await prisma.experimento.create({
    data: {
      name: 'Experimento 1',
      status: 1,
      usuarioId: usuario.id,
    },
  });

  await prisma.experimentoCircuito.create({
    data: {
      experimentoId: experimento.id,
      circuitoId: circuito.id,
    },
  });

  await prisma.medicao.create({
    data: {
      value: 0.98,
      timestamp: BigInt(Date.now()),
      qubitId: qubit.id,
      experimentoId: experimento.id,
    },
  });

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
