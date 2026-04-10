import { json } from '@sveltejs/kit';

export const GET = async () => {
    const res = await fetch('https://schedule.yayblaze.com/api/scouting', {
        method: 'GET',
        headers: { accept: 'application/json' }
    });
    const data: { slot: string; scouts: string[] } = await res.json();
    return json(data);
};
