import { db } from '@/server/db';
import { user } from '@/server/db/schema';
import { redirect } from '@sveltejs/kit';

export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get('username');

        if (!username) {
            return;
        }

        cookies.set('user', username.toString(), {
            path: '/',
            httpOnly: true,
            sameSite: 'lax'
        });

        await db.insert(user).values({ username }).onConflictDoNothing();
        throw redirect(303, '/');
    }
};
