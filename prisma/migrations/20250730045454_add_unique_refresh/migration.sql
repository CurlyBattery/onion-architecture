/*
  Warnings:

  - A unique constraint covering the columns `[user_id,ip,ua,fingerprint]` on the table `refresh_sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "refresh_sessions_user_id_ip_ua_fingerprint_key" ON "refresh_sessions"("user_id", "ip", "ua", "fingerprint");
