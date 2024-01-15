<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";
    import {onMount} from "svelte";
	import {_REMOTE_SERVER} from "$env/static/public";

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

	let data;

    onMount( () => {
        fetch(_REMOTE_SERVER + '/articles/type/1')
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(json => data = json)
    });

	console.log(data)
</script>

<svelte:head>
	<title>Статьи Домика</title>
</svelte:head>

<CatalogPage data="{articles}" type="article" category="articles" page_title="Полезные статьи" button_text="Читать материал" />
