import { error } from '@sveltejs/kit';
import { REMOTE_SERVER } from '$env/static/private';

export async function DELETE({cookies, url}) {

	const id = url.searchParams.get('id');

	if (!id) {
		throw error(404);
	}

	if (!cookies.get('bearer')) {
		throw error(401);
	}

	const res = await fetch(`${REMOTE_SERVER}/product/${id}`, {
		method: 'DELETE',
		headers: {
			accept: 'application/json',
			authorization: cookies.get('bearer'),
		},
	});

	if (res.status === 401) {
		cookies.delete('bearer', { path: '/ '})
		throw error(401);
	}

	return new Response(null, {
		status: res.status,
	});
}