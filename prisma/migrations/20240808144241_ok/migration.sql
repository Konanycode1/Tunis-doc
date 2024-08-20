/*
  Warnings:

  - A unique constraint covering the columns `[filmsId]` on the table `Note` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `filmsId` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `note` ADD COLUMN `filmsId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Note_filmsId_key` ON `Note`(`filmsId`);

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_filmsId_fkey` FOREIGN KEY (`filmsId`) REFERENCES `Films`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
