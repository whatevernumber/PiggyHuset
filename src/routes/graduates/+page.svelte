<script>
    import CatalogPage from "$lib/components/pages/CatalogPage.svelte";

    const data = [
        {
            title: 'Финик',
            text: 'Переехал в Мурманск',
            image: 'IMG_0695',
            type: 'graduate',
        },
        {
            title: 'Шанс',
            text: 'На радуге',
            image: 'FqAKtTrJP58',
            type: 'graduate',
        },
        {
            title: 'Йогурт',
            text: 'Более ста фотографий из нового дома со всех сторон в карточке',
            image: 'yoghurt',
            type: 'graduate',
        },
        {
            title: 'Эй',
            text: 'Нашёл дом',
            image: 'in-the-farm',
            type: 'graduate',
        },
    ];
</script>

<CatalogPage category="graduates" page_title="Выпускники Домика" {data} />