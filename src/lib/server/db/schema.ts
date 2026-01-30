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

export const teamEvent = table('team_event', {
	teamKey: integer('team_key'),
	eventKey: varchar('event_key', { length: 64 }).references(() => event.eventKey)
});
export const event = table('event', {
	eventKey: varchar('event_key', { length: 64 })
});

export const endgame = pgEnum('endgame', ['L1', 'L2', 'L3', 'None']);
export const teamMatch = table(
	'team_match',
	{
		teamKey: integer('team_key'),
		matchKey: varchar('match_key', { length: 64 }),
		eventKey: varchar('event_key', { length: 64 }),
		autoStart: varchar('auto_start_location', { length: 16 }),
		autoClimb: boolean('auto_climb'),
		autoHub: integer('auto_hub'),
		autoShuffle: integer('auto_shuffle'),
		teleHub: integer('tele_hub'),
		teleShuffle: integer('tele_shuffle'),
		teleSteal: integer('tele_steal'),
		driverSkill: integer('driver_skill'),
		endgame: endgame(),
		died: boolean('died'),
		notes: text('notes')
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
