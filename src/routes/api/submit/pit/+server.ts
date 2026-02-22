import { db } from '$lib/server/db';
import { teamEvent } from '$lib/server/db/schema';
import type { TeamEvent } from '$lib/types';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    // TODO Store images
    const { data: te, images: _ }: { data: TeamEvent; images: string[] } = await request.json();

    try {
        await db.insert(teamEvent).values({
            ...te,
            completed: true
        });
    } catch (error) {
        return json({ ok: false, status: 500 });
    }

    return json({ ok: true });
};
