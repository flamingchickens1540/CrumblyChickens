import type { TeamMatch } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    const user = cookies.get("user");

    if (!user) {
        throw redirect(303, "/login");
    }

    const team_match: TeamMatch = {
        teamKey: 1540,
        matchKey: "qm1",
        eventKey: "2026testing",

        autoStart: "Tower",
        fielded: true,
        autoHub: 0,
        autoShuffle: 0,
        autoClimb: false,
        teleHub: 0,
        teleShuffle: 0,
        teleSteal: 0,
        climb: "None",
        skill: 1,
        broken: false,
        died: false,
        notes: "",

        scout: user,
    };

    return team_match;
};
