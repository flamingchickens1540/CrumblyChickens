CREATE TYPE "auto_start" AS ENUM('Tower', 'Outpost', 'Depot');--> statement-breakpoint
CREATE TYPE "drivetrain" AS ENUM('Swerve', 'Tank', 'Other');--> statement-breakpoint
CREATE TYPE "endgame" AS ENUM('L1', 'L2', 'L3', 'None');--> statement-breakpoint
CREATE TABLE "event" (
	"eventKey" varchar(64) PRIMARY KEY
);
--> statement-breakpoint
CREATE TABLE "match" (
	"matchKey" varchar(64) PRIMARY KEY,
	"eventKey" varchar(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team" (
	"teamKey" integer PRIMARY KEY,
	"name" varchar(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_event" (
	"teamKey" integer PRIMARY KEY,
	"eventKey" varchar(64) NOT NULL,
	"drivetrain" "drivetrain",
	"canBump" boolean,
	"canTrench" boolean,
	"maxClimb" "endgame",
	"canShuffle" boolean,
	"canHalfSteal" boolean,
	"canSteal" boolean,
	"maxShotDistance" integer,
	"hopperCapacity" integer,
	"robotIceCream" text,
	"biggestPride" text,
	"notes" text,
	"scoutName" varchar(64),
	"completed" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_match" (
	"id" integer PRIMARY KEY,
	"teamKey" integer NOT NULL,
	"matchKey" varchar(64) NOT NULL,
	"eventKey" varchar(64) NOT NULL,
	"autoStart" "auto_start",
	"fielded" boolean,
	"autoHub" integer,
	"autoShuffle" integer,
	"autoClimb" boolean,
	"teleHub" integer,
	"teleShuffle" integer,
	"teleSteal" integer,
	"climb" "endgame",
	"skill" integer,
	"broken" boolean,
	"died" boolean,
	"notes" text,
	"scoutName" varchar(64),
	"scouted" boolean NOT NULL,
	CONSTRAINT "team_match_key" UNIQUE("teamKey","matchKey")
);
--> statement-breakpoint
ALTER TABLE "match" ADD CONSTRAINT "match_eventKey_event_eventKey_fkey" FOREIGN KEY ("eventKey") REFERENCES "event"("eventKey");--> statement-breakpoint
ALTER TABLE "team_event" ADD CONSTRAINT "team_event_teamKey_team_teamKey_fkey" FOREIGN KEY ("teamKey") REFERENCES "team"("teamKey");--> statement-breakpoint
ALTER TABLE "team_event" ADD CONSTRAINT "team_event_eventKey_event_eventKey_fkey" FOREIGN KEY ("eventKey") REFERENCES "event"("eventKey");--> statement-breakpoint
ALTER TABLE "team_match" ADD CONSTRAINT "team_match_matchKey_match_matchKey_fkey" FOREIGN KEY ("matchKey") REFERENCES "match"("matchKey");--> statement-breakpoint
ALTER TABLE "team_match" ADD CONSTRAINT "team_match_eventKey_event_eventKey_fkey" FOREIGN KEY ("eventKey") REFERENCES "event"("eventKey");