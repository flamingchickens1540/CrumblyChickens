import type { teamEvent, teamMatch } from './server/db/schema';

// Helper Types
type RequiredNotNull<T> = {
    [P in keyof T]: NonNullable<T[P]>;
};
type Ensure<T, K extends keyof T> = T & RequiredNotNull<Pick<T, K>>;
type Full<T> = Ensure<T, keyof T>;

export type NumKey<T> = {
    [K in keyof T]: T[K] extends number | undefined | null ? K : never;
}[keyof T];

export type GameStage = 'PreMatch' | 'Auto' | 'Tele' | 'PostMatch';

export type DriveTrain = 'Swerve' | 'Tank';
export type AutoStart = 'Tower' | 'Outpost' | 'Depot';
export type Climb = 'L1' | 'L2' | 'L3' | 'None' | 'Failed';
export type DriverSkill = 1 | 2 | 3 | 4 | 5;

type PendingRobot = {
    status: 'Pending';
    teamKey: number;
    scout: string;
};
type UnassignedRobot = {
    status: 'Unassigned';
    teamKey: number;
};
type SubmittedRobot = {
    status: 'Submitted';
    teamKey: number;
    scout: string;
};
export type Robot = PendingRobot | UnassignedRobot | SubmittedRobot;
export type Match = {
    matchKey: string;
    red: [Robot, Robot, Robot];
    blue: [Robot, Robot, Robot];
};

export type TeamMatch = Full<Omit<typeof teamMatch.$inferInsert, 'id' | 'scouted'>>;

export type TeamEvent = Full<Omit<typeof teamEvent.$inferInsert, 'completed'>>;
