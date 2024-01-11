<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";
	import {onMount} from "svelte";
	import {_REMOTE_SERVER} from "$env/static/public";

	let data;

	onMount(() => {
		fetch(_REMOTE_SERVER + '/pigs/graduated')
			.then((response) => {
				if (response.ok) {
					return response.json()
				}
			})
			.then(json => data = json)
	});
</script>

<svelte:head>
	<title>Выпускники Домика</title>
</svelte:head>

<CatalogPage category="graduates" page_title="Выпускники Домика" {data} type="ready" />