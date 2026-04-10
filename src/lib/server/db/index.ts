import { drizzle } from 'drizzle-orm/node-postgres';
<<<<<<< HEAD
import { env } from '$env/dynamic/private';
=======
import { DATABASE_URL } from '$env/static/private';
import { relations, event, team, teamEvent, match, teamMatch } from './schema.ts';
if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');
>>>>>>> 2dd82845a4915de5046dd7aef87cb5e8c0e568c1

export const db = drizzle(DATABASE_URL, {
    schema: { event, team, teamEvent, match, teamMatch },
    relations
});
