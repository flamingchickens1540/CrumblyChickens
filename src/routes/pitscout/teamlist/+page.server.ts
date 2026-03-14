import { db } from '@/server/db';
import { teamEvent } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { PUBLIC_EVENT_KEY } from '$env/static/private';
export const load = async () => {
    const teamEvents = await db
        .select()
        .from(teamEvent)
        .where(eq(teamEvent.eventKey, PUBLIC_EVENT_KEY));
    return { teamEvents };
};
