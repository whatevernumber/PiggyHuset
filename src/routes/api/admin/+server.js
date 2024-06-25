import { REMOTE_SERVER } from '$env/static/private';

export async function HEAD({cookies}) {

	const response = await fetch(REMOTE_SERVER + '/admin', {
		method: 'HEAD',
		headers: {
			accept: 'application/json',
			authorization: cookies.get('bearer'),
		},
	});

	if (!response.ok) {
		cookies.delete('bearer', { path: '/'});
	}

	return new Response(null, {
		status: response.status,
	})
}