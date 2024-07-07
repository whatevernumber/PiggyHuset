import {REMOTE_SERVER} from "$env/static/private";
import { json, error } from '@sveltejs/kit';

export async function GET({url}) {

	const number = url.searchParams.get('number');
	const graduatedQuery = url.searchParams.get('graduated') ? '/graduated' : '';

	if (!number) {
		throw error(404);
	}

	const res = await fetch(`${REMOTE_SERVER}/pigs/random/${number}${graduatedQuery}`, {
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