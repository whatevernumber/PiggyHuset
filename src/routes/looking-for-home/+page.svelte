<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";

    const data = [
        {
            id: 1,
            title: 'Свиник',
            type: 'ready',
        },
        {
            id: 2,
            title: 'Блиник',
            type: 'ready',
        },
        {
            id: 3,
            title: 'Пиник',
            type: 'ready',
        },
    ];
</script>

<svelte:head>
	<title>Ищут дом</title>
</svelte:head>

<CatalogPage page_title="Ищут дом" {data} />