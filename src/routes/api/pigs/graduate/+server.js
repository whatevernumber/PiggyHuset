import {REMOTE_SERVER} from "$env/static/private";
import { json, error } from '@sveltejs/kit';

export async function PATCH({url, cookies}) {

	const id = url.searchParams.get('id');
	const value = url.searchParams.get('value');

	if (!id || !value) {
		throw error(400);
	}

	if (!cookies.get('bearer')) {
		throw error(401);
	}

	const res = await fetch(`${REMOTE_SERVER}/pigs/graduate/${id}/${value}`, {
		method: 'PATCH',
		headers: {
			accept: 'application/json',
			authorization: cookies.get('bearer'),
		},
	});

	if (res.status === 401) {
		cookies.delete('bearer', { path: '/' });
		throw error(401);
	}

	return new Response(null, {
		status: res.status,
	})
}