<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";

    const data = [
        {
            title: 'Полезная статья',
            text: 'Как вытирать носики',
            type: 'article',
        },{
            title: 'Полезная статья',
            text: 'Как похудеть крупы',
            type: 'article',
        },{
            title: 'Полезная статья',
            text: 'Как поить маслом',
            type: 'article',
        },{
            title: 'Полезная статья',
            text: 'Как постричь когти и не умереть',
            type: 'article',
        },{
            title: 'Полезная статья',
            text: 'Как сдуться',
            type: 'article',
        },
    ];
</script>

<CatalogPage {data} />