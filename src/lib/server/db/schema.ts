import {
    pgTable as table,
    integer,
    text,
    boolean,
    pgEnum,
    varchar,
    unique,
    serial
} from 'drizzle-orm/pg-core';
import { defineRelations } from 'drizzle-orm';
import { primaryKey } from 'drizzle-orm/cockroach-core';

export const endgame = pgEnum('endgame', ['L1', 'L2', 'L3', 'Failed', 'None']);
export const maxEndgame = pgEnum('maxEndgame', ['L1', 'L2', 'L3', 'None']);
export const drivetrain = pgEnum('drivetrain', ['Swerve', 'Tank', 'Other']);
export const autoStart = pgEnum('auto_start', ['Tower', 'Outpost', 'Depot']);

export const user = table('user', {
    username: varchar({ length: 64 }).primaryKey()
});
export const event = table('event', {
    eventKey: varchar({ length: 64 }).primaryKey()
});
export const team = table('team', {
    teamKey: integer().primaryKey(),
    name: varchar({ length: 64 }).notNull()
});

export const teamEvent = table(
    'team_event',
    {
        teamKey: integer()
            .notNull()
            .references(() => team.teamKey),
        eventKey: varchar({ length: 64 })
            .notNull()
            .references(() => event.eventKey),
        drivetrain: drivetrain(),
        canBump: boolean(),
        canTrench: boolean(),
        maxClimb: maxEndgame(),
        canShuffle: boolean(),
        canHalfSteal: boolean(),
        canSteal: boolean(),
        maxShotDistance: integer(),
        hopperCapacity: integer(),
        robotIceCream: text(),
        biggestPride: text(),
        notes: text(),
        scout: varchar({ length: 64 }).references(() => user.username),
        completed: boolean().notNull()
    },
    (table) => [primaryKey({ columns: [table.eventKey, table.teamKey] })]
);

// Expanded with data from TBA (once they release that info)
export const match = table('match', {
    matchKey: varchar({ length: 64 }).primaryKey(),
    eventKey: varchar({ length: 64 })
        .notNull()
        .references(() => event.eventKey)
});
export const teamMatch = table(
    'team_match',
    {
        id: serial().primaryKey(),
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
        scout: varchar({ length: 64 }).references(() => user.username),
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
