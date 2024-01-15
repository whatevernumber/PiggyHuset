<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";

	export let data;

	const articles = data.articles;
</script>

<svelte:head>
	<title>Статьи Домика</title>
</svelte:head>

<CatalogPage data="{articles}" type="article" category="articles" page_title="Полезные статьи" button_text="Читать материал" />
