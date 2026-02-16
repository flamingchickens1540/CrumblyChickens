export type GameStage = "PreMatch" | "Auto" | "Tele" | "PostMatch";

export type DriveTrain = "Swerve" | "Tank";
export type AutoStart = "Tower" | "Outpost" | "Depot";
export type Climb = "L1" | "L2" | "L3" | "Not Attempted" | "Failed";
export type DriverSkill = 1 | 2 | 3 | 4 | 5;

export type TeamMatch = {
    teamKey: string;
    matchKey: string;
    eventKey: string;

    autoStart: AutoStart;
    fielded: boolean;
    autoHub: number;
    autoShuffle: number;
    autoClimb: boolean;
    teleHub: number;
    teleShuffle: number;
    teleSteal: number;
    climb: Climb;
    skill: DriverSkill;
    broken: boolean;
    died: boolean;
    notes: string;

    scout: string;
};

export type TeamEvent = {
    images: Array<string>;
    drivetrain: DriveTrain;
    l1: boolean;
    l2: boolean;
    l3: boolean;
    bump: boolean;
    trench: boolean;
    oppToNeutral: boolean;
    oppToAlliance: boolean;
    neuToAlliance: boolean;
    hopperCapacity: number;
    maxShoot: number;
    notes: string;
    teamKey: string;
};
