import {_REMOTE_SERVER} from "$env/static/public";
import {redirect} from "@sveltejs/kit";

export async function load({ fetch, params }) {

	const res = await fetch(`${_REMOTE_SERVER}/pigs/${params.id}?expand=photos,overseer,city,status`);
	const data = await res.json();

	if (data.status.value !== 'pending') {
		throw redirect(303, `/graduates/${params.id}`);
	}

	return {
		pig: data,
	};
}