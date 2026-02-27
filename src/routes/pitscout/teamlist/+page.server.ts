import { db } from '@/server/db';
import { teamEvent } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = async () => {
    const teamEvents = await db.select().from(teamEvent).where(eq(teamEvent.eventKey, '2026orco'));
    return { teamEvents };
};
