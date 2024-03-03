import {_REMOTE_SERVER} from "$env/static/public";

export async function load({ fetch, params }) {

	const res = await fetch(`${_REMOTE_SERVER}/pigs/${params.id}?expand=photos,overseer,city,status`);
	const data = res.json();

	return {
		pig: data,
	};
}