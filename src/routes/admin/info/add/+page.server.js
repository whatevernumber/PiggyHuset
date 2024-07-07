import { redirect } from '@sveltejs/kit'

export const ssr = false;

export function load({cookies}) {
	if (!cookies.get('bearer')) {
		throw redirect(308, '/');
	}
}