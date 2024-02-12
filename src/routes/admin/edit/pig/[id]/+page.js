import {_REMOTE_SERVER, _ADMIN_FLAG} from "$env/static/public";
import { error } from '@sveltejs/kit';
import {goto} from "$app/navigation";
export const ssr = false;

export async function load({ fetch, params }) {

	let admin = localStorage.getItem(_ADMIN_FLAG);

	if (!admin) {
		goto('/');
	}

	const res = await fetch(`${_REMOTE_SERVER}/pigs/${params.id}?expand=photos`);
	const data =  await res.json();

	if (data.status === 404) {
		throw error(data.status);
	}

	return {
		pig: data
	}
}