<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";

	export let data;

	const graduates = data.graduates;
	const count = data.count;
</script>

<svelte:head>
	<meta name="description" content="С 2021 года наши волонтеры помогли {count} морским свинкам найти новые дома по всей России" />
	<title>Выпускники Домика для бездомных поросят domiksvinok.ru</title>
</svelte:head>

<CatalogPage category="graduates" page_title="Выпускники Домика" data="{graduates}" {count} type="ready" />