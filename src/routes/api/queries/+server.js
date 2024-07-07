import { error, json } from '@sveltejs/kit';
import { REMOTE_SERVER } from '$env/static/private';

export async function GET({cookies, url}) {
	if (!cookies.get('bearer')) {
		throw error(401);
	}
	const page = url.searchParams.get('page') ?? null;
	const sort = url.searchParams.get('sort') ?? null;
	const filter = url.searchParams.get('filter') ?? 'all';

	if (!filter) {
		throw error(500);
	}

	const query = (sort ? '/' + sort : '') + (page ? '?page=' + page : '');

	const res = await fetch(`${REMOTE_SERVER}/queries/${filter}${query}`, {
		headers: {
			accept: 'application/json'
		},
	});

	const data = await res.json();
	return json(data);
}