-- AlterTable
ALTER TABLE `projection` ADD COLUMN `filmsId` VARCHAR(191) NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `Projection` ADD CONSTRAINT `Projection_filmsId_fkey` FOREIGN KEY (`filmsId`) REFERENCES `Films`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE Projection DROP FOREIGN KEY Projection_filmsId_fkey;
