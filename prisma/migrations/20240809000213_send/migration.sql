-- DropIndex
DROP INDEX `Projection_filmsId_fkey` ON `projection`;

-- AddForeignKey
ALTER TABLE `Projection` ADD CONSTRAINT `Projection_filmsId_fkey` FOREIGN KEY (`filmsId`) REFERENCES `Films`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
