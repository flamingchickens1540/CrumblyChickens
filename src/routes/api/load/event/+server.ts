import { db } from "$lib/server/db";
import { team } from "$lib/server/db/schema";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { TBA_API_KEY } from "$env/static/private";

export const POST: RequestHandler = async ({ request }) => {
    const event_key = await request.text();
    console.log(event_key);
    const res = await fetch(
        `https://www.thebluealliance.com/api/v3/event/${event_key}/teams`,
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

    console.log(data);
    const teams: { teamKey: number; name: string }[] = data.map((d) => {
        return { teamKey: d["team_number"], name: d["nickname"] };
    });

    for (const { teamKey, name } of teams) {
        await db.insert(team).values({ teamKey, name });
    }

    return json({ ok: true });
};
