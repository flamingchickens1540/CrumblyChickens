import { eq } from 'drizzle-orm';
import { db } from './server/db';
import { teamMatch } from './server/db/schema';
import { json } from '@sveltejs/kit';
import type { TeamMatch } from './types';
type DBTeamMatch = TeamMatch & { id: number };
const updateMatch = async (tbaMatch: any) => {
    console.log(`recieved request for ${tbaMatch.alliances.blue.team_keys} and ${tbaMatch.alliances.red.team_keys}`);
    const matchKey = tbaMatch.key;
    const match = await db.query.match.findFirst({
        where: {
            matchKey
        },
        with: {
            teamMatches: true
        }
    });
    if (!match) {
        return json({ status: 500 });
    }
    const redTMs: DBTeamMatch[] = [];
    const blueTMs: DBTeamMatch[] = [];
    for (const tm of match.teamMatches as DBTeamMatch[]) {
        if (
            tbaMatch.alliances.blue.team_keys.find(
                (teamKey: string) => teamKey === 'frc' + tm.teamKey
            )
        ) {
            blueTMs.push(tm);
        } else if (
            tbaMatch.alliances.red.team_keys.find(
                (teamKey: string) => teamKey === 'frc' + tm.teamKey
            )
        ) {
            redTMs.push(tm);
        } else {
            console.error(
                `TeamMatch recorded when it isn't from the correct match. The correct match is ${tbaMatch.key}. TM: ${tm}`
            );
        }
    }


    updateAlliance(redTMs, tbaMatch.score_breakdown.red);
    updateAlliance(blueTMs, tbaMatch.score_breakdown.blue);
};

const updateAlliance = async (teamMatches: DBTeamMatch[], breakdown: any) => {
    if (teamMatches.length != 3) {
        return;
    }
    let sumAuto = 0;
    let sumTele = 0;
    for (const tm of teamMatches) {
        sumAuto += tm.autoHub ?? 0;
        sumTele += tm.teleHub ?? 0;
    }
    const diffAuto = breakdown.hubScore.autoPoints - sumAuto;
    const diffTele = breakdown.hubScore.teleopPoints - sumTele;
    for (const tm of teamMatches) {
        const autoP = (diffAuto * (((tm.autoHub ?? 0.0))) / sumAuto);
        const teleP = (diffTele * (((tm.teleHub ?? 0.0))) / sumTele);
        const newAuto = Math.floor((tm.autoHub ?? 0.0) + autoP);
        const newTele =Math.floor((tm.teleHub ?? 0.0) + teleP);
        console.log(`team: ${tm.teamKey} \nauto diff: ${diffAuto}\ntele: ${diffTele}`);
        const res = await db
            .update(teamMatch)
            .set({
                autoShuffle: newAuto,
                teleShuffle: newTele
            })
            .where(eq(teamMatch.id, tm.id));
    }
};

export default updateMatch;
