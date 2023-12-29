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

<CatalogPage page_title="Ищут дом" {data} />