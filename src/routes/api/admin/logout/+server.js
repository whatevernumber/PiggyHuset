import { REMOTE_SERVER } from '$env/static/private';

export async function POST({cookies}) {

	const response = await fetch(REMOTE_SERVER + '/admin/logout', {
		method: 'POST',
		headers: {
			accept: 'application/json',
			authorization: cookies.get('bearer'),
		},
	});

	if (response.status === 205) {
		cookies.delete('bearer', { path: '/' });
	}

	return new Response(null, {
		status: response.status,
	})
}