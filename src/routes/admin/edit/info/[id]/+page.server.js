import { error, redirect } from '@sveltejs/kit';

export const ssr = false;

export async function load({ fetch, params, cookies }) {

	if (!cookies.get('bearer')) {
		throw redirect(308, '/');
	}

	const res = await fetch(`/api/info/get?id=${params.id}`);
	const categoriesRes = await fetch('/api/food');

	if (res.status === 404) {
		throw error(res.status);
	}

	const data = await res.json();
	const categories = await categoriesRes.json();

	return {
		article: data,
		categories: categories,
	};
}