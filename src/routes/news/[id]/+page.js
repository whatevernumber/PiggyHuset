
export async function load({ fetch, params }) {

	const res = await fetch(`https://8393e96b-2841-4ffe-93df-baf53fa0b998-00-2174wtn3teowp.riker.replit.dev/web/articles/${params.id}?expand=photos`);
	const data = res.json();

	return {
		news: data,
	};
}