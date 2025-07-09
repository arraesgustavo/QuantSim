/*
  Warnings:

  - Changed the type of `type` on the `QuantumGate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "typeQuantumGate" AS ENUM ('SGATE', 'HGATE', 'XGATE', 'ZGATE');

-- AlterTable
ALTER TABLE "QuantumGate" DROP COLUMN "type",
ADD COLUMN     "type" "typeQuantumGate" NOT NULL;
