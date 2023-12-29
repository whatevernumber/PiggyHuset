<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";

    const data = [
        {
            title: 'Свиник',
            type: 'ready',
        },
        {
            title: 'Блиник',
            type: 'ready',
        },
        {
            title: 'Пиник',
            type: 'ready',
        },
    ];
</script>

<svelte:head>
	<title>Ищут дом</title>
</svelte:head>

<CatalogPage page_title="Ищут дом" {data} />