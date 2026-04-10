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

<<<<<<< HEAD
<<<<<<< HEAD
        // throw redirect(303, "/");
    },
=======
        throw redirect(303, '/');
    }
>>>>>>> 2dd82845a4915de5046dd7aef87cb5e8c0e568c1
=======
        throw redirect(303, '/');
    }
>>>>>>> 5a0b1c8f62326125a65b5de04ade6b1cc2217e44
};
