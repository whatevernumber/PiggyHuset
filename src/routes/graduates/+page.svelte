<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";

	export let data;

	const graduates = data.graduates;
	const count = data.count;
</script>

<svelte:head>
	<meta name="description" content="Список всех свинок, прошедших через Домик для бездомных поросят" />
	<title>Выпускники Домика</title>
</svelte:head>

<CatalogPage category="graduates" page_title="Выпускники Домика" data="{graduates}" {count} type="ready" />