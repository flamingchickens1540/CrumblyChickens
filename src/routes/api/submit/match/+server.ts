import { db } from "$lib/server/db";
import { teamMatch } from "$lib/server/db/schema";
import type { TeamMatch } from "$lib/types";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

// type TeamMatchI = typeof teamMatch.$inferInsert;

export const POST: RequestHandler = async ({ request }) => {
    const team_match: TeamMatch = await request.json();

    await db.insert(teamMatch).values({
        ...team_match,
        scouted: true,
    });

    return json({ ok: true });
};
