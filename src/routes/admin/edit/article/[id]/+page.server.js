import { error } from '@sveltejs/kit';
import {goto} from "$app/navigation";

export const ssr = false;

export async function load({ fetch, params, cookies }) {

	if (!cookies.get('bearer')) {
		goto('/');
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