import { json, error } from '@sveltejs/kit';
import { REMOTE_SERVER } from '$env/static/private';

export async function PATCH({url, cookies, request}) {

	const id = url.searchParams.get('id');
	const data = await request.formData();

	if (!id) {
		throw error(500);
	}

	if (!cookies.get('bearer')) {
		throw error(401);
	}

	const res = await fetch(`${REMOTE_SERVER}/articles/${id}`, {
		method: 'PATCH',
		headers: {
			accept: 'application/json',
			authorization: cookies.get('bearer'),
		},
		body: data,
	});


	if (res.status === 401) {
		cookies.delete('bearer', { path: '/ '})
		throw error(401);
	}

	return json(await res.json(), {status: res.status});
}