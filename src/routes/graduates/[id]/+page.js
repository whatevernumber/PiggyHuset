import {error, redirect} from "@sveltejs/kit";

export async function load({ fetch, params }) {

	const res = await fetch(`/api/pigs?id=${params.id}`);

	if (res.status === 404) {
		throw error(404);
	}

	const data = await res.json();

	if (!['graduated', 'taken', 'rainbow'].includes(data.status.value)) {
		throw redirect(303, `/looking-for-home/${params.id}`);
	}

	return {
		pig: data,
	};
}