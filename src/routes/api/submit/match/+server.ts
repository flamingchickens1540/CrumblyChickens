import { db } from '$lib/server/db';
import { teamMatch } from '$lib/server/db/schema';
import type { TeamMatch } from '$lib/types';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request }) => {
    const tm: TeamMatch = await request.json();
    tm.autoShuffle = tm.autoHub;
    tm.teleShuffle = tm.teleHub;

    try {
        await db
            .insert(teamMatch)
            .values({
                ...tm,
                scouted: true
            })
            .onConflictDoUpdate({
                target: [teamMatch.teamKey, teamMatch.matchKey, teamMatch.eventKey],
                targetWhere: eq(teamMatch.teamKey, tm.teamKey),
                set: { ...tm }
            });
    } catch (error) {
        console.log(error);
        return json({ ok: false });
    }

    return json({ ok: true });
};
