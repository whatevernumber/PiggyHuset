<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";
	import {onMount} from "svelte";

	let default_picture = 'temp_pig';
	let data;

	onMount( () => {
		fetch('https://8393e96b-2841-4ffe-93df-baf53fa0b998-00-2174wtn3teowp.riker.replit.dev/web/pigs')
			.then((response) => {
				if (response.ok) {
					return response.json()
				}
			}).then(json => data = json)
		});
</script>

<svelte:head>
	<title>Ищут дом</title>
</svelte:head>

<CatalogPage {default_picture} page_title="Ищут дом" {data} />