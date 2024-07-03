import { error, redirect } from '@sveltejs/kit';

export const ssr = false;

export async function load({ fetch, params, cookies }) {

	if (!cookies.get('bearer')) {
		throw redirect(308, '/');
	}

	const res = await fetch(`/api/articles?id=${params.id}`);
	const data = await res.json();

	if (data.status === 404) {
		throw error(data.status);
	}

	return {
		article: data,
	};
}