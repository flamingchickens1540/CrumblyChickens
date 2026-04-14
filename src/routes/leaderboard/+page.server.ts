import { PUBLIC_EVENT_KEY } from "$env/static/public";
import { db } from "@/server/db";
import { teamMatch } from "@/server/db/schema";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const load = async ({ cookies }: any) => {
    const teamMatches = await db
        .select()
        .from(teamMatch)
        .where(eq(teamMatch.eventKey, PUBLIC_EVENT_KEY));

    const users = teamMatches.map((tm) => tm.scout?.toLowerCase()).filter((tm) => tm != null).map(name => name.replace(/./, name[0].toUpperCase()));

    const usersMap: Map<string, number> = new Map();

    // This loop is actually so sexy if you think about it on the asm level
    users.forEach((user) => {
        const count = usersMap.get(user) ?? 0;
        usersMap.set(user, count + 1);
    });

    const usersList = usersMap.entries().map(([name, matches]) => {
        return { name, matches };
    }).toArray().sort((a, b) => b.matches - a.matches);
    const user = cookies.get("user");

    if (!user) {
        throw redirect(303, '/login');
    }

    return {
        user,
        usersList
    };
};
