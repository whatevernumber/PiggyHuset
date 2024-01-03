<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";
	import {onMount} from "svelte";

    let data = [
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

	onMount( () => {
		fetch('https://perpl.the-nepodarok.repl.co/web/pigs')
			.then((response) => {
				if (response.ok) {
					return response.json()
				}
			}).then(json => data = json)
		});
</script>

<svelte:head>
	<title>Ищут дом</title>
</svelte:head>

<CatalogPage page_title="Ищут дом" {data} />