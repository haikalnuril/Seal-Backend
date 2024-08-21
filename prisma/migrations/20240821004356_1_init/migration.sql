-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_proyekId_fkey`;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_proyekId_fkey` FOREIGN KEY (`proyekId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
