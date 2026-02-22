import { db } from '$lib/server/db';
import { teamEvent } from '$lib/server/db/schema';
import type { TeamEvent } from '$lib/types';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    // TODO Store images
    const { te, images: _ }: { te: TeamEvent; images: string[] } = await request.json();

    await db.insert(teamEvent).values({
        ...te,
        completed: true
    });

    return json({ ok: true });
};
