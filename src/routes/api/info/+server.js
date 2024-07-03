import {REMOTE_SERVER} from "$env/static/private";
import { json } from '@sveltejs/kit';

export async function GET({url}) {

	const search_word = url.searchParams.get('q') ?? '';
	const type_id = url.searchParams.get('type') ?? '';

	const res = await fetch(`${REMOTE_SERVER}/product/search/` + (type_id ? type_id + '/' : '') + search_word, {
		headers: {
			accept: 'application/json'
		},
	});

	if (res.status === 404) {
		throw error(404);
	}

	const data = await res.json();

	return json(data);
}