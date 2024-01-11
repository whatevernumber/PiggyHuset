<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";
	import {onMount} from "svelte";

	let default_picture = 'ready';
	let data;

	onMount( () => {
		fetch('https://8393e96b-2841-4ffe-93df-baf53fa0b998-00-2174wtn3teowp.riker.replit.dev/web/articles')
			.then((response) => {
				if (response.ok) {
					return response.json()
				}
			})
			.then(json => data = json)
	});
</script>

<svelte:head>
	<title>Новости</title>
</svelte:head>

<CatalogPage {default_picture} type="news" category="news" page_title="Новости" {data} />
