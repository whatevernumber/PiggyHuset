import {REMOTE_SERVER} from "$env/static/private";
import { json, error } from '@sveltejs/kit';

export async function GET({url}) {

	const page = url.searchParams.get('page');
	const isGraduated = url.searchParams.get('graduated');
	const queryAll = url.searchParams.get('all');

	let query = isGraduated ? '/graduated' : '';

	if (queryAll) {
		query += '?all=1&'
	}

	if (page) {
		query += '?page=' + page + '&'
	}

	if (!page && !queryAll) {
		query += '?'
	}

	query += 'expand=city,status,overseer';

	const res = await fetch(`${REMOTE_SERVER}/pigs${query}`, {
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