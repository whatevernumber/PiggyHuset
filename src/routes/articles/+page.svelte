<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";

    // let data = [
    //     {
    //         id: 1,
    //         title: 'Полезная статья',
    //         text: 'Как вытирать носиков',
    //         type: 'article',
    //     },{
    //         id: 2,
    //         title: 'Полезная статья',
    //         text: 'Как худеть крупов',
    //         type: 'article',
    //     },{
    //         id: 3,
    //         title: 'Полезная статья',
    //         text: 'Как постричь когтев и не умереть',
    //         type: 'article',
    //     },{
    //         id: 4,
    //         title: 'Полезная статья',
    //         text: 'Как сдуть животиков',
    //         type: 'article',
    //     },
    // ];

	export let data;
	let articles = data.articles;
	let tag = data.tag;

</script>

<svelte:head>
	<meta name="description" content="Список полезных статей о морских свинках от Домик для бездомных поросят" />
	<title>Статьи Домика</title>
</svelte:head>

<CatalogPage data="{articles}" type="article" category="articles" page_title="Полезные статьи" button_text="Читать материал" {tag} />
