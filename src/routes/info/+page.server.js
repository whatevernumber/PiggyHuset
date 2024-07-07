export async function load({ fetch }) {

	let res = await fetch('/api/info/all');
	let products = await res.json();

	res = await fetch('/api/food');
	const food = await res.json();

	return {
		info: products,
		categories: food,
	};
}