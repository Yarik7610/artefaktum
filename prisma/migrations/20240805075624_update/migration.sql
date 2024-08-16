/*
  Warnings:

  - You are about to drop the `ActivateToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActivateToken" DROP CONSTRAINT "ActivateToken_user_id_fkey";

-- DropTable
DROP TABLE "ActivateToken";

-- CreateTable
CREATE TABLE "activate_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "activatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "activate_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "activate_tokens_token_key" ON "activate_tokens"("token");

-- AddForeignKey
ALTER TABLE "activate_tokens" ADD CONSTRAINT "activate_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
