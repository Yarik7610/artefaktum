/*
  Warnings:

  - You are about to drop the column `rating` on the `collections` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "collections" DROP COLUMN "rating";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "rating";

-- CreateTable
CREATE TABLE "ratings" (
    "id" TEXT NOT NULL,
    "for_collection" BOOLEAN NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "user_id" TEXT,
    "collection_id" TEXT,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;
