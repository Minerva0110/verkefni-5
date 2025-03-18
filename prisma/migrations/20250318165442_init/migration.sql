/*
  Warnings:

  - Made the column `categoryId` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_categoryId_fkey";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
