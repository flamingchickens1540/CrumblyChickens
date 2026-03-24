import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { TBA_API_KEY, DATABASE_URL } from '$env/static/private';
import { db } from '@/server/db';
import { match, teamMatch } from '@/server/db/schema';
import { PUBLIC_EVENT_KEY } from '$env/static/public';

export const GET: RequestHandler = async ({ url }) => {
    const matchKey = url.searchParams.get('key');
    const res = await fetch(`https://www.thebluealliance.com/api/v3/match/${matchKey}/simple`, {
        method: 'GET',
        headers: {
            'X-TBA-Auth-Key': TBA_API_KEY
        }
    });

    if (!res.ok) {
        console.error('Failed to load event from tba into db: ' + res.status);
        return json({ ok: false });
    }

    const data: any = await res.json();
    try {
        await db.insert(match).values({ matchKey: `${matchKey}`, eventKey: PUBLIC_EVENT_KEY });
    } catch (e) {
        console.error(e);
    }
    const alliances = data['alliances'];
    const red = alliances['red']['team_keys'];
    const blue = alliances['blue']['team_keys'];
    return json({ red, blue });
};
