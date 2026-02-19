import type { TeamEvent } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const team_event: TeamEvent = {
        teamKey: 1540,
        scout: 'Azalea',
        eventKey: '2026testing',

        drivetrain: 'Swerve',
        maxClimb: 'None',
        canBump: false,
        canTrench: false,
        canHalfSteal: false,
        canSteal: false,
        canShuffle: false,
        hopperCapacity: 0,
        maxShotDistance: 0,
        robotIceCream: '',
        biggestPride: '',
        notes: ''
    };

    return team_event;
};
