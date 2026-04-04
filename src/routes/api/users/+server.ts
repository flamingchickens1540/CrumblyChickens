import { db } from "@/server/db";
import { count, eq } from "drizzle-orm";
import { team, teamMatch, user } from "@/server/db/schema";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request: _ }) => {
    let user_list = await db.select().from(user);

    return await Promise.all(
        user_list.map(async ({ username }) => {
            const cleaned_username: string = username.trim().toLowerCase();

            const matches_scouted = await db
                .select({ matches_scouted: count() })
                .from(teamMatch)
                .where(eq(teamMatch.scout, cleaned_username));

            console.log("matches scouted: " + matches_scouted);

            return {
                username: cleaned_username,
                matches_scouted,
            };

            // await db.update(user);
        }),
    );
};
