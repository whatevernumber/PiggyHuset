import { error, redirect } from '@sveltejs/kit';

export async function load({ fetch, params }) {

	const res = await fetch(`/api/articles?id=${params.id}`);

	if (res.status === 404) {
		throw error(404);
	}
	const data = await res.json();

	if (data.type_id !== 2) {
		throw redirect(303, `/articles/${params.id}`);
	}

	return {
		news: data,
	};
}