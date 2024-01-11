<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";
	import {onMount} from "svelte";
	import {_REMOTE_SERVER} from "$env/static/public";

	let data;

	onMount( () => {
		fetch(_REMOTE_SERVER + '/pigs')
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

<CatalogPage category="looking-for-home" page_title="Ищут дом" {data} />