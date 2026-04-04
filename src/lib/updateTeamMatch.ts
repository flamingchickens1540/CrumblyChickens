import { eq } from "drizzle-orm";
import { db } from "./server/db";
import { teamMatch } from "./server/db/schema";
import { json } from "@sveltejs/kit";
import type { TeamMatch } from "./types";
type DBTeamMatch = TeamMatch & { id: number };
const updateMatch = async (tbaMatch: any) => {
    const matchKey = tbaMatch.key;
    const match = await db.query.match.findFirst({
        where: {
            matchKey,
        },
        with: {
            teamMatches: true,
        },
    });
    if (!match) {
        return json({ status: 500 });
    }
    const redTMs: DBTeamMatch[] = [];
    const blueTMs: DBTeamMatch[] = [];
    for (const tm of match.teamMatches as DBTeamMatch[]) {
        if (
            tbaMatch.alliances.blue.team_keys.find(
                (teamKey: string) => teamKey === "frc" + tm.teamKey,
            )
        ) {
            blueTMs.push(tm);
        } else if (
            tbaMatch.alliances.red.team_keys.find(
                (teamKey: string) => teamKey === "frc" + tm.teamKey,
            )
        ) {
            redTMs.push(tm);
        } else {
            console.error(
                `TeamMatch recorded when it isn't from the correct match. The correct match is ${tbaMatch.key}. TM: ${tm}`,
            );
        }
    }

    for (const red of redTMs) {
        const idx = tbaMatch.alliances.red.team_keys.indexOf(
            "frc" + red.teamKey,
        );
        if (idx === -1) {
            console.error("TeamMatch in Match not in TBAMatch");
            return;
        }

        // Did they climb in auto?
        // What did they do in endgame?
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
    let weightedAutoSum = 0.0;
    let weightedTeleSum = 0.0;
    for (const tm of teamMatches) {
        sumAuto += tm.autoHub ?? 0;
        sumTele += tm.teleHub ?? 0;
        const confidence = 6.0 - (tm.accuracy ? tm.accuracy : 3.0);
        weightedAutoSum += confidence * ((tm.autoHub ?? 0.0) + confidence);
        weightedTeleSum += confidence * ((tm.teleHub ?? 0.0) + confidence);
    }
    const diffAuto = breakdown.hubScore.autoPoints - sumAuto;
    const diffTele = breakdown.hubScore.teleopPoints - sumTele;
    for (const tm of teamMatches) {
        const confidence = 6.0 - (tm.accuracy ? tm.accuracy : 3.0);
        const autoP =
            (diffAuto * (((tm.autoHub ?? 0.0) + confidence) * confidence)) /
            weightedAutoSum;
        const teleP =
            (diffTele * (((tm.teleHub ?? 0.0) + confidence) * confidence)) /
            weightedTeleSum;
        const newAuto = Math.trunc((tm.autoHub ?? 0.0) + autoP);
        const newTele = Math.trunc((tm.teleHub ?? 0.0) + teleP);
        console.log(
            `team: ${tm.teamKey} auto diff: ${newAuto}\ntele: ${newTele}`,
        );
        const res = await db
            .update(teamMatch)
            .set({
                autoShuffle: newAuto,
                teleShuffle: newTele,
            })
            .where(eq(teamMatch.id, tm.id));
    }
};

export default updateMatch;
