import type { TeamEvent } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const team_event: TeamEvent = {
        images: [],
        drivetrain: "Swerve",
        l1: false,
        l2: false,
        l3: false,
        bump: false,
        trench: false,
        oppToNeutral: false,
        oppToAlliance: false,
        neuToAlliance: false,
        hopperCapacity: 0,
        maxShoot: 0,
        notes: "",
        teamKey: "",
    };

    return team_event;
};
