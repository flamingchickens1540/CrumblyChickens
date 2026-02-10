import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const user = cookies.get('user');

	if (!user) {
		throw redirect(303, '/login');
	}

	return {
		user
	};
};
