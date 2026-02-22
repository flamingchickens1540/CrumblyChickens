import type { RouteParams } from '$app/types';
import type { TeamEvent } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, url }) => {
    const team_event: TeamEvent = {
        teamKey: parseInt(url.searchParams.get('team') ?? '1540'),
        scout: cookies.get('user'),
        eventKey: '2026orco',
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
