import { error, json } from '@sveltejs/kit';
import { REMOTE_SERVER } from '$env/static/private';

export async function POST({request, cookies}) {
	const data = await request.formData();

	if (!cookies.get('bearer')) {
		throw error(401);
	}

	const res = await fetch(`${REMOTE_SERVER}/product`, {
		method: 'POST',
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