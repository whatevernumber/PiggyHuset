export async function load({ fetch }) {

	const res = await fetch('/api/cities');
	const data = await res.json();

	return {
		cities: data,
	};
}