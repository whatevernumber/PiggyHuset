import {REMOTE_SERVER} from "$env/static/private";
import { json } from '@sveltejs/kit';

export async function GET({url}) {

	const status  = url.searchParams.get('status_id');

	const res = await fetch(`${REMOTE_SERVER}/pigs/count/${status}`, {
		headers: {
			accept: 'application/json',
		},
	});

	const data = await res.json();

	return json(data);
}