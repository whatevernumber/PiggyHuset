export async function load({ fetch }) {

	const res = await fetch('/api/cities?active=1');
	const data = await res.json();

	return {
		cities: data,
	};
}