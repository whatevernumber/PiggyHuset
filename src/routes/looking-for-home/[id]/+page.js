
export async function load({ params }) {

	let url = 'https://8393e96b-2841-4ffe-93df-baf53fa0b998-00-2174wtn3teowp.riker.replit.dev/web/pigs/'

	if (params.id) {

		url += params.id;
		url += '?expand=photos';

		let data = [];
		await fetch(url).then((response) => {
			if (response.ok) {
				return response.json()
			}
		}).then(json => data = json)

		return {
			pig: data,
		};
	}
}