import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { TBA_API_KEY, EVENT_KEY } from '$env/static/private';
import { db } from '@/server/db';
import { match, teamMatch } from '@/server/db/schema';

export const GET: RequestHandler = async ({ url }) => {
    const matchKey = url.searchParams.get('key');
    const res = await fetch(
        `https://www.thebluealliance.com/api/v3/match/${EVENT_KEY}_${matchKey}/simple`,
        {
            method: 'GET',
            headers: {
                'X-TBA-Auth-Key': TBA_API_KEY
            }
        }
    );

    if (!res.ok) {
        alert('Failed to load event from tba into db');
        return json({ ok: false });
    }

    const data: any = await res.json();
    try {
        db.insert(match).values({ matchKey: `${EVENT_KEY}_${matchKey}`, eventKey: EVENT_KEY });
    } catch (e) {
        console.error(e);
    }
    const alliances = data['alliances'];
    const red = alliances['red']['team_keys'];
    const blue = alliances['blue']['team_keys'];
    return json({ red, blue });
};
