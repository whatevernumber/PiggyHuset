import { REMOTE_SERVER } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function POST({request, cookies}) {

	const data = await request.formData();
	let status = 200;

	const response = await fetch(REMOTE_SERVER + '/admin/login', {
		method: 'POST',
		headers: {
			accept: 'application/json',
		},
		body: data,
	});

	if (!response.ok) {
		status = 400
	}

	let result = await response.json();

	if (result.token) {
		const token = 'Bearer ' + result.token;

		// sets the expiration date in 1 month from the current date
		let exp_date = new Date();
		exp_date.setMonth(exp_date.getMonth() + 1);

		cookies.set('bearer', token, { path: '/', expires: exp_date });
	}

	return new Response(JSON.stringify(result), {
		status: status,
	});
}