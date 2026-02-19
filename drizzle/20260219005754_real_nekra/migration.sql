CREATE TYPE "maxEndgame" AS ENUM('L1', 'L2', 'L3', 'None');--> statement-breakpoint
ALTER TYPE "endgame" ADD VALUE 'Failed' BEFORE 'None';--> statement-breakpoint
CREATE TABLE "user" (
	"username" varchar(64) PRIMARY KEY
);
--> statement-breakpoint
ALTER TABLE "team_event" RENAME COLUMN "scoutName" TO "scout";--> statement-breakpoint
ALTER TABLE "team_event" DROP CONSTRAINT "team_event_pkey";--> statement-breakpoint
ALTER TABLE "team_match" ADD COLUMN "scout" varchar(64);--> statement-breakpoint
ALTER TABLE "team_match" DROP COLUMN "scoutName";--> statement-breakpoint
ALTER TABLE "team_event" ALTER COLUMN "maxClimb" SET DATA TYPE "maxEndgame" USING "maxClimb"::text::"maxEndgame";--> statement-breakpoint
CREATE SEQUENCE "team_match_id_seq";--> statement-breakpoint
ALTER TABLE "team_match" ALTER COLUMN "id" SET DEFAULT nextval('team_match_id_seq')--> statement-breakpoint
ALTER SEQUENCE "team_match_id_seq" OWNED BY "public"."team_match"."id";--> statement-breakpoint
ALTER TABLE "team_match" ALTER COLUMN "id" SET DATA TYPE int USING "id"::int;--> statement-breakpoint
ALTER TABLE "team_event" ADD CONSTRAINT "team_event_scout_user_username_fkey" FOREIGN KEY ("scout") REFERENCES "user"("username");--> statement-breakpoint
ALTER TABLE "team_match" ADD CONSTRAINT "team_match_scout_user_username_fkey" FOREIGN KEY ("scout") REFERENCES "user"("username");