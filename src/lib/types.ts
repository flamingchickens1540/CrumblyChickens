type DriveTrain = 'Swerve' | 'Tank';

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
