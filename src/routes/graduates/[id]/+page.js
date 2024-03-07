import {_REMOTE_SERVER} from "$env/static/public";
import {error, redirect} from "@sveltejs/kit";

export async function load({ fetch, params }) {

	const res = await fetch(`${_REMOTE_SERVER}/pigs/${params.id}?expand=photos,overseer,city,status`);
	const data = await res.json();

	if (data.name === 'Not Found') {
		throw error(404);
	} else if (!['graduated', 'taken', 'rainbow'].includes(data.status.value)) {
		throw redirect(303, `/looking-for-home/${params.id}`);
	}

	return {
		pig: data,
	};
}