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

		throw redirect(303, '/');
	}
};
