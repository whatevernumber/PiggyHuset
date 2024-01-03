<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";

    const data = [
        {
            id: 1,
            title: 'Финик',
            text: 'Переехал в Мурманск',
            image: 'IMG_0695',
            type: 'graduate',
        },
        {
            id: 2,
            title: 'Шанс',
            text: 'На радуге',
            image: 'FqAKtTrJP58',
            type: 'graduate',
        },
        {
            id: 3,
            title: 'Йогурт',
            text: 'Более ста фотографий из нового дома со всех сторон в карточке',
            image: 'yoghurt',
            type: 'graduate',
        },
        {
            id: 4,
            title: 'Эй',
            text: 'Нашёл дом',
            image: 'in-the-farm',
            type: 'graduate',
        },
    ];
</script>

<svelte:head>
	<title>Выпускники Домика</title>
</svelte:head>

<CatalogPage category="graduates" page_title="Выпускники Домика" {data} />