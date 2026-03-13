import { db } from '@/server/db';
import { teamEvent } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { EVENT_KEY } from '$env/static/private';
export const load = async () => {
    const teamEvents = await db.select().from(teamEvent).where(eq(teamEvent.eventKey, EVENT_KEY));
    return { teamEvents };
};
