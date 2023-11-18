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

<CatalogPage pageTitle="Ищут дом" {data} />