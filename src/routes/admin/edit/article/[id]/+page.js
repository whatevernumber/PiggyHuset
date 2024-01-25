import {_REMOTE_SERVER} from "$env/static/public";

export const ssr = false;

export async function load({ fetch, params }) {

	const res = await fetch(`${_REMOTE_SERVER}/articles/${params.id}?expand=photos`);
	const data = res.json();

	return {
		article: data,
	};
}