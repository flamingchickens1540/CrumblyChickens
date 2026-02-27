ALTER TABLE "team_event" ADD COLUMN "id" serial;--> statement-breakpoint
ALTER TABLE "team_event" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "team_event" ADD CONSTRAINT "team_event_key" UNIQUE("eventKey","teamKey");