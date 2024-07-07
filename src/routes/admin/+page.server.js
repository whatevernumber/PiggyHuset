import { redirect } from '@sveltejs/kit';

export function load({cookies}) {
	if (cookies.get('bearer')) {
		throw redirect(308, '/');
	}
}