/*
  Warnings:

  - Added the required column `voter_id` to the `ratings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ratings" ADD COLUMN     "voter_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_voter_id_fkey" FOREIGN KEY ("voter_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
