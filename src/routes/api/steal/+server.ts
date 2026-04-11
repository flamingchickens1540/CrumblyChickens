import { PUBLIC_EVENT_KEY } from '$env/static/public';
import { db } from '@/server/db';
import { teamMatch } from '@/server/db/schema';
import type { TeamMatch } from '@/types';

export const POST = async () => {
    const res = await fetch(
        'https://script.google.com/macros/s/AKfycbzVfweB719jL0-D_cJD-4ujn0oQCy5IsFexXUzWDV70QhnIeZDRf1FbJUzEfhMflqjYmQ/exec?action=get&data=match&event=2026pncmp'
    );
    if (!res.ok) {
        console.log(res.status);
    }
    const data: {
        match: string;
        team: number;
        'on-field': string;
        'auto-actions': string;
        'auto-shot': number;
        'auto-passed': number;
        'auto-accuracy': number;
        'teleop-shot': number;
        'teleop-passed': number;
        'teleop-accuracy': number;
        'climb-attempted': string;
        'played-defense': string;
        'defended-against': string;
        disabled: string;
    }[] = await res.json();
    for (const entry of data) {
        const parsed: TeamMatch = {
            teamKey: entry.team,
            matchKey: entry.match,
            eventKey: PUBLIC_EVENT_KEY,
            autoStart: 'Outpost',
            fielded: entry['on-field'] == 'Y',
            autoHub: entry['auto-shot'],
            autoShuffle: entry['auto-shot'],
            teleHub: entry['teleop-shot'],
            teleShuffle: entry['teleop-shot'],
            teleSteal: 0,
            broken: false,
            died: entry.disabled == 'Y',
            notes: '',
            scout: '4915'
        };

        await db
            .insert(teamMatch)
            .values({
                ...parsed,
                scouted: true
            })
            .onConflictDoNothing();
    }
    console.log('Hopefully stole 4915s data!');
};
