import {_REMOTE_SERVER} from "$env/static/public";
import { redirect } from '../../../../../lib/components/utils/func.js';
import { error } from '@sveltejs/kit';
export const ssr = false;

export async function load({ fetch, params }) {

	const res = await fetch(`${_REMOTE_SERVER}/pigs/${params.id}?expand=photos`);
	const data =  await res.json();

	if (data.status === 404) {
		throw error(data.status);
	}

	return {
		pig: data
	}
}