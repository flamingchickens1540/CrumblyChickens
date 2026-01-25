import type { PageServerLoad } from './login/$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		// Already logged in -> redirect to home
		throw redirect(303, '/');
	}

	return {};
};