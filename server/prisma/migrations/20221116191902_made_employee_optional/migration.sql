-- DropForeignKey
ALTER TABLE "Visitation" DROP CONSTRAINT "Visitation_sectorId_fkey";

-- DropForeignKey
ALTER TABLE "Visitation" DROP CONSTRAINT "Visitation_userId_fkey";

-- AlterTable
ALTER TABLE "Visitation" ALTER COLUMN "sectorId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Visitation" ADD CONSTRAINT "Visitation_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visitation" ADD CONSTRAINT "Visitation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
