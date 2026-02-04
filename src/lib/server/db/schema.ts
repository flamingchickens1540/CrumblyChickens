import {
	pgTable as table,
	integer,
	text,
	boolean,
	pgEnum,
	varchar,
	unique
} from 'drizzle-orm/pg-core';
import { defineRelations } from 'drizzle-orm';

export const endgame = pgEnum('endgame', ['L1', 'L2', 'L3', 'None']);
export const drivetrain = pgEnum('drivetrain', ['Swerve', 'Tank', 'Other']);
export const autoStart = pgEnum('auto_start', ['Tower', 'Outpost', 'Depot']);

// I think this would be helpful for relations stuff? But maybe unneeded
export const event = table('event', {
	eventKey: varchar({ length: 64 })
});
// Idk, having a team name seems potentially useful for insights stuff
export const team = table('team', {
	teamKey: integer(),
	name: varchar({ length: 64 })
});

export const teamEvent = table('team_event', {
	teamKey: integer().references(() => team.teamKey),
	eventKey: varchar({ length: 64 }).references(() => event.eventKey),
	drivetrain: drivetrain(),
	canBump: boolean(),
	canTrench: boolean(),
	maxClimb: endgame(),
	canShuffle: boolean(),
	canHalfSteal: boolean(),
	canSteal: boolean(),
	maxShotDistance: integer(),
	hopperCapacity: integer(),
	robotIceCream: text(),
	biggestPride: text(),
	notes: text(),
	scoutName: varchar({ length: 64 }),
	completed: boolean().notNull()
});

// Expanded with data from TBA (once they release that info)
export const match = table('match', {
	matchKey: varchar({ length: 64 }).primaryKey(),
	eventKey: varchar({ length: 64 }).references(() => event.eventKey)
});
export const teamMatch = table(
	'team_match',
	{
		id: integer().primaryKey(),
		teamKey: integer().notNull(),
		matchKey: varchar({ length: 64 })
			.notNull()
			.references(() => match.matchKey),
		eventKey: varchar({ length: 64 })
			.notNull()
			.references(() => event.eventKey),
		autoStart: autoStart(),
		fielded: boolean(),
		autoHub: integer(),
		autoShuffle: integer(),
		autoClimb: boolean(),
		teleHub: integer(),
		teleShuffle: integer(),
		teleSteal: integer(),
		climb: endgame(),
		skill: integer(),
		broken: boolean(),
		died: boolean(),
		notes: text(),
		scoutName: varchar({ length: 64 }),
		scouted: boolean().notNull()
	},
	(table) => {
		return [unique('team_match_key').on(table.teamKey, table.matchKey)];
	}
);

export const relations = defineRelations(
	{
		event,
		team,
		teamEvent,
		match,
		teamMatch
	},
	(r) => ({
		events: {
			teamEvents: r.many.teamEvent(),
			matches: r.many.match(),
			teamMatches: r.many.teamMatch()
		},
		team: {
			teamEvents: r.many.teamEvent()
		},
		teamEvent: {
			event: r.one.event({
				from: r.teamEvent.eventKey,
				to: r.event.eventKey
			}),
			team: r.one.team({
				from: r.teamEvent.teamKey,
				to: r.team.teamKey
			}),
			matches: r.many.teamMatch()
		},
		match: {
			event: r.one.event({
				from: r.match.eventKey,
				to: r.event.eventKey
			}),
			teamMatches: r.many.teamMatch()
		},
		teamMatch: {
			event: r.one.event({
				from: r.teamMatch.eventKey,
				to: r.event.eventKey
			}),
			match: r.one.match({
				from: r.teamMatch.matchKey,
				to: r.match.matchKey
			}),
			teamEvent: r.one.teamEvent({
				from: [r.teamMatch.teamKey, r.teamMatch.eventKey],
				to: [r.teamEvent.teamKey, r.teamEvent.eventKey]
			})
		}
	})
);
