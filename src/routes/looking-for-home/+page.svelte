<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";

	export let data;

	const pigs = data.pigs;
</script>

<svelte:head>
	<title>Ищут дом</title>
</svelte:head>

<CatalogPage category="looking-for-home" page_title="Ищут дом" data="{pigs}" />