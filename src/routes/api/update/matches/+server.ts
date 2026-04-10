import { TBA_API_KEY } from '$env/static/private';
import { PUBLIC_EVENT_KEY } from '$env/static/public';
import updateMatch from '@/updateTeamMatch';
import { json } from '@sveltejs/kit';
export const POST = async () => {
    const res = await fetch(
        `https://www.thebluealliance.com/api/v3/event/${PUBLIC_EVENT_KEY}/matches`,
        {
            method: 'GET',
            headers: { 'X-TBA-Auth-Key': TBA_API_KEY }
        }
    );
    if (!res.ok) {
        console.log(res.status);
        return json({ ok: false });
    }

    const matches: any[] = await res.json();

    for (const match of matches) {
        await updateMatch(match);
    }
};
