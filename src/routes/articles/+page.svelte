<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";

    const data = [
        {
            title: 'Полезная статья',
            text: 'Как вытирать носиков',
            type: 'article',
        },{
            title: 'Полезная статья',
            text: 'Как худеть крупов',
            type: 'article',
        },{
            title: 'Полезная статья',
            text: 'Как постричь когтев и не умереть',
            type: 'article',
        },{
            title: 'Полезная статья',
            text: 'Как сдуть животиков',
            type: 'article',
        },
    ];
</script>

<svelte:head>
	<title>Статьи Домика</title>
</svelte:head>

<CatalogPage {data} buttonText="Читать материал" />