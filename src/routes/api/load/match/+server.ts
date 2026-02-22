import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { TBA_API_KEY } from '$env/static/private';

export const GET: RequestHandler = async ({ url }) => {
    const matchKey = url.searchParams.get('key');
    const eventKey = '2026orco'; // TODO Change or env var or smth
    const res = await fetch(
        `https://www.thebluealliance.com/api/v3/match/${eventKey}_${matchKey}/simple`,
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
    const alliances = data['alliances'];
    const red = alliances['red'];
    const blue = alliances['blue'];

    return json({ ok: true, teams: [...red, ...blue] });
};
