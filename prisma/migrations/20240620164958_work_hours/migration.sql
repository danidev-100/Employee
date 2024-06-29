/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `WorkHours` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `workDate` DATETIME(3) NOT NULL,
    `workIn` DATETIME(3) NOT NULL,
    `workOut` DATETIME(3) NOT NULL,
    `employeeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WorkHours` ADD CONSTRAINT `WorkHours_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
