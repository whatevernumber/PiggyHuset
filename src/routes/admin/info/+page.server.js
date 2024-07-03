import { redirect } from '@sveltejs/kit';

export async function load({cookies, fetch, url}) {

	const page = url.searchParams.get('page') ?? null;
	const sort = url.searchParams.get('sort') ?? null;
	const filter = url.searchParams.get('filter') ?? 'all';

	const query = (sort ? '&sort=' + sort : '') + (page ? '&page=' + page : '');

	if (!cookies.get('bearer')) {
		throw redirect(308, '/');
	}

	const res = await fetch('/api/queries?filter=' + filter + query);

	return {
		stats: await res.json()
	};
}