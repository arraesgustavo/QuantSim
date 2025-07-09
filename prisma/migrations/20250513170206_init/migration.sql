-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experimento" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "results" JSONB,
    "usuarioId" INTEGER,

    CONSTRAINT "Experimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CircuitoQuantico" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "CircuitoQuantico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperimentoCircuito" (
    "id" SERIAL NOT NULL,
    "experimentoId" INTEGER NOT NULL,
    "circuitoId" INTEGER NOT NULL,

    CONSTRAINT "ExperimentoCircuito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qubit" (
    "id" SERIAL NOT NULL,
    "estado" INTEGER NOT NULL,

    CONSTRAINT "Qubit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicao" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "qubitId" INTEGER NOT NULL,
    "experimentoId" INTEGER NOT NULL,

    CONSTRAINT "Medicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuantumGate" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "errorRate" DOUBLE PRECISION NOT NULL,
    "circuitoId" INTEGER,
    "qubitId" INTEGER,
    "phase" DOUBLE PRECISION,
    "isClifford" BOOLEAN,
    "phaseShift" DOUBLE PRECISION,
    "isDiagonal" BOOLEAN,
    "pulseAmplitude" DOUBLE PRECISION,
    "isPauli" BOOLEAN,

    CONSTRAINT "QuantumGate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ExperimentoCircuito_experimentoId_circuitoId_key" ON "ExperimentoCircuito"("experimentoId", "circuitoId");

-- CreateIndex
CREATE UNIQUE INDEX "Medicao_experimentoId_key" ON "Medicao"("experimentoId");

-- AddForeignKey
ALTER TABLE "Experimento" ADD CONSTRAINT "Experimento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperimentoCircuito" ADD CONSTRAINT "ExperimentoCircuito_experimentoId_fkey" FOREIGN KEY ("experimentoId") REFERENCES "Experimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperimentoCircuito" ADD CONSTRAINT "ExperimentoCircuito_circuitoId_fkey" FOREIGN KEY ("circuitoId") REFERENCES "CircuitoQuantico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicao" ADD CONSTRAINT "Medicao_qubitId_fkey" FOREIGN KEY ("qubitId") REFERENCES "Qubit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicao" ADD CONSTRAINT "Medicao_experimentoId_fkey" FOREIGN KEY ("experimentoId") REFERENCES "Experimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuantumGate" ADD CONSTRAINT "QuantumGate_circuitoId_fkey" FOREIGN KEY ("circuitoId") REFERENCES "CircuitoQuantico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuantumGate" ADD CONSTRAINT "QuantumGate_qubitId_fkey" FOREIGN KEY ("qubitId") REFERENCES "Qubit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
