import { db } from '$lib/server/db';
import { team, teamEvent, event } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { TBA_API_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
    const eventKey = await request.text();
    const res = await fetch(
        `https://www.thebluealliance.com/api/v3/event/${eventKey}/teams/simple`,
        {
            method: 'GET',
            headers: {
                'X-TBA-Auth-Key': TBA_API_KEY
            }
        }
    );

    if (!res.ok) {
        console.log('Failed to load event from tba into db');
        console.log(res);

        return json({ ok: false });
    }

    const data: any[] = await res.json();

    console.log('Inserting Event Key ' + eventKey);
    const teams: { teamKey: number; name: string }[] = data.map((d) => {
        return { teamKey: d['team_number'], name: d['nickname'] };
    });

    await db.insert(event).values({ eventKey: eventKey });

    for (const { teamKey, name } of teams) {
        try {
            await db.insert(team).values({ teamKey, name });
        } catch (e) {
            console.error(e);
        }

        try {
            await db.insert(teamEvent).values({
                teamKey,
                eventKey: eventKey,
                completed: false
            });
        } catch (e) {
            console.error(e);
        }
    }

    return json({ ok: true });
};
