import { db } from '@/server/db';
import { teamMatch } from '@/server/db/schema';
import type { TeamMatch } from '@/types';
import { json } from '@sveltejs/kit';

type Match = {
    matchNum: number;
    team: string;
    preNoShow: number;
    autoFuelTotal: number;
    teleFuelTotal: number;
    postSubBroke: number;
    postbreakDown: number;
};

/*{
        "matchNum":1,
        "allianceStationID":1,
        "team":"1073",
        "teamMatchNum":1,
        "preNoShow":0,
        "preStartPosID":1.0,
        "autoFuelTotal":0,
        "autoNZtotal":0,
        "autoLinePen":0,
        "autoClimbTypeID":null,
        "autoClimbLocID":null,
        "teleFuelTotal":186,
        "teleNZtotal":5,
        "nzShuttle":1,
        "oppShuttle":0,
        "oppPickup":1,
        "climbTypeID":5.0,
        "climbLocID":null,
        "climbTime":null,
        "postSubBroke":0.0,
        "postBreakDown":0.0,
        "postBeach":0.0,
        "postDef":0.0,
        "postWasDef":0.0,
        "nzPlow":0,
        "alliancePickup":5
    },*/
export const GET = async () => {
    const res = await fetch('https://scouting.team195.com/public/195scoutingData.json');
    const data: Match[] = await res.json();
    for (const tm of data) {
        const parsed: TeamMatch = {
            matchKey: '2026new_qm' + tm.matchNum,
            eventKey: '2026new',
            teamKey: Number(tm.team),
            autoClimb: false,
            autoHub: tm.autoFuelTotal,
            autoShuffle: tm.autoFuelTotal,
            autoStart: 'Tower',
            teleHub: tm.teleFuelTotal,
            teleShuffle: tm.teleFuelTotal,
            teleSteal: 0,
            climb: 'None',
            accuracy: 3,
            broken: false,
            died: false,
            fielded: tm.preNoShow > 0,
            scout: 'Autumn'
        };
        try {
        await db
            .insert(teamMatch)
            .values({ scouted: true, ...parsed })
            .onConflictDoNothing();} catch (e) {
            console.error(e);
        }
    }

    return json(200);
};
