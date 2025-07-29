/*
  Warnings:

  - You are about to drop the `refresh_tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_user_id_fkey";

-- DropTable
DROP TABLE "refresh_tokens";

-- CreateTable
CREATE TABLE "refresh_sessions" (
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "refresh_token" UUID NOT NULL,
    "ua" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "expires_in" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_sessions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "refresh_sessions" ADD CONSTRAINT "refresh_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
