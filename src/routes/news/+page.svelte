<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";

	export let data;
	let news = data.news;
	let tag = data.tag;
</script>

<svelte:head>
	<meta name="description" content="Новости Домика для бездомных поросят" />
	<title>Новости</title>
</svelte:head>

<CatalogPage type="news" category="news" page_title="Новости" data={news} {tag} />
