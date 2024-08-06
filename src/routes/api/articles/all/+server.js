import {REMOTE_SERVER} from "$env/static/private";
import { json, error } from '@sveltejs/kit';

export async function GET({url}) {

	const page = url.searchParams.get('page');
	let query = '';

	if (page) {
		query = '&page=' + page
	}

	const res = await fetch(`${REMOTE_SERVER}/articles/type/1?expand=tags${query}`, {
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