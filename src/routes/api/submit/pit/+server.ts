import { db } from "$lib/server/db";
import { teamEvent } from "$lib/server/db/schema";
import type { TeamEvent } from "$lib/types";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
    // TODO Store images
    const {
        team_event,
        images: _,
    }: { team_event: TeamEvent; images: string[] } = await request.json();

    await db.insert(teamEvent).values({
        ...team_event,
        completed: true,
    });

    return json({ ok: true });
};
