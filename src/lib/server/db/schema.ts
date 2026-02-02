import {
	pgTable as table,
	serial,
	integer,
	text,
	boolean,
	pgEnum,
	varchar,
	unique,
	primaryKey
} from 'drizzle-orm/pg-core';

export const user = table('user', { id: serial('id').primaryKey(), age: integer('age') });

export const endgame = pgEnum('endgame', ['L1', 'L2', 'L3', 'None']);
export const drivetrain = pgEnum('drivetrain', ['Swerve', 'Tank', 'Other']);

export const teamEvent = table('team_event', {
	teamKey: integer('team_key'),
	eventKey: varchar('event_key', { length: 64 }).references(() => event.eventKey),
	drivetrain: drivetrain(),
	canBump: boolean(),
	canTrench: boolean(),
	maxClimb: endgame(),
	canShuffle: boolean(),
	canHalfSteam: boolean(),
	canSteal: boolean(),
	maxShotDistance: integer(),
	hopperCapacity: integer(),
	robotIceCream: text(),
	biggestPride: text(),
	notes: text()
});
export const event = table('event', {
	eventKey: varchar('event_key', { length: 64 })
});
export const match = table('match', {
	matchKey: varchar({ length: 64 }),
	eventKey: varchar({ length: 64 })
});
export const teamMatch = table(
	'team_match',
	{
		teamKey: integer('team_key'),
		matchKey: varchar('match_key', { length: 64 }).references(() => match.matchKey),
		eventKey: varchar('event_key', { length: 64 }).references(() => event.eventKey),
		autoStart: varchar('auto_start_location', { length: 16 }),
		fielded: boolean('fielded'),
		autoHub: integer('auto_hub'),
		autoShuffle: integer('auto_shuffle'),
		autoClimb: boolean('auto_climb'),
		teleHub: integer('tele_hub'),
		teleShuffle: integer('tele_shuffle'),
		teleSteal: integer('tele_steal'),
		climb: endgame(),
		skill: integer(),
		broken: boolean(),
		died: boolean(),
		notes: text(),
		scoutName: varchar('scout_name', { length: 64 })
	},
	(table) => {
		return {
			teamMatchKeyUnique: primaryKey({
				name: 'team_match_key_unique',
				columns: [table.teamKey, table.matchKey]
			})
		};
	}
);
