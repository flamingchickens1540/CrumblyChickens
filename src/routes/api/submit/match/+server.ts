import { db } from '$lib/server/db';
import { teamMatch } from '$lib/server/db/schema';
import type { TeamMatch } from '$lib/types';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    const tm: TeamMatch = await request.json();

    try {
        await db.insert(teamMatch).values({
            ...tm,
            scouted: true
        });
    } catch (error) {
        console.log(error);
        return json({ ok: false });
    }

    return json({ ok: true });
};
