import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { teamMatch } from "@/server/db/schema";
import { json, type RequestHandler } from "@sveltejs/kit";
import { PUBLIC_EVENT_KEY } from "$env/static/public";

export const GET: RequestHandler = async ({ request: _ }) => {
    const team_matches = await db
        .select()
        .from(teamMatch)
        .where(eq(teamMatch.eventKey, PUBLIC_EVENT_KEY));

    const users = team_matches.map((tm) => tm.scout).filter((tm) => tm != null);

    const users_map: Map<string, number> = new Map();

    // This loop is actually so sexy if you think about it on the asm level
    users.forEach((user) => {
        const count = users_map.get(user) ?? 0;
        users_map.set(user, count + 1);
    });

    const users_list = users_map.entries().map(([user, matches]) => {
        return { user, matches };
    });

    return json(users_list);
};
