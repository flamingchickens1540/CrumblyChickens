import type { TeamEvent } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const team_event: TeamEvent = {
        images: [],
        drivetrain: "Swerve",
        maxClimb: "None",
        canBump: false,
        canTrench: false,
        canHalfSteal: false,
        canSteal: false,
        canShuffle: false,
        hopperCapacity: 0,
        maxShotDistance: 0,
        robotIceCream: "",
        biggestPride: "",
        notes: "",
        teamKey: 0,
        scout: "",
        eventKey: "",
    };

    return team_event;
};
