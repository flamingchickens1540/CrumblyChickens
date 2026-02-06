import { drizzle } from 'drizzle-orm/node-postgres';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

// const client = postgres(env.DATABASE_URL);
// console.log(env.DATABASE_URL);
// export const db = drizzle(env.DATABASE_URL);
