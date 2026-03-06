import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from '$env/dynamic/private';
if (!env) throw new Error('d');

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export const db = drizzle(env.DATABASE_URL);
