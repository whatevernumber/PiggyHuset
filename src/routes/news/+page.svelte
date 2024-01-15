<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";

	export let data;

	const news = data.news;
</script>

<svelte:head>
	<title>Новости</title>
</svelte:head>

<CatalogPage type="news" category="news" page_title="Новости" data="{news}" />
