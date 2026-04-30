import { PUBLIC_EVENT_KEY } from '$env/static/public';
import { db } from '@/server/db';
import { teamMatch } from '@/server/db/schema';
import type { TeamMatch } from '@/types';

export const GET = async () => {
    const res = await fetch(
        'https://script.google.com/macros/s/AKfycbzVfweB719jL0-D_cJD-4ujn0oQCy5IsFexXUzWDV70QhnIeZDRf1FbJUzEfhMflqjYmQ/exec?action=get&data=match&event=2026pncmp'
    );
    if (!res.ok) {
        console.log(res.status);
    }
    const {
        data
    }: {
        data: {
            match: number;
            team: number;
            'on-field': string;
            'auto-actions': string;
            'auto-shot': number;
            'auto-passed': number;
            'auto-approx-accuracy': string;
            'teleop-shot': number;
            'teleop-passed': number;
            'teleop-approx-accuracy': string;
            'climb-attempted': string;
            'played-defense': string;
            'defended-against': string;
            disabled: string;
        }[];
    } = await res.json();
    console.log(data);
    for (const entry of data) {
        const a = entry['teleop-approx-accuracy'];
        console.log(a);
        const accuracy = Math.ceil(Number(entry['teleop-accuracy']) / 20);
        console.log(accuracy);
    }
    console.log('Hopefully stole 4915s data!');
};
