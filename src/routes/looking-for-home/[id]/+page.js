import {error, redirect} from "@sveltejs/kit";

export async function load({ fetch, params }) {

	const res = await fetch(`/api/pigs?id=${params.id}`);

	if (res.status === 404) {
		throw error(404);
	}

	const data = await res.json();
	if (!['pending', 'reserved', 'quarantine'].includes(data.status.value)) {
		throw redirect(303, `/graduates/${params.id}`);
	}

	return {
		pig: data,
	};
}