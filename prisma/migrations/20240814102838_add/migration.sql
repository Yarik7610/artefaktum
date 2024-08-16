/*
  Warnings:

  - A unique constraint covering the columns `[collection_id,voter_id]` on the table `ratings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_voter_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "ratings_collection_id_voter_id_key" ON "ratings"("collection_id", "voter_id");

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_voter_id_fkey" FOREIGN KEY ("voter_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
