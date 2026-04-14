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
            match: string;
            team: string;
            'on-field': string;
            'auto-actions': string;
            'auto-shot': string;
            'auto-passed': string;
            'auto-approx-accuracy': string;
            'teleop-shot': string;
            'teleop-passed': string;
            'teleop-approx-accuracy': string;
            'climb-attempted': string;
            'played-defense': string;
            'defended-against': string;
            disabled: string;
        }[];
    } = await res.json();
    console.log(data);
    for (const entry of data) {
        const accuracy: number = Math.ceil(Number(entry['teleop-accuracy']) / 20);
        const parsed: TeamMatch = {
            teamKey: Number(entry.team),
            matchKey: '2026pncmp_qm' + entry.match,
            eventKey: PUBLIC_EVENT_KEY,
            autoStart: 'Outpost',
            fielded: entry['on-field'] == 'Y',
            autoHub: Number(entry['auto-shot']),
            autoShuffle: Number(entry['auto-shot']),
            teleHub: Number(entry['teleop-shot']),
            teleShuffle: Number(entry['teleop-shot']),
            teleSteal: 0,
            broken: false,
            died: entry.disabled == 'Y',
            accuracy: Math.ceil(Number(entry['teleop-approx-accuracy']) / 20),
            notes: '',
            scout: '4915'
        };
        try {
        await db
            .insert(teamMatch)
            .values({
                ...parsed,
                scouted: true
            })
            .onConflictDoNothing();
        } catch (e) {
            console.error(e);
        }
    }
    console.log('Hopefully stole 4915s data!');
};
