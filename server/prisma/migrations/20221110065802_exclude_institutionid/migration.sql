/*
  Warnings:

  - You are about to drop the column `institutionId` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the column `institutionId` on the `Visitor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "institutionId";

-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "institutionId";
