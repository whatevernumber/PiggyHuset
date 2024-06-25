import {REMOTE_SERVER} from "$env/static/private";
import { json, error } from '@sveltejs/kit';

export async function GET({url}) {

	const active = url.searchParams.get('q') ?? '';

	const res = await fetch(`${REMOTE_SERVER}/overseers/${active}` , {
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