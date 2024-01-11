<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";
	import {onMount} from "svelte";

	let default_picture = 'graduated';
	let data;
    // let data = [
    //     {
    //         id: 1,
    //         title: 'Финик',
    //         text: 'Переехал в Мурманск',
    //         image: 'IMG_0695',
    //         type: 'graduate',
    //     },
    //     {
    //         id: 2,
    //         title: 'Шанс',
    //         text: 'На радуге',
    //         image: 'FqAKtTrJP58',
    //         type: 'graduate',
    //     },
    //     {
    //         id: 3,
    //         title: 'Йогурт',
    //         text: 'Более ста фотографий из нового дома со всех сторон в карточке',
    //         image: 'yoghurt',
    //         type: 'graduate',
    //     },
    //     {
    //         id: 4,
    //         title: 'Эй',
    //         text: 'Нашёл дом',
    //         image: 'in-the-farm',
    //         type: 'graduate',
    //     },
    // ];

	onMount(() => {
		fetch('https://8393e96b-2841-4ffe-93df-baf53fa0b998-00-2174wtn3teowp.riker.replit.dev/web/pigs/graduated')
			.then((response) => {
				if (response.ok) {
					return response.json()
				}
			})
			.then(json => data = json)
	});
</script>

<svelte:head>
	<title>Выпускники Домика</title>
</svelte:head>

<CatalogPage {default_picture} category="graduates" page_title="Выпускники Домика" {data} />