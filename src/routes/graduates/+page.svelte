<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";

	export let data;

	const graduates = data.graduates;
</script>

<svelte:head>
	<title>Выпускники Домика</title>
</svelte:head>

<CatalogPage category="graduates" page_title="Выпускники Домика" data="{graduates}" type="ready" />