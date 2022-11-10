/*
  Warnings:

  - You are about to drop the `Institution` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Unit" DROP CONSTRAINT "Unit_institutionId_fkey";

-- DropForeignKey
ALTER TABLE "Visitor" DROP CONSTRAINT "Visitor_institutionId_fkey";

-- DropTable
DROP TABLE "Institution";
