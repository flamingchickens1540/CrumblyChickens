import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, url }) => {
    const user = cookies.get('user');
    const allianceColor = url.searchParams.get('color');

    if (!user) {
        throw redirect(303, '/login');
    }

    return { allianceColor };
};
