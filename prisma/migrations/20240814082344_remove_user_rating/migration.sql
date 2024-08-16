/*
  Warnings:

  - You are about to drop the column `for_collection` on the `ratings` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `ratings` table. All the data in the column will be lost.
  - You are about to drop the column `rating_count` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_user_id_fkey";

-- AlterTable
ALTER TABLE "ratings" DROP COLUMN "for_collection",
DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "rating_count";
