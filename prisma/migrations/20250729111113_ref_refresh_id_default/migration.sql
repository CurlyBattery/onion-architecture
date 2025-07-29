-- AlterTable
CREATE SEQUENCE refresh_sessions_id_seq;
ALTER TABLE "refresh_sessions" ALTER COLUMN "id" SET DEFAULT nextval('refresh_sessions_id_seq');
ALTER SEQUENCE refresh_sessions_id_seq OWNED BY "refresh_sessions"."id";
