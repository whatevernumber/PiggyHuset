import { redirect } from '@sveltejs/kit'

export const ssr = false;

export async function load({cookies, fetch}) {
	if (!cookies.get('bearer')) {
		throw redirect(308, '/');
	}

	const res = await fetch('/api/food');

	return {
		selectOptions: await res.json()
	};
}