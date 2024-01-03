<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";
    import {onMount} from "svelte";

    let data = [
        {
            id: 1,
            title: 'Полезная статья',
            text: 'Как вытирать носиков',
            type: 'article',
        },{
            id: 2,
            title: 'Полезная статья',
            text: 'Как худеть крупов',
            type: 'article',
        },{
            id: 3,
            title: 'Полезная статья',
            text: 'Как постричь когтев и не умереть',
            type: 'article',
        },{
            id: 4,
            title: 'Полезная статья',
            text: 'Как сдуть животиков',
            type: 'article',
        },
    ];

    onMount( () => {
        fetch('https://perpl.the-nepodarok.repl.co/web/articles')
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(json => data = json)
    });

</script>

<svelte:head>
    <title>Статьи Домика</title>
</svelte:head>
<CatalogPage {data} category="articles" page_title="Полезные статьи" button_text="Читать материал" />
