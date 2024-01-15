<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";
	import {onMount} from "svelte";
	import {_REMOTE_SERVER} from "$env/static/public";

	let default_picture = 'ready';
	let data;

	onMount( () => {
		fetch(_REMOTE_SERVER + '/articles/type/2')
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

<CatalogPage type="news" category="news" page_title="Новости" data="{news}" />
