import { db } from "$lib/server/db";
import { team, teamEvent, event, match } from "$lib/server/db/schema";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { TBA_API_KEY } from "$env/static/private";

export const POST: RequestHandler = async ({ request }) => {
    const eventKey = await request.text();
    let res = await fetch(
        `https://www.thebluealliance.com/api/v3/event/${eventKey}/teams/simple`,
        {
            method: "GET",
            headers: {
                "X-TBA-Auth-Key": TBA_API_KEY,
            },
        },
    );

    if (!res.ok) {
        console.log("Failed to load event from tba into db");
        console.log(res);

        return json({ ok: false });
    }

    const data: any[] = await res.json();

    console.log("Inserting Event Key " + eventKey);
    const teams: { teamKey: number; name: string }[] = data.map((d) => {
        return { teamKey: d["team_number"], name: d["nickname"] };
    });

    res = await fetch(
        `https://www.thebluealliance.com/api/v3/event/${eventKey}/matches/keys`,
        {
            method: "GET",
            headers: {
                "X-TBA-Auth-Key": TBA_API_KEY,
            },
        },
    );

    if (!res.ok) {
        console.log("Failed to load matches from event into db");
        console.log(res);

        return json({ ok: false });
    }
    const matches: string[] = await res.json();

    await db.insert(event).values({ eventKey: eventKey }).onConflictDoNothing();

    for (const matchKey of matches) {
        await db
            .insert(match)
            .values({ matchKey, eventKey })
            .onConflictDoNothing();
    }

    for (const { teamKey, name } of teams) {
        await db.insert(team).values({ teamKey, name }).onConflictDoNothing();

        await db
            .insert(teamEvent)
            .values({
                teamKey,
                eventKey: eventKey,
                completed: false,
            })
            .onConflictDoNothing();
    }

    return json({ ok: true });
};
